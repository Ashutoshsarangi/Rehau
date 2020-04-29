import { Observable } from 'rxjs';
declare const BREAKPOINTS: {
    [s: string]: {
        min: number;
        max: number;
    };
};
export declare type Breakpoints = keyof typeof BREAKPOINTS;
export declare class ResponsiveController {
    resize$: Observable<any>;
    load$: Observable<any>;
    orientation$: Observable<any>;
    popstate$: Observable<any>;
    private currentBreakpoint;
    constructor();
    /**
     * @description Observable which return the current Breakpoint
     * @return {Observable<Breakpoints>}
     */
    resizeDispatcher(): Observable<any>;
    /**
     * @description Return the current Window width
     * @returns {number}
     */
    getCurrentWidth(): number;
    private startListenEvents;
    private handleWidth;
}
export declare const responsiveController: ResponsiveController;
export {};
