import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';
import { ListItemVariation3 } from '../../interfaces/list-item-variation3';
import { BasicListItem } from '../../interfaces/basic-listitem-model';


@Component({
  tag: 'list-items',
  styleUrl: 'list-items.page.scss',
  shadow: true
})
export class ListItemms {
  @Prop() public history: RouterHistory;
  public listItem3: Array<ListItemVariation3> = [
    {
      title: 'l/min'
    },
    {
      title: 'l/h'
    },
    {
      title: 'm³/h'
    }
  ];
  public basicListItem: Array<BasicListItem> = [
    {
      title: 'Item - 1'
    },
    {
      title: 'Item - 2'
    },
    {
      title: 'Item - 3'
    },
    {
      title: 'Item - 4',
      subtitle: 'Subtitle - 1'
    },
  ];

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

        <rh-divider logoText={true} padding={true} text='06.03.08 List with Title' />
        <rh-list-item
          itemList={this.basicListItem}
          onCheckEvent={(event: any) => this.checkEvent(event)}
        />
        <rh-divider logoText={true} padding={true} text='06.03.08 List with Title and Subtitle' />
        <rh-list-item-check
          itemList={this.listItem3}
          onCheckEvent={(event: any) => this.checkEvent(event)}
        />
      </main>
    );
  }
}
