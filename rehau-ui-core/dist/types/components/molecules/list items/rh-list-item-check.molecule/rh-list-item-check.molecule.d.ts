import { EventEmitter } from '../../../../stencil.core';
import { ListItemVariation3 } from '../../../interfaces/list-item-variation3';
export declare class RhListItemCheckMolecule {
    itemList: Array<ListItemVariation3>;
    private containerItemList;
    checked: EventEmitter<any>;
    fire: EventEmitter<any>;
    selectedChecked(item: ListItemVariation3): any;
    render(): any;
}
