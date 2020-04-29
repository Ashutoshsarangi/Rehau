import { Component, Input, ViewChild } from '@angular/core';
import { LogService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LeakageSettingsModel } from '../../../stores/model/settings.model';

@Component({
  selector: 'app-action-settings-setup',
  templateUrl: './action-settings.component.html',
  styleUrls: ['../leakage.component.scss']
})
export class ActionSettingsComponent {
  listItems = [
    {
      title: 'shutOfWarning',
      type: 'action',
      category: 'dropLeakage',
      active: false
    },
    {
      title: 'warning',
      type: 'action',
      category: 'dropLeakage',
      active: false
    }
  ];
  settingsParam$: Observable<LeakageSettingsModel>;
  settingsParams: any;
  constructor(
    private logService: LogService,
    private translationService: TranslationService,
    private store: Store<{ leakageSettingData: LeakageSettingsModel }>
  ) {
    this.settingsParam$ = store.pipe(select('leakageSettingData'));
    this.translationService.instantObject(this.listItems).subscribe((data) => {
      console.log('Now I am also from Observable', data);
      // temp = data;
      this.listItems = data;
      this.getSettingsParams();
    });
  }


  async getSettingsParams() {
    this.settingsParam$.subscribe((data) => {
      this.settingsParams = data.dropLeakage;
    });
    this.logService.log('leakage data--->', this.settingsParams);
    const selectedValue = this.settingsParams.action.selectedParam;
    // const index = this.listItems.indexOf(this.listItems.find(list => list.title ===  selectedValue));
    if (selectedValue >= 0) {
      this.listItems[selectedValue].active = true;
      this.logService.log('updatedlsit', this.listItems);
    }

  }
}
