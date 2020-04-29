import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'rh-badges',
  styleUrl: 'rh-badges.molecule.scss',
  shadow: true
})
export class RhBadges {

  @Prop() public badgetitle: string;
  @Prop() public badgeBgColor: string;
  @Prop() public badgeStatus: string;
  @Prop() public badgeRound: boolean = false;

  @Event({ eventName: 'checkEvent' }) public checked: EventEmitter<any>;


  public selectedChecked(event: any): any {
    this.checked.emit(event);
  }

  public render(): any {

    const badgeStyle: { [s: string]: string } = {
      background:
        this.badgeBgColor === 'primary' ||  this.badgeStatus === 'warning'  ||  this.badgeStatus === 'disruption' 
          ? 'var(--primaryColor, $primaryColor)'
          : this.badgeBgColor === 'secondary'
            ? 'var(--secondaryColor, $secondaryColor)'
            : this.badgeBgColor === 'tertiary' || this.badgeStatus === 'report'
              ? '#ff9500'
              : this.badgeBgColor === 'transparent' || this.badgeBgColor === 'transparent' 
                ? 'transparent !important'
                : this.badgeBgColor
    };

    const badgeClass: { [s: string]: boolean } = {
      'badge': true,
      'badgeRound': this.badgeRound,
      'badge-transparent': !this.badgeBgColor && !this.badgeStatus || this.badgeBgColor === 'transparent'
    };

    return (
      <div>
        <div class='col no-padding no-margin badgde-align'>
          <div style={badgeStyle} class={badgeClass} onClick={(event: UIEvent) => this.selectedChecked(event)}>
            {this.badgetitle}
          </div>
        </div>
      </div>
    );
  }
}
