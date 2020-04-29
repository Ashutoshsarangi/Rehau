import { Action } from '@ngrx/store';
export interface State {
    showLoader: boolean;
}
export declare const initialState: State;
export declare function loaderReducer(state: State | undefined, action: Action): State;
