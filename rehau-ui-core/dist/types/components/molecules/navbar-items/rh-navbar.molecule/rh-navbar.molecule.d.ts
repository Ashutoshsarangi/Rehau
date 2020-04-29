import { EventEmitter } from '../../../../stencil.core';
import { HorizontalTabMenuModel } from '../../../interfaces/horizontal-tab-menu-model';
export declare class RhNavbar {
    tabs: Array<HorizontalTabMenuModel>;
    containerSize: number;
    onClick: EventEmitter<any>;
    private containerTabs;
    private select;
    render(): any;
}
