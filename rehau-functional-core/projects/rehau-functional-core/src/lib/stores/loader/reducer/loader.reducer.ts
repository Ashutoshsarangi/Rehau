import { Action, createReducer, on } from '@ngrx/store';
import { loaderAction } from '../action/loader.action';

export interface State {
  showLoader: boolean;
}

export const initialState: State = {
    showLoader: false,
  };

const Reducer = createReducer(
  initialState,
  on(loaderAction, state => ({ ...state })),
);

export function loaderReducer(state: State | undefined, action: Action) {
    return Reducer(state, action);
}
