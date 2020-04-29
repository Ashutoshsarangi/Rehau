/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { WebService } from '../web-service/web.service';
import { LogService } from '../logger-service/logger.service';
import { gatewayAclEndpoint, GatewayAclServiceUserGatewayCredsType, GatewayCredentialsTypes } from '../../models/getway.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../auth-service/auth.service";
import * as i3 from "../web-service/web.service";
import * as i4 from "../logger-service/logger.service";
var GatewayAclService = /** @class */ (function () {
    function GatewayAclService(httpClient, authService, webService, logService) {
        this.httpClient = httpClient;
        this.authService = authService;
        this.webService = webService;
        this.logService = logService;
        this.storageName = 'gateway_device';
    }
    /**
     * @param {?} accessToken
     * @return {?}
     */
    GatewayAclService.prototype.cloudGetHomes = /**
     * @param {?} accessToken
     * @return {?}
     */
    function (accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1, _a, gatewayAclUser, result, _b, _c, homeId, e_2;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userControllerGET(accessToken)];
                    case 1:
                        gatewayAclUser = _d.sent();
                        result = [];
                        try {
                            for (_b = tslib_1.__values(Object.keys(gatewayAclUser.homes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                homeId = _c.value;
                                result.push(gatewayAclUser.homes[homeId]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, { homes: result, response: gatewayAclUser }];
                    case 2:
                        e_2 = _d.sent();
                        console.error('gatewayAclServer::cloudGetHomes: Could not fetch Homes ' + JSON.stringify(e_2));
                        return [2 /*return*/, { homes: [], response: null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} accessToken
     * @return {?}
     */
    GatewayAclService.prototype.userControllerGET = /**
     * @param {?} accessToken
     * @return {?}
     */
    function (accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var httpOptions, _a, _b, _c, _d, url, retryConfig, gwUser;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = {};
                        _b = HttpHeaders.bind;
                        _c = {
                            'Content-Type': 'application/json',
                            // tslint:disable-next-line:object-literal-key-quotes
                            'access_token': accessToken
                        };
                        _d = 'x-correlation-id';
                        return [4 /*yield*/, this.authService.getCorrelationId()];
                    case 1:
                        httpOptions = (_a.headers = new (_b.apply(HttpHeaders, [void 0, (_c[_d] = _e.sent(),
                                _c)]))(),
                            _a);
                        url = gatewayAclEndpoint + '/users/';
                        retryConfig = {
                            REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
                            INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
                            MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
                            MAX_RETRIES: GatewayAclService.MAX_RETRIES,
                        };
                        return [4 /*yield*/, this.webService.getApi(url, httpOptions, retryConfig).toPromise()];
                    case 2:
                        gwUser = _e.sent();
                        this.logService.log(gwUser);
                        return [2 /*return*/, gwUser];
                }
            });
        });
    };
    /**
     * @param {?} accessToken
     * @param {?} homeId
     * @param {?} aclUser
     * @return {?}
     */
    GatewayAclService.prototype.getGatewaysToHome = /**
     * @param {?} accessToken
     * @param {?} homeId
     * @param {?} aclUser
     * @return {?}
     */
    function (accessToken, homeId, aclUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_3, _a, e_4, _b, result, _c, _d, gatewayId, gwResult, _e, _f, credId, credentials, newCreds;
            return tslib_1.__generator(this, function (_g) {
                result = [];
                try {
                    for (_c = tslib_1.__values(Object.keys(aclUser.homes[homeId].gateways)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        gatewayId = _d.value;
                        gwResult = {
                            credentials: []
                        };
                        try {
                            for (_e = tslib_1.__values(Object.keys(aclUser.homes[homeId].gateways[gatewayId].userCredentials)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                credId = _f.value;
                                gwResult.homeGwId = gatewayId;
                                console.log('Getting credId: ' + credId);
                                credentials = aclUser.homes[homeId].gateways[gatewayId].userCredentials[credId];
                                console.log('Getting homeId: ' + homeId);
                                console.log(credentials);
                                if (credentials.type === GatewayAclServiceUserGatewayCredsType.ADMIN ||
                                    credentials.type === GatewayAclServiceUserGatewayCredsType.LOCAL ||
                                    credentials.type === GatewayAclServiceUserGatewayCredsType.REMOTE) {
                                    newCreds = {
                                        user: credentials.user,
                                        password: credentials.password,
                                        type: credentials.type === 'admin' ? GatewayCredentialsTypes.ADMIN :
                                            credentials.type === 'local' ? GatewayCredentialsTypes.LOCAL :
                                                credentials.type === 'remote' ? GatewayCredentialsTypes.REMOTE :
                                                    null
                                    };
                                    console.log('Got correct type! ' + JSON.stringify(newCreds));
                                    gwResult.credentials.push(newCreds);
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        result.push(gwResult);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return [2 /*return*/, result];
            });
        });
    };
    /**
     * @param {?} accessToken
     * @param {?} homeID
     * @return {?}
     */
    GatewayAclService.prototype.getHomeOfUser = /**
     * @param {?} accessToken
     * @param {?} homeID
     * @return {?}
     */
    function (accessToken, homeID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var httpOptions, _a, _b, _c, _d, url, retryConfig, home;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log('GatewayACLService::getHomeOfUser: ' + accessToken + ' for HomeID ' + homeID);
                        _a = {};
                        _b = HttpHeaders.bind;
                        _c = {
                            'Content-Type': 'application/json',
                            access_token: accessToken
                        };
                        _d = 'x-correlation-id';
                        return [4 /*yield*/, this.authService.getCorrelationId()];
                    case 1:
                        httpOptions = (_a.headers = new (_b.apply(HttpHeaders, [void 0, (_c[_d] = _e.sent(),
                                _c)]))(),
                            _a);
                        url = gatewayAclEndpoint + '/users/homes/' + homeID;
                        retryConfig = {
                            REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
                            INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
                            MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
                            MAX_RETRIES: GatewayAclService.MAX_RETRIES,
                        };
                        return [4 /*yield*/, this.webService.getApi(url, httpOptions, retryConfig).toPromise()];
                    case 2:
                        home = _e.sent();
                        this.logService.log(home);
                        return [2 /*return*/, home];
                }
            });
        });
    };
    GatewayAclService.INIT_INTERVAL = 2000;
    GatewayAclService.MAX_INTERVAL = 6000;
    GatewayAclService.MAX_RETRIES = 3;
    GatewayAclService.REQ_TIMEOUT = 8000;
    GatewayAclService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    GatewayAclService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: AuthService },
        { type: WebService },
        { type: LogService }
    ]; };
    /** @nocollapse */ GatewayAclService.ngInjectableDef = i0.defineInjectable({ factory: function GatewayAclService_Factory() { return new GatewayAclService(i0.inject(i1.HttpClient), i0.inject(i2.AuthService), i0.inject(i3.WebService), i0.inject(i4.LogService)); }, token: GatewayAclService, providedIn: "root" });
    return GatewayAclService;
}());
export { GatewayAclService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.INIT_INTERVAL;
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.MAX_INTERVAL;
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.MAX_RETRIES;
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.REQ_TIMEOUT;
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.prototype.storageName;
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.prototype.httpClient;
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.prototype.webService;
    /**
     * @type {?}
     * @private
     */
    GatewayAclService.prototype.logService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheUFjbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2dhdGV3YXktc2VydmljZS9nYXRld2F5QWNsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHL0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixxQ0FBcUMsRUFDckMsdUJBQXVCLEVBS3hCLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQUduQztJQWFFLDJCQUNVLFVBQXNCLEVBQ3RCLFdBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLFVBQXNCO1FBSHRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTnhCLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7SUFRdkMsQ0FBQzs7Ozs7SUFFSyx5Q0FBYTs7OztJQUFuQixVQUFvQixXQUFtQjs7Ozs7Ozt3QkFFWixxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUE7O3dCQUExRCxjQUFjLEdBQUcsU0FBeUM7d0JBQzFELE1BQU0sR0FBZ0MsRUFBRTs7NEJBQzlDLEtBQXFCLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUEsNENBQUU7Z0NB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QUFNO3dCQUNuRCxXQUFXLEdBQUc7NEJBQ2xCLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXOzRCQUMxQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsYUFBYTs0QkFDOUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLFlBQVk7NEJBQzVDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXO3lCQUMzQzt3QkFDdUMscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXpHLElBQUksR0FBOEIsU0FBdUU7d0JBRS9HLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMxQixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQTNHYywrQkFBYSxHQUFHLElBQUksQ0FBQztJQUNyQiw4QkFBWSxHQUFHLElBQUksQ0FBQztJQUNwQiw2QkFBVyxHQUFHLENBQUMsQ0FBQztJQUNoQiw2QkFBVyxHQUFHLElBQUksQ0FBQzs7Z0JBUG5DLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBbkJRLFVBQVU7Z0JBR1YsV0FBVztnQkFDWCxVQUFVO2dCQUNWLFVBQVU7Ozs0QkFObkI7Q0FrSUMsQUFoSEQsSUFnSEM7U0E3R1ksaUJBQWlCOzs7Ozs7SUFDNUIsZ0NBQW9DOzs7OztJQUNwQywrQkFBbUM7Ozs7O0lBQ25DLDhCQUErQjs7Ozs7SUFDL0IsOEJBQWtDOzs7OztJQUlsQyx3Q0FBdUM7Ozs7O0lBR3JDLHVDQUE4Qjs7Ozs7SUFDOUIsd0NBQWdDOzs7OztJQUNoQyx1Q0FBOEI7Ozs7O0lBQzlCLHVDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmxhdE1hcCwgcmV0cnlXaGVuLCB0aW1lb3V0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcmV0cnlCYWNrb2ZmIH0gZnJvbSAnYmFja29mZi1yeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSAnLi4vd2ViLXNlcnZpY2Uvd2ViLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIGdhdGV3YXlBY2xFbmRwb2ludCxcbiAgR2F0ZXdheUFjbFNlcnZpY2VVc2VyR2F0ZXdheUNyZWRzVHlwZSxcbiAgR2F0ZXdheUNyZWRlbnRpYWxzVHlwZXMsXG4gIEdhdGV3YXlDcmVkZW50aWFscyxcbiAgR2F0ZXdheSxcbiAgR2F0ZXdheUFjbFNlcnZpY2VVc2VySG9tZSxcbiAgR2F0ZXdheUFjbFNlcnZpY2VVc2VyXG59IGZyb20gJy4uLy4uL21vZGVscy9nZXR3YXkubW9kZWwnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHYXRld2F5QWNsU2VydmljZSB7XG4gIHByaXZhdGUgc3RhdGljIElOSVRfSU5URVJWQUwgPSAyMDAwO1xuICBwcml2YXRlIHN0YXRpYyBNQVhfSU5URVJWQUwgPSA2MDAwO1xuICBwcml2YXRlIHN0YXRpYyBNQVhfUkVUUklFUyA9IDM7XG4gIHByaXZhdGUgc3RhdGljIFJFUV9USU1FT1VUID0gODAwMDtcblxuXG5cbiAgcHJpdmF0ZSBzdG9yYWdlTmFtZSA9ICdnYXRld2F5X2RldmljZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2ViU2VydmljZTogV2ViU2VydmljZSxcbiAgICBwcml2YXRlIGxvZ1NlcnZpY2U6IExvZ1NlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBhc3luYyBjbG91ZEdldEhvbWVzKGFjY2Vzc1Rva2VuOiBzdHJpbmcpOiBQcm9taXNlPHsgaG9tZXM6IEdhdGV3YXlBY2xTZXJ2aWNlVXNlckhvbWVbXSwgcmVzcG9uc2U6IEdhdGV3YXlBY2xTZXJ2aWNlVXNlciB9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGdhdGV3YXlBY2xVc2VyID0gYXdhaXQgdGhpcy51c2VyQ29udHJvbGxlckdFVChhY2Nlc3NUb2tlbik7XG4gICAgICBjb25zdCByZXN1bHQ6IEdhdGV3YXlBY2xTZXJ2aWNlVXNlckhvbWVbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBob21lSWQgb2YgT2JqZWN0LmtleXMoZ2F0ZXdheUFjbFVzZXIuaG9tZXMpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGdhdGV3YXlBY2xVc2VyLmhvbWVzW2hvbWVJZF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgaG9tZXM6IHJlc3VsdCwgcmVzcG9uc2U6IGdhdGV3YXlBY2xVc2VyIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignZ2F0ZXdheUFjbFNlcnZlcjo6Y2xvdWRHZXRIb21lczogQ291bGQgbm90IGZldGNoIEhvbWVzICcgKyBKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICByZXR1cm4geyBob21lczogW10sIHJlc3BvbnNlOiBudWxsIH07XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdXNlckNvbnRyb2xsZXJHRVQoYWNjZXNzVG9rZW46IHN0cmluZyk6IFByb21pc2U8R2F0ZXdheUFjbFNlcnZpY2VVc2VyPiB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b2JqZWN0LWxpdGVyYWwta2V5LXF1b3Rlc1xuICAgICAgICAnYWNjZXNzX3Rva2VuJzogYWNjZXNzVG9rZW4sXG4gICAgICAgICd4LWNvcnJlbGF0aW9uLWlkJzogYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRDb3JyZWxhdGlvbklkKClcbiAgICAgIH0pXG4gICAgfTtcblxuICAgIGNvbnN0IHVybCA9IGdhdGV3YXlBY2xFbmRwb2ludCArICcvdXNlcnMvJztcbiAgICBjb25zdCByZXRyeUNvbmZpZyA9IHtcbiAgICAgIFJFUV9USU1FT1VUOiBHYXRld2F5QWNsU2VydmljZS5SRVFfVElNRU9VVCxcbiAgICAgIElOSVRfSU5URVJWQUw6IEdhdGV3YXlBY2xTZXJ2aWNlLklOSVRfSU5URVJWQUwsXG4gICAgICBNQVhfSU5URVJWQUw6IEdhdGV3YXlBY2xTZXJ2aWNlLk1BWF9JTlRFUlZBTCxcbiAgICAgIE1BWF9SRVRSSUVTOiBHYXRld2F5QWNsU2VydmljZS5NQVhfUkVUUklFUyxcbiAgICB9O1xuICAgIGNvbnN0IGd3VXNlcjogR2F0ZXdheUFjbFNlcnZpY2VVc2VyID0gYXdhaXQgdGhpcy53ZWJTZXJ2aWNlLmdldEFwaSh1cmwsIGh0dHBPcHRpb25zLCByZXRyeUNvbmZpZykudG9Qcm9taXNlKCk7XG5cbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKGd3VXNlcik7XG4gICAgcmV0dXJuIGd3VXNlcjtcbiAgfVxuXG4gIGFzeW5jIGdldEdhdGV3YXlzVG9Ib21lKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGhvbWVJZDogc3RyaW5nLCBhY2xVc2VyOiBHYXRld2F5QWNsU2VydmljZVVzZXIpOiBQcm9taXNlPEdhdGV3YXlbXT4ge1xuICAgIGNvbnN0IHJlc3VsdDogR2F0ZXdheVtdID0gW107XG4gICAgZm9yIChjb25zdCBnYXRld2F5SWQgb2YgT2JqZWN0LmtleXMoYWNsVXNlci5ob21lc1tob21lSWRdLmdhdGV3YXlzKSkge1xuICAgICAgY29uc3QgZ3dSZXN1bHQ6IEdhdGV3YXkgPSB7XG4gICAgICAgIGNyZWRlbnRpYWxzOiBbXVxuICAgICAgfTtcbiAgICAgIGZvciAoY29uc3QgY3JlZElkIG9mIE9iamVjdC5rZXlzKGFjbFVzZXIuaG9tZXNbaG9tZUlkXS5nYXRld2F5c1tnYXRld2F5SWRdLnVzZXJDcmVkZW50aWFscykpIHtcbiAgICAgICAgZ3dSZXN1bHQuaG9tZUd3SWQgPSBnYXRld2F5SWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIGNyZWRJZDogJyArIGNyZWRJZCk7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYWNsVXNlci5ob21lc1tob21lSWRdLmdhdGV3YXlzW2dhdGV3YXlJZF0udXNlckNyZWRlbnRpYWxzW2NyZWRJZF07XG4gICAgICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIGhvbWVJZDogJyArIGhvbWVJZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNyZWRlbnRpYWxzKTtcbiAgICAgICAgaWYgKGNyZWRlbnRpYWxzLnR5cGUgPT09IEdhdGV3YXlBY2xTZXJ2aWNlVXNlckdhdGV3YXlDcmVkc1R5cGUuQURNSU4gfHxcbiAgICAgICAgICBjcmVkZW50aWFscy50eXBlID09PSBHYXRld2F5QWNsU2VydmljZVVzZXJHYXRld2F5Q3JlZHNUeXBlLkxPQ0FMIHx8XG4gICAgICAgICAgY3JlZGVudGlhbHMudHlwZSA9PT0gR2F0ZXdheUFjbFNlcnZpY2VVc2VyR2F0ZXdheUNyZWRzVHlwZS5SRU1PVEUpIHtcbiAgICAgICAgICBjb25zdCBuZXdDcmVkczogR2F0ZXdheUNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgdXNlcjogY3JlZGVudGlhbHMudXNlcixcbiAgICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICAgIHR5cGU6IGNyZWRlbnRpYWxzLnR5cGUgPT09ICdhZG1pbicgPyBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcy5BRE1JTiA6XG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzLnR5cGUgPT09ICdsb2NhbCcgPyBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcy5MT0NBTCA6XG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHMudHlwZSA9PT0gJ3JlbW90ZScgPyBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcy5SRU1PVEUgOlxuICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc29sZS5sb2coJ0dvdCBjb3JyZWN0IHR5cGUhICcgKyBKU09OLnN0cmluZ2lmeShuZXdDcmVkcykpO1xuICAgICAgICAgIGd3UmVzdWx0LmNyZWRlbnRpYWxzLnB1c2gobmV3Q3JlZHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChnd1Jlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3luYyBnZXRIb21lT2ZVc2VyKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGhvbWVJRDogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coJ0dhdGV3YXlBQ0xTZXJ2aWNlOjpnZXRIb21lT2ZVc2VyOiAnICsgYWNjZXNzVG9rZW4gKyAnIGZvciBIb21lSUQgJyArIGhvbWVJRCk7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAneC1jb3JyZWxhdGlvbi1pZCc6IGF3YWl0IHRoaXMuYXV0aFNlcnZpY2UuZ2V0Q29ycmVsYXRpb25JZCgpXG4gICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCB1cmwgPSBnYXRld2F5QWNsRW5kcG9pbnQgKyAnL3VzZXJzL2hvbWVzLycgKyBob21lSUQ7XG4gICAgY29uc3QgcmV0cnlDb25maWcgPSB7XG4gICAgICBSRVFfVElNRU9VVDogR2F0ZXdheUFjbFNlcnZpY2UuUkVRX1RJTUVPVVQsXG4gICAgICBJTklUX0lOVEVSVkFMOiBHYXRld2F5QWNsU2VydmljZS5JTklUX0lOVEVSVkFMLFxuICAgICAgTUFYX0lOVEVSVkFMOiBHYXRld2F5QWNsU2VydmljZS5NQVhfSU5URVJWQUwsXG4gICAgICBNQVhfUkVUUklFUzogR2F0ZXdheUFjbFNlcnZpY2UuTUFYX1JFVFJJRVMsXG4gICAgfTtcbiAgICBjb25zdCBob21lOiBHYXRld2F5QWNsU2VydmljZVVzZXJIb21lID0gYXdhaXQgdGhpcy53ZWJTZXJ2aWNlLmdldEFwaSh1cmwsIGh0dHBPcHRpb25zLCByZXRyeUNvbmZpZykudG9Qcm9taXNlKCk7XG5cbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKGhvbWUpO1xuICAgIHJldHVybiBob21lO1xuICB9XG59XG4iXX0=