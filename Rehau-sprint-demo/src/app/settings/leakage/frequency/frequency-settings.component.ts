import { Component, ViewChild } from '@angular/core';
import { LogService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LeakageSettingsModel } from '../../../stores/model/settings.model';

@Component({
  selector: 'app-frequency-settings-setup',
  templateUrl: './frequency-settings.component.html',
  styleUrls: ['../leakage.component.scss'],
})
export class FrequencySettingsComponent {
  listItems = [
    {
      title: 'monday',
      // checked: this.binaryCheck(64),
      binaryValue: 64,
      type: 'frequency',
      category: 'dropLeakage',
      active: false
    },

    {
      title: 'thuesday',
      // checked: this.binaryCheck(32),
      binaryValue: 32,
      type: 'frequency',
      category: 'dropLeakage',
      active: false
    },
    {
      title: 'wednesday',
      // checked: this.binaryCheck(16),
      binaryValue: 16,
      category: 'dropLeakage',
      active: false,
      type: 'frequency'

    },
    {
      title: 'thursday',
      // checked: this.binaryCheck(8),
      binaryValue: 8,
      type: 'frequency',
      category: 'dropLeakage',
      active: false
    },
    {
      title: 'friday',
      // checked: this.binaryCheck(4),
      binaryValue: 4,
      type: 'frequency',
      category: 'dropLeakage',
      active: false
    },
    {
      title: 'saturday',
      // checked: this.binaryCheck(2),
      binaryValue: 2,
      type: 'frequency',
      category: 'dropLeakage',
      active: false
    },
    {
      title: 'sunday',
      // checked: this.binaryCheck(1),
      binaryValue: 1,
      type: 'frequency',
      category: 'dropLeakage',
      active: false
    }
  ];
  settingsParam$: Observable<LeakageSettingsModel>;
  settingsParams: any;
  constructor(
    private logService: LogService,
    private store: Store<{ leakageSettingData: LeakageSettingsModel }>,
    private translationService: TranslationService
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

    const selectedValue = this.settingsParams.frequency.selectedParam;
    // const index = this.listItems.indexOf(this.listItems.find(list => list.title ===  selectedValue));
    if (selectedValue >= 0) {
      this.listItems[selectedValue].active = true;
      this.logService.log('updatedlsit', this.listItems);
    }
  }
}
