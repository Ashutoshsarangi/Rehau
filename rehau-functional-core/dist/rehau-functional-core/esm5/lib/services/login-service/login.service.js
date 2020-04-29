/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// IONIC - ANGULAR
import { Inject, Injectable } from '@angular/core';
// Importing CIDAAS Provider
import { CidaasProvider } from '../../providers/cidaas.provider';
import { OauthBrowser, OauthCordova } from 'ionic-cordova-oauth';
import { AuthService } from '../auth-service/auth.service';
import { LogService } from '../logger-service/logger.service';
import { StoreService } from '../store-service/store.service';
import { CacheService } from '../cache-service/cache.service';
import { userData } from '../../config/local-storage.config';
// CIDAAS Confi Data
import { loginDesign, bodyParam, registerDesign, userObject } from '../../config/cidaas.config';
import { throwError } from 'rxjs';
import { ConfigService } from '../config-service/config-service';
var LoginService = /** @class */ (function () {
    function LoginService(authService, logService, configService, storeService, cacheService, configuration) {
        this.authService = authService;
        this.logService = logService;
        this.configService = configService;
        this.storeService = storeService;
        this.cacheService = cacheService;
        this.configuration = configuration;
        // cidaasParam = { clientId: CidaasProvider.CLIENT_ID };
        this.cidaasParam = { clientId: this.configuration.cidaasConfig.cidaasClientId };
        this.cidaasRegisterProvider = this.configuration.cidaasConfig.cidaasRegisterProvider;
        this.cidaasLoginProvider = this.configuration.cidaasConfig.cidaasLoginProvider;
        this.cidaasLoginDesign = this.configuration.cidaasConfig.cidaasLoginDesign;
        this.cidaasRegisterDesign = this.configuration.cidaasConfig.cidaasRegisterDesign;
    }
    /**
     * @description This is CIDAAS Authentication main function
     * @param actionType is the string which indicates the type of action whether it is login or register
     * @param platform is used to define the platform to use. Default value is browser
     */
    /**
     * \@description This is CIDAAS Authentication main function
     * @param {?} actionType is the string which indicates the type of action whether it is login or register
     * @param {?=} platform is used to define the platform to use. Default value is browser
     * @return {?}
     */
    LoginService.prototype.cidaasAuth = /**
     * \@description This is CIDAAS Authentication main function
     * @param {?} actionType is the string which indicates the type of action whether it is login or register
     * @param {?=} platform is used to define the platform to use. Default value is browser
     * @return {?}
     */
    function (actionType, platform) {
        if (platform === void 0) { platform = 'browser'; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, pkceBody, result, res, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actionType = actionType.trim();
                        if (actionType === 'register token') {
                            // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasRegisterProvider });
                            provider = new CidaasProvider(tslib_1.__assign({}, this.cidaasParam, this.cidaasRegisterProvider));
                        }
                        else if (actionType === 'login token') {
                            // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasLoginProvider });
                            provider = new CidaasProvider(tslib_1.__assign({}, this.cidaasParam, this.cidaasLoginProvider));
                        }
                        pkceBody = {
                            grant_type: bodyParam.grant_type,
                            client_id: provider.options.clientId,
                            redirect_uri: provider.options.redirectUri,
                            code_verifier: CidaasProvider.base64URLEncode(provider.options.code_challenge)
                        };
                        this.logService.log('TEST CONFI SERVICE = ', +this.configService.configuration);
                        this.logService.log('pkceBody required for login = ' + pkceBody);
                        this.logService.log('provider body required for login =' + provider);
                        res = userObject;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.login(provider, pkceBody, actionType, platform)];
                    case 2:
                        result = _a.sent();
                        if (result.access_token === '' || result.access_token === undefined) {
                            this.logService.log_e('login failed == ');
                            this.logService.log_e(result);
                            res.message = 'login Failed';
                            res.status = '1';
                            return [2 /*return*/, res];
                        }
                        else {
                            this.logService.log('login successFull == ');
                            this.logService.log(result);
                            res.message = 'login success';
                            res.status = '0';
                            res.accessToken = result.access_token;
                            res.refreshToken = result.refresh_token;
                            return [2 /*return*/, res];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throwError(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description This is logout function
     * @description it will remove userData from local storage and store
     */
    /**
     * \@description This is logout function / it will remove userData from local storage and store
     * @return {?}
     */
    LoginService.prototype.cidaasLogout = /**
     * \@description This is logout function / it will remove userData from local storage and store
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.storeService.dispatchUserData({});
                    this.cacheService.removeLocalData(userData);
                    return [2 /*return*/, true];
                }
                catch (err) {
                    throwError(err);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description This is Login function to call oauth loginVia API
     * @param provider is the CIDAAS provider object
     * @param pkceBody is the ITokenEndpointBody object
     * @param actionType it is identifier for the API action whether it is for login/register
     */
    /**
     * \@description This is Login function to call oauth loginVia API
     * @param {?} provider is the CIDAAS provider object
     * @param {?} pkceBody is the ITokenEndpointBody object
     * @param {?} actionType it is identifier for the API action whether it is for login/register
     * @param {?} platform
     * @return {?}
     */
    LoginService.prototype.login = /**
     * \@description This is Login function to call oauth loginVia API
     * @param {?} provider is the CIDAAS provider object
     * @param {?} pkceBody is the ITokenEndpointBody object
     * @param {?} actionType it is identifier for the API action whether it is for login/register
     * @param {?} platform
     * @return {?}
     */
    function (provider, pkceBody, actionType, platform) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (platform === 'browser') {
                            this.oauth = new OauthBrowser();
                        }
                        else {
                            this.oauth = new OauthCordova();
                        }
                        if (this.cidaasLoginDesign === undefined || Object.keys(this.cidaasLoginDesign).length === 0) {
                            this.cidaasLoginDesign = loginDesign;
                        }
                        if (this.cidaasRegisterDesign === undefined || Object.keys(this.cidaasRegisterDesign).length === 0) {
                            this.cidaasRegisterDesign = registerDesign;
                        }
                        if (!(actionType === 'register token')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.oauth.logInVia(provider, this.cidaasLoginDesign)];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(actionType === 'login token')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.oauth.logInVia(provider, this.cidaasRegisterDesign)];
                    case 3:
                        res = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!!!res) return [3 /*break*/, 6];
                        pkceBody.code = res.code;
                        return [4 /*yield*/, this.authService.oAuthCallback(pkceBody, actionType)];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LoginService.ctorParameters = function () { return [
        { type: AuthService },
        { type: LogService },
        { type: ConfigService },
        { type: StoreService },
        { type: CacheService },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    return LoginService;
}());
export { LoginService };
if (false) {
    /** @type {?} */
    LoginService.prototype.oauth;
    /** @type {?} */
    LoginService.prototype.cidaasParam;
    /** @type {?} */
    LoginService.prototype.cidaasRegisterProvider;
    /** @type {?} */
    LoginService.prototype.cidaasLoginProvider;
    /** @type {?} */
    LoginService.prototype.cidaasLoginDesign;
    /** @type {?} */
    LoginService.prototype.cidaasRegisterDesign;
    /**
     * @type {?}
     * @private
     */
    LoginService.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    LoginService.prototype.logService;
    /**
     * @type {?}
     * @private
     */
    LoginService.prototype.configService;
    /**
     * @type {?}
     * @private
     */
    LoginService.prototype.storeService;
    /**
     * @type {?}
     * @private
     */
    LoginService.prototype.cacheService;
    /** @type {?} */
    LoginService.prototype.configuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sb2dpbi1zZXJ2aWNlL2xvZ2luLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBR25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVqRSxPQUFPLEVBQVMsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBRzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdqRTtJQUVFLHNCQUNVLFdBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLGFBQTRCLEVBQzVCLFlBQTBCLEVBQzFCLFlBQTBCLEVBQ0QsYUFBa0I7UUFMM0MsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNELGtCQUFhLEdBQWIsYUFBYSxDQUFLOztRQUlyRCxnQkFBVyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNFLDJCQUFzQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDO1FBQ2hGLHdCQUFtQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDO1FBQzFFLHNCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1FBQ3RFLHlCQUFvQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDO0lBUHhFLENBQUM7SUFTTDs7OztPQUlHOzs7Ozs7O0lBQ0csaUNBQVU7Ozs7OztJQUFoQixVQUFpQixVQUFVLEVBQUUsUUFBb0I7UUFBcEIseUJBQUEsRUFBQSxvQkFBb0I7Ozs7Ozt3QkFDL0MsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFFL0IsSUFBSSxVQUFVLEtBQUssZ0JBQWdCLEVBQUU7NEJBQ25DLHFGQUFxRjs0QkFDckYsUUFBUSxHQUFHLElBQUksY0FBYyxzQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFLLElBQUksQ0FBQyxzQkFBc0IsRUFBRyxDQUFDO3lCQUN4Rjs2QkFBTSxJQUFJLFVBQVUsS0FBSyxhQUFhLEVBQUU7NEJBQ3ZDLGtGQUFrRjs0QkFDbEYsUUFBUSxHQUFHLElBQUksY0FBYyxzQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFLLElBQUksQ0FBQyxtQkFBbUIsRUFBRyxDQUFDO3lCQUNyRjt3QkFDSyxRQUFRLEdBQXVCOzRCQUNuQyxVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVU7NEJBQ2hDLFNBQVMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVE7NEJBQ3BDLFlBQVksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQzFDLGFBQWEsRUFBRSxjQUFjLENBQUMsZUFBZSxDQUMzQyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDaEM7eUJBQ0Y7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNqRixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsR0FBRyxRQUFRLENBQUMsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEdBQUcsUUFBUSxDQUFDLENBQUM7d0JBRS9ELEdBQUcsR0FBRyxVQUFVOzs7O3dCQUVYLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUFuRSxNQUFNLEdBQUcsU0FBMEQsQ0FBQzt3QkFDcEUsSUFBSSxNQUFNLENBQUMsWUFBWSxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTs0QkFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs0QkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzlCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDOzRCQUM3QixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzs0QkFDakIsc0JBQU8sR0FBRyxFQUFDO3lCQUNaOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7NEJBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUM1QixHQUFHLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQzs0QkFDOUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ2pCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsR0FBRyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDOzRCQUN4QyxzQkFBTyxHQUFHLEVBQUM7eUJBQ1o7Ozs7d0JBRUQsVUFBVSxDQUFDLEtBQUcsQ0FBQyxDQUFDOzs7Ozs7S0FFbkI7SUFFRDs7O09BR0c7Ozs7O0lBQ0csbUNBQVk7Ozs7SUFBbEI7OztnQkFDRSxJQUFJO29CQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM1QyxzQkFBTyxJQUFJLEVBQUM7aUJBQ2I7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQjs7OztLQUNGO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7OztJQUNHLDRCQUFLOzs7Ozs7OztJQUFYLFVBQVksUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUTs7Ozs7O3dCQUVsRCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7NEJBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzt5QkFDakM7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO3lCQUNqQzt3QkFDRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUM1RixJQUFJLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO3lCQUN0Qzt3QkFDRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUNsRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsY0FBYyxDQUFDO3lCQUM1Qzs2QkFDRyxDQUFBLFVBQVUsS0FBSyxnQkFBZ0IsQ0FBQSxFQUEvQix3QkFBK0I7d0JBQzNCLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBQTs7d0JBQWpFLEdBQUcsR0FBRyxTQUEyRCxDQUFDOzs7NkJBQ3pELENBQUEsVUFBVSxLQUFLLGFBQWEsQ0FBQSxFQUE1Qix3QkFBNEI7d0JBQy9CLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQXBFLEdBQUcsR0FBRyxTQUE4RCxDQUFDOzs7NkJBR25FLENBQUMsQ0FBQyxHQUFHLEVBQUwsd0JBQUs7d0JBQ1AsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNaLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBQTs7d0JBQWpFLElBQUksR0FBRyxTQUEwRDt3QkFDdkUsc0JBQU8sSUFBSSxFQUFDOzs7OztLQUdmOztnQkFqSEYsVUFBVTs7OztnQkFaRixXQUFXO2dCQUNYLFVBQVU7Z0JBUVYsYUFBYTtnQkFQYixZQUFZO2dCQUNaLFlBQVk7Z0RBaUJoQixNQUFNLFNBQUMsZ0JBQWdCOztJQTBHNUIsbUJBQUM7Q0FBQSxBQWxIRCxJQWtIQztTQWpIWSxZQUFZOzs7SUFTdkIsNkJBQWE7O0lBRWIsbUNBQTJFOztJQUMzRSw4Q0FBZ0Y7O0lBQ2hGLDJDQUEwRTs7SUFDMUUseUNBQXNFOztJQUN0RSw0Q0FBNEU7Ozs7O0lBYjFFLG1DQUFnQzs7Ozs7SUFDaEMsa0NBQThCOzs7OztJQUM5QixxQ0FBb0M7Ozs7O0lBQ3BDLG9DQUFrQzs7Ozs7SUFDbEMsb0NBQWtDOztJQUNsQyxxQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJT05JQyAtIEFOR1VMQVJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBJbXBvcnRpbmcgQ0lEQUFTIFByb3ZpZGVyXG5pbXBvcnQgeyBDaWRhYXNQcm92aWRlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jaWRhYXMucHJvdmlkZXInO1xuaW1wb3J0IHsgSVRva2VuRW5kcG9pbnRCb2R5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NpZGFhcy5tb2RlbCc7XG5pbXBvcnQgeyBPYXV0aCwgT2F1dGhCcm93c2VyLCBPYXV0aENvcmRvdmEgfSBmcm9tICdpb25pYy1jb3Jkb3ZhLW9hdXRoJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb2dTZXJ2aWNlIH0gZnJvbSAnLi4vbG9nZ2VyLXNlcnZpY2UvbG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUtc2VydmljZS9zdG9yZS5zZXJ2aWNlJztcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJy4uL2NhY2hlLXNlcnZpY2UvY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJy4uLy4uL2NvbmZpZy9sb2NhbC1zdG9yYWdlLmNvbmZpZyc7XG5cbi8vIENJREFBUyBDb25maSBEYXRhXG5pbXBvcnQgeyBsb2dpbkRlc2lnbiwgYm9keVBhcmFtLCByZWdpc3RlckRlc2lnbiwgdXNlck9iamVjdCB9IGZyb20gJy4uLy4uL2NvbmZpZy9jaWRhYXMuY29uZmlnJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9jb25maWctc2VydmljZS9jb25maWctc2VydmljZSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2luU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9nU2VydmljZTogTG9nU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZVNlcnZpY2U6IFN0b3JlU2VydmljZSxcbiAgICBwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ1NFUlZJQ0VfQ09ORklHJykgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueVxuICApIHsgfVxuICBvYXV0aDogT2F1dGg7XG4gIC8vIGNpZGFhc1BhcmFtID0geyBjbGllbnRJZDogQ2lkYWFzUHJvdmlkZXIuQ0xJRU5UX0lEIH07XG4gIGNpZGFhc1BhcmFtID0geyBjbGllbnRJZDogdGhpcy5jb25maWd1cmF0aW9uLmNpZGFhc0NvbmZpZy5jaWRhYXNDbGllbnRJZCB9O1xuICBjaWRhYXNSZWdpc3RlclByb3ZpZGVyID0gdGhpcy5jb25maWd1cmF0aW9uLmNpZGFhc0NvbmZpZy5jaWRhYXNSZWdpc3RlclByb3ZpZGVyO1xuICBjaWRhYXNMb2dpblByb3ZpZGVyID0gdGhpcy5jb25maWd1cmF0aW9uLmNpZGFhc0NvbmZpZy5jaWRhYXNMb2dpblByb3ZpZGVyO1xuICBjaWRhYXNMb2dpbkRlc2lnbiA9IHRoaXMuY29uZmlndXJhdGlvbi5jaWRhYXNDb25maWcuY2lkYWFzTG9naW5EZXNpZ247XG4gIGNpZGFhc1JlZ2lzdGVyRGVzaWduID0gdGhpcy5jb25maWd1cmF0aW9uLmNpZGFhc0NvbmZpZy5jaWRhYXNSZWdpc3RlckRlc2lnbjtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgQ0lEQUFTIEF1dGhlbnRpY2F0aW9uIG1haW4gZnVuY3Rpb25cbiAgICogQHBhcmFtIGFjdGlvblR5cGUgaXMgdGhlIHN0cmluZyB3aGljaCBpbmRpY2F0ZXMgdGhlIHR5cGUgb2YgYWN0aW9uIHdoZXRoZXIgaXQgaXMgbG9naW4gb3IgcmVnaXN0ZXJcbiAgICogQHBhcmFtIHBsYXRmb3JtIGlzIHVzZWQgdG8gZGVmaW5lIHRoZSBwbGF0Zm9ybSB0byB1c2UuIERlZmF1bHQgdmFsdWUgaXMgYnJvd3NlclxuICAgKi9cbiAgYXN5bmMgY2lkYWFzQXV0aChhY3Rpb25UeXBlLCBwbGF0Zm9ybSA9ICdicm93c2VyJykge1xuICAgIGFjdGlvblR5cGUgPSBhY3Rpb25UeXBlLnRyaW0oKTtcbiAgICBsZXQgcHJvdmlkZXI7XG4gICAgaWYgKGFjdGlvblR5cGUgPT09ICdyZWdpc3RlciB0b2tlbicpIHtcbiAgICAgIC8vIHByb3ZpZGVyID0gbmV3IENpZGFhc1Byb3ZpZGVyKHsgLi4udGhpcy5jaWRhYXNQYXJhbSwgLi4uY2lkYWFzUmVnaXN0ZXJQcm92aWRlciB9KTtcbiAgICAgIHByb3ZpZGVyID0gbmV3IENpZGFhc1Byb3ZpZGVyKHsgLi4udGhpcy5jaWRhYXNQYXJhbSwgLi4udGhpcy5jaWRhYXNSZWdpc3RlclByb3ZpZGVyIH0pO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uVHlwZSA9PT0gJ2xvZ2luIHRva2VuJykge1xuICAgICAgLy8gcHJvdmlkZXIgPSBuZXcgQ2lkYWFzUHJvdmlkZXIoeyAuLi50aGlzLmNpZGFhc1BhcmFtLCAuLi5jaWRhYXNMb2dpblByb3ZpZGVyIH0pO1xuICAgICAgcHJvdmlkZXIgPSBuZXcgQ2lkYWFzUHJvdmlkZXIoeyAuLi50aGlzLmNpZGFhc1BhcmFtLCAuLi50aGlzLmNpZGFhc0xvZ2luUHJvdmlkZXIgfSk7XG4gICAgfVxuICAgIGNvbnN0IHBrY2VCb2R5OiBJVG9rZW5FbmRwb2ludEJvZHkgPSB7XG4gICAgICBncmFudF90eXBlOiBib2R5UGFyYW0uZ3JhbnRfdHlwZSxcbiAgICAgIGNsaWVudF9pZDogcHJvdmlkZXIub3B0aW9ucy5jbGllbnRJZCxcbiAgICAgIHJlZGlyZWN0X3VyaTogcHJvdmlkZXIub3B0aW9ucy5yZWRpcmVjdFVyaSxcbiAgICAgIGNvZGVfdmVyaWZpZXI6IENpZGFhc1Byb3ZpZGVyLmJhc2U2NFVSTEVuY29kZShcbiAgICAgICAgcHJvdmlkZXIub3B0aW9ucy5jb2RlX2NoYWxsZW5nZVxuICAgICAgKVxuICAgIH07XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnVEVTVCBDT05GSSBTRVJWSUNFID0gJywgKyB0aGlzLmNvbmZpZ1NlcnZpY2UuY29uZmlndXJhdGlvbik7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygncGtjZUJvZHkgcmVxdWlyZWQgZm9yIGxvZ2luID0gJyArIHBrY2VCb2R5KTtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdwcm92aWRlciBib2R5IHJlcXVpcmVkIGZvciBsb2dpbiA9JyArIHByb3ZpZGVyKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGNvbnN0IHJlcyA9IHVzZXJPYmplY3Q7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMubG9naW4ocHJvdmlkZXIsIHBrY2VCb2R5LCBhY3Rpb25UeXBlLCBwbGF0Zm9ybSk7XG4gICAgICBpZiAocmVzdWx0LmFjY2Vzc190b2tlbiA9PT0gJycgfHwgcmVzdWx0LmFjY2Vzc190b2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfZSgnbG9naW4gZmFpbGVkID09ICcpO1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nX2UocmVzdWx0KTtcbiAgICAgICAgcmVzLm1lc3NhZ2UgPSAnbG9naW4gRmFpbGVkJztcbiAgICAgICAgcmVzLnN0YXR1cyA9ICcxJztcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2xvZ2luIHN1Y2Nlc3NGdWxsID09ICcpO1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKHJlc3VsdCk7XG4gICAgICAgIHJlcy5tZXNzYWdlID0gJ2xvZ2luIHN1Y2Nlc3MnO1xuICAgICAgICByZXMuc3RhdHVzID0gJzAnO1xuICAgICAgICByZXMuYWNjZXNzVG9rZW4gPSByZXN1bHQuYWNjZXNzX3Rva2VuO1xuICAgICAgICByZXMucmVmcmVzaFRva2VuID0gcmVzdWx0LnJlZnJlc2hfdG9rZW47XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvd0Vycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGlzIGxvZ291dCBmdW5jdGlvblxuICAgKiBAZGVzY3JpcHRpb24gaXQgd2lsbCByZW1vdmUgdXNlckRhdGEgZnJvbSBsb2NhbCBzdG9yYWdlIGFuZCBzdG9yZVxuICAgKi9cbiAgYXN5bmMgY2lkYWFzTG9nb3V0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnN0b3JlU2VydmljZS5kaXNwYXRjaFVzZXJEYXRhKHt9KTtcbiAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnJlbW92ZUxvY2FsRGF0YSh1c2VyRGF0YSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93RXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgTG9naW4gZnVuY3Rpb24gdG8gY2FsbCBvYXV0aCBsb2dpblZpYSBBUElcbiAgICogQHBhcmFtIHByb3ZpZGVyIGlzIHRoZSBDSURBQVMgcHJvdmlkZXIgb2JqZWN0XG4gICAqIEBwYXJhbSBwa2NlQm9keSBpcyB0aGUgSVRva2VuRW5kcG9pbnRCb2R5IG9iamVjdFxuICAgKiBAcGFyYW0gYWN0aW9uVHlwZSBpdCBpcyBpZGVudGlmaWVyIGZvciB0aGUgQVBJIGFjdGlvbiB3aGV0aGVyIGl0IGlzIGZvciBsb2dpbi9yZWdpc3RlclxuICAgKi9cbiAgYXN5bmMgbG9naW4ocHJvdmlkZXIsIHBrY2VCb2R5LCBhY3Rpb25UeXBlLCBwbGF0Zm9ybSkge1xuICAgIGxldCByZXM6IGFueTtcbiAgICBpZiAocGxhdGZvcm0gPT09ICdicm93c2VyJykge1xuICAgICAgdGhpcy5vYXV0aCA9IG5ldyBPYXV0aEJyb3dzZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vYXV0aCA9IG5ldyBPYXV0aENvcmRvdmEoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2lkYWFzTG9naW5EZXNpZ24gPT09IHVuZGVmaW5lZCB8fCBPYmplY3Qua2V5cyh0aGlzLmNpZGFhc0xvZ2luRGVzaWduKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuY2lkYWFzTG9naW5EZXNpZ24gPSBsb2dpbkRlc2lnbjtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2lkYWFzUmVnaXN0ZXJEZXNpZ24gPT09IHVuZGVmaW5lZCB8fCBPYmplY3Qua2V5cyh0aGlzLmNpZGFhc1JlZ2lzdGVyRGVzaWduKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuY2lkYWFzUmVnaXN0ZXJEZXNpZ24gPSByZWdpc3RlckRlc2lnbjtcbiAgICB9XG4gICAgaWYgKGFjdGlvblR5cGUgPT09ICdyZWdpc3RlciB0b2tlbicpIHtcbiAgICAgIHJlcyA9IGF3YWl0IHRoaXMub2F1dGgubG9nSW5WaWEocHJvdmlkZXIsIHRoaXMuY2lkYWFzTG9naW5EZXNpZ24pO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uVHlwZSA9PT0gJ2xvZ2luIHRva2VuJykge1xuICAgICAgcmVzID0gYXdhaXQgdGhpcy5vYXV0aC5sb2dJblZpYShwcm92aWRlciwgdGhpcy5jaWRhYXNSZWdpc3RlckRlc2lnbik7XG4gICAgfVxuXG4gICAgaWYgKCEhcmVzKSB7XG4gICAgICBwa2NlQm9keS5jb2RlID0gcmVzLmNvZGU7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5hdXRoU2VydmljZS5vQXV0aENhbGxiYWNrKHBrY2VCb2R5LCBhY3Rpb25UeXBlKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICB9XG59XG4iXX0=