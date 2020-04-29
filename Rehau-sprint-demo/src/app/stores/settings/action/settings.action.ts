import { createAction, props } from '@ngrx/store';
import { SettingsModel, LeakageSettingsModel } from '../../model/settings.model';

export const settingsAction = createAction('Settings parameters', props<{ payload: SettingsModel }>());

export const leakageSettingsActions = createAction('Leakage settings parameters', props<{ payload: LeakageSettingsModel }>());
