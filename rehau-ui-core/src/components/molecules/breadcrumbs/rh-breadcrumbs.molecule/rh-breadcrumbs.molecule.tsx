import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import * as platform from '../../../../utils/platform-utils';

@Component({
  tag: 'rh-breadcrumbs',
  styleUrl: 'rh-breadcrumbs.molecule.scss',
  shadow: true
})
export class RhBreadcrumbsMolecule {
  @Prop() public breadcrumbs: Array<string> = [];
  @Event({ eventName: 'goBack' }) private goBackEmitter: EventEmitter<any>;
  @Event({ eventName: 'goBackTo' }) private goBackToEmitter: EventEmitter<any>;

  public isWeb: boolean;

  public componentWillLoad(): void {
    if (platform.isPlatform('browser')) {
      this.isWeb = true;
    } else {
      this.isWeb = false;
    }
  }

  public goBackTo(index: number, last: boolean): void {
    if (!last) {
      if (index !== 0) this.goBackToEmitter.emit(index);
      else this.goBack();
    }
  }

  public goBackToRoot(): void {
    this.goBackToEmitter.emit(0);
  }

  public goBack(): void {
    this.goBackEmitter.emit();
  }

  public render(): any {
    return (
      <div>
        {this.breadcrumbs.length > 1 && this.isWeb && (
          <div class='grid no-padding'>
            <div class='row'>
              <div class='breadcrumbs_container col-xs-12'>
                <rh-responsive breakpoints={['L', 'XL']}>
                  {this.breadcrumbs.length > 1 && (
                    <div class='crumbs_icon' onClick={() => this.goBack()}>
                      <rh-icon
                        style={{ 'cursor': 'pointer', 'margin-right': '7px' }}
                        name='icon-next'
                        size='12px'
                      />
                      <label class='prova'>Back</label>
                    </div>
                  )}

                  <div class='crumbs_icon'>
                    {this.breadcrumbs.map((crumb, index, array) => (
                      <slot>
                        {index === 0 ? (
                          <slot>
                            <label class='prova' onClick={() => this.goBackToRoot()}>
                              {crumb}
                            </label>
                            {this.breadcrumbs.length >= 1 && (
                              <rh-icon name='icon-next' size='12px' />
                            )}
                          </slot>
                        ) : (
                            <slot>
                              <label
                                class='prova'
                                onClick={() => this.goBackTo(index, index + 1 === array.length)}
                                style={{
                                  'font-weight': index + 1 === array.length ? 'bold' : 'normal',
                                  'cursor': index + 1 === array.length ? 'auto' : ''
                                }}
                              >
                                {crumb}
                              </label>
                              {this.breadcrumbs[index + 1] && (
                                <rh-icon name='icon-next' size='12px' />
                              )}
                            </slot>
                          )}
                      </slot>
                    ))}
                  </div>
                </rh-responsive>
                {/* <!-- Web Mobile Version --> */}
                <rh-responsive breakpoints={['S', 'M']}>
                  <div class='sm-crumbs'>
                    <rh-icon
                      style={{ 'margin-right': '7px' }}
                      class='sm-back-icon'
                      name='icon-next'
                      size='12px'
                    />
                    <div class='sm-back-crumb' onClick={() => this.goBackTo(this.breadcrumbs.length - 2, false)}>
                      <label>{this.breadcrumbs[this.breadcrumbs.length - 2]}</label>
                    </div>

                    <label class='crumbs-divider'>|</label>
                    <div class='sm-current-crumb'>

                      <label class='label-SM text-wrap'>{this.breadcrumbs[this.breadcrumbs.length - 1]}</label>
                    </div>
                  </div>
                </rh-responsive>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
