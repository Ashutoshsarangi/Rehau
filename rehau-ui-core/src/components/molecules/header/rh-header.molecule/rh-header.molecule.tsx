import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';


@Component({
  tag: 'rh-header',
  styleUrl: 'rh-header.molecule.scss',
  shadow: true
})
export class RhHeaderMolecule {
  @Prop() public headertitle: string;
  @Prop() public subtitle: string;
  @Prop() public icon: string;
  @Prop() public innerpageheader: boolean = false;
  @Prop() public backicon: boolean = false;
  @Prop() public righticon: boolean = false;

  @Prop() public badgetitle: string;
  @Prop() public badgeActive: boolean;
  @Prop() public badgeBgColor: string;
  @Prop() public badgeStatus: string;
  @Prop() public deviceOnline: boolean = true;

  @Event({ eventName: 'backButtonAction' }) public checked: EventEmitter<any>;
  @Event({ eventName: 'buttonAction' }) public trigger: EventEmitter<any>;

  public selectedChecked(event: any): any {
    this.checked.emit(event);
  }

  public selectedClicked(event: any): any {
    this.trigger.emit(event);
  }

  public render(): any {

    // const headerClass: { [s: string]: boolean } = {
    //   'innerpageheader': this.innerpageheader
    // };

    const rightIconClass: { [s: string]: boolean } = {
      'righticon': this.righticon,
      'hidden': !this.righticon
    };

    const onlineClass: { [s: string]: boolean } = {
      'navbar': true,
      'innerpageheader': this.innerpageheader,
      'offline-navbar': !this.deviceOnline
    };

    return (
      <div>
        <nav class={onlineClass}>
          <rh-icon
            class='icon'
            name='icon-next up'
            color='var(--quaternaryColor, $quaternaryColor)'
            onClick={(event: UIEvent) => this.selectedChecked(event)}
            size='28px'
          ></rh-icon>
          <div class="navbar-wrapper">
            <div class="title-wrapper"> 
              <span class="title">{this.headertitle}</span>
              {this.badgeActive && (
                <div class='col no-padding no-margin badgde-align'>
                  <rh-badges
                    badgetitle={this.badgetitle}
                    badgeBgColor={this.badgeBgColor}
                    badgeStatus={this.badgeStatus}
                    onClick={(event: UIEvent) => this.selectedChecked(event)}
                    class="header-badge"
                  />
                </div>
              )}
            </div>
            
            <span class="subtitle">{this.subtitle}</span>
          </div>
          <rh-primary-button
            class={rightIconClass}
            id='rh-primary-button_12'
            icon="icon-plus"
            iconsecondary={true}
            onButtonClicked={(event: any) => this.selectedClicked(event)}
          />
        </nav>
      </div>
    );
  }
}
