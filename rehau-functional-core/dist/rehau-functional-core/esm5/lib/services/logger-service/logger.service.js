/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// IONIC - ANGULAR
import { Injectable } from '@angular/core';
import { DEBUG_LOG_ON, _DEV_ } from '../../config/app-setting.config';
var LogService = /** @class */ (function () {
    function LogService() {
    }
    /**
     * @description This Method is for general console logs
     * @param content is the text you want to print as console
     */
    /**
     * \@description This Method is for general console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    LogService.prototype.log = /**
     * \@description This Method is for general console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (!DEBUG_LOG_ON && !_DEV_) {
            return;
        }
        console.log.apply(console, tslib_1.__spread(['✅ '], content));
    };
    /**
     * @description This Method is for error console logs
     * @param content is the text you want to print as console
     */
    /**
     * \@description This Method is for error console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    LogService.prototype.log_e = /**
     * \@description This Method is for error console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (!DEBUG_LOG_ON && !_DEV_) {
            return;
        }
        console.log.apply(console, tslib_1.__spread(['🚫❗️ '], content));
    };
    /**
     * @description This Method is for warning console logs
     * @param content is the text you want to print as console
     */
    /**
     * \@description This Method is for warning console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    LogService.prototype.log_w = /**
     * \@description This Method is for warning console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (!DEBUG_LOG_ON && !_DEV_) {
            return;
        }
        console.log.apply(console, tslib_1.__spread(['🔶 '], content));
    };
    /**
     * @description This Method is for debugging console logs
     * @param content is the text you want to print as console
     */
    /**
     * \@description This Method is for debugging console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    LogService.prototype.log_d = /**
     * \@description This Method is for debugging console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (!DEBUG_LOG_ON && !_DEV_) {
            return;
        }
        console.log.apply(console, tslib_1.__spread(['🔷 TODO: '], content));
    };
    LogService.decorators = [
        { type: Injectable }
    ];
    return LogService;
}());
export { LogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLXNlcnZpY2UvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXRFO0lBQUE7SUFtREEsQ0FBQztJQWhEQzs7O09BR0c7Ozs7OztJQUNILHdCQUFHOzs7OztJQUFIO1FBQUksaUJBQVU7YUFBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1lBQVYsNEJBQVU7O1FBQ1osSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixPQUFPO1NBQ1I7UUFFRCxPQUFPLENBQUMsR0FBRyxPQUFYLE9BQU8sb0JBQUssSUFBSSxHQUFLLE9BQU8sR0FBRTtJQUNoQyxDQUFDO0lBQ0Q7OztPQUdHOzs7Ozs7SUFDSCwwQkFBSzs7Ozs7SUFBTDtRQUFNLGlCQUFVO2FBQVYsVUFBVSxFQUFWLHFCQUFVLEVBQVYsSUFBVTtZQUFWLDRCQUFVOztRQUNkLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0IsT0FBTztTQUNSO1FBRUQsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLG9CQUFLLE9BQU8sR0FBSyxPQUFPLEdBQUU7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsMEJBQUs7Ozs7O0lBQUw7UUFBTSxpQkFBVTthQUFWLFVBQVUsRUFBVixxQkFBVSxFQUFWLElBQVU7WUFBViw0QkFBVTs7UUFDZCxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzNCLE9BQU87U0FDUjtRQUVELE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxvQkFBSyxLQUFLLEdBQUssT0FBTyxHQUFFO0lBQ2pDLENBQUM7SUFHRDs7O09BR0c7Ozs7OztJQUNILDBCQUFLOzs7OztJQUFMO1FBQU0saUJBQVU7YUFBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1lBQVYsNEJBQVU7O1FBQ2QsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixPQUFPO1NBQ1I7UUFFRCxPQUFPLENBQUMsR0FBRyxPQUFYLE9BQU8sb0JBQUssV0FBVyxHQUFLLE9BQU8sR0FBRTtJQUN2QyxDQUFDOztnQkFqREYsVUFBVTs7SUFtRFgsaUJBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQWpEWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSU9OSUMgLSBBTkdVTEFSXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERFQlVHX0xPR19PTiwgX0RFVl8gfSBmcm9tICcuLi8uLi9jb25maWcvYXBwLXNldHRpbmcuY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuXG5leHBvcnQgY2xhc3MgTG9nU2VydmljZSB7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBNZXRob2QgaXMgZm9yIGdlbmVyYWwgY29uc29sZSBsb2dzXG4gICAqIEBwYXJhbSBjb250ZW50IGlzIHRoZSB0ZXh0IHlvdSB3YW50IHRvIHByaW50IGFzIGNvbnNvbGVcbiAgICovXG4gIGxvZyguLi5jb250ZW50KSB7XG4gICAgaWYgKCFERUJVR19MT0dfT04gJiYgIV9ERVZfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ+KchSAnLCAuLi5jb250ZW50KTtcbiAgfVxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgTWV0aG9kIGlzIGZvciBlcnJvciBjb25zb2xlIGxvZ3NcbiAgICogQHBhcmFtIGNvbnRlbnQgaXMgdGhlIHRleHQgeW91IHdhbnQgdG8gcHJpbnQgYXMgY29uc29sZVxuICAgKi9cbiAgbG9nX2UoLi4uY29udGVudCkge1xuICAgIGlmICghREVCVUdfTE9HX09OICYmICFfREVWXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCfwn5qr4p2X77iPICcsIC4uLmNvbnRlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIE1ldGhvZCBpcyBmb3Igd2FybmluZyBjb25zb2xlIGxvZ3NcbiAgICogQHBhcmFtIGNvbnRlbnQgaXMgdGhlIHRleHQgeW91IHdhbnQgdG8gcHJpbnQgYXMgY29uc29sZVxuICAgKi9cbiAgbG9nX3coLi4uY29udGVudCkge1xuICAgIGlmICghREVCVUdfTE9HX09OICYmICFfREVWXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCfwn5S2ICcsIC4uLmNvbnRlbnQpO1xuICB9XG5cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgTWV0aG9kIGlzIGZvciBkZWJ1Z2dpbmcgY29uc29sZSBsb2dzXG4gICAqIEBwYXJhbSBjb250ZW50IGlzIHRoZSB0ZXh0IHlvdSB3YW50IHRvIHByaW50IGFzIGNvbnNvbGVcbiAgICovXG4gIGxvZ19kKC4uLmNvbnRlbnQpIHtcbiAgICBpZiAoIURFQlVHX0xPR19PTiAmJiAhX0RFVl8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygn8J+UtyBUT0RPOiAnLCAuLi5jb250ZW50KTtcbiAgfVxuXG59XG4iXX0=