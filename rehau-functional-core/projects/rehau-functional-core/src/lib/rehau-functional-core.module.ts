import { NgModule, ModuleWithProviders, APP_INITIALIZER, forwardRef, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CONFIG_FACTORY } from './services/config-service/config-service.module';
import { ConfigService } from './services/config-service/config-service';
import { AppConfig } from './models/app-config.model';
import { TRANSLATE_FACTORY, TranslateServiceModule } from './services/translate-service/translate-service.module';
import { TranslationService } from './services/translate-service/translate-service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    TranslateServiceModule
  ]
})
export class RehauFunctionalCoreModule {
  public static forRoot(SERVICE_CONFIG: AppConfig): ModuleWithProviders<RouterModule> {
    return {
      ngModule: RehauFunctionalCoreModule,
      providers: [
        { provide: 'SERVICE_CONFIG', useValue: SERVICE_CONFIG },
        {
          provide: APP_INITIALIZER,
          useFactory: CONFIG_FACTORY,
          deps: [forwardRef(() => ConfigService)],
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: TRANSLATE_FACTORY,
          deps: [forwardRef(() => TranslationService)],
          multi: true
        },
        ConfigService,
      ]
    };
  }

}
