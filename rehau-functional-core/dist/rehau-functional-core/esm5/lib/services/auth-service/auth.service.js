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
var AuthService = /** @class */ (function () {
    function AuthService(webService, cacheService, logservice, storeService, configuration) {
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
    AuthService.prototype.oAuthCallback = /**
     * @param {?} body
     * @param {?} message
     * @return {?}
     */
    function (body, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken(body, message)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * @description This function is responsible to call postAPI method to get the new token
     * @returns object of ITokenEndpointResponse
     */
    /**
     * \@description This function is responsible to call postAPI method to get the new token
     * @param {?} body
     * @return {?} object of ITokenEndpointResponse
     */
    AuthService.prototype.tokenRequest = /**
     * \@description This function is responsible to call postAPI method to get the new token
     * @param {?} body
     * @return {?} object of ITokenEndpointResponse
     */
    function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.webService.postApi(this.configuration.cidaasConfig.ciddasTokenEndpoint, body).toPromise()];
            });
        });
    };
    /**
     * @description This function will call the token request method to get new token
     * @description And will store the user data in store and local storage
     * @returns object of user data
     */
    /**
     * \@description This function will call the token request method to get new token / And will store the user data in store and local storage
     * @private
     * @param {?} body
     * @param {?} message
     * @return {?} object of user data
     */
    AuthService.prototype.getToken = /**
     * \@description This function will call the token request method to get new token / And will store the user data in store and local storage
     * @private
     * @param {?} body
     * @param {?} message
     * @return {?} object of user data
     */
    function (body, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tokenRequest(body)];
                    case 1:
                        response = _a.sent();
                        if (!response.access_token || !response.refresh_token) {
                            // Here We clean the User Object from Local Storage and Store.
                            this.storeService.dispatchUserData({});
                            this.cacheService.removeLocalData(userData);
                            return [2 /*return*/, response];
                        }
                        else {
                            body.access_token = response.access_token;
                            body.refresh_token = response.refresh_token;
                            // Here We Set the User Object in Local Storage and Store.
                            this.storeService.dispatchUserData(body);
                            this.cacheService.setLocalData(userData, body);
                            return [2 /*return*/, body];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1.error instanceof ErrorEvent) {
                            this.logservice.log_e('An error occurred for getting ' + message + ':', e_1.error.message);
                            this.logservice.log('Never the less leave the use do its thing without tokens');
                            body.status = e_1.status;
                            body.message = e_1.error.message;
                            return [2 /*return*/, body];
                        }
                        else if (e_1.status === 0) {
                            this.logservice.log_e('An error occurred for getting ' + message + ':', e_1.error.message);
                            this.logservice.log('Never the less leave the use do its thing without tokens');
                            body.status = e_1.status;
                            body.message = e_1.error.message;
                            return [2 /*return*/, body];
                        }
                        else if (e_1.status === 408) {
                            this.logservice.log_e('An error occurred for getting ' + message + ':', e_1.error.message);
                            this.logservice.log('Never the less leave the use do its thing without tokens');
                            body.status = e_1.status;
                            body.message = e_1.error.message;
                            return [2 /*return*/, body];
                        }
                        else {
                            this.logservice.log_e("Backend returned code for getting " + message + " " + e_1.status + ", " +
                                ("body was for getting " + message + " : " + e_1.error));
                            this.storeService.dispatchUserData({});
                            this.cacheService.removeLocalData(userData);
                            // await this.logoutService.doLogout();
                            return [2 /*return*/, body];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // tslint:disable-next-line:jsdoc-format
    /**
     * @description This function will check whether user is new or existing.
     * @description If user is existing then this function will get the current or refreshed token
     * @returns boolean value based on expired
     */
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check whether user is new or existing. / If user is existing then this function will get the current or refreshed token
     * @return {?} boolean value based on expired
     */
    AuthService.prototype.isLoggedIn = 
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check whether user is new or existing. / If user is existing then this function will get the current or refreshed token
     * @return {?} boolean value based on expired
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentUserFromStore, currentUser, res, res, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storeService.getUserData()];
                    case 1:
                        currentUserFromStore = _a.sent();
                        currentUser = this.cacheService.getLocalData(userData);
                        this.logservice.log('User data from local storage = ', currentUser);
                        this.logservice.log('User data from store = ', currentUserFromStore);
                        if (!(currentUserFromStore && currentUser)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.checkTokenStatus(currentUser)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        if (!(currentUserFromStore && !currentUser)) return [3 /*break*/, 5];
                        this.cacheService.setLocalData(userData, currentUserFromStore); // update locsal storage
                        // update locsal storage
                        return [4 /*yield*/, this.checkTokenStatus(currentUserFromStore)];
                    case 4:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 5:
                        if (!(!currentUserFromStore && currentUser)) return [3 /*break*/, 7];
                        this.storeService.dispatchUserData(currentUser); // update store
                        // update store
                        return [4 /*yield*/, this.checkTokenStatus(currentUser)];
                    case 6:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 7: return [2 /*return*/, false];
                }
            });
        });
    };
    // tslint:disable-next-line:jsdoc-format
    /**
     * @description This function will check the status of token whether it is expired or not
     * @description If token is expired then it will call refresh token method
     * @param currentUser is the currentuser object either from store or local storage
     * @returns boolean value or refresh token object based on condition
     */
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check the status of token whether it is expired or not / If token is expired then it will call refresh token method
     * @param {?} currentUser is the currentuser object either from store or local storage
     * @return {?} boolean value or refresh token object based on condition
     */
    AuthService.prototype.checkTokenStatus = 
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check the status of token whether it is expired or not / If token is expired then it will call refresh token method
     * @param {?} currentUser is the currentuser object either from store or local storage
     * @return {?} boolean value or refresh token object based on condition
     */
    function (currentUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isExpired, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isExpired = this.isTokenExpire(currentUser.access_token);
                        if (!isExpired) return [3 /*break*/, 2];
                        this.logservice.log_w('THIS ACCESS_TOKEN IS EXPIRED in Login, try getting new one.');
                        return [4 /*yield*/, this.refreshTokenWrapper(currentUser)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * @description This function is required for checking the access_token is expired or not.
     * @param access_token Need Access_token for checking is it expired
     * @returns boolean value based on expied
     */
    // tslint:disable-next-line:variable-name
    /**
     * \@description This function is required for checking the access_token is expired or not.
     * @param {?} access_token Need Access_token for checking is it expired
     * @return {?} boolean value based on expied
     */
    // tslint:disable-next-line:variable-name
    AuthService.prototype.isTokenExpire = /**
     * \@description This function is required for checking the access_token is expired or not.
     * @param {?} access_token Need Access_token for checking is it expired
     * @return {?} boolean value based on expied
     */
    // tslint:disable-next-line:variable-name
    function (access_token) {
        /** @type {?} */
        var helper = new JwtHelperService();
        return helper.isTokenExpired(access_token);
    };
    /**
     * @description This method will get call whenevr we need to refresh the expise token
     * @param user is the object conatining all CIDAAS login data
     * @returns object of CIDAAS login data including regresh token
     */
    /**
     * \@description This method will get call whenevr we need to refresh the expise token
     * @private
     * @param {?} user is the object conatining all CIDAAS login data
     * @return {?} object of CIDAAS login data including regresh token
     */
    AuthService.prototype.refreshTokenWrapper = /**
     * \@description This method will get call whenevr we need to refresh the expise token
     * @private
     * @param {?} user is the object conatining all CIDAAS login data
     * @return {?} object of CIDAAS login data including regresh token
     */
    function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            client_id: this.configuration.cidaasConfig.cidaasClientId,
                            grant_type: 'refresh_token',
                            refresh_token: user.refresh_token
                        };
                        return [4 /*yield*/, this.getToken(body, 'refresh token')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @description This method will decide the access token
     * @returns decoded access token
     */
    /**
     * \@description This method will decide the access token
     * @return {?} decoded access token
     */
    AuthService.prototype.getCorrelationId = /**
     * \@description This method will decide the access token
     * @return {?} decoded access token
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, helper, decodedToken;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUser()];
                    case 1:
                        user = _a.sent();
                        helper = new JwtHelperService();
                        decodedToken = helper.decodeToken(user.access_token);
                        return [2 /*return*/, decodedToken.sub];
                }
            });
        });
    };
    /**
     * @description This method is to get the userData related to CIDAAS login
     * @returns object of CIDAAS login data
     */
    /**
     * \@description This method is to get the userData related to CIDAAS login
     * @return {?} object of CIDAAS login data
     */
    AuthService.prototype.getUser = /**
     * \@description This method is to get the userData related to CIDAAS login
     * @return {?} object of CIDAAS login data
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, helper, isExpired;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.cacheService.getLocalData(userData);
                        helper = new JwtHelperService();
                        if (!user) return [3 /*break*/, 2];
                        isExpired = this.isTokenExpire(user.access_token);
                        if (!isExpired) return [3 /*break*/, 2];
                        this.logservice.log('THIS ACCESS_TOKEN IS EXPIRED in getUser, try getting new one.');
                        return [4 /*yield*/, this.refreshTokenWrapper(user)];
                    case 1:
                        user = _a.sent();
                        this.logservice.log('refreshTest::got result in getUser ' + user);
                        _a.label = 2;
                    case 2: return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: WebService },
        { type: CacheService },
        { type: LogService },
        { type: StoreService },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    /** @nocollapse */ AuthService.ngInjectableDef = i0.defineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.inject(i1.WebService), i0.inject(i2.CacheService), i0.inject(i3.LogService), i0.inject(i4.StoreService), i0.inject("SERVICE_CONFIG")); }, token: AuthService, providedIn: "root" });
    return AuthService;
}());
export { AuthService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2F1dGgtc2VydmljZS9hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7QUFFOUQ7SUFPRSxxQkFDVSxVQUFzQixFQUN0QixZQUEwQixFQUMxQixVQUFzQixFQUN0QixZQUEwQixFQUNELGFBQWtCO1FBSjNDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNELGtCQUFhLEdBQWIsYUFBYSxDQUFLO0lBQ2pELENBQUM7Ozs7OztJQUVDLG1DQUFhOzs7OztJQUFuQixVQUFvQixJQUF3QixFQUFFLE9BQWU7Ozs7OzRCQUNyQyxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQWxELFFBQVEsR0FBUSxTQUFrQzt3QkFDeEQsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2pCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDRyxrQ0FBWTs7Ozs7SUFBbEIsVUFBbUIsSUFBd0I7OztnQkFDekMsc0JBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUM7OztLQUV2RztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ1csOEJBQVE7Ozs7Ozs7SUFBdEIsVUFBdUIsSUFBSSxFQUFFLE9BQU87Ozs7Ozs7d0JBRVMscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQWhFLFFBQVEsR0FBMkIsU0FBNkI7d0JBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTs0QkFDckQsOERBQThEOzRCQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDNUMsc0JBQU8sUUFBUSxFQUFDO3lCQUNqQjs2QkFBTTs0QkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7NEJBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQzs0QkFDNUMsMERBQTBEOzRCQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQy9DLHNCQUFPLElBQUksRUFBQzt5QkFDYjs7Ozt3QkFHRCxJQUFJLEdBQUMsQ0FBQyxLQUFLLFlBQVksVUFBVSxFQUFFOzRCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBRyxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3pGLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7NEJBQ2hGLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBQyxDQUFDLE1BQU0sQ0FBQzs0QkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs0QkFDL0Isc0JBQU8sSUFBSSxFQUFDO3lCQUNiOzZCQUFNLElBQUksR0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxHQUFHLE9BQU8sR0FBRyxHQUFHLEVBQUUsR0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDekYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsMERBQTBELENBQUMsQ0FBQzs0QkFDaEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFDLENBQUMsTUFBTSxDQUFDOzRCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOzRCQUMvQixzQkFBTyxJQUFJLEVBQUM7eUJBQ2I7NkJBQU0sSUFBSSxHQUFDLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTs0QkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQ25CLGdDQUFnQyxHQUFHLE9BQU8sR0FBRyxHQUFHLEVBQ2hELEdBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNoQixDQUFDOzRCQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7NEJBQ2hGLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBQyxDQUFDLE1BQU0sQ0FBQzs0QkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs0QkFDL0Isc0JBQU8sSUFBSSxFQUFDO3lCQUNiOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUNuQix1Q0FBcUMsT0FBTyxTQUFJLEdBQUMsQ0FBQyxNQUFNLE9BQUk7aUNBQzVELDBCQUF3QixPQUFPLFdBQU0sR0FBQyxDQUFDLEtBQU8sQ0FBQSxDQUMvQyxDQUFDOzRCQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUM1Qyx1Q0FBdUM7NEJBQ3ZDLHNCQUFPLElBQUksRUFBQzt5QkFDYjs7Ozs7O0tBRUo7SUFFRCx3Q0FBd0M7SUFDeEM7Ozs7T0FJRzs7Ozs7O0lBQ0csZ0NBQVU7Ozs7OztJQUFoQjs7Ozs7NEJBQytCLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUE1RCxvQkFBb0IsR0FBRyxTQUFxQzt3QkFDNUQsV0FBVyxHQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLG9CQUFvQixDQUFDLENBQUM7NkJBRWpFLENBQUEsb0JBQW9CLElBQUksV0FBVyxDQUFBLEVBQW5DLHdCQUFtQzt3QkFDekIscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBOUMsR0FBRyxHQUFHLFNBQXdDO3dCQUNwRCxzQkFBTyxHQUFHLEVBQUM7OzZCQUNGLENBQUEsb0JBQW9CLElBQUksQ0FBQyxXQUFXLENBQUEsRUFBcEMsd0JBQW9DO3dCQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLHdCQUF3Qjs7d0JBQzVFLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzt3QkFBdkQsR0FBRyxHQUFHLFNBQWlEO3dCQUM3RCxzQkFBTyxHQUFHLEVBQUM7OzZCQUNGLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxXQUFXLENBQUEsRUFBcEMsd0JBQW9DO3dCQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZTs7d0JBQ3BELHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQTlDLEdBQUcsR0FBRyxTQUF3Qzt3QkFDcEQsc0JBQU8sR0FBRyxFQUFDOzRCQUVYLHNCQUFPLEtBQUssRUFBQzs7OztLQUVoQjtJQUVELHdDQUF3QztJQUN4Qzs7Ozs7T0FLRzs7Ozs7OztJQUNHLHNDQUFnQjs7Ozs7OztJQUF0QixVQUF1QixXQUFXOzs7Ozs7d0JBQzFCLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7NkJBQzFELFNBQVMsRUFBVCx3QkFBUzt3QkFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO3dCQUN6RSxxQkFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEVBQUE7O3dCQUFqRCxHQUFHLEdBQUcsU0FBMkM7d0JBQ3ZELHNCQUFPLEdBQUcsRUFBQzs0QkFFWCxzQkFBTyxJQUFJLEVBQUM7Ozs7S0FFZjtJQUVEOzs7O09BSUc7SUFDSCx5Q0FBeUM7Ozs7Ozs7SUFDekMsbUNBQWE7Ozs7OztJQUFiLFVBQWMsWUFBb0I7O1lBQzFCLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFO1FBQ3JDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNXLHlDQUFtQjs7Ozs7O0lBQWpDLFVBQWtDLElBQUk7Ozs7Ozt3QkFDOUIsSUFBSSxHQUF1Qjs0QkFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGNBQWM7NEJBQ3pELFVBQVUsRUFBRSxlQUFlOzRCQUMzQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7eUJBQ2xDO3dCQUVjLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxFQUFBOzt3QkFBbkQsTUFBTSxHQUFHLFNBQTBDO3dCQUN6RCxzQkFBTyxNQUFNLEVBQUM7Ozs7S0FDZjtJQUVEOzs7T0FHRzs7Ozs7SUFDRyxzQ0FBZ0I7Ozs7SUFBdEI7Ozs7OzRCQUNlLHFCQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQTNCLElBQUksR0FBRyxTQUFvQjt3QkFDM0IsTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUU7d0JBQy9CLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7d0JBQzFELHNCQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUM7Ozs7S0FDekI7SUFFRDs7O09BR0c7Ozs7O0lBQ0csNkJBQU87Ozs7SUFBYjs7Ozs7O3dCQUNNLElBQUksR0FBUSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7d0JBQ2xELE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFOzZCQUNqQyxJQUFJLEVBQUosd0JBQUk7d0JBQ0EsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzs2QkFDbkQsU0FBUyxFQUFULHdCQUFTO3dCQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQiwrREFBK0QsQ0FDaEUsQ0FBQzt3QkFDSyxxQkFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUEzQyxJQUFJLEdBQUcsU0FBb0MsQ0FBQzt3QkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMscUNBQXFDLEdBQUcsSUFBSSxDQUFDLENBQUM7OzRCQUd0RSxzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjs7Z0JBNUxGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBVFEsVUFBVTtnQkFDVixZQUFZO2dCQUdaLFVBQVU7Z0JBQ1YsWUFBWTtnREFjaEIsTUFBTSxTQUFDLGdCQUFnQjs7O3NCQXRCNUI7Q0F3TUMsQUE5TEQsSUE4TEM7U0EzTFksV0FBVzs7Ozs7O0lBRXRCLG1DQUF1Qzs7Ozs7SUFHckMsaUNBQThCOzs7OztJQUM5QixtQ0FBa0M7Ozs7O0lBQ2xDLGlDQUE4Qjs7Ozs7SUFDOUIsbUNBQWtDOztJQUNsQyxvQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElUb2tlbkVuZHBvaW50Qm9keSwgSVRva2VuRW5kcG9pbnRSZXNwb25zZSB9IGZyb20gJy4uLy4uL21vZGVscy9jaWRhYXMubW9kZWwnO1xuaW1wb3J0IHsgQ2lkYWFzUHJvdmlkZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY2lkYWFzLnByb3ZpZGVyJztcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tICcuLi93ZWItc2VydmljZS93ZWIuc2VydmljZSc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi9jYWNoZS1zZXJ2aWNlL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICcuLi8uLi9jb25maWcvbG9jYWwtc3RvcmFnZS5jb25maWcnO1xuaW1wb3J0IHsgSnd0SGVscGVyU2VydmljZSB9IGZyb20gJ0BhdXRoMC9hbmd1bGFyLWp3dCc7XG5pbXBvcnQgeyBMb2dTZXJ2aWNlIH0gZnJvbSAnLi4vbG9nZ2VyLXNlcnZpY2UvbG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUtc2VydmljZS9zdG9yZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgdG9rZW5Qcm9taXNlOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd2ViU2VydmljZTogV2ViU2VydmljZSxcbiAgICBwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9nc2VydmljZTogTG9nU2VydmljZSxcbiAgICBwcml2YXRlIHN0b3JlU2VydmljZTogU3RvcmVTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ1NFUlZJQ0VfQ09ORklHJykgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueVxuICApIHsgfVxuXG4gIGFzeW5jIG9BdXRoQ2FsbGJhY2soYm9keTogSVRva2VuRW5kcG9pbnRCb2R5LCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXNwb25zZTogYW55ID0gYXdhaXQgdGhpcy5nZXRUb2tlbihib2R5LCBtZXNzYWdlKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gY2FsbCBwb3N0QVBJIG1ldGhvZCB0byBnZXQgdGhlIG5ldyB0b2tlblxuICAgKiBAcmV0dXJucyBvYmplY3Qgb2YgSVRva2VuRW5kcG9pbnRSZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgdG9rZW5SZXF1ZXN0KGJvZHk6IElUb2tlbkVuZHBvaW50Qm9keSk6IFByb21pc2U8SVRva2VuRW5kcG9pbnRSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLndlYlNlcnZpY2UucG9zdEFwaSh0aGlzLmNvbmZpZ3VyYXRpb24uY2lkYWFzQ29uZmlnLmNpZGRhc1Rva2VuRW5kcG9pbnQsIGJvZHkpLnRvUHJvbWlzZSgpO1xuXG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBjYWxsIHRoZSB0b2tlbiByZXF1ZXN0IG1ldGhvZCB0byBnZXQgbmV3IHRva2VuXG4gICAqIEBkZXNjcmlwdGlvbiBBbmQgd2lsbCBzdG9yZSB0aGUgdXNlciBkYXRhIGluIHN0b3JlIGFuZCBsb2NhbCBzdG9yYWdlXG4gICAqIEByZXR1cm5zIG9iamVjdCBvZiB1c2VyIGRhdGFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZ2V0VG9rZW4oYm9keSwgbWVzc2FnZSk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBJVG9rZW5FbmRwb2ludFJlc3BvbnNlID0gYXdhaXQgdGhpcy50b2tlblJlcXVlc3QoYm9keSk7XG4gICAgICBpZiAoIXJlc3BvbnNlLmFjY2Vzc190b2tlbiB8fCAhcmVzcG9uc2UucmVmcmVzaF90b2tlbikge1xuICAgICAgICAvLyBIZXJlIFdlIGNsZWFuIHRoZSBVc2VyIE9iamVjdCBmcm9tIExvY2FsIFN0b3JhZ2UgYW5kIFN0b3JlLlxuICAgICAgICB0aGlzLnN0b3JlU2VydmljZS5kaXNwYXRjaFVzZXJEYXRhKHt9KTtcbiAgICAgICAgdGhpcy5jYWNoZVNlcnZpY2UucmVtb3ZlTG9jYWxEYXRhKHVzZXJEYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9keS5hY2Nlc3NfdG9rZW4gPSByZXNwb25zZS5hY2Nlc3NfdG9rZW47XG4gICAgICAgIGJvZHkucmVmcmVzaF90b2tlbiA9IHJlc3BvbnNlLnJlZnJlc2hfdG9rZW47XG4gICAgICAgIC8vIEhlcmUgV2UgU2V0IHRoZSBVc2VyIE9iamVjdCBpbiBMb2NhbCBTdG9yYWdlIGFuZCBTdG9yZS5cbiAgICAgICAgdGhpcy5zdG9yZVNlcnZpY2UuZGlzcGF0Y2hVc2VyRGF0YShib2R5KTtcbiAgICAgICAgdGhpcy5jYWNoZVNlcnZpY2Uuc2V0TG9jYWxEYXRhKHVzZXJEYXRhLCBib2R5KTtcbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICB9XG5cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5lcnJvciBpbnN0YW5jZW9mIEVycm9yRXZlbnQpIHtcbiAgICAgICAgdGhpcy5sb2dzZXJ2aWNlLmxvZ19lKCdBbiBlcnJvciBvY2N1cnJlZCBmb3IgZ2V0dGluZyAnICsgbWVzc2FnZSArICc6JywgZS5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5sb2dzZXJ2aWNlLmxvZygnTmV2ZXIgdGhlIGxlc3MgbGVhdmUgdGhlIHVzZSBkbyBpdHMgdGhpbmcgd2l0aG91dCB0b2tlbnMnKTtcbiAgICAgICAgYm9keS5zdGF0dXMgPSBlLnN0YXR1cztcbiAgICAgICAgYm9keS5tZXNzYWdlID0gZS5lcnJvci5tZXNzYWdlO1xuICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoZS5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgdGhpcy5sb2dzZXJ2aWNlLmxvZ19lKCdBbiBlcnJvciBvY2N1cnJlZCBmb3IgZ2V0dGluZyAnICsgbWVzc2FnZSArICc6JywgZS5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5sb2dzZXJ2aWNlLmxvZygnTmV2ZXIgdGhlIGxlc3MgbGVhdmUgdGhlIHVzZSBkbyBpdHMgdGhpbmcgd2l0aG91dCB0b2tlbnMnKTtcbiAgICAgICAgYm9keS5zdGF0dXMgPSBlLnN0YXR1cztcbiAgICAgICAgYm9keS5tZXNzYWdlID0gZS5lcnJvci5tZXNzYWdlO1xuICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoZS5zdGF0dXMgPT09IDQwOCkge1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nX2UoXG4gICAgICAgICAgJ0FuIGVycm9yIG9jY3VycmVkIGZvciBnZXR0aW5nICcgKyBtZXNzYWdlICsgJzonLFxuICAgICAgICAgIGUuZXJyb3IubWVzc2FnZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nKCdOZXZlciB0aGUgbGVzcyBsZWF2ZSB0aGUgdXNlIGRvIGl0cyB0aGluZyB3aXRob3V0IHRva2VucycpO1xuICAgICAgICBib2R5LnN0YXR1cyA9IGUuc3RhdHVzO1xuICAgICAgICBib2R5Lm1lc3NhZ2UgPSBlLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dzZXJ2aWNlLmxvZ19lKFxuICAgICAgICAgIGBCYWNrZW5kIHJldHVybmVkIGNvZGUgZm9yIGdldHRpbmcgJHttZXNzYWdlfSAke2Uuc3RhdHVzfSwgYCArXG4gICAgICAgICAgYGJvZHkgd2FzIGZvciBnZXR0aW5nICR7bWVzc2FnZX0gOiAke2UuZXJyb3J9YFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0b3JlU2VydmljZS5kaXNwYXRjaFVzZXJEYXRhKHt9KTtcbiAgICAgICAgdGhpcy5jYWNoZVNlcnZpY2UucmVtb3ZlTG9jYWxEYXRhKHVzZXJEYXRhKTtcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5sb2dvdXRTZXJ2aWNlLmRvTG9nb3V0KCk7XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpqc2RvYy1mb3JtYXRcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgY2hlY2sgd2hldGhlciB1c2VyIGlzIG5ldyBvciBleGlzdGluZy5cbiAgICogQGRlc2NyaXB0aW9uIElmIHVzZXIgaXMgZXhpc3RpbmcgdGhlbiB0aGlzIGZ1bmN0aW9uIHdpbGwgZ2V0IHRoZSBjdXJyZW50IG9yIHJlZnJlc2hlZCB0b2tlblxuICAgKiBAcmV0dXJucyBib29sZWFuIHZhbHVlIGJhc2VkIG9uIGV4cGlyZWRcbiAgICovXG4gIGFzeW5jIGlzTG9nZ2VkSW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgY3VycmVudFVzZXJGcm9tU3RvcmUgPSBhd2FpdCB0aGlzLnN0b3JlU2VydmljZS5nZXRVc2VyRGF0YSgpO1xuICAgIGNvbnN0IGN1cnJlbnRVc2VyOiBhbnkgPSB0aGlzLmNhY2hlU2VydmljZS5nZXRMb2NhbERhdGEodXNlckRhdGEpO1xuICAgIHRoaXMubG9nc2VydmljZS5sb2coJ1VzZXIgZGF0YSBmcm9tIGxvY2FsIHN0b3JhZ2UgPSAnLCBjdXJyZW50VXNlcik7XG4gICAgdGhpcy5sb2dzZXJ2aWNlLmxvZygnVXNlciBkYXRhIGZyb20gc3RvcmUgPSAnLCBjdXJyZW50VXNlckZyb21TdG9yZSk7XG5cbiAgICBpZiAoY3VycmVudFVzZXJGcm9tU3RvcmUgJiYgY3VycmVudFVzZXIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuY2hlY2tUb2tlblN0YXR1cyhjdXJyZW50VXNlcik7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFVzZXJGcm9tU3RvcmUgJiYgIWN1cnJlbnRVc2VyKSB7ICAvLyBpZiBkYXRhIGlzIHByZXNlbnQgaW4gc3RvcmUgYnV0IG5vdCBpbiBsb2NhbCBzdG9hcmdlXG4gICAgICB0aGlzLmNhY2hlU2VydmljZS5zZXRMb2NhbERhdGEodXNlckRhdGEsIGN1cnJlbnRVc2VyRnJvbVN0b3JlKTsgLy8gdXBkYXRlIGxvY3NhbCBzdG9yYWdlXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmNoZWNrVG9rZW5TdGF0dXMoY3VycmVudFVzZXJGcm9tU3RvcmUpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2UgaWYgKCFjdXJyZW50VXNlckZyb21TdG9yZSAmJiBjdXJyZW50VXNlcikgeyAvLyBpZiBkYXRhIGlzIHByZXNlbnQgaW4gbG9jYWwgc3RvcmFnZSBidXQgbm90IGluIFN0b3JlXG4gICAgICB0aGlzLnN0b3JlU2VydmljZS5kaXNwYXRjaFVzZXJEYXRhKGN1cnJlbnRVc2VyKTsgLy8gdXBkYXRlIHN0b3JlXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmNoZWNrVG9rZW5TdGF0dXMoY3VycmVudFVzZXIpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpqc2RvYy1mb3JtYXRcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgY2hlY2sgdGhlIHN0YXR1cyBvZiB0b2tlbiB3aGV0aGVyIGl0IGlzIGV4cGlyZWQgb3Igbm90XG4gICAqIEBkZXNjcmlwdGlvbiBJZiB0b2tlbiBpcyBleHBpcmVkIHRoZW4gaXQgd2lsbCBjYWxsIHJlZnJlc2ggdG9rZW4gbWV0aG9kXG4gICAqIEBwYXJhbSBjdXJyZW50VXNlciBpcyB0aGUgY3VycmVudHVzZXIgb2JqZWN0IGVpdGhlciBmcm9tIHN0b3JlIG9yIGxvY2FsIHN0b3JhZ2VcbiAgICogQHJldHVybnMgYm9vbGVhbiB2YWx1ZSBvciByZWZyZXNoIHRva2VuIG9iamVjdCBiYXNlZCBvbiBjb25kaXRpb25cbiAgICovXG4gIGFzeW5jIGNoZWNrVG9rZW5TdGF0dXMoY3VycmVudFVzZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBpc0V4cGlyZWQgPSB0aGlzLmlzVG9rZW5FeHBpcmUoY3VycmVudFVzZXIuYWNjZXNzX3Rva2VuKTtcbiAgICBpZiAoaXNFeHBpcmVkKSB7XG4gICAgICB0aGlzLmxvZ3NlcnZpY2UubG9nX3coJ1RISVMgQUNDRVNTX1RPS0VOIElTIEVYUElSRUQgaW4gTG9naW4sIHRyeSBnZXR0aW5nIG5ldyBvbmUuJyk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnJlZnJlc2hUb2tlbldyYXBwZXIoY3VycmVudFVzZXIpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHJlcXVpcmVkIGZvciBjaGVja2luZyB0aGUgYWNjZXNzX3Rva2VuIGlzIGV4cGlyZWQgb3Igbm90LlxuICAgKiBAcGFyYW0gYWNjZXNzX3Rva2VuIE5lZWQgQWNjZXNzX3Rva2VuIGZvciBjaGVja2luZyBpcyBpdCBleHBpcmVkXG4gICAqIEByZXR1cm5zIGJvb2xlYW4gdmFsdWUgYmFzZWQgb24gZXhwaWVkXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBpc1Rva2VuRXhwaXJlKGFjY2Vzc190b2tlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaGVscGVyID0gbmV3IEp3dEhlbHBlclNlcnZpY2UoKTtcbiAgICByZXR1cm4gaGVscGVyLmlzVG9rZW5FeHBpcmVkKGFjY2Vzc190b2tlbik7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIHdpbGwgZ2V0IGNhbGwgd2hlbmV2ciB3ZSBuZWVkIHRvIHJlZnJlc2ggdGhlIGV4cGlzZSB0b2tlblxuICAgKiBAcGFyYW0gdXNlciBpcyB0aGUgb2JqZWN0IGNvbmF0aW5pbmcgYWxsIENJREFBUyBsb2dpbiBkYXRhXG4gICAqIEByZXR1cm5zIG9iamVjdCBvZiBDSURBQVMgbG9naW4gZGF0YSBpbmNsdWRpbmcgcmVncmVzaCB0b2tlblxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyByZWZyZXNoVG9rZW5XcmFwcGVyKHVzZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBib2R5OiBJVG9rZW5FbmRwb2ludEJvZHkgPSB7XG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY29uZmlndXJhdGlvbi5jaWRhYXNDb25maWcuY2lkYWFzQ2xpZW50SWQsXG4gICAgICBncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXG4gICAgICByZWZyZXNoX3Rva2VuOiB1c2VyLnJlZnJlc2hfdG9rZW5cbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRUb2tlbihib2R5LCAncmVmcmVzaCB0b2tlbicpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIHdpbGwgZGVjaWRlIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICogQHJldHVybnMgZGVjb2RlZCBhY2Nlc3MgdG9rZW5cbiAgICovXG4gIGFzeW5jIGdldENvcnJlbGF0aW9uSWQoKSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuZ2V0VXNlcigpO1xuICAgIGNvbnN0IGhlbHBlciA9IG5ldyBKd3RIZWxwZXJTZXJ2aWNlKCk7XG4gICAgY29uc3QgZGVjb2RlZFRva2VuID0gaGVscGVyLmRlY29kZVRva2VuKHVzZXIuYWNjZXNzX3Rva2VuKTtcbiAgICByZXR1cm4gZGVjb2RlZFRva2VuLnN1YjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgaXMgdG8gZ2V0IHRoZSB1c2VyRGF0YSByZWxhdGVkIHRvIENJREFBUyBsb2dpblxuICAgKiBAcmV0dXJucyBvYmplY3Qgb2YgQ0lEQUFTIGxvZ2luIGRhdGFcbiAgICovXG4gIGFzeW5jIGdldFVzZXIoKSB7XG4gICAgbGV0IHVzZXI6IGFueSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldExvY2FsRGF0YSh1c2VyRGF0YSk7XG4gICAgY29uc3QgaGVscGVyID0gbmV3IEp3dEhlbHBlclNlcnZpY2UoKTtcbiAgICBpZiAodXNlcikge1xuICAgICAgY29uc3QgaXNFeHBpcmVkID0gdGhpcy5pc1Rva2VuRXhwaXJlKHVzZXIuYWNjZXNzX3Rva2VuKTtcbiAgICAgIGlmIChpc0V4cGlyZWQpIHtcbiAgICAgICAgdGhpcy5sb2dzZXJ2aWNlLmxvZyhcbiAgICAgICAgICAnVEhJUyBBQ0NFU1NfVE9LRU4gSVMgRVhQSVJFRCBpbiBnZXRVc2VyLCB0cnkgZ2V0dGluZyBuZXcgb25lLidcbiAgICAgICAgKTtcbiAgICAgICAgdXNlciA9IGF3YWl0IHRoaXMucmVmcmVzaFRva2VuV3JhcHBlcih1c2VyKTtcbiAgICAgICAgdGhpcy5sb2dzZXJ2aWNlLmxvZygncmVmcmVzaFRlc3Q6OmdvdCByZXN1bHQgaW4gZ2V0VXNlciAnICsgdXNlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1c2VyO1xuICB9XG5cbn1cbiJdfQ==