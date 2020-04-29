import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';


@Component({
  tag: 'headers-page',
  styleUrl: 'headers.page.scss',
  shadow: true
})
export class HeadersPage {
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
        <rh-breadcrumbs
          breadcrumbs={this.breadcrumbsArray}
          onGoBack={(event: any) => this.navigateTo(event)}
          onGoBackTo={(event: any) => this.navigateTo(event)}
        />

        <rh-divider logoText={true} padding={true} text='05.04.02 Header' />
        <rh-header
          headertitle="My Home"
          subtitle="Subtitle"
        />

        <rh-divider logoText={true} padding={true} text='05.04.02 Offline Header' />
        <rh-header
          headertitle="My Home"
          subtitle="Leakage detected! protection active"
          deviceOnline={this.flag}
          badgetitle="warning"
          badgeActive={true}
          badgeBgColor="primary"
        />

        <rh-divider logoText={true} padding={true} text='05.04.02 Header' />
        <rh-header
          headertitle="Title"
        />

        <rh-divider logoText={true} padding={true} text='05.04.02 Header for inner pages' />
        <rh-header
          headertitle="Title"
          innerpageheader={true}
          onBackButtonAction={(event: any) => this.checkEvent(event)}
        />

        <rh-divider logoText={true} padding={true} text='05.04.02 Header with menu' />
        <rh-header
          headertitle="Title"
          innerpageheader={true}
          righticon={true}
          onBackButtonAction={(event: any) => this.checkEvent(event)}
          onButtonAction={(event: any) => this.clickEvent(event)}
        />
      </main>
    );
  }
}
