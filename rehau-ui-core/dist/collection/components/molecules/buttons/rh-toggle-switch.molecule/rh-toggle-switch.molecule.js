import { h } from "@stencil/core";
export class RhToggleSwitchMolecule {
    constructor() {
        this.disabled = false;
        this.checked = false;
        this.border = false;
    }
    componentDidLoad() {
        if (!!this.switchField1) {
            this.containerSize1 = this.switchField1.getBoundingClientRect().width;
            this.resize();
        }
        if (!!this.switchField2) {
            this.containerSize2 = this.switchField2.getBoundingClientRect().width;
            this.resize();
        }
    }
    componentDidRender() {
        if (!!this.switchField1) {
            this.containerSize1 = this.switchField1.clientWidth;
            this.resize();
        }
        if (!!this.switchField2) {
            this.containerSize2 = this.switchField2.clientWidth;
            this.resize();
        }
    }
    componentDidUpdate() {
        this.resize();
        // if (window.location.href.indexOf('reload') == -1) {
        //   window.location.replace(window.location.href + '?reload');
        // }
    }
    resize() {
        if (!!this.switchField1) {
            this.containerSize1 = this.switchField1.clientWidth;
        }
        if (!!this.switchField2) {
            this.containerSize2 = this.switchField2.clientWidth;
        }
        if (this.containerSize1 > this.containerSize2) {
            this.maxwidth = this.containerSize1 + "px";
            this.switchwidth = this.containerSize1 + this.containerSize1 + "px";
        }
        else {
            this.maxwidth = this.containerSize2 + "px";
            this.switchwidth = this.containerSize2 + this.containerSize2 + "px";
        }
    }
    fire(event, temp) {
        event.switchClick = temp;
        this.switchClick.emit(event);
    }
    render() {
        const divClass = {
            'rect-button': true,
        };
        const disabled = {
            'disabled': this.disabled
        };
        const styles = {
            'width': this.maxwidth
        };
        const switchstyles = {
            'width': this.switchwidth
        };
        const border = {
            'border': this.border
        };
        const switchClass = {
            'switch': true
        };
        return (h("div", { class: divClass, style: { 'box-sizing': 'border-box' } },
            h("label", { class: Object.assign(Object.assign({}, switchClass), { "border": this.border }), style: switchstyles },
                h("input", { type: "checkbox", checked: this.checked, disabled: this.disabled, class: disabled }),
                h("span", { class: "slider" },
                    h("span", { class: "off", style: styles, ref: (el) => (this.switchField1 = el), onClick: (event) => this.fire(event, 'left') }, this.leftText),
                    h("span", { class: "on", style: styles, ref: (el) => (this.switchField2 = el), onClick: (event) => this.fire(event, 'right') }, this.rightText)))));
    }
    static get is() { return "rh-toggle-switch"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-toggle-switch.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-toggle-switch.molecule.css"]
    }; }
    static get properties() { return {
        "leftText": {
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
            "attribute": "left-text",
            "reflect": false
        },
        "rightText": {
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
            "attribute": "right-text",
            "reflect": false
        },
        "disabled": {
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
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "checked": {
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
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
        },
        "border": {
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
            "attribute": "border",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "containerSize1": {},
        "containerSize2": {}
    }; }
    static get events() { return [{
            "method": "switchClick",
            "name": "switchClick",
            "bubbles": true,
            "cancelable": true,
            "composed": false,
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
    static get listeners() { return [{
            "name": "resize",
            "method": "resize",
            "target": "document",
            "capture": false,
            "passive": true
        }]; }
}
