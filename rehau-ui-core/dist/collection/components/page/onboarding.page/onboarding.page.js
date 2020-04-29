import { h } from "@stencil/core";
export class Onboarding {
    constructor() {
        this.goBack = false;
        this.onBoardingElements = [
            {
                title: 'Welcome',
                subtitle: 'At the moment there is no device installed. Follow the steps to start up the RE.GUARD system.',
                Icon: 'step-icon icon-rz-willkommen',
                previousBtnName: 'Logout',
                nextButtonName: 'Next',
                active: true,
                goNext: false,
                goPrev: false,
            },
            {
                title: 'Step 1',
                subtitle: 'Connect the RE.HUB to your router using the included network cable. Remove the back cover of the RE.HUB by sliding it downwards.',
                Icon: 'step-icon icon-rz-schritt-3-0',
                previousBtnName: 'Back',
                nextButtonName: 'Next',
                goNext: false,
                goPrev: false
            },
        ];
    }
    changeFlag() {
        this.goBack = true;
    }
    testEvent(event) {
        console.log(event);
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-divider", { logoText: true, padding: true, text: '06.03.08 Onboarding pages' }),
            h("rh-onboarding", { boardingSteps: this.onBoardingElements, activeIndex: "next-0", progressValue: '-1', onNextAction: (event) => this.testEvent(event) })));
    }
    static get is() { return "onboarding-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["onboarding.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["onboarding.page.css"]
    }; }
    static get properties() { return {
        "history": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "RouterHistory",
                "resolved": "RouterHistory",
                "references": {
                    "RouterHistory": {
                        "location": "import",
                        "path": "@stencil/router"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
}
