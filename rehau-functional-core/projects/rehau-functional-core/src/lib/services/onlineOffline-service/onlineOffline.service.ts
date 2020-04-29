import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { GatewayService } from '../gateway-service/gateway.service';
import { LogService } from '../logger-service/logger.service';

export const onlineOfflineData = new Subject();


@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {
  // observerId = 5689564564;

  // private observer: IOnlineOfflineObserver[] = [];
  private refreshTime = 5000;
  failureRate = new BehaviorSubject<number>(0);

  REGUARD_OFFLINE = false;

  private tickInterval;
  private remoteOnline = true;
  private localOnline = true;

  constructor(
    private authService: AuthService,
    private gatewayService: GatewayService,
    private logService: LogService,
  ) {
    // ngOnInit not supported for services so logic has to be in constructor
    this.logService.log('onlineOffline::onInit');
    // this.initialize();
  }

  async initialize() {
    this.logService.log('onlineOffline::initialize');
    clearInterval(this.tickInterval);
    this.tickInterval = setInterval(() => {
      this.tick();
    }, this.refreshTime);
  }

  private async tick() {
    this.logService.log('onlineOffline::tick');
    const localBefore = this.localOnline;
    const remoteBefore = this.remoteOnline;
    // await this.checkLocalConnection();
    // await this.checkRemoteConnection();

    await this.checkConnection('local');
    await this.checkConnection('remote');

    if (
      localBefore !== this.localOnline ||
      remoteBefore !== this.remoteOnline
    ) {
      this.notify();
    }
  }

  private notify() {
    this.logService.log('onlineOffline::notify');
    onlineOfflineData.next({ localOnline: this.localOnline, remoteOnline: this.remoteOnline });
  }

  private async checkConnection(type) {
    const user = await this.authService.getUser();
    const gateway = await this.gatewayService.getPairedGateway(
      user.access_token
    );
    try {
      const response = await this.gatewayService.callApi(
        gateway,
        'ZAutomation/api/v1/status',
        'get',
        null,
        null,
        type
      );
      if (response !== undefined && response.code === 200) {
        if (type === 'local') {
          this.localOnline = true;
        } else {
          this.remoteOnline = true;
        }
      } else {
        this.logService.log('onlineOffline::local offline-- ' + JSON.stringify(response));
        // this.localOnline = true;
        if (type === 'local') {
          this.localOnline = false;
        } else {
          this.remoteOnline = false;
        }
      }
    } catch (e) {
      this.logService.log('onlineOffline::local offline catch');
      if (type === 'local') {
        this.localOnline = false;
      } else {
        this.remoteOnline = false;
      }
    }
  }

}
