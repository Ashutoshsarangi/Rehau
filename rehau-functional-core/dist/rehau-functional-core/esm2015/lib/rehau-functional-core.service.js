/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { onBoardingNextStep } from './stores/onboarding-steps/action/onboarding-step.actions';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
export class RehauFunctionalCoreService {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.store = store;
        this.onBoardingData$ = store.pipe(select('onBoardingData'));
    }
    /**
     * @return {?}
     */
    showSuccess() {
        this.onBoardingData$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            console.log('this is list of onBoardings from App.component -->', data);
        }));
        this.store.dispatch(onBoardingNextStep({ payload: { configPosition: 6 } }));
    }
}
RehauFunctionalCoreService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RehauFunctionalCoreService.ctorParameters = () => [
    { type: Store }
];
/** @nocollapse */ RehauFunctionalCoreService.ngInjectableDef = i0.defineInjectable({ factory: function RehauFunctionalCoreService_Factory() { return new RehauFunctionalCoreService(i0.inject(i1.Store)); }, token: RehauFunctionalCoreService, providedIn: "root" });
if (false) {
    /** @type {?} */
    RehauFunctionalCoreService.prototype.onBoardingData$;
    /**
     * @type {?}
     * @private
     */
    RehauFunctionalCoreService.prototype.store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVoYXUtZnVuY3Rpb25hbC1jb3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvcmVoYXUtZnVuY3Rpb25hbC1jb3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMERBQTBELENBQUM7OztBQUs5RixNQUFNLE9BQU8sMEJBQTBCOzs7O0lBR3JDLFlBQW9CLEtBQXVDO1FBQXZDLFVBQUssR0FBTCxLQUFLLENBQWtDO1FBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7SUFHRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFFLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7O1lBaEJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUxRLEtBQUs7Ozs7O0lBUVoscURBQW1DOzs7OztJQUN2QiwyQ0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3RvcmUsIHNlbGVjdCB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IG9uQm9hcmRpbmdOZXh0U3RlcCB9IGZyb20gJy4vc3RvcmVzL29uYm9hcmRpbmctc3RlcHMvYWN0aW9uL29uYm9hcmRpbmctc3RlcC5hY3Rpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVoYXVGdW5jdGlvbmFsQ29yZVNlcnZpY2Uge1xuXG4gIG9uQm9hcmRpbmdEYXRhJDogT2JzZXJ2YWJsZTxhbnlbXT47XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPHsgb25Cb2FyZGluZ0RhdGE6IGFueVtdIH0+KSB7XG4gICAgdGhpcy5vbkJvYXJkaW5nRGF0YSQgPSBzdG9yZS5waXBlKHNlbGVjdCgnb25Cb2FyZGluZ0RhdGEnKSk7XG4gIH1cblxuXG4gIHNob3dTdWNjZXNzKCkge1xuICAgIHRoaXMub25Cb2FyZGluZ0RhdGEkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgbGlzdCBvZiBvbkJvYXJkaW5ncyBmcm9tIEFwcC5jb21wb25lbnQgLS0+JywgZGF0YSk7XG4gICAgfSk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChvbkJvYXJkaW5nTmV4dFN0ZXAoeyBwYXlsb2FkOiB7IGNvbmZpZ1Bvc2l0aW9uOiA2IH0gfSkpO1xuICB9XG59XG4iXX0=