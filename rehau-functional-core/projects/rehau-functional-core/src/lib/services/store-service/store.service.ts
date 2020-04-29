// IONIC - ANGULAR
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { userInfoAction } from '../../stores/auth/action/auth.action';
import { CidaasState } from '../../models/auth.model';
import { LogService } from '../logger-service/logger.service';
import { loaderAction } from '../../stores/loader/action/loader.action';


export const LoaderFlag = new Subject();
@Injectable()

export class StoreService {
  userData$: Observable<CidaasState>;
  showLoader$: Observable<boolean>;
  constructor(
    private store: Store<{ cidaasData: CidaasState, loaderState: boolean }>,
    private logService: LogService
  ) {
    this.userData$ = this.store.pipe(select('cidaasData'));
    this.showLoader$ = store.pipe(select('loaderState'));
  }

  dispatchUserData(Data) {
    this.store.dispatch(userInfoAction({ payload: { userInfo: Data } }));
  }

  /**
   * @description This function will return the latest state of userData from store
   * @returns object of user data
   */
  async getUserData() {
    let userData;
    this.userData$.subscribe((data) => {
      if (Object.keys(data.userInfo).length > 0) {
        userData = data.userInfo;
      }
    });

    return userData;
  }

  /**
   * @description This function will update the state of loader
   * @param state is the value of state to dispatch
   */
  dispatchLoaderState(state) {
    this.logService.log('in dispatch method tab loader state', state);
    this.store.dispatch(loaderAction(state));
    LoaderFlag.next(state);
  }

  /**
   * @description This function will return the latest state of loader
   * @returns current loader state
   */
  async getLoaderState() {
    let loaderState;
    this.showLoader$.subscribe((state) => {
        loaderState = state;
    });
    this.logService.log('in get loader state --->', loaderState);
    LoaderFlag.next(loaderState.showLoader);
    return loaderState.showLoader;
  }

}
