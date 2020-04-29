/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OnlineOfflineService, onlineOfflineData, } from '../onlineOffline-service/onlineOffline.service';
import { AuthService } from '../auth-service/auth.service';
import { GatewayService } from '../gateway-service/gateway.service';
import { CacheService } from '../cache-service/cache.service';
import { SensorSettingService } from '../leakage-helper-service/settings.service';
import { SafeGuardDevice } from '../../models/zAutomation.model';
import { LogService } from '../logger-service/logger.service';
import * as i0 from "@angular/core";
import * as i1 from "../onlineOffline-service/onlineOffline.service";
import * as i2 from "../auth-service/auth.service";
import * as i3 from "../gateway-service/gateway.service";
import * as i4 from "../leakage-helper-service/settings.service";
import * as i5 from "../logger-service/logger.service";
import * as i6 from "../cache-service/cache.service";
/** @type {?} */
export const sensorUpdateSub = new Subject();
/** @type {?} */
export const sensorsDataSub = new Subject();
export class ZAutomationService {
    /**
     * @param {?} onlineOfflineService
     * @param {?} authService
     * @param {?} gatewayService
     * @param {?} settingService
     * @param {?} logService
     * @param {?} cacheService
     */
    constructor(onlineOfflineService, authService, gatewayService, settingService, logService, cacheService) {
        this.onlineOfflineService = onlineOfflineService;
        this.authService = authService;
        this.gatewayService = gatewayService;
        this.settingService = settingService;
        this.logService = logService;
        this.cacheService = cacheService;
        this.appStartTime = Math.floor(new Date().getTime() / 1000);
        this.storageName = 'zautomation_object';
        // private observer: IzAutomationObserver[] = [];
        this.remoteOnline = true;
        this.localOnline = true;
        this.refreshTime = 2500;
        this.freezeButtonUntil = 0;
        this.safeGuardChecked = { flag: false };
        this.failureRate = new BehaviorSubject(0);
        this.logService.log('zAutomationAPI::onInit');
        if (this.cacheService.getLocalData('safeGuardChecked')) {
            this.safeGuardChecked = this.cacheService.getLocalData('safeGuardChecked');
        }
        // this.onlineOfflineService.subscribe(this);
        onlineOfflineData.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.onlineOfflineUpdate(data.localOnline, data.remoteOnline);
        }));
    }
    /**
     * @return {?}
     */
    get deviceMap() {
        return this._deviceMap;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set deviceMap(value) {
        this._deviceMap = value;
        this.setConfigWrapperToStorage(value);
    }
    /**
     * \@description function to maintain the state of variables localOnline and remoteOnline
     * @param {?} localOnline boolean value true if device connected localy
     * @param {?} remoteOnline boolean value true if device connected remotely
     * @return {?}
     */
    onlineOfflineUpdate(localOnline, remoteOnline) {
        this.logService.log('zAutomationAPI::onlineOfflineUpdate ' + localOnline + ' ' + remoteOnline);
        this.remoteOnline = remoteOnline;
        this.localOnline = localOnline;
    }
    /**
     * \@description this method will initialize onlineOfflineService / and continuosly check for device connectivity status / it will continuosly call tick method which will fetch connected device info
     * @return {?}
     */
    initialize() {
        this.logService.log('initialize method call-- in zAutomation service');
        clearInterval(this.tickInterval);
        this.onlineOfflineService.initialize();
        // this.onlineOfflineInitialize();
        this.tick(true);
        this.logService.log('Tick Runs 1st Time ------------------->');
        this.tickInterval = setInterval((/**
         * @return {?}
         */
        () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // await this.onlineOfflineInitialize();
            this.tick(false);
        })), this.refreshTime);
    }
    /**
     * \@description if device is connected either localy or remotely then this function will call the polldata function / to get the connected device info
     * @private
     * @param {?} firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     * @return {?}
     */
    tick(firstRun) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log('in tick function zAutomation service');
            // if (this.observer.length > 0) {
            this.logService.log('zAutomationAPI::tick');
            try {
                if (!this.localOnline && !this.remoteOnline) {
                    this.logService.log('zAutomationAPI::no tick, because Offline');
                    return;
                }
                /** @type {?} */
                const user = yield this.authService.getUser();
                /** @type {?} */
                const gw = yield this.gatewayService.getPairedGateway(user.access_token);
                if (gw.leckageDeviceId !== undefined) {
                    if (firstRun) {
                        this.logService.log('zAutomationAPI::firstRunLoad');
                        this._deviceMap = yield this.getConfigWrapperFromStorage();
                        this.notify();
                    }
                    else {
                        // if (firstRun || this.observer.length > 0) {
                        this.logService.log('zAutomationAPI::tick::polldata');
                        this.logService.log('DEBUG firstrun:' + firstRun);
                        yield this.pollData();
                    }
                    // if (this.observer.length === 0) {
                    //   this.logService.log('DEBUG observer length 0');
                    //   // return;
                    // }
                    this.decFailureRate();
                }
                else {
                    this.logService.log('zAutomationAPI::tick: leackage device undefined, skipping network requests');
                }
            }
            catch (e) {
                this.logService.log('zAutomationAPI::tick:Catch: Could not get tick, error: ' +
                    e.message +
                    ';;;;;;;' +
                    e.stack);
                this.incFailureRate();
            }
        });
    }
    /**
     * \@description this function will call fetchpull data to either get whole data or to get data from last update time
     * @private
     * @return {?}
     */
    pollData() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.deviceMap &&
                this.deviceMap.updateTime &&
                Object.keys(this.deviceMap.devices).length > 0) {
                this.logService.log('zAutomationAPI::pollData: Polling delta data');
                yield this.fetchPollData('delta'); // passing parameter delta to fetch data from last upodatetime
            }
            else {
                this.logService.log('zAutomationAPI::pollData: Polling complete data');
                yield this.fetchPollData('complete'); // passing parameter complete to get whole object
            }
        });
    }
    /**
     * \@description call device API and get the data either complete or from last update time based on parameter passed
     * @private
     * @param {?} type should be delta if need to fetch data using last update time else complete
     * @return {?}
     */
    fetchPollData(type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log('in fetchPollData method');
            /** @type {?} */
            let url;
            if (type === 'delta') {
                url = 'ZAutomation/api/v1/devices?since=' + this.deviceMap.updateTime;
                // url = 'ZWaveAPI/Data/' + this.deviceMap.updateTime;
            }
            else {
                url = 'ZAutomation/api/v1/devices';
                // url = 'ZWaveAPI/Data/?call=4';
            }
            /** @type {?} */
            const newWrapper = { updateTime: '', devices: null };
            this.logService.log('zAutomationAPI::pollCompleteData');
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const gateway = yield this.gatewayService.getPairedGateway(user.access_token);
            /** @type {?} */
            const pollObject = yield this.gatewayService.callApi(gateway, url);
            this.logService.log('I am PollObject, I might have all the Device Data', pollObject);
            if (type === 'delta') {
                // tslint:disable-next-line:no-string-literal
                newWrapper.updateTime = pollObject['data']['updateTime'];
                // tslint:disable-next-line:no-string-literal
                newWrapper.devices = yield this.parseDevices(pollObject['data']['devices']);
                if (newWrapper && newWrapper.devices) {
                    // this.logService.log('zAutomationAPI::MergeAndSave: New one');
                    /** @type {?} */
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
            }
            else {
                // tslint:disable-next-line:no-string-literal
                newWrapper.updateTime = pollObject['data']['updateTime'];
                // tslint:disable-next-line:no-string-literal
                newWrapper.devices = yield this.parseDevices(pollObject['data']['devices']);
                // this.logService.log(newWrapper);
                this.deviceMap = newWrapper;
                this.notify();
            }
        });
    }
    /**
     * \@description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     * @private
     * @param {?} gateway
     * @return {?}
     */
    getDeviceAndInstance(gateway) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { device: gateway.leckageDeviceId, instance: 0 };
        });
    }
    /**
     * \@description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     * @private
     * @param {?} pollObject
     * @return {?}
     */
    parseDevices(pollObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const data = yield this.gatewayService.getPairedGateway(user.access_token);
            /** @type {?} */
            const deviceIDandInstance = yield this.getDeviceAndInstance(data);
            /** @type {?} */
            const result = {};
            for (const obj of pollObject) {
                // this.logService.log('Checking if ' + deviceIDandInstance.device + ' equals ' + obj.nodeId);
                if (obj &&
                    obj.nodeId &&
                    obj.nodeId.toString() === deviceIDandInstance.device.toString()) {
                    // tslint:disable-next-line:no-string-literal
                    result[obj['id']] = obj;
                }
                else if (obj.id === 'DummyDevice_18') {
                    result[obj.id] = obj;
                }
            }
            return result;
        });
    }
    /**
     * \@description getting zautomation_object from the Local storage
     * @private
     * @return {?}
     */
    getConfigWrapperFromStorage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const result = (this.cacheService.getLocalData(this.storageName));
            /** @type {?} */
            const object = (result);
            return object;
        });
    }
    /**
     * \@description setting zautomation_object from the Local storage
     * @private
     * @param {?} obj Object need to stored in local storage.
     * @return {?}
     */
    setConfigWrapperToStorage(obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.cacheService.setLocalData(this.storageName, (obj));
        });
    }
    /**
     * \@description this function notify every time when some chanegs are there in sensor values.
     * @private
     * @return {?}
     */
    notify() {
        sensorUpdateSub.next({ flag: true });
    }
    /**
     * \@description this is needed for filtering a specific sensor device from the whole Array
     * @param {?} regex  is regular erpression need to filteraton.
     * @return {?}
     */
    filterDeviceMap(regex) {
        for (const id in this.deviceMap.devices) {
            if (regex.test(id)) {
                return this.deviceMap.devices[id];
            }
        }
    }
    /**
     * \@description this just increase the Failure Counter
     * @private
     * @return {?}
     */
    incFailureRate() {
        if (this.failureRate.getValue() < 3) {
            this.failureRate.next(this.failureRate.getValue() + 1);
        }
    }
    /**
     * \@description It Just Decrease the Failure Counter.
     * @private
     * @return {?}
     */
    decFailureRate() {
        if (this.failureRate.getValue() > 0) {
            this.failureRate.next(this.failureRate.getValue() - 1);
        }
    }
    /**
     * \@description it needed for getting the updated value for a perticular Sensor.
     * @param {?} sensorNo using this we know which sensors updated information needed.
     * @return {?}
     */
    updateSensorValue(sensorNo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log('in updateSensorValue-->', sensorNo);
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const gateway = yield this.gatewayService.getPairedGateway(user.access_token);
            /** @type {?} */
            const deviceIDandInstance = yield this.getDeviceAndInstance(gateway);
            /** @type {?} */
            const deviceIDandInstanceString = 'ZWayVDev_zway_' +
                deviceIDandInstance.device +
                '-' +
                deviceIDandInstance.instance;
            /** @type {?} */
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
            yield this.gatewayService.callApi(gateway, 'ZAutomation/api/v1/devices/' + sensorPath + '/command/update');
        });
    }
    /**
     * \@description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param {?} sensorsValue need the initaial sensor values.
     * @return {?}
     */
    getSensorValue(sensorsValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const sensors = sensorsValue;
            this.logService.log('in update method-- device metrics');
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const gateway = yield this.gatewayService.getPairedGateway(user.access_token);
            if (this.deviceMap && this.deviceMap.updateTime) {
                // this.onlineOfflineService.REGUARD_OFFLINE = false;
                // if (!DemoMode.IS_MOCK_DATA_MODE || !DemoMode.IS_JUST_MOCK_DATA_MODE) {
                if (this.device) {
                    this.device.sensorDevices = [];
                }
                else {
                    this.device = new SafeGuardDevice();
                }
                if (this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-37$', 'g')).metrics.isFailed) {
                    // REGUARD is offline
                    // this.onlineOfflineService.REGUARD_OFFLINE = true;
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.getSensorValue(sensors);
                    }), 5000);
                    return;
                }
                // this.onlineOfflineService.REGUARD_OFFLINE = false;
                try {
                    /** @type {?} */
                    const settings = yield this.settingService.getSettings();
                    // WATERMETER
                    /** @type {?} */
                    const waterMeter = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-50-0$', 'g'));
                    this.logService.log('DeviceMetricsComponent::Update: settings meter before converting: ' +
                        JSON.stringify(waterMeter.metrics.level));
                    sensors[0].timestamp = waterMeter.updateTime;
                    sensors[0].value =
                        '' +
                            this.settingService.convertAmount(settings.amountUnit, waterMeter.metrics.level);
                    // Translation service
                    // this.sensors[0].subTitle = this.translationService.instant(
                    //   settings.amountUnit
                    // );
                    // this.sensors[0].title = this.translationService.instant('Amount');
                    // TEMPERATURE
                    /** @type {?} */
                    const waterTemperature = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-23$', 'g'));
                    sensors[1].timestamp = waterTemperature.updateTime;
                    sensors[1].value =
                        '' +
                            this.settingService.convertTemp(settings.temperatureUnit, waterTemperature.metrics.level);
                    // Translation Services
                    // this.sensors[1].subTitle = this.translationService.instant(
                    //   settings.temperatureUnit
                    // );
                    // this.sensors[1].title = this.translationService.instant(
                    //   'Temperature'
                    // );
                    // FLOW
                    /** @type {?} */
                    const waterFlow = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-56$', 'g'));
                    sensors[2].timestamp = waterFlow.updateTime;
                    sensors[2].value =
                        '' +
                            this.settingService.convertFlow(settings.flowUnit, waterFlow.metrics.level);
                    // Translation Services
                    // this.sensors[2].subTitle = this.translationService.instant(
                    //   settings.flowUnit
                    // );
                    // this.sensors[2].title = this.translationService.instant('Flow');
                    // PRESSURE
                    /** @type {?} */
                    const waterPressure = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-57$', 'g'));
                    this.logService.log('DeviceMetricsComponent::Update: settings waterPressure: ' +
                        JSON.stringify(waterPressure));
                    this.logService.log('Water Sensor Updated Time', waterPressure.updateTime);
                    sensors[3].timestamp = waterPressure.updateTime;
                    sensors[3].value =
                        '' +
                            this.settingService.convertPressure(settings.pressureUnit, waterPressure.metrics.level);
                    // Dummy Device 18
                    // PRESSURE
                    // alert('11');
                    /** @type {?} */
                    const dummyDevice = this.filterDeviceMap(new RegExp('DummyDevice_18', 'g'));
                    if (dummyDevice) {
                        this.logService.log('Dummy Device Updated level', dummyDevice.metrics.level);
                        sensors[4].timestamp = dummyDevice.updateTime;
                        sensors[4].value = dummyDevice.metrics.level;
                    }
                    this.logService.log('Hey I am New Sensor Value', sensors);
                    this.cacheService.setLocalData('sensors', (sensors));
                    this.logService.log('sensors-local-storage: ' + JSON.stringify(sensors));
                    /** @type {?} */
                    const now = Math.floor(new Date().getTime() / 1000) - 60 * 2;
                    /** @type {?} */
                    const nowOneMin = Math.floor(new Date().getTime() / 1000) - 20;
                    this.logService.log('before loop sensor--->', sensors);
                    for (let i = 0; i < sensors.length; i++) {
                        this.logService.log('DeviceMetricsComponent::Update: oldstamp: ' +
                            sensors[i].timestamp +
                            'newstamp: ' +
                            now);
                        if (sensors[i].timestamp) {
                            if (sensors[i].timestamp < now &&
                                this.appStartTime < nowOneMin) {
                                this.updateSensorValue(i);
                                this.logService.log('DeviceMetricsComponent::Update: UpdateSensorValueCalled ' +
                                    (now - sensors[i].timestamp));
                            }
                        }
                    }
                }
                catch (e) {
                    this.logService.log('DeviceMetricsComponent::Update: Error fetching deviceMetrics! ' + e);
                }
                // }
                if (this.freezeButtonUntil <= new Date().getTime()) {
                    /** @type {?} */
                    const guardChecked = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-37$', 'g'));
                    this.safeGuardChecked.flag = guardChecked.metrics.level === 'on';
                    this.cacheService.setLocalData('safeGuardChecked', (this.safeGuardChecked));
                }
            }
            sensorsDataSub.next({ data: sensors });
        });
    }
}
ZAutomationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ZAutomationService.ctorParameters = () => [
    { type: OnlineOfflineService },
    { type: AuthService },
    { type: GatewayService },
    { type: SensorSettingService },
    { type: LogService },
    { type: CacheService }
];
/** @nocollapse */ ZAutomationService.ngInjectableDef = i0.defineInjectable({ factory: function ZAutomationService_Factory() { return new ZAutomationService(i0.inject(i1.OnlineOfflineService), i0.inject(i2.AuthService), i0.inject(i3.GatewayService), i0.inject(i4.SensorSettingService), i0.inject(i5.LogService), i0.inject(i6.CacheService)); }, token: ZAutomationService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ZAutomationService.prototype.appStartTime;
    /** @type {?} */
    ZAutomationService.prototype.device;
    /** @type {?} */
    ZAutomationService.prototype.tickInterval;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.storageName;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype._deviceMap;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.remoteOnline;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.localOnline;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.refreshTime;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.freezeButtonUntil;
    /** @type {?} */
    ZAutomationService.prototype.safeGuardChecked;
    /** @type {?} */
    ZAutomationService.prototype.failureRate;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.onlineOfflineService;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.gatewayService;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.settingService;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.logService;
    /**
     * @type {?}
     * @private
     */
    ZAutomationService.prototype.cacheService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiekF1dG9tYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy96QXV0b21hdGlvbi1zZXJ2aWNlL3pBdXRvbWF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFDTCxvQkFBb0IsRUFBRSxpQkFBaUIsR0FDeEMsTUFBTSxnREFBZ0QsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBS0wsZUFBZSxFQUNoQixNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Ozs7O0FBRTlELE1BQU0sT0FBTyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUU7O0FBQzVDLE1BQU0sT0FBTyxjQUFjLEdBQUcsSUFBSSxPQUFPLEVBQUU7QUFNM0MsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7Ozs7O0lBd0I3QixZQUNVLG9CQUEwQyxFQUMxQyxXQUF3QixFQUN4QixjQUE4QixFQUM5QixjQUFvQyxFQUNwQyxVQUFzQixFQUN0QixZQUEwQjtRQUwxQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFk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OUIsOENBQXdDOztJQUN4Qyx5Q0FBNkM7Ozs7O0lBRTNDLGtEQUFrRDs7Ozs7SUFDbEQseUNBQWdDOzs7OztJQUNoQyw0Q0FBc0M7Ozs7O0lBQ3RDLDRDQUE0Qzs7Ozs7SUFDNUMsd0NBQThCOzs7OztJQUM5QiwwQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgT25saW5lT2ZmbGluZVNlcnZpY2UsIG9ubGluZU9mZmxpbmVEYXRhLFxufSBmcm9tICcuLi9vbmxpbmVPZmZsaW5lLXNlcnZpY2Uvb25saW5lT2ZmbGluZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHYXRld2F5U2VydmljZSB9IGZyb20gJy4uL2dhdGV3YXktc2VydmljZS9nYXRld2F5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vY2FjaGUtc2VydmljZS9jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbnNvclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vbGVha2FnZS1oZWxwZXItc2VydmljZS9zZXR0aW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFNlbnNvcixcbiAgVmlydHVhbERldmljZSxcbiAgRGV2aWNlRGF0YSxcbiAgRGV2aWNlTWFwLFxuICBTYWZlR3VhcmREZXZpY2Vcbn0gZnJvbSAnLi4vLi4vbW9kZWxzL3pBdXRvbWF0aW9uLm1vZGVsJztcbmltcG9ydCB7IEdhdGV3YXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ2V0d2F5Lm1vZGVsJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXItc2VydmljZS9sb2dnZXIuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBzZW5zb3JVcGRhdGVTdWIgPSBuZXcgU3ViamVjdCgpO1xuZXhwb3J0IGNvbnN0IHNlbnNvcnNEYXRhU3ViID0gbmV3IFN1YmplY3QoKTtcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBaQXV0b21hdGlvblNlcnZpY2Uge1xuICBhcHBTdGFydFRpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG5cblxuICBkZXZpY2U6IFNhZmVHdWFyZERldmljZTtcblxuICB0aWNrSW50ZXJ2YWw7XG4gIHByaXZhdGUgc3RvcmFnZU5hbWUgPSAnemF1dG9tYXRpb25fb2JqZWN0JztcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbiAgcHJpdmF0ZSBfZGV2aWNlTWFwOiBEZXZpY2VNYXA7XG4gIGdldCBkZXZpY2VNYXAoKTogRGV2aWNlTWFwIHtcbiAgICByZXR1cm4gdGhpcy5fZGV2aWNlTWFwO1xuICB9XG4gIHNldCBkZXZpY2VNYXAodmFsdWU6IERldmljZU1hcCkge1xuICAgIHRoaXMuX2RldmljZU1hcCA9IHZhbHVlO1xuICAgIHRoaXMuc2V0Q29uZmlnV3JhcHBlclRvU3RvcmFnZSh2YWx1ZSk7XG4gIH1cbiAgLy8gcHJpdmF0ZSBvYnNlcnZlcjogSXpBdXRvbWF0aW9uT2JzZXJ2ZXJbXSA9IFtdO1xuICBwcml2YXRlIHJlbW90ZU9ubGluZSA9IHRydWU7XG4gIHByaXZhdGUgbG9jYWxPbmxpbmUgPSB0cnVlO1xuICBwcml2YXRlIHJlZnJlc2hUaW1lID0gMjUwMDtcbiAgcHJpdmF0ZSBmcmVlemVCdXR0b25VbnRpbCA9IDA7XG4gIHNhZmVHdWFyZENoZWNrZWQ6IGFueSA9IHsgZmxhZzogZmFsc2UgfTtcbiAgZmFpbHVyZVJhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb25saW5lT2ZmbGluZVNlcnZpY2U6IE9ubGluZU9mZmxpbmVTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2F0ZXdheVNlcnZpY2U6IEdhdGV3YXlTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2V0dGluZ1NlcnZpY2U6IFNlbnNvclNldHRpbmdTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9nU2VydmljZTogTG9nU2VydmljZSxcbiAgICBwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCd6QXV0b21hdGlvbkFQSTo6b25Jbml0Jyk7XG4gICAgaWYgKHRoaXMuY2FjaGVTZXJ2aWNlLmdldExvY2FsRGF0YSgnc2FmZUd1YXJkQ2hlY2tlZCcpKSB7XG4gICAgICB0aGlzLnNhZmVHdWFyZENoZWNrZWQgPSB0aGlzLmNhY2hlU2VydmljZS5nZXRMb2NhbERhdGEoJ3NhZmVHdWFyZENoZWNrZWQnKTtcbiAgICB9XG4gICAgLy8gdGhpcy5vbmxpbmVPZmZsaW5lU2VydmljZS5zdWJzY3JpYmUodGhpcyk7XG4gICAgb25saW5lT2ZmbGluZURhdGEuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIHRoaXMub25saW5lT2ZmbGluZVVwZGF0ZShkYXRhLmxvY2FsT25saW5lLCBkYXRhLnJlbW90ZU9ubGluZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGZ1bmN0aW9uIHRvIG1haW50YWluIHRoZSBzdGF0ZSBvZiB2YXJpYWJsZXMgbG9jYWxPbmxpbmUgYW5kIHJlbW90ZU9ubGluZVxuICAgKiBAcGFyYW0gbG9jYWxPbmxpbmUgYm9vbGVhbiB2YWx1ZSB0cnVlIGlmIGRldmljZSBjb25uZWN0ZWQgbG9jYWx5XG4gICAqIEBwYXJhbSByZW1vdGVPbmxpbmUgYm9vbGVhbiB2YWx1ZSB0cnVlIGlmIGRldmljZSBjb25uZWN0ZWQgcmVtb3RlbHlcbiAgICovXG4gIG9ubGluZU9mZmxpbmVVcGRhdGUobG9jYWxPbmxpbmU6IGJvb2xlYW4sIHJlbW90ZU9ubGluZTogYm9vbGVhbikge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coXG4gICAgICAnekF1dG9tYXRpb25BUEk6Om9ubGluZU9mZmxpbmVVcGRhdGUgJyArIGxvY2FsT25saW5lICsgJyAnICsgcmVtb3RlT25saW5lXG4gICAgKTtcbiAgICB0aGlzLnJlbW90ZU9ubGluZSA9IHJlbW90ZU9ubGluZTtcbiAgICB0aGlzLmxvY2FsT25saW5lID0gbG9jYWxPbmxpbmU7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIHRoaXMgbWV0aG9kIHdpbGwgaW5pdGlhbGl6ZSBvbmxpbmVPZmZsaW5lU2VydmljZVxuICAgKiBAZGVzY3JpcHRpb24gYW5kIGNvbnRpbnVvc2x5IGNoZWNrIGZvciBkZXZpY2UgY29ubmVjdGl2aXR5IHN0YXR1c1xuICAgKiBAZGVzY3JpcHRpb24gaXQgd2lsbCBjb250aW51b3NseSBjYWxsIHRpY2sgbWV0aG9kIHdoaWNoIHdpbGwgZmV0Y2ggY29ubmVjdGVkIGRldmljZSBpbmZvXG4gICAqL1xuICBwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdpbml0aWFsaXplIG1ldGhvZCBjYWxsLS0gaW4gekF1dG9tYXRpb24gc2VydmljZScpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aWNrSW50ZXJ2YWwpO1xuICAgIHRoaXMub25saW5lT2ZmbGluZVNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIC8vIHRoaXMub25saW5lT2ZmbGluZUluaXRpYWxpemUoKTtcbiAgICB0aGlzLnRpY2sodHJ1ZSk7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnVGljayBSdW5zIDFzdCBUaW1lIC0tLS0tLS0tLS0tLS0tLS0tLS0+Jyk7XG4gICAgdGhpcy50aWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAvLyBhd2FpdCB0aGlzLm9ubGluZU9mZmxpbmVJbml0aWFsaXplKCk7XG4gICAgICB0aGlzLnRpY2soZmFsc2UpO1xuICAgIH0sIHRoaXMucmVmcmVzaFRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBpZiBkZXZpY2UgaXMgY29ubmVjdGVkIGVpdGhlciBsb2NhbHkgb3IgcmVtb3RlbHkgdGhlbiB0aGlzIGZ1bmN0aW9uIHdpbGwgY2FsbCB0aGUgcG9sbGRhdGEgZnVuY3Rpb25cbiAgICogQGRlc2NyaXB0aW9uIHRvIGdldCB0aGUgY29ubmVjdGVkIGRldmljZSBpbmZvXG4gICAqIEBwYXJhbSBmaXJzdFJ1biBpcyB0byBjaGVjayB3aGV0aGVyIGZ1bmN0aW9uIGlzIGhpdHRlZCB2ZXJ5IGZpcnN0IHRpbWUgYXMgbmVlZCB0b1xuICAgKiBmZXRjaCB6QXV0b21hdGlvbiBvYmplY3QgZnJvbSBsb2NhbCBzdG9yYWdlIGluIGZpcnN0IHJ1blxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyB0aWNrKGZpcnN0UnVuOiBib29sZWFuKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnaW4gdGljayBmdW5jdGlvbiB6QXV0b21hdGlvbiBzZXJ2aWNlJyk7XG4gICAgLy8gaWYgKHRoaXMub2JzZXJ2ZXIubGVuZ3RoID4gMCkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ3pBdXRvbWF0aW9uQVBJOjp0aWNrJyk7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5sb2NhbE9ubGluZSAmJiAhdGhpcy5yZW1vdGVPbmxpbmUpIHtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnekF1dG9tYXRpb25BUEk6Om5vIHRpY2ssIGJlY2F1c2UgT2ZmbGluZScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyKCk7XG4gICAgICBjb25zdCBndyA9IGF3YWl0IHRoaXMuZ2F0ZXdheVNlcnZpY2UuZ2V0UGFpcmVkR2F0ZXdheShcbiAgICAgICAgdXNlci5hY2Nlc3NfdG9rZW5cbiAgICAgICk7XG5cbiAgICAgIGlmIChndy5sZWNrYWdlRGV2aWNlSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZmlyc3RSdW4pIHtcbiAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCd6QXV0b21hdGlvbkFQSTo6Zmlyc3RSdW5Mb2FkJyk7XG4gICAgICAgICAgdGhpcy5fZGV2aWNlTWFwID0gYXdhaXQgdGhpcy5nZXRDb25maWdXcmFwcGVyRnJvbVN0b3JhZ2UoKTtcbiAgICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIChmaXJzdFJ1biB8fCB0aGlzLm9ic2VydmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCd6QXV0b21hdGlvbkFQSTo6dGljazo6cG9sbGRhdGEnKTtcbiAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdERUJVRyBmaXJzdHJ1bjonICsgZmlyc3RSdW4pO1xuICAgICAgICAgIGF3YWl0IHRoaXMucG9sbERhdGEoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAodGhpcy5vYnNlcnZlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdERUJVRyBvYnNlcnZlciBsZW5ndGggMCcpO1xuICAgICAgICAvLyAgIC8vIHJldHVybjtcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLmRlY0ZhaWx1cmVSYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKFxuICAgICAgICAgICd6QXV0b21hdGlvbkFQSTo6dGljazogbGVhY2thZ2UgZGV2aWNlIHVuZGVmaW5lZCwgc2tpcHBpbmcgbmV0d29yayByZXF1ZXN0cydcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKFxuICAgICAgICAnekF1dG9tYXRpb25BUEk6OnRpY2s6Q2F0Y2g6IENvdWxkIG5vdCBnZXQgdGljaywgZXJyb3I6ICcgK1xuICAgICAgICBlLm1lc3NhZ2UgK1xuICAgICAgICAnOzs7Ozs7OycgK1xuICAgICAgICBlLnN0YWNrXG4gICAgICApO1xuICAgICAgdGhpcy5pbmNGYWlsdXJlUmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gdGhpcyBmdW5jdGlvbiB3aWxsIGNhbGwgZmV0Y2hwdWxsIGRhdGEgdG8gZWl0aGVyIGdldCB3aG9sZSBkYXRhIG9yIHRvIGdldCBkYXRhIGZyb20gbGFzdCB1cGRhdGUgdGltZVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBwb2xsRGF0YSgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmRldmljZU1hcCAmJlxuICAgICAgdGhpcy5kZXZpY2VNYXAudXBkYXRlVGltZSAmJlxuICAgICAgT2JqZWN0LmtleXModGhpcy5kZXZpY2VNYXAuZGV2aWNlcykubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnekF1dG9tYXRpb25BUEk6OnBvbGxEYXRhOiBQb2xsaW5nIGRlbHRhIGRhdGEnKTtcbiAgICAgIGF3YWl0IHRoaXMuZmV0Y2hQb2xsRGF0YSgnZGVsdGEnKTsgLy8gcGFzc2luZyBwYXJhbWV0ZXIgZGVsdGEgdG8gZmV0Y2ggZGF0YSBmcm9tIGxhc3QgdXBvZGF0ZXRpbWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnekF1dG9tYXRpb25BUEk6OnBvbGxEYXRhOiBQb2xsaW5nIGNvbXBsZXRlIGRhdGEnKTtcbiAgICAgIGF3YWl0IHRoaXMuZmV0Y2hQb2xsRGF0YSgnY29tcGxldGUnKTsgLy8gcGFzc2luZyBwYXJhbWV0ZXIgY29tcGxldGUgdG8gZ2V0IHdob2xlIG9iamVjdFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gY2FsbCBkZXZpY2UgQVBJIGFuZCBnZXQgdGhlIGRhdGEgZWl0aGVyIGNvbXBsZXRlIG9yIGZyb20gbGFzdCB1cGRhdGUgdGltZSBiYXNlZCBvbiBwYXJhbWV0ZXIgcGFzc2VkXG4gICAqIEBwYXJhbSB0eXBlIHNob3VsZCBiZSBkZWx0YSBpZiBuZWVkIHRvIGZldGNoIGRhdGEgdXNpbmcgbGFzdCB1cGRhdGUgdGltZSBlbHNlIGNvbXBsZXRlXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGZldGNoUG9sbERhdGEodHlwZSkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2luIGZldGNoUG9sbERhdGEgbWV0aG9kJyk7XG4gICAgbGV0IHVybDtcbiAgICBpZiAodHlwZSA9PT0gJ2RlbHRhJykge1xuICAgICAgdXJsID0gJ1pBdXRvbWF0aW9uL2FwaS92MS9kZXZpY2VzP3NpbmNlPScgKyB0aGlzLmRldmljZU1hcC51cGRhdGVUaW1lO1xuICAgICAgLy8gdXJsID0gJ1pXYXZlQVBJL0RhdGEvJyArIHRoaXMuZGV2aWNlTWFwLnVwZGF0ZVRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9ICdaQXV0b21hdGlvbi9hcGkvdjEvZGV2aWNlcyc7XG4gICAgICAvLyB1cmwgPSAnWldhdmVBUEkvRGF0YS8/Y2FsbD00JztcbiAgICB9XG5cbiAgICBjb25zdCBuZXdXcmFwcGVyOiBEZXZpY2VNYXAgPSB7IHVwZGF0ZVRpbWU6ICcnLCBkZXZpY2VzOiBudWxsIH07XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnekF1dG9tYXRpb25BUEk6OnBvbGxDb21wbGV0ZURhdGEnKTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyKCk7XG4gICAgY29uc3QgZ2F0ZXdheSA9IGF3YWl0IHRoaXMuZ2F0ZXdheVNlcnZpY2UuZ2V0UGFpcmVkR2F0ZXdheShcbiAgICAgIHVzZXIuYWNjZXNzX3Rva2VuXG4gICAgKTtcbiAgICBjb25zdCBwb2xsT2JqZWN0ID0gYXdhaXQgdGhpcy5nYXRld2F5U2VydmljZS5jYWxsQXBpKFxuICAgICAgZ2F0ZXdheSxcbiAgICAgIHVybFxuICAgICk7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnSSBhbSBQb2xsT2JqZWN0LCBJIG1pZ2h0IGhhdmUgYWxsIHRoZSBEZXZpY2UgRGF0YScsIHBvbGxPYmplY3QpO1xuICAgIGlmICh0eXBlID09PSAnZGVsdGEnKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgIG5ld1dyYXBwZXIudXBkYXRlVGltZSA9IHBvbGxPYmplY3RbJ2RhdGEnXVsndXBkYXRlVGltZSddO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICBuZXdXcmFwcGVyLmRldmljZXMgPSBhd2FpdCB0aGlzLnBhcnNlRGV2aWNlcyhwb2xsT2JqZWN0WydkYXRhJ11bJ2RldmljZXMnXSk7XG4gICAgICBpZiAobmV3V3JhcHBlciAmJiBuZXdXcmFwcGVyLmRldmljZXMpIHtcbiAgICAgICAgLy8gdGhpcy5sb2dTZXJ2aWNlLmxvZygnekF1dG9tYXRpb25BUEk6Ok1lcmdlQW5kU2F2ZTogTmV3IG9uZScpO1xuICAgICAgICBsZXQgdXBkYXRlID0gZmFsc2U7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IGRldmljZUlEIGluIG5ld1dyYXBwZXIuZGV2aWNlcykge1xuICAgICAgICAgIC8vIHRoaXMubG9nU2VydmljZS5sb2coJ3pBdXRvbWF0aW9uQVBJOjpNZXJnZUFuZFNhdmU6IFVwZGF0aW5nJyArIEpTT04uc3RyaW5naWZ5KG5ld1dyYXBwZXIuZGV2aWNlc1tkZXZpY2VJRF0pKTtcbiAgICAgICAgICB0aGlzLl9kZXZpY2VNYXAuZGV2aWNlc1tkZXZpY2VJRF0gPSBuZXdXcmFwcGVyLmRldmljZXNbZGV2aWNlSURdO1xuICAgICAgICAgIHVwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgIC8vIHRoaXMubG9nU2VydmljZS5sb2coJ3pBdXRvbWF0aW9uQVBJOjpNZXJnZUFuZFNhdmU6IE5vdGlmeScpO1xuICAgICAgICAgIHRoaXMuc2V0Q29uZmlnV3JhcHBlclRvU3RvcmFnZSh0aGlzLl9kZXZpY2VNYXApO1xuICAgICAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICBuZXdXcmFwcGVyLnVwZGF0ZVRpbWUgPSBwb2xsT2JqZWN0WydkYXRhJ11bJ3VwZGF0ZVRpbWUnXTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICAgICAgbmV3V3JhcHBlci5kZXZpY2VzID0gYXdhaXQgdGhpcy5wYXJzZURldmljZXMocG9sbE9iamVjdFsnZGF0YSddWydkZXZpY2VzJ10pO1xuICAgICAgLy8gdGhpcy5sb2dTZXJ2aWNlLmxvZyhuZXdXcmFwcGVyKTtcbiAgICAgIHRoaXMuZGV2aWNlTWFwID0gbmV3V3JhcHBlcjtcbiAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gSGVyZSBXZSBuZWVkIHRvIFByb3ZpZGUgdGhlIExlYWthZ2UgRGV2aWNlIElkIGFuZFxuICAgKiAgSXRzIEluc3RhbmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBnZXREZXZpY2VBbmRJbnN0YW5jZShcbiAgICBnYXRld2F5OiBHYXRld2F5XG4gICk6IFByb21pc2U8eyBkZXZpY2U6IG51bWJlcjsgaW5zdGFuY2U6IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIHsgZGV2aWNlOiBnYXRld2F5LmxlY2thZ2VEZXZpY2VJZCwgaW5zdGFuY2U6IDAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gSXQgcGFyc2UgZnJvbSBhbGwgdGhlIERldmljZSBEYXRhIGFuZCByZXR1cm4gdGhlIEFycmF5IG9mXG4gICAqIGRldmljZXMgd2hvc2Ugbm9kZSBpZCBpcyBtYXRjaGVzIHdpdGggZ2F0ZXdheS5sZWNrYWdlRGV2aWNlSWQuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIHBhcnNlRGV2aWNlcyhcbiAgICBwb2xsT2JqZWN0XG4gICk6IFByb21pc2U8eyBbaWQ6IHN0cmluZ106IFZpcnR1YWxEZXZpY2UgfT4ge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldFVzZXIoKTtcbiAgICBjb25zdCBkYXRhOiBhbnkgPSBhd2FpdCB0aGlzLmdhdGV3YXlTZXJ2aWNlLmdldFBhaXJlZEdhdGV3YXkodXNlci5hY2Nlc3NfdG9rZW4pO1xuICAgIGNvbnN0IGRldmljZUlEYW5kSW5zdGFuY2UgPSBhd2FpdCB0aGlzLmdldERldmljZUFuZEluc3RhbmNlKGRhdGEpO1xuICAgIGNvbnN0IHJlc3VsdDogeyBbaWQ6IHN0cmluZ106IFZpcnR1YWxEZXZpY2UgfSA9IHt9O1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHBvbGxPYmplY3QpIHtcbiAgICAgIC8vIHRoaXMubG9nU2VydmljZS5sb2coJ0NoZWNraW5nIGlmICcgKyBkZXZpY2VJRGFuZEluc3RhbmNlLmRldmljZSArICcgZXF1YWxzICcgKyBvYmoubm9kZUlkKTtcbiAgICAgIGlmIChcbiAgICAgICAgb2JqICYmXG4gICAgICAgIG9iai5ub2RlSWQgJiZcbiAgICAgICAgb2JqLm5vZGVJZC50b1N0cmluZygpID09PSBkZXZpY2VJRGFuZEluc3RhbmNlLmRldmljZS50b1N0cmluZygpXG4gICAgICApIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICAgIHJlc3VsdFtvYmpbJ2lkJ11dID0gb2JqO1xuICAgICAgfSBlbHNlIGlmIChvYmouaWQgPT09ICdEdW1teURldmljZV8xOCcpIHtcbiAgICAgICAgcmVzdWx0W29iai5pZF0gPSBvYmo7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBnZXR0aW5nIHphdXRvbWF0aW9uX29iamVjdCBmcm9tIHRoZSBMb2NhbCBzdG9yYWdlXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGdldENvbmZpZ1dyYXBwZXJGcm9tU3RvcmFnZSgpOiBQcm9taXNlPERldmljZU1hcD4ge1xuICAgIGNvbnN0IHJlc3VsdDogYW55ID0gKHRoaXMuY2FjaGVTZXJ2aWNlLmdldExvY2FsRGF0YSh0aGlzLnN0b3JhZ2VOYW1lKSk7XG4gICAgY29uc3Qgb2JqZWN0OiBEZXZpY2VNYXAgPSAocmVzdWx0KTtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gc2V0dGluZyB6YXV0b21hdGlvbl9vYmplY3QgZnJvbSB0aGUgTG9jYWwgc3RvcmFnZVxuICAgKiBAcGFyYW0gb2JqIE9iamVjdCBuZWVkIHRvIHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBzZXRDb25maWdXcmFwcGVyVG9TdG9yYWdlKG9iajogRGV2aWNlTWFwKSB7XG4gICAgdGhpcy5jYWNoZVNlcnZpY2Uuc2V0TG9jYWxEYXRhKHRoaXMuc3RvcmFnZU5hbWUsIChvYmopKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gdGhpcyBmdW5jdGlvbiBub3RpZnkgZXZlcnkgdGltZSB3aGVuIHNvbWUgY2hhbmVncyBhcmUgdGhlcmUgaW4gc2Vuc29yIHZhbHVlcy5cbiAgICovXG4gIHByaXZhdGUgbm90aWZ5KCkge1xuICAgIHNlbnNvclVwZGF0ZVN1Yi5uZXh0KHsgZmxhZzogdHJ1ZSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gdGhpcyBpcyBuZWVkZWQgZm9yIGZpbHRlcmluZyBhIHNwZWNpZmljIHNlbnNvciBkZXZpY2UgZnJvbSB0aGUgd2hvbGUgQXJyYXlcbiAgICogQHBhcmFtIHJlZ2V4ICBpcyByZWd1bGFyIGVycHJlc3Npb24gbmVlZCB0byBmaWx0ZXJhdG9uLlxuICAgKi9cbiAgZmlsdGVyRGV2aWNlTWFwKHJlZ2V4OiBSZWdFeHApOiBEZXZpY2VEYXRhIHtcbiAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuZGV2aWNlTWFwLmRldmljZXMpIHtcbiAgICAgIGlmIChyZWdleC50ZXN0KGlkKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2VNYXAuZGV2aWNlc1tpZF07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gdGhpcyBqdXN0IGluY3JlYXNlIHRoZSBGYWlsdXJlIENvdW50ZXJcbiAgICovXG4gIHByaXZhdGUgaW5jRmFpbHVyZVJhdGUoKSB7XG4gICAgaWYgKHRoaXMuZmFpbHVyZVJhdGUuZ2V0VmFsdWUoKSA8IDMpIHtcbiAgICAgIHRoaXMuZmFpbHVyZVJhdGUubmV4dCh0aGlzLmZhaWx1cmVSYXRlLmdldFZhbHVlKCkgKyAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEl0IEp1c3QgRGVjcmVhc2UgdGhlIEZhaWx1cmUgQ291bnRlci5cbiAgICovXG5cbiAgcHJpdmF0ZSBkZWNGYWlsdXJlUmF0ZSgpIHtcbiAgICBpZiAodGhpcy5mYWlsdXJlUmF0ZS5nZXRWYWx1ZSgpID4gMCkge1xuICAgICAgdGhpcy5mYWlsdXJlUmF0ZS5uZXh0KHRoaXMuZmFpbHVyZVJhdGUuZ2V0VmFsdWUoKSAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gaXQgbmVlZGVkIGZvciBnZXR0aW5nIHRoZSB1cGRhdGVkIHZhbHVlIGZvciBhIHBlcnRpY3VsYXIgU2Vuc29yLlxuICAgKiBAcGFyYW0gc2Vuc29yTm8gdXNpbmcgdGhpcyB3ZSBrbm93IHdoaWNoIHNlbnNvcnMgdXBkYXRlZCBpbmZvcm1hdGlvbiBuZWVkZWQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlU2Vuc29yVmFsdWUoc2Vuc29yTm86IG51bWJlcikge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2luIHVwZGF0ZVNlbnNvclZhbHVlLS0+Jywgc2Vuc29yTm8pO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldFVzZXIoKTtcbiAgICBjb25zdCBnYXRld2F5OiBhbnkgPSBhd2FpdCB0aGlzLmdhdGV3YXlTZXJ2aWNlLmdldFBhaXJlZEdhdGV3YXkodXNlci5hY2Nlc3NfdG9rZW4pO1xuICAgIGNvbnN0IGRldmljZUlEYW5kSW5zdGFuY2UgPSBhd2FpdCB0aGlzLmdldERldmljZUFuZEluc3RhbmNlKGdhdGV3YXkpO1xuICAgIGNvbnN0IGRldmljZUlEYW5kSW5zdGFuY2VTdHJpbmcgPVxuICAgICAgJ1pXYXlWRGV2X3p3YXlfJyArXG4gICAgICBkZXZpY2VJRGFuZEluc3RhbmNlLmRldmljZSArXG4gICAgICAnLScgK1xuICAgICAgZGV2aWNlSURhbmRJbnN0YW5jZS5pbnN0YW5jZTtcblxuICAgIGxldCBzZW5zb3JQYXRoID0gJyc7XG5cbiAgICBzd2l0Y2ggKHNlbnNvck5vKSB7XG4gICAgICBjYXNlIDA6IHtcbiAgICAgICAgc2Vuc29yUGF0aCA9IGRldmljZUlEYW5kSW5zdGFuY2VTdHJpbmcgKyAnLTUwLTAnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMToge1xuICAgICAgICBzZW5zb3JQYXRoID0gZGV2aWNlSURhbmRJbnN0YW5jZVN0cmluZyArICctNDktMjMnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMjoge1xuICAgICAgICBzZW5zb3JQYXRoID0gZGV2aWNlSURhbmRJbnN0YW5jZVN0cmluZyArICctNDktNTYnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMzoge1xuICAgICAgICBzZW5zb3JQYXRoID0gZGV2aWNlSURhbmRJbnN0YW5jZVN0cmluZyArICctNDktNTcnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnY2FsbCBhcGkgLS0tPnNlbnNvclBhdGgnLCBzZW5zb3JQYXRoKTtcbiAgICBhd2FpdCB0aGlzLmdhdGV3YXlTZXJ2aWNlLmNhbGxBcGkoXG4gICAgICBnYXRld2F5LFxuICAgICAgJ1pBdXRvbWF0aW9uL2FwaS92MS9kZXZpY2VzLycgKyBzZW5zb3JQYXRoICsgJy9jb21tYW5kL3VwZGF0ZSdcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIGZ1bmN0aW9uIGlzIG5lZWRlZCBmb3IgdGhlIGdldHRpbmcgdGhlIFNlbnNvciB2YWx1ZXNcbiAgICogYW5kIHN0b3JlIGl0IGluIGxvY2FsIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBzZW5zb3JzVmFsdWUgbmVlZCB0aGUgaW5pdGFpYWwgc2Vuc29yIHZhbHVlcy5cbiAgICovXG4gIGFzeW5jIGdldFNlbnNvclZhbHVlKHNlbnNvcnNWYWx1ZSkge1xuICAgIGNvbnN0IHNlbnNvcnM6IFNlbnNvcltdID0gc2Vuc29yc1ZhbHVlO1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2luIHVwZGF0ZSBtZXRob2QtLSBkZXZpY2UgbWV0cmljcycpO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldFVzZXIoKTtcbiAgICBjb25zdCBnYXRld2F5ID0gYXdhaXQgdGhpcy5nYXRld2F5U2VydmljZS5nZXRQYWlyZWRHYXRld2F5KFxuICAgICAgdXNlci5hY2Nlc3NfdG9rZW5cbiAgICApO1xuICAgIGlmICh0aGlzLmRldmljZU1hcCAmJiB0aGlzLmRldmljZU1hcC51cGRhdGVUaW1lKSB7XG4gICAgICAvLyB0aGlzLm9ubGluZU9mZmxpbmVTZXJ2aWNlLlJFR1VBUkRfT0ZGTElORSA9IGZhbHNlO1xuICAgICAgLy8gaWYgKCFEZW1vTW9kZS5JU19NT0NLX0RBVEFfTU9ERSB8fCAhRGVtb01vZGUuSVNfSlVTVF9NT0NLX0RBVEFfTU9ERSkge1xuICAgICAgaWYgKHRoaXMuZGV2aWNlKSB7XG4gICAgICAgIHRoaXMuZGV2aWNlLnNlbnNvckRldmljZXMgPSBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGV2aWNlID0gbmV3IFNhZmVHdWFyZERldmljZSgpO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmZpbHRlckRldmljZU1hcChcbiAgICAgICAgICBuZXcgUmVnRXhwKGdhdGV3YXkubGVja2FnZURldmljZUlkICsgJy1bMC05XSotMzckJywgJ2cnKVxuICAgICAgICApLm1ldHJpY3MuaXNGYWlsZWRcbiAgICAgICkge1xuICAgICAgICAvLyBSRUdVQVJEIGlzIG9mZmxpbmVcbiAgICAgICAgLy8gdGhpcy5vbmxpbmVPZmZsaW5lU2VydmljZS5SRUdVQVJEX09GRkxJTkUgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmdldFNlbnNvclZhbHVlKHNlbnNvcnMpO1xuICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gdGhpcy5vbmxpbmVPZmZsaW5lU2VydmljZS5SRUdVQVJEX09GRkxJTkUgPSBmYWxzZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgdGhpcy5zZXR0aW5nU2VydmljZS5nZXRTZXR0aW5ncygpO1xuXG4gICAgICAgIC8vIFdBVEVSTUVURVJcblxuICAgICAgICBjb25zdCB3YXRlck1ldGVyID0gdGhpcy5maWx0ZXJEZXZpY2VNYXAoXG4gICAgICAgICAgbmV3IFJlZ0V4cChnYXRld2F5LmxlY2thZ2VEZXZpY2VJZCArICctWzAtOV0qLTUwLTAkJywgJ2cnKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coXG4gICAgICAgICAgJ0RldmljZU1ldHJpY3NDb21wb25lbnQ6OlVwZGF0ZTogc2V0dGluZ3MgbWV0ZXIgYmVmb3JlIGNvbnZlcnRpbmc6ICcgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHdhdGVyTWV0ZXIubWV0cmljcy5sZXZlbClcbiAgICAgICAgKTtcblxuICAgICAgICBzZW5zb3JzWzBdLnRpbWVzdGFtcCA9IHdhdGVyTWV0ZXIudXBkYXRlVGltZTtcblxuICAgICAgICBzZW5zb3JzWzBdLnZhbHVlID1cbiAgICAgICAgICAnJyArXG4gICAgICAgICAgdGhpcy5zZXR0aW5nU2VydmljZS5jb252ZXJ0QW1vdW50KFxuICAgICAgICAgICAgc2V0dGluZ3MuYW1vdW50VW5pdCxcbiAgICAgICAgICAgIHdhdGVyTWV0ZXIubWV0cmljcy5sZXZlbFxuICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gVHJhbnNsYXRpb24gc2VydmljZVxuICAgICAgICAvLyB0aGlzLnNlbnNvcnNbMF0uc3ViVGl0bGUgPSB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5pbnN0YW50KFxuICAgICAgICAvLyAgIHNldHRpbmdzLmFtb3VudFVuaXRcbiAgICAgICAgLy8gKTtcbiAgICAgICAgLy8gdGhpcy5zZW5zb3JzWzBdLnRpdGxlID0gdGhpcy50cmFuc2xhdGlvblNlcnZpY2UuaW5zdGFudCgnQW1vdW50Jyk7XG5cbiAgICAgICAgLy8gVEVNUEVSQVRVUkVcblxuICAgICAgICBjb25zdCB3YXRlclRlbXBlcmF0dXJlID0gdGhpcy5maWx0ZXJEZXZpY2VNYXAoXG4gICAgICAgICAgbmV3IFJlZ0V4cChnYXRld2F5LmxlY2thZ2VEZXZpY2VJZCArICctWzAtOV0qLTQ5LTIzJCcsICdnJylcbiAgICAgICAgKTtcblxuICAgICAgICBzZW5zb3JzWzFdLnRpbWVzdGFtcCA9IHdhdGVyVGVtcGVyYXR1cmUudXBkYXRlVGltZTtcblxuICAgICAgICBzZW5zb3JzWzFdLnZhbHVlID1cbiAgICAgICAgICAnJyArXG4gICAgICAgICAgdGhpcy5zZXR0aW5nU2VydmljZS5jb252ZXJ0VGVtcChcbiAgICAgICAgICAgIHNldHRpbmdzLnRlbXBlcmF0dXJlVW5pdCxcbiAgICAgICAgICAgIHdhdGVyVGVtcGVyYXR1cmUubWV0cmljcy5sZXZlbFxuICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gVHJhbnNsYXRpb24gU2VydmljZXNcbiAgICAgICAgLy8gdGhpcy5zZW5zb3JzWzFdLnN1YlRpdGxlID0gdGhpcy50cmFuc2xhdGlvblNlcnZpY2UuaW5zdGFudChcbiAgICAgICAgLy8gICBzZXR0aW5ncy50ZW1wZXJhdHVyZVVuaXRcbiAgICAgICAgLy8gKTtcbiAgICAgICAgLy8gdGhpcy5zZW5zb3JzWzFdLnRpdGxlID0gdGhpcy50cmFuc2xhdGlvblNlcnZpY2UuaW5zdGFudChcbiAgICAgICAgLy8gICAnVGVtcGVyYXR1cmUnXG4gICAgICAgIC8vICk7XG5cbiAgICAgICAgLy8gRkxPV1xuXG4gICAgICAgIGNvbnN0IHdhdGVyRmxvdyA9IHRoaXMuZmlsdGVyRGV2aWNlTWFwKFxuICAgICAgICAgIG5ldyBSZWdFeHAoZ2F0ZXdheS5sZWNrYWdlRGV2aWNlSWQgKyAnLVswLTldKi00OS01NiQnLCAnZycpXG4gICAgICAgICk7XG5cbiAgICAgICAgc2Vuc29yc1syXS50aW1lc3RhbXAgPSB3YXRlckZsb3cudXBkYXRlVGltZTtcblxuICAgICAgICBzZW5zb3JzWzJdLnZhbHVlID1cbiAgICAgICAgICAnJyArXG4gICAgICAgICAgdGhpcy5zZXR0aW5nU2VydmljZS5jb252ZXJ0RmxvdyhcbiAgICAgICAgICAgIHNldHRpbmdzLmZsb3dVbml0LFxuICAgICAgICAgICAgd2F0ZXJGbG93Lm1ldHJpY3MubGV2ZWxcbiAgICAgICAgICApO1xuICAgICAgICAvLyBUcmFuc2xhdGlvbiBTZXJ2aWNlc1xuICAgICAgICAvLyB0aGlzLnNlbnNvcnNbMl0uc3ViVGl0bGUgPSB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5pbnN0YW50KFxuICAgICAgICAvLyAgIHNldHRpbmdzLmZsb3dVbml0XG4gICAgICAgIC8vICk7XG4gICAgICAgIC8vIHRoaXMuc2Vuc29yc1syXS50aXRsZSA9IHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLmluc3RhbnQoJ0Zsb3cnKTtcblxuICAgICAgICAvLyBQUkVTU1VSRVxuXG4gICAgICAgIGNvbnN0IHdhdGVyUHJlc3N1cmUgPSB0aGlzLmZpbHRlckRldmljZU1hcChcbiAgICAgICAgICBuZXcgUmVnRXhwKGdhdGV3YXkubGVja2FnZURldmljZUlkICsgJy1bMC05XSotNDktNTckJywgJ2cnKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKFxuICAgICAgICAgICdEZXZpY2VNZXRyaWNzQ29tcG9uZW50OjpVcGRhdGU6IHNldHRpbmdzIHdhdGVyUHJlc3N1cmU6ICcgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHdhdGVyUHJlc3N1cmUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ1dhdGVyIFNlbnNvciBVcGRhdGVkIFRpbWUnLCB3YXRlclByZXNzdXJlLnVwZGF0ZVRpbWUpO1xuXG4gICAgICAgIHNlbnNvcnNbM10udGltZXN0YW1wID0gd2F0ZXJQcmVzc3VyZS51cGRhdGVUaW1lO1xuXG4gICAgICAgIHNlbnNvcnNbM10udmFsdWUgPVxuICAgICAgICAgICcnICtcbiAgICAgICAgICB0aGlzLnNldHRpbmdTZXJ2aWNlLmNvbnZlcnRQcmVzc3VyZShcbiAgICAgICAgICAgIHNldHRpbmdzLnByZXNzdXJlVW5pdCxcbiAgICAgICAgICAgIHdhdGVyUHJlc3N1cmUubWV0cmljcy5sZXZlbFxuICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gRHVtbXkgRGV2aWNlIDE4XG4gICAgICAgIC8vIFBSRVNTVVJFXG4gICAgICAgIC8vIGFsZXJ0KCcxMScpO1xuICAgICAgICBjb25zdCBkdW1teURldmljZSA9IHRoaXMuZmlsdGVyRGV2aWNlTWFwKFxuICAgICAgICAgIG5ldyBSZWdFeHAoJ0R1bW15RGV2aWNlXzE4JywgJ2cnKVxuICAgICAgICApO1xuICAgICAgICBpZiAoZHVtbXlEZXZpY2UpIHtcbiAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdEdW1teSBEZXZpY2UgVXBkYXRlZCBsZXZlbCcsIGR1bW15RGV2aWNlLm1ldHJpY3MubGV2ZWwpO1xuICAgICAgICAgIHNlbnNvcnNbNF0udGltZXN0YW1wID0gZHVtbXlEZXZpY2UudXBkYXRlVGltZTtcbiAgICAgICAgICBzZW5zb3JzWzRdLnZhbHVlID0gZHVtbXlEZXZpY2UubWV0cmljcy5sZXZlbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdIZXkgSSBhbSBOZXcgU2Vuc29yIFZhbHVlJywgc2Vuc29ycyk7XG4gICAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldExvY2FsRGF0YSgnc2Vuc29ycycsIChzZW5zb3JzKSk7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ3NlbnNvcnMtbG9jYWwtc3RvcmFnZTogJyArIEpTT04uc3RyaW5naWZ5KHNlbnNvcnMpKTtcblxuICAgICAgICBjb25zdCBub3cgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgLSA2MCAqIDI7XG4gICAgICAgIGNvbnN0IG5vd09uZU1pbiA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSAtIDIwO1xuXG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2JlZm9yZSBsb29wIHNlbnNvci0tLT4nLCBzZW5zb3JzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbnNvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKFxuICAgICAgICAgICAgJ0RldmljZU1ldHJpY3NDb21wb25lbnQ6OlVwZGF0ZTogb2xkc3RhbXA6ICcgK1xuICAgICAgICAgICAgc2Vuc29yc1tpXS50aW1lc3RhbXAgK1xuICAgICAgICAgICAgJ25ld3N0YW1wOiAnICtcbiAgICAgICAgICAgIG5vd1xuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKHNlbnNvcnNbaV0udGltZXN0YW1wKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHNlbnNvcnNbaV0udGltZXN0YW1wIDwgbm93ICYmXG4gICAgICAgICAgICAgIHRoaXMuYXBwU3RhcnRUaW1lIDwgbm93T25lTWluXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZW5zb3JWYWx1ZShpKTtcbiAgICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZyhcbiAgICAgICAgICAgICAgICAnRGV2aWNlTWV0cmljc0NvbXBvbmVudDo6VXBkYXRlOiBVcGRhdGVTZW5zb3JWYWx1ZUNhbGxlZCAnICtcbiAgICAgICAgICAgICAgICAobm93IC0gc2Vuc29yc1tpXS50aW1lc3RhbXApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coXG4gICAgICAgICAgJ0RldmljZU1ldHJpY3NDb21wb25lbnQ6OlVwZGF0ZTogRXJyb3IgZmV0Y2hpbmcgZGV2aWNlTWV0cmljcyEgJyArIGVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIH1cblxuICAgICAgaWYgKHRoaXMuZnJlZXplQnV0dG9uVW50aWwgPD0gbmV3IERhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgY29uc3QgZ3VhcmRDaGVja2VkID0gdGhpcy5maWx0ZXJEZXZpY2VNYXAoXG4gICAgICAgICAgbmV3IFJlZ0V4cChnYXRld2F5LmxlY2thZ2VEZXZpY2VJZCArICctWzAtOV0qLTM3JCcsICdnJylcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnNhZmVHdWFyZENoZWNrZWQuZmxhZyA9IGd1YXJkQ2hlY2tlZC5tZXRyaWNzLmxldmVsID09PSAnb24nO1xuICAgICAgICB0aGlzLmNhY2hlU2VydmljZS5zZXRMb2NhbERhdGEoJ3NhZmVHdWFyZENoZWNrZWQnLCAodGhpcy5zYWZlR3VhcmRDaGVja2VkKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbnNvcnNEYXRhU3ViLm5leHQoeyBkYXRhOiBzZW5zb3JzIH0pO1xuICB9XG5cbn1cbiJdfQ==