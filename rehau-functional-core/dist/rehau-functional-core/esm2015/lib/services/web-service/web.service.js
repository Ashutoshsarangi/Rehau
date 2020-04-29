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
export class WebService {
    /**
     * @param {?} http
     * @param {?} logService
     * @param {?} configuration
     */
    constructor(http, logService, configuration) {
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
     * \@description This method is for Get Api Calls
     * @param {?} url String url for the API
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} This function returns the respective response from the Api
     */
    getApi(url, httpOptions = {}, retryConfig = {}) {
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.get(url, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    this.logService.log_w('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                (iteration, initialInterval) => Math.pow(1.5, iteration) * initialInterval)
            }));
        }
        else {
            return this.http.get(url, httpOptions);
        }
    }
    /**
     * This method is for Post Api calls
     * @param {?} url String Api URL
     * @param {?} requestBody Object required for the Post request
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} Return the respective responce from the Apis.
     */
    postApi(url, requestBody, httpOptions = {}, retryConfig = {}) {
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
                error => {
                    console.log('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                (iteration, initialInterval) => Math.pow(1.5, iteration) * initialInterval)
            }));
        }
        else {
            return this.http.post(url, requestBody, httpOptions);
        }
    }
    /**
     * This method is for Request Api calls
     * @param {?} method String method need to pass in request API
     * @param {?} url String API URL
     * @param {?} httpOptions header details is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @return {?} Return the respective responce from the Apis.
     */
    requestApi(method, url, httpOptions, retryConfig = {}) {
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.request(method, url, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    // this.logService.log_w('Aborted remote request');
                    console.log('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                (iteration, initialInterval) => Math.pow(1.5, iteration) * initialInterval)
            }));
        }
        else {
            return this.http.post(method, url, httpOptions);
            // return this.postApi(url, {}, httpOptions);
        }
    }
}
WebService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WebService.ctorParameters = () => [
    { type: HttpClient },
    { type: LogService },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];
/** @nocollapse */ WebService.ngInjectableDef = i0.defineInjectable({ factory: function WebService_Factory() { return new WebService(i0.inject(i1.HttpClient), i0.inject(i2.LogService), i0.inject("SERVICE_CONFIG")); }, token: WebService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvd2ViLXNlcnZpY2Uvd2ViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFNOUQsTUFBTSxPQUFPLFVBQVU7Ozs7OztJQUVyQixZQUNVLElBQWdCLEVBQ2hCLFVBQXNCLEVBQ0csYUFBa0I7UUFGM0MsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ0csa0JBQWEsR0FBYixhQUFhLENBQUs7UUFHckQsYUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUZoRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpRUwsTUFBTSxDQUFDLEdBQUcsRUFBRSxjQUFtQixFQUFFLEVBQUUsY0FBbUIsRUFBRTtRQUN0RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3pDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQ2hDLFlBQVksQ0FBQztnQkFD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QTtnQkFDRCxZQUFZOzs7OztnQkFBRSxDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxlQUFlLENBQUE7YUFDN0MsQ0FBQyxDQUNILENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELDZDQUE2QztTQUM5QztJQUNILENBQUM7OztZQWhLRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFUUSxVQUFVO1lBSVYsVUFBVTs0Q0FXZCxNQUFNLFNBQUMsZ0JBQWdCOzs7OztJQUcxQiw4QkFBb0Q7Ozs7O0lBTGxELDBCQUF3Qjs7Ozs7SUFDeEIsZ0NBQThCOztJQUM5QixtQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyByZXRyeUJhY2tvZmYgfSBmcm9tICdiYWNrb2ZmLXJ4anMnO1xuaW1wb3J0IHsgdGltZW91dCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXItc2VydmljZS9sb2dnZXIuc2VydmljZSc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgV2ViU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgbG9nU2VydmljZTogTG9nU2VydmljZSxcbiAgICBASW5qZWN0KCdTRVJWSUNFX0NPTkZJRycpIHB1YmxpYyBjb25maWd1cmF0aW9uOiBhbnksXG4gICkgeyB9XG5cbiAgQkFTRV9VUkwgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2xvYmFsQ29uZmlnLkJBU0VfVVJMO1xuICAvLyBnZXRBcGkoKSwgcG9zdEFwaSgpIGFyZSByZXNwb25zaWJsZSBmb3IgTWFpbiBBcGkgY2FscyBkZXBlbmRpbmcgb24gdGhlIEh0dHAgbWV0aG9kc1xuXG4gIC8vIC8qKlxuICAvLyAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgaXMgZm9yIEdldCBBcGkgQ2FsbHNcbiAgLy8gICogQHBhcmFtIGVuZFBvaW50IFN0cmluZyBKdXN0IG5lZWQgdG8gcGFzcyB0aGUgRW5kcG9pbnRcbiAgLy8gICogQHJldHVybnMgVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXNwZWN0aXZlIHJlc3BvbnNlIGZyb20gdGhlIEFwaVxuICAvLyAgKi9cbiAgLy8gZ2V0QXBpKGVuZFBvaW50LCByZXRyeUNvbmZpZzogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAvLyAgIGlmIChPYmplY3Qua2V5cyhyZXRyeUNvbmZpZykubGVuZ3RoICE9PSAwKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLkJBU0VfVVJMICsgZW5kUG9pbnQpLnBpcGUoXG4gIC8vICAgICAgIHRpbWVvdXQocmV0cnlDb25maWcuUkVRX1RJTUVPVVQpLFxuICAvLyAgICAgICByZXRyeUJhY2tvZmYoe1xuICAvLyAgICAgICAgIGluaXRpYWxJbnRlcnZhbDogcmV0cnlDb25maWcuSU5JVF9JTlRFUlZBTCxcbiAgLy8gICAgICAgICBtYXhJbnRlcnZhbDogcmV0cnlDb25maWcuTUFYX0lOVEVSVkFMLFxuICAvLyAgICAgICAgIG1heFJldHJpZXM6IHJldHJ5Q29uZmlnLk1BWF9SRVRSSUVTLFxuICAvLyAgICAgICAgIHNob3VsZFJldHJ5OiBlcnJvciA9PiB7XG4gIC8vICAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nX3coJ0Fib3J0ZWQgcmVtb3RlIHJlcXVlc3QnKTtcbiAgLy8gICAgICAgICAgIHJldHVybiB0cnVlO1xuICAvLyAgICAgICAgIH0sXG4gIC8vICAgICAgICAgYmFja29mZkRlbGF5OiAoaXRlcmF0aW9uLCBpbml0aWFsSW50ZXJ2YWwpID0+XG4gIC8vICAgICAgICAgICBNYXRoLnBvdygxLjUsIGl0ZXJhdGlvbikgKiBpbml0aWFsSW50ZXJ2YWxcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICk7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuQkFTRV9VUkwgKyBlbmRQb2ludCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyBmb3IgUG9zdCBBcGkgY2FsbHNcbiAgICogQHBhcmFtIGVuZFBvaW50IFN0cmluZyBBcGkgRW5kcG9pbnQgbmVlZCB0byBwYXNzXG4gICAqIEBwYXJhbSBkYXRhIE9iamVjdCByZXF1aXJlZCBmb3IgdGhlIFBvc3QgcmVxdWVzdFxuICAgKiBAcmV0dXJucyBSZXR1cm4gdGhlIHJlc3BlY3RpdmUgcmVzcG9uY2UgZnJvbSB0aGUgQXBpcy5cbiAgICovXG4gIC8vIHBvc3RBcGkoZW5kUG9pbnQsIGRhdGEsIHJldHJ5Q29uZmlnOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgaWYgKE9iamVjdC5rZXlzKHJldHJ5Q29uZmlnKS5sZW5ndGggIT09IDApIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLkJBU0VfVVJMICsgZW5kUG9pbnQsIGRhdGEpLnBpcGUoXG4gIC8vICAgICAgIHRpbWVvdXQocmV0cnlDb25maWcuUkVRX1RJTUVPVVQpLFxuICAvLyAgICAgICByZXRyeUJhY2tvZmYoe1xuICAvLyAgICAgICAgIGluaXRpYWxJbnRlcnZhbDogcmV0cnlDb25maWcuSU5JVF9JTlRFUlZBTCxcbiAgLy8gICAgICAgICBtYXhJbnRlcnZhbDogcmV0cnlDb25maWcuTUFYX0lOVEVSVkFMLFxuICAvLyAgICAgICAgIG1heFJldHJpZXM6IHJldHJ5Q29uZmlnLk1BWF9SRVRSSUVTLFxuICAvLyAgICAgICAgIHNob3VsZFJldHJ5OiBlcnJvciA9PiB7XG4gIC8vICAgICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nX3coJ0Fib3J0ZWQgcmVtb3RlIHJlcXVlc3QnKTtcbiAgLy8gICAgICAgICAgIHJldHVybiB0cnVlO1xuICAvLyAgICAgICAgIH0sXG4gIC8vICAgICAgICAgYmFja29mZkRlbGF5OiAoaXRlcmF0aW9uLCBpbml0aWFsSW50ZXJ2YWwpID0+XG4gIC8vICAgICAgICAgICBNYXRoLnBvdygxLjUsIGl0ZXJhdGlvbikgKiBpbml0aWFsSW50ZXJ2YWxcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICk7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLkJBU0VfVVJMICsgZW5kUG9pbnQsIGRhdGEpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgaXMgZm9yIEdldCBBcGkgQ2FsbHNcbiAgICogQHBhcmFtIHVybCBTdHJpbmcgdXJsIGZvciB0aGUgQVBJXG4gICAqIEBwYXJhbSBodHRwT3B0aW9ucyBoZWFkZXIgcGFydCBpcyBvcHRpb25hbFxuICAgKiBAcGFyYW0gcmV0cnlDb25maWcgaXMgdGhlIG9iamVjdCBpZiB3YW50IHRvIGhpdCBBUEkgbXVsdGlwbGUgdGltZSBhZnRlciBmYWlsdXJlXG4gICAqIEByZXR1cm5zIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVzcGVjdGl2ZSByZXNwb25zZSBmcm9tIHRoZSBBcGlcbiAgICovXG4gIGdldEFwaSh1cmwsIGh0dHBPcHRpb25zOiBhbnkgPSB7fSwgcmV0cnlDb25maWc6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoT2JqZWN0LmtleXMocmV0cnlDb25maWcpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBodHRwT3B0aW9ucykucGlwZShcbiAgICAgICAgdGltZW91dChyZXRyeUNvbmZpZy5SRVFfVElNRU9VVCksXG4gICAgICAgIHJldHJ5QmFja29mZih7XG4gICAgICAgICAgaW5pdGlhbEludGVydmFsOiByZXRyeUNvbmZpZy5JTklUX0lOVEVSVkFMLFxuICAgICAgICAgIG1heEludGVydmFsOiByZXRyeUNvbmZpZy5NQVhfSU5URVJWQUwsXG4gICAgICAgICAgbWF4UmV0cmllczogcmV0cnlDb25maWcuTUFYX1JFVFJJRVMsXG4gICAgICAgICAgc2hvdWxkUmV0cnk6IGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfdygnQWJvcnRlZCByZW1vdGUgcmVxdWVzdCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBiYWNrb2ZmRGVsYXk6IChpdGVyYXRpb24sIGluaXRpYWxJbnRlcnZhbCkgPT5cbiAgICAgICAgICAgIE1hdGgucG93KDEuNSwgaXRlcmF0aW9uKSAqIGluaXRpYWxJbnRlcnZhbFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBodHRwT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGZvciBQb3N0IEFwaSBjYWxsc1xuICAgKiBAcGFyYW0gdXJsIFN0cmluZyBBcGkgVVJMXG4gICAqIEBwYXJhbSByZXF1ZXN0Qm9keSBPYmplY3QgcmVxdWlyZWQgZm9yIHRoZSBQb3N0IHJlcXVlc3RcbiAgICogQHBhcmFtIGh0dHBPcHRpb25zIGhlYWRlciBwYXJ0IGlzIG9wdGlvbmFsXG4gICAqIEBwYXJhbSByZXRyeUNvbmZpZyBpcyB0aGUgb2JqZWN0IGlmIHdhbnQgdG8gaGl0IEFQSSBtdWx0aXBsZSB0aW1lIGFmdGVyIGZhaWx1cmVcbiAgICogQHJldHVybnMgUmV0dXJuIHRoZSByZXNwZWN0aXZlIHJlc3BvbmNlIGZyb20gdGhlIEFwaXMuXG4gICAqL1xuICBwb3N0QXBpKHVybCwgcmVxdWVzdEJvZHksIGh0dHBPcHRpb25zOiBhbnkgPSB7fSwgcmV0cnlDb25maWc6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zb2xlLmxvZyh1cmwsICd1cmwnKTtcbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0Qm9keSwgJ3JlcXVlc3RCb2R5Jyk7XG4gICAgY29uc29sZS5sb2coaHR0cE9wdGlvbnMsICdodHRwT3B0aW9ucycpO1xuICAgIGlmIChPYmplY3Qua2V5cyhyZXRyeUNvbmZpZykubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgIHVybCxcbiAgICAgICAgcmVxdWVzdEJvZHksXG4gICAgICAgIGh0dHBPcHRpb25zXG4gICAgICApLnBpcGUoXG4gICAgICAgIHRpbWVvdXQocmV0cnlDb25maWcuUkVRX1RJTUVPVVQpLFxuICAgICAgICByZXRyeUJhY2tvZmYoe1xuICAgICAgICAgIGluaXRpYWxJbnRlcnZhbDogcmV0cnlDb25maWcuSU5JVF9JTlRFUlZBTCxcbiAgICAgICAgICBtYXhJbnRlcnZhbDogcmV0cnlDb25maWcuTUFYX0lOVEVSVkFMLFxuICAgICAgICAgIG1heFJldHJpZXM6IHJldHJ5Q29uZmlnLk1BWF9SRVRSSUVTLFxuICAgICAgICAgIHNob3VsZFJldHJ5OiBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWJvcnRlZCByZW1vdGUgcmVxdWVzdCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBiYWNrb2ZmRGVsYXk6IChpdGVyYXRpb24sIGluaXRpYWxJbnRlcnZhbCkgPT5cbiAgICAgICAgICAgIE1hdGgucG93KDEuNSwgaXRlcmF0aW9uKSAqIGluaXRpYWxJbnRlcnZhbFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgcmVxdWVzdEJvZHksIGh0dHBPcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgZm9yIFJlcXVlc3QgQXBpIGNhbGxzXG4gICAqIEBwYXJhbSBtZXRob2QgU3RyaW5nIG1ldGhvZCBuZWVkIHRvIHBhc3MgaW4gcmVxdWVzdCBBUElcbiAgICogQHBhcmFtIHVybCBTdHJpbmcgQVBJIFVSTFxuICAgKiBAcGFyYW0gaHR0cE9wdGlvbnMgaGVhZGVyIGRldGFpbHMgaXMgb3B0aW9uYWxcbiAgICogQHBhcmFtIHJldHJ5Q29uZmlnIGlzIHRoZSBvYmplY3QgaWYgd2FudCB0byBoaXQgQVBJIG11bHRpcGxlIHRpbWUgYWZ0ZXIgZmFpbHVyZS4gaXQgaXMgb3B0aW9uYWxcbiAgICogQHJldHVybnMgUmV0dXJuIHRoZSByZXNwZWN0aXZlIHJlc3BvbmNlIGZyb20gdGhlIEFwaXMuXG4gICAqL1xuICByZXF1ZXN0QXBpKG1ldGhvZCwgdXJsLCBodHRwT3B0aW9ucywgcmV0cnlDb25maWc6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoT2JqZWN0LmtleXMocmV0cnlDb25maWcpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KG1ldGhvZCwgdXJsLCBodHRwT3B0aW9ucykucGlwZShcbiAgICAgICAgdGltZW91dChyZXRyeUNvbmZpZy5SRVFfVElNRU9VVCksXG4gICAgICAgIHJldHJ5QmFja29mZih7XG4gICAgICAgICAgaW5pdGlhbEludGVydmFsOiByZXRyeUNvbmZpZy5JTklUX0lOVEVSVkFMLFxuICAgICAgICAgIG1heEludGVydmFsOiByZXRyeUNvbmZpZy5NQVhfSU5URVJWQUwsXG4gICAgICAgICAgbWF4UmV0cmllczogcmV0cnlDb25maWcuTUFYX1JFVFJJRVMsXG4gICAgICAgICAgc2hvdWxkUmV0cnk6IGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nU2VydmljZS5sb2dfdygnQWJvcnRlZCByZW1vdGUgcmVxdWVzdCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Fib3J0ZWQgcmVtb3RlIHJlcXVlc3QnKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYmFja29mZkRlbGF5OiAoaXRlcmF0aW9uLCBpbml0aWFsSW50ZXJ2YWwpID0+XG4gICAgICAgICAgICBNYXRoLnBvdygxLjUsIGl0ZXJhdGlvbikgKiBpbml0aWFsSW50ZXJ2YWxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChtZXRob2QsIHVybCwgaHR0cE9wdGlvbnMpO1xuICAgICAgLy8gcmV0dXJuIHRoaXMucG9zdEFwaSh1cmwsIHt9LCBodHRwT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==