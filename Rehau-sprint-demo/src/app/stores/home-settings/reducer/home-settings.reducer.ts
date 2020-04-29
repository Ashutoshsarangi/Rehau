import { Action, createReducer, on } from '@ngrx/store';
import { homeSettingsAction } from '../action/home-settings.action';
import { HomeSettingsModel } from '../../model/home-settings.model';



export const initialState: HomeSettingsModel = {
 isLeakageDetected: false
};
const Reducer = createReducer(
  initialState,
  on(homeSettingsAction, (state, { payload }) =>
    ({ isLeakageDetected: payload.isLeakageDetected }))
);

export function HomeSettingsReducer(state: HomeSettingsModel | undefined, action: Action) {
  return Reducer(state, action);
}
