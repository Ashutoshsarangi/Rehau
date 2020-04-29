import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';

@Component({
  tag: 'showcases-page',
  styleUrl: 'showcases.page.scss',
  shadow: true
})
export class ShowcasesPage {
  @Prop() public history: RouterHistory;

  private navigateTo(destination: string): void {
    this.history.push(`${Environment.basePathWeb}/ui-showcase/${destination}`);
  }

  public render(): any {
    return (
      <main class='main-container'>
        <rh-list-item-primary
          title='Buttons'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('buttons')}
        />

        <rh-list-item-primary
          title='Form'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('form')}
        />

        <rh-list-item-primary
          title='Navbars'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('navbars-list')}
        />

        <rh-list-item-primary
          title='List Items'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('list-items')}
        />

        <rh-list-item-primary
          title='Headers'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('headers')}
        />
        <rh-list-item-primary
          title='Accordian'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('accordian')}
        />
        <rh-list-item-primary
          title='Loader'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('loader')}
        /> 
        <rh-list-item-primary
          title='Onboarding pages'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('onboarding')}
        /> 
        <rh-list-item-primary
          title='Progress Bar Pages'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('progress-bar')}
        />
        <rh-list-item-primary
          title='Badges Pages'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('badges')}
        />
        <rh-list-item-primary
          title='Modal Pages'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('modal')}
        />
        <rh-list-item-primary
          title='Home Pages'
          padding={true}
          icon='icon-next'
          onClick={() => this.navigateTo('home')}
        />
      </main>
    );
  }
}
