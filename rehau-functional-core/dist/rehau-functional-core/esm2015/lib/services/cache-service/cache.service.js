/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// IONIC - ANGULAR
import { Inject, Injectable } from '@angular/core';
import SimpleCrypto from 'simple-crypto-js';
export class CacheService {
    /**
     * @param {?} configuration
     */
    constructor(configuration) {
        this.configuration = configuration;
        this.simpleCrypto = new SimpleCrypto(this.configuration.globalConfig.SECRET_KEY);
    }
    /**
     * \@description This Method is required for Removing particular data from local storage.
     * @param {?} key  is required for the removing particular data
     * @return {?}
     */
    removeLocalData(key) {
        localStorage.removeItem(key);
    }
    /**
     * \@description This Method is required for getting Local storage Data.
     * @param {?} key
     * @return {?}
     */
    getLocalData(key) {
        // Set the second paramter to true, then it will return object instead of string
        if (localStorage.getItem(key)) {
            return this.simpleCrypto.decrypt(localStorage.getItem(key), true);
        }
        else {
            return false;
        }
    }
    /**
     * \@description This Method is for setting Key, Value pair in the Local storage.
     * @param {?} key is used for the storeing data.
     * @param {?} value is the Actual value which need to be encrypted befor store.
     * @return {?}
     */
    setLocalData(key, value) {
        /** @type {?} */
        const encrypted = this.simpleCrypto.encrypt(value);
        localStorage.setItem(key, encrypted);
    }
}
CacheService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CacheService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];
if (false) {
    /** @type {?} */
    CacheService.prototype.simpleCrypto;
    /** @type {?} */
    CacheService.prototype.configuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYWNoZS1zZXJ2aWNlL2NhY2hlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUk1QyxNQUFNLE9BQU8sWUFBWTs7OztJQUN2QixZQUE4QyxhQUFrQjtRQUFsQixrQkFBYSxHQUFiLGFBQWEsQ0FBSztRQUVoRSxpQkFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRDVFLENBQUM7Ozs7OztJQU9ELGVBQWUsQ0FBQyxHQUFXO1FBQ3pCLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBTUQsWUFBWSxDQUFDLEdBQVc7UUFDdEIsZ0ZBQWdGO1FBQ2hGLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOzs7Ozs7O0lBT0QsWUFBWSxDQUFDLEdBQVcsRUFBRSxLQUFVOztjQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQW5DRixVQUFVOzs7OzRDQUVLLE1BQU0sU0FBQyxnQkFBZ0I7Ozs7SUFFckMsb0NBQTRFOztJQUYvRCxxQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJT05JQyAtIEFOR1VMQVJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFNpbXBsZUNyeXB0byBmcm9tICdzaW1wbGUtY3J5cHRvLWpzJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FjaGVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoIEBJbmplY3QoJ1NFUlZJQ0VfQ09ORklHJykgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueSApIHtcbiAgfVxuICBzaW1wbGVDcnlwdG8gPSBuZXcgU2ltcGxlQ3J5cHRvKHRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcuU0VDUkVUX0tFWSk7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIE1ldGhvZCBpcyByZXF1aXJlZCBmb3IgUmVtb3ZpbmcgcGFydGljdWxhciBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICogQHBhcmFtIGtleSAgaXMgcmVxdWlyZWQgZm9yIHRoZSByZW1vdmluZyBwYXJ0aWN1bGFyIGRhdGFcbiAgICovXG4gIHJlbW92ZUxvY2FsRGF0YShrZXk6IHN0cmluZykge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgTWV0aG9kIGlzIHJlcXVpcmVkIGZvciBnZXR0aW5nIExvY2FsIHN0b3JhZ2UgRGF0YS5cbiAgICogQHBhcmFtIEtleSBUaGlzIGlzIHJlcXVpcmVkIGZvciB0aGUgZ2V0aW5nIHBhcnRpY3VsYXIgZGF0YSB3aXRoIGNyeXB0ZWQgZm9ybWF0ZWQuXG4gICAqL1xuICBnZXRMb2NhbERhdGEoa2V5OiBzdHJpbmcpIHtcbiAgICAvLyBTZXQgdGhlIHNlY29uZCBwYXJhbXRlciB0byB0cnVlLCB0aGVuIGl0IHdpbGwgcmV0dXJuIG9iamVjdCBpbnN0ZWFkIG9mIHN0cmluZ1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaW1wbGVDcnlwdG8uZGVjcnlwdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBNZXRob2QgaXMgZm9yIHNldHRpbmcgS2V5LCBWYWx1ZSBwYWlyIGluIHRoZSBMb2NhbCBzdG9yYWdlLlxuICAgKiBAcGFyYW0ga2V5IGlzIHVzZWQgZm9yIHRoZSBzdG9yZWluZyBkYXRhLlxuICAgKiBAcGFyYW0gdmFsdWUgaXMgdGhlIEFjdHVhbCB2YWx1ZSB3aGljaCBuZWVkIHRvIGJlIGVuY3J5cHRlZCBiZWZvciBzdG9yZS5cbiAgICovXG4gIHNldExvY2FsRGF0YShrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGVuY3J5cHRlZCA9IHRoaXMuc2ltcGxlQ3J5cHRvLmVuY3J5cHQodmFsdWUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgZW5jcnlwdGVkKTtcbiAgfVxufVxuIl19