/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export const initialState = {
    showLoader: false,
};
const ɵ0 = /**
 * @param {?} state
 * @return {?}
 */
state => (Object.assign({}, state));
/** @type {?} */
const Reducer = createReducer(initialState, on(loaderAction, (ɵ0)));
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
export function loaderReducer(state, action) {
    return Reducer(state, action);
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLnJlZHVjZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmVzL2xvYWRlci9yZWR1Y2VyL2xvYWRlci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQVUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFFdkQsMkJBRUM7OztJQURDLDJCQUFvQjs7O0FBR3RCLE1BQU0sT0FBTyxZQUFZLEdBQVU7SUFDL0IsVUFBVSxFQUFFLEtBQUs7Q0FDbEI7Ozs7O0FBSWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsbUJBQU0sS0FBSyxFQUFHOztNQUZwQyxPQUFPLEdBQUcsYUFBYSxDQUMzQixZQUFZLEVBQ1osRUFBRSxDQUFDLFlBQVksT0FBMEIsQ0FDMUM7Ozs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBd0IsRUFBRSxNQUFjO0lBQ2xFLE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uLCBjcmVhdGVSZWR1Y2VyLCBvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IGxvYWRlckFjdGlvbiB9IGZyb20gJy4uL2FjdGlvbi9sb2FkZXIuYWN0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gIHNob3dMb2FkZXI6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICAgIHNob3dMb2FkZXI6IGZhbHNlLFxuICB9O1xuXG5jb25zdCBSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAgaW5pdGlhbFN0YXRlLFxuICBvbihsb2FkZXJBY3Rpb24sIHN0YXRlID0+ICh7IC4uLnN0YXRlIH0pKSxcbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkZXJSZWR1Y2VyKHN0YXRlOiBTdGF0ZSB8IHVuZGVmaW5lZCwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICByZXR1cm4gUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbn1cbiJdfQ==