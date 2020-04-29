import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UnitsComponent } from './units/units.component';
import { AmountSettingsComponent } from './units/amount/amount-settings.component';
import { FlowSettingsComponent } from './units/flow/flow-settings.component';
import { PressureSettingsComponent } from './units/pressure/pressure-settings.component';
import { TemperatureSettingsComponent } from './units/temperature/temperature-settings.component';
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


import { AuthGuard } from 'rehau-functional-core/dist/rehau-functional-core';

const routes: Routes = [
  {
    path: 'settings',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SettingsComponent,
      },
      {
        path: 'units',
        component: UnitsComponent,
        data: { animation: 'SecondLevel' }
      },
      {
        path: 'units/flow',
        component: FlowSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'units/amount',
        component: AmountSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'units/pressure',
        component: PressureSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'units/temperature',
        component: TemperatureSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'leakage',
        component: LeakageComponent,
        data: { animation: 'SecondLevel' }
      },
      {
        path: 'leakage/action',
        component: ActionSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'leakage/frequency',
        component: FrequencySettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'leakage/time',
        component: TimeSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'limits',
        component: LimitsComponent,
        data: { animation: 'SecondLevel' }
      },
      {
        path: 'limits/present',
        component: PresentSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'limits/absent',
        component: AbsentSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'information',
        component: InformationComponent,
        data: { animation: 'SecondLevel' }
      },
      {
        path: 'information/dataprivacy',
        component: DataprivacySettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'information/terms-and-conditions',
        component: TermsAndConditionsSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'information/imprint',
        component: ImprintSettingsComponent,
        data: { animation: 'ThirdLevel' }
      },
      {
        path: 'get-help',
        component: GetHelpComponent,
        data: { animation: 'SecondLevel' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
