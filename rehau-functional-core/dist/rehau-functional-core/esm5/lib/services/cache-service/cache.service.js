/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// IONIC - ANGULAR
import { Inject, Injectable } from '@angular/core';
import SimpleCrypto from 'simple-crypto-js';
var CacheService = /** @class */ (function () {
    function CacheService(configuration) {
        this.configuration = configuration;
        this.simpleCrypto = new SimpleCrypto(this.configuration.globalConfig.SECRET_KEY);
    }
    /**
     * @description This Method is required for Removing particular data from local storage.
     * @param key  is required for the removing particular data
     */
    /**
     * \@description This Method is required for Removing particular data from local storage.
     * @param {?} key  is required for the removing particular data
     * @return {?}
     */
    CacheService.prototype.removeLocalData = /**
     * \@description This Method is required for Removing particular data from local storage.
     * @param {?} key  is required for the removing particular data
     * @return {?}
     */
    function (key) {
        localStorage.removeItem(key);
    };
    /**
     * @description This Method is required for getting Local storage Data.
     * @param Key This is required for the geting particular data with crypted formated.
     */
    /**
     * \@description This Method is required for getting Local storage Data.
     * @param {?} key
     * @return {?}
     */
    CacheService.prototype.getLocalData = /**
     * \@description This Method is required for getting Local storage Data.
     * @param {?} key
     * @return {?}
     */
    function (key) {
        // Set the second paramter to true, then it will return object instead of string
        if (localStorage.getItem(key)) {
            return this.simpleCrypto.decrypt(localStorage.getItem(key), true);
        }
        else {
            return false;
        }
    };
    /**
     * @description This Method is for setting Key, Value pair in the Local storage.
     * @param key is used for the storeing data.
     * @param value is the Actual value which need to be encrypted befor store.
     */
    /**
     * \@description This Method is for setting Key, Value pair in the Local storage.
     * @param {?} key is used for the storeing data.
     * @param {?} value is the Actual value which need to be encrypted befor store.
     * @return {?}
     */
    CacheService.prototype.setLocalData = /**
     * \@description This Method is for setting Key, Value pair in the Local storage.
     * @param {?} key is used for the storeing data.
     * @param {?} value is the Actual value which need to be encrypted befor store.
     * @return {?}
     */
    function (key, value) {
        /** @type {?} */
        var encrypted = this.simpleCrypto.encrypt(value);
        localStorage.setItem(key, encrypted);
    };
    CacheService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CacheService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    return CacheService;
}());
export { CacheService };
if (false) {
    /** @type {?} */
    CacheService.prototype.simpleCrypto;
    /** @type {?} */
    CacheService.prototype.configuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYWNoZS1zZXJ2aWNlL2NhY2hlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QztJQUVFLHNCQUE4QyxhQUFrQjtRQUFsQixrQkFBYSxHQUFiLGFBQWEsQ0FBSztRQUVoRSxpQkFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRDVFLENBQUM7SUFHRDs7O09BR0c7Ozs7OztJQUNILHNDQUFlOzs7OztJQUFmLFVBQWdCLEdBQVc7UUFDekIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxtQ0FBWTs7Ozs7SUFBWixVQUFhLEdBQVc7UUFDdEIsZ0ZBQWdGO1FBQ2hGLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILG1DQUFZOzs7Ozs7SUFBWixVQUFhLEdBQVcsRUFBRSxLQUFVOztZQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O2dCQW5DRixVQUFVOzs7O2dEQUVLLE1BQU0sU0FBQyxnQkFBZ0I7O0lBa0N2QyxtQkFBQztDQUFBLEFBcENELElBb0NDO1NBbkNZLFlBQVk7OztJQUd2QixvQ0FBNEU7O0lBRi9ELHFDQUFtRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIElPTklDIC0gQU5HVUxBUlxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgU2ltcGxlQ3J5cHRvIGZyb20gJ3NpbXBsZS1jcnlwdG8tanMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWNoZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciggQEluamVjdCgnU0VSVklDRV9DT05GSUcnKSBwdWJsaWMgY29uZmlndXJhdGlvbjogYW55ICkge1xuICB9XG4gIHNpbXBsZUNyeXB0byA9IG5ldyBTaW1wbGVDcnlwdG8odGhpcy5jb25maWd1cmF0aW9uLmdsb2JhbENvbmZpZy5TRUNSRVRfS0VZKTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgTWV0aG9kIGlzIHJlcXVpcmVkIGZvciBSZW1vdmluZyBwYXJ0aWN1bGFyIGRhdGEgZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgKiBAcGFyYW0ga2V5ICBpcyByZXF1aXJlZCBmb3IgdGhlIHJlbW92aW5nIHBhcnRpY3VsYXIgZGF0YVxuICAgKi9cbiAgcmVtb3ZlTG9jYWxEYXRhKGtleTogc3RyaW5nKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBNZXRob2QgaXMgcmVxdWlyZWQgZm9yIGdldHRpbmcgTG9jYWwgc3RvcmFnZSBEYXRhLlxuICAgKiBAcGFyYW0gS2V5IFRoaXMgaXMgcmVxdWlyZWQgZm9yIHRoZSBnZXRpbmcgcGFydGljdWxhciBkYXRhIHdpdGggY3J5cHRlZCBmb3JtYXRlZC5cbiAgICovXG4gIGdldExvY2FsRGF0YShrZXk6IHN0cmluZykge1xuICAgIC8vIFNldCB0aGUgc2Vjb25kIHBhcmFtdGVyIHRvIHRydWUsIHRoZW4gaXQgd2lsbCByZXR1cm4gb2JqZWN0IGluc3RlYWQgb2Ygc3RyaW5nXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpbXBsZUNyeXB0by5kZWNyeXB0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSksIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIE1ldGhvZCBpcyBmb3Igc2V0dGluZyBLZXksIFZhbHVlIHBhaXIgaW4gdGhlIExvY2FsIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBrZXkgaXMgdXNlZCBmb3IgdGhlIHN0b3JlaW5nIGRhdGEuXG4gICAqIEBwYXJhbSB2YWx1ZSBpcyB0aGUgQWN0dWFsIHZhbHVlIHdoaWNoIG5lZWQgdG8gYmUgZW5jcnlwdGVkIGJlZm9yIHN0b3JlLlxuICAgKi9cbiAgc2V0TG9jYWxEYXRhKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgY29uc3QgZW5jcnlwdGVkID0gdGhpcy5zaW1wbGVDcnlwdG8uZW5jcnlwdCh2YWx1ZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBlbmNyeXB0ZWQpO1xuICB9XG59XG4iXX0=