import { Component, ViewChild } from '@angular/core';
import { LogService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';

@Component({
  selector: 'app-absent-settings-setup',
  templateUrl: './absent-settings.component.html',
  styleUrls: ['../limits.component.scss'],
})
export class AbsentSettingsComponent {
  listItems = [
    {
      title: 'Maximum Taking time',
      subtitle: 'min',
      type: 'absent',
    },
    {
      title: 'Maximum Flow',
      subtitle: 'liter',
      type: 'absent',
    },
    {
      title: 'Maximum Taking time',
      subtitle: 'l/h',
      type: 'absent',
    },
  ];
  constructor(
    private logService: LogService,
    private translationService: TranslationService
  ) {
    this.translationService.get('init').subscribe((text: string) => {
      this.translationService.instantObject(this.listItems).subscribe((data) => {
        console.log('Now I am also from Observable', data);
        // temp = data;
        this.listItems = data;
      });
    });
  }

}
