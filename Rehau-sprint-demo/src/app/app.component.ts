import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogService, slideInAnimation, LoaderFlag } from 'rehau-functional-core/dist/rehau-functional-core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderService } from './services/header.service';
import { HeaderFlag } from '../app/home/home.component';
// import { LoaderFlag } from './services/store.service';
import { selectUnitSettings } from './stores/settings/selector/settings.select';
import { SettingsModel } from './stores/model/settings.model';

declare var cordova: any;
declare var StatusBar: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  header: any = {};
  flag: boolean;
  showLoader$: Observable<boolean>;
  showLoader: boolean;
  unitsSettings$;
  constructor(
    private logService: LogService,
    private router: Router,
    private location: Location,
    private headerService: HeaderService,
    private changeDetectRef: ChangeDetectorRef,
    private store: Store<{ settingsParams: SettingsModel }>,
  ) {
    this.unitsSettings$ = this.store.select(selectUnitSettings);

    // suscriber to route event to manage the header based on the route component
    this.router.events.subscribe((data: any) => {
      if (data instanceof NavigationEnd) {
        if (data.url) {
          this.header = this.headerService.manageHeader(data.url);
        }
        this.changeDetectRef.detectChanges();
      }
    });

    // suscriber to headerFlag which will change if leakage detectd and change the header color
    HeaderFlag.subscribe((data: any) => {
      console.log('app component', data);
      this.flag = !data;
    });

    // this will suscribe the loader event if loader flag is changed anywhere in the app
    LoaderFlag.subscribe((data: any) => {
      this.showLoader = data;
    });

  }

  /**
   * @description To check for mobile application device ready
   */
  ngOnInit() {
    document.addEventListener('deviceready', () => {
      this.logService.log('deviceReady');
      if (cordova.platformId === 'android') {
        this.logService.log('Android Device');
      }
      StatusBar.backgroundColorByHexString('#2c8a74');

    }, false);

    this.unitsSettings$.subscribe(data => {
      console.log('select a single Slice of a selector from configuration page', data);
    });
  }

  /**
   * @description method to hanlde back action from header back arrow
   */
  backAction() {
    this.logService.log('in navigate action');
    this.location.back();
  }

}


