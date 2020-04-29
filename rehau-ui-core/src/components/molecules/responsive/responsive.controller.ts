import { fromEvent, Observable, combineLatest } from 'rxjs';
import { defaultIfEmpty, startWith, distinctUntilChanged, debounceTime, map, skip } from 'rxjs/operators';

const BREAKPOINTS: { [s: string]: { min: number; max: number } } = {
  S: { min: 0, max: 767 },
  M: { min: 768, max: 991 },
  L: { min: 992, max: 1365 },
  XL: { min: 1366, max: Infinity }
};

export type Breakpoints = keyof typeof BREAKPOINTS;

export class ResponsiveController {
  public resize$: Observable<any>;
  public load$: Observable<any>;
  public orientation$: Observable<any>;
  public popstate$: Observable<any>;
  private currentBreakpoint: Breakpoints;

  constructor() {
    this.startListenEvents();
  }

  /**
   * @description Observable which return the current Breakpoint
   * @return {Observable<Breakpoints>}
   */
  public resizeDispatcher(): Observable<any> {
    return combineLatest(this.resize$, this.load$, this.orientation$, this.popstate$);
  }

  /**
   * @description Return the current Window width
   * @returns {number}
   */
  public getCurrentWidth(): number {
    return window.innerWidth;
  }

  private startListenEvents(): void {
    this.resize$ = combineLatest(
      fromEvent(window, 'resize').pipe(
        map(this.handleWidth.bind(this)),
        // debounceTime(0),
        defaultIfEmpty(),
        distinctUntilChanged(),
        startWith(this.handleWidth())
      )
    );

    this.load$ = fromEvent(window, 'load').pipe(
      map(this.handleWidth.bind(this)),
      startWith(this.handleWidth())
    );

    this.orientation$ = fromEvent(window, 'orientationchange').pipe(
      map(this.handleWidth.bind(this)),
      startWith(this.handleWidth())
    );

    this.popstate$ = fromEvent(window, 'popstate').pipe(
      map(this.handleWidth.bind(this)),
      startWith(this.handleWidth())
    );
  }

  private handleWidth(): Breakpoints {
    const width: number = window.innerWidth;

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

export const responsiveController: ResponsiveController = new ResponsiveController();
