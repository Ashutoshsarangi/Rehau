import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';


@Component({
  tag: 'progress-bar-page',
  styleUrl: 'progress-bar.page.scss',
  shadow: true
})
export class ProgressBar {
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

        <rh-divider logoText={true} padding={true} text='06.03.08 Progress Bar' />
        <rh-progress-bar 
          progress-color="var(--secondaryColor, $secondaryColor)" 
          progress-amount="85"
          progress-content-hidden={true}
          progress-width='120px'
          progress-height='120px'
        />
      </main>
    );
  }
}
