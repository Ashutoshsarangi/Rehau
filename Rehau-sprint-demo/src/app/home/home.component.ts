import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { HomeSettingsModel } from '../stores/model/home-settings.model';
import { homeSettingsAction } from '../stores/home-settings/action/home-settings.action';
import { selectLeakageDetectState } from '../stores/home-settings/selector/home-settings.select';
import { DeviceHelperService } from '../services/device-helper.service';
import {
  sensorsDataSub, CacheService
} from 'rehau-functional-core/dist/rehau-functional-core';


export const HeaderFlag = new Subject();

export let CommonInformation = {
  IS_FIRST_APP_START: true
};
interface Sensor {
  title: string;
  subTitle: string;
  value: string;
  timestamp?: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  flag: any;
  leakageState$;
  sensors: any = [
    {
      title: 'Amount',
      subTitle: 'l',
      value: '-.-',
      timestamp: 0
    },
    {
      title: 'Temperature',
      subTitle: 'C',
      value: '-.-',
      timestamp: 0
    },
    {
      title: 'Flow',
      subTitle: 'L/H',
      value: '-.-',
      timestamp: 0
    },
    {
      title: 'Pressure',
      subTitle: 'Bar',
      value: '-.-',
      timestamp: 0
    },
    {
      title: 'Dummy Device 18',
      subTitle: 'Bar',
      value: '-.-',
      timestamp: 0
    }
  ];
  constructor(
    private store: Store<{ homeSettingsParam: HomeSettingsModel }>,
    private cacheService: CacheService,
    private deviceHelperService: DeviceHelperService

  ) {
    this.leakageState$ = this.store.select(selectLeakageDetectState);
    this.getLeakageState();

    // Suscribe for the SesorData flag to get the current data
    sensorsDataSub.subscribe((data: any) => {
      this.sensors = data.data;
    });
  }

  ngOnInit() {
    if (this.cacheService.getLocalData('sensors')) {
      this.sensors = (this.cacheService.getLocalData('sensors'));
    }

    // call to device helper service which will initialize the connection with device
    this.deviceHelperService.initializeHome(this.sensors);
  }

  /**
   * @description method has suscriber for leakage detection flag
   */
  async getLeakageState() {
    await this.leakageState$.subscribe((data) => {
      this.flag = data;
      HeaderFlag.next(data);
    });

  }

  /**
   * @description method will call when user change the leakage action Present/Absent
   * @param event event object
   */
  leakageAction(event) {
    if (event.detail.switchClick === 'right') {
      this.flag = true;
      this.store.dispatch(homeSettingsAction({ payload: { isLeakageDetected: true } }));
      HeaderFlag.next(true);
    } else {
      this.flag = false;
      this.store.dispatch(homeSettingsAction({ payload: { isLeakageDetected: false } }));
      HeaderFlag.next(false);
    }

  }

}
