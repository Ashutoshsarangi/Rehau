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
export class GatewayAlreadyConfiguredError extends Error {
    /**
     * @param {?} m
     */
    constructor(m) {
        super(m);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, GatewayAlreadyConfiguredError.prototype);
    }
}
export class GatewaySerialNotFoundError extends Error {
    /**
     * @param {?} m
     */
    constructor(m) {
        super(m);
        this.name = 'GatewaySerialNotFoundError';
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, GatewayAlreadyConfiguredError.prototype);
    }
}
export class GatewayService {
    /**
     * @param {?} http
     * @param {?} gatewayAclService
     * @param {?} authService
     * @param {?} cacheService
     * @param {?} webService
     * @param {?} logService
     */
    constructor(http, gatewayAclService, authService, cacheService, webService, logService) {
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
    callApi(gateway, apiEndpoint, method = 'get', body = null, headers, connectionType, retryLocal = 2, retryRemote = 3, killRequestObject = { continue: true }, localResponseType = 'json') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const retryConfig = {
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
            /** @type {?} */
            let username;
            /** @type {?} */
            let password;
            /** @type {?} */
            const useCredentials = connectionType === 'local'
                ? GatewayCredentialsTypes.LOCAL
                : GatewayCredentialsTypes.REMOTE;
            // this.logService.log('cred type: ' + useCredentials);
            for (const creds of gateway.credentials) {
                // this.logService.log('iterate creds' + JSON.stringify(creds));
                if (creds.type === useCredentials) {
                    username = creds.user;
                    password = creds.password;
                }
            }
            if (username === undefined || password === undefined) {
                throw new Error('Username or Password undefined');
            }
            if (connectionType === 'remote') {
                this.logService.log('Connection is remote');
                /** @type {?} */
                const requestBody = {
                    boxId: gateway.boxId,
                    username,
                    password,
                    urlEndpoint: apiEndpoint,
                    method,
                    body: undefined
                };
                if (method.toUpperCase() === 'POST' ||
                    method.toUpperCase() === 'PUT' ||
                    method.toUpperCase() === 'PATCH') {
                    requestBody.body = JSON.stringify(body);
                }
                /** @type {?} */
                const user = yield this.authService.getUser();
                /** @type {?} */
                const requestHeader = {
                    access_token: user.access_token
                };
                try {
                    requestHeader['x-correlation-id'] = yield this.authService.getCorrelationId();
                }
                catch (e) {
                    this.logService.log_e(e);
                }
                /** @type {?} */
                const url = gatewayDeviceControlEndpoint + '/gateways/control';
                /** @type {?} */
                const httpOption = {
                    headers: requestHeader
                };
                try {
                    /** @type {?} */
                    const apiResponse = yield this.webService.postApi(url, requestBody, httpOption, retryConfig).toPromise();
                    this.remoteOnline = true;
                    this.completedFirstRun = true;
                    return apiResponse;
                }
                catch (e) {
                    this.logService.log_e('gatewayservice::callApi: Network error remote request' +
                        JSON.stringify(e));
                    this.remoteOnline = false;
                }
            }
            else if (connectionType === 'local' || connectionType === 'admin') {
                this.logService.log('Connection is local');
                /** @type {?} */
                const basicAuthString = 'Basic ' + btoa(username + ':' + password);
                // const user = await this.userService.getUser();
                try {
                    /** @type {?} */
                    const httpOptions = {
                        headers: { Authorization: basicAuthString }
                    };
                    if (method.toUpperCase() !== 'GET' &&
                        method.toUpperCase() !== 'OPTIONS') {
                        // tslint:disable-next-line:no-string-literal
                        httpOptions['body'] = body;
                    }
                    // tslint:disable-next-line:no-string-literal
                    httpOptions['responseType'] = localResponseType;
                    /** @type {?} */
                    const url = 'http://' + gateway.localIp + ':8083/' + apiEndpoint;
                    // Create separate method for request API
                    /** @type {?} */
                    const apiResponse = yield this.webService.requestApi(method, url, httpOptions, retryConfig).toPromise();
                    this.localOnline = true;
                    this.completedFirstRun = true;
                    return apiResponse;
                }
                catch (e) {
                    this.logService.log_e('gatewayservice::callApi: Network error local request' +
                        JSON.stringify(e));
                    this.localOnline = false;
                    if (!connectionType) {
                        return yield this.callApi(gateway, apiEndpoint, method, body, headers, 'remote');
                    }
                    else {
                        throw e;
                    }
                }
            }
            else if (!connectionType) {
                // Do requests in parallel, if no connectionType is specified
                /** @type {?} */
                const curtime = new Date().getTime();
                /** @type {?} */
                const cancelRequestLocal = { continue: true };
                /** @type {?} */
                const cancelRequestRemote = { continue: true };
                /** @type {?} */
                const remotePromise = this.callApi(gateway, apiEndpoint, method, body, headers, 'remote', undefined, undefined, cancelRequestRemote);
                /** @type {?} */
                const localPromise = this.callApi(gateway, apiEndpoint, method, body, headers, 'local', undefined, undefined, cancelRequestLocal);
                try {
                    // wait for first to finish
                    /** @type {?} */
                    const response = yield Promise.race([remotePromise, localPromise]);
                    cancelRequestLocal.continue = false;
                    cancelRequestRemote.continue = false;
                    return response;
                }
                catch (e) {
                    // jumps in this catch, if one of the request fails
                    this.logService.log_e('gatewayservice::callApi: parallel promise failed ' + e);
                    // wait for both to finish
                    // the promise that failed before will fail again here and throw an exception
                    // the other one is still open and could resolve or reject
                    /** @type {?} */
                    let result;
                    try {
                        result = yield remotePromise;
                        this.remoteOnline = true;
                    }
                    catch (e) {
                        this.remoteOnline = false;
                        this.logService.log_e('gatewayservice::callApi: remote request failed with error ' +
                            JSON.stringify(e));
                    }
                    try {
                        result = yield localPromise;
                        this.localOnline = true;
                    }
                    catch (e) {
                        this.localOnline = false;
                        this.logService.log_e('gatewayservice::callApi: Local request failed with error ' +
                            JSON.stringify(e));
                    }
                    if (result === undefined) {
                        throw new Error('gatewayservice::callApi: Both requests failed');
                    }
                    return result;
                }
            }
        });
    }
    /**
     * \@description Calls the ZWaveAPI and get data for all the conected devices
     * @param {?} gateway gateWay Information
     * @param {?=} getMock bollean type
     * @param {?=} doDefaultRetrys retry parameter type boolean
     * @return {?}
     */
    getLeckageDeviceConnectedToGateway(gateway, getMock = false, doDefaultRetrys = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // if (getMock) {
            //   return [
            //     {
            //       nodeId: 3,
            //       givenName: 'MockDevice'
            //     }
            //   ];
            // }
            /** @type {?} */
            let allDevices;
            if (doDefaultRetrys) {
                allDevices = yield this.callApi(gateway, 'ZWaveAPI/Data', 'get', null, null, null);
            }
            else {
                allDevices = yield this.callApi(gateway, 'ZWaveAPI/Data', 'get', null, null, null, 1, 1);
            }
            /** @type {?} */
            const foundDevices = [];
            this.logService.log('gatewayService::got devices: ' + JSON.stringify(allDevices));
            // tslint:disable-next-line:forin
            for (const nodeId in allDevices.devices) {
                /** @type {?} */
                const device = allDevices.devices[nodeId];
                if (device.data.manufacturerId.value ===
                    CommonConstants.LECKAGE_MANUFACTURER_ID &&
                    device.data.manufacturerProductId.value ===
                        CommonConstants.LECKAGE_MANUFACTURER_PRODUCT_ID &&
                    device.data.manufacturerProductType.value ===
                        CommonConstants.LECKAGE_MANUFACTURER_TYPE) {
                    foundDevices.push({
                        nodeId,
                        givenName: device.data.givenName.value
                    });
                }
            }
            return foundDevices;
        });
    }
    /**
     * \@description not in use
     * @return {?}
     */
    onLogout() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // await this.localStorageService.removePersistentItem(this.storageName);
        });
    }
    /**
     * \@description method to save the gateway object in local storage for persistence use
     * @param {?} accessToken accesstoken
     * @param {?} gateway object to save
     * @return {?}
     */
    saveGateway(accessToken, gateway) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log(accessToken);
            this.cacheService.setLocalData(this.storageName, JSON.stringify(gateway));
        });
    }
    /**
     * \@description method to fetch gateway object from local storage and return parse gateway object
     * @param {?} accessToken access token
     * @return {?}
     */
    getPairedGateway(accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log('in get pair getway service', accessToken);
            /** @type {?} */
            const rawGatewayObject = JSON.stringify(this.cacheService.getLocalData(this.storageName));
            this.logService.log(rawGatewayObject);
            /** @type {?} */
            const gw = JSON.parse(rawGatewayObject);
            return gw;
        });
    }
}
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
GatewayService.ctorParameters = () => [
    { type: HttpClient },
    { type: GatewayAclService },
    { type: AuthService },
    { type: CacheService },
    { type: WebService },
    { type: LogService }
];
/** @nocollapse */ GatewayService.ngInjectableDef = i0.defineInjectable({ factory: function GatewayService_Factory() { return new GatewayService(i0.inject(i1.HttpClient), i0.inject(i2.GatewayAclService), i0.inject(i3.AuthService), i0.inject(i4.CacheService), i0.inject(i5.WebService), i0.inject(i6.LogService)); }, token: GatewayService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2dhdGV3YXktc2VydmljZS9nYXRld2F5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUNMLGVBQWUsRUFDZix1QkFBdUIsRUFHdkIsNEJBQTRCLEVBQzdCLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7O0FBRW5DLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxLQUFLOzs7O0lBQ3RELFlBQVksQ0FBUztRQUNuQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFVCxnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsNkJBQTZCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLDBCQUEyQixTQUFRLEtBQUs7Ozs7SUFDbkQsWUFBWSxDQUFTO1FBQ25CLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNULElBQUksQ0FBQyxJQUFJLEdBQUcsNEJBQTRCLENBQUM7UUFDekMsZ0NBQWdDO1FBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDZCQUE2QixD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QUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUNwRSxJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7a0JBQ2hDLEVBQUUsR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQ2hELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztLQUFBOztBQWxWYyxtQ0FBb0IsR0FBRyxJQUFJLENBQUM7QUFDNUIsa0NBQW1CLEdBQUcsSUFBSSxDQUFDO0FBQzNCLGlDQUFrQixHQUFHLEtBQUssQ0FBQztBQUUzQixrQ0FBbUIsR0FBRyxJQUFJLENBQUM7QUFDM0IsaUNBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGdDQUFpQixHQUFHLElBQUksQ0FBQzs7WUFWekMsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBbENRLFVBQVU7WUFDVixpQkFBaUI7WUFDakIsV0FBVztZQUNYLFlBQVk7WUFDWixVQUFVO1lBQ1YsVUFBVTs7Ozs7Ozs7SUErQmpCLG9DQUEyQzs7Ozs7SUFDM0MsbUNBQTBDOzs7OztJQUMxQyxrQ0FBMEM7Ozs7O0lBRTFDLG1DQUEwQzs7Ozs7SUFDMUMsa0NBQXlDOzs7OztJQUN6QyxpQ0FBd0M7O0lBRXhDLG9DQUE0Qjs7Ozs7SUFFNUIscUNBQW9COzs7OztJQUNwQixzQ0FBcUI7Ozs7O0lBQ3JCLDJDQUFrQzs7Ozs7SUFDbEMscUNBQXVDOzs7OztJQUdyQyw4QkFBd0I7Ozs7O0lBQ3hCLDJDQUE0Qzs7Ozs7SUFDNUMscUNBQWdDOzs7OztJQUNoQyxzQ0FBa0M7Ozs7O0lBQ2xDLG9DQUE4Qjs7Ozs7SUFDOUIsb0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdhdGV3YXlBY2xTZXJ2aWNlIH0gZnJvbSAnLi9nYXRld2F5QWNsLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9hdXRoLXNlcnZpY2UvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJy4uL2NhY2hlLXNlcnZpY2UvY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSAnLi4vd2ViLXNlcnZpY2Uvd2ViLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbW1vbkNvbnN0YW50cyxcbiAgR2F0ZXdheUNyZWRlbnRpYWxzVHlwZXMsXG4gIEdhdGV3YXksXG4gIElMb2dvdXRJbnRlcmZhY2UsXG4gIGdhdGV3YXlEZXZpY2VDb250cm9sRW5kcG9pbnRcbn0gZnJvbSAnLi4vLi4vbW9kZWxzL2dldHdheS5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBHYXRld2F5QWxyZWFkeUNvbmZpZ3VyZWRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobTogc3RyaW5nKSB7XG4gICAgc3VwZXIobSk7XG5cbiAgICAvLyBTZXQgdGhlIHByb3RvdHlwZSBleHBsaWNpdGx5LlxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHYXRld2F5QWxyZWFkeUNvbmZpZ3VyZWRFcnJvci5wcm90b3R5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYXRld2F5U2VyaWFsTm90Rm91bmRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobTogc3RyaW5nKSB7XG4gICAgc3VwZXIobSk7XG4gICAgdGhpcy5uYW1lID0gJ0dhdGV3YXlTZXJpYWxOb3RGb3VuZEVycm9yJztcbiAgICAvLyBTZXQgdGhlIHByb3RvdHlwZSBleHBsaWNpdGx5LlxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHYXRld2F5QWxyZWFkeUNvbmZpZ3VyZWRFcnJvci5wcm90b3R5cGUpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdhdGV3YXlTZXJ2aWNlIGltcGxlbWVudHMgSUxvZ291dEludGVyZmFjZSB7XG4gIHByaXZhdGUgc3RhdGljIElOSVRfSU5URVJWQUxfUkVNT1RFID0gMjAwMDtcbiAgcHJpdmF0ZSBzdGF0aWMgTUFYX0lOVEVSVkFMX1JFTU9URSA9IDYwMDA7XG4gIHByaXZhdGUgc3RhdGljIFJFUV9USU1FT1VUX1JFTU9URSA9IDIwMDAwO1xuXG4gIHByaXZhdGUgc3RhdGljIElOSVRfSU5URVJWQUxfTE9DQUwgPSAyMDAwO1xuICBwcml2YXRlIHN0YXRpYyBNQVhfSU5URVJWQUxfTE9DQUwgPSA2MDAwO1xuICBwcml2YXRlIHN0YXRpYyBSRVFfVElNRU9VVF9MT0NBTCA9IDYwMDA7XG5cbiAgb2JzZXJ2ZXJJZCA9IDQ4OTc2NDQ2MTMyMTExO1xuXG4gIHByaXZhdGUgbG9jYWxPbmxpbmU7XG4gIHByaXZhdGUgcmVtb3RlT25saW5lO1xuICBwcml2YXRlIGNvbXBsZXRlZEZpcnN0UnVuID0gZmFsc2U7XG4gIHByaXZhdGUgc3RvcmFnZU5hbWUgPSAnZ2F0ZXdheV9kZXZpY2UnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGdhdGV3YXlBY2xTZXJ2aWNlOiBHYXRld2F5QWNsU2VydmljZSxcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2ViU2VydmljZTogV2ViU2VydmljZSxcbiAgICBwcml2YXRlIGxvZ1NlcnZpY2U6IExvZ1NlcnZpY2UsXG4gICkge1xuICB9XG5cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIENhbGxzIHRoZSBHYXRld2F5IEFQSVxuICAgKiBAcGFyYW0gZ2F0ZXdheSBnYXRlV2F5IEluZm9ybWF0aW9uXG4gICAqIEBwYXJhbSBhcGlFbmRwb2ludCBUaGlzIGlzIEFwaSBFbmQgUHtvaW50c31cbiAgICogQHBhcmFtIG1ldGhvZCBTcGVjaWZpYyBNZXRob2QgVG8gRm9sbG93XG4gICAqIEBwYXJhbSBib2R5IEJvZHkgSWYgSXQgaXMgYSBQT1NUIEFwaSBDYWxsXG4gICAqIEBwYXJhbSBoZWFkZXJzIG5vdCB1c2VkIHJpZ2h0IG5vd1xuICAgKiBAcGFyYW0gY29ubmVjdGlvblR5cGUgZXhwbGljaXRseSBkZWNpZGUsIGlmIGl0IHNob3VsZCBiZSBjYWxsZWQgbG9jYWxseSwgb3IgcmVtb3RlbHkuIERlZmF1bHQ6IHJlbW90ZVxuICAgKi9cbiAgYXN5bmMgY2FsbEFwaShcbiAgICBnYXRld2F5OiBHYXRld2F5LFxuICAgIGFwaUVuZHBvaW50OiBzdHJpbmcsXG4gICAgbWV0aG9kOiBzdHJpbmcgPSAnZ2V0JyxcbiAgICBib2R5OiBhbnkgfCBudWxsID0gbnVsbCxcbiAgICBoZWFkZXJzPzoge30sXG4gICAgY29ubmVjdGlvblR5cGU/OiAncmVtb3RlJyB8ICdsb2NhbCcgfCAnYWRtaW4nLFxuICAgIHJldHJ5TG9jYWw6IG51bWJlciA9IDIsXG4gICAgcmV0cnlSZW1vdGU6IG51bWJlciA9IDMsXG4gICAga2lsbFJlcXVlc3RPYmplY3Q6IHsgY29udGludWU6IGJvb2xlYW4gfSA9IHsgY29udGludWU6IHRydWUgfSxcbiAgICBsb2NhbFJlc3BvbnNlVHlwZTogc3RyaW5nID0gJ2pzb24nXG4gICkge1xuICAgIGNvbnN0IHJldHJ5Q29uZmlnID0ge1xuICAgICAgUkVRX1RJTUVPVVQ6IEdhdGV3YXlTZXJ2aWNlLlJFUV9USU1FT1VUX0xPQ0FMLFxuICAgICAgSU5JVF9JTlRFUlZBTDogR2F0ZXdheVNlcnZpY2UuSU5JVF9JTlRFUlZBTF9MT0NBTCxcbiAgICAgIE1BWF9JTlRFUlZBTDogR2F0ZXdheVNlcnZpY2UuTUFYX0lOVEVSVkFMX0xPQ0FMLFxuICAgICAgTUFYX1JFVFJJRVM6IHJldHJ5TG9jYWwsXG4gICAgfTtcblxuICAgIC8vIElmIG5vIGNvbm5lY3Rpb24gVHlwZSBpcyBnaXZlbiBhbmQgdGhlIE1ldGhvZCBpcyBydW4gZm9yIHRoZSBmaXJzdCBUaW1lXG4gICAgaWYgKCFjb25uZWN0aW9uVHlwZSAmJiB0aGlzLmNvbXBsZXRlZEZpcnN0UnVuKSB7XG4gICAgICBpZiAodGhpcy5sb2NhbE9ubGluZSkge1xuICAgICAgICBjb25uZWN0aW9uVHlwZSA9ICdsb2NhbCc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmVtb3RlT25saW5lKSB7XG4gICAgICAgIGNvbm5lY3Rpb25UeXBlID0gJ3JlbW90ZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBnbyB0byByYWNlIGJldHdlZW4gcmVtb3RlIGFuZCBsb2NhbFxuICAgICAgICBjb25uZWN0aW9uVHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cnkgcmVtb3RlIGNhbGwgZmlyc3QsIGVsc2UgdHJ5IGxvY2FsXG4gICAgbGV0IHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgbGV0IHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgY29uc3QgdXNlQ3JlZGVudGlhbHMgPVxuICAgICAgY29ubmVjdGlvblR5cGUgPT09ICdsb2NhbCdcbiAgICAgICAgPyBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcy5MT0NBTFxuICAgICAgICA6IEdhdGV3YXlDcmVkZW50aWFsc1R5cGVzLlJFTU9URTtcblxuICAgIC8vIHRoaXMubG9nU2VydmljZS5sb2coJ2NyZWQgdHlwZTogJyArIHVzZUNyZWRlbnRpYWxzKTtcbiAgICBmb3IgKGNvbnN0IGNyZWRzIG9mIGdhdGV3YXkuY3JlZGVudGlhbHMpIHtcbiAgICAgIC8vIHRoaXMubG9nU2VydmljZS5sb2coJ2l0ZXJhdGUgY3JlZHMnICsgSlNPTi5zdHJpbmdpZnkoY3JlZHMpKTtcbiAgICAgIGlmIChjcmVkcy50eXBlID09PSB1c2VDcmVkZW50aWFscykge1xuICAgICAgICB1c2VybmFtZSA9IGNyZWRzLnVzZXI7XG4gICAgICAgIHBhc3N3b3JkID0gY3JlZHMucGFzc3dvcmQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHVzZXJuYW1lID09PSB1bmRlZmluZWQgfHwgcGFzc3dvcmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVc2VybmFtZSBvciBQYXNzd29yZCB1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoY29ubmVjdGlvblR5cGUgPT09ICdyZW1vdGUnKSB7XG4gICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdDb25uZWN0aW9uIGlzIHJlbW90ZScpO1xuICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIGJveElkOiBnYXRld2F5LmJveElkLFxuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIHVybEVuZHBvaW50OiBhcGlFbmRwb2ludCxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBib2R5OiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUE9TVCcgfHxcbiAgICAgICAgbWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQVVQnIHx8XG4gICAgICAgIG1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUEFUQ0gnXG4gICAgICApIHtcbiAgICAgICAgcmVxdWVzdEJvZHkuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgfVxuICAgICAgY29uc3QgdXNlcjogYW55ID0gYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyKCk7XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RIZWFkZXIgPSB7XG4gICAgICAgIGFjY2Vzc190b2tlbjogdXNlci5hY2Nlc3NfdG9rZW5cbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJbXG4gICAgICAgICAgJ3gtY29ycmVsYXRpb24taWQnXG4gICAgICAgIF0gPSBhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldENvcnJlbGF0aW9uSWQoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ19lKGUpO1xuICAgICAgfVxuICAgICAgY29uc3QgdXJsID0gZ2F0ZXdheURldmljZUNvbnRyb2xFbmRwb2ludCArICcvZ2F0ZXdheXMvY29udHJvbCc7XG4gICAgICBjb25zdCBodHRwT3B0aW9uID0ge1xuICAgICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVyXG4gICAgICB9O1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYXBpUmVzcG9uc2UgPSBhd2FpdCB0aGlzLndlYlNlcnZpY2UucG9zdEFwaSh1cmwsIHJlcXVlc3RCb2R5LCBodHRwT3B0aW9uLCByZXRyeUNvbmZpZykudG9Qcm9taXNlKCk7XG4gICAgICAgIHRoaXMucmVtb3RlT25saW5lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWRGaXJzdFJ1biA9IHRydWU7XG4gICAgICAgIHJldHVybiBhcGlSZXNwb25zZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ19lKFxuICAgICAgICAgICdnYXRld2F5c2VydmljZTo6Y2FsbEFwaTogTmV0d29yayBlcnJvciByZW1vdGUgcmVxdWVzdCcgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVtb3RlT25saW5lID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb25uZWN0aW9uVHlwZSA9PT0gJ2xvY2FsJyB8fCBjb25uZWN0aW9uVHlwZSA9PT0gJ2FkbWluJykge1xuICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnQ29ubmVjdGlvbiBpcyBsb2NhbCcpO1xuICAgICAgY29uc3QgYmFzaWNBdXRoU3RyaW5nID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgICAgLy8gY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICAgICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBiYXNpY0F1dGhTdHJpbmcgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbWV0aG9kLnRvVXBwZXJDYXNlKCkgIT09ICdHRVQnICYmXG4gICAgICAgICAgbWV0aG9kLnRvVXBwZXJDYXNlKCkgIT09ICdPUFRJT05TJ1xuICAgICAgICApIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgICAgICBodHRwT3B0aW9uc1snYm9keSddID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgICAgaHR0cE9wdGlvbnNbJ3Jlc3BvbnNlVHlwZSddID0gbG9jYWxSZXNwb25zZVR5cGU7XG4gICAgICAgIGNvbnN0IHVybCA9ICdodHRwOi8vJyArIGdhdGV3YXkubG9jYWxJcCArICc6ODA4My8nICsgYXBpRW5kcG9pbnQ7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHNlcGFyYXRlIG1ldGhvZCBmb3IgcmVxdWVzdCBBUElcbiAgICAgICAgY29uc3QgYXBpUmVzcG9uc2UgPSBhd2FpdCB0aGlzLndlYlNlcnZpY2UucmVxdWVzdEFwaShtZXRob2QsIHVybCwgaHR0cE9wdGlvbnMsIHJldHJ5Q29uZmlnKS50b1Byb21pc2UoKTtcbiAgICAgICAgdGhpcy5sb2NhbE9ubGluZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcGxldGVkRmlyc3RSdW4gPSB0cnVlO1xuICAgICAgICByZXR1cm4gYXBpUmVzcG9uc2U7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfZShcbiAgICAgICAgICAnZ2F0ZXdheXNlcnZpY2U6OmNhbGxBcGk6IE5ldHdvcmsgZXJyb3IgbG9jYWwgcmVxdWVzdCcgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubG9jYWxPbmxpbmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFjb25uZWN0aW9uVHlwZSkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxBcGkoXG4gICAgICAgICAgICBnYXRld2F5LFxuICAgICAgICAgICAgYXBpRW5kcG9pbnQsXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICdyZW1vdGUnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghY29ubmVjdGlvblR5cGUpIHtcbiAgICAgIC8vIERvIHJlcXVlc3RzIGluIHBhcmFsbGVsLCBpZiBubyBjb25uZWN0aW9uVHlwZSBpcyBzcGVjaWZpZWRcbiAgICAgIGNvbnN0IGN1cnRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGNvbnN0IGNhbmNlbFJlcXVlc3RMb2NhbCA9IHsgY29udGludWU6IHRydWUgfTtcbiAgICAgIGNvbnN0IGNhbmNlbFJlcXVlc3RSZW1vdGUgPSB7IGNvbnRpbnVlOiB0cnVlIH07XG4gICAgICBjb25zdCByZW1vdGVQcm9taXNlID0gdGhpcy5jYWxsQXBpKFxuICAgICAgICBnYXRld2F5LFxuICAgICAgICBhcGlFbmRwb2ludCxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBib2R5LFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICAncmVtb3RlJyxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIGNhbmNlbFJlcXVlc3RSZW1vdGVcbiAgICAgICk7XG4gICAgICBjb25zdCBsb2NhbFByb21pc2UgPSB0aGlzLmNhbGxBcGkoXG4gICAgICAgIGdhdGV3YXksXG4gICAgICAgIGFwaUVuZHBvaW50LFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGJvZHksXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgICdsb2NhbCcsXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBjYW5jZWxSZXF1ZXN0TG9jYWxcbiAgICAgICk7XG4gICAgICB0cnkge1xuICAgICAgICAvLyB3YWl0IGZvciBmaXJzdCB0byBmaW5pc2hcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBQcm9taXNlLnJhY2UoW3JlbW90ZVByb21pc2UsIGxvY2FsUHJvbWlzZV0pO1xuICAgICAgICBjYW5jZWxSZXF1ZXN0TG9jYWwuY29udGludWUgPSBmYWxzZTtcbiAgICAgICAgY2FuY2VsUmVxdWVzdFJlbW90ZS5jb250aW51ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGp1bXBzIGluIHRoaXMgY2F0Y2gsIGlmIG9uZSBvZiB0aGUgcmVxdWVzdCBmYWlsc1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nX2UoJ2dhdGV3YXlzZXJ2aWNlOjpjYWxsQXBpOiBwYXJhbGxlbCBwcm9taXNlIGZhaWxlZCAnICsgZSk7XG4gICAgICAgIC8vIHdhaXQgZm9yIGJvdGggdG8gZmluaXNoXG4gICAgICAgIC8vIHRoZSBwcm9taXNlIHRoYXQgZmFpbGVkIGJlZm9yZSB3aWxsIGZhaWwgYWdhaW4gaGVyZSBhbmQgdGhyb3cgYW4gZXhjZXB0aW9uXG4gICAgICAgIC8vIHRoZSBvdGhlciBvbmUgaXMgc3RpbGwgb3BlbiBhbmQgY291bGQgcmVzb2x2ZSBvciByZWplY3RcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXN1bHQgPSBhd2FpdCByZW1vdGVQcm9taXNlO1xuICAgICAgICAgIHRoaXMucmVtb3RlT25saW5lID0gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMucmVtb3RlT25saW5lID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ19lKFxuICAgICAgICAgICAgJ2dhdGV3YXlzZXJ2aWNlOjpjYWxsQXBpOiByZW1vdGUgcmVxdWVzdCBmYWlsZWQgd2l0aCBlcnJvciAnICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IGxvY2FsUHJvbWlzZTtcbiAgICAgICAgICB0aGlzLmxvY2FsT25saW5lID0gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMubG9jYWxPbmxpbmUgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nX2UoXG4gICAgICAgICAgICAnZ2F0ZXdheXNlcnZpY2U6OmNhbGxBcGk6IExvY2FsIHJlcXVlc3QgZmFpbGVkIHdpdGggZXJyb3IgJyArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShlKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnYXRld2F5c2VydmljZTo6Y2FsbEFwaTogQm90aCByZXF1ZXN0cyBmYWlsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQ2FsbHMgdGhlIFpXYXZlQVBJIGFuZCBnZXQgZGF0YSBmb3IgYWxsIHRoZSBjb25lY3RlZCBkZXZpY2VzXG4gICAqIEBwYXJhbSBnYXRld2F5IGdhdGVXYXkgSW5mb3JtYXRpb25cbiAgICogQHBhcmFtIGdldE1vY2sgYm9sbGVhbiB0eXBlXG4gICAqIEBwYXJhbSBkb0RlZmF1bHRSZXRyeXMgcmV0cnkgcGFyYW1ldGVyIHR5cGUgYm9vbGVhblxuICAgKi9cbiAgYXN5bmMgZ2V0TGVja2FnZURldmljZUNvbm5lY3RlZFRvR2F0ZXdheShcbiAgICBnYXRld2F5OiBHYXRld2F5LFxuICAgIGdldE1vY2s6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBkb0RlZmF1bHRSZXRyeXMgPSBmYWxzZVxuICApIHtcbiAgICAvLyBpZiAoZ2V0TW9jaykge1xuICAgIC8vICAgcmV0dXJuIFtcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIG5vZGVJZDogMyxcbiAgICAvLyAgICAgICBnaXZlbk5hbWU6ICdNb2NrRGV2aWNlJ1xuICAgIC8vICAgICB9XG4gICAgLy8gICBdO1xuICAgIC8vIH1cbiAgICBsZXQgYWxsRGV2aWNlcztcbiAgICBpZiAoZG9EZWZhdWx0UmV0cnlzKSB7XG4gICAgICBhbGxEZXZpY2VzID0gYXdhaXQgdGhpcy5jYWxsQXBpKFxuICAgICAgICBnYXRld2F5LFxuICAgICAgICAnWldhdmVBUEkvRGF0YScsXG4gICAgICAgICdnZXQnLFxuICAgICAgICBudWxsLFxuICAgICAgICBudWxsLFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGxEZXZpY2VzID0gYXdhaXQgdGhpcy5jYWxsQXBpKFxuICAgICAgICBnYXRld2F5LFxuICAgICAgICAnWldhdmVBUEkvRGF0YScsXG4gICAgICAgICdnZXQnLFxuICAgICAgICBudWxsLFxuICAgICAgICBudWxsLFxuICAgICAgICBudWxsLFxuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGZvdW5kRGV2aWNlcyA9IFtdO1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2dhdGV3YXlTZXJ2aWNlOjpnb3QgZGV2aWNlczogJyArIEpTT04uc3RyaW5naWZ5KGFsbERldmljZXMpKTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICBmb3IgKGNvbnN0IG5vZGVJZCBpbiBhbGxEZXZpY2VzLmRldmljZXMpIHtcbiAgICAgIGNvbnN0IGRldmljZSA9IGFsbERldmljZXMuZGV2aWNlc1tub2RlSWRdO1xuICAgICAgaWYgKFxuICAgICAgICBkZXZpY2UuZGF0YS5tYW51ZmFjdHVyZXJJZC52YWx1ZSA9PT1cbiAgICAgICAgQ29tbW9uQ29uc3RhbnRzLkxFQ0tBR0VfTUFOVUZBQ1RVUkVSX0lEICYmXG4gICAgICAgIGRldmljZS5kYXRhLm1hbnVmYWN0dXJlclByb2R1Y3RJZC52YWx1ZSA9PT1cbiAgICAgICAgQ29tbW9uQ29uc3RhbnRzLkxFQ0tBR0VfTUFOVUZBQ1RVUkVSX1BST0RVQ1RfSUQgJiZcbiAgICAgICAgZGV2aWNlLmRhdGEubWFudWZhY3R1cmVyUHJvZHVjdFR5cGUudmFsdWUgPT09XG4gICAgICAgIENvbW1vbkNvbnN0YW50cy5MRUNLQUdFX01BTlVGQUNUVVJFUl9UWVBFXG4gICAgICApIHtcbiAgICAgICAgZm91bmREZXZpY2VzLnB1c2goe1xuICAgICAgICAgIG5vZGVJZCxcbiAgICAgICAgICBnaXZlbk5hbWU6IGRldmljZS5kYXRhLmdpdmVuTmFtZS52YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gZm91bmREZXZpY2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBub3QgaW4gdXNlXG4gICAqL1xuICBhc3luYyBvbkxvZ291dCgpIHtcbiAgICAvLyBhd2FpdCB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UucmVtb3ZlUGVyc2lzdGVudEl0ZW0odGhpcy5zdG9yYWdlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIG1ldGhvZCB0byBzYXZlIHRoZSBnYXRld2F5IG9iamVjdCBpbiBsb2NhbCBzdG9yYWdlIGZvciBwZXJzaXN0ZW5jZSB1c2VcbiAgICogQHBhcmFtIGFjY2Vzc1Rva2VuIGFjY2Vzc3Rva2VuXG4gICAqIEBwYXJhbSBnYXRld2F5IG9iamVjdCB0byBzYXZlXG4gICAqL1xuICBhc3luYyBzYXZlR2F0ZXdheShhY2Nlc3NUb2tlbjogc3RyaW5nLCBnYXRld2F5OiBHYXRld2F5KSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZyhhY2Nlc3NUb2tlbik7XG4gICAgdGhpcy5jYWNoZVNlcnZpY2Uuc2V0TG9jYWxEYXRhKHRoaXMuc3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGdhdGV3YXkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gbWV0aG9kIHRvIGZldGNoIGdhdGV3YXkgb2JqZWN0IGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgcmV0dXJuIHBhcnNlIGdhdGV3YXkgb2JqZWN0XG4gICAqIEBwYXJhbSBhY2Nlc3NUb2tlbiBhY2Nlc3MgdG9rZW5cbiAgICovXG4gIGFzeW5jIGdldFBhaXJlZEdhdGV3YXkoYWNjZXNzVG9rZW46IHN0cmluZyk6IFByb21pc2U8R2F0ZXdheT4ge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2luIGdldCBwYWlyIGdldHdheSBzZXJ2aWNlJywgYWNjZXNzVG9rZW4pO1xuICAgIGNvbnN0IHJhd0dhdGV3YXlPYmplY3QgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmNhY2hlU2VydmljZS5nZXRMb2NhbERhdGEoXG4gICAgICB0aGlzLnN0b3JhZ2VOYW1lXG4gICAgKSk7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZyhyYXdHYXRld2F5T2JqZWN0KTtcbiAgICBjb25zdCBndzogR2F0ZXdheSA9IEpTT04ucGFyc2UocmF3R2F0ZXdheU9iamVjdCk7XG4gICAgcmV0dXJuIGd3O1xuICB9XG5cbn1cbiJdfQ==