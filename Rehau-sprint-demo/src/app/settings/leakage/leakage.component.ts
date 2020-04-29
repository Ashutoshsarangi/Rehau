import { Component, OnInit } from '@angular/core';
import { LogService, CacheService, slideInAnimation } from 'rehau-functional-core/dist/rehau-functional-core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LeakageSettingsModel } from '../../stores/model/settings.model';
import { leakageSettingsActions } from '../../stores/settings/action/settings.action';

@Component({
  selector: 'app-settings-leakage',
  templateUrl: './leakage.component.html',
  styleUrls: ['./leakage.component.scss'],
  animations: [slideInAnimation]
})
export class LeakageComponent {
  listItems = [
    {
      url: 'settings/leakage/time',
      title: 'Time',
      subTitle: 'PM',
    },
    {
      url: 'settings/leakage/frequency',
      title: 'Frequency',
      subTitle: 'Daily',
    },
    {
      url: 'settings/leakage/action',
      title: 'Action',
      subTitle: 'Shut-off & warning',
    }
  ];
  settingsParam$: Observable<LeakageSettingsModel>;
  settingsParams: any;
  isLeakageMeasurement: boolean;
  constructor(
    private logService: LogService,
    private cacheService: CacheService,
    private store: Store<{ leakageSettingData: LeakageSettingsModel }>
  ) {
    this.settingsParam$ = store.pipe(select('leakageSettingData'));
    this.getSettingsParams();
  }


  async getSettingsParams() {
    this.settingsParam$.subscribe((data) => {
      this.settingsParams = data.dropLeakage;
    });

    if (Object.keys(this.settingsParams).length > 0) {
      this.logService.log('get store data', this.settingsParams.status);
      if (this.settingsParams.status === 'true') {
        this.isLeakageMeasurement = true;
      } else {
        this.isLeakageMeasurement = false;
      }
    }
  }

  toggleAction(event) {
    this.logService.log('toggle change', event);
    if (event.detail.switchClick === 'left') {
      this.isLeakageMeasurement = false;
      this.settingsParams.status = 'false';
    } else {
      this.isLeakageMeasurement = true;
      this.settingsParams.status = 'true';
    }
    this.store.dispatch(leakageSettingsActions({ payload: { dropLeakage: this.settingsParams } }));
  }

}
