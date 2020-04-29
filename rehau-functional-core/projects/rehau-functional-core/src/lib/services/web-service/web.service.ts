import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retryBackoff } from 'backoff-rxjs';
import { timeout } from 'rxjs/operators';
import { LogService } from '../logger-service/logger.service';


@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
    @Inject('SERVICE_CONFIG') public configuration: any,
  ) { }

  BASE_URL = this.configuration.globalConfig.BASE_URL;
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
  getApi(url, httpOptions: any = {}, retryConfig: any = {}): Observable<any> {
    if (Object.keys(retryConfig).length !== 0) {
      return this.http.get(url, httpOptions).pipe(
        timeout(retryConfig.REQ_TIMEOUT),
        retryBackoff({
          initialInterval: retryConfig.INIT_INTERVAL,
          maxInterval: retryConfig.MAX_INTERVAL,
          maxRetries: retryConfig.MAX_RETRIES,
          shouldRetry: error => {
            this.logService.log_w('Aborted remote request');
            return true;
          },
          backoffDelay: (iteration, initialInterval) =>
            Math.pow(1.5, iteration) * initialInterval
        })
      );
    } else {
      return this.http.get(url, httpOptions);
    }
  }

  /**
   * This method is for Post Api calls
   * @param url String Api URL
   * @param requestBody Object required for the Post request
   * @param httpOptions header part is optional
   * @param retryConfig is the object if want to hit API multiple time after failure
   * @returns Return the respective responce from the Apis.
   */
  postApi(url, requestBody, httpOptions: any = {}, retryConfig: any = {}): Observable<any> {
    console.log(url, 'url');
    console.log(requestBody, 'requestBody');
    console.log(httpOptions, 'httpOptions');
    if (Object.keys(retryConfig).length !== 0) {
      return this.http.post(
        url,
        requestBody,
        httpOptions
      ).pipe(
        timeout(retryConfig.REQ_TIMEOUT),
        retryBackoff({
          initialInterval: retryConfig.INIT_INTERVAL,
          maxInterval: retryConfig.MAX_INTERVAL,
          maxRetries: retryConfig.MAX_RETRIES,
          shouldRetry: error => {
            console.log('Aborted remote request');
            return true;
          },
          backoffDelay: (iteration, initialInterval) =>
            Math.pow(1.5, iteration) * initialInterval
        })
      );
    } else {
      return this.http.post(url, requestBody, httpOptions);
    }
  }

  /**
   * This method is for Request Api calls
   * @param method String method need to pass in request API
   * @param url String API URL
   * @param httpOptions header details is optional
   * @param retryConfig is the object if want to hit API multiple time after failure. it is optional
   * @returns Return the respective responce from the Apis.
   */
  requestApi(method, url, httpOptions, retryConfig: any = {}): Observable<any> {
    if (Object.keys(retryConfig).length !== 0) {
      return this.http.request(method, url, httpOptions).pipe(
        timeout(retryConfig.REQ_TIMEOUT),
        retryBackoff({
          initialInterval: retryConfig.INIT_INTERVAL,
          maxInterval: retryConfig.MAX_INTERVAL,
          maxRetries: retryConfig.MAX_RETRIES,
          shouldRetry: error => {
            // this.logService.log_w('Aborted remote request');
            console.log('Aborted remote request');
            return true;
          },
          backoffDelay: (iteration, initialInterval) =>
            Math.pow(1.5, iteration) * initialInterval
        })
      );
    } else {
      return this.http.post(method, url, httpOptions);
      // return this.postApi(url, {}, httpOptions);
    }
  }

}
