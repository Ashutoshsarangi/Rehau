import { Component } from '@angular/core';
import { BasicAccordionModel } from '../interface/basic-accordion-model';
import { TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  accordionElements: Array<BasicAccordionModel> = [
    {
      id: '0',
      accordTitle: 'RE.GUARD' ,
      subtitle: 'errorCodeNotificationBody_28',
      label: 'YESTERDAY, 12:23',
      content: '28-description',
      badgetitle: 'Error',
      badgeActive: true,
      badgeStatus: true,
      badgeBgColor: 'primary',
    },
    {
      id: '1',
      accordTitle: 'RE.GUARD' ,
      subtitle: 'errorCodeNotificationBody_28',
      label: 'YESTERDAY, 12:23',
      content: '28-description',
      badgetitle: 'warning',
      badgeActive: true,
      badgeStatus: true,
      badgeBgColor: 'secondary',
    },
    {
      id: '2',
      accordTitle: 'RE.GUARD',
      subtitle: 'errorCodeNotificationBody_28',
      label: '11: 00',
      content: '28-description',
      badgetitle: 'Notification',
      badgeActive: true,
      badgeStatus: true,
      badgeBgColor: 'tertiary',
    }
  ];



  constructor(
    private translationService: TranslationService,
  ) {
    // let temp = [];
    this.translationService.get('init').subscribe((text: string) => {
      this.translationService.instantObject(this.accordionElements).subscribe((data) => {
        console.log('Now I am also from Observable', data);
        // temp = data;
        this.accordionElements = data;
      });
    });
  }


}
