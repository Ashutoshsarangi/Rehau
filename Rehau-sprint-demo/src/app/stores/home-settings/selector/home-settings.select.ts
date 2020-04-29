import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HomeSettingsModel } from '../../model/home-settings.model';
import { HOMESETTINGSPARAM } from '../../../config/store.config';

export const selectHomeSettingParam = createFeatureSelector<HomeSettingsModel>(HOMESETTINGSPARAM);

export const selectLeakageDetectState = createSelector(
  selectHomeSettingParam,
  (state) => state.isLeakageDetected
);

