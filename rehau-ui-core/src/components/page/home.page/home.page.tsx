import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';


@Component({
  tag: 'home-page',
  styleUrl: 'home.page.scss',
  shadow: true
})
export class HomePage {
  @Prop() public history: RouterHistory;

  flag = false;

  private breadcrumbsArray: Array<string>;

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
    logger.consoleLog('Back Button', ev);
  }

  private clickEvent(ev: any): void {
    logger.consoleLog('Right Side Button', ev);
  }

  public render(): any {
    return (
      <main class='main-container'>
        <rh-divider logoText={true} padding={true} text='06.03.08 Home Component using cards'/>
        <rh-card
          cardtitle= "Amount"
          cardsubtitle= "METER³"
        />
      </main>
    );
  }
}
