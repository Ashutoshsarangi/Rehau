import { fromEvent, combineLatest } from 'rxjs';
import { defaultIfEmpty, startWith, distinctUntilChanged, map } from 'rxjs/operators';
const BREAKPOINTS = {
    S: { min: 0, max: 767 },
    M: { min: 768, max: 991 },
    L: { min: 992, max: 1365 },
    XL: { min: 1366, max: Infinity }
};
export class ResponsiveController {
    constructor() {
        this.startListenEvents();
    }
    /**
     * @description Observable which return the current Breakpoint
     * @return {Observable<Breakpoints>}
     */
    resizeDispatcher() {
        return combineLatest(this.resize$, this.load$, this.orientation$, this.popstate$);
    }
    /**
     * @description Return the current Window width
     * @returns {number}
     */
    getCurrentWidth() {
        return window.innerWidth;
    }
    startListenEvents() {
        this.resize$ = combineLatest(fromEvent(window, 'resize').pipe(map(this.handleWidth.bind(this)), 
        // debounceTime(0),
        defaultIfEmpty(), distinctUntilChanged(), startWith(this.handleWidth())));
        this.load$ = fromEvent(window, 'load').pipe(map(this.handleWidth.bind(this)), startWith(this.handleWidth()));
        this.orientation$ = fromEvent(window, 'orientationchange').pipe(map(this.handleWidth.bind(this)), startWith(this.handleWidth()));
        this.popstate$ = fromEvent(window, 'popstate').pipe(map(this.handleWidth.bind(this)), startWith(this.handleWidth()));
    }
    handleWidth() {
        const width = window.innerWidth;
        if (width >= BREAKPOINTS.S.min && width <= BREAKPOINTS.S.max) {
            this.currentBreakpoint = 'S';
        }
        if (width >= BREAKPOINTS.M.min && width <= BREAKPOINTS.M.max) {
            this.currentBreakpoint = 'M';
        }
        if (width >= BREAKPOINTS.L.min && width <= BREAKPOINTS.L.max) {
            this.currentBreakpoint = 'L';
        }
        if (width >= BREAKPOINTS.XL.min && width <= BREAKPOINTS.XL.max) {
            this.currentBreakpoint = 'XL';
        }
        return this.currentBreakpoint;
    }
}
export const responsiveController = new ResponsiveController();
