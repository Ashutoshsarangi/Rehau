import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogService } from '../logger-service/logger.service';
export declare class WebService {
    private http;
    private logService;
    configuration: any;
    constructor(http: HttpClient, logService: LogService, configuration: any);
    BASE_URL: any;
    /**
     * @description This method is for Post Api calls
     * @param endPoint String Api Endpoint need to pass
     * @param data Object required for the Post request
     * @returns Return the respective responce from the Apis.
     */
    /**
     * @description This method is for Get Api Calls
     * @param url String url for the API
     * @param httpOptions header part is optional
     * @param retryConfig is the object if want to hit API multiple time after failure
     * @returns This function returns the respective response from the Api
     */
    getApi(url: any, httpOptions?: any, retryConfig?: any): Observable<any>;
    /**
     * This method is for Post Api calls
     * @param url String Api URL
     * @param requestBody Object required for the Post request
     * @param httpOptions header part is optional
     * @param retryConfig is the object if want to hit API multiple time after failure
     * @returns Return the respective responce from the Apis.
     */
    postApi(url: any, requestBody: any, httpOptions?: any, retryConfig?: any): Observable<any>;
    /**
     * This method is for Request Api calls
     * @param method String method need to pass in request API
     * @param url String API URL
     * @param httpOptions header details is optional
     * @param retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @returns Return the respective responce from the Apis.
     */
    requestApi(method: any, url: any, httpOptions: any, retryConfig?: any): Observable<any>;
}
