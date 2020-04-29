import { Component, h } from '@stencil/core';

@Component({
  tag: 'rh-loader',
  styleUrl: 'rh-loader.molecule.scss',
  shadow: true
})
export class RhLoader {

  public render(): any {
    return (
      <div>
        <div class="loader-background"><div class="loader"></div></div>
      </div>
    );
  }
}
