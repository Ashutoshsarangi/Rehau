/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retryBackoff } from 'backoff-rxjs';
import { timeout } from 'rxjs/operators';
import { LogService } from '../logger-service/logger.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../logger-service/logger.service";
var WebService = /** @class */ (function () {
    function WebService(http, logService, configuration) {
        this.http = http;
        this.logService = logService;
        this.configuration = configuration;
        this.BASE_URL = this.configuration.globalConfig.BASE_URL;
    }
    // getApi(), postApi() are responsible for Main Api cals depending on the Http methods
    // /**
    //  * @description This method is for Get Api Calls
    //  * @param endPoint String Just need to pass the Endpoint
    //  * @returns This function returns the respective response from the Api
    //  */
    // getApi(endPoint, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.get(this.BASE_URL + endPoint).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.get(this.BASE_URL + endPoint);
    //   }
    // }
    /**
     * @description This method is for Post Api calls
     * @param endPoint String Api Endpoint need to pass
     * @param data Object required for the Post request
     * @returns Return the respective responce from the Apis.
     */
    // postApi(endPoint, data, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.post(this.BASE_URL + endPoint, data).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.post(this.BASE_URL + endPoint, data);
    //   }
    // }
    /**
     * @description This method is for Get Api Calls
     * @param url String url for the API
     * @param httpOptions header part is optional
     * @param retryConfig is the object if want to hit API multiple time after failure
     * @returns This function returns the respective response from the Api
     */
    // getApi(), postApi() are responsible for Main Api cals depending on the Http methods
    // /**
    //  * @description This method is for Get Api Calls
    //  * @param endPoint String Just need to pass the Endpoint
    //  * @returns This function returns the respective response from the Api
    //  */
    // getApi(endPoint, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.get(this.BASE_URL + endPoint).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.get(this.BASE_URL + endPoint);
    //   }
    // }
    /**
       * @description This method is for Post Api calls
       * @param endPoint String Api Endpoint need to pass
       * @param data Object required for the Post request
       * @returns Return the respective responce from the Apis.
       */
    // postApi(endPoint, data, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.post(this.BASE_URL + endPoint, data).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.post(this.BASE_URL + endPoint, data);
    //   }
    // }
    /**
     * \@description This method is for Get Api Calls
     * @param {?} url String url for the API
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} This function returns the respective response from the Api
     */
    WebService.prototype.getApi = 
    // getApi(), postApi() are responsible for Main Api cals depending on the Http methods
    // /**
    //  * @description This method is for Get Api Calls
    //  * @param endPoint String Just need to pass the Endpoint
    //  * @returns This function returns the respective response from the Api
    //  */
    // getApi(endPoint, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.get(this.BASE_URL + endPoint).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.get(this.BASE_URL + endPoint);
    //   }
    // }
    /**
       * @description This method is for Post Api calls
       * @param endPoint String Api Endpoint need to pass
       * @param data Object required for the Post request
       * @returns Return the respective responce from the Apis.
       */
    // postApi(endPoint, data, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.post(this.BASE_URL + endPoint, data).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.post(this.BASE_URL + endPoint, data);
    //   }
    // }
    /**
     * \@description This method is for Get Api Calls
     * @param {?} url String url for the API
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} This function returns the respective response from the Api
     */
    function (url, httpOptions, retryConfig) {
        var _this = this;
        if (httpOptions === void 0) { httpOptions = {}; }
        if (retryConfig === void 0) { retryConfig = {}; }
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.get(url, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.logService.log_w('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                function (iteration, initialInterval) {
                    return Math.pow(1.5, iteration) * initialInterval;
                })
            }));
        }
        else {
            return this.http.get(url, httpOptions);
        }
    };
    /**
     * This method is for Post Api calls
     * @param url String Api URL
     * @param requestBody Object required for the Post request
     * @param httpOptions header part is optional
     * @param retryConfig is the object if want to hit API multiple time after failure
     * @returns Return the respective responce from the Apis.
     */
    /**
     * This method is for Post Api calls
     * @param {?} url String Api URL
     * @param {?} requestBody Object required for the Post request
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} Return the respective responce from the Apis.
     */
    WebService.prototype.postApi = /**
     * This method is for Post Api calls
     * @param {?} url String Api URL
     * @param {?} requestBody Object required for the Post request
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} Return the respective responce from the Apis.
     */
    function (url, requestBody, httpOptions, retryConfig) {
        if (httpOptions === void 0) { httpOptions = {}; }
        if (retryConfig === void 0) { retryConfig = {}; }
        console.log(url, 'url');
        console.log(requestBody, 'requestBody');
        console.log(httpOptions, 'httpOptions');
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.post(url, requestBody, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.log('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                function (iteration, initialInterval) {
                    return Math.pow(1.5, iteration) * initialInterval;
                })
            }));
        }
        else {
            return this.http.post(url, requestBody, httpOptions);
        }
    };
    /**
     * This method is for Request Api calls
     * @param method String method need to pass in request API
     * @param url String API URL
     * @param httpOptions header details is optional
     * @param retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @returns Return the respective responce from the Apis.
     */
    /**
     * This method is for Request Api calls
     * @param {?} method String method need to pass in request API
     * @param {?} url String API URL
     * @param {?} httpOptions header details is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @return {?} Return the respective responce from the Apis.
     */
    WebService.prototype.requestApi = /**
     * This method is for Request Api calls
     * @param {?} method String method need to pass in request API
     * @param {?} url String API URL
     * @param {?} httpOptions header details is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @return {?} Return the respective responce from the Apis.
     */
    function (method, url, httpOptions, retryConfig) {
        if (retryConfig === void 0) { retryConfig = {}; }
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.request(method, url, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    // this.logService.log_w('Aborted remote request');
                    console.log('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                function (iteration, initialInterval) {
                    return Math.pow(1.5, iteration) * initialInterval;
                })
            }));
        }
        else {
            return this.http.post(method, url, httpOptions);
            // return this.postApi(url, {}, httpOptions);
        }
    };
    WebService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WebService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: LogService },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    /** @nocollapse */ WebService.ngInjectableDef = i0.defineInjectable({ factory: function WebService_Factory() { return new WebService(i0.inject(i1.HttpClient), i0.inject(i2.LogService), i0.inject("SERVICE_CONFIG")); }, token: WebService, providedIn: "root" });
    return WebService;
}());
export { WebService };
if (false) {
    /** @type {?} */
    WebService.prototype.BASE_URL;
    /**
     * @type {?}
     * @private
     */
    WebService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    WebService.prototype.logService;
    /** @type {?} */
    WebService.prototype.configuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvd2ViLXNlcnZpY2Uvd2ViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFHOUQ7SUFLRSxvQkFDVSxJQUFnQixFQUNoQixVQUFzQixFQUNHLGFBQWtCO1FBRjNDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNHLGtCQUFhLEdBQWIsYUFBYSxDQUFLO1FBR3JELGFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFGaEQsQ0FBQztJQUdMLHNGQUFzRjtJQUV0RixNQUFNO0lBQ04sbURBQW1EO0lBQ25ELDJEQUEyRDtJQUMzRCx5RUFBeUU7SUFDekUsTUFBTTtJQUNOLDZEQUE2RDtJQUM3RCxpREFBaUQ7SUFDakQsMkRBQTJEO0lBQzNELDBDQUEwQztJQUMxQyx1QkFBdUI7SUFDdkIsc0RBQXNEO0lBQ3RELGlEQUFpRDtJQUNqRCwrQ0FBK0M7SUFDL0Msa0NBQWtDO0lBQ2xDLDZEQUE2RDtJQUM3RCx5QkFBeUI7SUFDekIsYUFBYTtJQUNiLHdEQUF3RDtJQUN4RCx1REFBdUQ7SUFDdkQsV0FBVztJQUNYLFNBQVM7SUFDVCxhQUFhO0lBQ2Isc0RBQXNEO0lBQ3RELE1BQU07SUFDTixJQUFJO0lBRUo7Ozs7O09B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O2dCQUExQyxDQUEwQyxDQUFBO2FBQzdDLENBQUMsQ0FDSCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNoRCw2Q0FBNkM7U0FDOUM7SUFDSCxDQUFDOztnQkFoS0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFUUSxVQUFVO2dCQUlWLFVBQVU7Z0RBV2QsTUFBTSxTQUFDLGdCQUFnQjs7O3FCQWhCNUI7Q0EwS0MsQUFsS0QsSUFrS0M7U0EvSlksVUFBVTs7O0lBUXJCLDhCQUFvRDs7Ozs7SUFMbEQsMEJBQXdCOzs7OztJQUN4QixnQ0FBOEI7O0lBQzlCLG1DQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHJldHJ5QmFja29mZiB9IGZyb20gJ2JhY2tvZmYtcnhqcyc7XG5pbXBvcnQgeyB0aW1lb3V0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBXZWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ1NFUlZJQ0VfQ09ORklHJykgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueSxcbiAgKSB7IH1cblxuICBCQVNFX1VSTCA9IHRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcuQkFTRV9VUkw7XG4gIC8vIGdldEFwaSgpLCBwb3N0QXBpKCkgYXJlIHJlc3BvbnNpYmxlIGZvciBNYWluIEFwaSBjYWxzIGRlcGVuZGluZyBvbiB0aGUgSHR0cCBtZXRob2RzXG5cbiAgLy8gLyoqXG4gIC8vICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyBmb3IgR2V0IEFwaSBDYWxsc1xuICAvLyAgKiBAcGFyYW0gZW5kUG9pbnQgU3RyaW5nIEp1c3QgbmVlZCB0byBwYXNzIHRoZSBFbmRwb2ludFxuICAvLyAgKiBAcmV0dXJucyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlc3BlY3RpdmUgcmVzcG9uc2UgZnJvbSB0aGUgQXBpXG4gIC8vICAqL1xuICAvLyBnZXRBcGkoZW5kUG9pbnQsIHJldHJ5Q29uZmlnOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgaWYgKE9iamVjdC5rZXlzKHJldHJ5Q29uZmlnKS5sZW5ndGggIT09IDApIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuQkFTRV9VUkwgKyBlbmRQb2ludCkucGlwZShcbiAgLy8gICAgICAgdGltZW91dChyZXRyeUNvbmZpZy5SRVFfVElNRU9VVCksXG4gIC8vICAgICAgIHJldHJ5QmFja29mZih7XG4gIC8vICAgICAgICAgaW5pdGlhbEludGVydmFsOiByZXRyeUNvbmZpZy5JTklUX0lOVEVSVkFMLFxuICAvLyAgICAgICAgIG1heEludGVydmFsOiByZXRyeUNvbmZpZy5NQVhfSU5URVJWQUwsXG4gIC8vICAgICAgICAgbWF4UmV0cmllczogcmV0cnlDb25maWcuTUFYX1JFVFJJRVMsXG4gIC8vICAgICAgICAgc2hvdWxkUmV0cnk6IGVycm9yID0+IHtcbiAgLy8gICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfdygnQWJvcnRlZCByZW1vdGUgcmVxdWVzdCcpO1xuICAvLyAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gIC8vICAgICAgICAgfSxcbiAgLy8gICAgICAgICBiYWNrb2ZmRGVsYXk6IChpdGVyYXRpb24sIGluaXRpYWxJbnRlcnZhbCkgPT5cbiAgLy8gICAgICAgICAgIE1hdGgucG93KDEuNSwgaXRlcmF0aW9uKSAqIGluaXRpYWxJbnRlcnZhbFxuICAvLyAgICAgICB9KVxuICAvLyAgICAgKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5CQVNFX1VSTCArIGVuZFBvaW50KTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIGlzIGZvciBQb3N0IEFwaSBjYWxsc1xuICAgKiBAcGFyYW0gZW5kUG9pbnQgU3RyaW5nIEFwaSBFbmRwb2ludCBuZWVkIHRvIHBhc3NcbiAgICogQHBhcmFtIGRhdGEgT2JqZWN0IHJlcXVpcmVkIGZvciB0aGUgUG9zdCByZXF1ZXN0XG4gICAqIEByZXR1cm5zIFJldHVybiB0aGUgcmVzcGVjdGl2ZSByZXNwb25jZSBmcm9tIHRoZSBBcGlzLlxuICAgKi9cbiAgLy8gcG9zdEFwaShlbmRQb2ludCwgZGF0YSwgcmV0cnlDb25maWc6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgLy8gICBpZiAoT2JqZWN0LmtleXMocmV0cnlDb25maWcpLmxlbmd0aCAhPT0gMCkge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuQkFTRV9VUkwgKyBlbmRQb2ludCwgZGF0YSkucGlwZShcbiAgLy8gICAgICAgdGltZW91dChyZXRyeUNvbmZpZy5SRVFfVElNRU9VVCksXG4gIC8vICAgICAgIHJldHJ5QmFja29mZih7XG4gIC8vICAgICAgICAgaW5pdGlhbEludGVydmFsOiByZXRyeUNvbmZpZy5JTklUX0lOVEVSVkFMLFxuICAvLyAgICAgICAgIG1heEludGVydmFsOiByZXRyeUNvbmZpZy5NQVhfSU5URVJWQUwsXG4gIC8vICAgICAgICAgbWF4UmV0cmllczogcmV0cnlDb25maWcuTUFYX1JFVFJJRVMsXG4gIC8vICAgICAgICAgc2hvdWxkUmV0cnk6IGVycm9yID0+IHtcbiAgLy8gICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfdygnQWJvcnRlZCByZW1vdGUgcmVxdWVzdCcpO1xuICAvLyAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gIC8vICAgICAgICAgfSxcbiAgLy8gICAgICAgICBiYWNrb2ZmRGVsYXk6IChpdGVyYXRpb24sIGluaXRpYWxJbnRlcnZhbCkgPT5cbiAgLy8gICAgICAgICAgIE1hdGgucG93KDEuNSwgaXRlcmF0aW9uKSAqIGluaXRpYWxJbnRlcnZhbFxuICAvLyAgICAgICB9KVxuICAvLyAgICAgKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuQkFTRV9VUkwgKyBlbmRQb2ludCwgZGF0YSk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyBmb3IgR2V0IEFwaSBDYWxsc1xuICAgKiBAcGFyYW0gdXJsIFN0cmluZyB1cmwgZm9yIHRoZSBBUElcbiAgICogQHBhcmFtIGh0dHBPcHRpb25zIGhlYWRlciBwYXJ0IGlzIG9wdGlvbmFsXG4gICAqIEBwYXJhbSByZXRyeUNvbmZpZyBpcyB0aGUgb2JqZWN0IGlmIHdhbnQgdG8gaGl0IEFQSSBtdWx0aXBsZSB0aW1lIGFmdGVyIGZhaWx1cmVcbiAgICogQHJldHVybnMgVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXNwZWN0aXZlIHJlc3BvbnNlIGZyb20gdGhlIEFwaVxuICAgKi9cbiAgZ2V0QXBpKHVybCwgaHR0cE9wdGlvbnM6IGFueSA9IHt9LCByZXRyeUNvbmZpZzogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmIChPYmplY3Qua2V5cyhyZXRyeUNvbmZpZykubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIGh0dHBPcHRpb25zKS5waXBlKFxuICAgICAgICB0aW1lb3V0KHJldHJ5Q29uZmlnLlJFUV9USU1FT1VUKSxcbiAgICAgICAgcmV0cnlCYWNrb2ZmKHtcbiAgICAgICAgICBpbml0aWFsSW50ZXJ2YWw6IHJldHJ5Q29uZmlnLklOSVRfSU5URVJWQUwsXG4gICAgICAgICAgbWF4SW50ZXJ2YWw6IHJldHJ5Q29uZmlnLk1BWF9JTlRFUlZBTCxcbiAgICAgICAgICBtYXhSZXRyaWVzOiByZXRyeUNvbmZpZy5NQVhfUkVUUklFUyxcbiAgICAgICAgICBzaG91bGRSZXRyeTogZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ193KCdBYm9ydGVkIHJlbW90ZSByZXF1ZXN0Jyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJhY2tvZmZEZWxheTogKGl0ZXJhdGlvbiwgaW5pdGlhbEludGVydmFsKSA9PlxuICAgICAgICAgICAgTWF0aC5wb3coMS41LCBpdGVyYXRpb24pICogaW5pdGlhbEludGVydmFsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIGh0dHBPcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgZm9yIFBvc3QgQXBpIGNhbGxzXG4gICAqIEBwYXJhbSB1cmwgU3RyaW5nIEFwaSBVUkxcbiAgICogQHBhcmFtIHJlcXVlc3RCb2R5IE9iamVjdCByZXF1aXJlZCBmb3IgdGhlIFBvc3QgcmVxdWVzdFxuICAgKiBAcGFyYW0gaHR0cE9wdGlvbnMgaGVhZGVyIHBhcnQgaXMgb3B0aW9uYWxcbiAgICogQHBhcmFtIHJldHJ5Q29uZmlnIGlzIHRoZSBvYmplY3QgaWYgd2FudCB0byBoaXQgQVBJIG11bHRpcGxlIHRpbWUgYWZ0ZXIgZmFpbHVyZVxuICAgKiBAcmV0dXJucyBSZXR1cm4gdGhlIHJlc3BlY3RpdmUgcmVzcG9uY2UgZnJvbSB0aGUgQXBpcy5cbiAgICovXG4gIHBvc3RBcGkodXJsLCByZXF1ZXN0Qm9keSwgaHR0cE9wdGlvbnM6IGFueSA9IHt9LCByZXRyeUNvbmZpZzogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnNvbGUubG9nKHVybCwgJ3VybCcpO1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3RCb2R5LCAncmVxdWVzdEJvZHknKTtcbiAgICBjb25zb2xlLmxvZyhodHRwT3B0aW9ucywgJ2h0dHBPcHRpb25zJyk7XG4gICAgaWYgKE9iamVjdC5rZXlzKHJldHJ5Q29uZmlnKS5sZW5ndGggIT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgdXJsLFxuICAgICAgICByZXF1ZXN0Qm9keSxcbiAgICAgICAgaHR0cE9wdGlvbnNcbiAgICAgICkucGlwZShcbiAgICAgICAgdGltZW91dChyZXRyeUNvbmZpZy5SRVFfVElNRU9VVCksXG4gICAgICAgIHJldHJ5QmFja29mZih7XG4gICAgICAgICAgaW5pdGlhbEludGVydmFsOiByZXRyeUNvbmZpZy5JTklUX0lOVEVSVkFMLFxuICAgICAgICAgIG1heEludGVydmFsOiByZXRyeUNvbmZpZy5NQVhfSU5URVJWQUwsXG4gICAgICAgICAgbWF4UmV0cmllczogcmV0cnlDb25maWcuTUFYX1JFVFJJRVMsXG4gICAgICAgICAgc2hvdWxkUmV0cnk6IGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBYm9ydGVkIHJlbW90ZSByZXF1ZXN0Jyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJhY2tvZmZEZWxheTogKGl0ZXJhdGlvbiwgaW5pdGlhbEludGVydmFsKSA9PlxuICAgICAgICAgICAgTWF0aC5wb3coMS41LCBpdGVyYXRpb24pICogaW5pdGlhbEludGVydmFsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCByZXF1ZXN0Qm9keSwgaHR0cE9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBmb3IgUmVxdWVzdCBBcGkgY2FsbHNcbiAgICogQHBhcmFtIG1ldGhvZCBTdHJpbmcgbWV0aG9kIG5lZWQgdG8gcGFzcyBpbiByZXF1ZXN0IEFQSVxuICAgKiBAcGFyYW0gdXJsIFN0cmluZyBBUEkgVVJMXG4gICAqIEBwYXJhbSBodHRwT3B0aW9ucyBoZWFkZXIgZGV0YWlscyBpcyBvcHRpb25hbFxuICAgKiBAcGFyYW0gcmV0cnlDb25maWcgaXMgdGhlIG9iamVjdCBpZiB3YW50IHRvIGhpdCBBUEkgbXVsdGlwbGUgdGltZSBhZnRlciBmYWlsdXJlLiBpdCBpcyBvcHRpb25hbFxuICAgKiBAcmV0dXJucyBSZXR1cm4gdGhlIHJlc3BlY3RpdmUgcmVzcG9uY2UgZnJvbSB0aGUgQXBpcy5cbiAgICovXG4gIHJlcXVlc3RBcGkobWV0aG9kLCB1cmwsIGh0dHBPcHRpb25zLCByZXRyeUNvbmZpZzogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmIChPYmplY3Qua2V5cyhyZXRyeUNvbmZpZykubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QobWV0aG9kLCB1cmwsIGh0dHBPcHRpb25zKS5waXBlKFxuICAgICAgICB0aW1lb3V0KHJldHJ5Q29uZmlnLlJFUV9USU1FT1VUKSxcbiAgICAgICAgcmV0cnlCYWNrb2ZmKHtcbiAgICAgICAgICBpbml0aWFsSW50ZXJ2YWw6IHJldHJ5Q29uZmlnLklOSVRfSU5URVJWQUwsXG4gICAgICAgICAgbWF4SW50ZXJ2YWw6IHJldHJ5Q29uZmlnLk1BWF9JTlRFUlZBTCxcbiAgICAgICAgICBtYXhSZXRyaWVzOiByZXRyeUNvbmZpZy5NQVhfUkVUUklFUyxcbiAgICAgICAgICBzaG91bGRSZXRyeTogZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2dTZXJ2aWNlLmxvZ193KCdBYm9ydGVkIHJlbW90ZSByZXF1ZXN0Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWJvcnRlZCByZW1vdGUgcmVxdWVzdCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBiYWNrb2ZmRGVsYXk6IChpdGVyYXRpb24sIGluaXRpYWxJbnRlcnZhbCkgPT5cbiAgICAgICAgICAgIE1hdGgucG93KDEuNSwgaXRlcmF0aW9uKSAqIGluaXRpYWxJbnRlcnZhbFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG1ldGhvZCwgdXJsLCBodHRwT3B0aW9ucyk7XG4gICAgICAvLyByZXR1cm4gdGhpcy5wb3N0QXBpKHVybCwge30sIGh0dHBPcHRpb25zKTtcbiAgICB9XG4gIH1cblxufVxuIl19