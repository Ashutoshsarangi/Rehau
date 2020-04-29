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
const FlowUnit = {
    FLOW_L_M: 'L/M',
    FLOW_L_H: 'L/H',
    FLOW_M3_H: 'm3/H',
};
export { FlowUnit };
/** @enum {string} */
const AmountUnit = {
    AMOUNT_LITERS: 'l',
    AMOUNT_CUBICMETERS: 'm3',
};
export { AmountUnit };
/** @enum {string} */
const TemperatureUnit = {
    TEMPERATURE_C: 'C',
    TEMPERATURE_F: 'F',
};
export { TemperatureUnit };
/** @enum {string} */
const PressureUnit = {
    PRESSURE_BAR: 'Bar',
    PRESSURE_PA: 'Pa',
};
export { PressureUnit };
export class Settings {
    constructor() {
        this.amountUnit = AmountUnit.AMOUNT_LITERS;
        this.flowUnit = FlowUnit.FLOW_L_H;
        this.pressureUnit = PressureUnit.PRESSURE_BAR;
        this.temperatureUnit = TemperatureUnit.TEMPERATURE_C;
    }
}
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
export class SensorSettingService {
    /**
     * @param {?} cacheService
     */
    constructor(cacheService) {
        this.cacheService = cacheService;
        this.storageName = 'user_settings';
    }
    /**
     * \@description convert the amount parameters to specific value
     * @param {?} unit amount parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    convertAmount(unit, inValue) {
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
    }
    /**
     * \@description convert the flow parameters to specific value
     * @param {?} unit flow parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    convertFlow(unit, inValue) {
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
    }
    /**
     * \@description convert the temperature parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    convertTemp(unit, inValue) {
        if (unit === TemperatureUnit.TEMPERATURE_C) {
            return this.roundValue(inValue);
        }
        else if (unit === TemperatureUnit.TEMPERATURE_F) {
            return this.roundValue((inValue * 9) / 5 + 32);
        }
        else {
            return this.roundValue(inValue);
        }
    }
    /**
     * \@description convert the pressure parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    convertPressure(unit, inValue) {
        if (unit === PressureUnit.PRESSURE_BAR) {
            return this.roundValue(inValue / 100);
        }
        else if (unit === PressureUnit.PRESSURE_PA) {
            return this.roundValue(inValue);
        }
        else {
            return this.roundValue(inValue / 100);
        }
    }
    /**
     * \@description get settings parameter object from local storage
     * @return {?}
     */
    getSettings() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let gw = new Settings();
            /** @type {?} */
            const rawGatewayObject = this.cacheService.getLocalData(this.storageName);
            if (rawGatewayObject !== null) {
                gw = (rawGatewayObject);
            }
            if (gw == null) {
                console.log('GW was null, create new object');
                gw = new Settings();
            }
            return gw;
        });
    }
    /**
     * \@description set settings parameter object in local storage
     * @param {?} settings object to store
     * @return {?}
     */
    setSettings(settings) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.cacheService.setLocalData(this.storageName, (settings));
        });
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    roundValue(value) {
        return value.toFixed(1);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    roundValueToZeroDigits(value) {
        return value.toFixed(0);
    }
}
SensorSettingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SensorSettingService.ctorParameters = () => [
    { type: CacheService }
];
/** @nocollapse */ SensorSettingService.ngInjectableDef = i0.defineInjectable({ factory: function SensorSettingService_Factory() { return new SensorSettingService(i0.inject(i1.CacheService)); }, token: SensorSettingService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sZWFrYWdlLWhlbHBlci1zZXJ2aWNlL3NldHRpbmdzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7SUFHNUQsVUFBVyxLQUFLO0lBQ2hCLFVBQVcsS0FBSztJQUNoQixXQUFZLE1BQU07Ozs7O0lBSWxCLGVBQWdCLEdBQUc7SUFDbkIsb0JBQXFCLElBQUk7Ozs7O0lBSXpCLGVBQWdCLEdBQUc7SUFDbkIsZUFBZ0IsR0FBRzs7Ozs7SUFJbkIsY0FBZSxLQUFLO0lBQ3BCLGFBQWMsSUFBSTs7O0FBR3BCLE1BQU0sT0FBTyxRQUFRO0lBQXJCO1FBQ0UsZUFBVSxHQUFlLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDbEQsYUFBUSxHQUFhLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDdkMsaUJBQVksR0FBaUIsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUN2RCxvQkFBZSxHQUFvQixlQUFlLENBQUMsYUFBYSxDQUFDO0lBQ25FLENBQUM7Q0FBQTs7O0lBSkMsOEJBQWtEOztJQUNsRCw0QkFBdUM7O0lBQ3ZDLGdDQUF1RDs7SUFDdkQsbUNBQWlFOztBQU1uRSxNQUFNLE9BQU8sb0JBQW9COzs7O0lBRy9CLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRnRDLGdCQUFXLEdBQUcsZUFBZSxDQUFDO0lBRVksQ0FBQzs7Ozs7OztJQU9uRCxhQUFhLENBQUMsSUFBZ0IsRUFBRSxPQUFlO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksSUFBSSxLQUFLLFVB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QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRU8sc0JBQXNCLENBQUMsS0FBYTtRQUMxQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7O1lBckdGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWhDUSxZQUFZOzs7Ozs7OztJQWtDbkIsMkNBQXNDOzs7OztJQUUxQiw0Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi9jYWNoZS1zZXJ2aWNlL2NhY2hlLnNlcnZpY2UnO1xuXG5leHBvcnQgZW51bSBGbG93VW5pdCB7XG4gIEZMT1dfTF9NID0gJ0wvTScsXG4gIEZMT1dfTF9IID0gJ0wvSCcsXG4gIEZMT1dfTTNfSCA9ICdtMy9IJ1xufVxuXG5leHBvcnQgZW51bSBBbW91bnRVbml0IHtcbiAgQU1PVU5UX0xJVEVSUyA9ICdsJyxcbiAgQU1PVU5UX0NVQklDTUVURVJTID0gJ20zJ1xufVxuXG5leHBvcnQgZW51bSBUZW1wZXJhdHVyZVVuaXQge1xuICBURU1QRVJBVFVSRV9DID0gJ0MnLFxuICBURU1QRVJBVFVSRV9GID0gJ0YnXG59XG5cbmV4cG9ydCBlbnVtIFByZXNzdXJlVW5pdCB7XG4gIFBSRVNTVVJFX0JBUiA9ICdCYXInLFxuICBQUkVTU1VSRV9QQSA9ICdQYSdcbn1cblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcbiAgYW1vdW50VW5pdDogQW1vdW50VW5pdCA9IEFtb3VudFVuaXQuQU1PVU5UX0xJVEVSUztcbiAgZmxvd1VuaXQ6IEZsb3dVbml0ID0gRmxvd1VuaXQuRkxPV19MX0g7XG4gIHByZXNzdXJlVW5pdDogUHJlc3N1cmVVbml0ID0gUHJlc3N1cmVVbml0LlBSRVNTVVJFX0JBUjtcbiAgdGVtcGVyYXR1cmVVbml0OiBUZW1wZXJhdHVyZVVuaXQgPSBUZW1wZXJhdHVyZVVuaXQuVEVNUEVSQVRVUkVfQztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2Vuc29yU2V0dGluZ1NlcnZpY2Uge1xuICBwcml2YXRlIHN0b3JhZ2VOYW1lID0gJ3VzZXJfc2V0dGluZ3MnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gY29udmVydCB0aGUgYW1vdW50IHBhcmFtZXRlcnMgdG8gc3BlY2lmaWMgdmFsdWVcbiAgICogQHBhcmFtIHVuaXQgYW1vdW50IHBhcmFtZXRlciB0byBjaGFuZ2VcbiAgICogQHBhcmFtIGluVmFsdWUgaW5pdGlhbCB2YWx1ZSBvZiB1bml0XG4gICAqL1xuICBjb252ZXJ0QW1vdW50KHVuaXQ6IEFtb3VudFVuaXQsIGluVmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc29sZS5sb2coJ0h5IEkgYW0gVW5pdCcsIHVuaXQpO1xuICAgIGlmICh1bml0ID09PSBBbW91bnRVbml0LkFNT1VOVF9MSVRFUlMpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWVUb1plcm9EaWdpdHMoaW5WYWx1ZSAqIDEwMDApO1xuICAgIH0gZWxzZSBpZiAodW5pdCA9PT0gQW1vdW50VW5pdC5BTU9VTlRfQ1VCSUNNRVRFUlMpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoaW5WYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWVUb1plcm9EaWdpdHMoaW5WYWx1ZSAqIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gY29udmVydCB0aGUgZmxvdyBwYXJhbWV0ZXJzIHRvIHNwZWNpZmljIHZhbHVlXG4gICAqIEBwYXJhbSB1bml0IGZsb3cgcGFyYW1ldGVyIHRvIGNoYW5nZVxuICAgKiBAcGFyYW0gaW5WYWx1ZSBpbml0aWFsIHZhbHVlIG9mIHVuaXRcbiAgICovXG4gIGNvbnZlcnRGbG93KHVuaXQ6IEZsb3dVbml0LCBpblZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmICh1bml0ID09PSBGbG93VW5pdC5GTE9XX0xfTSkge1xuICAgICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZShpblZhbHVlIC8gNjApO1xuICAgIH0gZWxzZSBpZiAodW5pdCA9PT0gRmxvd1VuaXQuRkxPV19MX0gpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWVUb1plcm9EaWdpdHMoaW5WYWx1ZSk7XG4gICAgfSBlbHNlIGlmICh1bml0ID09PSBGbG93VW5pdC5GTE9XX00zX0gpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoaW5WYWx1ZSAvIDEwMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3VuZFZhbHVlKGluVmFsdWUgLyA2MCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBjb252ZXJ0IHRoZSB0ZW1wZXJhdHVyZSBwYXJhbWV0ZXJzIHRvIHNwZWNpZmljIHZhbHVlXG4gICAqIEBwYXJhbSB1bml0IHVuaXQgb2YgcGFyYW1ldGVyIHRvIGNoYW5nZVxuICAgKiBAcGFyYW0gaW5WYWx1ZSBpbml0aWFsIHZhbHVlIG9mIHVuaXRcbiAgICovXG4gIGNvbnZlcnRUZW1wKHVuaXQ6IFRlbXBlcmF0dXJlVW5pdCwgaW5WYWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAodW5pdCA9PT0gVGVtcGVyYXR1cmVVbml0LlRFTVBFUkFUVVJFX0MpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdW5kVmFsdWUoaW5WYWx1ZSk7XG4gICAgfSBlbHNlIGlmICh1bml0ID09PSBUZW1wZXJhdHVyZVVuaXQuVEVNUEVSQVRVUkVfRikge1xuICAgICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZSgoaW5WYWx1ZSAqIDkpIC8gNSArIDMyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZShpblZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGNvbnZlcnQgdGhlIHByZXNzdXJlIHBhcmFtZXRlcnMgdG8gc3BlY2lmaWMgdmFsdWVcbiAgICogQHBhcmFtIHVuaXQgdW5pdCBvZiBwYXJhbWV0ZXIgdG8gY2hhbmdlXG4gICAqIEBwYXJhbSBpblZhbHVlIGluaXRpYWwgdmFsdWUgb2YgdW5pdFxuICAgKi9cbiAgY29udmVydFByZXNzdXJlKHVuaXQ6IFByZXNzdXJlVW5pdCwgaW5WYWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAodW5pdCA9PT0gUHJlc3N1cmVVbml0LlBSRVNTVVJFX0JBUikge1xuICAgICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZShpblZhbHVlIC8gMTAwKTtcbiAgICB9IGVsc2UgaWYgKHVuaXQgPT09IFByZXNzdXJlVW5pdC5QUkVTU1VSRV9QQSkge1xuICAgICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZShpblZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucm91bmRWYWx1ZShpblZhbHVlIC8gMTAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGdldCBzZXR0aW5ncyBwYXJhbWV0ZXIgb2JqZWN0IGZyb20gbG9jYWwgc3RvcmFnZVxuICAgKi9cbiAgYXN5bmMgZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxTZXR0aW5ncz4ge1xuICAgIGxldCBndzogU2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoKTtcbiAgICBjb25zdCByYXdHYXRld2F5T2JqZWN0OiBhbnkgPSB0aGlzLmNhY2hlU2VydmljZS5nZXRMb2NhbERhdGEodGhpcy5zdG9yYWdlTmFtZSk7XG4gICAgaWYgKHJhd0dhdGV3YXlPYmplY3QgIT09IG51bGwpIHtcbiAgICAgIGd3ID0gKHJhd0dhdGV3YXlPYmplY3QpO1xuICAgIH1cbiAgICBpZiAoZ3cgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coJ0dXIHdhcyBudWxsLCBjcmVhdGUgbmV3IG9iamVjdCcpO1xuICAgICAgZ3cgPSBuZXcgU2V0dGluZ3MoKTtcbiAgICB9XG4gICAgcmV0dXJuIGd3O1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBzZXQgc2V0dGluZ3MgcGFyYW1ldGVyIG9iamVjdCBpbiBsb2NhbCBzdG9yYWdlXG4gICAqIEBwYXJhbSBzZXR0aW5ncyBvYmplY3QgdG8gc3RvcmVcbiAgICovXG4gIGFzeW5jIHNldFNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5ncykge1xuICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldExvY2FsRGF0YSh0aGlzLnN0b3JhZ2VOYW1lLCAoc2V0dGluZ3MpKTtcbiAgfVxuXG4gIHByaXZhdGUgcm91bmRWYWx1ZSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUudG9GaXhlZCgxKTtcbiAgfVxuXG4gIHByaXZhdGUgcm91bmRWYWx1ZVRvWmVyb0RpZ2l0cyh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUudG9GaXhlZCgwKTtcbiAgfVxufVxuIl19