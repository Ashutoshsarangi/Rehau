import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { cidaasConfig, globalConfig } from './appConfig';
import { StoreModule } from '@ngrx/store';
import { RehauFunctionalCoreModule } from 'rehau-functional-core/dist/rehau-functional-core';
import {
  CacheService, LogService, LoginService, AuthService,
  StoreService, TranslationService, AuthGuard, reducers,
  GatewayAclService, GatewayDeviceControlService, GatewayService, ZAutomationService
} from 'rehau-functional-core/dist/rehau-functional-core';
import { LoginComponent } from './login/login.component';
import { SettingsModule } from './settings/settings.module';
import { OnBoardingModule } from './on-boarding/on-boarding.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LandingModule } from './landing/landing.module';
import { CacheRouteReuseStrategy } from './shared/cache_routeReuse';
import { RouteReuseStrategy } from '@angular/router';
// import { appReducers } from './stores/reducer-composition';
import * as fromSettings from './stores/settings/reducer/settings.reducer';
// import * as fromLoader from './stores/loader/reducer/loader.reducer';
import * as fromLeakageSettings from './stores/settings/reducer/leakage-settings.reducer';
import * as fromHomeSettings from './stores/home-settings/reducer/home-settings.reducer';
import { HeaderService } from './services/header.service';
import { DeviceHelperService } from './services/device-helper.service';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MetaReducer, META_REDUCERS } from '@ngrx/store';
import { storageMetaReducer } from './stores/storagemetareducer';

/**
 * @description Temporary Service Files, Need to Move to Functional_core
 * Once All are verified.
 */
// import { GatewayAclService } from './services/gatewayAcl.service';
// import { GatewayDeviceControlService } from './services/gatewayDeviceControl.service';
// import { GatewayService } from './services/gateway.service';
// import { OnlineOfflineService } from './services/onlineOffline.service';
// import { ZAutomationService } from './services/zAutomation.service';
// import { SensorSettingService } from './services/settings.service';

// factory meta-reducer configuration function
export function getMetaReducers(storageService: CacheService): MetaReducer<any> {
  return storageMetaReducer(storageService);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    BrowserAnimationsModule,
    SharedModule,
    SettingsModule,
    OnBoardingModule,
    LandingModule,
    AppRoutingModule,
    RehauFunctionalCoreModule.forRoot({
      cidaasConfig,
      globalConfig
    }),
    StoreModule.forRoot({
      settingsData: fromSettings.SettingsReducer,
      loaderState: reducers.loaderState,
      settingsParams: fromSettings.SettingsReducer,
      leakageSettingData: fromLeakageSettings.LeakageSettingsReducer,
      homeSettingsParam: fromHomeSettings.HomeSettingsReducer,
      // loaderState: fromLoader.LoaderReducer,
      cidaasData: reducers.cidaasData,

    }),
    DeviceDetectorModule.forRoot()
  ],
  providers: [GatewayService,
    // SensorSettingService,
    // OnlineOfflineService,
    ZAutomationService,
    GatewayDeviceControlService, GatewayAclService, CacheService, LogService, LoginService,
    AuthService, AuthGuard, StoreService, TranslationService, HeaderService, DeviceHelperService, {
      provide: RouteReuseStrategy,
      useClass: CacheRouteReuseStrategy
    },
    {
      provide: META_REDUCERS,
      deps: [CacheService],
      useFactory: getMetaReducers,
      multi: true
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
