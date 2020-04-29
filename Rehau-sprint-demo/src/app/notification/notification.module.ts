import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RehauFunctionalCoreModule } from 'rehau-functional-core/dist/rehau-functional-core';
import { cidaasConfig, globalConfig } from '../appConfig';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';


@NgModule({
  declarations: [
    NotificationComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RehauFunctionalCoreModule.forRoot({
      cidaasConfig,
      globalConfig
    }),
  ],
  exports: [
    NotificationComponent,
  ],
  providers: [ TranslationService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationModule { }
