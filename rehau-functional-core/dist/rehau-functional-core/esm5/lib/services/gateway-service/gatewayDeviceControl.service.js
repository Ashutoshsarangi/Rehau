/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { WebService } from '../web-service/web.service';
import { gatewayDeviceControlEndpoint } from '../../models/getway.model';
import * as i0 from "@angular/core";
import * as i1 from "../auth-service/auth.service";
import * as i2 from "../web-service/web.service";
var GatewayDeviceControlService = /** @class */ (function () {
    function GatewayDeviceControlService(authService, webService) {
        this.authService = authService;
        this.webService = webService;
    }
    /**
     * @param {?} gateway
     * @param {?} mac
     * @param {?} accessToken
     * @return {?}
     */
    GatewayDeviceControlService.prototype.updateGatewayData = /**
     * @param {?} gateway
     * @param {?} mac
     * @param {?} accessToken
     * @return {?}
     */
    function (gateway, mac, accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var httpOptions, _a, _b, _c, _d, url, retryConfig, apiResponse;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = {};
                        _b = HttpHeaders.bind;
                        _c = {
                            'Content-Type': 'application/json',
                            // tslint:disable-next-line:object-literal-key-quotes
                            'access_token': accessToken
                        };
                        _d = 'x-correlation-id';
                        return [4 /*yield*/, this.authService.getCorrelationId()];
                    case 1:
                        httpOptions = (_a.headers = new (_b.apply(HttpHeaders, [void 0, (_c[_d] = _e.sent(),
                                _c)]))(),
                            _a);
                        url = gatewayDeviceControlEndpoint + '/gateways/' + mac;
                        retryConfig = {
                            REQ_TIMEOUT: GatewayDeviceControlService.REQ_TIMEOUT,
                            INIT_INTERVAL: GatewayDeviceControlService.INIT_INTERVAL,
                            MAX_INTERVAL: GatewayDeviceControlService.MAX_INTERVAL,
                            MAX_RETRIES: GatewayDeviceControlService.MAX_RETRIES,
                        };
                        return [4 /*yield*/, this.webService.getApi(url, httpOptions, retryConfig).toPromise()];
                    case 2:
                        apiResponse = _e.sent();
                        if (apiResponse.boxId &&
                            apiResponse.homeGwId &&
                            apiResponse.homeId &&
                            apiResponse.id &&
                            apiResponse.localIp) {
                            gateway.boxId = apiResponse.boxId;
                            gateway.homeGwId = apiResponse.homeGwId;
                            gateway.homeId = apiResponse.homeId;
                            gateway.id = apiResponse.id;
                            gateway.localIp = apiResponse.localIp;
                        }
                        else {
                            throw new Error('Could not fetch Gateway, empty response!');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GatewayDeviceControlService.INIT_INTERVAL = 2000;
    GatewayDeviceControlService.MAX_INTERVAL = 6000;
    GatewayDeviceControlService.MAX_RETRIES = 3;
    GatewayDeviceControlService.REQ_TIMEOUT = 6000;
    GatewayDeviceControlService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    GatewayDeviceControlService.ctorParameters = function () { return [
        { type: AuthService },
        { type: WebService }
    ]; };
    /** @nocollapse */ GatewayDeviceControlService.ngInjectableDef = i0.defineInjectable({ factory: function GatewayDeviceControlService_Factory() { return new GatewayDeviceControlService(i0.inject(i1.AuthService), i0.inject(i2.WebService)); }, token: GatewayDeviceControlService, providedIn: "root" });
    return GatewayDeviceControlService;
}());
export { GatewayDeviceControlService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GatewayDeviceControlService.INIT_INTERVAL;
    /**
     * @type {?}
     * @private
     */
    GatewayDeviceControlService.MAX_INTERVAL;
    /**
     * @type {?}
     * @private
     */
    GatewayDeviceControlService.MAX_RETRIES;
    /**
     * @type {?}
     * @private
     */
    GatewayDeviceControlService.REQ_TIMEOUT;
    /**
     * @type {?}
     * @private
     */
    GatewayDeviceControlService.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    GatewayDeviceControlService.prototype.webService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheURldmljZUNvbnRyb2wuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9nYXRld2F5LXNlcnZpY2UvZ2F0ZXdheURldmljZUNvbnRyb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUVMLDRCQUE0QixFQUM3QixNQUFNLDJCQUEyQixDQUFDOzs7O0FBR25DO0lBU0UscUNBQ1UsV0FBd0IsRUFDeEIsVUFBc0I7UUFEdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUM1QixDQUFDOzs7Ozs7O0lBRUMsdURBQWlCOzs7Ozs7SUFBdkIsVUFBd0IsT0FBZ0IsRUFBRSxHQUFXLEVBQUUsV0FBbUI7Ozs7Ozs7NkJBRXpELFdBQVc7OzRCQUN0QixjQUFjLEVBQUUsa0JBQWtCOzs0QkFFbEMsY0FBYyxFQUFFLFdBQVc7O3dCQUMzQixLQUFBLGtCQUFrQixDQUFBO3dCQUFFLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7d0JBTDNELFdBQVcsSUFDZixVQUFPLEdBQUUsY0FBSSxXQUFXLFlBSXRCLE1BQWtCLEdBQUUsU0FBeUM7d0NBQzdEOytCQUNIO3dCQUVLLEdBQUcsR0FBRyw0QkFBNEIsR0FBRyxZQUFZLEdBQUcsR0FBRzt3QkFDdkQsV0FBVyxHQUFHOzRCQUNsQixXQUFXLEVBQUUsMkJBQTJCLENBQUMsV0FBVzs0QkFDcEQsYUFBYSxFQUFFLDJCQUEyQixDQUFDLGFBQWE7NEJBQ3hELFlBQVksRUFBRSwyQkFBMkIsQ0FBQyxZQUFZOzRCQUN0RCxXQUFXLEVBQUUsMkJBQTJCLENBQUMsV0FBVzt5QkFDckQ7d0JBQzRCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUE5RixXQUFXLEdBQVksU0FBdUU7d0JBRXBHLElBQ0UsV0FBVyxDQUFDLEtBQUs7NEJBQ2pCLFdBQVcsQ0FBQyxRQUFROzRCQUNwQixXQUFXLENBQUMsTUFBTTs0QkFDbEIsV0FBVyxDQUFDLEVBQUU7NEJBQ2QsV0FBVyxDQUFDLE9BQU8sRUFDbkI7NEJBQ0EsT0FBTyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDOzRCQUNsQyxPQUFPLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7NEJBQ3hDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQzs0QkFDcEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDOzRCQUM1QixPQUFPLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7eUJBQ3ZDOzZCQUFNOzRCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQzt5QkFDN0Q7Ozs7O0tBQ0Y7SUE1Q2MseUNBQWEsR0FBRyxJQUFJLENBQUM7SUFDckIsd0NBQVksR0FBRyxJQUFJLENBQUM7SUFDcEIsdUNBQVcsR0FBRyxDQUFDLENBQUM7SUFDaEIsdUNBQVcsR0FBRyxJQUFJLENBQUM7O2dCQVBuQyxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVZRLFdBQVc7Z0JBQ1gsVUFBVTs7O3NDQUhuQjtDQTJEQyxBQWpERCxJQWlEQztTQTlDWSwyQkFBMkI7Ozs7OztJQUN0QywwQ0FBb0M7Ozs7O0lBQ3BDLHlDQUFtQzs7Ozs7SUFDbkMsd0NBQStCOzs7OztJQUMvQix3Q0FBa0M7Ozs7O0lBR2hDLGtEQUFnQzs7Ozs7SUFDaEMsaURBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2F1dGgtc2VydmljZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gJy4uL3dlYi1zZXJ2aWNlL3dlYi5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEdhdGV3YXksXG4gIGdhdGV3YXlEZXZpY2VDb250cm9sRW5kcG9pbnRcbn0gZnJvbSAnLi4vLi4vbW9kZWxzL2dldHdheS5tb2RlbCc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2F0ZXdheURldmljZUNvbnRyb2xTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgSU5JVF9JTlRFUlZBTCA9IDIwMDA7XG4gIHByaXZhdGUgc3RhdGljIE1BWF9JTlRFUlZBTCA9IDYwMDA7XG4gIHByaXZhdGUgc3RhdGljIE1BWF9SRVRSSUVTID0gMztcbiAgcHJpdmF0ZSBzdGF0aWMgUkVRX1RJTUVPVVQgPSA2MDAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2ViU2VydmljZTogV2ViU2VydmljZVxuICApIHsgfVxuXG4gIGFzeW5jIHVwZGF0ZUdhdGV3YXlEYXRhKGdhdGV3YXk6IEdhdGV3YXksIG1hYzogc3RyaW5nLCBhY2Nlc3NUb2tlbjogc3RyaW5nKSB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b2JqZWN0LWxpdGVyYWwta2V5LXF1b3Rlc1xuICAgICAgICAnYWNjZXNzX3Rva2VuJzogYWNjZXNzVG9rZW4sXG4gICAgICAgICd4LWNvcnJlbGF0aW9uLWlkJzogYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRDb3JyZWxhdGlvbklkKClcbiAgICAgIH0pXG4gICAgfTtcblxuICAgIGNvbnN0IHVybCA9IGdhdGV3YXlEZXZpY2VDb250cm9sRW5kcG9pbnQgKyAnL2dhdGV3YXlzLycgKyBtYWM7XG4gICAgY29uc3QgcmV0cnlDb25maWcgPSB7XG4gICAgICBSRVFfVElNRU9VVDogR2F0ZXdheURldmljZUNvbnRyb2xTZXJ2aWNlLlJFUV9USU1FT1VULFxuICAgICAgSU5JVF9JTlRFUlZBTDogR2F0ZXdheURldmljZUNvbnRyb2xTZXJ2aWNlLklOSVRfSU5URVJWQUwsXG4gICAgICBNQVhfSU5URVJWQUw6IEdhdGV3YXlEZXZpY2VDb250cm9sU2VydmljZS5NQVhfSU5URVJWQUwsXG4gICAgICBNQVhfUkVUUklFUzogR2F0ZXdheURldmljZUNvbnRyb2xTZXJ2aWNlLk1BWF9SRVRSSUVTLFxuICAgIH07XG4gICAgY29uc3QgYXBpUmVzcG9uc2U6IEdhdGV3YXkgPSBhd2FpdCB0aGlzLndlYlNlcnZpY2UuZ2V0QXBpKHVybCwgaHR0cE9wdGlvbnMsIHJldHJ5Q29uZmlnKS50b1Byb21pc2UoKTtcblxuICAgIGlmIChcbiAgICAgIGFwaVJlc3BvbnNlLmJveElkICYmXG4gICAgICBhcGlSZXNwb25zZS5ob21lR3dJZCAmJlxuICAgICAgYXBpUmVzcG9uc2UuaG9tZUlkICYmXG4gICAgICBhcGlSZXNwb25zZS5pZCAmJlxuICAgICAgYXBpUmVzcG9uc2UubG9jYWxJcFxuICAgICkge1xuICAgICAgZ2F0ZXdheS5ib3hJZCA9IGFwaVJlc3BvbnNlLmJveElkO1xuICAgICAgZ2F0ZXdheS5ob21lR3dJZCA9IGFwaVJlc3BvbnNlLmhvbWVHd0lkO1xuICAgICAgZ2F0ZXdheS5ob21lSWQgPSBhcGlSZXNwb25zZS5ob21lSWQ7XG4gICAgICBnYXRld2F5LmlkID0gYXBpUmVzcG9uc2UuaWQ7XG4gICAgICBnYXRld2F5LmxvY2FsSXAgPSBhcGlSZXNwb25zZS5sb2NhbElwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmZXRjaCBHYXRld2F5LCBlbXB0eSByZXNwb25zZSEnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==