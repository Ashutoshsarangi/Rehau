import { Action, createReducer, on } from '@ngrx/store';
import { leakageSettingsActions } from '../action/settings.action';
import { LeakageSettingsModel } from '../../model/settings.model';



export const initialState: LeakageSettingsModel = {
    dropLeakage: {
        status: '',
        time: {
            parameters: [],
            selectedParam: 0
          },
        frequency: {
            parameters: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            selectedParam: 0
          },
        action: {
            parameters: ['Shut-off & warning', 'WARNING'],
            selectedParam: 0
          },
    },
};
const Reducer = createReducer(
  initialState,
  on(leakageSettingsActions, (state, { payload }) =>
    ({ dropLeakage: { ...payload.dropLeakage } }))
);

export function LeakageSettingsReducer(state: LeakageSettingsModel | undefined, action: Action) {
  return Reducer(state, action);
}
