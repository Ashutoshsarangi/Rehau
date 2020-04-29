import { Injectable, OnInit } from '@angular/core';
// import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
// import { UserService } from './user.service';
// import { GatewayService } from './gateway.service';
// import { GatewayDeviceControlService } from './microservice-api/gatewayDeviceControl.service';
// import { Gateway, GatewayCredentialsTypes } from '../../domain/gateway';
import { GatewayService, AuthService } from 'rehau-functional-core/dist/rehau-functional-core';
import { BehaviorSubject } from 'rxjs';
// import {
//   IOnlineOfflineObserver,
//   OnlineOfflineService
// } from './onlineOffline.service';
import {
  ZWaveAPISync,
  IzWaveAPISyncObserver
} from './zWaveAPISync.service';
// import { ILogoutInterface, LogoutService } from './logout.service';

export interface IConfigParamWrapper {
  [commandClass: number]: IConfigParamCommandClass;

  timestamp: string;
}

export interface IConfigParamCommandClass {
  commandClass: number;

  [config: number]: IConfigParams;
}

export interface IConfigParams {
  configID: number;
  value: number;
  timestamp: string;
}

export interface IzAutomationObserver {
  observerId: number;

  update();
}

export enum GatewayCredentialsTypes {
  ADMIN = 'admin',
  LOCAL = 'local',
  REMOTE = 'remote'
}

export interface Gateway {
  id?: string;
  boxId?: string;
  localIp?: string;
  credentials?: GatewayCredentials[];
  password?: string;
  homeId?: string;
  homeGwId?: string;
  pairedDevices?: PairedDevicesData[];
  leckageDeviceId?: number;
  waterSensorDeviceId?: number;
  claimed?: boolean;
  remoteAccessActivated?: boolean;
}

export interface PairedDevicesData {
  vendorId: string;
  productId: string;
  productType: string;
  serialnumber: string;
  nodeId: string;
  deviceName: string;
  type: SupportedDeviceTypes;
  creationTime: Date;
  virtualDevices: VirtualDevice[];
}

export interface VirtualDevice {
  vDevId: string;
  deviceType: string;
}

export enum SupportedDeviceTypes {
  leckageDetector = 'LeckageDetector',
  floodSensorRehau = 'FloodSensorRehau',
  floodSensorOther = 'FloodSensorOther'
}

export interface GatewayCredentials {
  user: string;
  password: string;
  type: GatewayCredentialsTypes;
}

@Injectable({
  providedIn: 'root'
})
export class ZWaveAPI implements IzWaveAPISyncObserver {

  // TODO: Implement class as Singleton
  static configIDs = {
    112: {
      1: { description: 'Operation Mode', bytes: 1 },
      // 3: { description: 'micro leakage detected', bytes: 1 }, //not retreivable right now
      4: { description: 'fixed schedule time hours', bytes: 1 },
      5: { description: 'fixed schedule time minutes', bytes: 1 },
      6: { description: 'fixed schedule day', bytes: 1 },
      7: { description: 'automatic schedule time interval', bytes: 2 },
      8: { description: 'micro leakage mesuring time', bytes: 2 },
      9: { description: 'micro leakage pressure drop', bytes: 2 },
      10: { description: 'micro leakage pressure drop abort', bytes: 2 },
      11: { description: 'number of measurements', bytes: 1 },
      12: { description: 'wait time until next measurement', bytes: 1 },
      13: { description: 'reaction to micro leakage', bytes: 1 },
      // 14: { description: 'macro leakage detected', bytes: 1 }, //not retreivable right now
      15: { description: 'Mode 2: Max flow rate', bytes: 2 },
      16: { description: 'Mode 2: Max pressure drop', bytes: 2 },
      17: { description: 'Mode 2: Max amount in litres', bytes: 2 },
      18: { description: 'Mode 2: Max amount flowing in litres', bytes: 2 },
      19: { description: 'Mode 2: Max time', bytes: 2 },
      20: { description: 'Mode 2: Max time flowing', bytes: 2 },
      21: { description: 'Mode 1: Max flow rate', bytes: 2 },
      22: { description: 'Mode 1: Max pressure drop', bytes: 2 },
      23: { description: 'Mode 1: Max amount in litres', bytes: 2 },
      24: { description: 'Mode 1: Max amount flowing in litres', bytes: 2 },
      25: { description: 'Mode 1: Max time', bytes: 2 },
      26: { description: 'Mode 1: Max time flowing', bytes: 2 },
      28: { description: 'Reaction to Micro Leakage', bytes: 1 },
      30: { description: 'Reaction to flooding sensor', bytes: 1 },
      54: { description: 'Error Code', bytes: 2 }
    }
  };
  observerId = 40936839056709357;
  private observer: IzAutomationObserver[] = [];
  public deviceData;
  private storageName = 'zwaveapi_object';
  private configurationObj: IConfigParamWrapper;
  get configurationObject(): IConfigParamWrapper {
    return this.configurationObj;
  }

  set configurationObject(value: IConfigParamWrapper) {
    this.configurationObj = value;
    this.setConfigWrapperToStorage(value);
  }

  public async getSubscriptionKeyForConfigId(configId: string | number) {
    return (await this.getPathToConfigParameters()) + configId;
  }

  constructor(
    // private localStorageService: LocalStorageService,
    private authService: AuthService,
    private gatewayService: GatewayService,
    private zWaveAPISync: ZWaveAPISync,
  ) {
    console.log('zWaveAPI::sync constructor');
  }

  async onLogout(): Promise<any> {
    this.zWaveAPISync.unsubscribe(this);
  }
  private async initialize() {
    console.log('zWaveAPI::init');
    await this.getConfigWrapperFromStorage();
    const filter = await this.getSubscriptionFilters();
    this.zWaveAPISync.subscribe(this, filter);
    // this.logoutService.subscribe(this);

    // update with all keys
    this.zWaveAPISyncUpdate(filter);
  }

  private async getSubscriptionFilters(): Promise<Array<string>> {
    const pathToConfigParams = await this.getPathToConfigParameters();
    const filter = [];
    for (const configId of Object.keys(ZWaveAPI.configIDs['112'])) {
      filter.push(pathToConfigParams + configId);
    }
    return filter;
  }

  private async getPathToConfigParameters(): Promise<string> {
    const user = await this.authService.getUser();
    const gateway = await this.gatewayService.getPairedGateway(
      user.access_token
    );
    const deviceAndInstance = await this.getDeviceAndInstance(gateway);
    return (
      'devices.' +
      deviceAndInstance.device +
      '.instances.' +
      deviceAndInstance.instance +
      '.commandClasses.112.data.'
    );
  }

  async zWaveAPISyncUpdate(updatedKeys?: string[]) {
    console.log('zWaveAPISyncUpdate ---');
    let anyValueHasChanged = false;
    for (const key of updatedKeys) {
      const object = await this.zWaveAPISync.getNodeOfZWaveObject(key);
      try {
        // tslint:disable-next-line:no-string-literal
        const newConfigValue = object['val']['value'];
        // tslint:disable-next-line:no-string-literal
        const updateTime = object['val']['updateTime'];
        const configId = await this.getConfigIdFromSubscriptionFilter(key);

        if (!this.configurationObj['112'][configId]) {
          this.configurationObj['112'][configId] = {
            configID: configId
          };
        }
        if (
          this.configurationObj['112'][configId].value !== newConfigValue
        ) {
          this.configurationObj['112'][configId].value = newConfigValue;
          this.configurationObj['112'][configId].timestamp = updateTime;
          this.configurationObj.timestamp = updateTime;

          anyValueHasChanged = true;
        }
      } catch (e) {
        console.log(
          'zWaveAPI::sync::error accessing config object: ' + JSON.stringify(e)
        );
        throw e;
      }
    }
    await this.setConfigWrapperToStorage(this.configurationObj);

    if (anyValueHasChanged) {
      this.notify();
    }
  }

  /**
   *
   * @param subscriptionFilter Has to be that format: 'devices.2.instances.0.commandClasses.112.data.54'
   */
  private async getConfigIdFromSubscriptionFilter(subscriptionFilter: string) {
    const arr = subscriptionFilter.split('.');
    return arr[arr.length - 1];
  }

  private initConfigWrapper() {
    this.configurationObj = {
      112: {
        commandClass: 112
      },
      timestamp: '0'
    };
  }

  private async getConfigWrapperFromStorage(): Promise<IConfigParamWrapper> {
    // const result = await this.localStorageService.getPersistentItem(
    //   this.storageName
    // );
    const result = await localStorage.getItem(
      this.storageName
    );
    const object: IConfigParamWrapper = JSON.parse(JSON.parse(result));
    if (!object) {
      this.initConfigWrapper();
    } else {
      this.configurationObj = object;
    }
    return this.configurationObj;
  }

  private async setConfigWrapperToStorage(obj: IConfigParamWrapper) {
    // await this.localStorageService.setPresistentItem(
    //   this.storageName,
    //   JSON.stringify(obj)
    // );
    await localStorage.setItem(
      this.storageName,
      JSON.stringify(obj)
    );
  }

  private async getDeviceAndInstance(
    gateway: Gateway
  ): Promise<{ device: number; instance: number }> {
    return { device: gateway.leckageDeviceId, instance: 0 };
  }

  private notify() {
    console.log('zWaveAPI::notify');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.observer.length; i++) {
      this.observer[i].update();
    }
  }

  subscribe(observer: IzAutomationObserver) {
    console.log('First unsubscribe before subscribing---');
    this.unsubscribe(observer);
    console.log('zWaveAPI::subscribe ' + observer.observerId);
    const idx = this.observer.indexOf(observer);
    if (idx === -1) {
      this.observer.push(observer);
      if (this.observer.length === 1) {
        this.initialize();
      }
    }
  }

  unsubscribe(observer: IzAutomationObserver) {
    let idx = -1;
    console.log('zWaveAPI::unsubscribe ' + observer.observerId);
    for (const obs of this.observer) {
      if (obs.observerId === observer.observerId) {
        idx = this.observer.indexOf(obs);
      }
    }
    if (idx !== -1) {
      this.observer.splice(idx, 1);
    }

    if (this.observer.length === 0) {
      console.log('zWaveAPI::clearing timout');
      this.zWaveAPISync.unsubscribe(this);
    }
  }

  async setConfiguration(
    commandClass: number,
    configID: number,
    value: string
  ) {
    console.log('zWaveAPI::setConfiguration');
    if (
      !ZWaveAPI.configIDs[commandClass] ||
      !ZWaveAPI.configIDs[commandClass][configID]
    ) {
      console.log(
        'zWaveAPI::setConfiguration: commandClass or configID not' +
          'Found in zWaveAPI.service.ts definition. Not allowed to set!'
      );
      throw new Error(
        'commandClass or configID not Found in zWaveAPI.service.ts definition. Not allowed to set!'
      );
    }
    // tslint:disable-next-line:no-string-literal
    const byteSize = ZWaveAPI.configIDs[commandClass][configID]['bytes'];
    console.log('byteSize: ' + byteSize);

    const user = await this.authService.getUser();
    const gateway = await this.gatewayService.getPairedGateway(
      user.access_token
    );
    const deviceAndInstance = await this.getDeviceAndInstance(gateway);
    await this.gatewayService.callApi(
      gateway,
      'ZWave.zway/Run/devices[' +
        deviceAndInstance.device +
        '].instances[' +
        deviceAndInstance.instance +
        '].commandClasses[' +
        commandClass +
        '].Set(' +
        configID +
        ',' +
        value +
        ',' +
        byteSize +
        ')',
      'post'
    );
  }
}
