import { TranslationService } from './translate-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export declare function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader;
export declare function TRANSLATE_FACTORY(configService: TranslationService): any;
export declare class TranslateServiceModule {
}
