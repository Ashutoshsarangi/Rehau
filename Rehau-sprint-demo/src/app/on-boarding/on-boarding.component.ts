import { Component, OnInit } from '@angular/core';
import { LogService, slideInAnimation, OnBoardingService } from 'rehau-functional-core/dist/rehau-functional-core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';


@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss']
})

export class OnBoardingComponent implements OnInit {

  isOnline: boolean;
  navLinks: any[];
  activeLinkIndex = -1;
  animationState: number;
  tabSelectedIndex = 0;
  goBack = false;
  onBoardingElements: any = [];
  tempActive;
  progressValue = '-1';


  constructor(
    private router: Router,
    private logService: LogService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private onBoardingService: OnBoardingService,
    private route: ActivatedRoute,
    private translationService: TranslationService
  ) {
    this.tempActive = '';
    this.matIconRegistry.addSvgIcon(
      'icon1',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/banner/410-d-062-cl.jpg')
    );
    this.navLinks = [
      {
        label: 'Home',
        link: './home',
        icon: 'icon-home',
        iconActive: 'icon-home-filled',
        index: 0
      }, {
        label: 'Notification',
        link: './notification',
        icon: 'icon-notification',
        iconActive: 'icon-notification-fill',
        index: 1
      }, {
        label: 'Settings',
        link: './settings',
        icon: 'icon-settings',
        iconActive: 'icon-settings-filled',
        index: 2
      },
    ];
    this.onBoardingElements = [
      {
        title: 'Welcome',
        subtitle: 'At the moment there is no device installed. Follow the steps to start up the RE.GUARD system.',
        Icon: 'step-icon icon-rz-willkommen',
        previousBtnName: 'Logout',
        nextButtonName: 'Next',
        active: true,
        goNext: false,
        goPrev: false,
      },
      {
        title: 'Step 1',
        subtitle: `Connect the RE.HUB to your router using the included network cable. Remove the
        back cover of the RE.HUB by sliding it downwards.`,
        Icon: 'step-icon icon-rz-schritt-3-0',
        previousBtnName: 'Back',
        nextButtonName: 'Next',
        goNext: false,
        goPrev: false

      },
      {
        title: 'Step 2',
        subtitle: 'Now connect the RE.HUB to the mains with the power supply unit.',
        Icon: 'step-icon icon-rz-schritt-2-0',
        previousBtnName: 'Back',
        nextButtonName: 'Next',
        goNext: false,
        goPrev: false
      },
      {
        title: 'Step 3',
        subtitle: 'Connect the RE.GUARD to the mains and make sure that the RE.HUB is within radio range.',
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
    this.logService.log('in reusabele component');
  }
  ngOnInit() {
    if (this.router.url === '/landing?reload=') {
      this.isOnline = true;
    }
    this.router.events.subscribe((res) => {
      this.isOnline = false;
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  /**
   * @description Function to update the active tab index
   * @param data is the object of selected tab
   */
  handleSelect(data) {
    this.tabSelectedIndex = this.navLinks.indexOf(data);
  }

  doChange() {
    setTimeout(() => {
      this.logService.log('HEllo');
      this.goBack = true;
    }, 2000);
  }

  /**
   * @description Function to call the functional core action to handle the next click of on-bording
   * @param event object of cuurent page
   */
  async testNextClick(event) {
    console.log('Hey I am Next Click 4444444', event.detail);

    const index = this.onBoardingElements.indexOf(event.detail);
    const currentPageTitle = this.onBoardingElements[index].title;
    let nextPageTitle = '';
    let prevPageTitle = '';
    if (currentPageTitle === 'Setup complete!') {
      this.router.navigate(['/landing']);
    } else {
      if (this.onBoardingElements.length < (index + 1)) {
        console.log('index', index);
        nextPageTitle = this.onBoardingElements[index + 1].title;
      }
      if ((index - 1) >= 0) {
        prevPageTitle = this.onBoardingElements[index - 1].title;
      }
      if (event.detail.progress) {
        let i = 1;
        const intval = setInterval(() => {
          if (i <= 5) {
            this.progressValue = (20 * i).toString();
          }
          i++;
        }, 300);
        if (i % 5 === 0) {
          console.log('Hey Got Called');
          clearInterval(intval);
        }
      }

      try {
        this.logService.log_w('wait for 5 sec');
        const actionRes = await this.onBoardingService.nextClickActionHandler(currentPageTitle, nextPageTitle, prevPageTitle);
        this.logService.log('success after 5 sec', actionRes);
        this.tempActive = 'next-' + index;
      } catch (err) {
        this.logService.log_e('error in functional core action');
      }
    }

  }

  /**
   * @description Function to call the functional core action to handle the prev click of on-bording
   * @param event object of cuurent page
   */
  async testPrevClick(event) {
    console.log('Hey I am Prev Click 5555555');

    // console.log(event.detail);
    const index = this.onBoardingElements.indexOf(event.detail);
    const currentPageTitle = this.onBoardingElements[index].title;
    let nextPageTitle = '';
    let prevPageTitle = '';
    this.logService.log('currentPAge title', this.onBoardingElements[index].title);
    if (currentPageTitle === 'Welcome') {
      this.router.navigate(['/landing']);
    } else {
      if (this.onBoardingElements.length < (index + 1)) {
        this.logService.log('next page title', this.onBoardingElements[index + 1].title);
        nextPageTitle = this.onBoardingElements[index + 1].title;
      }

      if ((index - 1) >= 0) {
        this.logService.log('prev page title', this.onBoardingElements[index - 1].title);
        prevPageTitle = this.onBoardingElements[index - 1].title;
      }

      try {
        this.logService.log_w('wait for 5 sec');
        const actionRes = await this.onBoardingService.prevClickActionHandler(currentPageTitle, nextPageTitle, prevPageTitle);
        this.logService.log('success after 5 sec', actionRes);
        this.tempActive = 'prev-' + index;
      } catch (err) {
        this.logService.log_e('error in functional core action');
      }
    }

  }

  addSensor(event) {
    console.log('This is add Sensor Event Handler', event);
  }
}
