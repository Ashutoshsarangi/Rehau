import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { LogService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.component.html',
  styleUrls: ['./get-help.component.scss']
})
export class GetHelpComponent {
   constructor( private logService: LogService ) {}

   openSupportUrl() {
    window.open('https://www.rehau.com/support-re-guard');
  }

  toggleAction(event) {
    this.logService.log('switch changed', event);
  }
}
