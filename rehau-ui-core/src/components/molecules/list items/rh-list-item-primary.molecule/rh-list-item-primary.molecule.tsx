import { Component, Prop, h, Event, EventEmitter, Element, State, Listen } from '@stencil/core';
import { Environment } from '../../../../envs/env.dev';

@Component({
  tag: 'rh-list-item-primary',
  styleUrl: 'rh-list-item-primary.molecule.scss',
  shadow: true
})
export class RhListItemPrimaryMolecule {
  @Element() private titleElement: HTMLElement;

  @Prop() public status: boolean = true;
  @Prop() public nested: boolean = false;
  @Prop() public subtitle: string;
  @Prop() public elements: string;
  @Prop({ attribute: 'title' }) public firstTitle: string;
  @Prop() public icon: string;
  @Prop() public padding: boolean;
  @Prop() public iconRight: boolean = true;
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
    };

    const subtitleClass: { [s: string]: boolean } = {
      'text-wrap no-padding': true,
      'subtitle': !this.padding,
      'subtitle-with-padding': this.padding
    };

    const customToggleStyle: { [s: string]: string } = {
      'padding-top': this.togglePaddingTop,
      'margin-right': '12px',
      'display': 'flex',
      'align-items': 'center'
    };

    const rightIconClass: { [s: string]: boolean } = {
      'icon': true
    };

    const atLeastOneSubtitle: boolean = !!this.subtitle;

    return (
      <div>
        <div class={divClass} style={divStyle} onClick={(event: UIEvent) => this.selectedChecked(event)}>
          <div class={firstLabelDiv}>
            <label
              class={labelStyle}
            >
              {this.firstTitle} {this.elements && <span class='grayElements'>({this.elements})</span>}
              {this.subtitle && (
                <p onClick={(event: UIEvent) => this.selectedChecked(event)} class={subtitleClass}>
                  {this.subtitle}
                </p>
              )}
            </label>


          </div>

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
