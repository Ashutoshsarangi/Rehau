import { h } from "@stencil/core";
import * as platform from '../../../../utils/platform-utils';
export class RhPrimaryButtonMolecule {
    constructor() {
        this.disabled = false;
        this.ctabutton = false;
        this.secondary = false;
        this.standard = false;
        this.iconbutton = false;
        this.iconsecondary = false;
        this.transparentbutton = false;
        this.isMouseHover = false;
    }
    mouseOver() {
        this.isMouseHover = !platform.isPlatform('ios') && !platform.isPlatform('android');
    }
    fire(event) {
        this.buttonClicked.emit(event);
    }
    componentDidRender() {
        this.mouseOver();
    }
    render() {
        const divClass = {
            'rect-button': true,
        };
        const styles = {
            'color': this.color,
            'background-color': this.bgcolor
        };
        const buttonClass = {
            'transparentbutton': this.transparentbutton,
            'cta-btn button': this.ctabutton,
            'secondary-btn button': this.secondary,
            'standard-btn button': this.standard,
            'icon-btn button': this.iconbutton,
            'icon-secondary-btn button': this.iconsecondary,
            'disabled': this.disabled
        };
        return (h("div", { class: divClass, style: { 'box-sizing': 'border-box' } },
            h("button", { style: styles, disabled: this.disabled, class: buttonClass, onClick: (event) => this.fire(event) },
                h("label", { class: 'text-button-custom text-wrap' }, this.text),
                h("span", { class: this.icon + ' icon' }))));
    }
    static get is() { return "rh-primary-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-primary-button.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-primary-button.molecule.css"]
    }; }
    static get properties() { return {
        "text": {
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
            "attribute": "text",
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
        "ctabutton": {
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
            "attribute": "ctabutton",
            "reflect": false,
            "defaultValue": "false"
        },
        "secondary": {
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
            "attribute": "secondary",
            "reflect": false,
            "defaultValue": "false"
        },
        "standard": {
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
            "attribute": "standard",
            "reflect": false,
            "defaultValue": "false"
        },
        "iconbutton": {
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
            "attribute": "iconbutton",
            "reflect": false,
            "defaultValue": "false"
        },
        "iconsecondary": {
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
            "attribute": "iconsecondary",
            "reflect": false,
            "defaultValue": "false"
        },
        "transparentbutton": {
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
            "attribute": "transparentbutton",
            "reflect": false,
            "defaultValue": "false"
        },
        "icon": {
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
            "attribute": "icon",
            "reflect": false
        },
        "color": {
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
            "attribute": "color",
            "reflect": false
        },
        "bgcolor": {
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
            "attribute": "bgcolor",
            "reflect": false
        }
    }; }
    static get states() { return {
        "isMouseHover": {}
    }; }
    static get events() { return [{
            "method": "buttonClicked",
            "name": "buttonClicked",
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
}
