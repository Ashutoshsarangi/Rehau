import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'rh-slider',
  styleUrl: 'rh-slider.molecule.scss',
  shadow: true
})

export class RhSliderMolecule {
  @Prop() public steps: Array<any> = [];
  @Prop() public padding: boolean;
  @Prop() public colorBg: string | 'transparent' | 'grey' | 'white';

  public render(): any {
    const backgroundColor: { [s: string]: any } = {
      'background-color':
        this.colorBg === 'transparent' ? 'transparent' : this.colorBg === 'grey' ? '#EBEBEB' : '#FFFFFF'
    };

    return (
      <div class={this.padding ? 'shape-padding' : ''} style={backgroundColor}>
        <div class='grid steps-grid'>
          <div class='row middle-xs line-row'>
            <div class={'step-point col-xs-auto no-padding' + (this.steps[0].active ? ' active' : '')}></div>
            {this.steps
              .slice(1)
              .map((step: any) => [
                <div class={'step-line col-xs no-padding' + (step.active ? ' active' : '')}></div>,
                <div class={'step-point col-xs-auto no-padding' + (step.active ? ' active' : '')}></div>
              ])}
          </div>

          <div class='row middle-xs texts-row'>
            {this.steps.map((step: any, index: number, list: Array<any>) => [
              <div class={'col-xs no-padding'} style={{ left: this.generateLeftDistance(index, list) }}>
                {step.statustext ? step.text : ''}
              </div>
            ])}
          </div>
        </div>
      </div>
    );
  }

  private generateLeftDistance(index: number, list: Array<any>): string {
    const dinamicMultiplier: number = -100 / ((list.length - 1) * 2);
    const dinamicPixelDistance: number = list.length / 2;
    if (index === 0 || index === list.length - 1) return index * dinamicMultiplier + '%';
    else return 'calc(' + index * dinamicMultiplier + '% + ' + (dinamicPixelDistance - index) + 'px)';
  }
}
