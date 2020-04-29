import { Action, createReducer, on } from '@ngrx/store';
import { onBoardingBackStep, onBoardingNextStep } from '../action/onboarding-step.actions';

export const initialState = {
  configPosition: 0
};
const Reducer = createReducer(
  initialState,
  on(onBoardingNextStep, (state, { payload }) =>
    ({ configPosition: payload.configPosition + 1 })),
  on(onBoardingBackStep, (state, { payload }) =>
    ({ configPosition: payload.configPosition - 1 }))
);

export function onBoardingReducer(state: any | undefined, action: Action) {
  return Reducer(state, action);
}
