import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppOptionListComponent } from './option-list/option-list.component';
import { RehauFunctionalCoreModule } from 'rehau-functional-core/dist/rehau-functional-core';
import { cidaasConfig, globalConfig } from '../appConfig';
import {
  LogService, TranslationService, CacheService
} from 'rehau-functional-core/dist/rehau-functional-core';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    RehauFunctionalCoreModule.forRoot({
      cidaasConfig,
      globalConfig
    }),
  ],
  exports: [
    AppOptionListComponent,
  ],
  declarations: [
    AppOptionListComponent,
  ],
  providers: [LogService, TranslationService, CacheService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
