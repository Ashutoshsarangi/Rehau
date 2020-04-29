import { EventEmitter } from '../../../../stencil.core';
export declare class RhHeaderMolecule {
    headertitle: string;
    subtitle: string;
    icon: string;
    innerpageheader: boolean;
    backicon: boolean;
    righticon: boolean;
    badgetitle: string;
    badgeActive: boolean;
    badgeBgColor: string;
    badgeStatus: string;
    deviceOnline: boolean;
    checked: EventEmitter<any>;
    trigger: EventEmitter<any>;
    selectedChecked(event: any): any;
    selectedClicked(event: any): any;
    render(): any;
}
