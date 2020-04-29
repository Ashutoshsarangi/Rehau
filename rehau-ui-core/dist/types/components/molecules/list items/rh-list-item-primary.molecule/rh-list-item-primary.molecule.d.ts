import { EventEmitter } from '../../../../stencil.core';
export declare class RhListItemPrimaryMolecule {
    private titleElement;
    status: boolean;
    nested: boolean;
    subtitle: string;
    elements: string;
    firstTitle: string;
    icon: string;
    padding: boolean;
    iconRight: boolean;
    colorBg: string;
    private togglePaddingTop;
    checked: EventEmitter<any>;
    fire: EventEmitter<any>;
    selectedChecked(event: any): any;
    changeValue(): void;
    render(): any;
}
