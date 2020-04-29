import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';

import * as logger from '../../../utils/logger-utils';
import { BasicAccordionModel } from '../../interfaces/basic-accordion-model';

@Component({
  tag: 'accordian-page',
  styleUrl: 'accordian.page.scss',
  shadow: true
})
export class AccordianPage {
  @Prop() public history: RouterHistory;

  public accordionElements: Array<BasicAccordionModel> = [
    {
      id: '0',
      accordTitle: "Leckageschutz",
      subtitle: "Rohrbruch festgestellt",
      label: "12:23",
      content: "Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3",
      badgetitle: 'Error',
      badgeActive: true,
      badgeStatus: "warning",
      badgeBgColor: 'primary',
    },
    {
      id: '1',
      accordTitle: "Wassermelder",
      subtitle: "Rohrbruch festgestellt",
      label: "12:23",
      content: "Hey 2",
      badgetitle: 'warning',
      badgeActive: true,
      badgeStatus: "warning",
      badgeBgColor: 'secondary',
    },
    {
      id: '2',
      accordTitle: "Gateway",
      subtitle: "Verbindungsfehler Wassermelder",
      label: "VOR 2 WOCHEN",
      content: "Hey 3",
      badgetitle: 'Notification',
      badgeActive: true,
      badgeStatus: "report",
      badgeBgColor: 'tertiary',
    }
  ];

  public render(): any {
    return (
      <main class='main-container'>
        <rh-divider logoText={true} padding={true} text='Accordian ' />
        <rh-accordian
          accordions={this.accordionElements}
        ></rh-accordian>
      </main>
    );
  }
}
