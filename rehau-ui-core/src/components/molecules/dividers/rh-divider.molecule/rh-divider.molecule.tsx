import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'rh-divider',
  styleUrl: 'rh-divider.molecule.scss',
  shadow: true
})
export class RhDividerMolecule {
  @Prop() public logoText: boolean;
  @Prop() public fullWidth: boolean;
  @Prop() public bigSize: boolean;
  @Prop() public hrShow: boolean;
  @Prop() public icon: string;
  @Prop() public padding: boolean;
  @Prop() public background: boolean;
  @Prop() public text: string;

  @Event() public checked: EventEmitter;

  private selectedChecked(event: any): any {
    this.checked.emit(event);
  }

  public render(): any {
    const mainClasses: { [s: string]: boolean } = {
      'main-container grid': true,
      'shape-padding': this.padding,
      'small': !this.bigSize && !this.text,
      'large': this.bigSize && !this.text
    };

    const hrDiv: { [s: string]: boolean } = {
      'line': true,
      'no-background': !this.background,
      'small': !this.fullWidth
    };

    return (
      <div>
        {this.logoText && (
          <div class={mainClasses}>
            <div class='row middle-xs'>
              {this.text && (
                <div class='col-xs no-padding'>
                  <label class='text text-wrap no-margin'>{this.text}</label>
                </div>
              )}
              {this.icon && (
                <div class='col-xs-auto right-icon no-padding'>
                  <img src={this.icon} onClick={(event: UIEvent) => this.selectedChecked(event)} />
                </div>
              )}
            </div>
          </div>
        )}

        {this.hrShow && <div class={hrDiv}></div>}
      </div>
    );
  }
}
