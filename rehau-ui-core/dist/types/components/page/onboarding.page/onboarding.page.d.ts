import { RouterHistory } from '@stencil/router';
import { OnBoardingModel } from '../../interfaces/on-boarding-model';
export declare class Onboarding {
    history: RouterHistory;
    goBack: boolean;
    onBoardingElements: Array<OnBoardingModel>;
    changeFlag(): void;
    testEvent(event: any): void;
    render(): any;
}
