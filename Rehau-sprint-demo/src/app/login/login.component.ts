import { Component } from '@angular/core';
import {
  LogService, LoginService, AuthService,
  GatewayAclService, GatewayDeviceControlService, GatewayService
} from 'rehau-functional-core/dist/rehau-functional-core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
// import { GatewayAclService } from '../services/gatewayAcl.service';
// import { GatewayDeviceControlService } from '../services/gatewayDeviceControl.service';
// import { GatewayService } from '../services/gateway.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private logService: LogService,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private gatewayaclService: GatewayAclService,
    private device: DeviceDetectorService,
    private gatewaydeviceControlService: GatewayDeviceControlService,
    private gatewayService: GatewayService,

  ) { }

  /**
   * @description This is login function which will call Cidass auth function of rehau-functioanl-core
   * @param authType is the string which indicates the type of action whether it is login or register
   */
  login(authType) {
    this.logService.log('Am calling is login forst for first time');
    try {
      const device = this.device.isMobile() ? 'mobile' : 'browser';
      this.loginService.cidaasAuth(authType, device).then(res => {
        if (res === undefined) {
          this.logService.log_e('User closed the CIDAAS AUTH POPUP');
        } else if (res.status === '0') {
          this.logService.log('refresh token success');
          this.logService.log(res);
          this.checkCloudForHomeAndGateway(res);
          // this.router.navigate(['/landing']);
        } else {
          this.logService.log_e('Error while log in == ' + res.message);
        }
      });
    } catch (err) {
      this.logService.log_e('error in test app in cidaasAuth');
    }
  }

  /**
   * @description method to get the getway object based on the user login information
   * @param userObject logged in user object
   */
  async checkCloudForHomeAndGateway(userObject) {
    const homes = await this.gatewayaclService.cloudGetHomes(userObject.accessToken);
    this.logService.log('Home Object --> cloudGetHomes', homes);
    const gateways = await this.gatewayaclService.getGatewaysToHome(
      userObject.accessToken,
      homes.homes[0].homeId,
      homes.response
    );
    // If gateways.length == 0 --> go to On_Boarding Route(Leakage App)
    this.logService.log('GateWays Object --> getGatewaysToHome--> ', gateways);

    const homeOfUser = await this.gatewayaclService.getHomeOfUser(
      userObject.accessToken,
      homes.homes[0].homeId
    );
    this.logService.log('HomeOfUser Object --> getHomeOfUser --> ', homeOfUser);
    const getGateWayData = await this.gatewaydeviceControlService.updateGatewayData(
      gateways[0],
      homeOfUser.gateways[gateways[0].homeGwId].gwMac,
      userObject.accessToken
    );

    this.logService.log('getGateWayData Object --> getGateWayData --> ', getGateWayData);
    const lds = await this.gatewayService.getLeckageDeviceConnectedToGateway(
      gateways[0],
      false
    );
    this.logService.log('lds Object --> getLeckageDeviceConnectedToGateway --> ', lds);
    gateways[0].leckageDeviceId = lds[lds.length - 1].nodeId;
    this.gatewayService.saveGateway(userObject.accessToken, gateways[0]);
    this.router.navigate(['/landing']);


  }
}
