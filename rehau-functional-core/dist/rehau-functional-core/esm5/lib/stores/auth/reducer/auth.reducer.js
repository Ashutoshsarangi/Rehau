/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { createReducer, on } from '@ngrx/store';
import { userInfoAction } from '../action/auth.action';
/** @type {?} */
export var initialState = {
    userInfo: {}
};
var ɵ0 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
function (state, _a) {
    var payload = _a.payload;
    return ({ userInfo: tslib_1.__assign({}, payload.userInfo) });
};
/** @type {?} */
var Reducer = createReducer(initialState, on(userInfoAction, (ɵ0)));
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
export function cidaasReducer(state, action) {
    return Reducer(state, action);
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3N0b3Jlcy9hdXRoL3JlZHVjZXIvYXV0aC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFVLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUd2RCxNQUFNLEtBQU8sWUFBWSxHQUFnQjtJQUN2QyxRQUFRLEVBQUUsRUFBRTtDQUNiOzs7Ozs7QUFHb0IsVUFBQyxLQUFLLEVBQUUsRUFBVztRQUFULG9CQUFPO0lBQ2xDLE9BQUEsQ0FBQyxFQUFFLFFBQVEsdUJBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBRSxFQUFFLENBQUM7QUFBdkMsQ0FBdUM7O0lBSHJDLE9BQU8sR0FBRyxhQUFhLENBQzNCLFlBQVksRUFDWixFQUFFLENBQUMsY0FBYyxPQUN5QixDQUMzQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUE4QixFQUFFLE1BQWM7SUFDMUUsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24sIGNyZWF0ZVJlZHVjZXIsIG9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgdXNlckluZm9BY3Rpb24gfSBmcm9tICcuLi9hY3Rpb24vYXV0aC5hY3Rpb24nO1xuaW1wb3J0IHsgQ2lkYWFzU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvYXV0aC5tb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IENpZGFhc1N0YXRlID0ge1xuICB1c2VySW5mbzoge31cbn07XG5jb25zdCBSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAgaW5pdGlhbFN0YXRlLFxuICBvbih1c2VySW5mb0FjdGlvbiwgKHN0YXRlLCB7IHBheWxvYWQgfSkgPT5cbiAgICAoeyB1c2VySW5mbzogeyAuLi5wYXlsb2FkLnVzZXJJbmZvIH0gfSkpXG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gY2lkYWFzUmVkdWNlcihzdGF0ZTogQ2lkYWFzU3RhdGUgfCB1bmRlZmluZWQsIGFjdGlvbjogQWN0aW9uKSB7XG4gIHJldHVybiBSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xufVxuIl19