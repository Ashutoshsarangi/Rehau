export declare class RhPrimaryButtonMolecule {
    text: string;
    disabled: boolean;
    ctabutton: boolean;
    secondary: boolean;
    standard: boolean;
    iconbutton: boolean;
    iconsecondary: boolean;
    transparentbutton: boolean;
    icon: string;
    color: string;
    bgcolor: string;
    private buttonClicked;
    isMouseHover: boolean;
    mouseOver(): void;
    fire(event: any): void;
    componentDidRender(): void;
    render(): any;
}
