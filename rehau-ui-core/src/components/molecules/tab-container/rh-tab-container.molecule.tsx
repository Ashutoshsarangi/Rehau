import { Component, h, State, Element, Method, Prop } from '@stencil/core';

@Component({
  tag: 'rh-tab-container',
  styleUrl: 'rh-tab-container.molecule.scss',
  shadow: true
})
export class RhTabMolecule {


  public render(): any {
    return (
      <div class='tab-container'>
        <slot></slot>
      </div>
    );
  }
}
