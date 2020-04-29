import { h } from "@stencil/core";
export class RhProgressBar {
    constructor() {
        this.progressAmount = "0";
        this.ProgressContentHidden = false;
        this.progressWidth = '234px';
        this.progressHeight = '231px';
    }
    render() {
        const ProgressContainer = {
            'ProgressContainer': true,
        };
        const ProgressInner = {
            'ProgressInner': true,
        };
        const ProgressContent = {
            'ProgressContent': true,
        };
        const ProgressSize = {
            'width': this.progressWidth,
            'height': this.progressHeight,
            'transitionDuration': '0.6s'
        };
        return (h("div", { class: ProgressContainer, style: Object.assign(Object.assign({}, ProgressSize), { background: `conic-gradient(${this.progressColor} ${this.progressAmount}%, 0, transparent ${(100 - parseInt(this.progressAmount)).toString()}%)` }) },
            h("div", { class: ProgressInner },
                h("span", { class: Object.assign(Object.assign({}, ProgressContent), { 'hidden': this.ProgressContentHidden }) }, this.progressAmount))));
    }
    static get is() { return "rh-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-progress-bar.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-progress-bar.molecule.css"]
    }; }
    static get properties() { return {
        "progressAmount": {
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
            "attribute": "progress-amount",
            "reflect": false,
            "defaultValue": "\"0\""
        },
        "progressColor": {
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
            "attribute": "progress-color",
            "reflect": false
        },
        "ProgressContentHidden": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "progress-content-hidden",
            "reflect": false,
            "defaultValue": "false"
        },
        "progressWidth": {
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
            "attribute": "progress-width",
            "reflect": false,
            "defaultValue": "'234px'"
        },
        "progressHeight": {
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
            "attribute": "progress-height",
            "reflect": false,
            "defaultValue": "'231px'"
        }
    }; }
}
