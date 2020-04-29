import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
export declare class RehauFunctionalCoreService {
    private store;
    onBoardingData$: Observable<any[]>;
    constructor(store: Store<{
        onBoardingData: any[];
    }>);
    showSuccess(): void;
}
