import {ActionReducer, Action} from '@ngrx/store';
import {merge, pick} from 'lodash-es';
import { CacheService } from 'rehau-functional-core/dist/rehau-functional-core';
import { StoreStateKeys } from '../config/store.config';


export function storageMetaReducer<S, A extends Action = Action>(
    storageService: CacheService
)   {
        console.log('in storage meta reducer');
        let onInit = true; // after load/refresh…
        return (reducer: ActionReducer<S, A>) => {
            return (state: S, action: A): S => {
                const nextState = reducer(state, action);
                console.log('action state value--->', action);
                if (onInit) {
                    console.log('on relaod in if part');
                    // const stateKeys = ['settingsParams', 'leakageSettingData'];
                    onInit = false;
                    StoreStateKeys.forEach((value) => {
                        console.log('for ---->', value);
                        const localStorageData = storageService.getLocalData(value);
                        if (localStorageData) {
                            console.log('local storage available');
                            const stateToSave = pick(nextState, value);
                            console.log('stateToSave2', JSON.stringify(stateToSave), JSON.stringify(localStorageData));
                            merge(nextState, localStorageData);
                        } else {
                            console.log('inide else part on reload local storage not available');
                            const stateToSave = pick(nextState, value);
                            console.log('stateto save---', JSON.stringify(stateToSave), value);
                            storageService.setLocalData(value, stateToSave);
                        }
                    });
                    console.log('after loop -----', nextState);
                    return nextState;
                } else {
                    switch (action.type) {
                        case 'Settings parameters': {
                            console.log('inide else part no reload Settings parameters');
                            const stateToSave = pick(nextState, 'settingsData');
                            storageService.setLocalData('settingsData', stateToSave);
                            return nextState;
                            break;
                        }
                        case 'Leakage settings parameters': {
                            console.log('inide else part no reloadLeakage settings parameters');
                            const stateToSave = pick(nextState, 'leakageSettingData');
                            storageService.setLocalData('leakageSettingData', stateToSave);
                            return nextState;
                            break;
                        }
                        default: {
                            return nextState;
                            break;
                        }
                    }
                }
            };
        };
    }
