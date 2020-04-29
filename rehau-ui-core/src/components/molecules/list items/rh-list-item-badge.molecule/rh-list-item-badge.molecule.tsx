import { Component, Prop, h, Event, EventEmitter, Element, State, Listen } from '@stencil/core';
import { Environment } from '../../../../envs/env.dev';

@Component({
  tag: 'rh-list-item-badge',
  styleUrl: 'rh-list-item-badge.molecule.scss',
  shadow: true
})
export class RhListItemBadgeMolecule {
  @Element() private titleElement: HTMLElement;

  @Prop() public status: boolean = true;
  @Prop() public nested: boolean = false;
  @Prop() public subtitle: string;
  @Prop() public elements: string;
  @Prop({ attribute: 'title' }) public firstTitle: string;
  @Prop() public icon: string;
  @Prop() public badgetitle: string;
  @Prop() public badgeActive: boolean;
  @Prop() public badgeBgColor: string;
  @Prop() public padding: boolean;
  @Prop() public iconLeftActive: boolean;
  @Prop() public iconRight: boolean = true;
  @Prop() public badgeStatus: boolean;
  @Prop() public colorBg: string;

  @State() private togglePaddingTop: any;

  @Event({ eventName: 'checkEvent' }) public checked: EventEmitter<any>;
  @Event({ eventName: 'statusUpdate' }) public fire: EventEmitter<any>;


  public selectedChecked(event: any): any {
    this.checked.emit(event);
  }

  public changeValue(): void {
    this.status = !this.status;
    this.fire.emit(this.status);
  }


  public render(): any {

    const divClass: { [s: string]: boolean } = {
      'shape-padding': this.padding,
      'nested': this.nested,
      'row no-margin': true
    };

    const divStyle: { [s: string]: string } = {
      'box-sizing': 'border-box',
      'background-color':
        this.colorBg === 'transparent' ? 'transparent' : this.colorBg === 'grey' ? '#F0F0F0' : '#FFFFFF'
    };

    const firstLabelDiv: { [s: string]: boolean } = {
      'col-xs main-column no-padding': true,
      'align-one-line': !this.subtitle,
      'title-vertical-centered': !this.subtitle
    };

    const labelStyle: { [s: string]: boolean } = {
      'text-wrap no-padding': true,
      'title': !this.padding,
      'title-with-padding1': this.padding,
      'title-no-margin-left': !this.iconLeftActive,
      'title-margin-left': this.iconLeftActive
    };

    const subtitleClass: { [s: string]: boolean } = {
      'text-wrap no-padding': true,
      'subtitle': !this.padding,
      'subtitle-with-padding': this.padding,
      'title-no-margin-left': !this.iconLeftActive,
      'title-margin-left': this.iconLeftActive
    };

    const badgeStyle: { [s: string]: string } = {
      background:
        this.badgeBgColor === 'red'
          ? '#F1644A'
          : this.badgeBgColor === 'green'
            ? '#7ED321'
            : this.badgeBgColor === 'orange'
              ? '#FF9F00'
              : this.badgeBgColor === 'transparent'
                ? 'transparent'
                : this.badgeBgColor
    };

    const badgeClass: { [s: string]: boolean } = {
      'badge': true,
      'badge-with-padding': this.iconRight,
      'badge-without-padding': this.iconRight,
      'badge-active': this.badgeStatus,
      'badge-disable': !this.badgeStatus,
      'badge-transparent': this.badgeBgColor === 'transparent'
    };

    const toggleStyle: { [s: string]: string } = {
      'padding-top': this.togglePaddingTop,
      'display': 'flex',
      'align-items': 'center'
    };

    const customToggleStyle: { [s: string]: string } = {
      'padding-top': this.togglePaddingTop,
      'margin-right': '12px',
      'display': 'flex',
      'align-items': 'center'
    };

    const rightIconClass: { [s: string]: boolean } = {
      'space-arrow': this.badgeActive,
      'icon': true
    };

    const atLeastOneSubtitle: boolean = !!this.subtitle;

    return (
      <div>
        <div class={divClass} style={divStyle}>
          <div class={firstLabelDiv}>
            <label
              style={{ 'margin-bottom': atLeastOneSubtitle ? '10px' : '' }}
              onClick={(event: UIEvent) => this.selectedChecked(event)}
              class={labelStyle}
            >
              {this.firstTitle} {this.elements && <span class='grayElements'>({this.elements})</span>}
            </label>

            {this.subtitle && (
              <p onClick={(event: UIEvent) => this.selectedChecked(event)} class={subtitleClass}>
                {this.subtitle}
              </p>
            )}
          </div>

          {this.badgeActive && (
            <div class='col no-padding no-margin badgde-align'>
              <div style={badgeStyle} class={badgeClass} onClick={(event: UIEvent) => this.selectedChecked(event)}>
                {this.badgetitle}
              </div>
            </div>
          )}
          
          {this.iconRight && (
            <div class='col-1 no-margin'>
                <rh-icon
                  class={rightIconClass}
                  onClick={(event: UIEvent) => this.selectedChecked(event)}
                  name={this.icon}
                  size='17px'
                  color='var(--nonaryColor, $nonaryColor)'
                />
            </div>
          )}
        </div>
        <rh-divider padding={false} hrShow={true} background={false} fullWidth={true} />
      </div>
    );
  }
}
