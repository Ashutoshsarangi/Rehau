import { Action } from '@ngrx/store';
import { CidaasState } from '../../../models/auth.model';
export declare const initialState: CidaasState;
export declare function cidaasReducer(state: CidaasState | undefined, action: Action): CidaasState;
