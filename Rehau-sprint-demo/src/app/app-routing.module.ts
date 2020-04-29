import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthGuard } from 'rehau-functional-core/dist/rehau-functional-core/';
import { SettingsComponent } from './settings/settings.component';
import { UnitsComponent } from './settings/units/units.component';
import { FlowSettingsComponent } from './settings/units/flow/flow-settings.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { animation: 'LandingStep1' } },
  { path: 'on-boarding', component: OnBoardingComponent, canActivate: [AuthGuard], data: { animation: 'LandingStep1' } },
  {
    path: 'landing', canActivate: [AuthGuard], component: LandingComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { routeIdx: 0 } },
      { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard], data: { routeIdx: 1 } },
      { path: 'settings', component: SettingsComponent, data: { routeIdx: 2 } }
    ],
    data: {
      reuseStrategy: {
        from: ['settings']
      },
      animation: 'TabLevel'
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), BrowserAnimationsModule],
  exports: [RouterModule],

})
export class AppRoutingModule { }
