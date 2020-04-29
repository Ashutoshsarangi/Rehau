import { Component, h, Prop, Event, EventEmitter, Watch, State } from '@stencil/core';
import { OnBoardingModel } from '../../../interfaces/on-boarding-model';

@Component({
  tag: 'rh-card',
  styleUrl: 'rh-card.molecule.scss',
  shadow: true
})
export class RhCard {
  @Prop() public cardtitle: string;
  @Prop() public cardsubtitle: string;
  @Prop() carddescription: string;

  public render(): any {
    return (
      <div style={{ 'box-sizing': 'border-box' }}>
        <div class="inner-wrapper">
          <div class="row-wrap row flex-wrap">
            <div class="column-wrap col-6">
              <div class="flex-wrap report-card">
                <h3>{this.cardtitle}
                  <label class="label">{this.cardsubtitle}</label>
                </h3>
                <div class="inner-wrapper">
                  <div class="report-value">41<span class="decimal-value">.3</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}