import { Component } from '@angular/core';
import { LogService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsModel } from '../../../stores/model/settings.model';

@Component({
  selector: 'app-amount-settings-setup',
  templateUrl: './amount-settings.component.html',
  styleUrls: ['../units.component.scss']
})
export class AmountSettingsComponent {
  listItems = [
    {
      title: 'l',
      active: false,
      type: 'amount'
    },
    {
      title: 'm3',
      active: false,
      type: 'amount'
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

  /*
   * @description function will get the settings parameters from the NG store/ local storage
   */
  async getSettingsParams() {
    this.settingsParam$.subscribe((data) => {
      this.settingsParams = data.settingsParams;
    });

    if (this.settingsParams.units.hasOwnProperty('amount')) {
      const selectedValue = this.settingsParams.units.amount.selectedParam;
      // const index = this.listItems.indexOf(this.listItems.find(list => list.title ===  selectedValue));
      if (selectedValue >= 0) {
        this.listItems[selectedValue].active = true;
        this.logService.log('updatedlsit', this.listItems);
      }

    }

  }

}
