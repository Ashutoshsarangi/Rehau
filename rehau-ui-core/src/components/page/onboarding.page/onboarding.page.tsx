import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { OnBoardingModel } from '../../interfaces/on-boarding-model';


@Component({
  tag: 'onboarding-page',
  styleUrl: 'onboarding.page.scss',
  shadow: true
})
export class Onboarding {
  @Prop() public history: RouterHistory;
  goBack = false;
  public onBoardingElements: Array<OnBoardingModel> = [
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
      subtitle: 'Connect the RE.HUB to your router using the included network cable. Remove the back cover of the RE.HUB by sliding it downwards.',
      Icon: 'step-icon icon-rz-schritt-3-0',
      previousBtnName: 'Back',
      nextButtonName: 'Next',
      goNext: false,
      goPrev: false
    },
    // {
    //   title: 'Step 2',
    //   subtitle: 'Now connect the RE.HUB to the mains with the power supply unit.',
    //   Icon: 'step-icon icon-rz-schritt-2-0',
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Next'
    // },
    // {
    //   title: 'Step 3',
    //   subtitle: 'Connect the RE.GUARD to the mains and make sure that the RE.HUB is within radio range.',
    //   Icon: 'step-icon icon-rz-schritt-1-0',
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Next'
    // },
    // {
    //   title: 'Step 4',
    //   Icon: `step-icon icon-rz-schritt-4-0`,
    //   subtitle: `Make sure RE.GUARD and RE.HUB are switched on and an internet connection is available. Please
    // wait about 5 minutes until the RE.HUB is ready for the setup.`,
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Next'
    // },
    // {
    //   title: 'Step 5',
    //   Icon: `step-icon icon-rz-schritt-5-1`,
    //   subtitle: `Scan the QR code on the back of the RE.HUB.`,
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Next'
    // },
    // {
    //   title: 'Step 6',
    //   Icon: `step-icon icon-rz-schritt-6-0`,
    //   subtitle: `Press and hold the pairing button on the RE.GUARD for 3 seconds until it flashes white. Then
    // press next.`,
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Next'
    // },
    // {
    //   title: 'Step 6',
    //   Icon: `step-icon icon-rz-schritt-6-1 progress-icon`,
    //   progress: true,
    //   subtitle: `Establishing connection between RE.HUB and RE.GUARD.`,
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Next'
    // },
    // {
    //   title: 'Step 6',
    //   Icon: `step-icon icon-rz-schritt-5-2`,
    //   subtitle: `Connection between RE.HUB and RE.GUARD successfully established.`,
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Next'
    // },
    // {
    //   title: 'Step 7',
    //   Icon: `step-icon icon-rz-schritt-7-0`,
    //   subtitle: `Would you like to add a water sensor now or complete the installation?`,
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Finish'
    // },
    // {
    //   title: 'Step 8',
    //   Icon: `step-icon icon-rz-schritt-1-0`,
    //   subtitle: `Your RE.GUARD could now be installed in your water supply by your installer and reconnected to the mains
    // afterwards.`,
    //   previousBtnName: 'Back',
    //   nextButtonName: 'Next'
    // },
    // {
    //   title: 'Setup complete!',
    //   Icon: `step-icon icon-rz-abschluss`,
    //   subtitle: '',
    //   nextButtonName: 'Here we go'
    // }
  ];
  public changeFlag() {
    this.goBack = true;
  }
  public testEvent(event) {
    console.log(event);
  }
  public render(): any {
    return (
      <main class='main-container'>
        <rh-divider logoText={true} padding={true} text='06.03.08 Onboarding pages' />
        <rh-onboarding
          boardingSteps={this.onBoardingElements}
          activeIndex="next-0"
          progressValue='-1'
          onNextAction={(event: any) => this.testEvent(event)}
        />
      </main>
    );
  }
}
