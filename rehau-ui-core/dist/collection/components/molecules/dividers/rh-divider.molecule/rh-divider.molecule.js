import { h } from "@stencil/core";
export class RhDividerMolecule {
    selectedChecked(event) {
        this.checked.emit(event);
    }
    render() {
        const mainClasses = {
            'main-container grid': true,
            'shape-padding': this.padding,
            'small': !this.bigSize && !this.text,
            'large': this.bigSize && !this.text
        };
        const hrDiv = {
            'line': true,
            'no-background': !this.background,
            'small': !this.fullWidth
        };
        return (h("div", null,
            this.logoText && (h("div", { class: mainClasses },
                h("div", { class: 'row middle-xs' },
                    this.text && (h("div", { class: 'col-xs no-padding' },
                        h("label", { class: 'text text-wrap no-margin' }, this.text))),
                    this.icon && (h("div", { class: 'col-xs-auto right-icon no-padding' },
                        h("img", { src: this.icon, onClick: (event) => this.selectedChecked(event) })))))),
            this.hrShow && h("div", { class: hrDiv })));
    }
    static get is() { return "rh-divider"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-divider.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-divider.molecule.css"]
    }; }
    static get properties() { return {
        "logoText": {
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
            "attribute": "logo-text",
            "reflect": false
        },
        "fullWidth": {
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
            "attribute": "full-width",
            "reflect": false
        },
        "bigSize": {
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
            "attribute": "big-size",
            "reflect": false
        },
        "hrShow": {
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
            "attribute": "hr-show",
            "reflect": false
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
        "background": {
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
            "attribute": "background",
            "reflect": false
        },
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
        }
    }; }
    static get events() { return [{
            "method": "checked",
            "name": "checked",
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
}
