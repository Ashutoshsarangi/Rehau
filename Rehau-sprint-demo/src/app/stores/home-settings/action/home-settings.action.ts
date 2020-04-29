import { createAction, props } from '@ngrx/store';
import { HomeSettingsModel } from '../../model/home-settings.model';

export const homeSettingsAction = createAction('Home settings parameters', props<{ payload: HomeSettingsModel }>());

