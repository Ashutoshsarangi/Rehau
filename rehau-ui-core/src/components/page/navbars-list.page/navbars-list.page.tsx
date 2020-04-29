import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';


@Component({
  tag: 'navbars-list-page',
  styleUrl: 'navbars-list.page.scss',
  shadow: true
})
export class NavbarsListPage {
  @Prop() public history: RouterHistory;

  private navigateTo(destination: string): void {
    this.history.push(`${Environment.basePathWeb}/ui-showcase/${destination}`);
  }

  public render(): any {
    return (
      <main class='main-container'>
        <rh-divider logoText={true} padding={true} text='05.04.02 Navbar variants' />
        <rh-list-item-primary
          title='Navbars with Icon'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('icon-navbars')}
        />

        <rh-list-item-primary
          title='Navbars with Label'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('label-navbars')}
        />
        
        <rh-list-item-primary
          title='Navbars with Label and Icon'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('icon-label-navbars')}
        />
      </main>
    );
  }
}
