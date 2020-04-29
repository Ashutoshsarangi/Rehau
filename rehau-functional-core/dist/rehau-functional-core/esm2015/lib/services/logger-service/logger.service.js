/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// IONIC - ANGULAR
import { Injectable } from '@angular/core';
import { DEBUG_LOG_ON, _DEV_ } from '../../config/app-setting.config';
export class LogService {
    /**
     * \@description This Method is for general console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    log(...content) {
        if (!DEBUG_LOG_ON && !_DEV_) {
            return;
        }
        console.log('✅ ', ...content);
    }
    /**
     * \@description This Method is for error console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    log_e(...content) {
        if (!DEBUG_LOG_ON && !_DEV_) {
            return;
        }
        console.log('🚫❗️ ', ...content);
    }
    /**
     * \@description This Method is for warning console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    log_w(...content) {
        if (!DEBUG_LOG_ON && !_DEV_) {
            return;
        }
        console.log('🔶 ', ...content);
    }
    /**
     * \@description This Method is for debugging console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    log_d(...content) {
        if (!DEBUG_LOG_ON && !_DEV_) {
            return;
        }
        console.log('🔷 TODO: ', ...content);
    }
}
LogService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLXNlcnZpY2UvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJdEUsTUFBTSxPQUFPLFVBQVU7Ozs7OztJQUtyQixHQUFHLENBQUMsR0FBRyxPQUFPO1FBQ1osSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixPQUFPO1NBQ1I7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUtELEtBQUssQ0FBQyxHQUFHLE9BQU87UUFDZCxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzNCLE9BQU87U0FDUjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7O0lBTUQsS0FBSyxDQUFDLEdBQUcsT0FBTztRQUNkLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0IsT0FBTztTQUNSO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFPRCxLQUFLLENBQUMsR0FBRyxPQUFPO1FBQ2QsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixPQUFPO1NBQ1I7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQWpERixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSU9OSUMgLSBBTkdVTEFSXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERFQlVHX0xPR19PTiwgX0RFVl8gfSBmcm9tICcuLi8uLi9jb25maWcvYXBwLXNldHRpbmcuY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuXG5leHBvcnQgY2xhc3MgTG9nU2VydmljZSB7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBNZXRob2QgaXMgZm9yIGdlbmVyYWwgY29uc29sZSBsb2dzXG4gICAqIEBwYXJhbSBjb250ZW50IGlzIHRoZSB0ZXh0IHlvdSB3YW50IHRvIHByaW50IGFzIGNvbnNvbGVcbiAgICovXG4gIGxvZyguLi5jb250ZW50KSB7XG4gICAgaWYgKCFERUJVR19MT0dfT04gJiYgIV9ERVZfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ+KchSAnLCAuLi5jb250ZW50KTtcbiAgfVxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgTWV0aG9kIGlzIGZvciBlcnJvciBjb25zb2xlIGxvZ3NcbiAgICogQHBhcmFtIGNvbnRlbnQgaXMgdGhlIHRleHQgeW91IHdhbnQgdG8gcHJpbnQgYXMgY29uc29sZVxuICAgKi9cbiAgbG9nX2UoLi4uY29udGVudCkge1xuICAgIGlmICghREVCVUdfTE9HX09OICYmICFfREVWXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCfwn5qr4p2X77iPICcsIC4uLmNvbnRlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIE1ldGhvZCBpcyBmb3Igd2FybmluZyBjb25zb2xlIGxvZ3NcbiAgICogQHBhcmFtIGNvbnRlbnQgaXMgdGhlIHRleHQgeW91IHdhbnQgdG8gcHJpbnQgYXMgY29uc29sZVxuICAgKi9cbiAgbG9nX3coLi4uY29udGVudCkge1xuICAgIGlmICghREVCVUdfTE9HX09OICYmICFfREVWXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCfwn5S2ICcsIC4uLmNvbnRlbnQpO1xuICB9XG5cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgTWV0aG9kIGlzIGZvciBkZWJ1Z2dpbmcgY29uc29sZSBsb2dzXG4gICAqIEBwYXJhbSBjb250ZW50IGlzIHRoZSB0ZXh0IHlvdSB3YW50IHRvIHByaW50IGFzIGNvbnNvbGVcbiAgICovXG4gIGxvZ19kKC4uLmNvbnRlbnQpIHtcbiAgICBpZiAoIURFQlVHX0xPR19PTiAmJiAhX0RFVl8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygn8J+UtyBUT0RPOiAnLCAuLi5jb250ZW50KTtcbiAgfVxuXG59XG4iXX0=