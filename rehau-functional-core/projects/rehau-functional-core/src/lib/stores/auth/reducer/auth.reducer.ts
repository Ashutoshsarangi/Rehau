import { Action, createReducer, on } from '@ngrx/store';
import { userInfoAction } from '../action/auth.action';
import { CidaasState } from '../../../models/auth.model';

export const initialState: CidaasState = {
  userInfo: {}
};
const Reducer = createReducer(
  initialState,
  on(userInfoAction, (state, { payload }) =>
    ({ userInfo: { ...payload.userInfo } }))
);

export function cidaasReducer(state: CidaasState | undefined, action: Action) {
  return Reducer(state, action);
}
