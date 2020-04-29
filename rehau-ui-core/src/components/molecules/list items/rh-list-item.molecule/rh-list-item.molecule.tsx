import { Component, Prop, h, Event, EventEmitter, Element, State, Listen } from '@stencil/core';
import { Environment } from '../../../../envs/env.dev';
import { BasicListItem } from '../../../interfaces/basic-listitem-model';

@Component({
  tag: 'rh-list-item',
  styleUrl: 'rh-list-item.molecule.scss',
  shadow: true
})
export class RhListItemMolecule {
  @Prop() public itemList: Array<BasicListItem>;
  private containerItemList: HTMLElement;
  @Event({ eventName: 'checkEvent' }) public checked: EventEmitter<any>;
  @Event({ eventName: 'statusUpdate' }) public fire: EventEmitter<any>;


  public selectedChecked(event: any): any {
    this.checked.emit(event);
  }

  public render(): any {

    const divClass: { [s: string]: boolean } = {
      'shape-padding row no-margin': true
    };

    const divStyle: { [s: string]: string } = {
      'box-sizing': 'border-box',
      'background-color': '#FFFFFF'
    };

    const firstLabelDiv: { [s: string]: boolean } = {
      'col-xs main-column no-padding': true
    };

    const labelStyle: { [s: string]: boolean } = {
      'text-wrap no-padding title-with-padding1': true,
    };
    const rightIconClass: { [s: string]: boolean } = {
      'icon': true
    };
    const subtitleClass: { [s: string]: boolean } = {
      'text-wrap no-padding': true
    };


    return (
      <div>
        {
          this.itemList.length >= 1 && (
            <div ref={(el: HTMLElement) => (this.containerItemList = el)}>
              {this.itemList.map((item: BasicListItem, index: number) => (
                <div class={divClass} style={divStyle} onClick={() => this.selectedChecked(item)}>
                  <div class={firstLabelDiv}>
                    <label class={labelStyle}>
                      {item.title}
                      {item.subtitle && (
                        <p onClick={(event: UIEvent) => this.selectedChecked(event)} class={subtitleClass}>
                          {item.subtitle}
                        </p>)}
                    </label>
                  </div>
                  {(
                    <div class='col-1 no-margin'>
                      <rh-icon
                        class={rightIconClass}
                        name='icon-next'
                        size='18px'
                        color='var(--nonaryColor, $nonaryColor)'
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}
