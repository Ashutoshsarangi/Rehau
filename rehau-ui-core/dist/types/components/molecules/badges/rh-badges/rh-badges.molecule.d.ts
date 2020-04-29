import { EventEmitter } from '../../../../stencil.core';
export declare class RhBadges {
    badgetitle: string;
    badgeBgColor: string;
    badgeStatus: string;
    badgeRound: boolean;
    checked: EventEmitter<any>;
    selectedChecked(event: any): any;
    render(): any;
}
