export declare enum StatusClaimTrackingEnum {
    Blocked = 0,
    Progress = 1,
    Completed = 2
}
export declare class ClaimTrackingModel {
    id: number;
    label: string;
    status: StatusClaimTrackingEnum;
    description: string;
    text: string;
    date: string;
    readMore: boolean;
    readTapped: boolean;
    readMoreString: string;
}
