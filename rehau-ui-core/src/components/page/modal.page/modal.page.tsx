import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';


@Component({
  tag: 'modal-page',
  styleUrl: 'modal.page.scss',
  shadow: true
})
export class Modal {

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

        <rh-divider logoText={true} padding={true} text='06.03.08 Modal' />
        <rh-modal
          modalHeader = "Leakage detected"
          modalMessage = "Confirm here if your leak has been fixed. You can also confirm by opening the main water line."
          actionText = "Leakage Fixed"
        />
      </main>
    );
  }
}
