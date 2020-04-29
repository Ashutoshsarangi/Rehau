import { Component, ViewChild } from '@angular/core';
import { LogService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsModel } from '../../../stores/model/settings.model';

@Component({
  selector: 'app-flow-settings-setup',
  templateUrl: './flow-settings.component.html',
  styleUrls: ['../units.component.scss'],
})
export class FlowSettingsComponent {
  listItems = [
    {
      title: 'L/M',
      type: 'flow',
      active: false
    },
    {
      title: 'L/H',
      type: 'flow',
      active: false
    },
    {
      title: 'm3/H',
      type: 'flow',
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
      // temp = data;
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

    if (this.settingsParams.units.hasOwnProperty('flow')) {
      const selectedValue = this.settingsParams.units.flow.selectedParam;
      console.log('selectedValue', selectedValue);
      // const index = this.listItems.indexOf(this.listItems.find(list => list.title ===  selectedValue));
      if (selectedValue >= 0) {
        this.listItems[selectedValue].active = true;
        this.logService.log('updatedlsit', this.listItems);
      }
    }
  }
}
