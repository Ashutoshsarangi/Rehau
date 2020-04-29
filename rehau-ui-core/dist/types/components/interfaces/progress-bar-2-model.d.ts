export interface ValueProgress {
    value: number;
    label: string;
    color: string;
}
export interface MilestoneValue {
    label: string;
    info?: string;
    id: number;
    value: number;
}
export interface MilestoneDate {
    label: string;
    info?: string;
    id: number;
    date: string;
}
export interface GlobalMilestone {
    milestone: Array<MilestoneValue> | Array<MilestoneDate>;
    valueProgress: Array<ValueProgress>;
}
export interface WidthArray {
    step: number;
    width: number;
    color: string;
    position: number;
    label: string;
    roundWidth: number;
}
export interface NumberArray {
    step: number;
    position: number;
    value?: any;
    label?: string;
}
