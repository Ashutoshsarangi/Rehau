

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { onBoardingNextStep } from './stores/onboarding-steps/action/onboarding-step.actions';

@Injectable({
  providedIn: 'root'
})
export class RehauFunctionalCoreService {

  onBoardingData$: Observable<any[]>;
  constructor(private store: Store<{ onBoardingData: any[] }>) {
    this.onBoardingData$ = store.pipe(select('onBoardingData'));
  }


  showSuccess() {
    this.onBoardingData$.subscribe((data) => {
      console.log('this is list of onBoardings from App.component -->', data);
    });
    this.store.dispatch(onBoardingNextStep({ payload: { configPosition: 6 } }));
  }
}
