import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  CacheService, LogService, LoginService, AuthService,
  reducers, StoreService, TranslationService, AuthGuard, OnBoardingService
} from 'rehau-functional-core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { StoreModule } from '@ngrx/store';
import { RehauFunctionalCoreModule } from 'rehau-functional-core';
import { cidaasConfig, globalConfig } from '../appConfig';
import { LandingModule } from './landingComponent/landing.module';
import { LandingComponent } from './landingComponent/landing.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LandingModule,
    BrowserAnimationsModule,
    RehauFunctionalCoreModule.forRoot({
      cidaasConfig,
      globalConfig,
    }),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent, data: { animation: 'right-left-ease-out' } },
      { path: 'dashboard', component: DashboardComponent, data: { animation: 'inner-page' }, },
      { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
    ]),
    StoreModule.forRoot(reducers),
  ],
  providers: [CacheService, LogService, LoginService, AuthService, StoreService, TranslationService, OnBoardingService,
    AuthGuard ],
  bootstrap: [AppComponent]
})


export class AppModule { }
