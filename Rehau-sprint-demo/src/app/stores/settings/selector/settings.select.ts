import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SettingsModel } from '../../model/settings.model';
import { SETTINGSPARAM } from '../../../config/store.config';

export const selectSettingParam = createFeatureSelector<SettingsModel>(SETTINGSPARAM);

export const selectUnitSettings = createSelector(
  selectSettingParam,
  (state) => state.settingsParams.units
);
