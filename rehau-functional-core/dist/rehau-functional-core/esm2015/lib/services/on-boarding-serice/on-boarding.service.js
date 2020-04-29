/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// IONIC - ANGULAR
import { Injectable } from '@angular/core';
import { LogService } from '../logger-service/logger.service';
import { delay } from 'q';
export class OnBoardingService {
    /**
     * @param {?} logService
     */
    constructor(logService) {
        this.logService = logService;
    }
    /**
     * \@description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param {?} currentPageTitle title for current active page
     * @param {?} nextPageTitle title for next page
     * @param {?} prevPageTitle title for prev page
     * @return {?}
     */
    nextClickActionHandler(currentPageTitle, nextPageTitle, prevPageTitle) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log('currentPageTitile -->', currentPageTitle);
            this.logService.log('nextPageTitle -->', nextPageTitle);
            this.logService.log('prevPageTitle -->', prevPageTitle);
            yield delay(5000);
            return 'success';
        });
    }
    /**
     * \@description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param {?} currentPageTitle title for current active page
     * @param {?} nextPageTitle title for next page
     * @param {?} prevPageTitle title for prev page
     * @return {?}
     */
    prevClickActionHandler(currentPageTitle, nextPageTitle, prevPageTitle) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logService.log('currentPageTitile -->', currentPageTitle);
            this.logService.log('nextPageTitle -->', nextPageTitle);
            this.logService.log('prevPageTitle -->', prevPageTitle);
            yield delay(5000);
            return 'success';
        });
    }
}
OnBoardingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OnBoardingService.ctorParameters = () => [
    { type: LogService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OnBoardingService.prototype.logService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tYm9hcmRpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9vbi1ib2FyZGluZy1zZXJpY2Uvb24tYm9hcmRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQVUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBSTFCLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFDNUIsWUFDVSxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBRWhDLENBQUM7Ozs7Ozs7O0lBUUssc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGFBQWE7O1lBQ3pFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFeEQsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbEIsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztLQUFBOzs7Ozs7OztJQVFLLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxhQUFhOztZQUN6RSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXhELE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWxCLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7S0FBQTs7O1lBckNGLFVBQVU7Ozs7WUFKRixVQUFVOzs7Ozs7O0lBT2YsdUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSU9OSUMgLSBBTkdVTEFSXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXItc2VydmljZS9sb2dnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJ3EnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPbkJvYXJkaW5nU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9nU2VydmljZTogTG9nU2VydmljZSxcbiAgKSB7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgTWV0aG9kIGlzIHJlc3BvbnNpYmxlIHRvIGhhbmRsZSBhbnkgYWN0aW9uIHRvIHByb2Nlc3MgaW4gYmV0d3dlbiBvbiBib2FyZGluZyBzY3JlZW5zXG4gICAqIEBwYXJhbSBjdXJyZW50UGFnZVRpdGxlIHRpdGxlIGZvciBjdXJyZW50IGFjdGl2ZSBwYWdlXG4gICAqIEBwYXJhbSBuZXh0UGFnZVRpdGxlIHRpdGxlIGZvciBuZXh0IHBhZ2VcbiAgICogQHBhcmFtIHByZXZQYWdlVGl0bGUgdGl0bGUgZm9yIHByZXYgcGFnZVxuICAgKi9cbiAgYXN5bmMgbmV4dENsaWNrQWN0aW9uSGFuZGxlcihjdXJyZW50UGFnZVRpdGxlLCBuZXh0UGFnZVRpdGxlLCBwcmV2UGFnZVRpdGxlKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnY3VycmVudFBhZ2VUaXRpbGUgLS0+JywgY3VycmVudFBhZ2VUaXRsZSk7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnbmV4dFBhZ2VUaXRsZSAtLT4nLCBuZXh0UGFnZVRpdGxlKTtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdwcmV2UGFnZVRpdGxlIC0tPicsIHByZXZQYWdlVGl0bGUpO1xuXG4gICAgYXdhaXQgZGVsYXkoNTAwMCk7XG5cbiAgICByZXR1cm4gJ3N1Y2Nlc3MnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIE1ldGhvZCBpcyByZXNwb25zaWJsZSB0byBoYW5kbGUgYW55IGFjdGlvbiB0byBwcm9jZXNzIGluIGJldHd3ZW4gb24gYm9hcmRpbmcgc2NyZWVuc1xuICAgKiBAcGFyYW0gY3VycmVudFBhZ2VUaXRsZSB0aXRsZSBmb3IgY3VycmVudCBhY3RpdmUgcGFnZVxuICAgKiBAcGFyYW0gbmV4dFBhZ2VUaXRsZSB0aXRsZSBmb3IgbmV4dCBwYWdlXG4gICAqIEBwYXJhbSBwcmV2UGFnZVRpdGxlIHRpdGxlIGZvciBwcmV2IHBhZ2VcbiAgICovXG4gIGFzeW5jIHByZXZDbGlja0FjdGlvbkhhbmRsZXIoY3VycmVudFBhZ2VUaXRsZSwgbmV4dFBhZ2VUaXRsZSwgcHJldlBhZ2VUaXRsZSkge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ2N1cnJlbnRQYWdlVGl0aWxlIC0tPicsIGN1cnJlbnRQYWdlVGl0bGUpO1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ25leHRQYWdlVGl0bGUgLS0+JywgbmV4dFBhZ2VUaXRsZSk7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygncHJldlBhZ2VUaXRsZSAtLT4nLCBwcmV2UGFnZVRpdGxlKTtcblxuICAgIGF3YWl0IGRlbGF5KDUwMDApO1xuXG4gICAgcmV0dXJuICdzdWNjZXNzJztcbiAgfVxuXG59XG4iXX0=