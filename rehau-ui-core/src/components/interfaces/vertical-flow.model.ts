export enum StatusClaimTrackingEnum {
  Blocked = 0,
  Progress = 1,
  Completed = 2
}

export class ClaimTrackingModel {
  public id: number;
  public label: string;
  public status: StatusClaimTrackingEnum;
  public description: string;
  public text: string;
  public date: string;
  public readMore: boolean;
  public readTapped: boolean;
  public readMoreString: string;
}
