import { Component, Input, ViewChild } from '@angular/core';
import { TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';

@Component({
  selector: 'app-settings-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['../../settings.component.scss'],
})
export class ImprintSettingsComponent {
  langCode = 'en';
  constructor(
  ) {}
}
