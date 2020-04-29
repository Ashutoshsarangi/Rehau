export interface OnBoardingModel {
  title: string;
  subtitle: string;
  Icon: string;
  previousBtnName?: string;
  nextButtonName: string;
  progress?: boolean;
  deviceAdd?: boolean;
  deviceName?: string;
  active?: boolean;
  goNext?: boolean;
  goPrev?: boolean;
}