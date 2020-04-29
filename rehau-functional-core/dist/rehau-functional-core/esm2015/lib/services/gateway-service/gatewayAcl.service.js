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
export class GatewayAclService {
    /**
     * @param {?} httpClient
     * @param {?} authService
     * @param {?} webService
     * @param {?} logService
     */
    constructor(httpClient, authService, webService, logService) {
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
    cloudGetHomes(accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                /** @type {?} */
                const gatewayAclUser = yield this.userControllerGET(accessToken);
                /** @type {?} */
                const result = [];
                for (const homeId of Object.keys(gatewayAclUser.homes)) {
                    result.push(gatewayAclUser.homes[homeId]);
                }
                return { homes: result, response: gatewayAclUser };
            }
            catch (e) {
                console.error('gatewayAclServer::cloudGetHomes: Could not fetch Homes ' + JSON.stringify(e));
                return { homes: [], response: null };
            }
        });
    }
    /**
     * @param {?} accessToken
     * @return {?}
     */
    userControllerGET(accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    // tslint:disable-next-line:object-literal-key-quotes
                    'access_token': accessToken,
                    'x-correlation-id': yield this.authService.getCorrelationId()
                })
            };
            /** @type {?} */
            const url = gatewayAclEndpoint + '/users/';
            /** @type {?} */
            const retryConfig = {
                REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
                INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
                MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
                MAX_RETRIES: GatewayAclService.MAX_RETRIES,
            };
            /** @type {?} */
            const gwUser = yield this.webService.getApi(url, httpOptions, retryConfig).toPromise();
            this.logService.log(gwUser);
            return gwUser;
        });
    }
    /**
     * @param {?} accessToken
     * @param {?} homeId
     * @param {?} aclUser
     * @return {?}
     */
    getGatewaysToHome(accessToken, homeId, aclUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const result = [];
            for (const gatewayId of Object.keys(aclUser.homes[homeId].gateways)) {
                /** @type {?} */
                const gwResult = {
                    credentials: []
                };
                for (const credId of Object.keys(aclUser.homes[homeId].gateways[gatewayId].userCredentials)) {
                    gwResult.homeGwId = gatewayId;
                    console.log('Getting credId: ' + credId);
                    /** @type {?} */
                    const credentials = aclUser.homes[homeId].gateways[gatewayId].userCredentials[credId];
                    console.log('Getting homeId: ' + homeId);
                    console.log(credentials);
                    if (credentials.type === GatewayAclServiceUserGatewayCredsType.ADMIN ||
                        credentials.type === GatewayAclServiceUserGatewayCredsType.LOCAL ||
                        credentials.type === GatewayAclServiceUserGatewayCredsType.REMOTE) {
                        /** @type {?} */
                        const newCreds = {
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
                result.push(gwResult);
            }
            return result;
        });
    }
    /**
     * @param {?} accessToken
     * @param {?} homeID
     * @return {?}
     */
    getHomeOfUser(accessToken, homeID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('GatewayACLService::getHomeOfUser: ' + accessToken + ' for HomeID ' + homeID);
            /** @type {?} */
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    access_token: accessToken,
                    'x-correlation-id': yield this.authService.getCorrelationId()
                })
            };
            /** @type {?} */
            const url = gatewayAclEndpoint + '/users/homes/' + homeID;
            /** @type {?} */
            const retryConfig = {
                REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
                INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
                MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
                MAX_RETRIES: GatewayAclService.MAX_RETRIES,
            };
            /** @type {?} */
            const home = yield this.webService.getApi(url, httpOptions, retryConfig).toPromise();
            this.logService.log(home);
            return home;
        });
    }
}
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
GatewayAclService.ctorParameters = () => [
    { type: HttpClient },
    { type: AuthService },
    { type: WebService },
    { type: LogService }
];
/** @nocollapse */ GatewayAclService.ngInjectableDef = i0.defineInjectable({ factory: function GatewayAclService_Factory() { return new GatewayAclService(i0.inject(i1.HttpClient), i0.inject(i2.AuthService), i0.inject(i3.WebService), i0.inject(i4.LogService)); }, token: GatewayAclService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheUFjbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2dhdGV3YXktc2VydmljZS9nYXRld2F5QWNsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHL0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixxQ0FBcUMsRUFDckMsdUJBQXVCLEVBS3hCLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU1uQyxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7O0lBVTVCLFlBQ1UsVUFBc0IsRUFDdEIsV0FBd0IsRUFDeEIsVUFBc0IsRUFDdEIsVUFBc0I7UUFIdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFOeEIsZ0JBQVcsR0FBRyxnQkFBZ0IsQ0FBQztJQVF2QyxDQUFDOzs7OztJQUVLLGFBQWEsQ0FBQyxXQUFtQjs7WUFDckMsSUFBSTs7c0JBQ0ksY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQzs7c0JBQzFELE1BQU0sR0FBZ0MsRUFBRTtnQkFDOUMsS0FBSyxNQUFNLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQzNDO2dCQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsQ0FBQzthQUNwRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMseURBQXlELEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDdEM7UUFDSCxDQUFDO0tBQUE7Ozs7O0lBRUssaUJBQWlCLENBQUMsV0FBbUI7OztrQkFDbkMsV0FBVyxHQUFHO2dCQUNsQixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUM7b0JBQ3ZCLGNBQWMsRUFBRSxrQkFBa0I7O29CQUVsQyxjQUFjLEVBQUUsV0FBVztvQkFDM0Isa0JBQWtCLEVBQUUsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFO2lCQUM5RCxDQUFDO2FBQ0g7O2tCQUVLLEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxTQUFTOztrQkFDcEMsV0FBVyxHQUFHO2dCQUNsQixXQUFXLEVBQUUsaUJBQWlCLENBQUMsV0FBVztnQkFDMUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLGFBQWE7Z0JBQzlDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO2dCQUM1QyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsV0FBVzthQUMzQzs7a0JBQ0ssTUFBTSxHQUEwQixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFO1lBRTdHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FBQTs7Ozs7OztJQUVLLGlCQUFpQixDQUFDLFdBQW1CLEVBQUUsTUFBYyxFQUFFLE9BQThCOzs7a0JBQ25GLE1BQU0sR0FBYyxFQUFFO1lBQzVCLEtBQUssTUFBTSxTQUFTLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFOztzQkFDN0QsUUFBUSxHQUFZO29CQUN4QixXQUFXLEVBQUUsRUFBRTtpQkFDaEI7Z0JBQ0QsS0FBSyxNQUFNLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUMzRixRQUFRLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztvQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsQ0FBQzs7MEJBQ25DLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO29CQUNyRixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN6QixJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUsscUNBQXFDLENBQUMsS0FBSzt3QkFDbEUsV0FBVyxDQUFDLElBQUksS0FBSyxxQ0FBcUMsQ0FBQyxLQUFLO3dCQUNoRSxXQUFXLENBQUMsSUFBSSxLQUFLLHFDQUFxQyxDQUFDLE1BQU0sRUFBRTs7OEJBQzdELFFBQVEsR0FBdUI7NEJBQ25DLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTs0QkFDdEIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFROzRCQUM5QixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNsRSxXQUFXLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQzVELFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3Q0FDOUQsSUFBSTt5QkFDWDt3QkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3JDO2lCQUNGO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkI7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO0tBQUE7Ozs7OztJQUVLLGFBQWEsQ0FBQyxXQUFtQixFQUFFLE1BQWM7O1lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEdBQUcsV0FBVyxHQUFHLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQzs7a0JBQ3BGLFdBQVcsR0FBRztnQkFDbEIsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDO29CQUN2QixjQUFjLEVBQUUsa0JBQWtCO29CQUNsQyxZQUFZLEVBQUUsV0FBVztvQkFDekIsa0JBQWtCLEVBQUUsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFO2lCQUM5RCxDQUFDO2FBQ0g7O2tCQUVLLEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxlQUFlLEdBQUcsTUFBTTs7a0JBQ25ELFdBQVcsR0FBRztnQkFDbEIsV0FBVyxFQUFFLGlCQUFpQixDQUFDLFdBQVc7Z0JBQzFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxhQUFhO2dCQUM5QyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsWUFBWTtnQkFDNUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLFdBQVc7YUFDM0M7O2tCQUNLLElBQUksR0FBOEIsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRTtZQUUvRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTs7QUEzR2MsK0JBQWEsR0FBRyxJQUFJLENBQUM7QUFDckIsOEJBQVksR0FBRyxJQUFJLENBQUM7QUFDcEIsNkJBQVcsR0FBRyxDQUFDLENBQUM7QUFDaEIsNkJBQVcsR0FBRyxJQUFJLENBQUM7O1lBUG5DLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQW5CUSxVQUFVO1lBR1YsV0FBVztZQUNYLFVBQVU7WUFDVixVQUFVOzs7Ozs7OztJQWdCakIsZ0NBQW9DOzs7OztJQUNwQywrQkFBbUM7Ozs7O0lBQ25DLDhCQUErQjs7Ozs7SUFDL0IsOEJBQWtDOzs7OztJQUlsQyx3Q0FBdUM7Ozs7O0lBR3JDLHVDQUE4Qjs7Ozs7SUFDOUIsd0NBQWdDOzs7OztJQUNoQyx1Q0FBOEI7Ozs7O0lBQzlCLHVDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmxhdE1hcCwgcmV0cnlXaGVuLCB0aW1lb3V0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcmV0cnlCYWNrb2ZmIH0gZnJvbSAnYmFja29mZi1yeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSAnLi4vd2ViLXNlcnZpY2Uvd2ViLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIGdhdGV3YXlBY2xFbmRwb2ludCxcbiAgR2F0ZXdheUFjbFNlcnZpY2VVc2VyR2F0ZXdheUNyZWRzVHlwZSxcbiAgR2F0ZXdheUNyZWRlbnRpYWxzVHlwZXMsXG4gIEdhdGV3YXlDcmVkZW50aWFscyxcbiAgR2F0ZXdheSxcbiAgR2F0ZXdheUFjbFNlcnZpY2VVc2VySG9tZSxcbiAgR2F0ZXdheUFjbFNlcnZpY2VVc2VyXG59IGZyb20gJy4uLy4uL21vZGVscy9nZXR3YXkubW9kZWwnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHYXRld2F5QWNsU2VydmljZSB7XG4gIHByaXZhdGUgc3RhdGljIElOSVRfSU5URVJWQUwgPSAyMDAwO1xuICBwcml2YXRlIHN0YXRpYyBNQVhfSU5URVJWQUwgPSA2MDAwO1xuICBwcml2YXRlIHN0YXRpYyBNQVhfUkVUUklFUyA9IDM7XG4gIHByaXZhdGUgc3RhdGljIFJFUV9USU1FT1VUID0gODAwMDtcblxuXG5cbiAgcHJpdmF0ZSBzdG9yYWdlTmFtZSA9ICdnYXRld2F5X2RldmljZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2ViU2VydmljZTogV2ViU2VydmljZSxcbiAgICBwcml2YXRlIGxvZ1NlcnZpY2U6IExvZ1NlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBhc3luYyBjbG91ZEdldEhvbWVzKGFjY2Vzc1Rva2VuOiBzdHJpbmcpOiBQcm9taXNlPHsgaG9tZXM6IEdhdGV3YXlBY2xTZXJ2aWNlVXNlckhvbWVbXSwgcmVzcG9uc2U6IEdhdGV3YXlBY2xTZXJ2aWNlVXNlciB9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGdhdGV3YXlBY2xVc2VyID0gYXdhaXQgdGhpcy51c2VyQ29udHJvbGxlckdFVChhY2Nlc3NUb2tlbik7XG4gICAgICBjb25zdCByZXN1bHQ6IEdhdGV3YXlBY2xTZXJ2aWNlVXNlckhvbWVbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBob21lSWQgb2YgT2JqZWN0LmtleXMoZ2F0ZXdheUFjbFVzZXIuaG9tZXMpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGdhdGV3YXlBY2xVc2VyLmhvbWVzW2hvbWVJZF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgaG9tZXM6IHJlc3VsdCwgcmVzcG9uc2U6IGdhdGV3YXlBY2xVc2VyIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignZ2F0ZXdheUFjbFNlcnZlcjo6Y2xvdWRHZXRIb21lczogQ291bGQgbm90IGZldGNoIEhvbWVzICcgKyBKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICByZXR1cm4geyBob21lczogW10sIHJlc3BvbnNlOiBudWxsIH07XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdXNlckNvbnRyb2xsZXJHRVQoYWNjZXNzVG9rZW46IHN0cmluZyk6IFByb21pc2U8R2F0ZXdheUFjbFNlcnZpY2VVc2VyPiB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b2JqZWN0LWxpdGVyYWwta2V5LXF1b3Rlc1xuICAgICAgICAnYWNjZXNzX3Rva2VuJzogYWNjZXNzVG9rZW4sXG4gICAgICAgICd4LWNvcnJlbGF0aW9uLWlkJzogYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRDb3JyZWxhdGlvbklkKClcbiAgICAgIH0pXG4gICAgfTtcblxuICAgIGNvbnN0IHVybCA9IGdhdGV3YXlBY2xFbmRwb2ludCArICcvdXNlcnMvJztcbiAgICBjb25zdCByZXRyeUNvbmZpZyA9IHtcbiAgICAgIFJFUV9USU1FT1VUOiBHYXRld2F5QWNsU2VydmljZS5SRVFfVElNRU9VVCxcbiAgICAgIElOSVRfSU5URVJWQUw6IEdhdGV3YXlBY2xTZXJ2aWNlLklOSVRfSU5URVJWQUwsXG4gICAgICBNQVhfSU5URVJWQUw6IEdhdGV3YXlBY2xTZXJ2aWNlLk1BWF9JTlRFUlZBTCxcbiAgICAgIE1BWF9SRVRSSUVTOiBHYXRld2F5QWNsU2VydmljZS5NQVhfUkVUUklFUyxcbiAgICB9O1xuICAgIGNvbnN0IGd3VXNlcjogR2F0ZXdheUFjbFNlcnZpY2VVc2VyID0gYXdhaXQgdGhpcy53ZWJTZXJ2aWNlLmdldEFwaSh1cmwsIGh0dHBPcHRpb25zLCByZXRyeUNvbmZpZykudG9Qcm9taXNlKCk7XG5cbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKGd3VXNlcik7XG4gICAgcmV0dXJuIGd3VXNlcjtcbiAgfVxuXG4gIGFzeW5jIGdldEdhdGV3YXlzVG9Ib21lKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGhvbWVJZDogc3RyaW5nLCBhY2xVc2VyOiBHYXRld2F5QWNsU2VydmljZVVzZXIpOiBQcm9taXNlPEdhdGV3YXlbXT4ge1xuICAgIGNvbnN0IHJlc3VsdDogR2F0ZXdheVtdID0gW107XG4gICAgZm9yIChjb25zdCBnYXRld2F5SWQgb2YgT2JqZWN0LmtleXMoYWNsVXNlci5ob21lc1tob21lSWRdLmdhdGV3YXlzKSkge1xuICAgICAgY29uc3QgZ3dSZXN1bHQ6IEdhdGV3YXkgPSB7XG4gICAgICAgIGNyZWRlbnRpYWxzOiBbXVxuICAgICAgfTtcbiAgICAgIGZvciAoY29uc3QgY3JlZElkIG9mIE9iamVjdC5rZXlzKGFjbFVzZXIuaG9tZXNbaG9tZUlkXS5nYXRld2F5c1tnYXRld2F5SWRdLnVzZXJDcmVkZW50aWFscykpIHtcbiAgICAgICAgZ3dSZXN1bHQuaG9tZUd3SWQgPSBnYXRld2F5SWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIGNyZWRJZDogJyArIGNyZWRJZCk7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYWNsVXNlci5ob21lc1tob21lSWRdLmdhdGV3YXlzW2dhdGV3YXlJZF0udXNlckNyZWRlbnRpYWxzW2NyZWRJZF07XG4gICAgICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIGhvbWVJZDogJyArIGhvbWVJZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNyZWRlbnRpYWxzKTtcbiAgICAgICAgaWYgKGNyZWRlbnRpYWxzLnR5cGUgPT09IEdhdGV3YXlBY2xTZXJ2aWNlVXNlckdhdGV3YXlDcmVkc1R5cGUuQURNSU4gfHxcbiAgICAgICAgICBjcmVkZW50aWFscy50eXBlID09PSBHYXRld2F5QWNsU2VydmljZVVzZXJHYXRld2F5Q3JlZHNUeXBlLkxPQ0FMIHx8XG4gICAgICAgICAgY3JlZGVudGlhbHMudHlwZSA9PT0gR2F0ZXdheUFjbFNlcnZpY2VVc2VyR2F0ZXdheUNyZWRzVHlwZS5SRU1PVEUpIHtcbiAgICAgICAgICBjb25zdCBuZXdDcmVkczogR2F0ZXdheUNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgdXNlcjogY3JlZGVudGlhbHMudXNlcixcbiAgICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICAgIHR5cGU6IGNyZWRlbnRpYWxzLnR5cGUgPT09ICdhZG1pbicgPyBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcy5BRE1JTiA6XG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzLnR5cGUgPT09ICdsb2NhbCcgPyBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcy5MT0NBTCA6XG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHMudHlwZSA9PT0gJ3JlbW90ZScgPyBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcy5SRU1PVEUgOlxuICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc29sZS5sb2coJ0dvdCBjb3JyZWN0IHR5cGUhICcgKyBKU09OLnN0cmluZ2lmeShuZXdDcmVkcykpO1xuICAgICAgICAgIGd3UmVzdWx0LmNyZWRlbnRpYWxzLnB1c2gobmV3Q3JlZHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChnd1Jlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3luYyBnZXRIb21lT2ZVc2VyKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGhvbWVJRDogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coJ0dhdGV3YXlBQ0xTZXJ2aWNlOjpnZXRIb21lT2ZVc2VyOiAnICsgYWNjZXNzVG9rZW4gKyAnIGZvciBIb21lSUQgJyArIGhvbWVJRCk7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAneC1jb3JyZWxhdGlvbi1pZCc6IGF3YWl0IHRoaXMuYXV0aFNlcnZpY2UuZ2V0Q29ycmVsYXRpb25JZCgpXG4gICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCB1cmwgPSBnYXRld2F5QWNsRW5kcG9pbnQgKyAnL3VzZXJzL2hvbWVzLycgKyBob21lSUQ7XG4gICAgY29uc3QgcmV0cnlDb25maWcgPSB7XG4gICAgICBSRVFfVElNRU9VVDogR2F0ZXdheUFjbFNlcnZpY2UuUkVRX1RJTUVPVVQsXG4gICAgICBJTklUX0lOVEVSVkFMOiBHYXRld2F5QWNsU2VydmljZS5JTklUX0lOVEVSVkFMLFxuICAgICAgTUFYX0lOVEVSVkFMOiBHYXRld2F5QWNsU2VydmljZS5NQVhfSU5URVJWQUwsXG4gICAgICBNQVhfUkVUUklFUzogR2F0ZXdheUFjbFNlcnZpY2UuTUFYX1JFVFJJRVMsXG4gICAgfTtcbiAgICBjb25zdCBob21lOiBHYXRld2F5QWNsU2VydmljZVVzZXJIb21lID0gYXdhaXQgdGhpcy53ZWJTZXJ2aWNlLmdldEFwaSh1cmwsIGh0dHBPcHRpb25zLCByZXRyeUNvbmZpZykudG9Qcm9taXNlKCk7XG5cbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKGhvbWUpO1xuICAgIHJldHVybiBob21lO1xuICB9XG59XG4iXX0=