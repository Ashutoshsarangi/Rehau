import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';


@Component({
  tag: 'badges-page',
  styleUrl: 'badges.page.scss',
  shadow: true
})
export class Badges {
  @Prop() public history: RouterHistory;

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

  public render(): any {
    return (
      <main class='main-container'>
        <rh-breadcrumbs
          breadcrumbs={this.breadcrumbsArray}
          onGoBack={(event: any) => this.navigateTo(event)}
          onGoBackTo={(event: any) => this.navigateTo(event)}
        />

        <rh-divider logoText={true} padding={true} text='badge for Warning' />
        <rh-badges
          badgetitle="warning"
          badgeBgColor="primary"
          badgeStatus="warning"
        />

        <rh-divider logoText={true} padding={true} text='badge for Report'/>
        <rh-badges
          badgetitle="report"
          badgeStatus="report"
          badgeRound={true}
        />

        <rh-divider logoText={true} padding={true} text='badge for disruption'/>
        <rh-badges
          badgetitle="disruption"
          badgeStatus="disruption"
        />

        <rh-divider logoText={true} padding={true} text='badge for transparent'/>
        <rh-badges
          badgetitle="warning"
          badgeStatus="warning"
          badgeBgColor="transparent"
          badgeRound={true}
        />
      </main>
    );
  }
}
