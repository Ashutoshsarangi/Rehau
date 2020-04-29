import { Component, h, Prop } from '@stencil/core';
@Component({
  tag: 'tab-page',
  styleUrl: 'tab.page.scss',
  shadow: true
})
export class TabPage {
  public render(): any {
    return (
      <main class='main-container'>
        <rh-tab-container>
          <rh-tab tabname="Tab 1"></rh-tab>
          <rh-tab tabname="Tab 2"></rh-tab>
          <rh-tab tabname="Tab 3"></rh-tab>
          <rh-tab tabname="Tab 4"></rh-tab>
        </rh-tab-container>
      </main>
    );
  }
}
