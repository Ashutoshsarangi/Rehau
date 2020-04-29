import { Component, Prop, h, Event, EventEmitter, Listen } from '@stencil/core';
import { BasicAccordionModel } from '../../../interfaces/basic-accordion-model';

@Component({
  tag: 'rh-accordian',
  styleUrl: 'rh-accordian.molecule.scss',
  shadow: true
})

export class RhAccordianMolecule {
  @Prop() public accordions: Array<BasicAccordionModel>;
  private containerAccordions: HTMLElement;
  private tabContainer: boolean = true;
  @Event() public onClick: EventEmitter<any>;

  private scrollPosition: HTMLElement;


  public componentDidLoad(): void {
    this.accordions.map((element: BasicAccordionModel) => {
      if (!element.active) {
        element.active = false;
      }
    });
  }
  private active: boolean = false;
  private select(accordion: BasicAccordionModel): void {
    let index = this.accordions.indexOf(accordion);
    for (let i = 0; i < this.accordions.length; i++) {
      if (i === index) {
      } else {
        this.accordions[i].active = false;
      }
    }
    accordion.active = !accordion.active;
    this.accordions = [...this.accordions];
    this.onClick.emit(accordion);
  }

  @Listen('scroll', { target: 'window' })
  handleScroll() {
    console.log('the body was scrolled');
  }

  public render(): any {
    const tabContainerClass: { [s: string]: boolean } = {
      'tabContainer': true
    }
    


    return (
      <div>
        {this.accordions.length > 1 && (
          <div ref={(el: HTMLElement) => (this.containerAccordions = el)}>
            {this.accordions.map((accordion: BasicAccordionModel) => (
              <div class={{"tab tabOpen":accordion.active,"tab": !accordion.active}} onClick={() => this.select(accordion)}   ref={(el: HTMLElement) => (this.scrollPosition = el)}>
                <label htmlFor="chck" class="tab-label" onClick={(event: UIEvent) => this.handleScroll()}>
                  <h4 class="tab-title">
                    {accordion.accordTitle}
                    <label class={{"label down-arrow": accordion.active, "label": !accordion.active}}>{accordion.label}</label>
                  </h4>
                  <span class="tab-subtitle">
                    {accordion.subtitle}
                    {accordion.badgeActive && (
                      <div class='col no-padding no-margin badgde-align'>
                        <rh-badges
                          badgetitle={accordion.badgetitle}
                          badgeBgColor={accordion.badgeBgColor}
                          badgeStatus={accordion.badgeStatus}
                        />
                      </div>
                    )}
                  </span>
                </label>
                <label class={{...tabContainerClass, 'tab-active active-content': accordion.active}}>
                  {
                    accordion.active && <span class="tab-content">{accordion.content}</span>
                  }

                </label>
                <rh-divider padding={false} hrShow={true} background={false} fullWidth={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
