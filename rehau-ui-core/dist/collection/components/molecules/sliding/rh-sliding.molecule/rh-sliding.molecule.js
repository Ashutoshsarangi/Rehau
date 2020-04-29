import { h } from "@stencil/core";
import Hammer from 'hammerjs';
export class RhSlidingMolecule {
    constructor() {
        this.buttonsWidth = 0;
        this.messageDeltaX = 0;
        this.previousSliderDeltaX = 0;
    }
    componentDidLoad() {
        this.customHammerManager = new Hammer.Manager(this.slider, {
            recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_ALL }]]
        });
        this.customHammerManager.on('panstart', (event) => {
            this.isMoving = true;
            if (this.element.parentElement)
                this.element.parentElement.querySelectorAll('rh-sliding').forEach((value) => { if (value !== this.element)
                    value.closeSlider(); });
        });
        this.customHammerManager.on('panmove', (event) => {
            if (event.additionalEvent === 'panleft' || event.additionalEvent === 'panright') {
                this.messageDeltaX = this.previousSliderDeltaX + event.deltaX;
                if (this.messageDeltaX > 0)
                    this.messageDeltaX = 0;
            }
        });
        this.customHammerManager.on('panend', (event) => {
            const buttonsEndingPoint = this.buttonsWidth;
            const currentDeltaX = this.previousSliderDeltaX + event.deltaX;
            this.isMoving = false;
            this.isMovementHappened = true;
            this.messageDeltaX = currentDeltaX < -buttonsEndingPoint / 2 ? -buttonsEndingPoint : 0;
            this.previousSliderDeltaX = this.messageDeltaX;
        });
    }
    componentDidRender() {
        this.buttonsWidth = this.buttons.offsetWidth;
    }
    componentDidUnload() {
        this.customHammerManager.destroy();
    }
    manageStartClickOnMessage() {
        this.isMovementHappened = false;
        if (this.element.parentElement)
            this.element.parentElement.querySelectorAll('rh-sliding').forEach((value) => { if (value !== this.element)
                value.closeSlider(); });
    }
    manageEndClickOnMessage() {
        if (!this.isMovementHappened)
            this.closeSlider();
    }
    closeSlider(immediately) {
        if (immediately)
            this.isMoving = true;
        this.messageDeltaX = 0;
        this.previousSliderDeltaX = 0;
        return new Promise((resolve) => resolve());
    }
    render() {
        const sliderClasses = {
            'col-xs-6 slider-container': true,
            'animated': !this.isMoving,
            'open': !!this.messageDeltaX
        };
        return (h("div", { class: 'grid', title: ' ' },
            h("div", { class: 'row' },
                h("div", { ref: (el) => this.slider = el, class: sliderClasses, style: { left: this.messageDeltaX + 'px' }, onMouseDown: () => this.manageStartClickOnMessage(), onMouseUp: () => this.manageEndClickOnMessage() },
                    h("slot", { name: 'slider' })),
                h("div", { class: 'col-xs-6 buttons-container' },
                    h("div", { class: 'row end-xs', ref: (el) => this.buttons = el, style: { right: this.buttonsWidth + 'px' } },
                        h("slot", { name: 'buttons' }))))));
    }
    static get is() { return "rh-sliding"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-sliding.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-sliding.molecule.css"]
    }; }
    static get states() { return {
        "buttonsWidth": {},
        "messageDeltaX": {},
        "isMoving": {}
    }; }
    static get methods() { return {
        "closeSlider": {
            "complexType": {
                "signature": "(immediately?: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
}
