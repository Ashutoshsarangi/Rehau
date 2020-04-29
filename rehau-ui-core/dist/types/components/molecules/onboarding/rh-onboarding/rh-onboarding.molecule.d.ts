import { EventEmitter } from '../../../../stencil.core';
import { OnBoardingModel } from '../../../interfaces/on-boarding-model';
export declare class RhOnboarding {
    boardingSteps: Array<OnBoardingModel>;
    activeIndex: string;
    progressValue: string;
    nextAction: EventEmitter<any>;
    prevAction: EventEmitter<any>;
    clickHandle: EventEmitter<any>;
    private containerOnBoard;
    private progressAmount;
    private showProgressBar;
    private tempSameStep;
    private stepValue;
    private stepProgress;
    private carouselFlag;
    private stepCounter;
    disableNext: boolean;
    disablePrev: boolean;
    watchHandler(newValue: string, oldValue: string): void;
    watchHandlerProgressValue(newValue: string, oldValue: string): void;
    private selectNext;
    addSensor(onBoard: OnBoardingModel): void;
    private selectPrev;
    componentDidLoad(): void;
    render(): any;
}
