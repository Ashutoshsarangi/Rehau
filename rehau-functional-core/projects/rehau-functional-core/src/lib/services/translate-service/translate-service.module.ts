import { TranslationService } from './translate-service';

// Localisation
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);

// }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function TRANSLATE_FACTORY(configService: TranslationService): any {
  return () => configService.initTranslation();
}
@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    TranslateModule,
  ]
})
export class TranslateServiceModule {
}
