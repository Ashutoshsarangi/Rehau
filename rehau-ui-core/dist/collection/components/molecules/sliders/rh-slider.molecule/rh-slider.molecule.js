import { h } from "@stencil/core";
export class RhSliderMolecule {
    constructor() {
        this.steps = [];
    }
    render() {
        const backgroundColor = {
            'background-color': this.colorBg === 'transparent' ? 'transparent' : this.colorBg === 'grey' ? '#EBEBEB' : '#FFFFFF'
        };
        return (h("div", { class: this.padding ? 'shape-padding' : '', style: backgroundColor },
            h("div", { class: 'grid steps-grid' },
                h("div", { class: 'row middle-xs line-row' },
                    h("div", { class: 'step-point col-xs-auto no-padding' + (this.steps[0].active ? ' active' : '') }),
                    this.steps
                        .slice(1)
                        .map((step) => [
                        h("div", { class: 'step-line col-xs no-padding' + (step.active ? ' active' : '') }),
                        h("div", { class: 'step-point col-xs-auto no-padding' + (step.active ? ' active' : '') })
                    ])),
                h("div", { class: 'row middle-xs texts-row' }, this.steps.map((step, index, list) => [
                    h("div", { class: 'col-xs no-padding', style: { left: this.generateLeftDistance(index, list) } }, step.statustext ? step.text : '')
                ])))));
    }
    generateLeftDistance(index, list) {
        const dinamicMultiplier = -100 / ((list.length - 1) * 2);
        const dinamicPixelDistance = list.length / 2;
        if (index === 0 || index === list.length - 1)
            return index * dinamicMultiplier + '%';
        else
            return 'calc(' + index * dinamicMultiplier + '% + ' + (dinamicPixelDistance - index) + 'px)';
    }
    static get is() { return "rh-slider"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-slider.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-slider.molecule.css"]
    }; }
    static get properties() { return {
        "steps": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<any>",
                "resolved": "any[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "padding": {
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
            "attribute": "padding",
            "reflect": false
        },
        "colorBg": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string | 'transparent' | 'grey' | 'white'",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "color-bg",
            "reflect": false
        }
    }; }
}
