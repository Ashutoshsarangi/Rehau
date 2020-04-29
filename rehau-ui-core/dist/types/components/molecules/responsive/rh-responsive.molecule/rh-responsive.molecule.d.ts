import { Breakpoints } from '../responsive.controller';
export declare class MhResponsiveMolecule {
    breakpoints: Breakpoints[];
    private currentBreakpoint;
    private resizeSubscription;
    constructor();
    componentWillLoad(): void;
    componentDidUnload(): void;
    render(): any;
}
