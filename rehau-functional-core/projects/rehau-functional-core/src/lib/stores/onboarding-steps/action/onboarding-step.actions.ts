import { createAction, props } from '@ngrx/store';

export const onBoardingNextStep = createAction('[OnBoarding Step] Manage Next Step', props<{ payload: any }>());
export const onBoardingBackStep = createAction('[OnBoarding Step] Manage Back Step', props<{ payload: any }>());
