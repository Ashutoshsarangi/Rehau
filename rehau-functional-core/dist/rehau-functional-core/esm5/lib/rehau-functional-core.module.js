/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, APP_INITIALIZER, forwardRef } from '@angular/core';
import { CONFIG_FACTORY } from './services/config-service/config-service.module';
import { ConfigService } from './services/config-service/config-service';
import { TRANSLATE_FACTORY, TranslateServiceModule } from './services/translate-service/translate-service.module';
import { TranslationService } from './services/translate-service/translate-service';
var RehauFunctionalCoreModule = /** @class */ (function () {
    function RehauFunctionalCoreModule() {
    }
    /**
     * @param {?} SERVICE_CONFIG
     * @return {?}
     */
    RehauFunctionalCoreModule.forRoot = /**
     * @param {?} SERVICE_CONFIG
     * @return {?}
     */
    function (SERVICE_CONFIG) {
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
                        function () { return ConfigService; }))],
                    multi: true
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: TRANSLATE_FACTORY,
                    deps: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return TranslationService; }))],
                    multi: true
                },
                ConfigService,
            ]
        };
    };
    RehauFunctionalCoreModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [],
                    exports: [
                        TranslateServiceModule
                    ]
                },] }
    ];
    return RehauFunctionalCoreModule;
}());
export { RehauFunctionalCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVoYXUtZnVuY3Rpb25hbC1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9yZWhhdS1mdW5jdGlvbmFsLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixlQUFlLEVBQUUsVUFBVSxFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUUvRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ2xILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBRXBGO0lBQUE7SUE4QkEsQ0FBQzs7Ozs7SUF0QmUsaUNBQU87Ozs7SUFBckIsVUFBc0IsY0FBeUI7UUFDN0MsT0FBTztZQUNMLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7Z0JBQ3ZEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLENBQUMsVUFBVTs7O3dCQUFDLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxFQUFDLENBQUM7b0JBQ3ZDLEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsaUJBQWlCO29CQUM3QixJQUFJLEVBQUUsQ0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixFQUFDLENBQUM7b0JBQzVDLEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNELGFBQWE7YUFDZDtTQUNGLENBQUM7SUFDSixDQUFDOztnQkE1QkYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUUsRUFBRTtvQkFDWCxPQUFPLEVBQUU7d0JBQ1Asc0JBQXNCO3FCQUN2QjtpQkFDRjs7SUF3QkQsZ0NBQUM7Q0FBQSxBQTlCRCxJQThCQztTQXZCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgQVBQX0lOSVRJQUxJWkVSLCBmb3J3YXJkUmVmLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDT05GSUdfRkFDVE9SWSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlnLXNlcnZpY2UvY29uZmlnLXNlcnZpY2UubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbmZpZy1zZXJ2aWNlL2NvbmZpZy1zZXJ2aWNlJztcbmltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gJy4vbW9kZWxzL2FwcC1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgVFJBTlNMQVRFX0ZBQ1RPUlksIFRyYW5zbGF0ZVNlcnZpY2VNb2R1bGUgfSBmcm9tICcuL3NlcnZpY2VzL3RyYW5zbGF0ZS1zZXJ2aWNlL3RyYW5zbGF0ZS1zZXJ2aWNlLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RyYW5zbGF0ZS1zZXJ2aWNlL3RyYW5zbGF0ZS1zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtcbiAgICBUcmFuc2xhdGVTZXJ2aWNlTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVoYXVGdW5jdGlvbmFsQ29yZU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChTRVJWSUNFX0NPTkZJRzogQXBwQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxSb3V0ZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFJlaGF1RnVuY3Rpb25hbENvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiAnU0VSVklDRV9DT05GSUcnLCB1c2VWYWx1ZTogU0VSVklDRV9DT05GSUcgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBDT05GSUdfRkFDVE9SWSxcbiAgICAgICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBDb25maWdTZXJ2aWNlKV0sXG4gICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBUUkFOU0xBVEVfRkFDVE9SWSxcbiAgICAgICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBUcmFuc2xhdGlvblNlcnZpY2UpXSxcbiAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBDb25maWdTZXJ2aWNlLFxuICAgICAgXVxuICAgIH07XG4gIH1cblxufVxuIl19