import { Component, OnInit } from '@angular/core';
import { StoreService, TranslationService } from 'rehau-functional-core';
import { Router } from '@angular/router';
import { delay } from 'q';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
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
  ];
  constructor(
    private storeService: StoreService,
    private router: Router,
    private translationService: TranslationService,
  ) {
    this.setLoaderState();
  }

  /**
   * @description Temporary function to show and hide the loader
   */
  async setLoaderState() {
    this.storeService.dispatchLoaderState(true);
    await delay(5000);
    this.storeService.dispatchLoaderState(false);
    // console.log('Translation Service,  1111111111--> ', this.translationService.instantObject(this.onBoardingElements));
    // this.translationService.instant('1-subtitle').subscribe((data) => {
    //   console.log('Hey Now I came as Observable', data);
    // });
    // this.translationService.instantObject(this.onBoardingElements).subscribe((data) => {
    //   console.log('Now I am also from Observable', data);
    // });

    const temp = await this.translationService.instantObject(this.onBoardingElements);
    console.log('afetr wait --->', temp);
  }
}
