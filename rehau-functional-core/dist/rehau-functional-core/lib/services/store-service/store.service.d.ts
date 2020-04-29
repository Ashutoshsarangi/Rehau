import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CidaasState } from '../../models/auth.model';
import { LogService } from '../logger-service/logger.service';
export declare const LoaderFlag: Subject<{}>;
export declare class StoreService {
    private store;
    private logService;
    userData$: Observable<CidaasState>;
    showLoader$: Observable<boolean>;
    constructor(store: Store<{
        cidaasData: CidaasState;
        loaderState: boolean;
    }>, logService: LogService);
    dispatchUserData(Data: any): void;
    /**
     * @description This function will return the latest state of userData from store
     * @returns object of user data
     */
    getUserData(): Promise<any>;
    /**
     * @description This function will update the state of loader
     * @param state is the value of state to dispatch
     */
    dispatchLoaderState(state: any): void;
    /**
     * @description This function will return the latest state of loader
     * @returns current loader state
     */
    getLoaderState(): Promise<any>;
}
