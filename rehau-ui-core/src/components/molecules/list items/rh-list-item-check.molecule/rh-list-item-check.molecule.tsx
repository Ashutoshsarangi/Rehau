import { Component, Prop, h, Event, EventEmitter, Element, State, Listen } from '@stencil/core';
import { Environment } from '../../../../envs/env.dev';
import { ListItemVariation3 } from '../../../interfaces/list-item-variation3';

@Component({
  tag: 'rh-list-item-check',
  styleUrl: 'rh-list-item-check.molecule.scss',
  shadow: true
})
export class RhListItemCheckMolecule {

  @Prop() public itemList: Array<ListItemVariation3>;
  private containerItemList: HTMLElement;
  @Event({ eventName: 'checkEvent' }) public checked: EventEmitter<any>;
  @Event({ eventName: 'statusUpdate' }) public fire: EventEmitter<any>;


  public selectedChecked(item: ListItemVariation3): any {
    const index = this.itemList.indexOf(item);
    for (let i = 0; i < this.itemList.length; i++) {
      if (i == index) {
        this.itemList[i].active = true;
      }
      else {
        this.itemList[i].active = false;
      }
    }
    this.itemList = [...this.itemList];
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
    return (
      <div>
        {
          this.itemList.length > 1 && (
            <div ref={(el: HTMLElement) => (this.containerItemList = el)}>
              {this.itemList.map((item: ListItemVariation3, index: number) => (
                <div class={divClass} style={divStyle} onClick={() => this.selectedChecked(item)}>
                  <div class={firstLabelDiv}>
                    <label class={labelStyle}>
                      {item.title}
                    </label>
                  </div>
                  {item.active && (
                    <div class='col-1 no-margin'>
                      <rh-icon
                        class={rightIconClass}
                        name='icon-checkmark'
                        size='18px'
                        color='var(--primaryColor, $primaryColor)'
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        }
      </div>
    );
  }
}
