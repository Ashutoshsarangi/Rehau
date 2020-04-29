import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../../envs/env.dev';
import * as logger from '../../../../utils/logger-utils';
import { HorizontalTabMenuModel } from '../../../interfaces/horizontal-tab-menu-model';


@Component({
  tag: 'icon-label-navbars-page',
  styleUrl: 'icon-label-navbars.page.scss',
  shadow: true
})
export class IconLabelNavbarsPage {
  @Prop() public history: RouterHistory;

  private breadcrumbsArray: Array<string>;

  public tabsThreeElements: Array<HorizontalTabMenuModel> = [
    {
      id: 0,
      name: 'tab1',
      label: 'home',
      active: true,
      notification: false,
      icon: 'icon-home',
      iconactive: 'icon-home-filled',
    },
    {
      id: 1,
      name: 'tab2',
      label: 'notifications',
      active: false,
      notification: true,
      icon: 'icon-notification',
      iconactive: 'icon-notification-fill',
      // slotName: 'tab2'
    },
    {
      id: 2,
      name: 'tab3',
      label: 'settings',
      active: false,
      notification: false,
      icon: 'icon-settings',
      iconactive: 'icon-settings-filled',
      // slotName: 'tab3'
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

        <rh-divider logoText={true} padding={true} text='05.04.02 Navbar with Icon and Label' />
        <rh-navbar
          id='rh-navbar_1'
          tabs={this.tabsThreeElements}
          onOnClick={(event: any) => this.checkEvent(event)}
        >
          <div slot="tab1" class="tab-container">
            <div class="header">
              <rh-header
                headertitle="Content 1"
                subtitle="Demo page"
              />
            </div>
              <div class="inner-wrapper">
              <div class="content">
                  <p class="copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <div class="inner-wrapper">
                  <rh-checkbox
                    id='rh-rectangular-checkbox-form_2'
                    left={true}
                    padding={true}
                    text="click me"
                    isFormComponent={true}
                  />
                  </div>
                </div>
            </div>
          </div>
          <div slot="tab2" class="tab-container">
            <div class="header">
              <rh-header
                headertitle="Content 2"
                subtitle="Demo page"
              />
            </div>
              <div class="inner-wrapper">
              <div class="content">
                  <p class="copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <div class="inner-wrapper">
                    <rh-textbox
                      id='rh-textbox_1'
                      disabled={false}
                      label='Name'
                      type='text'
                      isFormComponent={true}
                      errorText='the text should be "api-response"'
                      error={false}
                      placeholder='Insert your name'
                      padding={true}
                    />
                  </div>
                </div>
            </div>
          </div>
          <div slot="tab3" class="tab-container">
            <div class="header">
              <rh-header
                headertitle="content 3"
                subtitle="Demo page 3"
              />
            </div>
              <div class="inner-wrapper">
              <div class="content">
                  <p class="copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <div class="inner-wrapper">
                  <rh-primary-button
                    id='rh-primary-button_1'
                    text='mehr'
                    icon="icon-next"
                    ctabutton={true}
                    disabled={false}
                    onButtonClicked={(event: any) => this.checkEvent(event)}
                  />
                  </div>
                </div>
            </div>
          </div>
        </rh-navbar>
      </main>
    );
  }
}
