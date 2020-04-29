import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogService, slideInAnimation, TranslationService, StoreService } from 'rehau-functional-core/dist/rehau-functional-core';

@Component({
  selector: 'app-settings-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
  animations: [slideInAnimation]
})
export class UnitsComponent {
  listItems = [
    {
      url: 'settings/units/flow',
      title: 'Flow'
    },
    {
      url: 'settings/units/amount',
      title: 'Amount'
    },
    {
      url: 'settings/units/pressure',
      title: 'Pressure'
    },
    {
      url: 'settings/units/temperature',
      title: 'Temperature'
    }
  ];
  constructor(
    private translationService: TranslationService,
    private logService: LogService
  ) {
    this.logService.log('call loader');
    this.setLoaderState();
    this.translationService.get('init').subscribe((text: string) => {
      this.translationService.instantObject(this.listItems).subscribe((data) => {
        console.log('Now I am also from Observable', data);
        // temp = data;
        this.listItems = data;
      });
    });
  }


  async setLoaderState() {
    // this.ngStoreService.dispatchLoaderState(true);
    // await delay(5000);
    // this.ngStoreService.dispatchLoaderState(false);
  }
}
