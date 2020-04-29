import { Component, AfterViewInit } from '@angular/core';
import { CacheService, StoreService, AuthService, slideInAnimation, OnBoardingService, TranslationService } from 'rehau-functional-core';
import { LogService } from 'rehau-functional-core';
import { Router } from '@angular/router';
import { LoaderFlag } from 'rehau-functional-core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getDefaultService } from 'selenium-webdriver/edge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'rehau-functional-core-testing';
  showLoader: boolean;
  test: any;
  showLoader$: Observable<boolean>;
  onBoardingElements = [
    {
      title: 'Welcome',
      subtitle: '1-subtitle',
      Icon: 'step-icon icon-rz-willkommen',
      previousBtnName: 'Logout',
      nextButtonName: 'Next',
      active: true,
      goNext: false,
      goPrev: false,
    },
    {
      title: 'Step 1',
      subtitle: `1-subtitle`,
      Icon: 'step-icon icon-rz-schritt-3-0',
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false

    },
    {
      title: 'Step 2',
      subtitle: '1-subtitle',
      Icon: 'step-icon icon-rz-schritt-2-0',
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false
    },
    {
      title: 'Step 3',
      subtitle: '1-subtitle',
      Icon: 'step-icon icon-rz-schritt-1-0',
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false
    },
    {
      title: 'Step 4',
      Icon: `step-icon icon-rz-schritt-4-0`,
      subtitle: `Make sure RE.GUARD and RE.HUB are switched on and an internet connection is available. Please
    wait about 5 minutes until the RE.HUB is ready for the setup.`,
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false
    },
    {
      title: 'Step 5',
      Icon: `step-icon icon-rz-schritt-5-1`,
      subtitle: `Scan the QR code on the back of the RE.HUB.`,
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false
    },
    {
      title: 'Step 6',
      Icon: `step-icon icon-rz-schritt-6-0`,
      subtitle: `Press and hold the pairing button on the RE.GUARD for 3 seconds until it flashes white. Then
    press next.`,
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false
    },
    {
      title: 'Step 6',
      Icon: `step-icon icon-rz-schritt-6-1 progress-icon`,
      progress: true,
      subtitle: `Establishing connection between RE.HUB and RE.GUARD.`,
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false,
    },
    {
      title: 'Step 6',
      Icon: `step-icon icon-rz-schritt-5-2`,
      subtitle: `Connection between RE.HUB and RE.GUARD successfully established.`,
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false
    },
    {
      title: 'Step 7',
      Icon: `step-icon icon-rz-schritt-7-0`,
      subtitle: `Would you like to add a water sensor now or complete the installation?`,
      previousBtnName: 'Back',
      nextButtonName: 'Finish',
      deviceName: 'Water Sensor',
      goNext: false,
      goPrev: false
    },
    {
      title: 'Step 8',
      Icon: `step-icon icon-rz-schritt-1-0`,
      subtitle: `Your RE.GUARD could now be installed in your water supply by your installer and reconnected to the mains
    afterwards.`,
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false
    },
    {
      title: 'Setup complete!',
      Icon: `step-icon icon-rz-abschluss`,
      subtitle: '',
      nextButtonName: 'Here we go',
      goNext: false,
      goPrev: false
    }
  ];

  constructor(
    private cacheService: CacheService,
    private logService: LogService,
    private storeService: StoreService,
    private authService: AuthService,
    private router: Router,
    private onBoardingService: OnBoardingService,
    private translationService: TranslationService,
    private store: Store<{ loaderState: boolean }>,
  ) {
    this.getUser();

    this.showLoader$ = store.pipe(select('loaderState'));
    this.logService.log('showLoader$', this.showLoader$);

    // this.test = this.storeService.getLoaderState();
    this.logService.log('Loader flag', LoaderFlag);
    let temp = [];
    this.translationService.get('init').subscribe((text: string) => {
      this.translationService.instant('1-subtitle').subscribe((data) => {
        console.log('Hey Now I came as Observable', data);
        temp = data;
      });
      this.translationService.instantObject(this.onBoardingElements).subscribe((data) => {
        console.log('Now I am also from Observable', data);
      });
    });

    // this will suscribe the loader event if loader flag is changed anywhere in the app
    LoaderFlag.subscribe((data: any) => {
      this.showLoader = data;
      this.logService.log('showloder updated', this.showLoader);
    });

    try {
      this.authService.isLoggedIn().then(isLoggedIn => {
        this.logService.log('User exist or not', isLoggedIn);
        if (isLoggedIn) {
          this.logService.log('Already logged in user!!!');
          this.router.navigate(['/landing']);
        } else {
          this.logService.log_w('Please do login to continue...');
        }
      });
    } catch (err) {
      this.logService.log_e('Error occured in isLoggedIn method');
    }
    this.cacheService.setLocalData('Data', { Name: 'ASDF', age: 12345 });
    this.logService.log(this.cacheService.getLocalData('Data'));
    // this.storeService.dispatchUserData({ access_token: '123121', refresh_token: 'dasda' });
    this.storeService.userData$.subscribe((data) => {
      this.logService.log('Hey I am Using In Side Test Application ,', data);
    });
    this.logService.log('Normal concole');
    this.logService.log_e('Error console');
    this.logService.log_d('Debug console');
    this.logService.log_w('Warning console');

    // this.logService.log('Hey Using Translation--> ', this.translateService.getBrowserLang());
    this.router.navigate(['/landing']);
  }

  async nextClick() {
    console.log('wait for 5 sec');
    await this.onBoardingService.nextClickActionHandler('jhsvdc', 'jhsd', 'dweds');
    console.log('after 5 sec');
  }

  async prevClick() {
    console.log('wait for 5 sec');
    await this.onBoardingService.prevClickActionHandler('jhsvdc', 'jhsd', 'dweds');
    console.log('after 5 sec');
  }

  async getUser() {
    const userInfo = await this.authService.getCorrelationId();
    this.logService.log('userInfo from functional core', userInfo);
  }
}
