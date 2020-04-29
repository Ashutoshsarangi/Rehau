import { Component, Prop, h, EventEmitter, Event, State, Listen } from '@stencil/core';
import * as platform from '../../../../utils/platform-utils';
import { consoleLog } from 'src/utils/logger-utils';

@Component({
  tag: 'rh-toggle-switch',
  styleUrl: 'rh-toggle-switch.molecule.scss',
  shadow: true
})
export class RhToggleSwitchMolecule {
  @Prop() public leftText: string;
  @Prop() public rightText: string;
  @Prop() public disabled: boolean = false;
  @Prop() public checked: boolean = false;
  @Prop() public border: boolean = false;

  @State() public containerSize1: number;
  private switchField1: HTMLElement;
  @State() public containerSize2: number;
  private switchField2: HTMLElement;
  private maxwidth: string;
  private switchwidth: string;
  @Event({ composed: false }) private switchClick: EventEmitter;



  public componentDidLoad(): void {
    if (!!this.switchField1) {
      this.containerSize1 = this.switchField1.getBoundingClientRect().width;
      this.resize();
    }
    if (!!this.switchField2) {
      this.containerSize2 = this.switchField2.getBoundingClientRect().width;
      this.resize();
    }
  }

  public componentDidRender(): void {
    if (!!this.switchField1) {
      this.containerSize1 = this.switchField1.clientWidth;
      this.resize();
    }
    if (!!this.switchField2) {
      this.containerSize2 = this.switchField2.clientWidth;
      this.resize();
    }
  }

  public componentDidUpdate(): void {
    this.resize();
    // if (window.location.href.indexOf('reload') == -1) {
    //   window.location.replace(window.location.href + '?reload');
    // }
  }

  @Listen('resize', { target: 'document' })
  private resize(): void {
    if (!!this.switchField1) {
      this.containerSize1 = this.switchField1.clientWidth;
    }
    if (!!this.switchField2) {
      this.containerSize2 = this.switchField2.clientWidth;
    }
    if (this.containerSize1 > this.containerSize2) {
      this.maxwidth = this.containerSize1 + "px";
      this.switchwidth = this.containerSize1 + this.containerSize1 + "px";
    } else {
      this.maxwidth = this.containerSize2 + "px";
      this.switchwidth = this.containerSize2 + this.containerSize2 + "px";
    }
  }
  public fire(event: any, temp: string): void {
    event.switchClick = temp;
    this.switchClick.emit(event);
  }
  public render(): any {

    const divClass: { [s: string]: boolean } = {
      'rect-button': true,
    };

    const disabled: { [s: string]: boolean } = {
      'disabled': this.disabled
    };

    const styles: { [s: string]: string } = {
      'width': this.maxwidth
    };

    const switchstyles: { [s: string]: string } = {
      'width': this.switchwidth
    };

    const border: { [s: string]: boolean } = {
      'border': this.border
    }
    const switchClass: { [s: string]: boolean } = {
      'switch': true
    }

    return (
      <div class={divClass} style={{ 'box-sizing': 'border-box' }}>
        <label class={{ ...switchClass, "border": this.border }} style={switchstyles}>
          <input type="checkbox" checked={this.checked} disabled={this.disabled} class={disabled} />
          <span class="slider">
            <span class="off" style={styles} ref={(el: HTMLElement) => (this.switchField1 = el)} onClick={(event: UIEvent) => this.fire(event, 'left')}>{this.leftText}</span>
            <span class="on" style={styles} ref={(el: HTMLElement) => (this.switchField2 = el)} onClick={(event: UIEvent) => this.fire(event, 'right')}>{this.rightText}</span>
          </span>
        </label>
      </div>
    );
  }
}
