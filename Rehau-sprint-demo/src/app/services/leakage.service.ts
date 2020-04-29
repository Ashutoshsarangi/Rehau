import { Injectable } from '@angular/core';

export interface ILeakageObserver {
  observerId: number;
  onChange(state: boolean);
}

@Injectable({
  providedIn: 'root'
})
export class LeakageService {
  observerId: number;
  private observer: ILeakageObserver[] = [];

  constructor() {}
  isLeakage = false;

  setLeakage(state: boolean) {
    if (this.isLeakage !== state) {
      this.isLeakage = state;
      this.notify();
    }
  }

  notify() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.observer.length; i++) {
      this.observer[i].onChange(this.isLeakage);
    }
  }
  subscribe(observer: ILeakageObserver) {
    console.log(
      'ILeakageObserver::subscribe: First unsubscribe before subscribing'
    );
    this.unsubscribe(observer);
    console.log('ILeakageObserver::subscribe');
    const idx = this.observer.indexOf(observer);
    if (idx === -1) {
      this.observer.push(observer);
      observer.onChange(this.isLeakage);
    }
  }

  unsubscribe(observer: ILeakageObserver) {
    console.log('ILeakageObserver::unSubscribe');
    let idx = -1;
    for (const obs of this.observer) {
      if (obs.observerId === observer.observerId) {
        idx = this.observer.indexOf(obs);
      }
    }
    if (idx !== -1) {
      this.observer.splice(idx, 1);
    }
  }
}
