/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { WebService } from '../web-service/web.service';
import { CacheService } from '../cache-service/cache.service';
import { userData } from '../../config/local-storage.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LogService } from '../logger-service/logger.service';
import { StoreService } from '../store-service/store.service';
import * as i0 from "@angular/core";
import * as i1 from "../web-service/web.service";
import * as i2 from "../cache-service/cache.service";
import * as i3 from "../logger-service/logger.service";
import * as i4 from "../store-service/store.service";
export class AuthService {
    /**
     * @param {?} webService
     * @param {?} cacheService
     * @param {?} logservice
     * @param {?} storeService
     * @param {?} configuration
     */
    constructor(webService, cacheService, logservice, storeService, configuration) {
        this.webService = webService;
        this.cacheService = cacheService;
        this.logservice = logservice;
        this.storeService = storeService;
        this.configuration = configuration;
    }
    /**
     * @param {?} body
     * @param {?} message
     * @return {?}
     */
    oAuthCallback(body, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const response = yield this.getToken(body, message);
            return response;
        });
    }
    /**
     * \@description This function is responsible to call postAPI method to get the new token
     * @param {?} body
     * @return {?} object of ITokenEndpointResponse
     */
    tokenRequest(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.webService.postApi(this.configuration.cidaasConfig.ciddasTokenEndpoint, body).toPromise();
        });
    }
    /**
     * \@description This function will call the token request method to get new token / And will store the user data in store and local storage
     * @private
     * @param {?} body
     * @param {?} message
     * @return {?} object of user data
     */
    getToken(body, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                /** @type {?} */
                const response = yield this.tokenRequest(body);
                if (!response.access_token || !response.refresh_token) {
                    // Here We clean the User Object from Local Storage and Store.
                    this.storeService.dispatchUserData({});
                    this.cacheService.removeLocalData(userData);
                    return response;
                }
                else {
                    body.access_token = response.access_token;
                    body.refresh_token = response.refresh_token;
                    // Here We Set the User Object in Local Storage and Store.
                    this.storeService.dispatchUserData(body);
                    this.cacheService.setLocalData(userData, body);
                    return body;
                }
            }
            catch (e) {
                if (e.error instanceof ErrorEvent) {
                    this.logservice.log_e('An error occurred for getting ' + message + ':', e.error.message);
                    this.logservice.log('Never the less leave the use do its thing without tokens');
                    body.status = e.status;
                    body.message = e.error.message;
                    return body;
                }
                else if (e.status === 0) {
                    this.logservice.log_e('An error occurred for getting ' + message + ':', e.error.message);
                    this.logservice.log('Never the less leave the use do its thing without tokens');
                    body.status = e.status;
                    body.message = e.error.message;
                    return body;
                }
                else if (e.status === 408) {
                    this.logservice.log_e('An error occurred for getting ' + message + ':', e.error.message);
                    this.logservice.log('Never the less leave the use do its thing without tokens');
                    body.status = e.status;
                    body.message = e.error.message;
                    return body;
                }
                else {
                    this.logservice.log_e(`Backend returned code for getting ${message} ${e.status}, ` +
                        `body was for getting ${message} : ${e.error}`);
                    this.storeService.dispatchUserData({});
                    this.cacheService.removeLocalData(userData);
                    // await this.logoutService.doLogout();
                    return body;
                }
            }
        });
    }
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check whether user is new or existing. / If user is existing then this function will get the current or refreshed token
     * @return {?} boolean value based on expired
     */
    isLoggedIn() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const currentUserFromStore = yield this.storeService.getUserData();
            /** @type {?} */
            const currentUser = this.cacheService.getLocalData(userData);
            this.logservice.log('User data from local storage = ', currentUser);
            this.logservice.log('User data from store = ', currentUserFromStore);
            if (currentUserFromStore && currentUser) {
                /** @type {?} */
                const res = yield this.checkTokenStatus(currentUser);
                return res;
            }
            else if (currentUserFromStore && !currentUser) { // if data is present in store but not in local stoarge
                this.cacheService.setLocalData(userData, currentUserFromStore); // update locsal storage
                // update locsal storage
                /** @type {?} */
                const res = yield this.checkTokenStatus(currentUserFromStore);
                return res;
            }
            else if (!currentUserFromStore && currentUser) { // if data is present in local storage but not in Store
                this.storeService.dispatchUserData(currentUser); // update store
                // update store
                /** @type {?} */
                const res = yield this.checkTokenStatus(currentUser);
                return res;
            }
            else {
                return false;
            }
        });
    }
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check the status of token whether it is expired or not / If token is expired then it will call refresh token method
     * @param {?} currentUser is the currentuser object either from store or local storage
     * @return {?} boolean value or refresh token object based on condition
     */
    checkTokenStatus(currentUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const isExpired = this.isTokenExpire(currentUser.access_token);
            if (isExpired) {
                this.logservice.log_w('THIS ACCESS_TOKEN IS EXPIRED in Login, try getting new one.');
                /** @type {?} */
                const res = yield this.refreshTokenWrapper(currentUser);
                return res;
            }
            else {
                return true;
            }
        });
    }
    /**
     * \@description This function is required for checking the access_token is expired or not.
     * @param {?} access_token Need Access_token for checking is it expired
     * @return {?} boolean value based on expied
     */
    // tslint:disable-next-line:variable-name
    isTokenExpire(access_token) {
        /** @type {?} */
        const helper = new JwtHelperService();
        return helper.isTokenExpired(access_token);
    }
    /**
     * \@description This method will get call whenevr we need to refresh the expise token
     * @private
     * @param {?} user is the object conatining all CIDAAS login data
     * @return {?} object of CIDAAS login data including regresh token
     */
    refreshTokenWrapper(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const body = {
                client_id: this.configuration.cidaasConfig.cidaasClientId,
                grant_type: 'refresh_token',
                refresh_token: user.refresh_token
            };
            /** @type {?} */
            const result = yield this.getToken(body, 'refresh token');
            return result;
        });
    }
    /**
     * \@description This method will decide the access token
     * @return {?} decoded access token
     */
    getCorrelationId() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const user = yield this.getUser();
            /** @type {?} */
            const helper = new JwtHelperService();
            /** @type {?} */
            const decodedToken = helper.decodeToken(user.access_token);
            return decodedToken.sub;
        });
    }
    /**
     * \@description This method is to get the userData related to CIDAAS login
     * @return {?} object of CIDAAS login data
     */
    getUser() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let user = this.cacheService.getLocalData(userData);
            /** @type {?} */
            const helper = new JwtHelperService();
            if (user) {
                /** @type {?} */
                const isExpired = this.isTokenExpire(user.access_token);
                if (isExpired) {
                    this.logservice.log('THIS ACCESS_TOKEN IS EXPIRED in getUser, try getting new one.');
                    user = yield this.refreshTokenWrapper(user);
                    this.logservice.log('refreshTest::got result in getUser ' + user);
                }
            }
            return user;
        });
    }
}
AuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: WebService },
    { type: CacheService },
    { type: LogService },
    { type: StoreService },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];
/** @nocollapse */ AuthService.ngInjectableDef = i0.defineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.inject(i1.WebService), i0.inject(i2.CacheService), i0.inject(i3.LogService), i0.inject(i4.StoreService), i0.inject("SERVICE_CONFIG")); }, token: AuthService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.tokenPromise;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.webService;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.cacheService;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.logservice;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.storeService;
    /** @type {?} */
    AuthService.prototype.configuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2F1dGgtc2VydmljZS9hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7QUFLOUQsTUFBTSxPQUFPLFdBQVc7Ozs7Ozs7O0lBSXRCLFlBQ1UsVUFBc0IsRUFDdEIsWUFBMEIsRUFDMUIsVUFBc0IsRUFDdEIsWUFBMEIsRUFDRCxhQUFrQjtRQUozQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDRCxrQkFBYSxHQUFiLGFBQWEsQ0FBSztJQUNqRCxDQUFDOzs7Ozs7SUFFQyxhQUFhLENBQUMsSUFBd0IsRUFBRSxPQUFlOzs7a0JBQ3JELFFBQVEsR0FBUSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztZQUN4RCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO0tBQUE7Ozs7OztJQU1LLFlBQVksQ0FBQyxJQUF3Qjs7WUFDekMsT0FBTyxJQUFJLENBQUMs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R0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDMUQsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQzFCLENBQUM7S0FBQTs7Ozs7SUFNSyxPQUFPOzs7Z0JBQ1AsSUFBSSxHQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQzs7a0JBQ2xELE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFO1lBQ3JDLElBQUksSUFBSSxFQUFFOztzQkFDRixTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN2RCxJQUFJLFNBQVMsRUFBRTtvQkFDYixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FDakIsK0RBQStELENBQ2hFLENBQUM7b0JBQ0YsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDbkU7YUFDRjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBOzs7WUE1TEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBVFEsVUFBVTtZQUNWLFlBQVk7WUFHWixVQUFVO1lBQ1YsWUFBWTs0Q0FjaEIsTUFBTSxTQUFDLGdCQUFnQjs7Ozs7Ozs7SUFQMUIsbUNBQXVDOzs7OztJQUdyQyxpQ0FBOEI7Ozs7O0lBQzlCLG1DQUFrQzs7Ozs7SUFDbEMsaUNBQThCOzs7OztJQUM5QixtQ0FBa0M7O0lBQ2xDLG9DQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVRva2VuRW5kcG9pbnRCb2R5LCBJVG9rZW5FbmRwb2ludFJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NpZGFhcy5tb2RlbCc7XG5pbXBvcnQgeyBDaWRhYXNQcm92aWRlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jaWRhYXMucHJvdmlkZXInO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gJy4uL3dlYi1zZXJ2aWNlL3dlYi5zZXJ2aWNlJztcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJy4uL2NhY2hlLXNlcnZpY2UvY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJy4uLy4uL2NvbmZpZy9sb2NhbC1zdG9yYWdlLmNvbmZpZyc7XG5pbXBvcnQgeyBKd3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnQGF1dGgwL2FuZ3VsYXItand0JztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXItc2VydmljZS9sb2dnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9yZVNlcnZpY2UgfSBmcm9tICcuLi9zdG9yZS1zZXJ2aWNlL3N0b3JlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB0b2tlblByb21pc2U6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3ZWJTZXJ2aWNlOiBXZWJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2dzZXJ2aWNlOiBMb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RvcmVTZXJ2aWNlOiBTdG9yZVNlcnZpY2UsXG4gICAgQEluamVjdCgnU0VSVklDRV9DT05GSUcnKSBwdWJsaWMgY29uZmlndXJhdGlvbjogYW55XG4gICkgeyB9XG5cbiAgYXN5bmMgb0F1dGhDYWxsYmFjayhib2R5OiBJVG9rZW5FbmRwb2ludEJvZHksIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBhbnkgPSBhd2FpdCB0aGlzLmdldFRva2VuKGJvZHksIG1lc3NhZ2UpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBjYWxsIHBvc3RBUEkgbWV0aG9kIHRvIGdldCB0aGUgbmV3IHRva2VuXG4gICAqIEByZXR1cm5zIG9iamVjdCBvZiBJVG9rZW5FbmRwb2ludFJlc3BvbnNlXG4gICAqL1xuICBhc3luYyB0b2tlblJlcXVlc3QoYm9keTogSVRva2VuRW5kcG9pbnRCb2R5KTogUHJvbWlzZTxJVG9rZW5FbmRwb2ludFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMud2ViU2VydmljZS5wb3N0QXBpKHRoaXMuY29uZmlndXJhdGlvbi5jaWRhYXNDb25maWcuY2lkZGFzVG9rZW5FbmRwb2ludCwgYm9keSkudG9Qcm9taXNlKCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGNhbGwgdGhlIHRva2VuIHJlcXVlc3QgbWV0aG9kIHRvIGdldCBuZXcgdG9rZW5cbiAgICogQGRlc2NyaXB0aW9uIEFuZCB3aWxsIHN0b3JlIHRoZSB1c2VyIGRhdGEgaW4gc3RvcmUgYW5kIGxvY2FsIHN0b3JhZ2VcbiAgICogQHJldHVybnMgb2JqZWN0IG9mIHVzZXIgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBnZXRUb2tlbihib2R5LCBtZXNzYWdlKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2U6IElUb2tlbkVuZHBvaW50UmVzcG9uc2UgPSBhd2FpdCB0aGlzLnRva2VuUmVxdWVzdChib2R5KTtcbiAgICAgIGlmICghcmVzcG9uc2UuYWNjZXNzX3Rva2VuIHx8ICFyZXNwb25zZS5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgIC8vIEhlcmUgV2UgY2xlYW4gdGhlIFVzZXIgT2JqZWN0IGZyb20gTG9jYWwgU3RvcmFnZSBhbmQgU3RvcmUuXG4gICAgICAgIHRoaXMuc3RvcmVTZXJ2aWNlLmRpc3BhdGNoVXNlckRhdGEoe30pO1xuICAgICAgICB0aGlzLmNhY2hlU2VydmljZS5yZW1vdmVMb2NhbERhdGEodXNlckRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2R5LmFjY2Vzc190b2tlbiA9IHJlc3BvbnNlLmFjY2Vzc190b2tlbjtcbiAgICAgICAgYm9keS5yZWZyZXNoX3Rva2VuID0gcmVzcG9uc2UucmVmcmVzaF90b2tlbjtcbiAgICAgICAgLy8gSGVyZSBXZSBTZXQgdGhlIFVzZXIgT2JqZWN0IGluIExvY2FsIFN0b3JhZ2UgYW5kIFN0b3JlLlxuICAgICAgICB0aGlzLnN0b3JlU2VydmljZS5kaXNwYXRjaFVzZXJEYXRhKGJvZHkpO1xuICAgICAgICB0aGlzLmNhY2hlU2VydmljZS5zZXRMb2NhbERhdGEodXNlckRhdGEsIGJvZHkpO1xuICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgIH1cblxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLmVycm9yIGluc3RhbmNlb2YgRXJyb3JFdmVudCkge1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nX2UoJ0FuIGVycm9yIG9jY3VycmVkIGZvciBnZXR0aW5nICcgKyBtZXNzYWdlICsgJzonLCBlLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nKCdOZXZlciB0aGUgbGVzcyBsZWF2ZSB0aGUgdXNlIGRvIGl0cyB0aGluZyB3aXRob3V0IHRva2VucycpO1xuICAgICAgICBib2R5LnN0YXR1cyA9IGUuc3RhdHVzO1xuICAgICAgICBib2R5Lm1lc3NhZ2UgPSBlLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgICAgfSBlbHNlIGlmIChlLnN0YXR1cyA9PT0gMCkge1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nX2UoJ0FuIGVycm9yIG9jY3VycmVkIGZvciBnZXR0aW5nICcgKyBtZXNzYWdlICsgJzonLCBlLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nKCdOZXZlciB0aGUgbGVzcyBsZWF2ZSB0aGUgdXNlIGRvIGl0cyB0aGluZyB3aXRob3V0IHRva2VucycpO1xuICAgICAgICBib2R5LnN0YXR1cyA9IGUuc3RhdHVzO1xuICAgICAgICBib2R5Lm1lc3NhZ2UgPSBlLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgICAgfSBlbHNlIGlmIChlLnN0YXR1cyA9PT0gNDA4KSB7XG4gICAgICAgIHRoaXMubG9nc2VydmljZS5sb2dfZShcbiAgICAgICAgICAnQW4gZXJyb3Igb2NjdXJyZWQgZm9yIGdldHRpbmcgJyArIG1lc3NhZ2UgKyAnOicsXG4gICAgICAgICAgZS5lcnJvci5tZXNzYWdlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubG9nc2VydmljZS5sb2coJ05ldmVyIHRoZSBsZXNzIGxlYXZlIHRoZSB1c2UgZG8gaXRzIHRoaW5nIHdpdGhvdXQgdG9rZW5zJyk7XG4gICAgICAgIGJvZHkuc3RhdHVzID0gZS5zdGF0dXM7XG4gICAgICAgIGJvZHkubWVzc2FnZSA9IGUuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nX2UoXG4gICAgICAgICAgYEJhY2tlbmQgcmV0dXJuZWQgY29kZSBmb3IgZ2V0dGluZyAke21lc3NhZ2V9ICR7ZS5zdGF0dXN9LCBgICtcbiAgICAgICAgICBgYm9keSB3YXMgZm9yIGdldHRpbmcgJHttZXNzYWdlfSA6ICR7ZS5lcnJvcn1gXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RvcmVTZXJ2aWNlLmRpc3BhdGNoVXNlckRhdGEoe30pO1xuICAgICAgICB0aGlzLmNhY2hlU2VydmljZS5yZW1vdmVMb2NhbERhdGEodXNlckRhdGEpO1xuICAgICAgICAvLyBhd2FpdCB0aGlzLmxvZ291dFNlcnZpY2UuZG9Mb2dvdXQoKTtcbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmpzZG9jLWZvcm1hdFxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBjaGVjayB3aGV0aGVyIHVzZXIgaXMgbmV3IG9yIGV4aXN0aW5nLlxuICAgKiBAZGVzY3JpcHRpb24gSWYgdXNlciBpcyBleGlzdGluZyB0aGVuIHRoaXMgZnVuY3Rpb24gd2lsbCBnZXQgdGhlIGN1cnJlbnQgb3IgcmVmcmVzaGVkIHRva2VuXG4gICAqIEByZXR1cm5zIGJvb2xlYW4gdmFsdWUgYmFzZWQgb24gZXhwaXJlZFxuICAgKi9cbiAgYXN5bmMgaXNMb2dnZWRJbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBjdXJyZW50VXNlckZyb21TdG9yZSA9IGF3YWl0IHRoaXMuc3RvcmVTZXJ2aWNlLmdldFVzZXJEYXRhKCk7XG4gICAgY29uc3QgY3VycmVudFVzZXI6IGFueSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldExvY2FsRGF0YSh1c2VyRGF0YSk7XG4gICAgdGhpcy5sb2dzZXJ2aWNlLmxvZygnVXNlciBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZSA9ICcsIGN1cnJlbnRVc2VyKTtcbiAgICB0aGlzLmxvZ3NlcnZpY2UubG9nKCdVc2VyIGRhdGEgZnJvbSBzdG9yZSA9ICcsIGN1cnJlbnRVc2VyRnJvbVN0b3JlKTtcblxuICAgIGlmIChjdXJyZW50VXNlckZyb21TdG9yZSAmJiBjdXJyZW50VXNlcikge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5jaGVja1Rva2VuU3RhdHVzKGN1cnJlbnRVc2VyKTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50VXNlckZyb21TdG9yZSAmJiAhY3VycmVudFVzZXIpIHsgIC8vIGlmIGRhdGEgaXMgcHJlc2VudCBpbiBzdG9yZSBidXQgbm90IGluIGxvY2FsIHN0b2FyZ2VcbiAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldExvY2FsRGF0YSh1c2VyRGF0YSwgY3VycmVudFVzZXJGcm9tU3RvcmUpOyAvLyB1cGRhdGUgbG9jc2FsIHN0b3JhZ2VcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuY2hlY2tUb2tlblN0YXR1cyhjdXJyZW50VXNlckZyb21TdG9yZSk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSBpZiAoIWN1cnJlbnRVc2VyRnJvbVN0b3JlICYmIGN1cnJlbnRVc2VyKSB7IC8vIGlmIGRhdGEgaXMgcHJlc2VudCBpbiBsb2NhbCBzdG9yYWdlIGJ1dCBub3QgaW4gU3RvcmVcbiAgICAgIHRoaXMuc3RvcmVTZXJ2aWNlLmRpc3BhdGNoVXNlckRhdGEoY3VycmVudFVzZXIpOyAvLyB1cGRhdGUgc3RvcmVcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuY2hlY2tUb2tlblN0YXR1cyhjdXJyZW50VXNlcik7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmpzZG9jLWZvcm1hdFxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBjaGVjayB0aGUgc3RhdHVzIG9mIHRva2VuIHdoZXRoZXIgaXQgaXMgZXhwaXJlZCBvciBub3RcbiAgICogQGRlc2NyaXB0aW9uIElmIHRva2VuIGlzIGV4cGlyZWQgdGhlbiBpdCB3aWxsIGNhbGwgcmVmcmVzaCB0b2tlbiBtZXRob2RcbiAgICogQHBhcmFtIGN1cnJlbnRVc2VyIGlzIHRoZSBjdXJyZW50dXNlciBvYmplY3QgZWl0aGVyIGZyb20gc3RvcmUgb3IgbG9jYWwgc3RvcmFnZVxuICAgKiBAcmV0dXJucyBib29sZWFuIHZhbHVlIG9yIHJlZnJlc2ggdG9rZW4gb2JqZWN0IGJhc2VkIG9uIGNvbmRpdGlvblxuICAgKi9cbiAgYXN5bmMgY2hlY2tUb2tlblN0YXR1cyhjdXJyZW50VXNlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGlzRXhwaXJlZCA9IHRoaXMuaXNUb2tlbkV4cGlyZShjdXJyZW50VXNlci5hY2Nlc3NfdG9rZW4pO1xuICAgIGlmIChpc0V4cGlyZWQpIHtcbiAgICAgIHRoaXMubG9nc2VydmljZS5sb2dfdygnVEhJUyBBQ0NFU1NfVE9LRU4gSVMgRVhQSVJFRCBpbiBMb2dpbiwgdHJ5IGdldHRpbmcgbmV3IG9uZS4nKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMucmVmcmVzaFRva2VuV3JhcHBlcihjdXJyZW50VXNlcik7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgcmVxdWlyZWQgZm9yIGNoZWNraW5nIHRoZSBhY2Nlc3NfdG9rZW4gaXMgZXhwaXJlZCBvciBub3QuXG4gICAqIEBwYXJhbSBhY2Nlc3NfdG9rZW4gTmVlZCBBY2Nlc3NfdG9rZW4gZm9yIGNoZWNraW5nIGlzIGl0IGV4cGlyZWRcbiAgICogQHJldHVybnMgYm9vbGVhbiB2YWx1ZSBiYXNlZCBvbiBleHBpZWRcbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG4gIGlzVG9rZW5FeHBpcmUoYWNjZXNzX3Rva2VuOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBoZWxwZXIgPSBuZXcgSnd0SGVscGVyU2VydmljZSgpO1xuICAgIHJldHVybiBoZWxwZXIuaXNUb2tlbkV4cGlyZWQoYWNjZXNzX3Rva2VuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2Qgd2lsbCBnZXQgY2FsbCB3aGVuZXZyIHdlIG5lZWQgdG8gcmVmcmVzaCB0aGUgZXhwaXNlIHRva2VuXG4gICAqIEBwYXJhbSB1c2VyIGlzIHRoZSBvYmplY3QgY29uYXRpbmluZyBhbGwgQ0lEQUFTIGxvZ2luIGRhdGFcbiAgICogQHJldHVybnMgb2JqZWN0IG9mIENJREFBUyBsb2dpbiBkYXRhIGluY2x1ZGluZyByZWdyZXNoIHRva2VuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIHJlZnJlc2hUb2tlbldyYXBwZXIodXNlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGJvZHk6IElUb2tlbkVuZHBvaW50Qm9keSA9IHtcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jb25maWd1cmF0aW9uLmNpZGFhc0NvbmZpZy5jaWRhYXNDbGllbnRJZCxcbiAgICAgIGdyYW50X3R5cGU6ICdyZWZyZXNoX3Rva2VuJyxcbiAgICAgIHJlZnJlc2hfdG9rZW46IHVzZXIucmVmcmVzaF90b2tlblxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmdldFRva2VuKGJvZHksICdyZWZyZXNoIHRva2VuJyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2Qgd2lsbCBkZWNpZGUgdGhlIGFjY2VzcyB0b2tlblxuICAgKiBAcmV0dXJucyBkZWNvZGVkIGFjY2VzcyB0b2tlblxuICAgKi9cbiAgYXN5bmMgZ2V0Q29ycmVsYXRpb25JZCgpIHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5nZXRVc2VyKCk7XG4gICAgY29uc3QgaGVscGVyID0gbmV3IEp3dEhlbHBlclNlcnZpY2UoKTtcbiAgICBjb25zdCBkZWNvZGVkVG9rZW4gPSBoZWxwZXIuZGVjb2RlVG9rZW4odXNlci5hY2Nlc3NfdG9rZW4pO1xuICAgIHJldHVybiBkZWNvZGVkVG9rZW4uc3ViO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyB0byBnZXQgdGhlIHVzZXJEYXRhIHJlbGF0ZWQgdG8gQ0lEQUFTIGxvZ2luXG4gICAqIEByZXR1cm5zIG9iamVjdCBvZiBDSURBQVMgbG9naW4gZGF0YVxuICAgKi9cbiAgYXN5bmMgZ2V0VXNlcigpIHtcbiAgICBsZXQgdXNlcjogYW55ID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0TG9jYWxEYXRhKHVzZXJEYXRhKTtcbiAgICBjb25zdCBoZWxwZXIgPSBuZXcgSnd0SGVscGVyU2VydmljZSgpO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCBpc0V4cGlyZWQgPSB0aGlzLmlzVG9rZW5FeHBpcmUodXNlci5hY2Nlc3NfdG9rZW4pO1xuICAgICAgaWYgKGlzRXhwaXJlZCkge1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nKFxuICAgICAgICAgICdUSElTIEFDQ0VTU19UT0tFTiBJUyBFWFBJUkVEIGluIGdldFVzZXIsIHRyeSBnZXR0aW5nIG5ldyBvbmUuJ1xuICAgICAgICApO1xuICAgICAgICB1c2VyID0gYXdhaXQgdGhpcy5yZWZyZXNoVG9rZW5XcmFwcGVyKHVzZXIpO1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nKCdyZWZyZXNoVGVzdDo6Z290IHJlc3VsdCBpbiBnZXRVc2VyICcgKyB1c2VyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVzZXI7XG4gIH1cblxufVxuIl19