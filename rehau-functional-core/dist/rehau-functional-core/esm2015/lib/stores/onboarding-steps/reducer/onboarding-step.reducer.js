/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createReducer, on } from '@ngrx/store';
import { onBoardingBackStep, onBoardingNextStep } from '../action/onboarding-step.actions';
/** @type {?} */
export const initialState = {
    configPosition: 0
};
const ɵ0 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
(state, { payload }) => ({ configPosition: payload.configPosition + 1 }), ɵ1 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
(state, { payload }) => ({ configPosition: payload.configPosition - 1 });
/** @type {?} */
const Reducer = createReducer(initialState, on(onBoardingNextStep, (ɵ0)), on(onBoardingBackStep, (ɵ1)));
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
export function onBoardingReducer(state, action) {
    return Reducer(state, action);
}
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25ib2FyZGluZy1zdGVwLnJlZHVjZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmVzL29uYm9hcmRpbmctc3RlcHMvcmVkdWNlci9vbmJvYXJkaW5nLXN0ZXAucmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFVLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBRTNGLE1BQU0sT0FBTyxZQUFZLEdBQUc7SUFDMUIsY0FBYyxFQUFFLENBQUM7Q0FDbEI7Ozs7OztBQUd3QixDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FDNUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDOzs7OztBQUMzQixDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FDNUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDOztNQUw5QyxPQUFPLEdBQUcsYUFBYSxDQUMzQixZQUFZLEVBQ1osRUFBRSxDQUFDLGtCQUFrQixPQUM4QixFQUNuRCxFQUFFLENBQUMsa0JBQWtCLE9BQzhCLENBQ3BEOzs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBc0IsRUFBRSxNQUFjO0lBQ3RFLE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uLCBjcmVhdGVSZWR1Y2VyLCBvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IG9uQm9hcmRpbmdCYWNrU3RlcCwgb25Cb2FyZGluZ05leHRTdGVwIH0gZnJvbSAnLi4vYWN0aW9uL29uYm9hcmRpbmctc3RlcC5hY3Rpb25zJztcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgY29uZmlnUG9zaXRpb246IDBcbn07XG5jb25zdCBSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAgaW5pdGlhbFN0YXRlLFxuICBvbihvbkJvYXJkaW5nTmV4dFN0ZXAsIChzdGF0ZSwgeyBwYXlsb2FkIH0pID0+XG4gICAgKHsgY29uZmlnUG9zaXRpb246IHBheWxvYWQuY29uZmlnUG9zaXRpb24gKyAxIH0pKSxcbiAgb24ob25Cb2FyZGluZ0JhY2tTdGVwLCAoc3RhdGUsIHsgcGF5bG9hZCB9KSA9PlxuICAgICh7IGNvbmZpZ1Bvc2l0aW9uOiBwYXlsb2FkLmNvbmZpZ1Bvc2l0aW9uIC0gMSB9KSlcbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkJvYXJkaW5nUmVkdWNlcihzdGF0ZTogYW55IHwgdW5kZWZpbmVkLCBhY3Rpb246IEFjdGlvbikge1xuICByZXR1cm4gUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbn1cbiJdfQ==