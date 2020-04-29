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
export var sensorUpdateSub = new Subject();
/** @type {?} */
export var sensorsDataSub = new Subject();
var ZAutomationService = /** @class */ (function () {
    function ZAutomationService(onlineOfflineService, authService, gatewayService, settingService, logService, cacheService) {
        var _this = this;
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
        function (data) {
            _this.onlineOfflineUpdate(data.localOnline, data.remoteOnline);
        }));
    }
    Object.defineProperty(ZAutomationService.prototype, "deviceMap", {
        get: /**
         * @return {?}
         */
        function () {
            return this._deviceMap;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._deviceMap = value;
            this.setConfigWrapperToStorage(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description function to maintain the state of variables localOnline and remoteOnline
     * @param localOnline boolean value true if device connected localy
     * @param remoteOnline boolean value true if device connected remotely
     */
    /**
     * \@description function to maintain the state of variables localOnline and remoteOnline
     * @param {?} localOnline boolean value true if device connected localy
     * @param {?} remoteOnline boolean value true if device connected remotely
     * @return {?}
     */
    ZAutomationService.prototype.onlineOfflineUpdate = /**
     * \@description function to maintain the state of variables localOnline and remoteOnline
     * @param {?} localOnline boolean value true if device connected localy
     * @param {?} remoteOnline boolean value true if device connected remotely
     * @return {?}
     */
    function (localOnline, remoteOnline) {
        this.logService.log('zAutomationAPI::onlineOfflineUpdate ' + localOnline + ' ' + remoteOnline);
        this.remoteOnline = remoteOnline;
        this.localOnline = localOnline;
    };
    /**
     * @description this method will initialize onlineOfflineService
     * @description and continuosly check for device connectivity status
     * @description it will continuosly call tick method which will fetch connected device info
     */
    /**
     * \@description this method will initialize onlineOfflineService / and continuosly check for device connectivity status / it will continuosly call tick method which will fetch connected device info
     * @return {?}
     */
    ZAutomationService.prototype.initialize = /**
     * \@description this method will initialize onlineOfflineService / and continuosly check for device connectivity status / it will continuosly call tick method which will fetch connected device info
     * @return {?}
     */
    function () {
        var _this = this;
        this.logService.log('initialize method call-- in zAutomation service');
        clearInterval(this.tickInterval);
        this.onlineOfflineService.initialize();
        // this.onlineOfflineInitialize();
        this.tick(true);
        this.logService.log('Tick Runs 1st Time ------------------->');
        this.tickInterval = setInterval((/**
         * @return {?}
         */
        function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // await this.onlineOfflineInitialize();
                this.tick(false);
                return [2 /*return*/];
            });
        }); }), this.refreshTime);
    };
    /**
     * @description if device is connected either localy or remotely then this function will call the polldata function
     * @description to get the connected device info
     * @param firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     */
    /**
     * \@description if device is connected either localy or remotely then this function will call the polldata function / to get the connected device info
     * @private
     * @param {?} firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     * @return {?}
     */
    ZAutomationService.prototype.tick = /**
     * \@description if device is connected either localy or remotely then this function will call the polldata function / to get the connected device info
     * @private
     * @param {?} firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     * @return {?}
     */
    function (firstRun) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, gw, _a, e_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logService.log('in tick function zAutomation service');
                        // if (this.observer.length > 0) {
                        this.logService.log('zAutomationAPI::tick');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        if (!this.localOnline && !this.remoteOnline) {
                            this.logService.log('zAutomationAPI::no tick, because Offline');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.authService.getUser()];
                    case 2:
                        user = _b.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 3:
                        gw = _b.sent();
                        if (!(gw.leckageDeviceId !== undefined)) return [3 /*break*/, 8];
                        if (!firstRun) return [3 /*break*/, 5];
                        this.logService.log('zAutomationAPI::firstRunLoad');
                        _a = this;
                        return [4 /*yield*/, this.getConfigWrapperFromStorage()];
                    case 4:
                        _a._deviceMap = _b.sent();
                        this.notify();
                        return [3 /*break*/, 7];
                    case 5:
                        // if (firstRun || this.observer.length > 0) {
                        this.logService.log('zAutomationAPI::tick::polldata');
                        this.logService.log('DEBUG firstrun:' + firstRun);
                        return [4 /*yield*/, this.pollData()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        // if (this.observer.length === 0) {
                        //   this.logService.log('DEBUG observer length 0');
                        //   // return;
                        // }
                        this.decFailureRate();
                        return [3 /*break*/, 9];
                    case 8:
                        this.logService.log('zAutomationAPI::tick: leackage device undefined, skipping network requests');
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_1 = _b.sent();
                        this.logService.log('zAutomationAPI::tick:Catch: Could not get tick, error: ' +
                            e_1.message +
                            ';;;;;;;' +
                            e_1.stack);
                        this.incFailureRate();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description this function will call fetchpull data to either get whole data or to get data from last update time
     */
    /**
     * \@description this function will call fetchpull data to either get whole data or to get data from last update time
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.pollData = /**
     * \@description this function will call fetchpull data to either get whole data or to get data from last update time
     * @private
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.deviceMap &&
                            this.deviceMap.updateTime &&
                            Object.keys(this.deviceMap.devices).length > 0)) return [3 /*break*/, 2];
                        this.logService.log('zAutomationAPI::pollData: Polling delta data');
                        return [4 /*yield*/, this.fetchPollData('delta')];
                    case 1:
                        _a.sent(); // passing parameter delta to fetch data from last upodatetime
                        return [3 /*break*/, 4];
                    case 2:
                        this.logService.log('zAutomationAPI::pollData: Polling complete data');
                        return [4 /*yield*/, this.fetchPollData('complete')];
                    case 3:
                        _a.sent(); // passing parameter complete to get whole object
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description call device API and get the data either complete or from last update time based on parameter passed
     * @param type should be delta if need to fetch data using last update time else complete
     */
    /**
     * \@description call device API and get the data either complete or from last update time based on parameter passed
     * @private
     * @param {?} type should be delta if need to fetch data using last update time else complete
     * @return {?}
     */
    ZAutomationService.prototype.fetchPollData = /**
     * \@description call device API and get the data either complete or from last update time based on parameter passed
     * @private
     * @param {?} type should be delta if need to fetch data using last update time else complete
     * @return {?}
     */
    function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, newWrapper, user, gateway, pollObject, _a, update, deviceID, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.logService.log('in fetchPollData method');
                        if (type === 'delta') {
                            url = 'ZAutomation/api/v1/devices?since=' + this.deviceMap.updateTime;
                            // url = 'ZWaveAPI/Data/' + this.deviceMap.updateTime;
                        }
                        else {
                            url = 'ZAutomation/api/v1/devices';
                            // url = 'ZWaveAPI/Data/?call=4';
                        }
                        newWrapper = { updateTime: '', devices: null };
                        this.logService.log('zAutomationAPI::pollCompleteData');
                        return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _c.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        gateway = _c.sent();
                        return [4 /*yield*/, this.gatewayService.callApi(gateway, url)];
                    case 3:
                        pollObject = _c.sent();
                        this.logService.log('I am PollObject, I might have all the Device Data', pollObject);
                        if (!(type === 'delta')) return [3 /*break*/, 5];
                        // tslint:disable-next-line:no-string-literal
                        newWrapper.updateTime = pollObject['data']['updateTime'];
                        // tslint:disable-next-line:no-string-literal
                        _a = newWrapper;
                        return [4 /*yield*/, this.parseDevices(pollObject['data']['devices'])];
                    case 4:
                        // tslint:disable-next-line:no-string-literal
                        _a.devices = _c.sent();
                        if (newWrapper && newWrapper.devices) {
                            // this.logService.log('zAutomationAPI::MergeAndSave: New one');
                            update = false;
                            // tslint:disable-next-line:forin
                            for (deviceID in newWrapper.devices) {
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
                        return [3 /*break*/, 7];
                    case 5:
                        // tslint:disable-next-line:no-string-literal
                        newWrapper.updateTime = pollObject['data']['updateTime'];
                        // tslint:disable-next-line:no-string-literal
                        _b = newWrapper;
                        return [4 /*yield*/, this.parseDevices(pollObject['data']['devices'])];
                    case 6:
                        // tslint:disable-next-line:no-string-literal
                        _b.devices = _c.sent();
                        // this.logService.log(newWrapper);
                        this.deviceMap = newWrapper;
                        this.notify();
                        _c.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     */
    /**
     * \@description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     * @private
     * @param {?} gateway
     * @return {?}
     */
    ZAutomationService.prototype.getDeviceAndInstance = /**
     * \@description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     * @private
     * @param {?} gateway
     * @return {?}
     */
    function (gateway) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, { device: gateway.leckageDeviceId, instance: 0 }];
            });
        });
    };
    /**
     * @description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     */
    /**
     * \@description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     * @private
     * @param {?} pollObject
     * @return {?}
     */
    ZAutomationService.prototype.parseDevices = /**
     * \@description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     * @private
     * @param {?} pollObject
     * @return {?}
     */
    function (pollObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_2, _a, user, data, deviceIDandInstance, result, pollObject_1, pollObject_1_1, obj;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, this.getDeviceAndInstance(data)];
                    case 3:
                        deviceIDandInstance = _b.sent();
                        result = {};
                        try {
                            for (pollObject_1 = tslib_1.__values(pollObject), pollObject_1_1 = pollObject_1.next(); !pollObject_1_1.done; pollObject_1_1 = pollObject_1.next()) {
                                obj = pollObject_1_1.value;
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
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (pollObject_1_1 && !pollObject_1_1.done && (_a = pollObject_1.return)) _a.call(pollObject_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @description getting zautomation_object from the Local storage
     */
    /**
     * \@description getting zautomation_object from the Local storage
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.getConfigWrapperFromStorage = /**
     * \@description getting zautomation_object from the Local storage
     * @private
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, object;
            return tslib_1.__generator(this, function (_a) {
                result = (this.cacheService.getLocalData(this.storageName));
                object = (result);
                return [2 /*return*/, object];
            });
        });
    };
    /**
     * @description setting zautomation_object from the Local storage
     * @param obj Object need to stored in local storage.
     */
    /**
     * \@description setting zautomation_object from the Local storage
     * @private
     * @param {?} obj Object need to stored in local storage.
     * @return {?}
     */
    ZAutomationService.prototype.setConfigWrapperToStorage = /**
     * \@description setting zautomation_object from the Local storage
     * @private
     * @param {?} obj Object need to stored in local storage.
     * @return {?}
     */
    function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.cacheService.setLocalData(this.storageName, (obj));
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description this function notify every time when some chanegs are there in sensor values.
     */
    /**
     * \@description this function notify every time when some chanegs are there in sensor values.
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.notify = /**
     * \@description this function notify every time when some chanegs are there in sensor values.
     * @private
     * @return {?}
     */
    function () {
        sensorUpdateSub.next({ flag: true });
    };
    /**
     * @description this is needed for filtering a specific sensor device from the whole Array
     * @param regex  is regular erpression need to filteraton.
     */
    /**
     * \@description this is needed for filtering a specific sensor device from the whole Array
     * @param {?} regex  is regular erpression need to filteraton.
     * @return {?}
     */
    ZAutomationService.prototype.filterDeviceMap = /**
     * \@description this is needed for filtering a specific sensor device from the whole Array
     * @param {?} regex  is regular erpression need to filteraton.
     * @return {?}
     */
    function (regex) {
        for (var id in this.deviceMap.devices) {
            if (regex.test(id)) {
                return this.deviceMap.devices[id];
            }
        }
    };
    /**
     * @description this just increase the Failure Counter
     */
    /**
     * \@description this just increase the Failure Counter
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.incFailureRate = /**
     * \@description this just increase the Failure Counter
     * @private
     * @return {?}
     */
    function () {
        if (this.failureRate.getValue() < 3) {
            this.failureRate.next(this.failureRate.getValue() + 1);
        }
    };
    /**
     * @description It Just Decrease the Failure Counter.
     */
    /**
     * \@description It Just Decrease the Failure Counter.
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.decFailureRate = /**
     * \@description It Just Decrease the Failure Counter.
     * @private
     * @return {?}
     */
    function () {
        if (this.failureRate.getValue() > 0) {
            this.failureRate.next(this.failureRate.getValue() - 1);
        }
    };
    /**
     * @description it needed for getting the updated value for a perticular Sensor.
     * @param sensorNo using this we know which sensors updated information needed.
     */
    /**
     * \@description it needed for getting the updated value for a perticular Sensor.
     * @param {?} sensorNo using this we know which sensors updated information needed.
     * @return {?}
     */
    ZAutomationService.prototype.updateSensorValue = /**
     * \@description it needed for getting the updated value for a perticular Sensor.
     * @param {?} sensorNo using this we know which sensors updated information needed.
     * @return {?}
     */
    function (sensorNo) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, gateway, deviceIDandInstance, deviceIDandInstanceString, sensorPath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logService.log('in updateSensorValue-->', sensorNo);
                        return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        gateway = _a.sent();
                        return [4 /*yield*/, this.getDeviceAndInstance(gateway)];
                    case 3:
                        deviceIDandInstance = _a.sent();
                        deviceIDandInstanceString = 'ZWayVDev_zway_' +
                            deviceIDandInstance.device +
                            '-' +
                            deviceIDandInstance.instance;
                        sensorPath = '';
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
                        return [4 /*yield*/, this.gatewayService.callApi(gateway, 'ZAutomation/api/v1/devices/' + sensorPath + '/command/update')];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param sensorsValue need the initaial sensor values.
     */
    /**
     * \@description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param {?} sensorsValue need the initaial sensor values.
     * @return {?}
     */
    ZAutomationService.prototype.getSensorValue = /**
     * \@description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param {?} sensorsValue need the initaial sensor values.
     * @return {?}
     */
    function (sensorsValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sensors, user, gateway, settings, waterMeter, waterTemperature, waterFlow, waterPressure, dummyDevice, now, nowOneMin, i, e_3, guardChecked;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sensors = sensorsValue;
                        this.logService.log('in update method-- device metrics');
                        return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        gateway = _a.sent();
                        if (!(this.deviceMap && this.deviceMap.updateTime)) return [3 /*break*/, 7];
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
                            function () {
                                _this.getSensorValue(sensors);
                            }), 5000);
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.settingService.getSettings()];
                    case 4:
                        settings = _a.sent();
                        // WATERMETER
                        waterMeter = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-50-0$', 'g'));
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
                        waterTemperature = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-23$', 'g'));
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
                        waterFlow = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-56$', 'g'));
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
                        waterPressure = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-57$', 'g'));
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
                        dummyDevice = this.filterDeviceMap(new RegExp('DummyDevice_18', 'g'));
                        if (dummyDevice) {
                            this.logService.log('Dummy Device Updated level', dummyDevice.metrics.level);
                            sensors[4].timestamp = dummyDevice.updateTime;
                            sensors[4].value = dummyDevice.metrics.level;
                        }
                        this.logService.log('Hey I am New Sensor Value', sensors);
                        this.cacheService.setLocalData('sensors', (sensors));
                        this.logService.log('sensors-local-storage: ' + JSON.stringify(sensors));
                        now = Math.floor(new Date().getTime() / 1000) - 60 * 2;
                        nowOneMin = Math.floor(new Date().getTime() / 1000) - 20;
                        this.logService.log('before loop sensor--->', sensors);
                        for (i = 0; i < sensors.length; i++) {
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
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        this.logService.log('DeviceMetricsComponent::Update: Error fetching deviceMetrics! ' + e_3);
                        return [3 /*break*/, 6];
                    case 6:
                        // }
                        if (this.freezeButtonUntil <= new Date().getTime()) {
                            guardChecked = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-37$', 'g'));
                            this.safeGuardChecked.flag = guardChecked.metrics.level === 'on';
                            this.cacheService.setLocalData('safeGuardChecked', (this.safeGuardChecked));
                        }
                        _a.label = 7;
                    case 7:
                        sensorsDataSub.next({ data: sensors });
                        return [2 /*return*/];
                }
            });
        });
    };
    ZAutomationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ZAutomationService.ctorParameters = function () { return [
        { type: OnlineOfflineService },
        { type: AuthService },
        { type: GatewayService },
        { type: SensorSettingService },
        { type: LogService },
        { type: CacheService }
    ]; };
    /** @nocollapse */ ZAutomationService.ngInjectableDef = i0.defineInjectable({ factory: function ZAutomationService_Factory() { return new ZAutomationService(i0.inject(i1.OnlineOfflineService), i0.inject(i2.AuthService), i0.inject(i3.GatewayService), i0.inject(i4.SensorSettingService), i0.inject(i5.LogService), i0.inject(i6.CacheService)); }, token: ZAutomationService, providedIn: "root" });
    return ZAutomationService;
}());
export { ZAutomationService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiekF1dG9tYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy96QXV0b21hdGlvbi1zZXJ2aWNlL3pBdXRvbWF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFDTCxvQkFBb0IsRUFBRSxpQkFBaUIsR0FDeEMsTUFBTSxnREFBZ0QsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBS0wsZUFBZSxFQUNoQixNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Ozs7O0FBRTlELE1BQU0sS0FBTyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUU7O0FBQzVDLE1BQU0sS0FBTyxjQUFjLEdBQUcsSUFBSSxPQUFPLEVBQUU7QUFHM0M7SUEyQkUsNEJBQ1Usb0JBQTBDLEVBQzFDLFdBQXdCLEVBQ3hCLGNBQThCLEVBQzlCLGNBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLFlBQTBCO1FBTnBDLGlCQWdCQztRQWZTLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBN0JwQyxpQkFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQU0vQyxnQkFBVyxHQUFHLG9CQUFvQixDQUFDOztRQVduQyxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDOUIscUJBQWdCLEdBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDeEMsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQVMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUM1RTtRQUNELDZDQUE2QztRQUM3QyxpQkFBaUIsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxJQUFTO1lBQ3BDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRSxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUE5QkQsc0JBQUkseUNBQVM7Ozs7UUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDOzs7OztRQUNELFVBQWMsS0FBZ0I7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUpBO0lBOEJEOzs7O09BSUc7Ozs7Ozs7SUFDSCxnREFBbUI7Ozs7OztJQUFuQixVQUFvQixXQUFvQixFQUFFLFlBQXFCO1FBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQixzQ0FBc0MsR0FBRyxXQUFXLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FDMUUsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHOzs7OztJQUNJLHVDQUFVOzs7O0lBQWpCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1FBQ3ZFLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZDLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXOzs7UUFBQzs7Z0JBQzlCLHdDQUF3QztnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O2FBQ2xCLEdBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDVyxpQ0FBSTs7Ozs7OztJQUFsQixVQUFtQixRQUFpQjs7Ozs7O3dCQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO3dCQUM1RCxrQ0FBa0M7d0JBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Ozs7d0JBRTFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTs0QkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQzs0QkFDaEUsc0JBQU87eUJBQ1I7d0JBQ1kscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQXZDLElBQUksR0FBRyxTQUFnQzt3QkFDbEMscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FDbkQsSUFBSSxDQUFDLFlBQVksQ0FDbEIsRUFBQTs7d0JBRkssRUFBRSxHQUFHLFNBRVY7NkJBRUcsQ0FBQSxFQUFFLENBQUMsZUFBZSxLQUFLLFNBQVMsQ0FBQSxFQUFoQyx3QkFBZ0M7NkJBQzlCLFFBQVEsRUFBUix3QkFBUTt3QkFDVixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO3dCQUNwRCxLQUFBLElBQUksQ0FBQTt3QkFBYyxxQkFBTSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsRUFBQTs7d0JBQTFELEdBQUssVUFBVSxHQUFHLFNBQXdDLENBQUM7d0JBQzNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7O3dCQUVkLDhDQUE4Qzt3QkFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzt3QkFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLENBQUM7d0JBQ2xELHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQXJCLFNBQXFCLENBQUM7Ozt3QkFFeEIsb0NBQW9DO3dCQUNwQyxvREFBb0Q7d0JBQ3BELGVBQWU7d0JBQ2YsSUFBSTt3QkFDSixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozt3QkFFdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLDRFQUE0RSxDQUM3RSxDQUFDOzs7Ozt3QkFHSixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FDakIseURBQXlEOzRCQUN6RCxHQUFDLENBQUMsT0FBTzs0QkFDVCxTQUFTOzRCQUNULEdBQUMsQ0FBQyxLQUFLLENBQ1IsQ0FBQzt3QkFDRixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7OztLQUV6QjtJQUVEOztPQUVHOzs7Ozs7SUFDVyxxQ0FBUTs7Ozs7SUFBdEI7Ozs7OzZCQUVJLENBQUEsSUFBSSxDQUFDLFNBQVM7NEJBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVOzRCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxFQUY5Qyx3QkFFOEM7d0JBRTlDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7d0JBQ3BFLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFqQyxTQUFpQyxDQUFDLENBQUMsOERBQThEOzs7d0JBRWpHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7d0JBQ3ZFLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUE7O3dCQUFwQyxTQUFvQyxDQUFDLENBQUMsaURBQWlEOzs7Ozs7S0FFMUY7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDVywwQ0FBYTs7Ozs7O0lBQTNCLFVBQTRCLElBQUk7Ozs7Ozt3QkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQzt3QkFFL0MsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFOzRCQUNwQixHQUFHLEdBQUcsbUNBQW1DLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7NEJBQ3RFLHNEQUFzRDt5QkFDdkQ7NkJBQU07NEJBQ0wsR0FBRyxHQUFHLDRCQUE0QixDQUFDOzRCQUNuQyxpQ0FBaUM7eUJBQ2xDO3dCQUVLLFVBQVUsR0FBYyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTt3QkFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQzt3QkFDM0MscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQXZDLElBQUksR0FBRyxTQUFnQzt3QkFDN0IscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FDeEQsSUFBSSxDQUFDLFlBQVksQ0FDbEIsRUFBQTs7d0JBRkssT0FBTyxHQUFHLFNBRWY7d0JBQ2tCLHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUNsRCxPQUFPLEVBQ1AsR0FBRyxDQUNKLEVBQUE7O3dCQUhLLFVBQVUsR0FBRyxTQUdsQjt3QkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsRUFBRSxVQUFVLENBQUMsQ0FBQzs2QkFDakYsQ0FBQSxJQUFJLEtBQUssT0FBTyxDQUFBLEVBQWhCLHdCQUFnQjt3QkFDbEIsNkNBQTZDO3dCQUM3QyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDekQsNkNBQTZDO3dCQUM3QyxLQUFBLFVBQVUsQ0FBQTt3QkFBVyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFBOzt3QkFEM0UsNkNBQTZDO3dCQUM3QyxHQUFXLE9BQU8sR0FBRyxTQUFzRCxDQUFDO3dCQUM1RSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFOzs0QkFFaEMsTUFBTSxHQUFHLEtBQUs7NEJBQ2xCLGlDQUFpQzs0QkFDakMsS0FBVyxRQUFRLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTtnQ0FDekMsZ0hBQWdIO2dDQUNoSCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUNqRSxNQUFNLEdBQUcsSUFBSSxDQUFDOzZCQUNmOzRCQUNELElBQUksTUFBTSxFQUFFO2dDQUNWLCtEQUErRDtnQ0FDL0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDaEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOzZCQUNmO3lCQUNGOzs7d0JBRUQsNkNBQTZDO3dCQUM3QyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDekQsNkNBQTZDO3dCQUM3QyxLQUFBLFVBQVUsQ0FBQTt3QkFBVyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFBOzt3QkFEM0UsNkNBQTZDO3dCQUM3QyxHQUFXLE9BQU8sR0FBRyxTQUFzRCxDQUFDO3dCQUM1RSxtQ0FBbUM7d0JBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO3dCQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7OztLQUVqQjtJQUNEOzs7T0FHRzs7Ozs7Ozs7SUFDVyxpREFBb0I7Ozs7Ozs7SUFBbEMsVUFDRSxPQUFnQjs7O2dCQUVoQixzQkFBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBQzs7O0tBQ3pEO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUNXLHlDQUFZOzs7Ozs7O0lBQTFCLFVBQ0UsVUFBVTs7Ozs7NEJBRUcscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQXZDLElBQUksR0FBRyxTQUFnQzt3QkFDM0IscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUE7O3dCQUF6RSxJQUFJLEdBQVEsU0FBNkQ7d0JBQ25ELHFCQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTNELG1CQUFtQixHQUFHLFNBQXFDO3dCQUMzRCxNQUFNLEdBQW9DLEVBQUU7OzRCQUNsRCxLQUFrQixlQUFBLGlCQUFBLFVBQVUsQ0FBQSxvR0FBRTtnQ0FBbkIsR0FBRztnQ0FDWiw4RkFBOEY7Z0NBQzlGLElBQ0UsR0FBRztvQ0FDSCxHQUFHLENBQUMsTUFBTTtvQ0FDVixHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFDL0Q7b0NBQ0EsNkNBQTZDO29DQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lDQUN6QjtxQ0FBTSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssZ0JBQWdCLEVBQUU7b0NBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO2lDQUN0Qjs2QkFDRjs7Ozs7Ozs7O3dCQUNELHNCQUFPLE1BQU0sRUFBQzs7OztLQUNmO0lBQ0Q7O09BRUc7Ozs7OztJQUNXLHdEQUEyQjs7Ozs7SUFBekM7Ozs7Z0JBQ1EsTUFBTSxHQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLEdBQWMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xDLHNCQUFPLE1BQU0sRUFBQzs7O0tBQ2Y7SUFDRDs7O09BR0c7Ozs7Ozs7SUFDVyxzREFBeUI7Ozs7OztJQUF2QyxVQUF3QyxHQUFjOzs7Z0JBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7O0tBQ3pEO0lBRUQ7O09BRUc7Ozs7OztJQUNLLG1DQUFNOzs7OztJQUFkO1FBQ0UsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILDRDQUFlOzs7OztJQUFmLFVBQWdCLEtBQWE7UUFDM0IsS0FBSyxJQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUN2QyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkM7U0FDRjtJQUNILENBQUM7SUFDRDs7T0FFRzs7Ozs7O0lBQ0ssMkNBQWM7Ozs7O0lBQXRCO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFFSywyQ0FBYzs7Ozs7SUFBdEI7UUFDRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDVSw4Q0FBaUI7Ozs7O0lBQTlCLFVBQStCLFFBQWdCOzs7Ozs7d0JBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUM1QyxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBdkMsSUFBSSxHQUFHLFNBQWdDO3dCQUN4QixxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQTs7d0JBQTVFLE9BQU8sR0FBUSxTQUE2RDt3QkFDdEQscUJBQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBOUQsbUJBQW1CLEdBQUcsU0FBd0M7d0JBQzlELHlCQUF5QixHQUM3QixnQkFBZ0I7NEJBQ2hCLG1CQUFtQixDQUFDLE1BQU07NEJBQzFCLEdBQUc7NEJBQ0gsbUJBQW1CLENBQUMsUUFBUTt3QkFFMUIsVUFBVSxHQUFHLEVBQUU7d0JBRW5CLFFBQVEsUUFBUSxFQUFFOzRCQUNoQixLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUNOLFVBQVUsR0FBRyx5QkFBeUIsR0FBRyxPQUFPLENBQUM7Z0NBQ2pELE1BQU07NkJBQ1A7NEJBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDTixVQUFVLEdBQUcseUJBQXlCLEdBQUcsUUFBUSxDQUFDO2dDQUNsRCxNQUFNOzZCQUNQOzRCQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ04sVUFBVSxHQUFHLHlCQUF5QixHQUFHLFFBQVEsQ0FBQztnQ0FDbEQsTUFBTTs2QkFDUDs0QkFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUNOLFVBQVUsR0FBRyx5QkFBeUIsR0FBRyxRQUFRLENBQUM7Z0NBQ2xELE1BQU07NkJBQ1A7eUJBQ0Y7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQzNELHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUMvQixPQUFPLEVBQ1AsNkJBQTZCLEdBQUcsVUFBVSxHQUFHLGlCQUFpQixDQUMvRCxFQUFBOzt3QkFIRCxTQUdDLENBQUM7Ozs7O0tBQ0g7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0csMkNBQWM7Ozs7OztJQUFwQixVQUFxQixZQUFZOzs7Ozs7O3dCQUN6QixPQUFPLEdBQWEsWUFBWTt3QkFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQzt3QkFDNUMscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQXZDLElBQUksR0FBRyxTQUFnQzt3QkFDN0IscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FDeEQsSUFBSSxDQUFDLFlBQVksQ0FDbEIsRUFBQTs7d0JBRkssT0FBTyxHQUFHLFNBRWY7NkJBQ0csQ0FBQSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFBLEVBQTNDLHdCQUEyQzt3QkFDN0MscURBQXFEO3dCQUNyRCx5RUFBeUU7d0JBQ3pFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTs0QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7eUJBQ2hDOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQzt5QkFDckM7d0JBQ0QsSUFDRSxJQUFJLENBQUMsZUFBZSxDQUNsQixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FDekQsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUNsQjs0QkFDQSxxQkFBcUI7NEJBQ3JCLG9EQUFvRDs0QkFDcEQsVUFBVTs7OzRCQUFDO2dDQUNULEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQy9CLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQzs0QkFDVCxzQkFBTzt5QkFDUjs7Ozt3QkFHa0IscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsRUFBQTs7d0JBQWxELFFBQVEsR0FBRyxTQUF1Qzs7d0JBSWxELFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUNyQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FDM0Q7d0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLG9FQUFvRTs0QkFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUN6QyxDQUFDO3dCQUVGLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQzt3QkFFN0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQ2QsRUFBRTtnQ0FDRixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FDL0IsUUFBUSxDQUFDLFVBQVUsRUFDbkIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQ3pCLENBQUM7Ozs7Ozs7d0JBVUUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDM0MsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FDNUQ7d0JBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7d0JBRW5ELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLOzRCQUNkLEVBQUU7Z0NBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQzdCLFFBQVEsQ0FBQyxlQUFlLEVBQ3hCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQy9CLENBQUM7Ozs7Ozs7Ozt3QkFZRSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDcEMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FDNUQ7d0JBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO3dCQUU1QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSzs0QkFDZCxFQUFFO2dDQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUM3QixRQUFRLENBQUMsUUFBUSxFQUNqQixTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FDeEIsQ0FBQzs7Ozs7Ozt3QkFTRSxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDeEMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FDNUQ7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLDBEQUEwRDs0QkFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FDOUIsQ0FBQzt3QkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBRTNFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQzt3QkFFaEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQ2QsRUFBRTtnQ0FDRixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FDakMsUUFBUSxDQUFDLFlBQVksRUFDckIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQzVCLENBQUM7Ozs7d0JBS0UsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQ3RDLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUNsQzt3QkFDRCxJQUFJLFdBQVcsRUFBRTs0QkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUM3RSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7NEJBQzlDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7eUJBQzlDO3dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBRW5FLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7d0JBQ3RELFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFFOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBRXZELEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLDRDQUE0QztnQ0FDNUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0NBQ3BCLFlBQVk7Z0NBQ1osR0FBRyxDQUNKLENBQUM7NEJBQ0YsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO2dDQUN4QixJQUNFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRztvQ0FDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLEVBQzdCO29DQUNBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLDBEQUEwRDt3Q0FDMUQsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUM3QixDQUFDO2lDQUNIOzZCQUNGO3lCQUNGOzs7O3dCQUVELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQixnRUFBZ0UsR0FBRyxHQUFDLENBQ3JFLENBQUM7Ozt3QkFFSixJQUFJO3dCQUVKLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7NEJBQzVDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUN2QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FDekQ7NEJBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7NEJBQ2pFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzt5QkFDN0U7Ozt3QkFFSCxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7Ozs7O0tBQ3hDOztnQkFsZ0JGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBdEJDLG9CQUFvQjtnQkFFYixXQUFXO2dCQUNYLGNBQWM7Z0JBRWQsb0JBQW9CO2dCQVNwQixVQUFVO2dCQVZWLFlBQVk7Ozs2QkFQckI7Q0EyaEJDLEFBcGdCRCxJQW9nQkM7U0FqZ0JZLGtCQUFrQjs7O0lBQzdCLDBDQUF1RDs7SUFHdkQsb0NBQXdCOztJQUV4QiwwQ0FBYTs7Ozs7SUFDYix5Q0FBMkM7Ozs7O0lBRTNDLHdDQUE4Qjs7Ozs7SUFTOUIsMENBQTRCOzs7OztJQUM1Qix5Q0FBMkI7Ozs7O0lBQzNCLHlDQUEyQjs7Ozs7SUFDM0IsK0NBQThCOztJQUM5Qiw4Q0FBd0M7O0lBQ3hDLHlDQUE2Qzs7Ozs7SUFFM0Msa0RBQWtEOzs7OztJQUNsRCx5Q0FBZ0M7Ozs7O0lBQ2hDLDRDQUFzQzs7Ozs7SUFDdEMsNENBQTRDOzs7OztJQUM1Qyx3Q0FBOEI7Ozs7O0lBQzlCLDBDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBPbmxpbmVPZmZsaW5lU2VydmljZSwgb25saW5lT2ZmbGluZURhdGEsXG59IGZyb20gJy4uL29ubGluZU9mZmxpbmUtc2VydmljZS9vbmxpbmVPZmZsaW5lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9hdXRoLXNlcnZpY2UvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdhdGV3YXlTZXJ2aWNlIH0gZnJvbSAnLi4vZ2F0ZXdheS1zZXJ2aWNlL2dhdGV3YXkuc2VydmljZSc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi9jYWNoZS1zZXJ2aWNlL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2Vuc29yU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi9sZWFrYWdlLWhlbHBlci1zZXJ2aWNlL3NldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgU2Vuc29yLFxuICBWaXJ0dWFsRGV2aWNlLFxuICBEZXZpY2VEYXRhLFxuICBEZXZpY2VNYXAsXG4gIFNhZmVHdWFyZERldmljZVxufSBmcm9tICcuLi8uLi9tb2RlbHMvekF1dG9tYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgR2F0ZXdheSB9IGZyb20gJy4uLy4uL21vZGVscy9nZXR3YXkubW9kZWwnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IHNlbnNvclVwZGF0ZVN1YiA9IG5ldyBTdWJqZWN0KCk7XG5leHBvcnQgY29uc3Qgc2Vuc29yc0RhdGFTdWIgPSBuZXcgU3ViamVjdCgpO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFpBdXRvbWF0aW9uU2VydmljZSB7XG4gIGFwcFN0YXJ0VGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcblxuXG4gIGRldmljZTogU2FmZUd1YXJkRGV2aWNlO1xuXG4gIHRpY2tJbnRlcnZhbDtcbiAgcHJpdmF0ZSBzdG9yYWdlTmFtZSA9ICd6YXV0b21hdGlvbl9vYmplY3QnO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9kZXZpY2VNYXA6IERldmljZU1hcDtcbiAgZ2V0IGRldmljZU1hcCgpOiBEZXZpY2VNYXAge1xuICAgIHJldHVybiB0aGlzLl9kZXZpY2VNYXA7XG4gIH1cbiAgc2V0IGRldmljZU1hcCh2YWx1ZTogRGV2aWNlTWFwKSB7XG4gICAgdGhpcy5fZGV2aWNlTWFwID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDb25maWdXcmFwcGVyVG9TdG9yYWdlKHZhbHVlKTtcbiAgfVxuICAvLyBwcml2YXRlIG9ic2VydmVyOiBJekF1dG9tYXRpb25PYnNlcnZlcltdID0gW107XG4gIHByaXZhdGUgcmVtb3RlT25saW5lID0gdHJ1ZTtcbiAgcHJpdmF0ZSBsb2NhbE9ubGluZSA9IHRydWU7XG4gIHByaXZhdGUgcmVmcmVzaFRpbWUgPSAyNTAwO1xuICBwcml2YXRlIGZyZWV6ZUJ1dHRvblVudGlsID0gMDtcbiAgc2FmZUd1YXJkQ2hlY2tlZDogYW55ID0geyBmbGFnOiBmYWxzZSB9O1xuICBmYWlsdXJlUmF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBvbmxpbmVPZmZsaW5lU2VydmljZTogT25saW5lT2ZmbGluZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnYXRld2F5U2VydmljZTogR2F0ZXdheVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzZXR0aW5nU2VydmljZTogU2Vuc29yU2V0dGluZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ3pBdXRvbWF0aW9uQVBJOjpvbkluaXQnKTtcbiAgICBpZiAodGhpcy5jYWNoZVNlcnZpY2UuZ2V0TG9jYWxEYXRhKCdzYWZlR3VhcmRDaGVja2VkJykpIHtcbiAgICAgIHRoaXMuc2FmZUd1YXJkQ2hlY2tlZCA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldExvY2FsRGF0YSgnc2FmZUd1YXJkQ2hlY2tlZCcpO1xuICAgIH1cbiAgICAvLyB0aGlzLm9ubGluZU9mZmxpbmVTZXJ2aWNlLnN1YnNjcmliZSh0aGlzKTtcbiAgICBvbmxpbmVPZmZsaW5lRGF0YS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgdGhpcy5vbmxpbmVPZmZsaW5lVXBkYXRlKGRhdGEubG9jYWxPbmxpbmUsIGRhdGEucmVtb3RlT25saW5lKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gZnVuY3Rpb24gdG8gbWFpbnRhaW4gdGhlIHN0YXRlIG9mIHZhcmlhYmxlcyBsb2NhbE9ubGluZSBhbmQgcmVtb3RlT25saW5lXG4gICAqIEBwYXJhbSBsb2NhbE9ubGluZSBib29sZWFuIHZhbHVlIHRydWUgaWYgZGV2aWNlIGNvbm5lY3RlZCBsb2NhbHlcbiAgICogQHBhcmFtIHJlbW90ZU9ubGluZSBib29sZWFuIHZhbHVlIHRydWUgaWYgZGV2aWNlIGNvbm5lY3RlZCByZW1vdGVseVxuICAgKi9cbiAgb25saW5lT2ZmbGluZVVwZGF0ZShsb2NhbE9ubGluZTogYm9vbGVhbiwgcmVtb3RlT25saW5lOiBib29sZWFuKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZyhcbiAgICAgICd6QXV0b21hdGlvbkFQSTo6b25saW5lT2ZmbGluZVVwZGF0ZSAnICsgbG9jYWxPbmxpbmUgKyAnICcgKyByZW1vdGVPbmxpbmVcbiAgICApO1xuICAgIHRoaXMucmVtb3RlT25saW5lID0gcmVtb3RlT25saW5lO1xuICAgIHRoaXMubG9jYWxPbmxpbmUgPSBsb2NhbE9ubGluZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gdGhpcyBtZXRob2Qgd2lsbCBpbml0aWFsaXplIG9ubGluZU9mZmxpbmVTZXJ2aWNlXG4gICAqIEBkZXNjcmlwdGlvbiBhbmQgY29udGludW9zbHkgY2hlY2sgZm9yIGRldmljZSBjb25uZWN0aXZpdHkgc3RhdHVzXG4gICAqIEBkZXNjcmlwdGlvbiBpdCB3aWxsIGNvbnRpbnVvc2x5IGNhbGwgdGljayBtZXRob2Qgd2hpY2ggd2lsbCBmZXRjaCBjb25uZWN0ZWQgZGV2aWNlIGluZm9cbiAgICovXG4gIHB1YmxpYyBpbml0aWFsaXplKCkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2luaXRpYWxpemUgbWV0aG9kIGNhbGwtLSBpbiB6QXV0b21hdGlvbiBzZXJ2aWNlJyk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpY2tJbnRlcnZhbCk7XG4gICAgdGhpcy5vbmxpbmVPZmZsaW5lU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgLy8gdGhpcy5vbmxpbmVPZmZsaW5lSW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMudGljayh0cnVlKTtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdUaWNrIFJ1bnMgMXN0IFRpbWUgLS0tLS0tLS0tLS0tLS0tLS0tLT4nKTtcbiAgICB0aGlzLnRpY2tJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIC8vIGF3YWl0IHRoaXMub25saW5lT2ZmbGluZUluaXRpYWxpemUoKTtcbiAgICAgIHRoaXMudGljayhmYWxzZSk7XG4gICAgfSwgdGhpcy5yZWZyZXNoVGltZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGlmIGRldmljZSBpcyBjb25uZWN0ZWQgZWl0aGVyIGxvY2FseSBvciByZW1vdGVseSB0aGVuIHRoaXMgZnVuY3Rpb24gd2lsbCBjYWxsIHRoZSBwb2xsZGF0YSBmdW5jdGlvblxuICAgKiBAZGVzY3JpcHRpb24gdG8gZ2V0IHRoZSBjb25uZWN0ZWQgZGV2aWNlIGluZm9cbiAgICogQHBhcmFtIGZpcnN0UnVuIGlzIHRvIGNoZWNrIHdoZXRoZXIgZnVuY3Rpb24gaXMgaGl0dGVkIHZlcnkgZmlyc3QgdGltZSBhcyBuZWVkIHRvXG4gICAqIGZldGNoIHpBdXRvbWF0aW9uIG9iamVjdCBmcm9tIGxvY2FsIHN0b3JhZ2UgaW4gZmlyc3QgcnVuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIHRpY2soZmlyc3RSdW46IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdpbiB0aWNrIGZ1bmN0aW9uIHpBdXRvbWF0aW9uIHNlcnZpY2UnKTtcbiAgICAvLyBpZiAodGhpcy5vYnNlcnZlci5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnekF1dG9tYXRpb25BUEk6OnRpY2snKTtcbiAgICB0cnkge1xuICAgICAgaWYgKCF0aGlzLmxvY2FsT25saW5lICYmICF0aGlzLnJlbW90ZU9ubGluZSkge1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCd6QXV0b21hdGlvbkFQSTo6bm8gdGljaywgYmVjYXVzZSBPZmZsaW5lJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldFVzZXIoKTtcbiAgICAgIGNvbnN0IGd3ID0gYXdhaXQgdGhpcy5nYXRld2F5U2VydmljZS5nZXRQYWlyZWRHYXRld2F5KFxuICAgICAgICB1c2VyLmFjY2Vzc190b2tlblxuICAgICAgKTtcblxuICAgICAgaWYgKGd3LmxlY2thZ2VEZXZpY2VJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChmaXJzdFJ1bikge1xuICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ3pBdXRvbWF0aW9uQVBJOjpmaXJzdFJ1bkxvYWQnKTtcbiAgICAgICAgICB0aGlzLl9kZXZpY2VNYXAgPSBhd2FpdCB0aGlzLmdldENvbmZpZ1dyYXBwZXJGcm9tU3RvcmFnZSgpO1xuICAgICAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgKGZpcnN0UnVuIHx8IHRoaXMub2JzZXJ2ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ3pBdXRvbWF0aW9uQVBJOjp0aWNrOjpwb2xsZGF0YScpO1xuICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ0RFQlVHIGZpcnN0cnVuOicgKyBmaXJzdFJ1bik7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wb2xsRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmICh0aGlzLm9ic2VydmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyAgIHRoaXMubG9nU2VydmljZS5sb2coJ0RFQlVHIG9ic2VydmVyIGxlbmd0aCAwJyk7XG4gICAgICAgIC8vICAgLy8gcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuZGVjRmFpbHVyZVJhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coXG4gICAgICAgICAgJ3pBdXRvbWF0aW9uQVBJOjp0aWNrOiBsZWFja2FnZSBkZXZpY2UgdW5kZWZpbmVkLCBza2lwcGluZyBuZXR3b3JrIHJlcXVlc3RzJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9nU2VydmljZS5sb2coXG4gICAgICAgICd6QXV0b21hdGlvbkFQSTo6dGljazpDYXRjaDogQ291bGQgbm90IGdldCB0aWNrLCBlcnJvcjogJyArXG4gICAgICAgIGUubWVzc2FnZSArXG4gICAgICAgICc7Ozs7Ozs7JyArXG4gICAgICAgIGUuc3RhY2tcbiAgICAgICk7XG4gICAgICB0aGlzLmluY0ZhaWx1cmVSYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIGZ1bmN0aW9uIHdpbGwgY2FsbCBmZXRjaHB1bGwgZGF0YSB0byBlaXRoZXIgZ2V0IHdob2xlIGRhdGEgb3IgdG8gZ2V0IGRhdGEgZnJvbSBsYXN0IHVwZGF0ZSB0aW1lXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIHBvbGxEYXRhKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuZGV2aWNlTWFwICYmXG4gICAgICB0aGlzLmRldmljZU1hcC51cGRhdGVUaW1lICYmXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmRldmljZU1hcC5kZXZpY2VzKS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCd6QXV0b21hdGlvbkFQSTo6cG9sbERhdGE6IFBvbGxpbmcgZGVsdGEgZGF0YScpO1xuICAgICAgYXdhaXQgdGhpcy5mZXRjaFBvbGxEYXRhKCdkZWx0YScpOyAvLyBwYXNzaW5nIHBhcmFtZXRlciBkZWx0YSB0byBmZXRjaCBkYXRhIGZyb20gbGFzdCB1cG9kYXRldGltZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCd6QXV0b21hdGlvbkFQSTo6cG9sbERhdGE6IFBvbGxpbmcgY29tcGxldGUgZGF0YScpO1xuICAgICAgYXdhaXQgdGhpcy5mZXRjaFBvbGxEYXRhKCdjb21wbGV0ZScpOyAvLyBwYXNzaW5nIHBhcmFtZXRlciBjb21wbGV0ZSB0byBnZXQgd2hvbGUgb2JqZWN0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBjYWxsIGRldmljZSBBUEkgYW5kIGdldCB0aGUgZGF0YSBlaXRoZXIgY29tcGxldGUgb3IgZnJvbSBsYXN0IHVwZGF0ZSB0aW1lIGJhc2VkIG9uIHBhcmFtZXRlciBwYXNzZWRcbiAgICogQHBhcmFtIHR5cGUgc2hvdWxkIGJlIGRlbHRhIGlmIG5lZWQgdG8gZmV0Y2ggZGF0YSB1c2luZyBsYXN0IHVwZGF0ZSB0aW1lIGVsc2UgY29tcGxldGVcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZmV0Y2hQb2xsRGF0YSh0eXBlKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnaW4gZmV0Y2hQb2xsRGF0YSBtZXRob2QnKTtcbiAgICBsZXQgdXJsO1xuICAgIGlmICh0eXBlID09PSAnZGVsdGEnKSB7XG4gICAgICB1cmwgPSAnWkF1dG9tYXRpb24vYXBpL3YxL2RldmljZXM/c2luY2U9JyArIHRoaXMuZGV2aWNlTWFwLnVwZGF0ZVRpbWU7XG4gICAgICAvLyB1cmwgPSAnWldhdmVBUEkvRGF0YS8nICsgdGhpcy5kZXZpY2VNYXAudXBkYXRlVGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gJ1pBdXRvbWF0aW9uL2FwaS92MS9kZXZpY2VzJztcbiAgICAgIC8vIHVybCA9ICdaV2F2ZUFQSS9EYXRhLz9jYWxsPTQnO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1dyYXBwZXI6IERldmljZU1hcCA9IHsgdXBkYXRlVGltZTogJycsIGRldmljZXM6IG51bGwgfTtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCd6QXV0b21hdGlvbkFQSTo6cG9sbENvbXBsZXRlRGF0YScpO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldFVzZXIoKTtcbiAgICBjb25zdCBnYXRld2F5ID0gYXdhaXQgdGhpcy5nYXRld2F5U2VydmljZS5nZXRQYWlyZWRHYXRld2F5KFxuICAgICAgdXNlci5hY2Nlc3NfdG9rZW5cbiAgICApO1xuICAgIGNvbnN0IHBvbGxPYmplY3QgPSBhd2FpdCB0aGlzLmdhdGV3YXlTZXJ2aWNlLmNhbGxBcGkoXG4gICAgICBnYXRld2F5LFxuICAgICAgdXJsXG4gICAgKTtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdJIGFtIFBvbGxPYmplY3QsIEkgbWlnaHQgaGF2ZSBhbGwgdGhlIERldmljZSBEYXRhJywgcG9sbE9iamVjdCk7XG4gICAgaWYgKHR5cGUgPT09ICdkZWx0YScpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICAgICAgbmV3V3JhcHBlci51cGRhdGVUaW1lID0gcG9sbE9iamVjdFsnZGF0YSddWyd1cGRhdGVUaW1lJ107XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgIG5ld1dyYXBwZXIuZGV2aWNlcyA9IGF3YWl0IHRoaXMucGFyc2VEZXZpY2VzKHBvbGxPYmplY3RbJ2RhdGEnXVsnZGV2aWNlcyddKTtcbiAgICAgIGlmIChuZXdXcmFwcGVyICYmIG5ld1dyYXBwZXIuZGV2aWNlcykge1xuICAgICAgICAvLyB0aGlzLmxvZ1NlcnZpY2UubG9nKCd6QXV0b21hdGlvbkFQSTo6TWVyZ2VBbmRTYXZlOiBOZXcgb25lJyk7XG4gICAgICAgIGxldCB1cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgZGV2aWNlSUQgaW4gbmV3V3JhcHBlci5kZXZpY2VzKSB7XG4gICAgICAgICAgLy8gdGhpcy5sb2dTZXJ2aWNlLmxvZygnekF1dG9tYXRpb25BUEk6Ok1lcmdlQW5kU2F2ZTogVXBkYXRpbmcnICsgSlNPTi5zdHJpbmdpZnkobmV3V3JhcHBlci5kZXZpY2VzW2RldmljZUlEXSkpO1xuICAgICAgICAgIHRoaXMuX2RldmljZU1hcC5kZXZpY2VzW2RldmljZUlEXSA9IG5ld1dyYXBwZXIuZGV2aWNlc1tkZXZpY2VJRF07XG4gICAgICAgICAgdXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgLy8gdGhpcy5sb2dTZXJ2aWNlLmxvZygnekF1dG9tYXRpb25BUEk6Ok1lcmdlQW5kU2F2ZTogTm90aWZ5Jyk7XG4gICAgICAgICAgdGhpcy5zZXRDb25maWdXcmFwcGVyVG9TdG9yYWdlKHRoaXMuX2RldmljZU1hcCk7XG4gICAgICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgIG5ld1dyYXBwZXIudXBkYXRlVGltZSA9IHBvbGxPYmplY3RbJ2RhdGEnXVsndXBkYXRlVGltZSddO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICBuZXdXcmFwcGVyLmRldmljZXMgPSBhd2FpdCB0aGlzLnBhcnNlRGV2aWNlcyhwb2xsT2JqZWN0WydkYXRhJ11bJ2RldmljZXMnXSk7XG4gICAgICAvLyB0aGlzLmxvZ1NlcnZpY2UubG9nKG5ld1dyYXBwZXIpO1xuICAgICAgdGhpcy5kZXZpY2VNYXAgPSBuZXdXcmFwcGVyO1xuICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBIZXJlIFdlIG5lZWQgdG8gUHJvdmlkZSB0aGUgTGVha2FnZSBEZXZpY2UgSWQgYW5kXG4gICAqICBJdHMgSW5zdGFuY2UuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGdldERldmljZUFuZEluc3RhbmNlKFxuICAgIGdhdGV3YXk6IEdhdGV3YXlcbiAgKTogUHJvbWlzZTx7IGRldmljZTogbnVtYmVyOyBpbnN0YW5jZTogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4geyBkZXZpY2U6IGdhdGV3YXkubGVja2FnZURldmljZUlkLCBpbnN0YW5jZTogMCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBJdCBwYXJzZSBmcm9tIGFsbCB0aGUgRGV2aWNlIERhdGEgYW5kIHJldHVybiB0aGUgQXJyYXkgb2ZcbiAgICogZGV2aWNlcyB3aG9zZSBub2RlIGlkIGlzIG1hdGNoZXMgd2l0aCBnYXRld2F5LmxlY2thZ2VEZXZpY2VJZC5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgcGFyc2VEZXZpY2VzKFxuICAgIHBvbGxPYmplY3RcbiAgKTogUHJvbWlzZTx7IFtpZDogc3RyaW5nXTogVmlydHVhbERldmljZSB9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlcigpO1xuICAgIGNvbnN0IGRhdGE6IGFueSA9IGF3YWl0IHRoaXMuZ2F0ZXdheVNlcnZpY2UuZ2V0UGFpcmVkR2F0ZXdheSh1c2VyLmFjY2Vzc190b2tlbik7XG4gICAgY29uc3QgZGV2aWNlSURhbmRJbnN0YW5jZSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlQW5kSW5zdGFuY2UoZGF0YSk7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtpZDogc3RyaW5nXTogVmlydHVhbERldmljZSB9ID0ge307XG4gICAgZm9yIChjb25zdCBvYmogb2YgcG9sbE9iamVjdCkge1xuICAgICAgLy8gdGhpcy5sb2dTZXJ2aWNlLmxvZygnQ2hlY2tpbmcgaWYgJyArIGRldmljZUlEYW5kSW5zdGFuY2UuZGV2aWNlICsgJyBlcXVhbHMgJyArIG9iai5ub2RlSWQpO1xuICAgICAgaWYgKFxuICAgICAgICBvYmogJiZcbiAgICAgICAgb2JqLm5vZGVJZCAmJlxuICAgICAgICBvYmoubm9kZUlkLnRvU3RyaW5nKCkgPT09IGRldmljZUlEYW5kSW5zdGFuY2UuZGV2aWNlLnRvU3RyaW5nKClcbiAgICAgICkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgICAgcmVzdWx0W29ialsnaWQnXV0gPSBvYmo7XG4gICAgICB9IGVsc2UgaWYgKG9iai5pZCA9PT0gJ0R1bW15RGV2aWNlXzE4Jykge1xuICAgICAgICByZXN1bHRbb2JqLmlkXSA9IG9iajtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGdldHRpbmcgemF1dG9tYXRpb25fb2JqZWN0IGZyb20gdGhlIExvY2FsIHN0b3JhZ2VcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZ2V0Q29uZmlnV3JhcHBlckZyb21TdG9yYWdlKCk6IFByb21pc2U8RGV2aWNlTWFwPiB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSAodGhpcy5jYWNoZVNlcnZpY2UuZ2V0TG9jYWxEYXRhKHRoaXMuc3RvcmFnZU5hbWUpKTtcbiAgICBjb25zdCBvYmplY3Q6IERldmljZU1hcCA9IChyZXN1bHQpO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBzZXR0aW5nIHphdXRvbWF0aW9uX29iamVjdCBmcm9tIHRoZSBMb2NhbCBzdG9yYWdlXG4gICAqIEBwYXJhbSBvYmogT2JqZWN0IG5lZWQgdG8gc3RvcmVkIGluIGxvY2FsIHN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIHNldENvbmZpZ1dyYXBwZXJUb1N0b3JhZ2Uob2JqOiBEZXZpY2VNYXApIHtcbiAgICB0aGlzLmNhY2hlU2VydmljZS5zZXRMb2NhbERhdGEodGhpcy5zdG9yYWdlTmFtZSwgKG9iaikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIGZ1bmN0aW9uIG5vdGlmeSBldmVyeSB0aW1lIHdoZW4gc29tZSBjaGFuZWdzIGFyZSB0aGVyZSBpbiBzZW5zb3IgdmFsdWVzLlxuICAgKi9cbiAgcHJpdmF0ZSBub3RpZnkoKSB7XG4gICAgc2Vuc29yVXBkYXRlU3ViLm5leHQoeyBmbGFnOiB0cnVlIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIGlzIG5lZWRlZCBmb3IgZmlsdGVyaW5nIGEgc3BlY2lmaWMgc2Vuc29yIGRldmljZSBmcm9tIHRoZSB3aG9sZSBBcnJheVxuICAgKiBAcGFyYW0gcmVnZXggIGlzIHJlZ3VsYXIgZXJwcmVzc2lvbiBuZWVkIHRvIGZpbHRlcmF0b24uXG4gICAqL1xuICBmaWx0ZXJEZXZpY2VNYXAocmVnZXg6IFJlZ0V4cCk6IERldmljZURhdGEge1xuICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5kZXZpY2VNYXAuZGV2aWNlcykge1xuICAgICAgaWYgKHJlZ2V4LnRlc3QoaWQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRldmljZU1hcC5kZXZpY2VzW2lkXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIGp1c3QgaW5jcmVhc2UgdGhlIEZhaWx1cmUgQ291bnRlclxuICAgKi9cbiAgcHJpdmF0ZSBpbmNGYWlsdXJlUmF0ZSgpIHtcbiAgICBpZiAodGhpcy5mYWlsdXJlUmF0ZS5nZXRWYWx1ZSgpIDwgMykge1xuICAgICAgdGhpcy5mYWlsdXJlUmF0ZS5uZXh0KHRoaXMuZmFpbHVyZVJhdGUuZ2V0VmFsdWUoKSArIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gSXQgSnVzdCBEZWNyZWFzZSB0aGUgRmFpbHVyZSBDb3VudGVyLlxuICAgKi9cblxuICBwcml2YXRlIGRlY0ZhaWx1cmVSYXRlKCkge1xuICAgIGlmICh0aGlzLmZhaWx1cmVSYXRlLmdldFZhbHVlKCkgPiAwKSB7XG4gICAgICB0aGlzLmZhaWx1cmVSYXRlLm5leHQodGhpcy5mYWlsdXJlUmF0ZS5nZXRWYWx1ZSgpIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBpdCBuZWVkZWQgZm9yIGdldHRpbmcgdGhlIHVwZGF0ZWQgdmFsdWUgZm9yIGEgcGVydGljdWxhciBTZW5zb3IuXG4gICAqIEBwYXJhbSBzZW5zb3JObyB1c2luZyB0aGlzIHdlIGtub3cgd2hpY2ggc2Vuc29ycyB1cGRhdGVkIGluZm9ybWF0aW9uIG5lZWRlZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVTZW5zb3JWYWx1ZShzZW5zb3JObzogbnVtYmVyKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnaW4gdXBkYXRlU2Vuc29yVmFsdWUtLT4nLCBzZW5zb3JObyk7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlcigpO1xuICAgIGNvbnN0IGdhdGV3YXk6IGFueSA9IGF3YWl0IHRoaXMuZ2F0ZXdheVNlcnZpY2UuZ2V0UGFpcmVkR2F0ZXdheSh1c2VyLmFjY2Vzc190b2tlbik7XG4gICAgY29uc3QgZGV2aWNlSURhbmRJbnN0YW5jZSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlQW5kSW5zdGFuY2UoZ2F0ZXdheSk7XG4gICAgY29uc3QgZGV2aWNlSURhbmRJbnN0YW5jZVN0cmluZyA9XG4gICAgICAnWldheVZEZXZfendheV8nICtcbiAgICAgIGRldmljZUlEYW5kSW5zdGFuY2UuZGV2aWNlICtcbiAgICAgICctJyArXG4gICAgICBkZXZpY2VJRGFuZEluc3RhbmNlLmluc3RhbmNlO1xuXG4gICAgbGV0IHNlbnNvclBhdGggPSAnJztcblxuICAgIHN3aXRjaCAoc2Vuc29yTm8pIHtcbiAgICAgIGNhc2UgMDoge1xuICAgICAgICBzZW5zb3JQYXRoID0gZGV2aWNlSURhbmRJbnN0YW5jZVN0cmluZyArICctNTAtMCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAxOiB7XG4gICAgICAgIHNlbnNvclBhdGggPSBkZXZpY2VJRGFuZEluc3RhbmNlU3RyaW5nICsgJy00OS0yMyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAyOiB7XG4gICAgICAgIHNlbnNvclBhdGggPSBkZXZpY2VJRGFuZEluc3RhbmNlU3RyaW5nICsgJy00OS01Nic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAzOiB7XG4gICAgICAgIHNlbnNvclBhdGggPSBkZXZpY2VJRGFuZEluc3RhbmNlU3RyaW5nICsgJy00OS01Nyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdjYWxsIGFwaSAtLS0+c2Vuc29yUGF0aCcsIHNlbnNvclBhdGgpO1xuICAgIGF3YWl0IHRoaXMuZ2F0ZXdheVNlcnZpY2UuY2FsbEFwaShcbiAgICAgIGdhdGV3YXksXG4gICAgICAnWkF1dG9tYXRpb24vYXBpL3YxL2RldmljZXMvJyArIHNlbnNvclBhdGggKyAnL2NvbW1hbmQvdXBkYXRlJ1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIHRoaXMgZnVuY3Rpb24gaXMgbmVlZGVkIGZvciB0aGUgZ2V0dGluZyB0aGUgU2Vuc29yIHZhbHVlc1xuICAgKiBhbmQgc3RvcmUgaXQgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICogQHBhcmFtIHNlbnNvcnNWYWx1ZSBuZWVkIHRoZSBpbml0YWlhbCBzZW5zb3IgdmFsdWVzLlxuICAgKi9cbiAgYXN5bmMgZ2V0U2Vuc29yVmFsdWUoc2Vuc29yc1ZhbHVlKSB7XG4gICAgY29uc3Qgc2Vuc29yczogU2Vuc29yW10gPSBzZW5zb3JzVmFsdWU7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnaW4gdXBkYXRlIG1ldGhvZC0tIGRldmljZSBtZXRyaWNzJyk7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlcigpO1xuICAgIGNvbnN0IGdhdGV3YXkgPSBhd2FpdCB0aGlzLmdhdGV3YXlTZXJ2aWNlLmdldFBhaXJlZEdhdGV3YXkoXG4gICAgICB1c2VyLmFjY2Vzc190b2tlblxuICAgICk7XG4gICAgaWYgKHRoaXMuZGV2aWNlTWFwICYmIHRoaXMuZGV2aWNlTWFwLnVwZGF0ZVRpbWUpIHtcbiAgICAgIC8vIHRoaXMub25saW5lT2ZmbGluZVNlcnZpY2UuUkVHVUFSRF9PRkZMSU5FID0gZmFsc2U7XG4gICAgICAvLyBpZiAoIURlbW9Nb2RlLklTX01PQ0tfREFUQV9NT0RFIHx8ICFEZW1vTW9kZS5JU19KVVNUX01PQ0tfREFUQV9NT0RFKSB7XG4gICAgICBpZiAodGhpcy5kZXZpY2UpIHtcbiAgICAgICAgdGhpcy5kZXZpY2Uuc2Vuc29yRGV2aWNlcyA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBuZXcgU2FmZUd1YXJkRGV2aWNlKCk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuZmlsdGVyRGV2aWNlTWFwKFxuICAgICAgICAgIG5ldyBSZWdFeHAoZ2F0ZXdheS5sZWNrYWdlRGV2aWNlSWQgKyAnLVswLTldKi0zNyQnLCAnZycpXG4gICAgICAgICkubWV0cmljcy5pc0ZhaWxlZFxuICAgICAgKSB7XG4gICAgICAgIC8vIFJFR1VBUkQgaXMgb2ZmbGluZVxuICAgICAgICAvLyB0aGlzLm9ubGluZU9mZmxpbmVTZXJ2aWNlLlJFR1VBUkRfT0ZGTElORSA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0U2Vuc29yVmFsdWUoc2Vuc29ycyk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyB0aGlzLm9ubGluZU9mZmxpbmVTZXJ2aWNlLlJFR1VBUkRfT0ZGTElORSA9IGZhbHNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCB0aGlzLnNldHRpbmdTZXJ2aWNlLmdldFNldHRpbmdzKCk7XG5cbiAgICAgICAgLy8gV0FURVJNRVRFUlxuXG4gICAgICAgIGNvbnN0IHdhdGVyTWV0ZXIgPSB0aGlzLmZpbHRlckRldmljZU1hcChcbiAgICAgICAgICBuZXcgUmVnRXhwKGdhdGV3YXkubGVja2FnZURldmljZUlkICsgJy1bMC05XSotNTAtMCQnLCAnZycpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZyhcbiAgICAgICAgICAnRGV2aWNlTWV0cmljc0NvbXBvbmVudDo6VXBkYXRlOiBzZXR0aW5ncyBtZXRlciBiZWZvcmUgY29udmVydGluZzogJyArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkod2F0ZXJNZXRlci5tZXRyaWNzLmxldmVsKVxuICAgICAgICApO1xuXG4gICAgICAgIHNlbnNvcnNbMF0udGltZXN0YW1wID0gd2F0ZXJNZXRlci51cGRhdGVUaW1lO1xuXG4gICAgICAgIHNlbnNvcnNbMF0udmFsdWUgPVxuICAgICAgICAgICcnICtcbiAgICAgICAgICB0aGlzLnNldHRpbmdTZXJ2aWNlLmNvbnZlcnRBbW91bnQoXG4gICAgICAgICAgICBzZXR0aW5ncy5hbW91bnRVbml0LFxuICAgICAgICAgICAgd2F0ZXJNZXRlci5tZXRyaWNzLmxldmVsXG4gICAgICAgICAgKTtcblxuICAgICAgICAvLyBUcmFuc2xhdGlvbiBzZXJ2aWNlXG4gICAgICAgIC8vIHRoaXMuc2Vuc29yc1swXS5zdWJUaXRsZSA9IHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLmluc3RhbnQoXG4gICAgICAgIC8vICAgc2V0dGluZ3MuYW1vdW50VW5pdFxuICAgICAgICAvLyApO1xuICAgICAgICAvLyB0aGlzLnNlbnNvcnNbMF0udGl0bGUgPSB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5pbnN0YW50KCdBbW91bnQnKTtcblxuICAgICAgICAvLyBURU1QRVJBVFVSRVxuXG4gICAgICAgIGNvbnN0IHdhdGVyVGVtcGVyYXR1cmUgPSB0aGlzLmZpbHRlckRldmljZU1hcChcbiAgICAgICAgICBuZXcgUmVnRXhwKGdhdGV3YXkubGVja2FnZURldmljZUlkICsgJy1bMC05XSotNDktMjMkJywgJ2cnKVxuICAgICAgICApO1xuXG4gICAgICAgIHNlbnNvcnNbMV0udGltZXN0YW1wID0gd2F0ZXJUZW1wZXJhdHVyZS51cGRhdGVUaW1lO1xuXG4gICAgICAgIHNlbnNvcnNbMV0udmFsdWUgPVxuICAgICAgICAgICcnICtcbiAgICAgICAgICB0aGlzLnNldHRpbmdTZXJ2aWNlLmNvbnZlcnRUZW1wKFxuICAgICAgICAgICAgc2V0dGluZ3MudGVtcGVyYXR1cmVVbml0LFxuICAgICAgICAgICAgd2F0ZXJUZW1wZXJhdHVyZS5tZXRyaWNzLmxldmVsXG4gICAgICAgICAgKTtcblxuICAgICAgICAvLyBUcmFuc2xhdGlvbiBTZXJ2aWNlc1xuICAgICAgICAvLyB0aGlzLnNlbnNvcnNbMV0uc3ViVGl0bGUgPSB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5pbnN0YW50KFxuICAgICAgICAvLyAgIHNldHRpbmdzLnRlbXBlcmF0dXJlVW5pdFxuICAgICAgICAvLyApO1xuICAgICAgICAvLyB0aGlzLnNlbnNvcnNbMV0udGl0bGUgPSB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5pbnN0YW50KFxuICAgICAgICAvLyAgICdUZW1wZXJhdHVyZSdcbiAgICAgICAgLy8gKTtcblxuICAgICAgICAvLyBGTE9XXG5cbiAgICAgICAgY29uc3Qgd2F0ZXJGbG93ID0gdGhpcy5maWx0ZXJEZXZpY2VNYXAoXG4gICAgICAgICAgbmV3IFJlZ0V4cChnYXRld2F5LmxlY2thZ2VEZXZpY2VJZCArICctWzAtOV0qLTQ5LTU2JCcsICdnJylcbiAgICAgICAgKTtcblxuICAgICAgICBzZW5zb3JzWzJdLnRpbWVzdGFtcCA9IHdhdGVyRmxvdy51cGRhdGVUaW1lO1xuXG4gICAgICAgIHNlbnNvcnNbMl0udmFsdWUgPVxuICAgICAgICAgICcnICtcbiAgICAgICAgICB0aGlzLnNldHRpbmdTZXJ2aWNlLmNvbnZlcnRGbG93KFxuICAgICAgICAgICAgc2V0dGluZ3MuZmxvd1VuaXQsXG4gICAgICAgICAgICB3YXRlckZsb3cubWV0cmljcy5sZXZlbFxuICAgICAgICAgICk7XG4gICAgICAgIC8vIFRyYW5zbGF0aW9uIFNlcnZpY2VzXG4gICAgICAgIC8vIHRoaXMuc2Vuc29yc1syXS5zdWJUaXRsZSA9IHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLmluc3RhbnQoXG4gICAgICAgIC8vICAgc2V0dGluZ3MuZmxvd1VuaXRcbiAgICAgICAgLy8gKTtcbiAgICAgICAgLy8gdGhpcy5zZW5zb3JzWzJdLnRpdGxlID0gdGhpcy50cmFuc2xhdGlvblNlcnZpY2UuaW5zdGFudCgnRmxvdycpO1xuXG4gICAgICAgIC8vIFBSRVNTVVJFXG5cbiAgICAgICAgY29uc3Qgd2F0ZXJQcmVzc3VyZSA9IHRoaXMuZmlsdGVyRGV2aWNlTWFwKFxuICAgICAgICAgIG5ldyBSZWdFeHAoZ2F0ZXdheS5sZWNrYWdlRGV2aWNlSWQgKyAnLVswLTldKi00OS01NyQnLCAnZycpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coXG4gICAgICAgICAgJ0RldmljZU1ldHJpY3NDb21wb25lbnQ6OlVwZGF0ZTogc2V0dGluZ3Mgd2F0ZXJQcmVzc3VyZTogJyArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkod2F0ZXJQcmVzc3VyZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnV2F0ZXIgU2Vuc29yIFVwZGF0ZWQgVGltZScsIHdhdGVyUHJlc3N1cmUudXBkYXRlVGltZSk7XG5cbiAgICAgICAgc2Vuc29yc1szXS50aW1lc3RhbXAgPSB3YXRlclByZXNzdXJlLnVwZGF0ZVRpbWU7XG5cbiAgICAgICAgc2Vuc29yc1szXS52YWx1ZSA9XG4gICAgICAgICAgJycgK1xuICAgICAgICAgIHRoaXMuc2V0dGluZ1NlcnZpY2UuY29udmVydFByZXNzdXJlKFxuICAgICAgICAgICAgc2V0dGluZ3MucHJlc3N1cmVVbml0LFxuICAgICAgICAgICAgd2F0ZXJQcmVzc3VyZS5tZXRyaWNzLmxldmVsXG4gICAgICAgICAgKTtcblxuICAgICAgICAvLyBEdW1teSBEZXZpY2UgMThcbiAgICAgICAgLy8gUFJFU1NVUkVcbiAgICAgICAgLy8gYWxlcnQoJzExJyk7XG4gICAgICAgIGNvbnN0IGR1bW15RGV2aWNlID0gdGhpcy5maWx0ZXJEZXZpY2VNYXAoXG4gICAgICAgICAgbmV3IFJlZ0V4cCgnRHVtbXlEZXZpY2VfMTgnLCAnZycpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChkdW1teURldmljZSkge1xuICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ0R1bW15IERldmljZSBVcGRhdGVkIGxldmVsJywgZHVtbXlEZXZpY2UubWV0cmljcy5sZXZlbCk7XG4gICAgICAgICAgc2Vuc29yc1s0XS50aW1lc3RhbXAgPSBkdW1teURldmljZS51cGRhdGVUaW1lO1xuICAgICAgICAgIHNlbnNvcnNbNF0udmFsdWUgPSBkdW1teURldmljZS5tZXRyaWNzLmxldmVsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ0hleSBJIGFtIE5ldyBTZW5zb3IgVmFsdWUnLCBzZW5zb3JzKTtcbiAgICAgICAgdGhpcy5jYWNoZVNlcnZpY2Uuc2V0TG9jYWxEYXRhKCdzZW5zb3JzJywgKHNlbnNvcnMpKTtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnc2Vuc29ycy1sb2NhbC1zdG9yYWdlOiAnICsgSlNPTi5zdHJpbmdpZnkoc2Vuc29ycykpO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSAtIDYwICogMjtcbiAgICAgICAgY29uc3Qgbm93T25lTWluID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApIC0gMjA7XG5cbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnYmVmb3JlIGxvb3Agc2Vuc29yLS0tPicsIHNlbnNvcnMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2Vuc29ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coXG4gICAgICAgICAgICAnRGV2aWNlTWV0cmljc0NvbXBvbmVudDo6VXBkYXRlOiBvbGRzdGFtcDogJyArXG4gICAgICAgICAgICBzZW5zb3JzW2ldLnRpbWVzdGFtcCArXG4gICAgICAgICAgICAnbmV3c3RhbXA6ICcgK1xuICAgICAgICAgICAgbm93XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoc2Vuc29yc1tpXS50aW1lc3RhbXApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgc2Vuc29yc1tpXS50aW1lc3RhbXAgPCBub3cgJiZcbiAgICAgICAgICAgICAgdGhpcy5hcHBTdGFydFRpbWUgPCBub3dPbmVNaW5cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbnNvclZhbHVlKGkpO1xuICAgICAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKFxuICAgICAgICAgICAgICAgICdEZXZpY2VNZXRyaWNzQ29tcG9uZW50OjpVcGRhdGU6IFVwZGF0ZVNlbnNvclZhbHVlQ2FsbGVkICcgK1xuICAgICAgICAgICAgICAgIChub3cgLSBzZW5zb3JzW2ldLnRpbWVzdGFtcClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZyhcbiAgICAgICAgICAnRGV2aWNlTWV0cmljc0NvbXBvbmVudDo6VXBkYXRlOiBFcnJvciBmZXRjaGluZyBkZXZpY2VNZXRyaWNzISAnICsgZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gfVxuXG4gICAgICBpZiAodGhpcy5mcmVlemVCdXR0b25VbnRpbCA8PSBuZXcgRGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICBjb25zdCBndWFyZENoZWNrZWQgPSB0aGlzLmZpbHRlckRldmljZU1hcChcbiAgICAgICAgICBuZXcgUmVnRXhwKGdhdGV3YXkubGVja2FnZURldmljZUlkICsgJy1bMC05XSotMzckJywgJ2cnKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2FmZUd1YXJkQ2hlY2tlZC5mbGFnID0gZ3VhcmRDaGVja2VkLm1ldHJpY3MubGV2ZWwgPT09ICdvbic7XG4gICAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldExvY2FsRGF0YSgnc2FmZUd1YXJkQ2hlY2tlZCcsICh0aGlzLnNhZmVHdWFyZENoZWNrZWQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2Vuc29yc0RhdGFTdWIubmV4dCh7IGRhdGE6IHNlbnNvcnMgfSk7XG4gIH1cblxufVxuIl19