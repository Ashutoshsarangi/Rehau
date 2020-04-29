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
export class GatewayDeviceControlService {
    /**
     * @param {?} authService
     * @param {?} webService
     */
    constructor(authService, webService) {
        this.authService = authService;
        this.webService = webService;
    }
    /**
     * @param {?} gateway
     * @param {?} mac
     * @param {?} accessToken
     * @return {?}
     */
    updateGatewayData(gateway, mac, accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    // tslint:disable-next-line:object-literal-key-quotes
                    'access_token': accessToken,
                    'x-correlation-id': yield this.authService.getCorrelationId()
                })
            };
            /** @type {?} */
            const url = gatewayDeviceControlEndpoint + '/gateways/' + mac;
            /** @type {?} */
            const retryConfig = {
                REQ_TIMEOUT: GatewayDeviceControlService.REQ_TIMEOUT,
                INIT_INTERVAL: GatewayDeviceControlService.INIT_INTERVAL,
                MAX_INTERVAL: GatewayDeviceControlService.MAX_INTERVAL,
                MAX_RETRIES: GatewayDeviceControlService.MAX_RETRIES,
            };
            /** @type {?} */
            const apiResponse = yield this.webService.getApi(url, httpOptions, retryConfig).toPromise();
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
        });
    }
}
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
GatewayDeviceControlService.ctorParameters = () => [
    { type: AuthService },
    { type: WebService }
];
/** @nocollapse */ GatewayDeviceControlService.ngInjectableDef = i0.defineInjectable({ factory: function GatewayDeviceControlService_Factory() { return new GatewayDeviceControlService(i0.inject(i1.AuthService), i0.inject(i2.WebService)); }, token: GatewayDeviceControlService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheURldmljZUNvbnRyb2wuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9nYXRld2F5LXNlcnZpY2UvZ2F0ZXdheURldmljZUNvbnRyb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUVMLDRCQUE0QixFQUM3QixNQUFNLDJCQUEyQixDQUFDOzs7O0FBTW5DLE1BQU0sT0FBTywyQkFBMkI7Ozs7O0lBTXRDLFlBQ1UsV0FBd0IsRUFDeEIsVUFBc0I7UUFEdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUM1QixDQUFDOzs7Ozs7O0lBRUMsaUJBQWlCLENBQUMsT0FBZ0IsRUFBRSxHQUFXLEVBQUUsV0FBbUI7OztrQkFDbEUsV0FBVyxHQUFHO2dCQUNsQixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUM7b0JBQ3ZCLGNBQWMsRUFBRSxrQkFBa0I7O29CQUVsQyxjQUFjLEVBQUUsV0FBVztvQkFDM0Isa0JBQWtCLEVBQUUsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFO2lCQUM5RCxDQUFDO2FBQ0g7O2tCQUVLLEdBQUcsR0FBRyw0QkFBNEIsR0FBRyxZQUFZLEdBQUcsR0FBRzs7a0JBQ3ZELFdBQVcsR0FBRztnQkFDbEIsV0FBVyxFQUFFLDJCQUEyQixDQUFDLFdBQVc7Z0JBQ3BELGFBQWEsRUFBRSwyQkFBMkIsQ0FBQyxhQUFhO2dCQUN4RCxZQUFZLEVBQUUsMkJBQTJCLENBQUMsWUFBWTtnQkFDdEQsV0FBVyxFQUFFLDJCQUEyQixDQUFDLFdBQVc7YUFDckQ7O2tCQUNLLFdBQVcsR0FBWSxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFO1lBRXBHLElBQ0UsV0FBVyxDQUFDLEtBQUs7Z0JBQ2pCLFdBQVcsQ0FBQyxRQUFRO2dCQUNwQixXQUFXLENBQUMsTUFBTTtnQkFDbEIsV0FBVyxDQUFDLEVBQUU7Z0JBQ2QsV0FBVyxDQUFDLE9BQU8sRUFDbkI7Z0JBQ0EsT0FBTyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO2dCQUNsQyxPQUFPLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFDcEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUM1QixPQUFPLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2FBQzdEO1FBQ0gsQ0FBQztLQUFBOztBQTVDYyx5Q0FBYSxHQUFHLElBQUksQ0FBQztBQUNyQix3Q0FBWSxHQUFHLElBQUksQ0FBQztBQUNwQix1Q0FBVyxHQUFHLENBQUMsQ0FBQztBQUNoQix1Q0FBVyxHQUFHLElBQUksQ0FBQzs7WUFQbkMsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBVlEsV0FBVztZQUNYLFVBQVU7Ozs7Ozs7O0lBV2pCLDBDQUFvQzs7Ozs7SUFDcEMseUNBQW1DOzs7OztJQUNuQyx3Q0FBK0I7Ozs7O0lBQy9CLHdDQUFrQzs7Ozs7SUFHaEMsa0RBQWdDOzs7OztJQUNoQyxpREFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSAnLi4vd2ViLXNlcnZpY2Uvd2ViLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgR2F0ZXdheSxcbiAgZ2F0ZXdheURldmljZUNvbnRyb2xFbmRwb2ludFxufSBmcm9tICcuLi8uLi9tb2RlbHMvZ2V0d2F5Lm1vZGVsJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHYXRld2F5RGV2aWNlQ29udHJvbFNlcnZpY2Uge1xuICBwcml2YXRlIHN0YXRpYyBJTklUX0lOVEVSVkFMID0gMjAwMDtcbiAgcHJpdmF0ZSBzdGF0aWMgTUFYX0lOVEVSVkFMID0gNjAwMDtcbiAgcHJpdmF0ZSBzdGF0aWMgTUFYX1JFVFJJRVMgPSAzO1xuICBwcml2YXRlIHN0YXRpYyBSRVFfVElNRU9VVCA9IDYwMDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB3ZWJTZXJ2aWNlOiBXZWJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgYXN5bmMgdXBkYXRlR2F0ZXdheURhdGEoZ2F0ZXdheTogR2F0ZXdheSwgbWFjOiBzdHJpbmcsIGFjY2Vzc1Rva2VuOiBzdHJpbmcpIHtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpvYmplY3QtbGl0ZXJhbC1rZXktcXVvdGVzXG4gICAgICAgICdhY2Nlc3NfdG9rZW4nOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgJ3gtY29ycmVsYXRpb24taWQnOiBhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldENvcnJlbGF0aW9uSWQoKVxuICAgICAgfSlcbiAgICB9O1xuXG4gICAgY29uc3QgdXJsID0gZ2F0ZXdheURldmljZUNvbnRyb2xFbmRwb2ludCArICcvZ2F0ZXdheXMvJyArIG1hYztcbiAgICBjb25zdCByZXRyeUNvbmZpZyA9IHtcbiAgICAgIFJFUV9USU1FT1VUOiBHYXRld2F5RGV2aWNlQ29udHJvbFNlcnZpY2UuUkVRX1RJTUVPVVQsXG4gICAgICBJTklUX0lOVEVSVkFMOiBHYXRld2F5RGV2aWNlQ29udHJvbFNlcnZpY2UuSU5JVF9JTlRFUlZBTCxcbiAgICAgIE1BWF9JTlRFUlZBTDogR2F0ZXdheURldmljZUNvbnRyb2xTZXJ2aWNlLk1BWF9JTlRFUlZBTCxcbiAgICAgIE1BWF9SRVRSSUVTOiBHYXRld2F5RGV2aWNlQ29udHJvbFNlcnZpY2UuTUFYX1JFVFJJRVMsXG4gICAgfTtcbiAgICBjb25zdCBhcGlSZXNwb25zZTogR2F0ZXdheSA9IGF3YWl0IHRoaXMud2ViU2VydmljZS5nZXRBcGkodXJsLCBodHRwT3B0aW9ucywgcmV0cnlDb25maWcpLnRvUHJvbWlzZSgpO1xuXG4gICAgaWYgKFxuICAgICAgYXBpUmVzcG9uc2UuYm94SWQgJiZcbiAgICAgIGFwaVJlc3BvbnNlLmhvbWVHd0lkICYmXG4gICAgICBhcGlSZXNwb25zZS5ob21lSWQgJiZcbiAgICAgIGFwaVJlc3BvbnNlLmlkICYmXG4gICAgICBhcGlSZXNwb25zZS5sb2NhbElwXG4gICAgKSB7XG4gICAgICBnYXRld2F5LmJveElkID0gYXBpUmVzcG9uc2UuYm94SWQ7XG4gICAgICBnYXRld2F5LmhvbWVHd0lkID0gYXBpUmVzcG9uc2UuaG9tZUd3SWQ7XG4gICAgICBnYXRld2F5LmhvbWVJZCA9IGFwaVJlc3BvbnNlLmhvbWVJZDtcbiAgICAgIGdhdGV3YXkuaWQgPSBhcGlSZXNwb25zZS5pZDtcbiAgICAgIGdhdGV3YXkubG9jYWxJcCA9IGFwaVJlc3BvbnNlLmxvY2FsSXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZldGNoIEdhdGV3YXksIGVtcHR5IHJlc3BvbnNlIScpO1xuICAgIH1cbiAgfVxufVxuIl19