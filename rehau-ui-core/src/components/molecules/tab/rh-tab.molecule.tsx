import { Component, h, State, Element, Method, Prop } from '@stencil/core';

import Hammer from 'hammerjs';

@Component({
  tag: 'rh-tab',
  styleUrl: 'rh-tab.molecule.scss',
  shadow: true
})
export class RhTabMolecule {

  @Prop() tabname: string;

  public render(): any {
    return (
      <div>
        <h1>{this.tabname}</h1>
      </div>
    );
  }
}
