/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { createReducer, on } from '@ngrx/store';
import { loaderAction } from '../action/loader.action';
/**
 * @record
 */
export function State() { }
if (false) {
    /** @type {?} */
    State.prototype.showLoader;
}
/** @type {?} */
export var initialState = {
    showLoader: false,
};
var ɵ0 = /**
 * @param {?} state
 * @return {?}
 */
function (state) { return (tslib_1.__assign({}, state)); };
/** @type {?} */
var Reducer = createReducer(initialState, on(loaderAction, (ɵ0)));
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
export function loaderReducer(state, action) {
    return Reducer(state, action);
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLnJlZHVjZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmVzL2xvYWRlci9yZWR1Y2VyL2xvYWRlci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFVLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBRXZELDJCQUVDOzs7SUFEQywyQkFBb0I7OztBQUd0QixNQUFNLEtBQU8sWUFBWSxHQUFVO0lBQy9CLFVBQVUsRUFBRSxLQUFLO0NBQ2xCOzs7OztBQUlnQixVQUFBLEtBQUssSUFBSSxPQUFBLHNCQUFNLEtBQUssRUFBRyxFQUFkLENBQWM7O0lBRnBDLE9BQU8sR0FBRyxhQUFhLENBQzNCLFlBQVksRUFDWixFQUFFLENBQUMsWUFBWSxPQUEwQixDQUMxQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUF3QixFQUFFLE1BQWM7SUFDbEUsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24sIGNyZWF0ZVJlZHVjZXIsIG9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgbG9hZGVyQWN0aW9uIH0gZnJvbSAnLi4vYWN0aW9uL2xvYWRlci5hY3Rpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgc2hvd0xvYWRlcjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gICAgc2hvd0xvYWRlcjogZmFsc2UsXG4gIH07XG5cbmNvbnN0IFJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICBpbml0aWFsU3RhdGUsXG4gIG9uKGxvYWRlckFjdGlvbiwgc3RhdGUgPT4gKHsgLi4uc3RhdGUgfSkpLFxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRlclJlZHVjZXIoc3RhdGU6IFN0YXRlIHwgdW5kZWZpbmVkLCBhY3Rpb246IEFjdGlvbikge1xuICAgIHJldHVybiBSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xufVxuIl19