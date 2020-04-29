export declare class RhSlidingMolecule {
    private element;
    private buttonsWidth;
    private messageDeltaX;
    private isMoving;
    private customHammerManager;
    private slider?;
    private buttons?;
    private previousSliderDeltaX;
    private isMovementHappened;
    componentDidLoad(): void;
    componentDidRender(): void;
    componentDidUnload(): void;
    private manageStartClickOnMessage;
    private manageEndClickOnMessage;
    closeSlider(immediately?: boolean): Promise<void>;
    render(): any;
}
