import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, flatMap, retryWhen, timeout } from 'rxjs/operators';
import { retryBackoff } from 'backoff-rxjs';
import { AuthService } from '../auth-service/auth.service';
import { WebService } from '../web-service/web.service';
import { LogService } from '../logger-service/logger.service';
import {
  gatewayAclEndpoint,
  GatewayAclServiceUserGatewayCredsType,
  GatewayCredentialsTypes,
  GatewayCredentials,
  Gateway,
  GatewayAclServiceUserHome,
  GatewayAclServiceUser
} from '../../models/getway.model';


@Injectable({
  providedIn: 'root',
})
export class GatewayAclService {
  private static INIT_INTERVAL = 2000;
  private static MAX_INTERVAL = 6000;
  private static MAX_RETRIES = 3;
  private static REQ_TIMEOUT = 8000;



  private storageName = 'gateway_device';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private webService: WebService,
    private logService: LogService
  ) {
  }

  async cloudGetHomes(accessToken: string): Promise<{ homes: GatewayAclServiceUserHome[], response: GatewayAclServiceUser }> {
    try {
      const gatewayAclUser = await this.userControllerGET(accessToken);
      const result: GatewayAclServiceUserHome[] = [];
      for (const homeId of Object.keys(gatewayAclUser.homes)) {
        result.push(gatewayAclUser.homes[homeId]);
      }
      return { homes: result, response: gatewayAclUser };
    } catch (e) {
      console.error('gatewayAclServer::cloudGetHomes: Could not fetch Homes ' + JSON.stringify(e));
      return { homes: [], response: null };
    }
  }

  async userControllerGET(accessToken: string): Promise<GatewayAclServiceUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'access_token': accessToken,
        'x-correlation-id': await this.authService.getCorrelationId()
      })
    };

    const url = gatewayAclEndpoint + '/users/';
    const retryConfig = {
      REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
      INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
      MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
      MAX_RETRIES: GatewayAclService.MAX_RETRIES,
    };
    const gwUser: GatewayAclServiceUser = await this.webService.getApi(url, httpOptions, retryConfig).toPromise();

    this.logService.log(gwUser);
    return gwUser;
  }

  async getGatewaysToHome(accessToken: string, homeId: string, aclUser: GatewayAclServiceUser): Promise<Gateway[]> {
    const result: Gateway[] = [];
    for (const gatewayId of Object.keys(aclUser.homes[homeId].gateways)) {
      const gwResult: Gateway = {
        credentials: []
      };
      for (const credId of Object.keys(aclUser.homes[homeId].gateways[gatewayId].userCredentials)) {
        gwResult.homeGwId = gatewayId;
        console.log('Getting credId: ' + credId);
        const credentials = aclUser.homes[homeId].gateways[gatewayId].userCredentials[credId];
        console.log('Getting homeId: ' + homeId);
        console.log(credentials);
        if (credentials.type === GatewayAclServiceUserGatewayCredsType.ADMIN ||
          credentials.type === GatewayAclServiceUserGatewayCredsType.LOCAL ||
          credentials.type === GatewayAclServiceUserGatewayCredsType.REMOTE) {
          const newCreds: GatewayCredentials = {
            user: credentials.user,
            password: credentials.password,
            type: credentials.type === 'admin' ? GatewayCredentialsTypes.ADMIN :
              credentials.type === 'local' ? GatewayCredentialsTypes.LOCAL :
                credentials.type === 'remote' ? GatewayCredentialsTypes.REMOTE :
                  null
          };
          console.log('Got correct type! ' + JSON.stringify(newCreds));
          gwResult.credentials.push(newCreds);
        }
      }
      result.push(gwResult);
    }
    return result;
  }

  async getHomeOfUser(accessToken: string, homeID: string) {
    console.log('GatewayACLService::getHomeOfUser: ' + accessToken + ' for HomeID ' + homeID);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        access_token: accessToken,
        'x-correlation-id': await this.authService.getCorrelationId()
      })
    };

    const url = gatewayAclEndpoint + '/users/homes/' + homeID;
    const retryConfig = {
      REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
      INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
      MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
      MAX_RETRIES: GatewayAclService.MAX_RETRIES,
    };
    const home: GatewayAclServiceUserHome = await this.webService.getApi(url, httpOptions, retryConfig).toPromise();

    this.logService.log(home);
    return home;
  }
}
