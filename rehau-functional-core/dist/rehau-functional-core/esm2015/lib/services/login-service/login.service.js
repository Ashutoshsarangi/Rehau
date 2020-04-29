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
export class LoginService {
    /**
     * @param {?} authService
     * @param {?} logService
     * @param {?} configService
     * @param {?} storeService
     * @param {?} cacheService
     * @param {?} configuration
     */
    constructor(authService, logService, configService, storeService, cacheService, configuration) {
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
     * \@description This is CIDAAS Authentication main function
     * @param {?} actionType is the string which indicates the type of action whether it is login or register
     * @param {?=} platform is used to define the platform to use. Default value is browser
     * @return {?}
     */
    cidaasAuth(actionType, platform = 'browser') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            actionType = actionType.trim();
            /** @type {?} */
            let provider;
            if (actionType === 'register token') {
                // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasRegisterProvider });
                provider = new CidaasProvider(Object.assign({}, this.cidaasParam, this.cidaasRegisterProvider));
            }
            else if (actionType === 'login token') {
                // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasLoginProvider });
                provider = new CidaasProvider(Object.assign({}, this.cidaasParam, this.cidaasLoginProvider));
            }
            /** @type {?} */
            const pkceBody = {
                grant_type: bodyParam.grant_type,
                client_id: provider.options.clientId,
                redirect_uri: provider.options.redirectUri,
                code_verifier: CidaasProvider.base64URLEncode(provider.options.code_challenge)
            };
            this.logService.log('TEST CONFI SERVICE = ', +this.configService.configuration);
            this.logService.log('pkceBody required for login = ' + pkceBody);
            this.logService.log('provider body required for login =' + provider);
            /** @type {?} */
            let result;
            /** @type {?} */
            const res = userObject;
            try {
                result = yield this.login(provider, pkceBody, actionType, platform);
                if (result.access_token === '' || result.access_token === undefined) {
                    this.logService.log_e('login failed == ');
                    this.logService.log_e(result);
                    res.message = 'login Failed';
                    res.status = '1';
                    return res;
                }
                else {
                    this.logService.log('login successFull == ');
                    this.logService.log(result);
                    res.message = 'login success';
                    res.status = '0';
                    res.accessToken = result.access_token;
                    res.refreshToken = result.refresh_token;
                    return res;
                }
            }
            catch (err) {
                throwError(err);
            }
        });
    }
    /**
     * \@description This is logout function / it will remove userData from local storage and store
     * @return {?}
     */
    cidaasLogout() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.storeService.dispatchUserData({});
                this.cacheService.removeLocalData(userData);
                return true;
            }
            catch (err) {
                throwError(err);
            }
        });
    }
    /**
     * \@description This is Login function to call oauth loginVia API
     * @param {?} provider is the CIDAAS provider object
     * @param {?} pkceBody is the ITokenEndpointBody object
     * @param {?} actionType it is identifier for the API action whether it is for login/register
     * @param {?} platform
     * @return {?}
     */
    login(provider, pkceBody, actionType, platform) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let res;
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
            if (actionType === 'register token') {
                res = yield this.oauth.logInVia(provider, this.cidaasLoginDesign);
            }
            else if (actionType === 'login token') {
                res = yield this.oauth.logInVia(provider, this.cidaasRegisterDesign);
            }
            if (!!res) {
                pkceBody.code = res.code;
                /** @type {?} */
                const data = yield this.authService.oAuthCallback(pkceBody, actionType);
                return data;
            }
        });
    }
}
LoginService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LoginService.ctorParameters = () => [
    { type: AuthService },
    { type: LogService },
    { type: ConfigService },
    { type: StoreService },
    { type: CacheService },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sb2dpbi1zZXJ2aWNlL2xvZ2luLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBR25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVqRSxPQUFPLEVBQVMsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBRzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUlqRSxNQUFNLE9BQU8sWUFBWTs7Ozs7Ozs7O0lBQ3ZCLFlBQ1UsV0FBd0IsRUFDeEIsVUFBc0IsRUFDdEIsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsWUFBMEIsRUFDRCxhQUFrQjtRQUwzQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFj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QUFjLENBQUM7YUFDNUM7WUFDRCxJQUFJLFVBQVUsS0FBSyxnQkFBZ0IsRUFBRTtnQkFDbkMsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ25FO2lCQUFNLElBQUksVUFBVSxLQUFLLGFBQWEsRUFBRTtnQkFDdkMsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQ3RFO1lBRUQsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUNULFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQzs7c0JBQ25CLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7Z0JBQ3ZFLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFFSCxDQUFDO0tBQUE7OztZQWpIRixVQUFVOzs7O1lBWkYsV0FBVztZQUNYLFVBQVU7WUFRVixhQUFhO1lBUGIsWUFBWTtZQUNaLFlBQVk7NENBaUJoQixNQUFNLFNBQUMsZ0JBQWdCOzs7O0lBRTFCLDZCQUFhOztJQUViLG1DQUEyRTs7SUFDM0UsOENBQWdGOztJQUNoRiwyQ0FBMEU7O0lBQzFFLHlDQUFzRTs7SUFDdEUsNENBQTRFOzs7OztJQWIxRSxtQ0FBZ0M7Ozs7O0lBQ2hDLGtDQUE4Qjs7Ozs7SUFDOUIscUNBQW9DOzs7OztJQUNwQyxvQ0FBa0M7Ozs7O0lBQ2xDLG9DQUFrQzs7SUFDbEMscUNBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSU9OSUMgLSBBTkdVTEFSXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gSW1wb3J0aW5nIENJREFBUyBQcm92aWRlclxuaW1wb3J0IHsgQ2lkYWFzUHJvdmlkZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY2lkYWFzLnByb3ZpZGVyJztcbmltcG9ydCB7IElUb2tlbkVuZHBvaW50Qm9keSB9IGZyb20gJy4uLy4uL21vZGVscy9jaWRhYXMubW9kZWwnO1xuaW1wb3J0IHsgT2F1dGgsIE9hdXRoQnJvd3NlciwgT2F1dGhDb3Jkb3ZhIH0gZnJvbSAnaW9uaWMtY29yZG92YS1vYXV0aCc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2F1dGgtc2VydmljZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JlU2VydmljZSB9IGZyb20gJy4uL3N0b3JlLXNlcnZpY2Uvc3RvcmUuc2VydmljZSc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi9jYWNoZS1zZXJ2aWNlL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICcuLi8uLi9jb25maWcvbG9jYWwtc3RvcmFnZS5jb25maWcnO1xuXG4vLyBDSURBQVMgQ29uZmkgRGF0YVxuaW1wb3J0IHsgbG9naW5EZXNpZ24sIGJvZHlQYXJhbSwgcmVnaXN0ZXJEZXNpZ24sIHVzZXJPYmplY3QgfSBmcm9tICcuLi8uLi9jb25maWcvY2lkYWFzLmNvbmZpZyc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlnLXNlcnZpY2UvY29uZmlnLXNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpblNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIGxvZ1NlcnZpY2U6IExvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RvcmVTZXJ2aWNlOiBTdG9yZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZSxcbiAgICBASW5qZWN0KCdTRVJWSUNFX0NPTkZJRycpIHB1YmxpYyBjb25maWd1cmF0aW9uOiBhbnlcbiAgKSB7IH1cbiAgb2F1dGg6IE9hdXRoO1xuICAvLyBjaWRhYXNQYXJhbSA9IHsgY2xpZW50SWQ6IENpZGFhc1Byb3ZpZGVyLkNMSUVOVF9JRCB9O1xuICBjaWRhYXNQYXJhbSA9IHsgY2xpZW50SWQ6IHRoaXMuY29uZmlndXJhdGlvbi5jaWRhYXNDb25maWcuY2lkYWFzQ2xpZW50SWQgfTtcbiAgY2lkYWFzUmVnaXN0ZXJQcm92aWRlciA9IHRoaXMuY29uZmlndXJhdGlvbi5jaWRhYXNDb25maWcuY2lkYWFzUmVnaXN0ZXJQcm92aWRlcjtcbiAgY2lkYWFzTG9naW5Qcm92aWRlciA9IHRoaXMuY29uZmlndXJhdGlvbi5jaWRhYXNDb25maWcuY2lkYWFzTG9naW5Qcm92aWRlcjtcbiAgY2lkYWFzTG9naW5EZXNpZ24gPSB0aGlzLmNvbmZpZ3VyYXRpb24uY2lkYWFzQ29uZmlnLmNpZGFhc0xvZ2luRGVzaWduO1xuICBjaWRhYXNSZWdpc3RlckRlc2lnbiA9IHRoaXMuY29uZmlndXJhdGlvbi5jaWRhYXNDb25maWcuY2lkYWFzUmVnaXN0ZXJEZXNpZ247XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGlzIENJREFBUyBBdXRoZW50aWNhdGlvbiBtYWluIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBhY3Rpb25UeXBlIGlzIHRoZSBzdHJpbmcgd2hpY2ggaW5kaWNhdGVzIHRoZSB0eXBlIG9mIGFjdGlvbiB3aGV0aGVyIGl0IGlzIGxvZ2luIG9yIHJlZ2lzdGVyXG4gICAqIEBwYXJhbSBwbGF0Zm9ybSBpcyB1c2VkIHRvIGRlZmluZSB0aGUgcGxhdGZvcm0gdG8gdXNlLiBEZWZhdWx0IHZhbHVlIGlzIGJyb3dzZXJcbiAgICovXG4gIGFzeW5jIGNpZGFhc0F1dGgoYWN0aW9uVHlwZSwgcGxhdGZvcm0gPSAnYnJvd3NlcicpIHtcbiAgICBhY3Rpb25UeXBlID0gYWN0aW9uVHlwZS50cmltKCk7XG4gICAgbGV0IHByb3ZpZGVyO1xuICAgIGlmIChhY3Rpb25UeXBlID09PSAncmVnaXN0ZXIgdG9rZW4nKSB7XG4gICAgICAvLyBwcm92aWRlciA9IG5ldyBDaWRhYXNQcm92aWRlcih7IC4uLnRoaXMuY2lkYWFzUGFyYW0sIC4uLmNpZGFhc1JlZ2lzdGVyUHJvdmlkZXIgfSk7XG4gICAgICBwcm92aWRlciA9IG5ldyBDaWRhYXNQcm92aWRlcih7IC4uLnRoaXMuY2lkYWFzUGFyYW0sIC4uLnRoaXMuY2lkYWFzUmVnaXN0ZXJQcm92aWRlciB9KTtcbiAgICB9IGVsc2UgaWYgKGFjdGlvblR5cGUgPT09ICdsb2dpbiB0b2tlbicpIHtcbiAgICAgIC8vIHByb3ZpZGVyID0gbmV3IENpZGFhc1Byb3ZpZGVyKHsgLi4udGhpcy5jaWRhYXNQYXJhbSwgLi4uY2lkYWFzTG9naW5Qcm92aWRlciB9KTtcbiAgICAgIHByb3ZpZGVyID0gbmV3IENpZGFhc1Byb3ZpZGVyKHsgLi4udGhpcy5jaWRhYXNQYXJhbSwgLi4udGhpcy5jaWRhYXNMb2dpblByb3ZpZGVyIH0pO1xuICAgIH1cbiAgICBjb25zdCBwa2NlQm9keTogSVRva2VuRW5kcG9pbnRCb2R5ID0ge1xuICAgICAgZ3JhbnRfdHlwZTogYm9keVBhcmFtLmdyYW50X3R5cGUsXG4gICAgICBjbGllbnRfaWQ6IHByb3ZpZGVyLm9wdGlvbnMuY2xpZW50SWQsXG4gICAgICByZWRpcmVjdF91cmk6IHByb3ZpZGVyLm9wdGlvbnMucmVkaXJlY3RVcmksXG4gICAgICBjb2RlX3ZlcmlmaWVyOiBDaWRhYXNQcm92aWRlci5iYXNlNjRVUkxFbmNvZGUoXG4gICAgICAgIHByb3ZpZGVyLm9wdGlvbnMuY29kZV9jaGFsbGVuZ2VcbiAgICAgIClcbiAgICB9O1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ1RFU1QgQ09ORkkgU0VSVklDRSA9ICcsICsgdGhpcy5jb25maWdTZXJ2aWNlLmNvbmZpZ3VyYXRpb24pO1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ3BrY2VCb2R5IHJlcXVpcmVkIGZvciBsb2dpbiA9ICcgKyBwa2NlQm9keSk7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygncHJvdmlkZXIgYm9keSByZXF1aXJlZCBmb3IgbG9naW4gPScgKyBwcm92aWRlcik7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBjb25zdCByZXMgPSB1c2VyT2JqZWN0O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLmxvZ2luKHByb3ZpZGVyLCBwa2NlQm9keSwgYWN0aW9uVHlwZSwgcGxhdGZvcm0pO1xuICAgICAgaWYgKHJlc3VsdC5hY2Nlc3NfdG9rZW4gPT09ICcnIHx8IHJlc3VsdC5hY2Nlc3NfdG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nX2UoJ2xvZ2luIGZhaWxlZCA9PSAnKTtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ19lKHJlc3VsdCk7XG4gICAgICAgIHJlcy5tZXNzYWdlID0gJ2xvZ2luIEZhaWxlZCc7XG4gICAgICAgIHJlcy5zdGF0dXMgPSAnMSc7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdsb2dpbiBzdWNjZXNzRnVsbCA9PSAnKTtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZyhyZXN1bHQpO1xuICAgICAgICByZXMubWVzc2FnZSA9ICdsb2dpbiBzdWNjZXNzJztcbiAgICAgICAgcmVzLnN0YXR1cyA9ICcwJztcbiAgICAgICAgcmVzLmFjY2Vzc1Rva2VuID0gcmVzdWx0LmFjY2Vzc190b2tlbjtcbiAgICAgICAgcmVzLnJlZnJlc2hUb2tlbiA9IHJlc3VsdC5yZWZyZXNoX3Rva2VuO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3dFcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBpcyBsb2dvdXQgZnVuY3Rpb25cbiAgICogQGRlc2NyaXB0aW9uIGl0IHdpbGwgcmVtb3ZlIHVzZXJEYXRhIGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgc3RvcmVcbiAgICovXG4gIGFzeW5jIGNpZGFhc0xvZ291dCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zdG9yZVNlcnZpY2UuZGlzcGF0Y2hVc2VyRGF0YSh7fSk7XG4gICAgICB0aGlzLmNhY2hlU2VydmljZS5yZW1vdmVMb2NhbERhdGEodXNlckRhdGEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvd0Vycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGlzIExvZ2luIGZ1bmN0aW9uIHRvIGNhbGwgb2F1dGggbG9naW5WaWEgQVBJXG4gICAqIEBwYXJhbSBwcm92aWRlciBpcyB0aGUgQ0lEQUFTIHByb3ZpZGVyIG9iamVjdFxuICAgKiBAcGFyYW0gcGtjZUJvZHkgaXMgdGhlIElUb2tlbkVuZHBvaW50Qm9keSBvYmplY3RcbiAgICogQHBhcmFtIGFjdGlvblR5cGUgaXQgaXMgaWRlbnRpZmllciBmb3IgdGhlIEFQSSBhY3Rpb24gd2hldGhlciBpdCBpcyBmb3IgbG9naW4vcmVnaXN0ZXJcbiAgICovXG4gIGFzeW5jIGxvZ2luKHByb3ZpZGVyLCBwa2NlQm9keSwgYWN0aW9uVHlwZSwgcGxhdGZvcm0pIHtcbiAgICBsZXQgcmVzOiBhbnk7XG4gICAgaWYgKHBsYXRmb3JtID09PSAnYnJvd3NlcicpIHtcbiAgICAgIHRoaXMub2F1dGggPSBuZXcgT2F1dGhCcm93c2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2F1dGggPSBuZXcgT2F1dGhDb3Jkb3ZhKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNpZGFhc0xvZ2luRGVzaWduID09PSB1bmRlZmluZWQgfHwgT2JqZWN0LmtleXModGhpcy5jaWRhYXNMb2dpbkRlc2lnbikubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmNpZGFhc0xvZ2luRGVzaWduID0gbG9naW5EZXNpZ247XG4gICAgfVxuICAgIGlmICh0aGlzLmNpZGFhc1JlZ2lzdGVyRGVzaWduID09PSB1bmRlZmluZWQgfHwgT2JqZWN0LmtleXModGhpcy5jaWRhYXNSZWdpc3RlckRlc2lnbikubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmNpZGFhc1JlZ2lzdGVyRGVzaWduID0gcmVnaXN0ZXJEZXNpZ247XG4gICAgfVxuICAgIGlmIChhY3Rpb25UeXBlID09PSAncmVnaXN0ZXIgdG9rZW4nKSB7XG4gICAgICByZXMgPSBhd2FpdCB0aGlzLm9hdXRoLmxvZ0luVmlhKHByb3ZpZGVyLCB0aGlzLmNpZGFhc0xvZ2luRGVzaWduKTtcbiAgICB9IGVsc2UgaWYgKGFjdGlvblR5cGUgPT09ICdsb2dpbiB0b2tlbicpIHtcbiAgICAgIHJlcyA9IGF3YWl0IHRoaXMub2F1dGgubG9nSW5WaWEocHJvdmlkZXIsIHRoaXMuY2lkYWFzUmVnaXN0ZXJEZXNpZ24pO1xuICAgIH1cblxuICAgIGlmICghIXJlcykge1xuICAgICAgcGtjZUJvZHkuY29kZSA9IHJlcy5jb2RlO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuYXV0aFNlcnZpY2Uub0F1dGhDYWxsYmFjayhwa2NlQm9keSwgYWN0aW9uVHlwZSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgfVxufVxuIl19