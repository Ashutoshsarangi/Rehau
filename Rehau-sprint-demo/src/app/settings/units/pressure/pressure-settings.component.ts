import { Component, Input, ViewChild } from '@angular/core';
import { LogService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsModel } from '../../../stores/model/settings.model';

@Component({
  selector: 'app-pressure-settings-setup',
  templateUrl: './pressure-settings.component.html',
  styleUrls: ['../units.component.scss']
})
export class PressureSettingsComponent {
  listItems = [
    {
      title: 'Bar',
      type: 'pressure',
      active: false
    },
    {
      title: 'Pa',
      type: 'pressure',
      active: false
    }
  ];
  settingsParams: any;
  settingsParam$: Observable<SettingsModel>;
  constructor(
    private logService: LogService,
    private translationService: TranslationService,
    private store: Store<{ settingsData: SettingsModel }>
  ) {
    this.settingsParam$ = store.pipe(select('settingsData'));
    this.translationService.instantObject(this.listItems).subscribe((data) => {
      console.log('Now I am also from Observable', data);
      this.listItems = data;
      this.getSettingsParams();
    });
  }

  /**
   * @description function will get the settings parameters from the NG store/ local storage
   */
  async getSettingsParams() {
    this.settingsParam$.subscribe((data) => {
      this.settingsParams = data.settingsParams;
    });

    if (this.settingsParams.units.hasOwnProperty('pressure')) {
      const selectedValue = this.settingsParams.units.pressure.selectedParam;
      // const index = this.listItems.indexOf(this.listItems.find(list => list.title ===  selectedValue));
      if (selectedValue >= 0) {
        this.listItems[selectedValue].active = true;
        this.logService.log('updatedlsit', this.listItems);
      }

    }

  }
}
