import { EventEmitter } from '../../../../stencil.core';
import { BasicListItem } from '../../../interfaces/basic-listitem-model';
export declare class RhListItemMolecule {
    itemList: Array<BasicListItem>;
    private containerItemList;
    checked: EventEmitter<any>;
    fire: EventEmitter<any>;
    selectedChecked(event: any): any;
    render(): any;
}
