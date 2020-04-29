import { createAction, props } from '@ngrx/store';

export const loaderAction = createAction('Show-Hide laoder', props<{ payload: boolean }>());



