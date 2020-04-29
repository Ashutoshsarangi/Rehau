import { Component, Prop, h, Event, EventEmitter, State, Listen } from '@stencil/core';

import { HorizontalTabMenuModel } from '../../../interfaces/horizontal-tab-menu-model';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'rh-navbar',
  styleUrl: 'rh-navbar.molecule.scss',
  shadow: true
})
export class RhNavbar {
  @Prop() public tabs: Array<HorizontalTabMenuModel>;

  @State() public containerSize: number;

  @Event() public onClick: EventEmitter<any>;

  private containerTabs: HTMLElement;

  private select(tab: HorizontalTabMenuModel): void {
    this.tabs.map((element: HorizontalTabMenuModel) => (element.active = false));
    tab.active = !tab.active;
    this.tabs = [...this.tabs];
    this.onClick.emit(tab);
  }

  public render(): any {
    const firstRow: { [s: string]: boolean } = {
      'row-element display-align': true
    };

    const firstLabel: { [s: string]: boolean } = {
      'label-element': true
    };

    return (
      <div>
        {this.tabs.length > 1 && (
          <div class='container-element no-padding' ref={(el: HTMLElement) => (this.containerTabs = el)}>
            <div class={firstRow}>
              {this.tabs.map((tab: HorizontalTabMenuModel) => (
                <div
                  class={{
                    'col-element': !tab.active,
                    'col-element-selected': tab.active,
                    'no-padding': true
                  }}
                  onClick={() => this.select(tab)}
                >
                  <div style={{ width: '100%' }}>
                    <label class={{ ...firstLabel, 'tab-active': tab.active, 'left-padding': !tab.active }}>
                      <span class="label-text">{tab.label}</span>
                      <rh-icon
                        class='icon tab-icon'
                        name={tab.active ? tab.iconactive : tab.icon}
                        color='var(--primaryColor, $primaryColor)'
                        size='18px'
                      >
                        {tab.notification && <div class='notification' />}
                      </rh-icon>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {
          this.tabs.map((tab: HorizontalTabMenuModel) => (
            tab.active && (
              <div>
                <slot name={tab.name} />
              </div>
            )
          ))
        }
      </div>
    );
  }
}
