/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GatewayAclService } from './gatewayAcl.service';
import { AuthService } from '../auth-service/auth.service';
import { CacheService } from '../cache-service/cache.service';
import { WebService } from '../web-service/web.service';
import { LogService } from '../logger-service/logger.service';
import { CommonConstants, GatewayCredentialsTypes, gatewayDeviceControlEndpoint } from '../../models/getway.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./gatewayAcl.service";
import * as i3 from "../auth-service/auth.service";
import * as i4 from "../cache-service/cache.service";
import * as i5 from "../web-service/web.service";
import * as i6 from "../logger-service/logger.service";
var GatewayAlreadyConfiguredError = /** @class */ (function (_super) {
    tslib_1.__extends(GatewayAlreadyConfiguredError, _super);
    function GatewayAlreadyConfiguredError(m) {
        var _this = _super.call(this, m) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, GatewayAlreadyConfiguredError.prototype);
        return _this;
    }
    return GatewayAlreadyConfiguredError;
}(Error));
export { GatewayAlreadyConfiguredError };
var GatewaySerialNotFoundError = /** @class */ (function (_super) {
    tslib_1.__extends(GatewaySerialNotFoundError, _super);
    function GatewaySerialNotFoundError(m) {
        var _this = _super.call(this, m) || this;
        _this.name = 'GatewaySerialNotFoundError';
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, GatewayAlreadyConfiguredError.prototype);
        return _this;
    }
    return GatewaySerialNotFoundError;
}(Error));
export { GatewaySerialNotFoundError };
var GatewayService = /** @class */ (function () {
    function GatewayService(http, gatewayAclService, authService, cacheService, webService, logService) {
        this.http = http;
        this.gatewayAclService = gatewayAclService;
        this.authService = authService;
        this.cacheService = cacheService;
        this.webService = webService;
        this.logService = logService;
        this.observerId = 48976446132111;
        this.completedFirstRun = false;
        this.storageName = 'gateway_device';
    }
    /**
     * @description Calls the Gateway API
     * @param gateway gateWay Information
     * @param apiEndpoint This is Api End P{oints}
     * @param method Specific Method To Follow
     * @param body Body If It is a POST Api Call
     * @param headers not used right now
     * @param connectionType explicitly decide, if it should be called locally, or remotely. Default: remote
     */
    /**
     * \@description Calls the Gateway API
     * @param {?} gateway gateWay Information
     * @param {?} apiEndpoint This is Api End P{oints}
     * @param {?=} method Specific Method To Follow
     * @param {?=} body Body If It is a POST Api Call
     * @param {?=} headers not used right now
     * @param {?=} connectionType explicitly decide, if it should be called locally, or remotely. Default: remote
     * @param {?=} retryLocal
     * @param {?=} retryRemote
     * @param {?=} killRequestObject
     * @param {?=} localResponseType
     * @return {?}
     */
    GatewayService.prototype.callApi = /**
     * \@description Calls the Gateway API
     * @param {?} gateway gateWay Information
     * @param {?} apiEndpoint This is Api End P{oints}
     * @param {?=} method Specific Method To Follow
     * @param {?=} body Body If It is a POST Api Call
     * @param {?=} headers not used right now
     * @param {?=} connectionType explicitly decide, if it should be called locally, or remotely. Default: remote
     * @param {?=} retryLocal
     * @param {?=} retryRemote
     * @param {?=} killRequestObject
     * @param {?=} localResponseType
     * @return {?}
     */
    function (gateway, apiEndpoint, method, body, headers, connectionType, retryLocal, retryRemote, killRequestObject, localResponseType) {
        if (method === void 0) { method = 'get'; }
        if (body === void 0) { body = null; }
        if (retryLocal === void 0) { retryLocal = 2; }
        if (retryRemote === void 0) { retryRemote = 3; }
        if (killRequestObject === void 0) { killRequestObject = { continue: true }; }
        if (localResponseType === void 0) { localResponseType = 'json'; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1, _a, retryConfig, username, password, useCredentials, _b, _c, creds, requestBody, user, requestHeader, _d, _e, e_2, url, httpOption, apiResponse, e_3, basicAuthString, httpOptions, url, apiResponse, e_4, curtime, cancelRequestLocal, cancelRequestRemote, remotePromise, localPromise, response, e_5, result, e_6, e_7;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        retryConfig = {
                            REQ_TIMEOUT: GatewayService.REQ_TIMEOUT_LOCAL,
                            INIT_INTERVAL: GatewayService.INIT_INTERVAL_LOCAL,
                            MAX_INTERVAL: GatewayService.MAX_INTERVAL_LOCAL,
                            MAX_RETRIES: retryLocal,
                        };
                        // If no connection Type is given and the Method is run for the first Time
                        if (!connectionType && this.completedFirstRun) {
                            if (this.localOnline) {
                                connectionType = 'local';
                            }
                            else if (this.remoteOnline) {
                                connectionType = 'remote';
                            }
                            else {
                                // go to race between remote and local
                                connectionType = undefined;
                            }
                        }
                        // try remote call first, else try local
                        useCredentials = connectionType === 'local'
                            ? GatewayCredentialsTypes.LOCAL
                            : GatewayCredentialsTypes.REMOTE;
                        try {
                            // this.logService.log('cred type: ' + useCredentials);
                            for (_b = tslib_1.__values(gateway.credentials), _c = _b.next(); !_c.done; _c = _b.next()) {
                                creds = _c.value;
                                // this.logService.log('iterate creds' + JSON.stringify(creds));
                                if (creds.type === useCredentials) {
                                    username = creds.user;
                                    password = creds.password;
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (username === undefined || password === undefined) {
                            throw new Error('Username or Password undefined');
                        }
                        if (!(connectionType === 'remote')) return [3 /*break*/, 10];
                        this.logService.log('Connection is remote');
                        requestBody = {
                            boxId: gateway.boxId,
                            username: username,
                            password: password,
                            urlEndpoint: apiEndpoint,
                            method: method,
                            body: undefined
                        };
                        if (method.toUpperCase() === 'POST' ||
                            method.toUpperCase() === 'PUT' ||
                            method.toUpperCase() === 'PATCH') {
                            requestBody.body = JSON.stringify(body);
                        }
                        return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _f.sent();
                        requestHeader = {
                            access_token: user.access_token
                        };
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 4, , 5]);
                        _d = requestHeader;
                        _e = 'x-correlation-id';
                        return [4 /*yield*/, this.authService.getCorrelationId()];
                    case 3:
                        _d[_e] = _f.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _f.sent();
                        this.logService.log_e(e_2);
                        return [3 /*break*/, 5];
                    case 5:
                        url = gatewayDeviceControlEndpoint + '/gateways/control';
                        httpOption = {
                            headers: requestHeader
                        };
                        _f.label = 6;
                    case 6:
                        _f.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.webService.postApi(url, requestBody, httpOption, retryConfig).toPromise()];
                    case 7:
                        apiResponse = _f.sent();
                        this.remoteOnline = true;
                        this.completedFirstRun = true;
                        return [2 /*return*/, apiResponse];
                    case 8:
                        e_3 = _f.sent();
                        this.logService.log_e('gatewayservice::callApi: Network error remote request' +
                            JSON.stringify(e_3));
                        this.remoteOnline = false;
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 29];
                    case 10:
                        if (!(connectionType === 'local' || connectionType === 'admin')) return [3 /*break*/, 18];
                        this.logService.log('Connection is local');
                        basicAuthString = 'Basic ' + btoa(username + ':' + password);
                        _f.label = 11;
                    case 11:
                        _f.trys.push([11, 13, , 17]);
                        httpOptions = {
                            headers: { Authorization: basicAuthString }
                        };
                        if (method.toUpperCase() !== 'GET' &&
                            method.toUpperCase() !== 'OPTIONS') {
                            // tslint:disable-next-line:no-string-literal
                            httpOptions['body'] = body;
                        }
                        // tslint:disable-next-line:no-string-literal
                        httpOptions['responseType'] = localResponseType;
                        url = 'http://' + gateway.localIp + ':8083/' + apiEndpoint;
                        // Create separate method for request API
                        return [4 /*yield*/, this.webService.requestApi(method, url, httpOptions, retryConfig).toPromise()];
                    case 12:
                        apiResponse = _f.sent();
                        this.localOnline = true;
                        this.completedFirstRun = true;
                        return [2 /*return*/, apiResponse];
                    case 13:
                        e_4 = _f.sent();
                        this.logService.log_e('gatewayservice::callApi: Network error local request' +
                            JSON.stringify(e_4));
                        this.localOnline = false;
                        if (!!connectionType) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.callApi(gateway, apiEndpoint, method, body, headers, 'remote')];
                    case 14: return [2 /*return*/, _f.sent()];
                    case 15: throw e_4;
                    case 16: return [3 /*break*/, 17];
                    case 17: return [3 /*break*/, 29];
                    case 18:
                        if (!!connectionType) return [3 /*break*/, 29];
                        // Do requests in parallel, if no connectionType is specified
                        curtime = new Date().getTime();
                        cancelRequestLocal = { continue: true };
                        cancelRequestRemote = { continue: true };
                        remotePromise = this.callApi(gateway, apiEndpoint, method, body, headers, 'remote', undefined, undefined, cancelRequestRemote);
                        localPromise = this.callApi(gateway, apiEndpoint, method, body, headers, 'local', undefined, undefined, cancelRequestLocal);
                        _f.label = 19;
                    case 19:
                        _f.trys.push([19, 21, , 29]);
                        // wait for first to finish
                        return [4 /*yield*/, Promise.race([remotePromise, localPromise])];
                    case 20:
                        response = _f.sent();
                        cancelRequestLocal.continue = false;
                        cancelRequestRemote.continue = false;
                        return [2 /*return*/, response];
                    case 21:
                        e_5 = _f.sent();
                        // jumps in this catch, if one of the request fails
                        this.logService.log_e('gatewayservice::callApi: parallel promise failed ' + e_5);
                        // wait for both to finish
                        // the promise that failed before will fail again here and throw an exception
                        // the other one is still open and could resolve or reject
                        result = void 0;
                        _f.label = 22;
                    case 22:
                        _f.trys.push([22, 24, , 25]);
                        return [4 /*yield*/, remotePromise];
                    case 23:
                        result = _f.sent();
                        this.remoteOnline = true;
                        return [3 /*break*/, 25];
                    case 24:
                        e_6 = _f.sent();
                        this.remoteOnline = false;
                        this.logService.log_e('gatewayservice::callApi: remote request failed with error ' +
                            JSON.stringify(e_6));
                        return [3 /*break*/, 25];
                    case 25:
                        _f.trys.push([25, 27, , 28]);
                        return [4 /*yield*/, localPromise];
                    case 26:
                        result = _f.sent();
                        this.localOnline = true;
                        return [3 /*break*/, 28];
                    case 27:
                        e_7 = _f.sent();
                        this.localOnline = false;
                        this.logService.log_e('gatewayservice::callApi: Local request failed with error ' +
                            JSON.stringify(e_7));
                        return [3 /*break*/, 28];
                    case 28:
                        if (result === undefined) {
                            throw new Error('gatewayservice::callApi: Both requests failed');
                        }
                        return [2 /*return*/, result];
                    case 29: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Calls the ZWaveAPI and get data for all the conected devices
     * @param gateway gateWay Information
     * @param getMock bollean type
     * @param doDefaultRetrys retry parameter type boolean
     */
    /**
     * \@description Calls the ZWaveAPI and get data for all the conected devices
     * @param {?} gateway gateWay Information
     * @param {?=} getMock bollean type
     * @param {?=} doDefaultRetrys retry parameter type boolean
     * @return {?}
     */
    GatewayService.prototype.getLeckageDeviceConnectedToGateway = /**
     * \@description Calls the ZWaveAPI and get data for all the conected devices
     * @param {?} gateway gateWay Information
     * @param {?=} getMock bollean type
     * @param {?=} doDefaultRetrys retry parameter type boolean
     * @return {?}
     */
    function (gateway, getMock, doDefaultRetrys) {
        if (getMock === void 0) { getMock = false; }
        if (doDefaultRetrys === void 0) { doDefaultRetrys = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var allDevices, foundDevices, nodeId, device;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // if (getMock) {
                        //   return [
                        //     {
                        //       nodeId: 3,
                        //       givenName: 'MockDevice'
                        //     }
                        //   ];
                        // }
                        if (!doDefaultRetrys) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.callApi(gateway, 'ZWaveAPI/Data', 'get', null, null, null)];
                    case 1:
                        allDevices = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.callApi(gateway, 'ZWaveAPI/Data', 'get', null, null, null, 1, 1)];
                    case 3:
                        allDevices = _a.sent();
                        _a.label = 4;
                    case 4:
                        foundDevices = [];
                        this.logService.log('gatewayService::got devices: ' + JSON.stringify(allDevices));
                        // tslint:disable-next-line:forin
                        for (nodeId in allDevices.devices) {
                            device = allDevices.devices[nodeId];
                            if (device.data.manufacturerId.value ===
                                CommonConstants.LECKAGE_MANUFACTURER_ID &&
                                device.data.manufacturerProductId.value ===
                                    CommonConstants.LECKAGE_MANUFACTURER_PRODUCT_ID &&
                                device.data.manufacturerProductType.value ===
                                    CommonConstants.LECKAGE_MANUFACTURER_TYPE) {
                                foundDevices.push({
                                    nodeId: nodeId,
                                    givenName: device.data.givenName.value
                                });
                            }
                        }
                        return [2 /*return*/, foundDevices];
                }
            });
        });
    };
    /**
     * @description not in use
     */
    /**
     * \@description not in use
     * @return {?}
     */
    GatewayService.prototype.onLogout = /**
     * \@description not in use
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description method to save the gateway object in local storage for persistence use
     * @param accessToken accesstoken
     * @param gateway object to save
     */
    /**
     * \@description method to save the gateway object in local storage for persistence use
     * @param {?} accessToken accesstoken
     * @param {?} gateway object to save
     * @return {?}
     */
    GatewayService.prototype.saveGateway = /**
     * \@description method to save the gateway object in local storage for persistence use
     * @param {?} accessToken accesstoken
     * @param {?} gateway object to save
     * @return {?}
     */
    function (accessToken, gateway) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.logService.log(accessToken);
                this.cacheService.setLocalData(this.storageName, JSON.stringify(gateway));
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description method to fetch gateway object from local storage and return parse gateway object
     * @param accessToken access token
     */
    /**
     * \@description method to fetch gateway object from local storage and return parse gateway object
     * @param {?} accessToken access token
     * @return {?}
     */
    GatewayService.prototype.getPairedGateway = /**
     * \@description method to fetch gateway object from local storage and return parse gateway object
     * @param {?} accessToken access token
     * @return {?}
     */
    function (accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rawGatewayObject, gw;
            return tslib_1.__generator(this, function (_a) {
                this.logService.log('in get pair getway service', accessToken);
                rawGatewayObject = JSON.stringify(this.cacheService.getLocalData(this.storageName));
                this.logService.log(rawGatewayObject);
                gw = JSON.parse(rawGatewayObject);
                return [2 /*return*/, gw];
            });
        });
    };
    GatewayService.INIT_INTERVAL_REMOTE = 2000;
    GatewayService.MAX_INTERVAL_REMOTE = 6000;
    GatewayService.REQ_TIMEOUT_REMOTE = 20000;
    GatewayService.INIT_INTERVAL_LOCAL = 2000;
    GatewayService.MAX_INTERVAL_LOCAL = 6000;
    GatewayService.REQ_TIMEOUT_LOCAL = 6000;
    GatewayService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    GatewayService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: GatewayAclService },
        { type: AuthService },
        { type: CacheService },
        { type: WebService },
        { type: LogService }
    ]; };
    /** @nocollapse */ GatewayService.ngInjectableDef = i0.defineInjectable({ factory: function GatewayService_Factory() { return new GatewayService(i0.inject(i1.HttpClient), i0.inject(i2.GatewayAclService), i0.inject(i3.AuthService), i0.inject(i4.CacheService), i0.inject(i5.WebService), i0.inject(i6.LogService)); }, token: GatewayService, providedIn: "root" });
    return GatewayService;
}());
export { GatewayService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GatewayService.INIT_INTERVAL_REMOTE;
    /**
     * @type {?}
     * @private
     */
    GatewayService.MAX_INTERVAL_REMOTE;
    /**
     * @type {?}
     * @private
     */
    GatewayService.REQ_TIMEOUT_REMOTE;
    /**
     * @type {?}
     * @private
     */
    GatewayService.INIT_INTERVAL_LOCAL;
    /**
     * @type {?}
     * @private
     */
    GatewayService.MAX_INTERVAL_LOCAL;
    /**
     * @type {?}
     * @private
     */
    GatewayService.REQ_TIMEOUT_LOCAL;
    /** @type {?} */
    GatewayService.prototype.observerId;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.localOnline;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.remoteOnline;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.completedFirstRun;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.storageName;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.gatewayAclService;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.cacheService;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.webService;
    /**
     * @type {?}
     * @private
     */
    GatewayService.prototype.logService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2dhdGV3YXktc2VydmljZS9nYXRld2F5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUNMLGVBQWUsRUFDZix1QkFBdUIsRUFHdkIsNEJBQTRCLEVBQzdCLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7O0FBRW5DO0lBQW1ELHlEQUFLO0lBQ3RELHVDQUFZLENBQVM7UUFBckIsWUFDRSxrQkFBTSxDQUFDLENBQUMsU0FJVDtRQUZDLGdDQUFnQztRQUNoQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSw2QkFBNkIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDdkUsQ0FBQztJQUNILG9DQUFDO0FBQUQsQ0FBQyxBQVBELENBQW1ELEtBQUssR0FPdkQ7O0FBRUQ7SUFBZ0Qsc0RBQUs7SUFDbkQsb0NBQVksQ0FBUztRQUFyQixZQUNFLGtCQUFNLENBQUMsQ0FBQyxTQUlUO1FBSEMsS0FBSSxDQUFDLElBQUksR0FBRyw0QkFBNEIsQ0FBQztRQUN6QyxnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsNkJBQTZCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3ZFLENBQUM7SUFDSCxpQ0FBQztBQUFELENBQUMsQUFQRCxDQUFnRCxLQUFLLEdBT3BEOztBQUVEO0lBbUJFLHdCQUNVLElBQWdCLEVBQ2hCLGlCQUFvQyxFQUNwQyxXQUF3QixFQUN4QixZQUEwQixFQUMxQixVQUFzQixFQUN0QixVQUFzQjtRQUx0QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBYmhDLGVBQVUsR0FBRyxjQUFjLENBQUM7UUFJcEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7SUFVdkMsQ0FBQztJQUdEOzs7Ozs7OztPQVFHOzs7Ozs7Ozs7Ozs7Ozs7SUFDRyxnQ0FBTzs7Ozs7Ozs7Ozs7Ozs7SUFBYixVQUNFLE9BQWdCLEVBQ2hCLFdBQW1CLEVBQ25CLE1BQXNCLEVBQ3RCLElBQXVCLEVBQ3ZCLE9BQVksRUFDWixjQUE2QyxFQUM3QyxVQUFzQixFQUN0QixXQUF1QixFQUN2QixpQkFBNkQsRUFDN0QsaUJBQWtDO1FBUGxDLHVCQUFBLEVBQUEsY0FBc0I7UUFDdEIscUJBQUEsRUFBQSxXQUF1QjtRQUd2QiwyQkFBQSxFQUFBLGNBQXNCO1FBQ3RCLDRCQUFBLEVBQUEsZUFBdUI7UUFDdkIsa0NBQUEsRUFBQSxzQkFBNkMsUUFBUSxFQUFFLElBQUksRUFBRTtRQUM3RCxrQ0FBQSxFQUFBLDBCQUFrQzs7Ozs7O3dCQUU1QixXQUFXLEdBQUc7NEJBQ2xCLFdBQVcsRUFBRSxjQUFjLENBQUMsaUJBQWlCOzRCQUM3QyxhQUFhLEVBQUUsY0FBYyxDQUFDLG1CQUFtQjs0QkFDakQsWUFBWSxFQUFFLGNBQWMsQ0FBQyxrQkFBa0I7NEJBQy9DLFdBQVcsRUFBRSxVQUFVO3lCQUN4Qjt3QkFFRCwwRUFBMEU7d0JBQzFFLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFOzRCQUM3QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0NBQ3BCLGNBQWMsR0FBRyxPQUFPLENBQUM7NkJBQzFCO2lDQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQ0FDNUIsY0FBYyxHQUFHLFFBQVEsQ0FBQzs2QkFDM0I7aUNBQU07Z0NBQ0wsc0NBQXNDO2dDQUN0QyxjQUFjLEdBQUcsU0FBUyxDQUFDOzZCQUM1Qjt5QkFDRjs7d0JBS0ssY0FBYyxHQUNsQixjQUFjLEtBQUssT0FBTzs0QkFDeEIsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLEtBQUs7NEJBQy9CLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNOzs0QkFFcEMsdURBQXVEOzRCQUN2RCxLQUFvQixLQUFBLGlCQUFBLE9BQU8sQ0FBQyxXQUFXLENBQUEsNENBQUU7Z0NBQTlCLEtBQUs7Z0NBQ2QsZ0VBQWdFO2dDQUNoRSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO29DQUNqQyxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztvQ0FDdEIsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7aUNBQzNCOzZCQUNGOzs7Ozs7Ozs7d0JBRUQsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7NEJBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzt5QkFDbkQ7NkJBRUcsQ0FBQSxjQUFjLEtBQUssUUFBUSxDQUFBLEVBQTNCLHlCQUEyQjt3QkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQzt3QkFDdEMsV0FBVyxHQUFHOzRCQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7NEJBQ3BCLFFBQVEsVUFBQTs0QkFDUixRQUFRLFVBQUE7NEJBQ1IsV0FBVyxFQUFFLFdBQVc7NEJBQ3hCLE1BQU0sUUFBQTs0QkFDTixJQUFJLEVBQUUsU0FBUzt5QkFDaEI7d0JBQ0QsSUFDRSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTTs0QkFDL0IsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUs7NEJBQzlCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQ2hDOzRCQUNBLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDekM7d0JBQ2lCLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUE7O3dCQUE1QyxJQUFJLEdBQVEsU0FBZ0M7d0JBRTVDLGFBQWEsR0FBRzs0QkFDcEIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO3lCQUNoQzs7Ozt3QkFHQyxLQUFBLGFBQWEsQ0FBQTt3QkFDWCxLQUFBLGtCQUFrQixDQUFBO3dCQUNoQixxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLEVBQUE7O3dCQUY3QyxNQUVDLEdBQUcsU0FBeUMsQ0FBQzs7Ozt3QkFFOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUM7Ozt3QkFFckIsR0FBRyxHQUFHLDRCQUE0QixHQUFHLG1CQUFtQjt3QkFDeEQsVUFBVSxHQUFHOzRCQUNqQixPQUFPLEVBQUUsYUFBYTt5QkFDdkI7Ozs7d0JBRXFCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBbEcsV0FBVyxHQUFHLFNBQW9GO3dCQUN4RyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzt3QkFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzt3QkFDOUIsc0JBQU8sV0FBVyxFQUFDOzs7d0JBRW5CLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUNuQix1REFBdUQ7NEJBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBQyxDQUFDLENBQ2xCLENBQUM7d0JBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Ozs7NkJBRW5CLENBQUEsY0FBYyxLQUFLLE9BQU8sSUFBSSxjQUFjLEtBQUssT0FBTyxDQUFBLEVBQXhELHlCQUF3RDt3QkFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDckMsZUFBZSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7Ozs7d0JBRzFELFdBQVcsR0FBRzs0QkFDbEIsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRTt5QkFDNUM7d0JBQ0QsSUFDRSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSzs0QkFDOUIsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLFNBQVMsRUFDbEM7NEJBQ0EsNkNBQTZDOzRCQUM3QyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO3lCQUM1Qjt3QkFDRCw2Q0FBNkM7d0JBQzdDLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxpQkFBaUIsQ0FBQzt3QkFDMUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxXQUFXOzt3QkFHNUMscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFqRyxXQUFXLEdBQUcsU0FBbUY7d0JBQ3ZHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO3dCQUN4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO3dCQUM5QixzQkFBTyxXQUFXLEVBQUM7Ozt3QkFFbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQ25CLHNEQUFzRDs0QkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFDLENBQUMsQ0FDbEIsQ0FBQzt3QkFDRixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs2QkFDckIsQ0FBQyxjQUFjLEVBQWYseUJBQWU7d0JBQ1YscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FDdkIsT0FBTyxFQUNQLFdBQVcsRUFDWCxNQUFNLEVBQ04sSUFBSSxFQUNKLE9BQU8sRUFDUCxRQUFRLENBQ1QsRUFBQTs2QkFQRCxzQkFBTyxTQU9OLEVBQUM7NkJBRUYsTUFBTSxHQUFDLENBQUM7Ozs7NkJBR0gsQ0FBQyxjQUFjLEVBQWYseUJBQWU7O3dCQUVsQixPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7d0JBQzlCLGtCQUFrQixHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDdkMsbUJBQW1CLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO3dCQUN4QyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDaEMsT0FBTyxFQUNQLFdBQVcsRUFDWCxNQUFNLEVBQ04sSUFBSSxFQUNKLE9BQU8sRUFDUCxRQUFRLEVBQ1IsU0FBUyxFQUNULFNBQVMsRUFDVCxtQkFBbUIsQ0FDcEI7d0JBQ0ssWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQy9CLE9BQU8sRUFDUCxXQUFXLEVBQ1gsTUFBTSxFQUNOLElBQUksRUFDSixPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxTQUFTLEVBQ1Qsa0JBQWtCLENBQ25COzs7Ozt3QkFHa0IscUJBQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUFBOzt3QkFBNUQsUUFBUSxHQUFHLFNBQWlEO3dCQUNsRSxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUNwQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUNyQyxzQkFBTyxRQUFRLEVBQUM7Ozt3QkFFaEIsbURBQW1EO3dCQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxtREFBbUQsR0FBRyxHQUFDLENBQUMsQ0FBQzs7Ozt3QkFJM0UsTUFBTSxTQUFBOzs7O3dCQUVDLHFCQUFNLGFBQWEsRUFBQTs7d0JBQTVCLE1BQU0sR0FBRyxTQUFtQixDQUFDO3dCQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7Ozt3QkFFekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7d0JBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUNuQiw0REFBNEQ7NEJBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBQyxDQUFDLENBQ2xCLENBQUM7Ozs7d0JBR08scUJBQU0sWUFBWSxFQUFBOzt3QkFBM0IsTUFBTSxHQUFHLFNBQWtCLENBQUM7d0JBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzs7O3dCQUV4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzt3QkFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQ25CLDJEQUEyRDs0QkFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFDLENBQUMsQ0FDbEIsQ0FBQzs7O3dCQUVKLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTs0QkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO3lCQUNsRTt3QkFDRCxzQkFBTyxNQUFNLEVBQUM7Ozs7O0tBR25CO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0csMkRBQWtDOzs7Ozs7O0lBQXhDLFVBQ0UsT0FBZ0IsRUFDaEIsT0FBd0IsRUFDeEIsZUFBdUI7UUFEdkIsd0JBQUEsRUFBQSxlQUF3QjtRQUN4QixnQ0FBQSxFQUFBLHVCQUF1Qjs7Ozs7Ozs7Ozs7Ozs7NkJBV25CLGVBQWUsRUFBZix3QkFBZTt3QkFDSixxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUM3QixPQUFPLEVBQ1AsZUFBZSxFQUNmLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksQ0FDTCxFQUFBOzt3QkFQRCxVQUFVLEdBQUcsU0FPWixDQUFDOzs0QkFFVyxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUM3QixPQUFPLEVBQ1AsZUFBZSxFQUNmLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixDQUFDLEVBQ0QsQ0FBQyxDQUNGLEVBQUE7O3dCQVRELFVBQVUsR0FBRyxTQVNaLENBQUM7Ozt3QkFHRSxZQUFZLEdBQUcsRUFBRTt3QkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNsRixpQ0FBaUM7d0JBQ2pDLEtBQVcsTUFBTSxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUU7NEJBQ2pDLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs0QkFDekMsSUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO2dDQUNoQyxlQUFlLENBQUMsdUJBQXVCO2dDQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7b0NBQ3ZDLGVBQWUsQ0FBQywrQkFBK0I7Z0NBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSztvQ0FDekMsZUFBZSxDQUFDLHlCQUF5QixFQUN6QztnQ0FDQSxZQUFZLENBQUMsSUFBSSxDQUFDO29DQUNoQixNQUFNLFFBQUE7b0NBQ04sU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7aUNBQ3ZDLENBQUMsQ0FBQzs2QkFDSjt5QkFFRjt3QkFDRCxzQkFBTyxZQUFZLEVBQUM7Ozs7S0FDckI7SUFFRDs7T0FFRzs7Ozs7SUFDRyxpQ0FBUTs7OztJQUFkOzs7Ozs7S0FFQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDRyxvQ0FBVzs7Ozs7O0lBQWpCLFVBQWtCLFdBQW1CLEVBQUUsT0FBZ0I7OztnQkFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7O0tBQzNFO0lBRUQ7OztPQUdHOzs7Ozs7SUFDRyx5Q0FBZ0I7Ozs7O0lBQXRCLFVBQXVCLFdBQW1COzs7O2dCQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDekQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FDcEUsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FBQztnQkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNoQyxFQUFFLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDaEQsc0JBQU8sRUFBRSxFQUFDOzs7S0FDWDtJQWxWYyxtQ0FBb0IsR0FBRyxJQUFJLENBQUM7SUFDNUIsa0NBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQzNCLGlDQUFrQixHQUFHLEtBQUssQ0FBQztJQUUzQixrQ0FBbUIsR0FBRyxJQUFJLENBQUM7SUFDM0IsaUNBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQzFCLGdDQUFpQixHQUFHLElBQUksQ0FBQzs7Z0JBVnpDLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBbENRLFVBQVU7Z0JBQ1YsaUJBQWlCO2dCQUNqQixXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osVUFBVTtnQkFDVixVQUFVOzs7eUJBTm5CO0NBeVhDLEFBeFZELElBd1ZDO1NBclZZLGNBQWM7Ozs7OztJQUN6QixvQ0FBMkM7Ozs7O0lBQzNDLG1DQUEwQzs7Ozs7SUFDMUMsa0NBQTBDOzs7OztJQUUxQyxtQ0FBMEM7Ozs7O0lBQzFDLGtDQUF5Qzs7Ozs7SUFDekMsaUNBQXdDOztJQUV4QyxvQ0FBNEI7Ozs7O0lBRTVCLHFDQUFvQjs7Ozs7SUFDcEIsc0NBQXFCOzs7OztJQUNyQiwyQ0FBa0M7Ozs7O0lBQ2xDLHFDQUF1Qzs7Ozs7SUFHckMsOEJBQXdCOzs7OztJQUN4QiwyQ0FBNEM7Ozs7O0lBQzVDLHFDQUFnQzs7Ozs7SUFDaEMsc0NBQWtDOzs7OztJQUNsQyxvQ0FBOEI7Ozs7O0lBQzlCLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBHYXRld2F5QWNsU2VydmljZSB9IGZyb20gJy4vZ2F0ZXdheUFjbC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi9jYWNoZS1zZXJ2aWNlL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gJy4uL3dlYi1zZXJ2aWNlL3dlYi5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXItc2VydmljZS9sb2dnZXIuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb21tb25Db25zdGFudHMsXG4gIEdhdGV3YXlDcmVkZW50aWFsc1R5cGVzLFxuICBHYXRld2F5LFxuICBJTG9nb3V0SW50ZXJmYWNlLFxuICBnYXRld2F5RGV2aWNlQ29udHJvbEVuZHBvaW50XG59IGZyb20gJy4uLy4uL21vZGVscy9nZXR3YXkubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgR2F0ZXdheUFscmVhZHlDb25maWd1cmVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG06IHN0cmluZykge1xuICAgIHN1cGVyKG0pO1xuXG4gICAgLy8gU2V0IHRoZSBwcm90b3R5cGUgZXhwbGljaXRseS5cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgR2F0ZXdheUFscmVhZHlDb25maWd1cmVkRXJyb3IucHJvdG90eXBlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2F0ZXdheVNlcmlhbE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG06IHN0cmluZykge1xuICAgIHN1cGVyKG0pO1xuICAgIHRoaXMubmFtZSA9ICdHYXRld2F5U2VyaWFsTm90Rm91bmRFcnJvcic7XG4gICAgLy8gU2V0IHRoZSBwcm90b3R5cGUgZXhwbGljaXRseS5cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgR2F0ZXdheUFscmVhZHlDb25maWd1cmVkRXJyb3IucHJvdG90eXBlKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHYXRld2F5U2VydmljZSBpbXBsZW1lbnRzIElMb2dvdXRJbnRlcmZhY2Uge1xuICBwcml2YXRlIHN0YXRpYyBJTklUX0lOVEVSVkFMX1JFTU9URSA9IDIwMDA7XG4gIHByaXZhdGUgc3RhdGljIE1BWF9JTlRFUlZBTF9SRU1PVEUgPSA2MDAwO1xuICBwcml2YXRlIHN0YXRpYyBSRVFfVElNRU9VVF9SRU1PVEUgPSAyMDAwMDtcblxuICBwcml2YXRlIHN0YXRpYyBJTklUX0lOVEVSVkFMX0xPQ0FMID0gMjAwMDtcbiAgcHJpdmF0ZSBzdGF0aWMgTUFYX0lOVEVSVkFMX0xPQ0FMID0gNjAwMDtcbiAgcHJpdmF0ZSBzdGF0aWMgUkVRX1RJTUVPVVRfTE9DQUwgPSA2MDAwO1xuXG4gIG9ic2VydmVySWQgPSA0ODk3NjQ0NjEzMjExMTtcblxuICBwcml2YXRlIGxvY2FsT25saW5lO1xuICBwcml2YXRlIHJlbW90ZU9ubGluZTtcbiAgcHJpdmF0ZSBjb21wbGV0ZWRGaXJzdFJ1biA9IGZhbHNlO1xuICBwcml2YXRlIHN0b3JhZ2VOYW1lID0gJ2dhdGV3YXlfZGV2aWNlJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBnYXRld2F5QWNsU2VydmljZTogR2F0ZXdheUFjbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZSxcbiAgICBwcml2YXRlIHdlYlNlcnZpY2U6IFdlYlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlLFxuICApIHtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBDYWxscyB0aGUgR2F0ZXdheSBBUElcbiAgICogQHBhcmFtIGdhdGV3YXkgZ2F0ZVdheSBJbmZvcm1hdGlvblxuICAgKiBAcGFyYW0gYXBpRW5kcG9pbnQgVGhpcyBpcyBBcGkgRW5kIFB7b2ludHN9XG4gICAqIEBwYXJhbSBtZXRob2QgU3BlY2lmaWMgTWV0aG9kIFRvIEZvbGxvd1xuICAgKiBAcGFyYW0gYm9keSBCb2R5IElmIEl0IGlzIGEgUE9TVCBBcGkgQ2FsbFxuICAgKiBAcGFyYW0gaGVhZGVycyBub3QgdXNlZCByaWdodCBub3dcbiAgICogQHBhcmFtIGNvbm5lY3Rpb25UeXBlIGV4cGxpY2l0bHkgZGVjaWRlLCBpZiBpdCBzaG91bGQgYmUgY2FsbGVkIGxvY2FsbHksIG9yIHJlbW90ZWx5LiBEZWZhdWx0OiByZW1vdGVcbiAgICovXG4gIGFzeW5jIGNhbGxBcGkoXG4gICAgZ2F0ZXdheTogR2F0ZXdheSxcbiAgICBhcGlFbmRwb2ludDogc3RyaW5nLFxuICAgIG1ldGhvZDogc3RyaW5nID0gJ2dldCcsXG4gICAgYm9keTogYW55IHwgbnVsbCA9IG51bGwsXG4gICAgaGVhZGVycz86IHt9LFxuICAgIGNvbm5lY3Rpb25UeXBlPzogJ3JlbW90ZScgfCAnbG9jYWwnIHwgJ2FkbWluJyxcbiAgICByZXRyeUxvY2FsOiBudW1iZXIgPSAyLFxuICAgIHJldHJ5UmVtb3RlOiBudW1iZXIgPSAzLFxuICAgIGtpbGxSZXF1ZXN0T2JqZWN0OiB7IGNvbnRpbnVlOiBib29sZWFuIH0gPSB7IGNvbnRpbnVlOiB0cnVlIH0sXG4gICAgbG9jYWxSZXNwb25zZVR5cGU6IHN0cmluZyA9ICdqc29uJ1xuICApIHtcbiAgICBjb25zdCByZXRyeUNvbmZpZyA9IHtcbiAgICAgIFJFUV9USU1FT1VUOiBHYXRld2F5U2VydmljZS5SRVFfVElNRU9VVF9MT0NBTCxcbiAgICAgIElOSVRfSU5URVJWQUw6IEdhdGV3YXlTZXJ2aWNlLklOSVRfSU5URVJWQUxfTE9DQUwsXG4gICAgICBNQVhfSU5URVJWQUw6IEdhdGV3YXlTZXJ2aWNlLk1BWF9JTlRFUlZBTF9MT0NBTCxcbiAgICAgIE1BWF9SRVRSSUVTOiByZXRyeUxvY2FsLFxuICAgIH07XG5cbiAgICAvLyBJZiBubyBjb25uZWN0aW9uIFR5cGUgaXMgZ2l2ZW4gYW5kIHRoZSBNZXRob2QgaXMgcnVuIGZvciB0aGUgZmlyc3QgVGltZVxuICAgIGlmICghY29ubmVjdGlvblR5cGUgJiYgdGhpcy5jb21wbGV0ZWRGaXJzdFJ1bikge1xuICAgICAgaWYgKHRoaXMubG9jYWxPbmxpbmUpIHtcbiAgICAgICAgY29ubmVjdGlvblR5cGUgPSAnbG9jYWwnO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnJlbW90ZU9ubGluZSkge1xuICAgICAgICBjb25uZWN0aW9uVHlwZSA9ICdyZW1vdGUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZ28gdG8gcmFjZSBiZXR3ZWVuIHJlbW90ZSBhbmQgbG9jYWxcbiAgICAgICAgY29ubmVjdGlvblR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJ5IHJlbW90ZSBjYWxsIGZpcnN0LCBlbHNlIHRyeSBsb2NhbFxuICAgIGxldCB1c2VybmFtZTogc3RyaW5nO1xuICAgIGxldCBwYXNzd29yZDogc3RyaW5nO1xuICAgIGNvbnN0IHVzZUNyZWRlbnRpYWxzID1cbiAgICAgIGNvbm5lY3Rpb25UeXBlID09PSAnbG9jYWwnXG4gICAgICAgID8gR2F0ZXdheUNyZWRlbnRpYWxzVHlwZXMuTE9DQUxcbiAgICAgICAgOiBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcy5SRU1PVEU7XG5cbiAgICAvLyB0aGlzLmxvZ1NlcnZpY2UubG9nKCdjcmVkIHR5cGU6ICcgKyB1c2VDcmVkZW50aWFscyk7XG4gICAgZm9yIChjb25zdCBjcmVkcyBvZiBnYXRld2F5LmNyZWRlbnRpYWxzKSB7XG4gICAgICAvLyB0aGlzLmxvZ1NlcnZpY2UubG9nKCdpdGVyYXRlIGNyZWRzJyArIEpTT04uc3RyaW5naWZ5KGNyZWRzKSk7XG4gICAgICBpZiAoY3JlZHMudHlwZSA9PT0gdXNlQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgdXNlcm5hbWUgPSBjcmVkcy51c2VyO1xuICAgICAgICBwYXNzd29yZCA9IGNyZWRzLnBhc3N3b3JkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1c2VybmFtZSA9PT0gdW5kZWZpbmVkIHx8IHBhc3N3b3JkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVXNlcm5hbWUgb3IgUGFzc3dvcmQgdW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbm5lY3Rpb25UeXBlID09PSAncmVtb3RlJykge1xuICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnQ29ubmVjdGlvbiBpcyByZW1vdGUnKTtcbiAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgICAgICBib3hJZDogZ2F0ZXdheS5ib3hJZCxcbiAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgICB1cmxFbmRwb2ludDogYXBpRW5kcG9pbnQsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgYm9keTogdW5kZWZpbmVkXG4gICAgICB9O1xuICAgICAgaWYgKFxuICAgICAgICBtZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BPU1QnIHx8XG4gICAgICAgIG1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUFVUJyB8fFxuICAgICAgICBtZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BBVENIJ1xuICAgICAgKSB7XG4gICAgICAgIHJlcXVlc3RCb2R5LmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVzZXI6IGFueSA9IGF3YWl0IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlcigpO1xuXG4gICAgICBjb25zdCByZXF1ZXN0SGVhZGVyID0ge1xuICAgICAgICBhY2Nlc3NfdG9rZW46IHVzZXIuYWNjZXNzX3Rva2VuXG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyW1xuICAgICAgICAgICd4LWNvcnJlbGF0aW9uLWlkJ1xuICAgICAgICBdID0gYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRDb3JyZWxhdGlvbklkKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfZShlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVybCA9IGdhdGV3YXlEZXZpY2VDb250cm9sRW5kcG9pbnQgKyAnL2dhdGV3YXlzL2NvbnRyb2wnO1xuICAgICAgY29uc3QgaHR0cE9wdGlvbiA9IHtcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdEhlYWRlclxuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGFwaVJlc3BvbnNlID0gYXdhaXQgdGhpcy53ZWJTZXJ2aWNlLnBvc3RBcGkodXJsLCByZXF1ZXN0Qm9keSwgaHR0cE9wdGlvbiwgcmV0cnlDb25maWcpLnRvUHJvbWlzZSgpO1xuICAgICAgICB0aGlzLnJlbW90ZU9ubGluZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcGxldGVkRmlyc3RSdW4gPSB0cnVlO1xuICAgICAgICByZXR1cm4gYXBpUmVzcG9uc2U7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfZShcbiAgICAgICAgICAnZ2F0ZXdheXNlcnZpY2U6OmNhbGxBcGk6IE5ldHdvcmsgZXJyb3IgcmVtb3RlIHJlcXVlc3QnICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlbW90ZU9ubGluZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29ubmVjdGlvblR5cGUgPT09ICdsb2NhbCcgfHwgY29ubmVjdGlvblR5cGUgPT09ICdhZG1pbicpIHtcbiAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ0Nvbm5lY3Rpb24gaXMgbG9jYWwnKTtcbiAgICAgIGNvbnN0IGJhc2ljQXV0aFN0cmluZyA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICAgIC8vIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYmFzaWNBdXRoU3RyaW5nIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1ldGhvZC50b1VwcGVyQ2FzZSgpICE9PSAnR0VUJyAmJlxuICAgICAgICAgIG1ldGhvZC50b1VwcGVyQ2FzZSgpICE9PSAnT1BUSU9OUydcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICAgICAgaHR0cE9wdGlvbnNbJ2JvZHknXSA9IGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICAgIGh0dHBPcHRpb25zWydyZXNwb25zZVR5cGUnXSA9IGxvY2FsUmVzcG9uc2VUeXBlO1xuICAgICAgICBjb25zdCB1cmwgPSAnaHR0cDovLycgKyBnYXRld2F5LmxvY2FsSXAgKyAnOjgwODMvJyArIGFwaUVuZHBvaW50O1xuXG4gICAgICAgIC8vIENyZWF0ZSBzZXBhcmF0ZSBtZXRob2QgZm9yIHJlcXVlc3QgQVBJXG4gICAgICAgIGNvbnN0IGFwaVJlc3BvbnNlID0gYXdhaXQgdGhpcy53ZWJTZXJ2aWNlLnJlcXVlc3RBcGkobWV0aG9kLCB1cmwsIGh0dHBPcHRpb25zLCByZXRyeUNvbmZpZykudG9Qcm9taXNlKCk7XG4gICAgICAgIHRoaXMubG9jYWxPbmxpbmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbXBsZXRlZEZpcnN0UnVuID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGFwaVJlc3BvbnNlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nX2UoXG4gICAgICAgICAgJ2dhdGV3YXlzZXJ2aWNlOjpjYWxsQXBpOiBOZXR3b3JrIGVycm9yIGxvY2FsIHJlcXVlc3QnICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmxvY2FsT25saW5lID0gZmFsc2U7XG4gICAgICAgIGlmICghY29ubmVjdGlvblR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsQXBpKFxuICAgICAgICAgICAgZ2F0ZXdheSxcbiAgICAgICAgICAgIGFwaUVuZHBvaW50LFxuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAncmVtb3RlJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWNvbm5lY3Rpb25UeXBlKSB7XG4gICAgICAvLyBEbyByZXF1ZXN0cyBpbiBwYXJhbGxlbCwgaWYgbm8gY29ubmVjdGlvblR5cGUgaXMgc3BlY2lmaWVkXG4gICAgICBjb25zdCBjdXJ0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBjb25zdCBjYW5jZWxSZXF1ZXN0TG9jYWwgPSB7IGNvbnRpbnVlOiB0cnVlIH07XG4gICAgICBjb25zdCBjYW5jZWxSZXF1ZXN0UmVtb3RlID0geyBjb250aW51ZTogdHJ1ZSB9O1xuICAgICAgY29uc3QgcmVtb3RlUHJvbWlzZSA9IHRoaXMuY2FsbEFwaShcbiAgICAgICAgZ2F0ZXdheSxcbiAgICAgICAgYXBpRW5kcG9pbnQsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgYm9keSxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgJ3JlbW90ZScsXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBjYW5jZWxSZXF1ZXN0UmVtb3RlXG4gICAgICApO1xuICAgICAgY29uc3QgbG9jYWxQcm9taXNlID0gdGhpcy5jYWxsQXBpKFxuICAgICAgICBnYXRld2F5LFxuICAgICAgICBhcGlFbmRwb2ludCxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBib2R5LFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICAnbG9jYWwnLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgY2FuY2VsUmVxdWVzdExvY2FsXG4gICAgICApO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gd2FpdCBmb3IgZmlyc3QgdG8gZmluaXNoXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtyZW1vdGVQcm9taXNlLCBsb2NhbFByb21pc2VdKTtcbiAgICAgICAgY2FuY2VsUmVxdWVzdExvY2FsLmNvbnRpbnVlID0gZmFsc2U7XG4gICAgICAgIGNhbmNlbFJlcXVlc3RSZW1vdGUuY29udGludWUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBqdW1wcyBpbiB0aGlzIGNhdGNoLCBpZiBvbmUgb2YgdGhlIHJlcXVlc3QgZmFpbHNcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ19lKCdnYXRld2F5c2VydmljZTo6Y2FsbEFwaTogcGFyYWxsZWwgcHJvbWlzZSBmYWlsZWQgJyArIGUpO1xuICAgICAgICAvLyB3YWl0IGZvciBib3RoIHRvIGZpbmlzaFxuICAgICAgICAvLyB0aGUgcHJvbWlzZSB0aGF0IGZhaWxlZCBiZWZvcmUgd2lsbCBmYWlsIGFnYWluIGhlcmUgYW5kIHRocm93IGFuIGV4Y2VwdGlvblxuICAgICAgICAvLyB0aGUgb3RoZXIgb25lIGlzIHN0aWxsIG9wZW4gYW5kIGNvdWxkIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzdWx0ID0gYXdhaXQgcmVtb3RlUHJvbWlzZTtcbiAgICAgICAgICB0aGlzLnJlbW90ZU9ubGluZSA9IHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLnJlbW90ZU9ubGluZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfZShcbiAgICAgICAgICAgICdnYXRld2F5c2VydmljZTo6Y2FsbEFwaTogcmVtb3RlIHJlcXVlc3QgZmFpbGVkIHdpdGggZXJyb3IgJyArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShlKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXN1bHQgPSBhd2FpdCBsb2NhbFByb21pc2U7XG4gICAgICAgICAgdGhpcy5sb2NhbE9ubGluZSA9IHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLmxvY2FsT25saW5lID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ19lKFxuICAgICAgICAgICAgJ2dhdGV3YXlzZXJ2aWNlOjpjYWxsQXBpOiBMb2NhbCByZXF1ZXN0IGZhaWxlZCB3aXRoIGVycm9yICcgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZ2F0ZXdheXNlcnZpY2U6OmNhbGxBcGk6IEJvdGggcmVxdWVzdHMgZmFpbGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIENhbGxzIHRoZSBaV2F2ZUFQSSBhbmQgZ2V0IGRhdGEgZm9yIGFsbCB0aGUgY29uZWN0ZWQgZGV2aWNlc1xuICAgKiBAcGFyYW0gZ2F0ZXdheSBnYXRlV2F5IEluZm9ybWF0aW9uXG4gICAqIEBwYXJhbSBnZXRNb2NrIGJvbGxlYW4gdHlwZVxuICAgKiBAcGFyYW0gZG9EZWZhdWx0UmV0cnlzIHJldHJ5IHBhcmFtZXRlciB0eXBlIGJvb2xlYW5cbiAgICovXG4gIGFzeW5jIGdldExlY2thZ2VEZXZpY2VDb25uZWN0ZWRUb0dhdGV3YXkoXG4gICAgZ2F0ZXdheTogR2F0ZXdheSxcbiAgICBnZXRNb2NrOiBib29sZWFuID0gZmFsc2UsXG4gICAgZG9EZWZhdWx0UmV0cnlzID0gZmFsc2VcbiAgKSB7XG4gICAgLy8gaWYgKGdldE1vY2spIHtcbiAgICAvLyAgIHJldHVybiBbXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICBub2RlSWQ6IDMsXG4gICAgLy8gICAgICAgZ2l2ZW5OYW1lOiAnTW9ja0RldmljZSdcbiAgICAvLyAgICAgfVxuICAgIC8vICAgXTtcbiAgICAvLyB9XG4gICAgbGV0IGFsbERldmljZXM7XG4gICAgaWYgKGRvRGVmYXVsdFJldHJ5cykge1xuICAgICAgYWxsRGV2aWNlcyA9IGF3YWl0IHRoaXMuY2FsbEFwaShcbiAgICAgICAgZ2F0ZXdheSxcbiAgICAgICAgJ1pXYXZlQVBJL0RhdGEnLFxuICAgICAgICAnZ2V0JyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxsRGV2aWNlcyA9IGF3YWl0IHRoaXMuY2FsbEFwaShcbiAgICAgICAgZ2F0ZXdheSxcbiAgICAgICAgJ1pXYXZlQVBJL0RhdGEnLFxuICAgICAgICAnZ2V0JyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3VuZERldmljZXMgPSBbXTtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdnYXRld2F5U2VydmljZTo6Z290IGRldmljZXM6ICcgKyBKU09OLnN0cmluZ2lmeShhbGxEZXZpY2VzKSk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgZm9yIChjb25zdCBub2RlSWQgaW4gYWxsRGV2aWNlcy5kZXZpY2VzKSB7XG4gICAgICBjb25zdCBkZXZpY2UgPSBhbGxEZXZpY2VzLmRldmljZXNbbm9kZUlkXTtcbiAgICAgIGlmIChcbiAgICAgICAgZGV2aWNlLmRhdGEubWFudWZhY3R1cmVySWQudmFsdWUgPT09XG4gICAgICAgIENvbW1vbkNvbnN0YW50cy5MRUNLQUdFX01BTlVGQUNUVVJFUl9JRCAmJlxuICAgICAgICBkZXZpY2UuZGF0YS5tYW51ZmFjdHVyZXJQcm9kdWN0SWQudmFsdWUgPT09XG4gICAgICAgIENvbW1vbkNvbnN0YW50cy5MRUNLQUdFX01BTlVGQUNUVVJFUl9QUk9EVUNUX0lEICYmXG4gICAgICAgIGRldmljZS5kYXRhLm1hbnVmYWN0dXJlclByb2R1Y3RUeXBlLnZhbHVlID09PVxuICAgICAgICBDb21tb25Db25zdGFudHMuTEVDS0FHRV9NQU5VRkFDVFVSRVJfVFlQRVxuICAgICAgKSB7XG4gICAgICAgIGZvdW5kRGV2aWNlcy5wdXNoKHtcbiAgICAgICAgICBub2RlSWQsXG4gICAgICAgICAgZ2l2ZW5OYW1lOiBkZXZpY2UuZGF0YS5naXZlbk5hbWUudmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kRGV2aWNlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gbm90IGluIHVzZVxuICAgKi9cbiAgYXN5bmMgb25Mb2dvdXQoKSB7XG4gICAgLy8gYXdhaXQgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZVBlcnNpc3RlbnRJdGVtKHRoaXMuc3RvcmFnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBtZXRob2QgdG8gc2F2ZSB0aGUgZ2F0ZXdheSBvYmplY3QgaW4gbG9jYWwgc3RvcmFnZSBmb3IgcGVyc2lzdGVuY2UgdXNlXG4gICAqIEBwYXJhbSBhY2Nlc3NUb2tlbiBhY2Nlc3N0b2tlblxuICAgKiBAcGFyYW0gZ2F0ZXdheSBvYmplY3QgdG8gc2F2ZVxuICAgKi9cbiAgYXN5bmMgc2F2ZUdhdGV3YXkoYWNjZXNzVG9rZW46IHN0cmluZywgZ2F0ZXdheTogR2F0ZXdheSkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coYWNjZXNzVG9rZW4pO1xuICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldExvY2FsRGF0YSh0aGlzLnN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShnYXRld2F5KSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIG1ldGhvZCB0byBmZXRjaCBnYXRld2F5IG9iamVjdCBmcm9tIGxvY2FsIHN0b3JhZ2UgYW5kIHJldHVybiBwYXJzZSBnYXRld2F5IG9iamVjdFxuICAgKiBAcGFyYW0gYWNjZXNzVG9rZW4gYWNjZXNzIHRva2VuXG4gICAqL1xuICBhc3luYyBnZXRQYWlyZWRHYXRld2F5KGFjY2Vzc1Rva2VuOiBzdHJpbmcpOiBQcm9taXNlPEdhdGV3YXk+IHtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdpbiBnZXQgcGFpciBnZXR3YXkgc2VydmljZScsIGFjY2Vzc1Rva2VuKTtcbiAgICBjb25zdCByYXdHYXRld2F5T2JqZWN0ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5jYWNoZVNlcnZpY2UuZ2V0TG9jYWxEYXRhKFxuICAgICAgdGhpcy5zdG9yYWdlTmFtZVxuICAgICkpO1xuICAgIHRoaXMubG9nU2VydmljZS5sb2cocmF3R2F0ZXdheU9iamVjdCk7XG4gICAgY29uc3QgZ3c6IEdhdGV3YXkgPSBKU09OLnBhcnNlKHJhd0dhdGV3YXlPYmplY3QpO1xuICAgIHJldHVybiBndztcbiAgfVxuXG59XG4iXX0=