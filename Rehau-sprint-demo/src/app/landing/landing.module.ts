import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RehauFunctionalCoreModule } from 'rehau-functional-core/dist/rehau-functional-core';
import { cidaasConfig, globalConfig } from '../appConfig';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { SettingsModule } from '../settings/settings.module';
import { NotificationModule } from '../notification/notification.module';
import { LogService } from 'rehau-functional-core/dist/rehau-functional-core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    NotificationModule,
    SettingsModule,
    RouterModule,
    RehauFunctionalCoreModule.forRoot({
      cidaasConfig,
      globalConfig
    }),
  ],
  providers: [LogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingModule {
}
