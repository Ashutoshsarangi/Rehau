import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';

import * as logger from '../../../utils/logger-utils';

@Component({
  tag: 'dividers-page',
  styleUrl: 'dividers.page.scss',
  shadow: true
})
export class DividersPage {
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

        <rh-list-item-5
          id='rh-list-item-5_1'
          padding={true}
          titleGray={true}
          title='rh-divider'
          subtitle='Technical component'
        />

        <p class='div-p'>04.12.03 Medium Divider (32pt)</p>
        <rh-divider id='rh-divider_1' logoText={true} padding={false} bigSize={true} />

        <p class='div-p'>04.12.01 Section Divider With Text (48pt)</p>
        <rh-divider id='rh-divider_2' logoText={true} padding={true} text='Text discription title' />

        <p class='div-p'>04.12.01 Section Divider With Text-icon (48pt)</p>
        <rh-divider
          id='rh-divider_3'
          logoText={true}
          padding={true}
          text='Text discription title'
          icon='../assets/img/icons/g25-esclamation-mark-rounded-pos-r.svg'
          onChecked={(event: CustomEvent<any>) => this.checkEvent(event)}
        />

        <p class='div-p'>04.12.02 Objects Divider (16pt)</p>
        <rh-divider id='rh-divider_4' logoText={true} padding={false} bigSize={false} />

        <p class='div-p'>04.12.04 Grey line dividers</p>
        <rh-divider id='rh-divider_5' hrShow={true} background={false} fullWidth={true} />
        <br />
        <rh-divider id='rh-divider_6' hrShow={true} background={false} fullWidth={false} />
        <br />

        <p class='div-p'>04.12.05 White line dividers</p>
        <div class='div-background-color'>
          <br />
          <rh-divider id='rh-divider_7' hrShow={true} background={true} fullWidth={true} />
          <br />
          <rh-divider id='rh-divider_8' hrShow={true} background={true} fullWidth={false} />
          <br />
        </div>
      </main>
    );
  }
}
