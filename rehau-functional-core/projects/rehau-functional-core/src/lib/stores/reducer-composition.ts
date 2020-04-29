import { ActionReducerMap } from '@ngrx/store';

import { onBoardingReducer } from './onboarding-steps/reducer/onboarding-step.reducer';
import { cidaasReducer } from './auth/reducer/auth.reducer';
import { loaderReducer } from './loader/reducer/loader.reducer';

export interface IAppState {
  onBoardingData: any;
  cidaasData: any;
  loaderState: any;
}

export const reducers: ActionReducerMap<IAppState> = {
  onBoardingData: onBoardingReducer,
  cidaasData: cidaasReducer,
  loaderState: loaderReducer
};
