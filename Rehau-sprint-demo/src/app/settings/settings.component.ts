import { Component, OnInit } from '@angular/core';
import {
  LogService, slideInAnimation, CacheService, StoreService,
  TranslationService, OnlineOfflineService
} from 'rehau-functional-core/dist/rehau-functional-core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { delay } from 'q';
import { settingsAction } from '../stores/settings/action/settings.action';
import { SettingsModel } from '../stores/model/settings.model';
import { DeviceHelperService } from '../services/device-helper.service';
import { ZWaveAPI } from '../services/zWaveAPI.service';
import { LeakageService } from '../services/leakage.service';

export interface IConfigParamWrapper {
  [commandClass: number]: IConfigParamCommandClass;

  timestamp: string;
}

export interface IConfigParamCommandClass {
  commandClass: number;

  [config: number]: IConfigParams;
}

export interface IConfigParams {
  configID: number;
  value: number;
  timestamp: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [slideInAnimation]
})
export class SettingsComponent implements OnInit {
  observerId = 129479234;
  private freezeButtonUntil = 0;
  private freezeTime = 7000;
  waterControlItems = [
    {
      url: 'settings/units',
      title: 'Units'
    },
    {
      url: 'settings/leakage',
      title: 'Drop leckage'
    },
    {
      url: 'settings/limits',
      title: 'Limits'
    },
    {
      url: 'settings/sensor',
      title: 'Water sensor'
    }
  ];
  generalItems = [
    {
      url: 'settings/information',
      title: 'Information'
    },
    {
      url: 'settings/unclaim',
      title: 'Uncliam RE.HUB'
    },
    {
      url: '/login',
      title: 'Logout'
    },
  ];
  supportItems = [
    {
      url: 'settings/get-help',
      title: 'get-help'
    }
  ];
  generalList: any[];
  supportList: any[];
  settingsParams: any;
  settingsParam$: Observable<SettingsModel>;
  settingStatus: boolean;
  isPresentMode = null;
  isPesentSwitchDisabled = false;
  constructor(
    private logService: LogService,
    private cacheService: CacheService,
    private storeService: StoreService,
    private router: Router,
    private store: Store<{ settingsData: SettingsModel }>,
    private translationService: TranslationService,
    private deviceHelperService: DeviceHelperService,
    private zwaveapiService: ZWaveAPI,
    private leakageService: LeakageService,
    private onlineOfflineService: OnlineOfflineService,
  ) {
    this.settingsParam$ = store.pipe(select('settingsData'));


  }

  ngOnInit() {
    this.zwaveapiService.subscribe(this);
    // this.logoutService.subscribe(this);
    // this.onlineOfflineService.initialize();  // no use
    this.leakageService.subscribe(this);
    this.setLoaderState();
    /**
     * @description All Internal Initialisations are done.
     */
    this.deviceHelperService.inilializeSetting();
    // this is for getting the And presentmode.
    this.isPresentMode = this.deviceHelperService.updatePresentMode();

    this.translationService.get('init').subscribe((text: string) => {
      this.translationService.instantObject(this.waterControlItems).subscribe((data) => {
        console.log('Now I am also from Observable', data);
        // temp = data;
        this.waterControlItems = data;
      });
      this.translationService.instantObject(this.generalItems).subscribe((data) => {
        console.log('Now I am also from Observable', data);
        // temp = data;
        this.generalItems = data;
      });
      this.translationService.instantObject(this.supportItems).subscribe((data) => {
        console.log('Now I am also from Observable', data);
        // temp = data;
        this.supportItems = data;
        this.getSettingsParams();
      });
    });

  }

  async update() {
    console.log('Update Called in settings!');
    if (
      this.zwaveapiService.configurationObject == null ||
      this.zwaveapiService.configurationObject === undefined
    ) {
      console.log('Config Object is Null or undefined');
    } else {
      this.updateAllSettings(this.zwaveapiService.configurationObject);
    }
  }

  updateAllSettings(configObject: IConfigParamWrapper) {
    console.log('Update all Config Settings');
    // tslint:disable-next-line:forin
    for (const paramKey in configObject['112']) {
      const configParam = configObject['112'][paramKey];
      if (configParam.configID === 1) {
        if (this.freezeButtonUntil <= new Date().getTime()) {
          if (configParam.value === 1) {
            this.isPresentMode = false;
          } else if (configParam.value === 2) {
            this.isPresentMode = true;
          }
        }
      }
    }
  }

  onChange(state: boolean) {
    console.log('settings component::onChange isLeakage ' + state);
    this.checkIfLeakage();
  }

  async checkIfLeakage() {
    console.log('is leakage detect call');
    if (this.leakageService.isLeakage) {
      this.isPesentSwitchDisabled = true;
    } else {
      this.isPesentSwitchDisabled = false;
    }
  }

  /**
   * @description function will get the settings parameters from the NG store/ local storage
   */
  async getSettingsParams() {
    this.settingsParam$.subscribe((data) => {
      this.settingsParams = data.settingsParams;
    });

    if (Object.keys(this.settingsParams).length > 0) {
      if (this.settingsParams.settingStatus === 'true') {
        this.settingStatus = true;
      } else {
        this.settingStatus = false;
      }
    }
  }


  /**
   * @description function will call if user change the setting action present to absent
   * @param event this will contain the switch event object which will highlight the selected tab
   */
  toggleAction(event) {
    this.logService.log('toggle action changed', event);
    this.logService.log('toggle change', event);
    if (event.detail.switchClick === 'left') {
      this.settingStatus = false;
      this.settingsParams.settingStatus = 'false';
    } else {
      this.settingStatus = true;
      this.settingsParams.settingStatus = 'true';
    }
    this.store.dispatch(settingsAction({ payload: { settingsParams: this.settingsParams } }));
  }

  /**
   * @description Temporary function to show and hide the loader
   */
  async setLoaderState() {
    this.storeService.dispatchLoaderState(true);
    await delay(1000);
    this.storeService.dispatchLoaderState(false);
  }
}
