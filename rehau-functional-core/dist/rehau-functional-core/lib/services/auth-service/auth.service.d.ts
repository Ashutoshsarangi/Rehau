import { ITokenEndpointBody, ITokenEndpointResponse } from '../../models/cidaas.model';
import { WebService } from '../web-service/web.service';
import { CacheService } from '../cache-service/cache.service';
import { LogService } from '../logger-service/logger.service';
import { StoreService } from '../store-service/store.service';
export declare class AuthService {
    private webService;
    private cacheService;
    private logservice;
    private storeService;
    configuration: any;
    private tokenPromise;
    constructor(webService: WebService, cacheService: CacheService, logservice: LogService, storeService: StoreService, configuration: any);
    oAuthCallback(body: ITokenEndpointBody, message: string): Promise<void>;
    /**
     * @description This function is responsible to call postAPI method to get the new token
     * @returns object of ITokenEndpointResponse
     */
    tokenRequest(body: ITokenEndpointBody): Promise<ITokenEndpointResponse>;
    /**
     * @description This function will call the token request method to get new token
     * @description And will store the user data in store and local storage
     * @returns object of user data
     */
    private getToken;
    /**
     * @description This function will check whether user is new or existing.
     * @description If user is existing then this function will get the current or refreshed token
     * @returns boolean value based on expired
     */
    isLoggedIn(): Promise<boolean>;
    /**
     * @description This function will check the status of token whether it is expired or not
     * @description If token is expired then it will call refresh token method
     * @param currentUser is the currentuser object either from store or local storage
     * @returns boolean value or refresh token object based on condition
     */
    checkTokenStatus(currentUser: any): Promise<boolean>;
    /**
     * @description This function is required for checking the access_token is expired or not.
     * @param access_token Need Access_token for checking is it expired
     * @returns boolean value based on expied
     */
    isTokenExpire(access_token: string): boolean;
    /**
     * @description This method will get call whenevr we need to refresh the expise token
     * @param user is the object conatining all CIDAAS login data
     * @returns object of CIDAAS login data including regresh token
     */
    private refreshTokenWrapper;
    /**
     * @description This method will decide the access token
     * @returns decoded access token
     */
    getCorrelationId(): Promise<any>;
    /**
     * @description This method is to get the userData related to CIDAAS login
     * @returns object of CIDAAS login data
     */
    getUser(): Promise<any>;
}
