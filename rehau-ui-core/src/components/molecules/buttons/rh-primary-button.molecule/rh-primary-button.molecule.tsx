import { Component, Prop, h, EventEmitter, Event, State } from '@stencil/core';
import * as platform from '../../../../utils/platform-utils';

@Component({
  tag: 'rh-primary-button',
  styleUrl: 'rh-primary-button.molecule.scss',
  shadow: true
})

export class RhPrimaryButtonMolecule {
  @Prop() public text: string;
  @Prop() public disabled: boolean = false;
  @Prop() public ctabutton: boolean = false;
  @Prop() public secondary: boolean = false;
  @Prop() public standard: boolean = false;
  @Prop() public iconbutton: boolean = false;
  @Prop() public iconsecondary: boolean = false;
  @Prop() public transparentbutton: boolean = false;
  @Prop() icon: string;
  @Prop() public color: string;
  @Prop() public bgcolor: string;



  @Event({ composed: false }) private buttonClicked: EventEmitter;

  @State() public isMouseHover: boolean = false;

  public mouseOver(): void {
    this.isMouseHover = !platform.isPlatform('ios') && !platform.isPlatform('android');
  }

  public fire(event: any): void {
    this.buttonClicked.emit(event);
  }

  public componentDidRender(): void {
    this.mouseOver();
  }

  public render(): any {
    const divClass: { [s: string]: boolean } = {
      'rect-button': true,
    };


    const styles: { [s: string]: string } = {
      'color': this.color,
      'background-color': this.bgcolor
    };

    const buttonClass: { [s: string]: boolean } = {
      'transparentbutton': this.transparentbutton,
      'cta-btn button': this.ctabutton,
      'secondary-btn button': this.secondary,
      'standard-btn button': this.standard,
      'icon-btn button': this.iconbutton,
      'icon-secondary-btn button': this.iconsecondary,
      'disabled': this.disabled
    };

    return (
      <div class={divClass} style={{ 'box-sizing': 'border-box' }}>
        <button style={styles} disabled={this.disabled} class={buttonClass} onClick={(event: UIEvent) => this.fire(event)}>
          <label class='text-button-custom text-wrap'>{this.text}</label>
          <span class={this.icon + ' icon'}></span>
        </button>
      </div>
    );
  }
}
