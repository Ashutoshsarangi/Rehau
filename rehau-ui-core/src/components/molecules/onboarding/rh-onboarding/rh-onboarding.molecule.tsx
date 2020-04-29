import { Component, h, Prop, Event, EventEmitter, Watch, State } from '@stencil/core';
import { OnBoardingModel } from '../../../interfaces/on-boarding-model';

@Component({
  tag: 'rh-onboarding',
  styleUrl: 'rh-onboarding.molecule.scss',
  shadow: true
})
export class RhOnboarding {


  @Prop() public boardingSteps: Array<OnBoardingModel>;
  @Prop() public activeIndex: string;
  @Prop() public progressValue: string;


  @Event() public nextAction: EventEmitter<any>;
  @Event() public prevAction: EventEmitter<any>;
  @Event() public clickHandle: EventEmitter<any>;
  private containerOnBoard: HTMLElement;
  private progressAmount = '-1';
  private showProgressBar = false;
  private tempSameStep = [];
  private stepValue: number = 0;
  private stepProgress: string = '0';
  private carouselFlag: boolean = false;
  private stepCounter = -1;
  @State() disableNext: boolean = false;
  @State() disablePrev: boolean = false;

  @Watch('activeIndex')
  watchHandler(newValue: string, oldValue: string) {
    const temp = newValue.split('-');
    if (temp[0] == 'next') {
      this.disableNext = false;
      let ind: number = parseInt(temp[1]);
      // this.stepProgress = (parseInt(this.stepProgress) * ind).toString();
      this.boardingSteps[temp[1]].goNext = true;
      this.selectNext(this.boardingSteps[temp[1]]);
    }
    if (temp[0] == 'prev') {
      this.disablePrev = false;
      let ind: number = parseInt(temp[1]);
      if (this.boardingSteps[ind - 1].progress) {
        this.progressAmount = '-1';
        this.showProgressBar = false;
      }
      this.boardingSteps[ind].goPrev = true;
      this.selectPrev(this.boardingSteps[ind]);

    }
  }
  @Watch('progressValue')
  watchHandlerProgressValue(newValue: string, oldValue: string) {
    if (parseInt(newValue) > 0) {
      this.showProgressBar = true;
    }
    this.progressAmount = newValue;
  }



  private selectNext(onBoard: OnBoardingModel, flag: boolean = false): boolean {
    let index = this.boardingSteps.indexOf(onBoard);
    if (flag) {
      this.disableNext = true;
      for (let j = 0; j <= index; j++) {
        this.boardingSteps[j].goNext = false;
        this.boardingSteps[j].goPrev = false;
      }
    } else {
      if (index == this.boardingSteps.length - 2) {
        this.carouselFlag = false;
        this.stepCounter = -1;
      } else {
        this.carouselFlag = true;
      }
      if (this.tempSameStep.indexOf(index + 1) > -1) {
        this.stepProgress = this.stepProgress;
      } else {
        if (this.carouselFlag) {
          this.stepCounter += 1;
          this.stepProgress = (this.stepValue * (this.stepCounter)).toString();
        }
      }
    }
    // }
    if (this.boardingSteps[index].goNext) {
      if (index == this.boardingSteps.length - 1) {
      } else {
        this.boardingSteps[index].active = false;
        this.boardingSteps[index + 1].active = true;
        this.boardingSteps = [...this.boardingSteps];
      }
    } else {
      this.nextAction.emit(onBoard);
      return false;
    }
  }
  addSensor(onBoard: OnBoardingModel) {
    this.clickHandle.emit(onBoard);
  }
  private selectPrev(onBoard: OnBoardingModel, flag: boolean = false): boolean {
    let index = this.boardingSteps.indexOf(onBoard);
    if (flag) {
      this.disablePrev = true;
      for (let j = 0; j <= index; j++) {
        this.boardingSteps[j].goPrev = false;
        this.boardingSteps[j].goNext = false;
      }
    } else {
      if (index == 0 || index == 1) {
        this.carouselFlag = false;
        this.stepCounter = -1;
      } else {
        this.carouselFlag = true;
      }
      if (this.tempSameStep.indexOf(index) > -1) {
        this.stepProgress = this.stepProgress;
      } else {
        if (this.carouselFlag) {
          this.stepCounter -= 1;
          this.stepProgress = (this.stepValue * (this.stepCounter)).toString();
        }
      }
    }
    if (this.boardingSteps[index].goPrev) {
      if (index == 0) {
      } else {
        this.boardingSteps[index].active = false;
        this.boardingSteps[index - 1].active = true;
        this.boardingSteps = [...this.boardingSteps];
      }
    } else {
      this.prevAction.emit(onBoard);
      return false;
    }
  }
  public componentDidLoad(): void {
    let temp: any = {};
    for (let i = 0; i < this.boardingSteps.length; i++) {
      if (temp[this.boardingSteps[i].title]) {
        this.tempSameStep.push(i);
      } else {
        temp[this.boardingSteps[i].title] = 1;
      }
    }
    this.stepValue = (300 / (this.boardingSteps.length - 2 - this.tempSameStep.length));
  }
  public render(): any {

    const NextButtonClass: { [s: string]: boolean } = {
      'step-control step-control-next': true,
    }

    const BackButtonClass: { [s: string]: boolean } = {
      'step-control step-control-prev': true,
    }

    const innerWrapper: { [s: string]: boolean } = {
      'inner-wrapper': true,
    }

    return (
      <div>
        {this.carouselFlag && (
          <div class="inner-wrapper">
            <div class="steps">
              <span class="step-item" style={{ marginLeft: this.stepProgress + 'px' }}></span>
            </div>
          </div>
        )}
        {this.boardingSteps.length > 1 && (
          <div ref={(el: HTMLElement) => (this.containerOnBoard = el)} class="step-container">
            {this.boardingSteps.map((onBoardStep: OnBoardingModel, index: number) => (
              <div class="inner-container">
                {onBoardStep.active && (
                  <div class="inner ">
                    <div class="content">
                      <div id="configuration_steps" class="step slide" data-ride="step" data-interval="false" data-wrap="false" >
                        <div class="inner-wrapper">
                          <div class="step-inner">
                            <div class="step-item step-1 active">
                              <div class="step-caption">
                                <div class="inner-wrapper">
                                  <span class={onBoardStep.Icon}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                                  {onBoardStep.progress && this.showProgressBar && (
                                    <rh-progress-bar
                                      progress-color="var(--secondaryColor, $secondaryColor)"
                                      progress-amount={this.progressAmount}
                                      progress-content-hidden={true}
                                      class="progressBar"
                                    />
                                  )}
                                </div>
                                <div class={{ ...innerWrapper, 'margin-top': onBoardStep.progress }}>
                                  <h3>{onBoardStep.title}</h3>
                                </div>
                                <p class="copy subtitle">{onBoardStep.subtitle}</p>
                                {onBoardStep.deviceName && (
                                  <a class={{ ...NextButtonClass, 'align-center add-device-link': true }} role="button" onClick={() => this.addSensor(onBoardStep)}>
                                    <span class="navigation right">Add {onBoardStep.deviceName}</span>
                                    <span class="icon-next" aria-hidden="true"></span>
                                  </a>
                                )}
                              </div>
                              <ul class="nav nav-tabs fixed-nav" id="myTab" role="tablist">
                                <a class={{ ...BackButtonClass, 'hidden': !onBoardStep.previousBtnName, 'disableClick': this.disablePrev }} role="button" data-slide="prev" onClick={() => this.selectPrev(onBoardStep, true)}>
                                  <span class="icon-next" aria-hidden="true"></span>
                                  <span class="navigation left">{onBoardStep.previousBtnName}</span>
                                </a>
                                <a class={{ ...NextButtonClass, 'align-center': !onBoardStep.previousBtnName, 'disableClick': this.disableNext }} role="button" data-slide="next" onClick={() => this.selectNext(onBoardStep, true)}>
                                  <span class="navigation right">{onBoardStep.nextButtonName}</span>
                                  <span class="icon-next" aria-hidden="true"></span>
                                </a>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
