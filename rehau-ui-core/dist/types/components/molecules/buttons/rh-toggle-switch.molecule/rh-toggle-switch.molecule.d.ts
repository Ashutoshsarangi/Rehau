export declare class RhToggleSwitchMolecule {
    leftText: string;
    rightText: string;
    disabled: boolean;
    checked: boolean;
    border: boolean;
    containerSize1: number;
    private switchField1;
    containerSize2: number;
    private switchField2;
    private maxwidth;
    private switchwidth;
    private switchClick;
    componentDidLoad(): void;
    componentDidRender(): void;
    componentDidUpdate(): void;
    private resize;
    fire(event: any, temp: string): void;
    render(): any;
}
