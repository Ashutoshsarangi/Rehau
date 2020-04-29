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
export var onlineOfflineData = new Subject();
var OnlineOfflineService = /** @class */ (function () {
    function OnlineOfflineService(authService, gatewayService, logService) {
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
    OnlineOfflineService.prototype.initialize = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.logService.log('onlineOffline::initialize');
                clearInterval(this.tickInterval);
                this.tickInterval = setInterval((/**
                 * @return {?}
                 */
                function () {
                    _this.tick();
                }), this.refreshTime);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    OnlineOfflineService.prototype.tick = /**
     * @private
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localBefore, remoteBefore;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logService.log('onlineOffline::tick');
                        localBefore = this.localOnline;
                        remoteBefore = this.remoteOnline;
                        // await this.checkLocalConnection();
                        // await this.checkRemoteConnection();
                        return [4 /*yield*/, this.checkConnection('local')];
                    case 1:
                        // await this.checkLocalConnection();
                        // await this.checkRemoteConnection();
                        _a.sent();
                        return [4 /*yield*/, this.checkConnection('remote')];
                    case 2:
                        _a.sent();
                        if (localBefore !== this.localOnline ||
                            remoteBefore !== this.remoteOnline) {
                            this.notify();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    OnlineOfflineService.prototype.notify = /**
     * @private
     * @return {?}
     */
    function () {
        this.logService.log('onlineOffline::notify');
        onlineOfflineData.next({ localOnline: this.localOnline, remoteOnline: this.remoteOnline });
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    OnlineOfflineService.prototype.checkConnection = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, gateway, response, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        gateway = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.gatewayService.callApi(gateway, 'ZAutomation/api/v1/status', 'get', null, null, type)];
                    case 4:
                        response = _a.sent();
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
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.logService.log('onlineOffline::local offline catch');
                        if (type === 'local') {
                            this.localOnline = false;
                        }
                        else {
                            this.remoteOnline = false;
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OnlineOfflineService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    OnlineOfflineService.ctorParameters = function () { return [
        { type: AuthService },
        { type: GatewayService },
        { type: LogService }
    ]; };
    /** @nocollapse */ OnlineOfflineService.ngInjectableDef = i0.defineInjectable({ factory: function OnlineOfflineService_Factory() { return new OnlineOfflineService(i0.inject(i1.AuthService), i0.inject(i2.GatewayService), i0.inject(i3.LogService)); }, token: OnlineOfflineService, providedIn: "root" });
    return OnlineOfflineService;
}());
export { OnlineOfflineService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25saW5lT2ZmbGluZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29ubGluZU9mZmxpbmUtc2VydmljZS9vbmxpbmVPZmZsaW5lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7QUFFOUQsTUFBTSxLQUFPLGlCQUFpQixHQUFHLElBQUksT0FBTyxFQUFFO0FBRzlDO0lBZ0JFLDhCQUNVLFdBQXdCLEVBQ3hCLGNBQThCLEVBQzlCLFVBQXNCO1FBRnRCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZOzs7UUFaeEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUU3QyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUdoQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQU96Qix3RUFBd0U7UUFDeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3QyxxQkFBcUI7SUFDdkIsQ0FBQzs7OztJQUVLLHlDQUFVOzs7SUFBaEI7Ozs7Z0JBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsMkJB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QUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVRRLFdBQVc7Z0JBQ1gsY0FBYztnQkFDZCxVQUFVOzs7K0JBSm5CO0NBeUdDLEFBaEdELElBZ0dDO1NBN0ZZLG9CQUFvQjs7Ozs7O0lBSS9CLDJDQUEyQjs7SUFDM0IsMkNBQTZDOztJQUU3QywrQ0FBd0I7Ozs7O0lBRXhCLDRDQUFxQjs7Ozs7SUFDckIsNENBQTRCOzs7OztJQUM1QiwyQ0FBMkI7Ozs7O0lBR3pCLDJDQUFnQzs7Ozs7SUFDaEMsOENBQXNDOzs7OztJQUN0QywwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHYXRld2F5U2VydmljZSB9IGZyb20gJy4uL2dhdGV3YXktc2VydmljZS9nYXRld2F5LnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IG9ubGluZU9mZmxpbmVEYXRhID0gbmV3IFN1YmplY3QoKTtcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBPbmxpbmVPZmZsaW5lU2VydmljZSB7XG4gIC8vIG9ic2VydmVySWQgPSA1Njg5NTY0NTY0O1xuXG4gIC8vIHByaXZhdGUgb2JzZXJ2ZXI6IElPbmxpbmVPZmZsaW5lT2JzZXJ2ZXJbXSA9IFtdO1xuICBwcml2YXRlIHJlZnJlc2hUaW1lID0gNTAwMDtcbiAgZmFpbHVyZVJhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG5cbiAgUkVHVUFSRF9PRkZMSU5FID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB0aWNrSW50ZXJ2YWw7XG4gIHByaXZhdGUgcmVtb3RlT25saW5lID0gdHJ1ZTtcbiAgcHJpdmF0ZSBsb2NhbE9ubGluZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnYXRld2F5U2VydmljZTogR2F0ZXdheVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlLFxuICApIHtcbiAgICAvLyBuZ09uSW5pdCBub3Qgc3VwcG9ydGVkIGZvciBzZXJ2aWNlcyBzbyBsb2dpYyBoYXMgdG8gYmUgaW4gY29uc3RydWN0b3JcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdvbmxpbmVPZmZsaW5lOjpvbkluaXQnKTtcbiAgICAvLyB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGFzeW5jIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnb25saW5lT2ZmbGluZTo6aW5pdGlhbGl6ZScpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aWNrSW50ZXJ2YWwpO1xuICAgIHRoaXMudGlja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy50aWNrKCk7XG4gICAgfSwgdGhpcy5yZWZyZXNoVGltZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHRpY2soKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnb25saW5lT2ZmbGluZTo6dGljaycpO1xuICAgIGNvbnN0IGxvY2FsQmVmb3JlID0gdGhpcy5sb2NhbE9ubGluZTtcbiAgICBjb25zdCByZW1vdGVCZWZvcmUgPSB0aGlzLnJlbW90ZU9ubGluZTtcbiAgICAvLyBhd2FpdCB0aGlzLmNoZWNrTG9jYWxDb25uZWN0aW9uKCk7XG4gICAgLy8gYXdhaXQgdGhpcy5jaGVja1JlbW90ZUNvbm5lY3Rpb24oKTtcblxuICAgIGF3YWl0IHRoaXMuY2hlY2tDb25uZWN0aW9uKCdsb2NhbCcpO1xuICAgIGF3YWl0IHRoaXMuY2hlY2tDb25uZWN0aW9uKCdyZW1vdGUnKTtcblxuICAgIGlmIChcbiAgICAgIGxvY2FsQmVmb3JlICE9PSB0aGlzLmxvY2FsT25saW5lIHx8XG4gICAgICByZW1vdGVCZWZvcmUgIT09IHRoaXMucmVtb3RlT25saW5lXG4gICAgKSB7XG4gICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5KCkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ29ubGluZU9mZmxpbmU6Om5vdGlmeScpO1xuICAgIG9ubGluZU9mZmxpbmVEYXRhLm5leHQoeyBsb2NhbE9ubGluZTogdGhpcy5sb2NhbE9ubGluZSwgcmVtb3RlT25saW5lOiB0aGlzLnJlbW90ZU9ubGluZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2hlY2tDb25uZWN0aW9uKHR5cGUpIHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyKCk7XG4gICAgY29uc3QgZ2F0ZXdheSA9IGF3YWl0IHRoaXMuZ2F0ZXdheVNlcnZpY2UuZ2V0UGFpcmVkR2F0ZXdheShcbiAgICAgIHVzZXIuYWNjZXNzX3Rva2VuXG4gICAgKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdhdGV3YXlTZXJ2aWNlLmNhbGxBcGkoXG4gICAgICAgIGdhdGV3YXksXG4gICAgICAgICdaQXV0b21hdGlvbi9hcGkvdjEvc3RhdHVzJyxcbiAgICAgICAgJ2dldCcsXG4gICAgICAgIG51bGwsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHR5cGVcbiAgICAgICk7XG4gICAgICBpZiAocmVzcG9uc2UgIT09IHVuZGVmaW5lZCAmJiByZXNwb25zZS5jb2RlID09PSAyMDApIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdsb2NhbCcpIHtcbiAgICAgICAgICB0aGlzLmxvY2FsT25saW5lID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW90ZU9ubGluZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ29ubGluZU9mZmxpbmU6OmxvY2FsIG9mZmxpbmUtLSAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgLy8gdGhpcy5sb2NhbE9ubGluZSA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlID09PSAnbG9jYWwnKSB7XG4gICAgICAgICAgdGhpcy5sb2NhbE9ubGluZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3RlT25saW5lID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdvbmxpbmVPZmZsaW5lOjpsb2NhbCBvZmZsaW5lIGNhdGNoJyk7XG4gICAgICBpZiAodHlwZSA9PT0gJ2xvY2FsJykge1xuICAgICAgICB0aGlzLmxvY2FsT25saW5lID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW90ZU9ubGluZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=