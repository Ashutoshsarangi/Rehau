import { Component, h, State, Element, Method } from '@stencil/core';

import Hammer from 'hammerjs';

@Component({
  tag: 'rh-sliding',
  styleUrl: 'rh-sliding.molecule.scss',
  shadow: true
})
export class RhSlidingMolecule {
  @Element() private element: HTMLElement;

  @State() private buttonsWidth: number = 0;
  @State() private messageDeltaX: number = 0;
  @State() private isMoving: boolean;

  private customHammerManager: Hammer;

  private slider?: HTMLElement;
  private buttons?: HTMLElement;

  private previousSliderDeltaX: number = 0;
  private isMovementHappened: boolean;

  public componentDidLoad(): void {
    this.customHammerManager = new Hammer.Manager(this.slider, {
      recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_ALL }]]
    });

    this.customHammerManager.on('panstart', (event: any) => {
      this.isMoving = true;
      if (this.element.parentElement)
        this.element.parentElement.querySelectorAll('rh-sliding').forEach(
          (value: HTMLRhSlidingElement) => { if (value !== this.element) value.closeSlider(); }
        );
    });

    this.customHammerManager.on('panmove', (event: any) => {
      if (event.additionalEvent === 'panleft' || event.additionalEvent === 'panright') {
        this.messageDeltaX = this.previousSliderDeltaX + event.deltaX;
        if (this.messageDeltaX > 0) this.messageDeltaX = 0;
      }
    });

    this.customHammerManager.on('panend', (event: any) => {
      const buttonsEndingPoint: number = this.buttonsWidth;
      const currentDeltaX: number = this.previousSliderDeltaX + event.deltaX;
      this.isMoving = false;
      this.isMovementHappened = true;
      this.messageDeltaX = currentDeltaX < -buttonsEndingPoint / 2 ? -buttonsEndingPoint : 0;
      this.previousSliderDeltaX = this.messageDeltaX;
    });
  }

  public componentDidRender(): void {
    this.buttonsWidth = this.buttons.offsetWidth;
  }

  public componentDidUnload(): void {
    this.customHammerManager.destroy();
  }

  private manageStartClickOnMessage(): void {
    this.isMovementHappened = false;
    if (this.element.parentElement)
      this.element.parentElement.querySelectorAll('rh-sliding').forEach(
        (value: HTMLRhSlidingElement) => { if (value !== this.element) value.closeSlider(); }
      );
  }

  private manageEndClickOnMessage(): void {
    if (!this.isMovementHappened) this.closeSlider();
  }

  @Method()
  public closeSlider(immediately?: boolean): Promise<void> {
    if (immediately) this.isMoving = true;
    this.messageDeltaX = 0;
    this.previousSliderDeltaX = 0;
    return new Promise((resolve) => resolve());
  }

  public render(): any {
    const sliderClasses: { [s: string]: boolean } = {
      'col-xs-6 slider-container': true,
      'animated': !this.isMoving,
      'open': !!this.messageDeltaX
    };

    return (
      <div class='grid' title=' '>
        <div class='row'>
          <div
            ref={(el: any) => this.slider = el as HTMLElement}
            class={sliderClasses}
            style={{ left: this.messageDeltaX + 'px' }}
            onMouseDown={() => this.manageStartClickOnMessage()}
            onMouseUp={() => this.manageEndClickOnMessage()}
          >
            <slot name='slider' />
          </div>

          <div class='col-xs-6 buttons-container'>
            <div class='row end-xs'
              ref={(el: any) => this.buttons = el as HTMLElement}
              style={{ right: this.buttonsWidth + 'px' }}
            >
              <slot name='buttons' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
