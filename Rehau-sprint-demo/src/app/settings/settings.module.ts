import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { UnitsComponent } from './units/units.component';
import { AmountSettingsComponent } from './units/amount/amount-settings.component';
import { FlowSettingsComponent } from './units/flow/flow-settings.component';
import { PressureSettingsComponent } from './units/pressure/pressure-settings.component';
import { LeakageComponent } from './leakage/leakage.component';
import { ActionSettingsComponent } from './leakage/action/action-settings.component';
import { FrequencySettingsComponent } from './leakage/frequency/frequency-settings.component';
import { TimeSettingsComponent } from './leakage/time/time-settings.component';
import { LimitsComponent } from './limits/limits.component';
import { PresentSettingsComponent } from './limits/present/present-settings.component';
import { AbsentSettingsComponent } from './limits/absent/absent-settings.component';
import { InformationComponent } from './information/information.component';
import { TermsAndConditionsSettingsComponent } from './information/terms-and-conditions/terms-and-conditions.component';
import { ImprintSettingsComponent } from './information/imprint/imprint.component';
import { DataprivacySettingsComponent } from './information/dataprivacy/dataprivacy.component';
import { GetHelpComponent } from './get-help/get-help.component';

import { TemperatureSettingsComponent } from './units/temperature/temperature-settings.component';
import { RehauFunctionalCoreModule } from 'rehau-functional-core/dist/rehau-functional-core';
import { cidaasConfig, globalConfig } from '../appConfig';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import {
  CacheService, LogService, LoginService, AuthService,
  reducers, TranslationService, AuthGuard, StoreService
} from 'rehau-functional-core/dist/rehau-functional-core';
import { ZWaveAPI } from '../services/zWaveAPI.service';


@NgModule({
  declarations: [
    SettingsComponent, UnitsComponent, AmountSettingsComponent,
    FlowSettingsComponent, PressureSettingsComponent, TemperatureSettingsComponent,
    LeakageComponent, ActionSettingsComponent, FrequencySettingsComponent, TimeSettingsComponent,
    LimitsComponent, PresentSettingsComponent, AbsentSettingsComponent,
    InformationComponent, TermsAndConditionsSettingsComponent, ImprintSettingsComponent, DataprivacySettingsComponent,
    GetHelpComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    SettingsRoutingModule,
    RehauFunctionalCoreModule.forRoot({
      cidaasConfig,
      globalConfig
    }),
  ],
  exports: [
    SettingsComponent,
  ],
  providers: [CacheService, LogService, LoginService, AuthService, AuthGuard, TranslationService, ZWaveAPI ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
