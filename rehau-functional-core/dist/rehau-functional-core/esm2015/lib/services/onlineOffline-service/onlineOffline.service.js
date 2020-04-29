/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { GatewayService } from '../gateway-service/gateway.service';
import { LogService } from '../logger-service/logger.service';
import * as i0 from "@angular/core";
import * as i1 from "../auth-service/auth.service";
import * as i2 from "../gateway-service/gateway.service";
import * as i3 from "../logger-service/logger.service";
/** @type {?} */
export const onlineOfflineData = new Subject();
export class OnlineOfflineService {
    /**
     * @param {?} authService
     * @param {?} gatewayService
     * @param {?} logService
     */
    constructor(authService, gatewayService, logService) {
        this.authService = authService;
        this.gatewayService = gatewayService;
        this.logService = logService;
        // observerId = 5689564564;
        // private observer: IOnlineOfflineObserver[] = [];
        this.refreshTime = 5000;
        this.failureRate = new BehaviorSubject(0);
        this.REGUARD_OFFLINE = false;
        this.remoteOnline = true;
        this.localOnline = true;
        // ngOnInit not supported for services so logic has to be in constructor
        this.logService.log('onlineOffline::onInit');
        // this.initialize();
    }
    /**
     * @return {?}
     */
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log('onlineOffline::initialize');
            clearInterval(this.tickInterval);
            this.tickInterval = setInterval((/**
             * @return {?}
             */
            () => {
                this.tick();
            }), this.refreshTime);
        });
    }
    /**
     * @private
     * @return {?}
     */
    tick() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log('onlineOffline::tick');
            /** @type {?} */
            const localBefore = this.localOnline;
            /** @type {?} */
            const remoteBefore = this.remoteOnline;
            // await this.checkLocalConnection();
            // await this.checkRemoteConnection();
            yield this.checkConnection('local');
            yield this.checkConnection('remote');
            if (localBefore !== this.localOnline ||
                remoteBefore !== this.remoteOnline) {
                this.notify();
            }
        });
    }
    /**
     * @private
     * @return {?}
     */
    notify() {
        this.logService.log('onlineOffline::notify');
        onlineOfflineData.next({ localOnline: this.localOnline, remoteOnline: this.remoteOnline });
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    checkConnection(type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const gateway = yield this.gatewayService.getPairedGateway(user.access_token);
            try {
                /** @type {?} */
                const response = yield this.gatewayService.callApi(gateway, 'ZAutomation/api/v1/status', 'get', null, null, type);
                if (response !== undefined && response.code === 200) {
                    if (type === 'local') {
                        this.localOnline = true;
                    }
                    else {
                        this.remoteOnline = true;
                    }
                }
                else {
                    this.logService.log('onlineOffline::local offline-- ' + JSON.stringify(response));
                    // this.localOnline = true;
                    if (type === 'local') {
                        this.localOnline = false;
                    }
                    else {
                        this.remoteOnline = false;
                    }
                }
            }
            catch (e) {
                this.logService.log('onlineOffline::local offline catch');
                if (type === 'local') {
                    this.localOnline = false;
                }
                else {
                    this.remoteOnline = false;
                }
            }
        });
    }
}
OnlineOfflineService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
OnlineOfflineService.ctorParameters = () => [
    { type: AuthService },
    { type: GatewayService },
    { type: LogService }
];
/** @nocollapse */ OnlineOfflineService.ngInjectableDef = i0.defineInjectable({ factory: function OnlineOfflineService_Factory() { return new OnlineOfflineService(i0.inject(i1.AuthService), i0.inject(i2.GatewayService), i0.inject(i3.LogService)); }, token: OnlineOfflineService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    OnlineOfflineService.prototype.refreshTime;
    /** @type {?} */
    OnlineOfflineService.prototype.failureRate;
    /** @type {?} */
    OnlineOfflineService.prototype.REGUARD_OFFLINE;
    /**
     * @type {?}
     * @private
     */
    OnlineOfflineService.prototype.tickInterval;
    /**
     * @type {?}
     * @private
     */
    OnlineOfflineService.prototype.remoteOnline;
    /**
     * @type {?}
     * @private
     */
    OnlineOfflineService.prototype.localOnline;
    /**
     * @type {?}
     * @private
     */
    OnlineOfflineService.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    OnlineOfflineService.prototype.gatewayService;
    /**
     * @type {?}
     * @private
     */
    OnlineOfflineService.prototype.logService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25saW5lT2ZmbGluZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29ubGluZU9mZmxpbmUtc2VydmljZS9vbmxpbmVPZmZsaW5lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7QUFFOUQsTUFBTSxPQUFPLGlCQUFpQixHQUFHLElBQUksT0FBTyxFQUFFO0FBTTlDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQWEvQixZQUNVLFdBQXdCLEVBQ3hCLGNBQThCLEVBQzlCLFVBQXNCO1FBRnRCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZOzs7UUFaeEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUU3QyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUdoQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQU96Qix3RUFBd0U7UUFDeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3QyxxQkFBcUI7SUFDdkIsQ0FBQzs7OztJQUVLLFVBQVU7O1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFH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QUE2Qzs7SUFFN0MsK0NBQXdCOzs7OztJQUV4Qiw0Q0FBcUI7Ozs7O0lBQ3JCLDRDQUE0Qjs7Ozs7SUFDNUIsMkNBQTJCOzs7OztJQUd6QiwyQ0FBZ0M7Ozs7O0lBQ2hDLDhDQUFzQzs7Ozs7SUFDdEMsMENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2F1dGgtc2VydmljZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2F0ZXdheVNlcnZpY2UgfSBmcm9tICcuLi9nYXRld2F5LXNlcnZpY2UvZ2F0ZXdheS5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXItc2VydmljZS9sb2dnZXIuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBvbmxpbmVPZmZsaW5lRGF0YSA9IG5ldyBTdWJqZWN0KCk7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgT25saW5lT2ZmbGluZVNlcnZpY2Uge1xuICAvLyBvYnNlcnZlcklkID0gNTY4OTU2NDU2NDtcblxuICAvLyBwcml2YXRlIG9ic2VydmVyOiBJT25saW5lT2ZmbGluZU9ic2VydmVyW10gPSBbXTtcbiAgcHJpdmF0ZSByZWZyZXNoVGltZSA9IDUwMDA7XG4gIGZhaWx1cmVSYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuXG4gIFJFR1VBUkRfT0ZGTElORSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgdGlja0ludGVydmFsO1xuICBwcml2YXRlIHJlbW90ZU9ubGluZSA9IHRydWU7XG4gIHByaXZhdGUgbG9jYWxPbmxpbmUgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2F0ZXdheVNlcnZpY2U6IEdhdGV3YXlTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9nU2VydmljZTogTG9nU2VydmljZSxcbiAgKSB7XG4gICAgLy8gbmdPbkluaXQgbm90IHN1cHBvcnRlZCBmb3Igc2VydmljZXMgc28gbG9naWMgaGFzIHRvIGJlIGluIGNvbnN0cnVjdG9yXG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnb25saW5lT2ZmbGluZTo6b25Jbml0Jyk7XG4gICAgLy8gdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBhc3luYyBpbml0aWFsaXplKCkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ29ubGluZU9mZmxpbmU6OmluaXRpYWxpemUnKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGlja0ludGVydmFsKTtcbiAgICB0aGlzLnRpY2tJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMudGljaygpO1xuICAgIH0sIHRoaXMucmVmcmVzaFRpbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB0aWNrKCkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ29ubGluZU9mZmxpbmU6OnRpY2snKTtcbiAgICBjb25zdCBsb2NhbEJlZm9yZSA9IHRoaXMubG9jYWxPbmxpbmU7XG4gICAgY29uc3QgcmVtb3RlQmVmb3JlID0gdGhpcy5yZW1vdGVPbmxpbmU7XG4gICAgLy8gYXdhaXQgdGhpcy5jaGVja0xvY2FsQ29ubmVjdGlvbigpO1xuICAgIC8vIGF3YWl0IHRoaXMuY2hlY2tSZW1vdGVDb25uZWN0aW9uKCk7XG5cbiAgICBhd2FpdCB0aGlzLmNoZWNrQ29ubmVjdGlvbignbG9jYWwnKTtcbiAgICBhd2FpdCB0aGlzLmNoZWNrQ29ubmVjdGlvbigncmVtb3RlJyk7XG5cbiAgICBpZiAoXG4gICAgICBsb2NhbEJlZm9yZSAhPT0gdGhpcy5sb2NhbE9ubGluZSB8fFxuICAgICAgcmVtb3RlQmVmb3JlICE9PSB0aGlzLnJlbW90ZU9ubGluZVxuICAgICkge1xuICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeSgpIHtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdvbmxpbmVPZmZsaW5lOjpub3RpZnknKTtcbiAgICBvbmxpbmVPZmZsaW5lRGF0YS5uZXh0KHsgbG9jYWxPbmxpbmU6IHRoaXMubG9jYWxPbmxpbmUsIHJlbW90ZU9ubGluZTogdGhpcy5yZW1vdGVPbmxpbmUgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNoZWNrQ29ubmVjdGlvbih0eXBlKSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlcigpO1xuICAgIGNvbnN0IGdhdGV3YXkgPSBhd2FpdCB0aGlzLmdhdGV3YXlTZXJ2aWNlLmdldFBhaXJlZEdhdGV3YXkoXG4gICAgICB1c2VyLmFjY2Vzc190b2tlblxuICAgICk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nYXRld2F5U2VydmljZS5jYWxsQXBpKFxuICAgICAgICBnYXRld2F5LFxuICAgICAgICAnWkF1dG9tYXRpb24vYXBpL3YxL3N0YXR1cycsXG4gICAgICAgICdnZXQnLFxuICAgICAgICBudWxsLFxuICAgICAgICBudWxsLFxuICAgICAgICB0eXBlXG4gICAgICApO1xuICAgICAgaWYgKHJlc3BvbnNlICE9PSB1bmRlZmluZWQgJiYgcmVzcG9uc2UuY29kZSA9PT0gMjAwKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnbG9jYWwnKSB7XG4gICAgICAgICAgdGhpcy5sb2NhbE9ubGluZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdGVPbmxpbmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdvbmxpbmVPZmZsaW5lOjpsb2NhbCBvZmZsaW5lLS0gJyArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG4gICAgICAgIC8vIHRoaXMubG9jYWxPbmxpbmUgPSB0cnVlO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2xvY2FsJykge1xuICAgICAgICAgIHRoaXMubG9jYWxPbmxpbmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW90ZU9ubGluZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnb25saW5lT2ZmbGluZTo6bG9jYWwgb2ZmbGluZSBjYXRjaCcpO1xuICAgICAgaWYgKHR5cGUgPT09ICdsb2NhbCcpIHtcbiAgICAgICAgdGhpcy5sb2NhbE9ubGluZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdGVPbmxpbmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19