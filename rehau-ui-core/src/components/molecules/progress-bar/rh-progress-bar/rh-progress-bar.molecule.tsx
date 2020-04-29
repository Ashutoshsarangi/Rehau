import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'rh-progress-bar',
  styleUrl: 'rh-progress-bar.molecule.scss',
  shadow: true
})
export class RhProgressBar {

  @Prop() progressAmount: string = "0";
  @Prop() progressColor: string;
  @Prop() ProgressContentHidden: boolean = false;
  @Prop() progressWidth: string =  '234px';
  @Prop() progressHeight: string =  '231px';

  public render(): any {

    const ProgressContainer: { [s: string]: boolean } = {
      'ProgressContainer': true,
    }
    const ProgressInner: { [s: string]: boolean } = {
      'ProgressInner': true,
    }
    const ProgressContent: { [s: string]: boolean } = {
      'ProgressContent': true,
    }
    const ProgressSize: { [s: string]: string } = {
      'width': this.progressWidth,
      'height': this.progressHeight,
      'transitionDuration': '0.6s'
    }

    return (
      <div class={ProgressContainer} style={{
        ...ProgressSize,
        background: `conic-gradient(${this.progressColor} ${this.progressAmount}%, 0, transparent ${(
          100 - parseInt(this.progressAmount)
        ).toString()}%)`,
      }}>
        <div class={ProgressInner}>
          <span class={{...ProgressContent, 'hidden': this.ProgressContentHidden}}>
            {this.progressAmount}
          </span>
        </div>
      </div>
    );
  }
}
