import { EventEmitter } from '../../../../stencil.core';
export declare class RhListItemBadgeMolecule {
    private titleElement;
    status: boolean;
    nested: boolean;
    subtitle: string;
    elements: string;
    firstTitle: string;
    icon: string;
    badgetitle: string;
    badgeActive: boolean;
    badgeBgColor: string;
    padding: boolean;
    iconLeftActive: boolean;
    iconRight: boolean;
    badgeStatus: boolean;
    colorBg: string;
    private togglePaddingTop;
    checked: EventEmitter<any>;
    fire: EventEmitter<any>;
    selectedChecked(event: any): any;
    changeValue(): void;
    render(): any;
}
