/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CacheService } from '../cache-service/cache.service';
import * as i0 from "@angular/core";
import * as i1 from "../cache-service/cache.service";
/** @enum {string} */
var FlowUnit = {
    FLOW_L_M: 'L/M',
    FLOW_L_H: 'L/H',
    FLOW_M3_H: 'm3/H',
};
export { FlowUnit };
/** @enum {string} */
var AmountUnit = {
    AMOUNT_LITERS: 'l',
    AMOUNT_CUBICMETERS: 'm3',
};
export { AmountUnit };
/** @enum {string} */
var TemperatureUnit = {
    TEMPERATURE_C: 'C',
    TEMPERATURE_F: 'F',
};
export { TemperatureUnit };
/** @enum {string} */
var PressureUnit = {
    PRESSURE_BAR: 'Bar',
    PRESSURE_PA: 'Pa',
};
export { PressureUnit };
var Settings = /** @class */ (function () {
    function Settings() {
        this.amountUnit = AmountUnit.AMOUNT_LITERS;
        this.flowUnit = FlowUnit.FLOW_L_H;
        this.pressureUnit = PressureUnit.PRESSURE_BAR;
        this.temperatureUnit = TemperatureUnit.TEMPERATURE_C;
    }
    return Settings;
}());
export { Settings };
if (false) {
    /** @type {?} */
    Settings.prototype.amountUnit;
    /** @type {?} */
    Settings.prototype.flowUnit;
    /** @type {?} */
    Settings.prototype.pressureUnit;
    /** @type {?} */
    Settings.prototype.temperatureUnit;
}
var SensorSettingService = /** @class */ (function () {
    function SensorSettingService(cacheService) {
        this.cacheService = cacheService;
        this.storageName = 'user_settings';
    }
    /**
     * @description convert the amount parameters to specific value
     * @param unit amount parameter to change
     * @param inValue initial value of unit
     */
    /**
     * \@description convert the amount parameters to specific value
     * @param {?} unit amount parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    SensorSettingService.prototype.convertAmount = /**
     * \@description convert the amount parameters to specific value
     * @param {?} unit amount parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    function (unit, inValue) {
        console.log('Hy I am Unit', unit);
        if (unit === AmountUnit.AMOUNT_LITERS) {
            return this.roundValueToZeroDigits(inValue * 1000);
        }
        else if (unit === AmountUnit.AMOUNT_CUBICMETERS) {
            return this.roundValue(inValue);
        }
        else {
            return this.roundValueToZeroDigits(inValue * 1000);
        }
    };
    /**
     * @description convert the flow parameters to specific value
     * @param unit flow parameter to change
     * @param inValue initial value of unit
     */
    /**
     * \@description convert the flow parameters to specific value
     * @param {?} unit flow parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    SensorSettingService.prototype.convertFlow = /**
     * \@description convert the flow parameters to specific value
     * @param {?} unit flow parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    function (unit, inValue) {
        if (unit === FlowUnit.FLOW_L_M) {
            return this.roundValue(inValue / 60);
        }
        else if (unit === FlowUnit.FLOW_L_H) {
            return this.roundValueToZeroDigits(inValue);
        }
        else if (unit === FlowUnit.FLOW_M3_H) {
            return this.roundValue(inValue / 1000);
        }
        else {
            return this.roundValue(inValue / 60);
        }
    };
    /**
     * @description convert the temperature parameters to specific value
     * @param unit unit of parameter to change
     * @param inValue initial value of unit
     */
    /**
     * \@description convert the temperature parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    SensorSettingService.prototype.convertTemp = /**
     * \@description convert the temperature parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    function (unit, inValue) {
        if (unit === TemperatureUnit.TEMPERATURE_C) {
            return this.roundValue(inValue);
        }
        else if (unit === TemperatureUnit.TEMPERATURE_F) {
            return this.roundValue((inValue * 9) / 5 + 32);
        }
        else {
            return this.roundValue(inValue);
        }
    };
    /**
     * @description convert the pressure parameters to specific value
     * @param unit unit of parameter to change
     * @param inValue initial value of unit
     */
    /**
     * \@description convert the pressure parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    SensorSettingService.prototype.convertPressure = /**
     * \@description convert the pressure parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    function (unit, inValue) {
        if (unit === PressureUnit.PRESSURE_BAR) {
            return this.roundValue(inValue / 100);
        }
        else if (unit === PressureUnit.PRESSURE_PA) {
            return this.roundValue(inValue);
        }
        else {
            return this.roundValue(inValue / 100);
        }
    };
    /**
     * @description get settings parameter object from local storage
     */
    /**
     * \@description get settings parameter object from local storage
     * @return {?}
     */
    SensorSettingService.prototype.getSettings = /**
     * \@description get settings parameter object from local storage
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var gw, rawGatewayObject;
            return tslib_1.__generator(this, function (_a) {
                gw = new Settings();
                rawGatewayObject = this.cacheService.getLocalData(this.storageName);
                if (rawGatewayObject !== null) {
                    gw = (rawGatewayObject);
                }
                if (gw == null) {
                    console.log('GW was null, create new object');
                    gw = new Settings();
                }
                return [2 /*return*/, gw];
            });
        });
    };
    /**
     * @description set settings parameter object in local storage
     * @param settings object to store
     */
    /**
     * \@description set settings parameter object in local storage
     * @param {?} settings object to store
     * @return {?}
     */
    SensorSettingService.prototype.setSettings = /**
     * \@description set settings parameter object in local storage
     * @param {?} settings object to store
     * @return {?}
     */
    function (settings) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.cacheService.setLocalData(this.storageName, (settings));
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    SensorSettingService.prototype.roundValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value.toFixed(1);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    SensorSettingService.prototype.roundValueToZeroDigits = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value.toFixed(0);
    };
    SensorSettingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SensorSettingService.ctorParameters = function () { return [
        { type: CacheService }
    ]; };
    /** @nocollapse */ SensorSettingService.ngInjectableDef = i0.defineInjectable({ factory: function SensorSettingService_Factory() { return new SensorSettingService(i0.inject(i1.CacheService)); }, token: SensorSettingService, providedIn: "root" });
    return SensorSettingService;
}());
export { SensorSettingService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SensorSettingService.prototype.storageName;
    /**
     * @type {?}
     * @private
     */
    SensorSettingService.prototype.cacheService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sZWFrYWdlLWhlbHBlci1zZXJ2aWNlL3NldHRpbmdzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7SUFHNUQsVUFBVyxLQUFLO0lBQ2hCLFVBQVcsS0FBSztJQUNoQixXQUFZLE1BQU07Ozs7O0lBSWxCLGVBQWdCLEdBQUc7SUFDbkIsb0JBQXFCLElBQUk7Ozs7O0lBSXpCLGVBQWdCLEdBQUc7SUFDbkIsZUFBZ0IsR0FBRzs7Ozs7SUFJbkIsY0FBZSxLQUFLO0lBQ3BCLGFBQWMsSUFBSTs7O0FBR3BCO0lBQUE7UUFDRSxlQUFVLEdBQWUsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNsRCxhQUFRLEdBQWEsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxpQkFBWSxHQUFpQixZQUFZLENBQUMsWUFBWSxDQUFDO1FBQ3ZELG9CQUFlLEdBQW9CLGVBQWUsQ0FBQyxhQUFhLENBQUM7SUFDbkUsQ0FBQztJQUFELGVBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQzs7OztJQUpDLDhCQUFrRDs7SUFDbEQsNEJBQXVDOztJQUN2QyxnQ0FBdUQ7O0lBQ3ZELG1DQUFpRTs7QUFHbkU7SUFNRSw4QkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGdEMsZ0JBQVcsR0FBRyxlQUFlLENBQUM7SUFFWSxDQUFDO0lBRW5EOzs7O09BSUc7Ozs7Ozs7SUFDSCw0Q0FBYTs7Ozs7O0lBQWIsVUFBYyxJQUFnQixFQUFFLE9BQWU7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFB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a0I7OztnQkFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7S0FDOUQ7Ozs7OztJQUVPLHlDQUFVOzs7OztJQUFsQixVQUFtQixLQUFhO1FBQzlCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7Ozs7SUFFTyxxREFBc0I7Ozs7O0lBQTlCLFVBQStCLEtBQWE7UUFDMUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7O2dCQXJHRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWhDUSxZQUFZOzs7K0JBRHJCO0NBcUlDLEFBdEdELElBc0dDO1NBbkdZLG9CQUFvQjs7Ozs7O0lBQy9CLDJDQUFzQzs7Ozs7SUFFMUIsNENBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vY2FjaGUtc2VydmljZS9jYWNoZS5zZXJ2aWNlJztcblxuZXhwb3J0IGVudW0gRmxvd1VuaXQge1xuICBGTE9XX0xfTSA9ICdML00nLFxuICBGTE9XX0xfSCA9ICdML0gnLFxuICBGTE9XX00zX0ggPSAnbTMvSCdcbn1cblxuZXhwb3J0IGVudW0gQW1vdW50VW5pdCB7XG4gIEFNT1VOVF9MSVRFUlMgPSAnbCcsXG4gIEFNT1VOVF9DVUJJQ01FVEVSUyA9ICdtMydcbn1cblxuZXhwb3J0IGVudW0gVGVtcGVyYXR1cmVVbml0IHtcbiAgVEVNUEVSQVRVUkVfQyA9ICdDJyxcbiAgVEVNUEVSQVRVUkVfRiA9ICdGJ1xufVxuXG5leHBvcnQgZW51bSBQcmVzc3VyZVVuaXQge1xuICBQUkVTU1VSRV9CQVIgPSAnQmFyJyxcbiAgUFJFU1NVUkVfUEEgPSAnUGEnXG59XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG4gIGFtb3VudFVuaXQ6IEFtb3VudFVuaXQgPSBBbW91bnRVbml0LkFNT1VOVF9MSVRFUlM7XG4gIGZsb3dVbml0OiBGbG93VW5pdCA9IEZsb3dVbml0LkZMT1dfTF9IO1xuICBwcmVzc3VyZVVuaXQ6IFByZXNzdXJlVW5pdCA9IFByZXNzdXJlVW5pdC5QUkVTU1VSRV9CQVI7XG4gIHRlbXBlcmF0dXJlVW5pdDogVGVtcGVyYXR1cmVVbml0ID0gVGVtcGVyYXR1cmVVbml0LlRFTVBFUkFUVVJFX0M7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlbnNvclNldHRpbmdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdG9yYWdlTmFtZSA9ICd1c2VyX3NldHRpbmdzJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGNvbnZlcnQgdGhlIGFtb3VudCBwYXJhbWV0ZXJzIHRvIHNwZWNpZmljIHZhbHVlXG4gICAqIEBwYXJhbSB1bml0IGFtb3VudCBwYXJhbWV0ZXIgdG8gY2hhbmdlXG4gICAqIEBwYXJhbSBpblZhbHVlIGluaXRpYWwgdmFsdWUgb2YgdW5pdFxuICAgKi9cbiAgY29udmVydEFtb3VudCh1bml0OiBBbW91bnRVbml0LCBpblZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnNvbGUubG9nKCdIeSBJIGFtIFVuaXQnLCB1bml0KTtcbiAgICBpZiAodW5pdCA9PT0gQW1vdW50VW5pdC5BTU9VTlRfTElURVJTKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlVG9aZXJvRGlnaXRzKGluVmFsdWUgKiAxMDAwKTtcbiAgICB9IGVsc2UgaWYgKHVuaXQgPT09IEFtb3VudFVuaXQuQU1PVU5UX0NVQklDTUVURVJTKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlKGluVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlVG9aZXJvRGlnaXRzKGluVmFsdWUgKiAxMDAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGNvbnZlcnQgdGhlIGZsb3cgcGFyYW1ldGVycyB0byBzcGVjaWZpYyB2YWx1ZVxuICAgKiBAcGFyYW0gdW5pdCBmbG93IHBhcmFtZXRlciB0byBjaGFuZ2VcbiAgICogQHBhcmFtIGluVmFsdWUgaW5pdGlhbCB2YWx1ZSBvZiB1bml0XG4gICAqL1xuICBjb252ZXJ0Rmxvdyh1bml0OiBGbG93VW5pdCwgaW5WYWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAodW5pdCA9PT0gRmxvd1VuaXQuRkxPV19MX00pIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoaW5WYWx1ZSAvIDYwKTtcbiAgICB9IGVsc2UgaWYgKHVuaXQgPT09IEZsb3dVbml0LkZMT1dfTF9IKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlVG9aZXJvRGlnaXRzKGluVmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodW5pdCA9PT0gRmxvd1VuaXQuRkxPV19NM19IKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlKGluVmFsdWUgLyAxMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZShpblZhbHVlIC8gNjApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gY29udmVydCB0aGUgdGVtcGVyYXR1cmUgcGFyYW1ldGVycyB0byBzcGVjaWZpYyB2YWx1ZVxuICAgKiBAcGFyYW0gdW5pdCB1bml0IG9mIHBhcmFtZXRlciB0byBjaGFuZ2VcbiAgICogQHBhcmFtIGluVmFsdWUgaW5pdGlhbCB2YWx1ZSBvZiB1bml0XG4gICAqL1xuICBjb252ZXJ0VGVtcCh1bml0OiBUZW1wZXJhdHVyZVVuaXQsIGluVmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKHVuaXQgPT09IFRlbXBlcmF0dXJlVW5pdC5URU1QRVJBVFVSRV9DKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlKGluVmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodW5pdCA9PT0gVGVtcGVyYXR1cmVVbml0LlRFTVBFUkFUVVJFX0YpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoKGluVmFsdWUgKiA5KSAvIDUgKyAzMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoaW5WYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBjb252ZXJ0IHRoZSBwcmVzc3VyZSBwYXJhbWV0ZXJzIHRvIHNwZWNpZmljIHZhbHVlXG4gICAqIEBwYXJhbSB1bml0IHVuaXQgb2YgcGFyYW1ldGVyIHRvIGNoYW5nZVxuICAgKiBAcGFyYW0gaW5WYWx1ZSBpbml0aWFsIHZhbHVlIG9mIHVuaXRcbiAgICovXG4gIGNvbnZlcnRQcmVzc3VyZSh1bml0OiBQcmVzc3VyZVVuaXQsIGluVmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKHVuaXQgPT09IFByZXNzdXJlVW5pdC5QUkVTU1VSRV9CQVIpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoaW5WYWx1ZSAvIDEwMCk7XG4gICAgfSBlbHNlIGlmICh1bml0ID09PSBQcmVzc3VyZVVuaXQuUFJFU1NVUkVfUEEpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoaW5WYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoaW5WYWx1ZSAvIDEwMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBnZXQgc2V0dGluZ3MgcGFyYW1ldGVyIG9iamVjdCBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICovXG4gIGFzeW5jIGdldFNldHRpbmdzKCk6IFByb21pc2U8U2V0dGluZ3M+IHtcbiAgICBsZXQgZ3c6IFNldHRpbmdzID0gbmV3IFNldHRpbmdzKCk7XG4gICAgY29uc3QgcmF3R2F0ZXdheU9iamVjdDogYW55ID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0TG9jYWxEYXRhKHRoaXMuc3RvcmFnZU5hbWUpO1xuICAgIGlmIChyYXdHYXRld2F5T2JqZWN0ICE9PSBudWxsKSB7XG4gICAgICBndyA9IChyYXdHYXRld2F5T2JqZWN0KTtcbiAgICB9XG4gICAgaWYgKGd3ID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdHVyB3YXMgbnVsbCwgY3JlYXRlIG5ldyBvYmplY3QnKTtcbiAgICAgIGd3ID0gbmV3IFNldHRpbmdzKCk7XG4gICAgfVxuICAgIHJldHVybiBndztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gc2V0IHNldHRpbmdzIHBhcmFtZXRlciBvYmplY3QgaW4gbG9jYWwgc3RvcmFnZVxuICAgKiBAcGFyYW0gc2V0dGluZ3Mgb2JqZWN0IHRvIHN0b3JlXG4gICAqL1xuICBhc3luYyBzZXRTZXR0aW5ncyhzZXR0aW5nczogU2V0dGluZ3MpIHtcbiAgICB0aGlzLmNhY2hlU2VydmljZS5zZXRMb2NhbERhdGEodGhpcy5zdG9yYWdlTmFtZSwgKHNldHRpbmdzKSk7XG4gIH1cblxuICBwcml2YXRlIHJvdW5kVmFsdWUodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoMSk7XG4gIH1cblxuICBwcml2YXRlIHJvdW5kVmFsdWVUb1plcm9EaWdpdHModmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoMCk7XG4gIH1cbn1cbiJdfQ==