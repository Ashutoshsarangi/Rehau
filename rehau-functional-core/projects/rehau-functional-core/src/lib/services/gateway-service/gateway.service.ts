import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GatewayAclService } from './gatewayAcl.service';
import { AuthService } from '../auth-service/auth.service';
import { CacheService } from '../cache-service/cache.service';
import { WebService } from '../web-service/web.service';
import { LogService } from '../logger-service/logger.service';
import {
  CommonConstants,
  GatewayCredentialsTypes,
  Gateway,
  ILogoutInterface,
  gatewayDeviceControlEndpoint
} from '../../models/getway.model';

export class GatewayAlreadyConfiguredError extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, GatewayAlreadyConfiguredError.prototype);
  }
}

export class GatewaySerialNotFoundError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'GatewaySerialNotFoundError';
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, GatewayAlreadyConfiguredError.prototype);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GatewayService implements ILogoutInterface {
  private static INIT_INTERVAL_REMOTE = 2000;
  private static MAX_INTERVAL_REMOTE = 6000;
  private static REQ_TIMEOUT_REMOTE = 20000;

  private static INIT_INTERVAL_LOCAL = 2000;
  private static MAX_INTERVAL_LOCAL = 6000;
  private static REQ_TIMEOUT_LOCAL = 6000;

  observerId = 48976446132111;

  private localOnline;
  private remoteOnline;
  private completedFirstRun = false;
  private storageName = 'gateway_device';

  constructor(
    private http: HttpClient,
    private gatewayAclService: GatewayAclService,
    private authService: AuthService,
    private cacheService: CacheService,
    private webService: WebService,
    private logService: LogService,
  ) {
  }


  /**
   * @description Calls the Gateway API
   * @param gateway gateWay Information
   * @param apiEndpoint This is Api End P{oints}
   * @param method Specific Method To Follow
   * @param body Body If It is a POST Api Call
   * @param headers not used right now
   * @param connectionType explicitly decide, if it should be called locally, or remotely. Default: remote
   */
  async callApi(
    gateway: Gateway,
    apiEndpoint: string,
    method: string = 'get',
    body: any | null = null,
    headers?: {},
    connectionType?: 'remote' | 'local' | 'admin',
    retryLocal: number = 2,
    retryRemote: number = 3,
    killRequestObject: { continue: boolean } = { continue: true },
    localResponseType: string = 'json'
  ) {
    const retryConfig = {
      REQ_TIMEOUT: GatewayService.REQ_TIMEOUT_LOCAL,
      INIT_INTERVAL: GatewayService.INIT_INTERVAL_LOCAL,
      MAX_INTERVAL: GatewayService.MAX_INTERVAL_LOCAL,
      MAX_RETRIES: retryLocal,
    };

    // If no connection Type is given and the Method is run for the first Time
    if (!connectionType && this.completedFirstRun) {
      if (this.localOnline) {
        connectionType = 'local';
      } else if (this.remoteOnline) {
        connectionType = 'remote';
      } else {
        // go to race between remote and local
        connectionType = undefined;
      }
    }

    // try remote call first, else try local
    let username: string;
    let password: string;
    const useCredentials =
      connectionType === 'local'
        ? GatewayCredentialsTypes.LOCAL
        : GatewayCredentialsTypes.REMOTE;

    // this.logService.log('cred type: ' + useCredentials);
    for (const creds of gateway.credentials) {
      // this.logService.log('iterate creds' + JSON.stringify(creds));
      if (creds.type === useCredentials) {
        username = creds.user;
        password = creds.password;
      }
    }

    if (username === undefined || password === undefined) {
      throw new Error('Username or Password undefined');
    }

    if (connectionType === 'remote') {
      this.logService.log('Connection is remote');
      const requestBody = {
        boxId: gateway.boxId,
        username,
        password,
        urlEndpoint: apiEndpoint,
        method,
        body: undefined
      };
      if (
        method.toUpperCase() === 'POST' ||
        method.toUpperCase() === 'PUT' ||
        method.toUpperCase() === 'PATCH'
      ) {
        requestBody.body = JSON.stringify(body);
      }
      const user: any = await this.authService.getUser();

      const requestHeader = {
        access_token: user.access_token
      };

      try {
        requestHeader[
          'x-correlation-id'
        ] = await this.authService.getCorrelationId();
      } catch (e) {
        this.logService.log_e(e);
      }
      const url = gatewayDeviceControlEndpoint + '/gateways/control';
      const httpOption = {
        headers: requestHeader
      };
      try {
        const apiResponse = await this.webService.postApi(url, requestBody, httpOption, retryConfig).toPromise();
        this.remoteOnline = true;
        this.completedFirstRun = true;
        return apiResponse;
      } catch (e) {
        this.logService.log_e(
          'gatewayservice::callApi: Network error remote request' +
          JSON.stringify(e)
        );
        this.remoteOnline = false;
      }
    } else if (connectionType === 'local' || connectionType === 'admin') {
      this.logService.log('Connection is local');
      const basicAuthString = 'Basic ' + btoa(username + ':' + password);
      // const user = await this.userService.getUser();
      try {
        const httpOptions = {
          headers: { Authorization: basicAuthString }
        };
        if (
          method.toUpperCase() !== 'GET' &&
          method.toUpperCase() !== 'OPTIONS'
        ) {
          // tslint:disable-next-line:no-string-literal
          httpOptions['body'] = body;
        }
        // tslint:disable-next-line:no-string-literal
        httpOptions['responseType'] = localResponseType;
        const url = 'http://' + gateway.localIp + ':8083/' + apiEndpoint;

        // Create separate method for request API
        const apiResponse = await this.webService.requestApi(method, url, httpOptions, retryConfig).toPromise();
        this.localOnline = true;
        this.completedFirstRun = true;
        return apiResponse;
      } catch (e) {
        this.logService.log_e(
          'gatewayservice::callApi: Network error local request' +
          JSON.stringify(e)
        );
        this.localOnline = false;
        if (!connectionType) {
          return await this.callApi(
            gateway,
            apiEndpoint,
            method,
            body,
            headers,
            'remote'
          );
        } else {
          throw e;
        }
      }
    } else if (!connectionType) {
      // Do requests in parallel, if no connectionType is specified
      const curtime = new Date().getTime();
      const cancelRequestLocal = { continue: true };
      const cancelRequestRemote = { continue: true };
      const remotePromise = this.callApi(
        gateway,
        apiEndpoint,
        method,
        body,
        headers,
        'remote',
        undefined,
        undefined,
        cancelRequestRemote
      );
      const localPromise = this.callApi(
        gateway,
        apiEndpoint,
        method,
        body,
        headers,
        'local',
        undefined,
        undefined,
        cancelRequestLocal
      );
      try {
        // wait for first to finish
        const response = await Promise.race([remotePromise, localPromise]);
        cancelRequestLocal.continue = false;
        cancelRequestRemote.continue = false;
        return response;
      } catch (e) {
        // jumps in this catch, if one of the request fails
        this.logService.log_e('gatewayservice::callApi: parallel promise failed ' + e);
        // wait for both to finish
        // the promise that failed before will fail again here and throw an exception
        // the other one is still open and could resolve or reject
        let result;
        try {
          result = await remotePromise;
          this.remoteOnline = true;
        } catch (e) {
          this.remoteOnline = false;
          this.logService.log_e(
            'gatewayservice::callApi: remote request failed with error ' +
            JSON.stringify(e)
          );
        }
        try {
          result = await localPromise;
          this.localOnline = true;
        } catch (e) {
          this.localOnline = false;
          this.logService.log_e(
            'gatewayservice::callApi: Local request failed with error ' +
            JSON.stringify(e)
          );
        }
        if (result === undefined) {
          throw new Error('gatewayservice::callApi: Both requests failed');
        }
        return result;
      }
    }
  }

  /**
   * @description Calls the ZWaveAPI and get data for all the conected devices
   * @param gateway gateWay Information
   * @param getMock bollean type
   * @param doDefaultRetrys retry parameter type boolean
   */
  async getLeckageDeviceConnectedToGateway(
    gateway: Gateway,
    getMock: boolean = false,
    doDefaultRetrys = false
  ) {
    // if (getMock) {
    //   return [
    //     {
    //       nodeId: 3,
    //       givenName: 'MockDevice'
    //     }
    //   ];
    // }
    let allDevices;
    if (doDefaultRetrys) {
      allDevices = await this.callApi(
        gateway,
        'ZWaveAPI/Data',
        'get',
        null,
        null,
        null
      );
    } else {
      allDevices = await this.callApi(
        gateway,
        'ZWaveAPI/Data',
        'get',
        null,
        null,
        null,
        1,
        1
      );
    }

    const foundDevices = [];
    this.logService.log('gatewayService::got devices: ' + JSON.stringify(allDevices));
    // tslint:disable-next-line:forin
    for (const nodeId in allDevices.devices) {
      const device = allDevices.devices[nodeId];
      if (
        device.data.manufacturerId.value ===
        CommonConstants.LECKAGE_MANUFACTURER_ID &&
        device.data.manufacturerProductId.value ===
        CommonConstants.LECKAGE_MANUFACTURER_PRODUCT_ID &&
        device.data.manufacturerProductType.value ===
        CommonConstants.LECKAGE_MANUFACTURER_TYPE
      ) {
        foundDevices.push({
          nodeId,
          givenName: device.data.givenName.value
        });
      }

    }
    return foundDevices;
  }

  /**
   * @description not in use
   */
  async onLogout() {
    // await this.localStorageService.removePersistentItem(this.storageName);
  }

  /**
   * @description method to save the gateway object in local storage for persistence use
   * @param accessToken accesstoken
   * @param gateway object to save
   */
  async saveGateway(accessToken: string, gateway: Gateway) {
    this.logService.log(accessToken);
    this.cacheService.setLocalData(this.storageName, JSON.stringify(gateway));
  }

  /**
   * @description method to fetch gateway object from local storage and return parse gateway object
   * @param accessToken access token
   */
  async getPairedGateway(accessToken: string): Promise<Gateway> {
    this.logService.log('in get pair getway service', accessToken);
    const rawGatewayObject = JSON.stringify(this.cacheService.getLocalData(
      this.storageName
    ));
    this.logService.log(rawGatewayObject);
    const gw: Gateway = JSON.parse(rawGatewayObject);
    return gw;
  }

}
