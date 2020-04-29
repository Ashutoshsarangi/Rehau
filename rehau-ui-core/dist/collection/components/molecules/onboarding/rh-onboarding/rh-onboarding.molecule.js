import { h } from "@stencil/core";
export class RhOnboarding {
    constructor() {
        this.progressAmount = '-1';
        this.showProgressBar = false;
        this.tempSameStep = [];
        this.stepValue = 0;
        this.stepProgress = '0';
        this.carouselFlag = false;
        this.stepCounter = -1;
        this.disableNext = false;
        this.disablePrev = false;
    }
    watchHandler(newValue, oldValue) {
        const temp = newValue.split('-');
        if (temp[0] == 'next') {
            this.disableNext = false;
            let ind = parseInt(temp[1]);
            // this.stepProgress = (parseInt(this.stepProgress) * ind).toString();
            this.boardingSteps[temp[1]].goNext = true;
            this.selectNext(this.boardingSteps[temp[1]]);
        }
        if (temp[0] == 'prev') {
            this.disablePrev = false;
            let ind = parseInt(temp[1]);
            if (this.boardingSteps[ind - 1].progress) {
                this.progressAmount = '-1';
                this.showProgressBar = false;
            }
            this.boardingSteps[ind].goPrev = true;
            this.selectPrev(this.boardingSteps[ind]);
        }
    }
    watchHandlerProgressValue(newValue, oldValue) {
        if (parseInt(newValue) > 0) {
            this.showProgressBar = true;
        }
        this.progressAmount = newValue;
    }
    selectNext(onBoard, flag = false) {
        let index = this.boardingSteps.indexOf(onBoard);
        if (flag) {
            this.disableNext = true;
            for (let j = 0; j <= index; j++) {
                this.boardingSteps[j].goNext = false;
                this.boardingSteps[j].goPrev = false;
            }
        }
        else {
            if (index == this.boardingSteps.length - 2) {
                this.carouselFlag = false;
                this.stepCounter = -1;
            }
            else {
                this.carouselFlag = true;
            }
            if (this.tempSameStep.indexOf(index + 1) > -1) {
                this.stepProgress = this.stepProgress;
            }
            else {
                if (this.carouselFlag) {
                    this.stepCounter += 1;
                    this.stepProgress = (this.stepValue * (this.stepCounter)).toString();
                }
            }
        }
        // }
        if (this.boardingSteps[index].goNext) {
            if (index == this.boardingSteps.length - 1) {
            }
            else {
                this.boardingSteps[index].active = false;
                this.boardingSteps[index + 1].active = true;
                this.boardingSteps = [...this.boardingSteps];
            }
        }
        else {
            this.nextAction.emit(onBoard);
            return false;
        }
    }
    addSensor(onBoard) {
        this.clickHandle.emit(onBoard);
    }
    selectPrev(onBoard, flag = false) {
        let index = this.boardingSteps.indexOf(onBoard);
        if (flag) {
            this.disablePrev = true;
            for (let j = 0; j <= index; j++) {
                this.boardingSteps[j].goPrev = false;
                this.boardingSteps[j].goNext = false;
            }
        }
        else {
            if (index == 0 || index == 1) {
                this.carouselFlag = false;
                this.stepCounter = -1;
            }
            else {
                this.carouselFlag = true;
            }
            if (this.tempSameStep.indexOf(index) > -1) {
                this.stepProgress = this.stepProgress;
            }
            else {
                if (this.carouselFlag) {
                    this.stepCounter -= 1;
                    this.stepProgress = (this.stepValue * (this.stepCounter)).toString();
                }
            }
        }
        if (this.boardingSteps[index].goPrev) {
            if (index == 0) {
            }
            else {
                this.boardingSteps[index].active = false;
                this.boardingSteps[index - 1].active = true;
                this.boardingSteps = [...this.boardingSteps];
            }
        }
        else {
            this.prevAction.emit(onBoard);
            return false;
        }
    }
    componentDidLoad() {
        let temp = {};
        for (let i = 0; i < this.boardingSteps.length; i++) {
            if (temp[this.boardingSteps[i].title]) {
                this.tempSameStep.push(i);
            }
            else {
                temp[this.boardingSteps[i].title] = 1;
            }
        }
        this.stepValue = (300 / (this.boardingSteps.length - 2 - this.tempSameStep.length));
    }
    render() {
        const NextButtonClass = {
            'step-control step-control-next': true,
        };
        const BackButtonClass = {
            'step-control step-control-prev': true,
        };
        const innerWrapper = {
            'inner-wrapper': true,
        };
        return (h("div", null,
            this.carouselFlag && (h("div", { class: "inner-wrapper" },
                h("div", { class: "steps" },
                    h("span", { class: "step-item", style: { marginLeft: this.stepProgress + 'px' } })))),
            this.boardingSteps.length > 1 && (h("div", { ref: (el) => (this.containerOnBoard = el), class: "step-container" }, this.boardingSteps.map((onBoardStep, index) => (h("div", { class: "inner-container" }, onBoardStep.active && (h("div", { class: "inner " },
                h("div", { class: "content" },
                    h("div", { id: "configuration_steps", class: "step slide", "data-ride": "step", "data-interval": "false", "data-wrap": "false" },
                        h("div", { class: "inner-wrapper" },
                            h("div", { class: "step-inner" },
                                h("div", { class: "step-item step-1 active" },
                                    h("div", { class: "step-caption" },
                                        h("div", { class: "inner-wrapper" },
                                            h("span", { class: onBoardStep.Icon },
                                                h("span", { class: "path1" }),
                                                h("span", { class: "path2" }),
                                                h("span", { class: "path3" }),
                                                h("span", { class: "path4" })),
                                            onBoardStep.progress && this.showProgressBar && (h("rh-progress-bar", { "progress-color": "var(--secondaryColor, $secondaryColor)", "progress-amount": this.progressAmount, "progress-content-hidden": true, class: "progressBar" }))),
                                        h("div", { class: Object.assign(Object.assign({}, innerWrapper), { 'margin-top': onBoardStep.progress }) },
                                            h("h3", null, onBoardStep.title)),
                                        h("p", { class: "copy subtitle" }, onBoardStep.subtitle),
                                        onBoardStep.deviceName && (h("a", { class: Object.assign(Object.assign({}, NextButtonClass), { 'align-center add-device-link': true }), role: "button", onClick: () => this.addSensor(onBoardStep) },
                                            h("span", { class: "navigation right" },
                                                "Add ",
                                                onBoardStep.deviceName),
                                            h("span", { class: "icon-next", "aria-hidden": "true" })))),
                                    h("ul", { class: "nav nav-tabs fixed-nav", id: "myTab", role: "tablist" },
                                        h("a", { class: Object.assign(Object.assign({}, BackButtonClass), { 'hidden': !onBoardStep.previousBtnName, 'disableClick': this.disablePrev }), role: "button", "data-slide": "prev", onClick: () => this.selectPrev(onBoardStep, true) },
                                            h("span", { class: "icon-next", "aria-hidden": "true" }),
                                            h("span", { class: "navigation left" }, onBoardStep.previousBtnName)),
                                        h("a", { class: Object.assign(Object.assign({}, NextButtonClass), { 'align-center': !onBoardStep.previousBtnName, 'disableClick': this.disableNext }), role: "button", "data-slide": "next", onClick: () => this.selectNext(onBoardStep, true) },
                                            h("span", { class: "navigation right" }, onBoardStep.nextButtonName),
                                            h("span", { class: "icon-next", "aria-hidden": "true" })))))))))))))))));
    }
    static get is() { return "rh-onboarding"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-onboarding.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-onboarding.molecule.css"]
    }; }
    static get properties() { return {
        "boardingSteps": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<OnBoardingModel>",
                "resolved": "OnBoardingModel[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "OnBoardingModel": {
                        "location": "import",
                        "path": "../../../interfaces/on-boarding-model"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "activeIndex": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "active-index",
            "reflect": false
        },
        "progressValue": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "progress-value",
            "reflect": false
        }
    }; }
    static get states() { return {
        "disableNext": {},
        "disablePrev": {}
    }; }
    static get events() { return [{
            "method": "nextAction",
            "name": "nextAction",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "prevAction",
            "name": "prevAction",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clickHandle",
            "name": "clickHandle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "activeIndex",
            "methodName": "watchHandler"
        }, {
            "propName": "progressValue",
            "methodName": "watchHandlerProgressValue"
        }]; }
}
