/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createReducer, on } from '@ngrx/store';
import { onBoardingBackStep, onBoardingNextStep } from '../action/onboarding-step.actions';
/** @type {?} */
export var initialState = {
    configPosition: 0
};
var ɵ0 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
function (state, _a) {
    var payload = _a.payload;
    return ({ configPosition: payload.configPosition + 1 });
}, ɵ1 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
function (state, _a) {
    var payload = _a.payload;
    return ({ configPosition: payload.configPosition - 1 });
};
/** @type {?} */
var Reducer = createReducer(initialState, on(onBoardingNextStep, (ɵ0)), on(onBoardingBackStep, (ɵ1)));
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
export function onBoardingReducer(state, action) {
    return Reducer(state, action);
}
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25ib2FyZGluZy1zdGVwLnJlZHVjZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmVzL29uYm9hcmRpbmctc3RlcHMvcmVkdWNlci9vbmJvYXJkaW5nLXN0ZXAucmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFVLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBRTNGLE1BQU0sS0FBTyxZQUFZLEdBQUc7SUFDMUIsY0FBYyxFQUFFLENBQUM7Q0FDbEI7Ozs7OztBQUd3QixVQUFDLEtBQUssRUFBRSxFQUFXO1FBQVQsb0JBQU87SUFDdEMsT0FBQSxDQUFDLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFBaEQsQ0FBZ0Q7Ozs7O0FBQzNCLFVBQUMsS0FBSyxFQUFFLEVBQVc7UUFBVCxvQkFBTztJQUN0QyxPQUFBLENBQUMsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUFoRCxDQUFnRDs7SUFMOUMsT0FBTyxHQUFHLGFBQWEsQ0FDM0IsWUFBWSxFQUNaLEVBQUUsQ0FBQyxrQkFBa0IsT0FDOEIsRUFDbkQsRUFBRSxDQUFDLGtCQUFrQixPQUM4QixDQUNwRDs7Ozs7O0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQXNCLEVBQUUsTUFBYztJQUN0RSxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDaEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiwgY3JlYXRlUmVkdWNlciwgb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBvbkJvYXJkaW5nQmFja1N0ZXAsIG9uQm9hcmRpbmdOZXh0U3RlcCB9IGZyb20gJy4uL2FjdGlvbi9vbmJvYXJkaW5nLXN0ZXAuYWN0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGNvbmZpZ1Bvc2l0aW9uOiAwXG59O1xuY29uc3QgUmVkdWNlciA9IGNyZWF0ZVJlZHVjZXIoXG4gIGluaXRpYWxTdGF0ZSxcbiAgb24ob25Cb2FyZGluZ05leHRTdGVwLCAoc3RhdGUsIHsgcGF5bG9hZCB9KSA9PlxuICAgICh7IGNvbmZpZ1Bvc2l0aW9uOiBwYXlsb2FkLmNvbmZpZ1Bvc2l0aW9uICsgMSB9KSksXG4gIG9uKG9uQm9hcmRpbmdCYWNrU3RlcCwgKHN0YXRlLCB7IHBheWxvYWQgfSkgPT5cbiAgICAoeyBjb25maWdQb3NpdGlvbjogcGF5bG9hZC5jb25maWdQb3NpdGlvbiAtIDEgfSkpXG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gb25Cb2FyZGluZ1JlZHVjZXIoc3RhdGU6IGFueSB8IHVuZGVmaW5lZCwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgcmV0dXJuIFJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG59XG4iXX0=