import { Component, Input, ViewChild } from '@angular/core';
import { LogService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';

@Component({
  selector: 'app-present-settings-setup',
  templateUrl: './present-settings.component.html',
  styleUrls: ['../limits.component.scss']
})
export class PresentSettingsComponent {
  listItems = [
    {
      title: 'Maximum Taking time',
      subtitle: 'min',
      type: 'present'
    },
    {
      title: 'Maximum flow',
      subtitle: 'l',
      type: 'present'
    },
    {
      title: 'Maximum Taking time',
      subtitle: 'l/h',
      type: 'present'
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
