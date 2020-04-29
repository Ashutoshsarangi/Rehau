import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RehauFunctionalCoreModule, OnBoardingService } from 'rehau-functional-core/dist/rehau-functional-core';
import { cidaasConfig, globalConfig } from '../appConfig';
import { CommonModule } from '@angular/common';
import { OnBoardingComponent } from './on-boarding.component';
import { TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';


@NgModule({
  declarations: [
    OnBoardingComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    RehauFunctionalCoreModule.forRoot({
      cidaasConfig,
      globalConfig
    }),
  ],
  providers: [ TranslationService, OnBoardingService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnBoardingModule { }
