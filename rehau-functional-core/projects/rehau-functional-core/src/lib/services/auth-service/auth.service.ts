import { Inject, Injectable } from '@angular/core';
import { ITokenEndpointBody, ITokenEndpointResponse } from '../../models/cidaas.model';
import { CidaasProvider } from '../../providers/cidaas.provider';
import { WebService } from '../web-service/web.service';
import { CacheService } from '../cache-service/cache.service';
import { userData } from '../../config/local-storage.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LogService } from '../logger-service/logger.service';
import { StoreService } from '../store-service/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenPromise: Promise<boolean>;

  constructor(
    private webService: WebService,
    private cacheService: CacheService,
    private logservice: LogService,
    private storeService: StoreService,
    @Inject('SERVICE_CONFIG') public configuration: any
  ) { }

  async oAuthCallback(body: ITokenEndpointBody, message: string): Promise<void> {
    const response: any = await this.getToken(body, message);
    return response;
  }

  /**
   * @description This function is responsible to call postAPI method to get the new token
   * @returns object of ITokenEndpointResponse
   */
  async tokenRequest(body: ITokenEndpointBody): Promise<ITokenEndpointResponse> {
    return this.webService.postApi(this.configuration.cidaasConfig.ciddasTokenEndpoint, body).toPromise();

  }

  /**
   * @description This function will call the token request method to get new token
   * @description And will store the user data in store and local storage
   * @returns object of user data
   */
  private async getToken(body, message): Promise<any> {
    try {
      const response: ITokenEndpointResponse = await this.tokenRequest(body);
      if (!response.access_token || !response.refresh_token) {
        // Here We clean the User Object from Local Storage and Store.
        this.storeService.dispatchUserData({});
        this.cacheService.removeLocalData(userData);
        return response;
      } else {
        body.access_token = response.access_token;
        body.refresh_token = response.refresh_token;
        // Here We Set the User Object in Local Storage and Store.
        this.storeService.dispatchUserData(body);
        this.cacheService.setLocalData(userData, body);
        return body;
      }

    } catch (e) {
      if (e.error instanceof ErrorEvent) {
        this.logservice.log_e('An error occurred for getting ' + message + ':', e.error.message);
        this.logservice.log('Never the less leave the use do its thing without tokens');
        body.status = e.status;
        body.message = e.error.message;
        return body;
      } else if (e.status === 0) {
        this.logservice.log_e('An error occurred for getting ' + message + ':', e.error.message);
        this.logservice.log('Never the less leave the use do its thing without tokens');
        body.status = e.status;
        body.message = e.error.message;
        return body;
      } else if (e.status === 408) {
        this.logservice.log_e(
          'An error occurred for getting ' + message + ':',
          e.error.message
        );
        this.logservice.log('Never the less leave the use do its thing without tokens');
        body.status = e.status;
        body.message = e.error.message;
        return body;
      } else {
        this.logservice.log_e(
          `Backend returned code for getting ${message} ${e.status}, ` +
          `body was for getting ${message} : ${e.error}`
        );
        this.storeService.dispatchUserData({});
        this.cacheService.removeLocalData(userData);
        // await this.logoutService.doLogout();
        return body;
      }
    }
  }

  // tslint:disable-next-line:jsdoc-format
  /**
   * @description This function will check whether user is new or existing.
   * @description If user is existing then this function will get the current or refreshed token
   * @returns boolean value based on expired
   */
  async isLoggedIn(): Promise<boolean> {
    const currentUserFromStore = await this.storeService.getUserData();
    const currentUser: any = this.cacheService.getLocalData(userData);
    this.logservice.log('User data from local storage = ', currentUser);
    this.logservice.log('User data from store = ', currentUserFromStore);

    if (currentUserFromStore && currentUser) {
      const res = await this.checkTokenStatus(currentUser);
      return res;
    } else if (currentUserFromStore && !currentUser) {  // if data is present in store but not in local stoarge
      this.cacheService.setLocalData(userData, currentUserFromStore); // update locsal storage
      const res = await this.checkTokenStatus(currentUserFromStore);
      return res;
    } else if (!currentUserFromStore && currentUser) { // if data is present in local storage but not in Store
      this.storeService.dispatchUserData(currentUser); // update store
      const res = await this.checkTokenStatus(currentUser);
      return res;
    } else {
      return false;
    }
  }

  // tslint:disable-next-line:jsdoc-format
  /**
   * @description This function will check the status of token whether it is expired or not
   * @description If token is expired then it will call refresh token method
   * @param currentUser is the currentuser object either from store or local storage
   * @returns boolean value or refresh token object based on condition
   */
  async checkTokenStatus(currentUser): Promise<boolean> {
    const isExpired = this.isTokenExpire(currentUser.access_token);
    if (isExpired) {
      this.logservice.log_w('THIS ACCESS_TOKEN IS EXPIRED in Login, try getting new one.');
      const res = await this.refreshTokenWrapper(currentUser);
      return res;
    } else {
      return true;
    }
  }

  /**
   * @description This function is required for checking the access_token is expired or not.
   * @param access_token Need Access_token for checking is it expired
   * @returns boolean value based on expied
   */
  // tslint:disable-next-line:variable-name
  isTokenExpire(access_token: string): boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(access_token);
  }

  /**
   * @description This method will get call whenevr we need to refresh the expise token
   * @param user is the object conatining all CIDAAS login data
   * @returns object of CIDAAS login data including regresh token
   */
  private async refreshTokenWrapper(user): Promise<boolean> {
    const body: ITokenEndpointBody = {
      client_id: this.configuration.cidaasConfig.cidaasClientId,
      grant_type: 'refresh_token',
      refresh_token: user.refresh_token
    };

    const result = await this.getToken(body, 'refresh token');
    return result;
  }

  /**
   * @description This method will decide the access token
   * @returns decoded access token
   */
  async getCorrelationId() {
    const user = await this.getUser();
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(user.access_token);
    return decodedToken.sub;
  }

  /**
   * @description This method is to get the userData related to CIDAAS login
   * @returns object of CIDAAS login data
   */
  async getUser() {
    let user: any = this.cacheService.getLocalData(userData);
    const helper = new JwtHelperService();
    if (user) {
      const isExpired = this.isTokenExpire(user.access_token);
      if (isExpired) {
        this.logservice.log(
          'THIS ACCESS_TOKEN IS EXPIRED in getUser, try getting new one.'
        );
        user = await this.refreshTokenWrapper(user);
        this.logservice.log('refreshTest::got result in getUser ' + user);
      }
    }
    return user;
  }

}
