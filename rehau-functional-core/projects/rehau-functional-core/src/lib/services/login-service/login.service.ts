// IONIC - ANGULAR
import { Inject, Injectable } from '@angular/core';

// Importing CIDAAS Provider
import { CidaasProvider } from '../../providers/cidaas.provider';
import { ITokenEndpointBody } from '../../models/cidaas.model';
import { Oauth, OauthBrowser, OauthCordova } from 'ionic-cordova-oauth';
import { AuthService } from '../auth-service/auth.service';
import { LogService } from '../logger-service/logger.service';
import { StoreService } from '../store-service/store.service';
import { CacheService } from '../cache-service/cache.service';
import { userData } from '../../config/local-storage.config';

// CIDAAS Confi Data
import { loginDesign, bodyParam, registerDesign, userObject } from '../../config/cidaas.config';
import { throwError } from 'rxjs';
import { ConfigService } from '../config-service/config-service';


@Injectable()
export class LoginService {
  constructor(
    private authService: AuthService,
    private logService: LogService,
    private configService: ConfigService,
    private storeService: StoreService,
    private cacheService: CacheService,
    @Inject('SERVICE_CONFIG') public configuration: any
  ) { }
  oauth: Oauth;
  // cidaasParam = { clientId: CidaasProvider.CLIENT_ID };
  cidaasParam = { clientId: this.configuration.cidaasConfig.cidaasClientId };
  cidaasRegisterProvider = this.configuration.cidaasConfig.cidaasRegisterProvider;
  cidaasLoginProvider = this.configuration.cidaasConfig.cidaasLoginProvider;
  cidaasLoginDesign = this.configuration.cidaasConfig.cidaasLoginDesign;
  cidaasRegisterDesign = this.configuration.cidaasConfig.cidaasRegisterDesign;

  /**
   * @description This is CIDAAS Authentication main function
   * @param actionType is the string which indicates the type of action whether it is login or register
   * @param platform is used to define the platform to use. Default value is browser
   */
  async cidaasAuth(actionType, platform = 'browser') {
    actionType = actionType.trim();
    let provider;
    if (actionType === 'register token') {
      // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasRegisterProvider });
      provider = new CidaasProvider({ ...this.cidaasParam, ...this.cidaasRegisterProvider });
    } else if (actionType === 'login token') {
      // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasLoginProvider });
      provider = new CidaasProvider({ ...this.cidaasParam, ...this.cidaasLoginProvider });
    }
    const pkceBody: ITokenEndpointBody = {
      grant_type: bodyParam.grant_type,
      client_id: provider.options.clientId,
      redirect_uri: provider.options.redirectUri,
      code_verifier: CidaasProvider.base64URLEncode(
        provider.options.code_challenge
      )
    };
    this.logService.log('TEST CONFI SERVICE = ', + this.configService.configuration);
    this.logService.log('pkceBody required for login = ' + pkceBody);
    this.logService.log('provider body required for login =' + provider);
    let result;
    const res = userObject;
    try {
      result = await this.login(provider, pkceBody, actionType, platform);
      if (result.access_token === '' || result.access_token === undefined) {
        this.logService.log_e('login failed == ');
        this.logService.log_e(result);
        res.message = 'login Failed';
        res.status = '1';
        return res;
      } else {
        this.logService.log('login successFull == ');
        this.logService.log(result);
        res.message = 'login success';
        res.status = '0';
        res.accessToken = result.access_token;
        res.refreshToken = result.refresh_token;
        return res;
      }
    } catch (err) {
      throwError(err);
    }
  }

  /**
   * @description This is logout function
   * @description it will remove userData from local storage and store
   */
  async cidaasLogout() {
    try {
      this.storeService.dispatchUserData({});
      this.cacheService.removeLocalData(userData);
      return true;
    } catch (err) {
      throwError(err);
    }
  }

  /**
   * @description This is Login function to call oauth loginVia API
   * @param provider is the CIDAAS provider object
   * @param pkceBody is the ITokenEndpointBody object
   * @param actionType it is identifier for the API action whether it is for login/register
   */
  async login(provider, pkceBody, actionType, platform) {
    let res: any;
    if (platform === 'browser') {
      this.oauth = new OauthBrowser();
    } else {
      this.oauth = new OauthCordova();
    }
    if (this.cidaasLoginDesign === undefined || Object.keys(this.cidaasLoginDesign).length === 0) {
      this.cidaasLoginDesign = loginDesign;
    }
    if (this.cidaasRegisterDesign === undefined || Object.keys(this.cidaasRegisterDesign).length === 0) {
      this.cidaasRegisterDesign = registerDesign;
    }
    if (actionType === 'register token') {
      res = await this.oauth.logInVia(provider, this.cidaasLoginDesign);
    } else if (actionType === 'login token') {
      res = await this.oauth.logInVia(provider, this.cidaasRegisterDesign);
    }

    if (!!res) {
      pkceBody.code = res.code;
      const data = await this.authService.oAuthCallback(pkceBody, actionType);
      return data;
    }

  }
}
