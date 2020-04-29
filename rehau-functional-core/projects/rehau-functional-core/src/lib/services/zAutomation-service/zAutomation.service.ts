import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  OnlineOfflineService, onlineOfflineData,
} from '../onlineOffline-service/onlineOffline.service';
import { AuthService } from '../auth-service/auth.service';
import { GatewayService } from '../gateway-service/gateway.service';
import { CacheService } from '../cache-service/cache.service';
import { SensorSettingService } from '../leakage-helper-service/settings.service';
import {
  Sensor,
  VirtualDevice,
  DeviceData,
  DeviceMap,
  SafeGuardDevice
} from '../../models/zAutomation.model';
import { Gateway } from '../../models/getway.model';
import { LogService } from '../logger-service/logger.service';

export const sensorUpdateSub = new Subject();
export const sensorsDataSub = new Subject();


@Injectable({
  providedIn: 'root'
})
export class ZAutomationService {
  appStartTime = Math.floor(new Date().getTime() / 1000);


  device: SafeGuardDevice;

  tickInterval;
  private storageName = 'zautomation_object';
  // tslint:disable-next-line:variable-name
  private _deviceMap: DeviceMap;
  get deviceMap(): DeviceMap {
    return this._deviceMap;
  }
  set deviceMap(value: DeviceMap) {
    this._deviceMap = value;
    this.setConfigWrapperToStorage(value);
  }
  // private observer: IzAutomationObserver[] = [];
  private remoteOnline = true;
  private localOnline = true;
  private refreshTime = 2500;
  private freezeButtonUntil = 0;
  safeGuardChecked: any = { flag: false };
  failureRate = new BehaviorSubject<number>(0);
  constructor(
    private onlineOfflineService: OnlineOfflineService,
    private authService: AuthService,
    private gatewayService: GatewayService,
    private settingService: SensorSettingService,
    private logService: LogService,
    private cacheService: CacheService,
  ) {
    this.logService.log('zAutomationAPI::onInit');
    if (this.cacheService.getLocalData('safeGuardChecked')) {
      this.safeGuardChecked = this.cacheService.getLocalData('safeGuardChecked');
    }
    // this.onlineOfflineService.subscribe(this);
    onlineOfflineData.subscribe((data: any) => {
      this.onlineOfflineUpdate(data.localOnline, data.remoteOnline);
    });
  }

  /**
   * @description function to maintain the state of variables localOnline and remoteOnline
   * @param localOnline boolean value true if device connected localy
   * @param remoteOnline boolean value true if device connected remotely
   */
  onlineOfflineUpdate(localOnline: boolean, remoteOnline: boolean) {
    this.logService.log(
      'zAutomationAPI::onlineOfflineUpdate ' + localOnline + ' ' + remoteOnline
    );
    this.remoteOnline = remoteOnline;
    this.localOnline = localOnline;
  }

  /**
   * @description this method will initialize onlineOfflineService
   * @description and continuosly check for device connectivity status
   * @description it will continuosly call tick method which will fetch connected device info
   */
  public initialize() {
    this.logService.log('initialize method call-- in zAutomation service');
    clearInterval(this.tickInterval);
    this.onlineOfflineService.initialize();
    // this.onlineOfflineInitialize();
    this.tick(true);
    this.logService.log('Tick Runs 1st Time ------------------->');
    this.tickInterval = setInterval(async () => {
      // await this.onlineOfflineInitialize();
      this.tick(false);
    }, this.refreshTime);
  }

  /**
   * @description if device is connected either localy or remotely then this function will call the polldata function
   * @description to get the connected device info
   * @param firstRun is to check whether function is hitted very first time as need to
   * fetch zAutomation object from local storage in first run
   */
  private async tick(firstRun: boolean) {
    this.logService.log('in tick function zAutomation service');
    // if (this.observer.length > 0) {
    this.logService.log('zAutomationAPI::tick');
    try {
      if (!this.localOnline && !this.remoteOnline) {
        this.logService.log('zAutomationAPI::no tick, because Offline');
        return;
      }
      const user = await this.authService.getUser();
      const gw = await this.gatewayService.getPairedGateway(
        user.access_token
      );

      if (gw.leckageDeviceId !== undefined) {
        if (firstRun) {
          this.logService.log('zAutomationAPI::firstRunLoad');
          this._deviceMap = await this.getConfigWrapperFromStorage();
          this.notify();
        } else {
          // if (firstRun || this.observer.length > 0) {
          this.logService.log('zAutomationAPI::tick::polldata');
          this.logService.log('DEBUG firstrun:' + firstRun);
          await this.pollData();
        }
        // if (this.observer.length === 0) {
        //   this.logService.log('DEBUG observer length 0');
        //   // return;
        // }
        this.decFailureRate();
      } else {
        this.logService.log(
          'zAutomationAPI::tick: leackage device undefined, skipping network requests'
        );
      }
    } catch (e) {
      this.logService.log(
        'zAutomationAPI::tick:Catch: Could not get tick, error: ' +
        e.message +
        ';;;;;;;' +
        e.stack
      );
      this.incFailureRate();
    }
  }

  /**
   * @description this function will call fetchpull data to either get whole data or to get data from last update time
   */
  private async pollData() {
    if (
      this.deviceMap &&
      this.deviceMap.updateTime &&
      Object.keys(this.deviceMap.devices).length > 0
    ) {
      this.logService.log('zAutomationAPI::pollData: Polling delta data');
      await this.fetchPollData('delta'); // passing parameter delta to fetch data from last upodatetime
    } else {
      this.logService.log('zAutomationAPI::pollData: Polling complete data');
      await this.fetchPollData('complete'); // passing parameter complete to get whole object
    }
  }

  /**
   * @description call device API and get the data either complete or from last update time based on parameter passed
   * @param type should be delta if need to fetch data using last update time else complete
   */
  private async fetchPollData(type) {
    this.logService.log('in fetchPollData method');
    let url;
    if (type === 'delta') {
      url = 'ZAutomation/api/v1/devices?since=' + this.deviceMap.updateTime;
      // url = 'ZWaveAPI/Data/' + this.deviceMap.updateTime;
    } else {
      url = 'ZAutomation/api/v1/devices';
      // url = 'ZWaveAPI/Data/?call=4';
    }

    const newWrapper: DeviceMap = { updateTime: '', devices: null };
    this.logService.log('zAutomationAPI::pollCompleteData');
    const user = await this.authService.getUser();
    const gateway = await this.gatewayService.getPairedGateway(
      user.access_token
    );
    const pollObject = await this.gatewayService.callApi(
      gateway,
      url
    );
    this.logService.log('I am PollObject, I might have all the Device Data', pollObject);
    if (type === 'delta') {
      // tslint:disable-next-line:no-string-literal
      newWrapper.updateTime = pollObject['data']['updateTime'];
      // tslint:disable-next-line:no-string-literal
      newWrapper.devices = await this.parseDevices(pollObject['data']['devices']);
      if (newWrapper && newWrapper.devices) {
        // this.logService.log('zAutomationAPI::MergeAndSave: New one');
        let update = false;
        // tslint:disable-next-line:forin
        for (const deviceID in newWrapper.devices) {
          // this.logService.log('zAutomationAPI::MergeAndSave: Updating' + JSON.stringify(newWrapper.devices[deviceID]));
          this._deviceMap.devices[deviceID] = newWrapper.devices[deviceID];
          update = true;
        }
        if (update) {
          // this.logService.log('zAutomationAPI::MergeAndSave: Notify');
          this.setConfigWrapperToStorage(this._deviceMap);
          this.notify();
        }
      }
    } else {
      // tslint:disable-next-line:no-string-literal
      newWrapper.updateTime = pollObject['data']['updateTime'];
      // tslint:disable-next-line:no-string-literal
      newWrapper.devices = await this.parseDevices(pollObject['data']['devices']);
      // this.logService.log(newWrapper);
      this.deviceMap = newWrapper;
      this.notify();
    }
  }
  /**
   * @description Here We need to Provide the Leakage Device Id and
   *  Its Instance.
   */
  private async getDeviceAndInstance(
    gateway: Gateway
  ): Promise<{ device: number; instance: number }> {
    return { device: gateway.leckageDeviceId, instance: 0 };
  }

  /**
   * @description It parse from all the Device Data and return the Array of
   * devices whose node id is matches with gateway.leckageDeviceId.
   */
  private async parseDevices(
    pollObject
  ): Promise<{ [id: string]: VirtualDevice }> {
    const user = await this.authService.getUser();
    const data: any = await this.gatewayService.getPairedGateway(user.access_token);
    const deviceIDandInstance = await this.getDeviceAndInstance(data);
    const result: { [id: string]: VirtualDevice } = {};
    for (const obj of pollObject) {
      // this.logService.log('Checking if ' + deviceIDandInstance.device + ' equals ' + obj.nodeId);
      if (
        obj &&
        obj.nodeId &&
        obj.nodeId.toString() === deviceIDandInstance.device.toString()
      ) {
        // tslint:disable-next-line:no-string-literal
        result[obj['id']] = obj;
      } else if (obj.id === 'DummyDevice_18') {
        result[obj.id] = obj;
      }
    }
    return result;
  }
  /**
   * @description getting zautomation_object from the Local storage
   */
  private async getConfigWrapperFromStorage(): Promise<DeviceMap> {
    const result: any = (this.cacheService.getLocalData(this.storageName));
    const object: DeviceMap = (result);
    return object;
  }
  /**
   * @description setting zautomation_object from the Local storage
   * @param obj Object need to stored in local storage.
   */
  private async setConfigWrapperToStorage(obj: DeviceMap) {
    this.cacheService.setLocalData(this.storageName, (obj));
  }

  /**
   * @description this function notify every time when some chanegs are there in sensor values.
   */
  private notify() {
    sensorUpdateSub.next({ flag: true });
  }

  /**
   * @description this is needed for filtering a specific sensor device from the whole Array
   * @param regex  is regular erpression need to filteraton.
   */
  filterDeviceMap(regex: RegExp): DeviceData {
    for (const id in this.deviceMap.devices) {
      if (regex.test(id)) {
        return this.deviceMap.devices[id];
      }
    }
  }
  /**
   * @description this just increase the Failure Counter
   */
  private incFailureRate() {
    if (this.failureRate.getValue() < 3) {
      this.failureRate.next(this.failureRate.getValue() + 1);
    }
  }

  /**
   * @description It Just Decrease the Failure Counter.
   */

  private decFailureRate() {
    if (this.failureRate.getValue() > 0) {
      this.failureRate.next(this.failureRate.getValue() - 1);
    }
  }

  /**
   * @description it needed for getting the updated value for a perticular Sensor.
   * @param sensorNo using this we know which sensors updated information needed.
   */
  public async updateSensorValue(sensorNo: number) {
    this.logService.log('in updateSensorValue-->', sensorNo);
    const user = await this.authService.getUser();
    const gateway: any = await this.gatewayService.getPairedGateway(user.access_token);
    const deviceIDandInstance = await this.getDeviceAndInstance(gateway);
    const deviceIDandInstanceString =
      'ZWayVDev_zway_' +
      deviceIDandInstance.device +
      '-' +
      deviceIDandInstance.instance;

    let sensorPath = '';

    switch (sensorNo) {
      case 0: {
        sensorPath = deviceIDandInstanceString + '-50-0';
        break;
      }
      case 1: {
        sensorPath = deviceIDandInstanceString + '-49-23';
        break;
      }
      case 2: {
        sensorPath = deviceIDandInstanceString + '-49-56';
        break;
      }
      case 3: {
        sensorPath = deviceIDandInstanceString + '-49-57';
        break;
      }
    }
    this.logService.log('call api --->sensorPath', sensorPath);
    await this.gatewayService.callApi(
      gateway,
      'ZAutomation/api/v1/devices/' + sensorPath + '/command/update'
    );
  }

  /**
   * @description this function is needed for the getting the Sensor values
   * and store it in local storage.
   * @param sensorsValue need the initaial sensor values.
   */
  async getSensorValue(sensorsValue) {
    const sensors: Sensor[] = sensorsValue;
    this.logService.log('in update method-- device metrics');
    const user = await this.authService.getUser();
    const gateway = await this.gatewayService.getPairedGateway(
      user.access_token
    );
    if (this.deviceMap && this.deviceMap.updateTime) {
      // this.onlineOfflineService.REGUARD_OFFLINE = false;
      // if (!DemoMode.IS_MOCK_DATA_MODE || !DemoMode.IS_JUST_MOCK_DATA_MODE) {
      if (this.device) {
        this.device.sensorDevices = [];
      } else {
        this.device = new SafeGuardDevice();
      }
      if (
        this.filterDeviceMap(
          new RegExp(gateway.leckageDeviceId + '-[0-9]*-37$', 'g')
        ).metrics.isFailed
      ) {
        // REGUARD is offline
        // this.onlineOfflineService.REGUARD_OFFLINE = true;
        setTimeout(() => {
          this.getSensorValue(sensors);
        }, 5000);
        return;
      }
      // this.onlineOfflineService.REGUARD_OFFLINE = false;
      try {
        const settings = await this.settingService.getSettings();

        // WATERMETER

        const waterMeter = this.filterDeviceMap(
          new RegExp(gateway.leckageDeviceId + '-[0-9]*-50-0$', 'g')
        );

        this.logService.log(
          'DeviceMetricsComponent::Update: settings meter before converting: ' +
          JSON.stringify(waterMeter.metrics.level)
        );

        sensors[0].timestamp = waterMeter.updateTime;

        sensors[0].value =
          '' +
          this.settingService.convertAmount(
            settings.amountUnit,
            waterMeter.metrics.level
          );

        // Translation service
        // this.sensors[0].subTitle = this.translationService.instant(
        //   settings.amountUnit
        // );
        // this.sensors[0].title = this.translationService.instant('Amount');

        // TEMPERATURE

        const waterTemperature = this.filterDeviceMap(
          new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-23$', 'g')
        );

        sensors[1].timestamp = waterTemperature.updateTime;

        sensors[1].value =
          '' +
          this.settingService.convertTemp(
            settings.temperatureUnit,
            waterTemperature.metrics.level
          );

        // Translation Services
        // this.sensors[1].subTitle = this.translationService.instant(
        //   settings.temperatureUnit
        // );
        // this.sensors[1].title = this.translationService.instant(
        //   'Temperature'
        // );

        // FLOW

        const waterFlow = this.filterDeviceMap(
          new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-56$', 'g')
        );

        sensors[2].timestamp = waterFlow.updateTime;

        sensors[2].value =
          '' +
          this.settingService.convertFlow(
            settings.flowUnit,
            waterFlow.metrics.level
          );
        // Translation Services
        // this.sensors[2].subTitle = this.translationService.instant(
        //   settings.flowUnit
        // );
        // this.sensors[2].title = this.translationService.instant('Flow');

        // PRESSURE

        const waterPressure = this.filterDeviceMap(
          new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-57$', 'g')
        );
        this.logService.log(
          'DeviceMetricsComponent::Update: settings waterPressure: ' +
          JSON.stringify(waterPressure)
        );
        this.logService.log('Water Sensor Updated Time', waterPressure.updateTime);

        sensors[3].timestamp = waterPressure.updateTime;

        sensors[3].value =
          '' +
          this.settingService.convertPressure(
            settings.pressureUnit,
            waterPressure.metrics.level
          );

        // Dummy Device 18
        // PRESSURE
        // alert('11');
        const dummyDevice = this.filterDeviceMap(
          new RegExp('DummyDevice_18', 'g')
        );
        if (dummyDevice) {
          this.logService.log('Dummy Device Updated level', dummyDevice.metrics.level);
          sensors[4].timestamp = dummyDevice.updateTime;
          sensors[4].value = dummyDevice.metrics.level;
        }
        this.logService.log('Hey I am New Sensor Value', sensors);
        this.cacheService.setLocalData('sensors', (sensors));
        this.logService.log('sensors-local-storage: ' + JSON.stringify(sensors));

        const now = Math.floor(new Date().getTime() / 1000) - 60 * 2;
        const nowOneMin = Math.floor(new Date().getTime() / 1000) - 20;

        this.logService.log('before loop sensor--->', sensors);

        for (let i = 0; i < sensors.length; i++) {
          this.logService.log(
            'DeviceMetricsComponent::Update: oldstamp: ' +
            sensors[i].timestamp +
            'newstamp: ' +
            now
          );
          if (sensors[i].timestamp) {
            if (
              sensors[i].timestamp < now &&
              this.appStartTime < nowOneMin
            ) {
              this.updateSensorValue(i);
              this.logService.log(
                'DeviceMetricsComponent::Update: UpdateSensorValueCalled ' +
                (now - sensors[i].timestamp)
              );
            }
          }
        }
      } catch (e) {
        this.logService.log(
          'DeviceMetricsComponent::Update: Error fetching deviceMetrics! ' + e
        );
      }
      // }

      if (this.freezeButtonUntil <= new Date().getTime()) {
        const guardChecked = this.filterDeviceMap(
          new RegExp(gateway.leckageDeviceId + '-[0-9]*-37$', 'g')
        );

        this.safeGuardChecked.flag = guardChecked.metrics.level === 'on';
        this.cacheService.setLocalData('safeGuardChecked', (this.safeGuardChecked));
      }
    }
    sensorsDataSub.next({ data: sensors });
  }

}
