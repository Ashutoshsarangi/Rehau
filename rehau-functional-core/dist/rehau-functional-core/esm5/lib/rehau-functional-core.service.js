/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { onBoardingNextStep } from './stores/onboarding-steps/action/onboarding-step.actions';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
var RehauFunctionalCoreService = /** @class */ (function () {
    function RehauFunctionalCoreService(store) {
        this.store = store;
        this.onBoardingData$ = store.pipe(select('onBoardingData'));
    }
    /**
     * @return {?}
     */
    RehauFunctionalCoreService.prototype.showSuccess = /**
     * @return {?}
     */
    function () {
        this.onBoardingData$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            console.log('this is list of onBoardings from App.component -->', data);
        }));
        this.store.dispatch(onBoardingNextStep({ payload: { configPosition: 6 } }));
    };
    RehauFunctionalCoreService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    RehauFunctionalCoreService.ctorParameters = function () { return [
        { type: Store }
    ]; };
    /** @nocollapse */ RehauFunctionalCoreService.ngInjectableDef = i0.defineInjectable({ factory: function RehauFunctionalCoreService_Factory() { return new RehauFunctionalCoreService(i0.inject(i1.Store)); }, token: RehauFunctionalCoreService, providedIn: "root" });
    return RehauFunctionalCoreService;
}());
export { RehauFunctionalCoreService };
if (false) {
    /** @type {?} */
    RehauFunctionalCoreService.prototype.onBoardingData$;
    /**
     * @type {?}
     * @private
     */
    RehauFunctionalCoreService.prototype.store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVoYXUtZnVuY3Rpb25hbC1jb3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvcmVoYXUtZnVuY3Rpb25hbC1jb3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMERBQTBELENBQUM7OztBQUU5RjtJQU1FLG9DQUFvQixLQUF1QztRQUF2QyxVQUFLLEdBQUwsS0FBSyxDQUFrQztRQUN6RCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBR0QsZ0RBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxJQUFJO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDOztnQkFoQkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFMUSxLQUFLOzs7cUNBSmQ7Q0F3QkMsQUFqQkQsSUFpQkM7U0FkWSwwQkFBMEI7OztJQUVyQyxxREFBbUM7Ozs7O0lBQ3ZCLDJDQUErQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdG9yZSwgc2VsZWN0IH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgb25Cb2FyZGluZ05leHRTdGVwIH0gZnJvbSAnLi9zdG9yZXMvb25ib2FyZGluZy1zdGVwcy9hY3Rpb24vb25ib2FyZGluZy1zdGVwLmFjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZWhhdUZ1bmN0aW9uYWxDb3JlU2VydmljZSB7XG5cbiAgb25Cb2FyZGluZ0RhdGEkOiBPYnNlcnZhYmxlPGFueVtdPjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8eyBvbkJvYXJkaW5nRGF0YTogYW55W10gfT4pIHtcbiAgICB0aGlzLm9uQm9hcmRpbmdEYXRhJCA9IHN0b3JlLnBpcGUoc2VsZWN0KCdvbkJvYXJkaW5nRGF0YScpKTtcbiAgfVxuXG5cbiAgc2hvd1N1Y2Nlc3MoKSB7XG4gICAgdGhpcy5vbkJvYXJkaW5nRGF0YSQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBsaXN0IG9mIG9uQm9hcmRpbmdzIGZyb20gQXBwLmNvbXBvbmVudCAtLT4nLCBkYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG9uQm9hcmRpbmdOZXh0U3RlcCh7IHBheWxvYWQ6IHsgY29uZmlnUG9zaXRpb246IDYgfSB9KSk7XG4gIH1cbn1cbiJdfQ==