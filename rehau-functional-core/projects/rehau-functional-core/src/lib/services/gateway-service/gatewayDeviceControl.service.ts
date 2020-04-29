import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { WebService } from '../web-service/web.service';
import {
  Gateway,
  gatewayDeviceControlEndpoint
} from '../../models/getway.model';


@Injectable({
  providedIn: 'root'
})
export class GatewayDeviceControlService {
  private static INIT_INTERVAL = 2000;
  private static MAX_INTERVAL = 6000;
  private static MAX_RETRIES = 3;
  private static REQ_TIMEOUT = 6000;

  constructor(
    private authService: AuthService,
    private webService: WebService
  ) { }

  async updateGatewayData(gateway: Gateway, mac: string, accessToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'access_token': accessToken,
        'x-correlation-id': await this.authService.getCorrelationId()
      })
    };

    const url = gatewayDeviceControlEndpoint + '/gateways/' + mac;
    const retryConfig = {
      REQ_TIMEOUT: GatewayDeviceControlService.REQ_TIMEOUT,
      INIT_INTERVAL: GatewayDeviceControlService.INIT_INTERVAL,
      MAX_INTERVAL: GatewayDeviceControlService.MAX_INTERVAL,
      MAX_RETRIES: GatewayDeviceControlService.MAX_RETRIES,
    };
    const apiResponse: Gateway = await this.webService.getApi(url, httpOptions, retryConfig).toPromise();

    if (
      apiResponse.boxId &&
      apiResponse.homeGwId &&
      apiResponse.homeId &&
      apiResponse.id &&
      apiResponse.localIp
    ) {
      gateway.boxId = apiResponse.boxId;
      gateway.homeGwId = apiResponse.homeGwId;
      gateway.homeId = apiResponse.homeId;
      gateway.id = apiResponse.id;
      gateway.localIp = apiResponse.localIp;
    } else {
      throw new Error('Could not fetch Gateway, empty response!');
    }
  }
}
