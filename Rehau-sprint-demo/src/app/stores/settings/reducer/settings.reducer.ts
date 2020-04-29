import { Action, createReducer, on } from '@ngrx/store';
import { settingsAction } from '../action/settings.action';
import { SettingsModel } from '../../model/settings.model';
import { CacheService } from 'rehau-functional-core/dist/rehau-functional-core';

const INITIAL_STATE = '@ngrx/store/init';


export const initialState: SettingsModel =  {
  settingsParams: {
    settingStatus: '',
    units: {
      flow: {
        parameters: ['L/M', 'L/H', 'm3/H'],
        selectedParam: 0
      },
      amount: {
        parameters: ['l', 'm3'],
        selectedParam: 0
      },
      pressure: {
        parameters: ['Bar', 'Pa'],
        selectedParam: 0
      },
      temperature: {
        parameters: ['C', 'F'],
        selectedParam: 0
      },
    },
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
    limits: {
        present: {
          parameters: [
            {
              text: 'Maximum time',
              subTitle: ''
            },
            {
              text: 'Maximum flow',
              subTitle: ''
            },
            {
              text: 'Maximum time',
              subTitle: ''
            }
          ],
          selectedParam: 0
          },
        absent: {
          parameters: [
            {
              text: 'Maximum time',
              subTitle: ''
            },
            {
              text: 'Maximum flow',
              subTitle: ''
            },
            {
              text: 'Maximum time',
              subTitle: ''
            }
          ],
          selectedParam: 0
        },
    },
  }
};
const Reducer = createReducer(
  initialState,
  on(settingsAction, (state, { payload }) =>
    ({ settingsParams: { ...payload.settingsParams } }))
);

export function SettingsReducer(state: SettingsModel | undefined, action: Action) {
  return Reducer(state, action);
}
