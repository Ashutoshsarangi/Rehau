import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';

import * as logger from '../../../utils/logger-utils';

@Component({
  tag: 'buttons-page',
  styleUrl: 'buttons.page.scss',
  shadow: true
})
export class ButtonsPage {
  @Prop() public history: RouterHistory;

  private breadcrumbsArray: Array<string>;

  private img: string = `${Environment.assetsBasePath}/img/icons/fruit.jpg`;

  private contractActions: any[] = [
    {
      title: 'Modify contract',
      icon: `${Environment.assetsBasePath}/img/icons/f01-adjust-contract-r.svg`
    },
    {
      title: 'Questions',
      icon: `${Environment.assetsBasePath}/img/icons/g01-ask-question-r.svg`
    },
    {
      title: 'Report a car damage',
      icon: `${Environment.assetsBasePath}/img/icons/f36-policy-documents-r.svg`
    }
  ];

  public timeArray: Array<any> = [
    {
      title: '1 Day',
      selected: false
    },
    {
      title: '1 Week',
      selected: true
    },
    {
      title: '1 Month',
      selected: false
    },
    {
      title: '1 Year',
      selected: false
    },
    {
      title: '1 Years',
      selected: false
    }
  ];

  public componentWillLoad(): void {
    this.breadcrumbsArray = this.history.location.pathname.split('/').slice(1);
  }

  private navigateTo(event: any): void {
    if (event.detail !== null) {
      if (event.detail > 0) {
        this.history.push(`${Environment.basePathWeb}/ui-showcase/${this.breadcrumbsArray[event.detail]}`);
      } else if (event.detail === 0) {
        this.history.push(`${Environment.basePathWeb}/${this.breadcrumbsArray[0]}`);
      }
    } else {
      this.history.push(`${Environment.basePathWeb}/ui-showcase`);
    }
  }

  private checkEvent(ev: any): void {
    logger.consoleLog(ev);
  }

  public render(): any {
    return (
      <main class='main-container'>
        <rh-breadcrumbs
          breadcrumbs={this.breadcrumbsArray}
          onGoBack={(event: any) => this.navigateTo(event)}
          onGoBackTo={(event: any) => this.navigateTo(event)}
        />


        <rh-divider logoText={true} padding={true} text='04.01.02 Primary Transparent buttons' />        
        <rh-primary-button
          id='rh-primary-button_1'
          text='mehr'
          icon="icon-next"
          transparentbutton={true}
          disabled={false}
          onButtonClicked={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='04.01.02 Primary cta buttons' />
        <rh-primary-button
          id='rh-primary-button_1'
          text='mehr'
          icon="icon-next"
          ctabutton={true}
          disabled={false}
          onButtonClicked={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='04.01.02 Secondary buttons' />
        <rh-primary-button
          id='rh-primary-button_9'
          text='mehr'
          secondary={true}
          icon="icon-settings"
          disabled={false}
          onButtonClicked={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='02.01 standard buttons' />
        <rh-primary-button
          id='rh-primary-button_10'
          text='mehr'
          standard={true}
          icon="icon-home"
          disabled={false}
          onButtonClicked={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='02.01 Icon buttons' />
        <rh-primary-button
          id='rh-primary-button_11'
          icon="icon-plus"
          iconbutton={true}
          disabled={false}
          onButtonClicked={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='02.01 Icon Secondary buttons' />
        <rh-primary-button
          id='rh-primary-button_12'
          icon="icon-plus"
          iconsecondary={true}
          disabled={false}
          onButtonClicked={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='04.01.02 Inactive buttons' />
        <rh-primary-button
          id='rh-primary-button_9'
          text='mehr'
          ctabutton={true}
          icon="icon-settings"
          disabled={true}
          onButtonClicked={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='04.01.02 Toggle Switch buttons' />
        <rh-toggle-switch
          id='rh-toggle-switch_1'
          leftText='on'
          rightText='off'
          disabled={false}
          onSwitchClick={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='04.01.02 Toggle Switch buttons' />
        <rh-toggle-switch
          id='rh-toggle-switch_1'
          leftText='ANWESEND'
          rightText='Abwesend'
          disabled={false}
          onSwitchClick={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='04.01.02 Toggle Switch buttons with border' />
        <rh-toggle-switch
          id='rh-toggle-switch_1'
          leftText='on'
          rightText='off'
          disabled={false}
          border={true}
          checked={true}
          onSwitchClick={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='04.01.02 Toggle Switch Inactive' />
        <rh-toggle-switch
          id='rh-toggle-switch_2'
          leftText='on'
          rightText='off'
          disabled={true}
          onSwitchClick={(event: any) => this.checkEvent(event)}
        />
      </main>
    );
  }
}
