import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'rh-icon',
  styleUrl: 'rh-icon.molecule.scss',
  shadow: false
})
export class rhIoniconMolecule {
  @Prop() public name: string;
  @Prop() public size: string;
  @Prop() public color: string;

  public render(): any {
    let className: string = '';

    if (this.name) {
      if (this.name.indexOf('rh-i') > -1) {
        className = this.name;
      } else {
        let firstSplit: string = this.name.split('-')[0];
        if (firstSplit === 'ion') {
          className = this.name;
        } else if (firstSplit === 'ios' || firstSplit === 'md') {
          className = 'ion-' + this.name;
        } else if (firstSplit === 'icon') {
          className = this.name;
        } else if (!!firstSplit) {
          className = 'ion-md-' + this.name;
        }
      }
    }

    const classes: { [s: string]: boolean } = {
      icon: this.name && this.name.indexOf('rh-i') < 0 ? false : true,
      [className]: true
    };

    const styles: { [s: string]: string } = {
      'color': this.color,
      'font-size': this.size
    };

    return <i class={classes} style={styles} />;
  }
}
