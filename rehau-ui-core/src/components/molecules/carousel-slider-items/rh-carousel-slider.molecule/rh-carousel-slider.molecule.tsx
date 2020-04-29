import { Component, Prop, h, State } from '@stencil/core';
import { BasicCarouselModel } from '../../../interfaces/basic-carousel-model';

@Component({
  tag: 'rh-carousel-slider',
  styleUrl: 'rh-carousel-slider.molecule.scss',
  shadow: true
})


export class RhCarouselSliderMolecule {
  @Prop() public carousels: Array<BasicCarouselModel>;
  private containerCarousel: HTMLElement;

  @Prop() public padding: boolean;
  @Prop() public colorBg: string | 'transparent' | 'grey' | 'white';

  public render(): any {
    const backgroundColor: { [s: string]: any } = {
      'background-color':
        this.colorBg === 'transparent' ? 'transparent' : this.colorBg === 'grey' ? '#EBEBEB' : '#FFFFFF'
    };

    return (
      <div>carousel</div>
      );
  }
}
