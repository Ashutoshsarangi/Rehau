import { Component } from '@angular/core';
import { LogService, TranslationService, slideInAnimation } from 'rehau-functional-core/dist/rehau-functional-core';

@Component({
  selector: 'app-settings-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.scss'],
  animations: [slideInAnimation]
})
export class LimitsComponent {
  listItems = [
    {
      url: 'settings/limits/present',
      title: 'Presence',
    },
    {
      url: 'settings/limits/absent',
      title: 'Absence'
    }
  ];

  isLeakageMeasurement: boolean;
  constructor(
    private logService: LogService,
    private translationService: TranslationService,
  ) {
    this.logService.log('leakage measurement ', this.isLeakageMeasurement);
    this.translationService.get('init').subscribe((text: string) => {
      this.translationService.instantObject(this.listItems).subscribe((data) => {
        console.log('Now I am also from Observable', data);
        // temp = data;
        this.listItems = data;
      });
    });
  }

  toggleAction() {
    this.logService.log('toggle change', this.isLeakageMeasurement);
    if (this.isLeakageMeasurement) {
      this.isLeakageMeasurement = false;
    } else {
      this.isLeakageMeasurement = true;
    }
    this.logService.log('toggle change --2', this.isLeakageMeasurement);

  }

}
