/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// IONIC - ANGULAR
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { userInfoAction } from '../../stores/auth/action/auth.action';
import { LogService } from '../logger-service/logger.service';
import { loaderAction } from '../../stores/loader/action/loader.action';
/** @type {?} */
export var LoaderFlag = new Subject();
var StoreService = /** @class */ (function () {
    function StoreService(store, logService) {
        this.store = store;
        this.logService = logService;
        this.userData$ = this.store.pipe(select('cidaasData'));
        this.showLoader$ = store.pipe(select('loaderState'));
    }
    /**
     * @param {?} Data
     * @return {?}
     */
    StoreService.prototype.dispatchUserData = /**
     * @param {?} Data
     * @return {?}
     */
    function (Data) {
        this.store.dispatch(userInfoAction({ payload: { userInfo: Data } }));
    };
    /**
     * @description This function will return the latest state of userData from store
     * @returns object of user data
     */
    /**
     * \@description This function will return the latest state of userData from store
     * @return {?} object of user data
     */
    StoreService.prototype.getUserData = /**
     * \@description This function will return the latest state of userData from store
     * @return {?} object of user data
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userData;
            return tslib_1.__generator(this, function (_a) {
                this.userData$.subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (Object.keys(data.userInfo).length > 0) {
                        userData = data.userInfo;
                    }
                }));
                return [2 /*return*/, userData];
            });
        });
    };
    /**
     * @description This function will update the state of loader
     * @param state is the value of state to dispatch
     */
    /**
     * \@description This function will update the state of loader
     * @param {?} state is the value of state to dispatch
     * @return {?}
     */
    StoreService.prototype.dispatchLoaderState = /**
     * \@description This function will update the state of loader
     * @param {?} state is the value of state to dispatch
     * @return {?}
     */
    function (state) {
        this.logService.log('in dispatch method tab loader state', state);
        this.store.dispatch(loaderAction(state));
        LoaderFlag.next(state);
    };
    /**
     * @description This function will return the latest state of loader
     * @returns current loader state
     */
    /**
     * \@description This function will return the latest state of loader
     * @return {?} current loader state
     */
    StoreService.prototype.getLoaderState = /**
     * \@description This function will return the latest state of loader
     * @return {?} current loader state
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loaderState;
            return tslib_1.__generator(this, function (_a) {
                this.showLoader$.subscribe((/**
                 * @param {?} state
                 * @return {?}
                 */
                function (state) {
                    loaderState = state;
                }));
                this.logService.log('in get loader state --->', loaderState);
                LoaderFlag.next(loaderState.showLoader);
                return [2 /*return*/, loaderState.showLoader];
            });
        });
    };
    StoreService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StoreService.ctorParameters = function () { return [
        { type: Store },
        { type: LogService }
    ]; };
    return StoreService;
}());
export { StoreService };
if (false) {
    /** @type {?} */
    StoreService.prototype.userData$;
    /** @type {?} */
    StoreService.prototype.showLoader$;
    /**
     * @type {?}
     * @private
     */
    StoreService.prototype.store;
    /**
     * @type {?}
     * @private
     */
    StoreService.prototype.logService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zdG9yZS1zZXJ2aWNlL3N0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV0RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQUd4RSxNQUFNLEtBQU8sVUFBVSxHQUFHLElBQUksT0FBTyxFQUFFO0FBQ3ZDO0lBS0Usc0JBQ1UsS0FBK0QsRUFDL0QsVUFBc0I7UUFEdEIsVUFBSyxHQUFMLEtBQUssQ0FBMEQ7UUFDL0QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVELHVDQUFnQjs7OztJQUFoQixVQUFpQixJQUFJO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNHLGtDQUFXOzs7O0lBQWpCOzs7O2dCQUVFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztnQkFBQyxVQUFDLElBQUk7b0JBQzVCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDekMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7cUJBQzFCO2dCQUNILENBQUMsRUFBQyxDQUFDO2dCQUVILHNCQUFPLFFBQVEsRUFBQzs7O0tBQ2pCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwwQ0FBbUI7Ozs7O0lBQW5CLFVBQW9CLEtBQUs7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNHLHFDQUFjOzs7O0lBQXBCOzs7O2dCQUVFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUzs7OztnQkFBQyxVQUFDLEtBQUs7b0JBQzdCLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLENBQUMsRUFBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUM3RCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEMsc0JBQU8sV0FBVyxDQUFDLFVBQVUsRUFBQzs7O0tBQy9COztnQkF0REYsVUFBVTs7OztnQkFSRixLQUFLO2dCQUdMLFVBQVU7O0lBNkRuQixtQkFBQztDQUFBLEFBeERELElBd0RDO1NBdERZLFlBQVk7OztJQUN2QixpQ0FBbUM7O0lBQ25DLG1DQUFpQzs7Ozs7SUFFL0IsNkJBQXVFOzs7OztJQUN2RSxrQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJT05JQyAtIEFOR1VMQVJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0b3JlLCBzZWxlY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyB1c2VySW5mb0FjdGlvbiB9IGZyb20gJy4uLy4uL3N0b3Jlcy9hdXRoL2FjdGlvbi9hdXRoLmFjdGlvbic7XG5pbXBvcnQgeyBDaWRhYXNTdGF0ZSB9IGZyb20gJy4uLy4uL21vZGVscy9hdXRoLm1vZGVsJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXItc2VydmljZS9sb2dnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBsb2FkZXJBY3Rpb24gfSBmcm9tICcuLi8uLi9zdG9yZXMvbG9hZGVyL2FjdGlvbi9sb2FkZXIuYWN0aW9uJztcblxuXG5leHBvcnQgY29uc3QgTG9hZGVyRmxhZyA9IG5ldyBTdWJqZWN0KCk7XG5ASW5qZWN0YWJsZSgpXG5cbmV4cG9ydCBjbGFzcyBTdG9yZVNlcnZpY2Uge1xuICB1c2VyRGF0YSQ6IE9ic2VydmFibGU8Q2lkYWFzU3RhdGU+O1xuICBzaG93TG9hZGVyJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8eyBjaWRhYXNEYXRhOiBDaWRhYXNTdGF0ZSwgbG9hZGVyU3RhdGU6IGJvb2xlYW4gfT4sXG4gICAgcHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMudXNlckRhdGEkID0gdGhpcy5zdG9yZS5waXBlKHNlbGVjdCgnY2lkYWFzRGF0YScpKTtcbiAgICB0aGlzLnNob3dMb2FkZXIkID0gc3RvcmUucGlwZShzZWxlY3QoJ2xvYWRlclN0YXRlJykpO1xuICB9XG5cbiAgZGlzcGF0Y2hVc2VyRGF0YShEYXRhKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh1c2VySW5mb0FjdGlvbih7IHBheWxvYWQ6IHsgdXNlckluZm86IERhdGEgfSB9KSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGxhdGVzdCBzdGF0ZSBvZiB1c2VyRGF0YSBmcm9tIHN0b3JlXG4gICAqIEByZXR1cm5zIG9iamVjdCBvZiB1c2VyIGRhdGFcbiAgICovXG4gIGFzeW5jIGdldFVzZXJEYXRhKCkge1xuICAgIGxldCB1c2VyRGF0YTtcbiAgICB0aGlzLnVzZXJEYXRhJC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhkYXRhLnVzZXJJbmZvKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHVzZXJEYXRhID0gZGF0YS51c2VySW5mbztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB1c2VyRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIHVwZGF0ZSB0aGUgc3RhdGUgb2YgbG9hZGVyXG4gICAqIEBwYXJhbSBzdGF0ZSBpcyB0aGUgdmFsdWUgb2Ygc3RhdGUgdG8gZGlzcGF0Y2hcbiAgICovXG4gIGRpc3BhdGNoTG9hZGVyU3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdpbiBkaXNwYXRjaCBtZXRob2QgdGFiIGxvYWRlciBzdGF0ZScsIHN0YXRlKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGxvYWRlckFjdGlvbihzdGF0ZSkpO1xuICAgIExvYWRlckZsYWcubmV4dChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGxhdGVzdCBzdGF0ZSBvZiBsb2FkZXJcbiAgICogQHJldHVybnMgY3VycmVudCBsb2FkZXIgc3RhdGVcbiAgICovXG4gIGFzeW5jIGdldExvYWRlclN0YXRlKCkge1xuICAgIGxldCBsb2FkZXJTdGF0ZTtcbiAgICB0aGlzLnNob3dMb2FkZXIkLnN1YnNjcmliZSgoc3RhdGUpID0+IHtcbiAgICAgICAgbG9hZGVyU3RhdGUgPSBzdGF0ZTtcbiAgICB9KTtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdpbiBnZXQgbG9hZGVyIHN0YXRlIC0tLT4nLCBsb2FkZXJTdGF0ZSk7XG4gICAgTG9hZGVyRmxhZy5uZXh0KGxvYWRlclN0YXRlLnNob3dMb2FkZXIpO1xuICAgIHJldHVybiBsb2FkZXJTdGF0ZS5zaG93TG9hZGVyO1xuICB9XG5cbn1cbiJdfQ==