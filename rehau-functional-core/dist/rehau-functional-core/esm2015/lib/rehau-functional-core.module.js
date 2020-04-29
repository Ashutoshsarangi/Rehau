/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, APP_INITIALIZER, forwardRef } from '@angular/core';
import { CONFIG_FACTORY } from './services/config-service/config-service.module';
import { ConfigService } from './services/config-service/config-service';
import { TRANSLATE_FACTORY, TranslateServiceModule } from './services/translate-service/translate-service.module';
import { TranslationService } from './services/translate-service/translate-service';
export class RehauFunctionalCoreModule {
    /**
     * @param {?} SERVICE_CONFIG
     * @return {?}
     */
    static forRoot(SERVICE_CONFIG) {
        return {
            ngModule: RehauFunctionalCoreModule,
            providers: [
                { provide: 'SERVICE_CONFIG', useValue: SERVICE_CONFIG },
                {
                    provide: APP_INITIALIZER,
                    useFactory: CONFIG_FACTORY,
                    deps: [forwardRef((/**
                         * @return {?}
                         */
                        () => ConfigService))],
                    multi: true
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: TRANSLATE_FACTORY,
                    deps: [forwardRef((/**
                         * @return {?}
                         */
                        () => TranslationService))],
                    multi: true
                },
                ConfigService,
            ]
        };
    }
}
RehauFunctionalCoreModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [],
                exports: [
                    TranslateServiceModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVoYXUtZnVuY3Rpb25hbC1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9yZWhhdS1mdW5jdGlvbmFsLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixlQUFlLEVBQUUsVUFBVSxFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUUvRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ2xILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBU3BGLE1BQU0sT0FBTyx5QkFBeUI7Ozs7O0lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBeUI7UUFDN0MsT0FBTztZQUNMLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7Z0JBQ3ZEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLENBQUMsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBQyxDQUFDO29CQUN2QyxLQUFLLEVBQUUsSUFBSTtpQkFDWjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsVUFBVSxFQUFFLGlCQUFpQjtvQkFDN0IsSUFBSSxFQUFFLENBQUMsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixFQUFDLENBQUM7b0JBQzVDLEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNELGFBQWE7YUFDZDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUE1QkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO2lCQUN2QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEFQUF9JTklUSUFMSVpFUiwgZm9yd2FyZFJlZiwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ09ORklHX0ZBQ1RPUlkgfSBmcm9tICcuL3NlcnZpY2VzL2NvbmZpZy1zZXJ2aWNlL2NvbmZpZy1zZXJ2aWNlLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb25maWctc2VydmljZS9jb25maWctc2VydmljZSc7XG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tICcuL21vZGVscy9hcHAtY29uZmlnLm1vZGVsJztcbmltcG9ydCB7IFRSQU5TTEFURV9GQUNUT1JZLCBUcmFuc2xhdGVTZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi9zZXJ2aWNlcy90cmFuc2xhdGUtc2VydmljZS90cmFuc2xhdGUtc2VydmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90cmFuc2xhdGUtc2VydmljZS90cmFuc2xhdGUtc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXG4gICAgVHJhbnNsYXRlU2VydmljZU1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJlaGF1RnVuY3Rpb25hbENvcmVNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoU0VSVklDRV9DT05GSUc6IEFwcENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Um91dGVyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSZWhhdUZ1bmN0aW9uYWxDb3JlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogJ1NFUlZJQ0VfQ09ORklHJywgdXNlVmFsdWU6IFNFUlZJQ0VfQ09ORklHIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogQ09ORklHX0ZBQ1RPUlksXG4gICAgICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gQ29uZmlnU2VydmljZSldLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogVFJBTlNMQVRFX0ZBQ1RPUlksXG4gICAgICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gVHJhbnNsYXRpb25TZXJ2aWNlKV0sXG4gICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgQ29uZmlnU2VydmljZSxcbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==