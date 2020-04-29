import { Component } from '@angular/core';
import { TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';

@Component({
  selector: 'app-settings-information',
  templateUrl: './information.component.html',
  styleUrls: ['../settings.component.scss'],
})
export class InformationComponent {
  constructor(
    private translateService: TranslationService,
  ) {}

  // tslint:disable-next-line: member-ordering
  generalItems = [
    {
      url: 'settings/information/dataprivacy',
      title: 'Data protection'
    },
    {
      url: 'settings/information/terms-and-conditions',
      title: 'Terms and conditions'
    },
    {
      url: 'settings/information/imprint',
      title: 'Imprint'
    }
  ];

  deviceInfoItems = [
    {
      url: 'settings/information/gateway',
      title: 'RE.HUB'
    }
  ];

}
