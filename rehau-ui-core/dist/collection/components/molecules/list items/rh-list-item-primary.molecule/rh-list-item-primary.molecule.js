import { h } from "@stencil/core";
export class RhListItemPrimaryMolecule {
    constructor() {
        this.status = true;
        this.nested = false;
        this.iconRight = true;
    }
    selectedChecked(event) {
        this.checked.emit(event);
    }
    changeValue() {
        this.status = !this.status;
        this.fire.emit(this.status);
    }
    render() {
        const divClass = {
            'shape-padding': this.padding,
            'nested': this.nested,
            'row no-margin': true
        };
        const divStyle = {
            'box-sizing': 'border-box',
            'background-color': this.colorBg === 'transparent' ? 'transparent' : this.colorBg === 'grey' ? '#F0F0F0' : '#FFFFFF'
        };
        const firstLabelDiv = {
            'col-xs main-column no-padding': true,
            'align-one-line': !this.subtitle,
            'title-vertical-centered': !this.subtitle
        };
        const labelStyle = {
            'text-wrap no-padding': true,
            'title': !this.padding,
            'title-with-padding1': this.padding,
        };
        const subtitleClass = {
            'text-wrap no-padding': true,
            'subtitle': !this.padding,
            'subtitle-with-padding': this.padding
        };
        const customToggleStyle = {
            'padding-top': this.togglePaddingTop,
            'margin-right': '12px',
            'display': 'flex',
            'align-items': 'center'
        };
        const rightIconClass = {
            'icon': true
        };
        const atLeastOneSubtitle = !!this.subtitle;
        return (h("div", null,
            h("div", { class: divClass, style: divStyle, onClick: (event) => this.selectedChecked(event) },
                h("div", { class: firstLabelDiv },
                    h("label", { class: labelStyle },
                        this.firstTitle,
                        " ",
                        this.elements && h("span", { class: 'grayElements' },
                            "(",
                            this.elements,
                            ")"),
                        this.subtitle && (h("p", { onClick: (event) => this.selectedChecked(event), class: subtitleClass }, this.subtitle)))),
                this.iconRight && (h("div", { class: 'col-1 no-margin' },
                    h("rh-icon", { class: rightIconClass, onClick: (event) => this.selectedChecked(event), name: this.icon, size: '17px', color: 'var(--nonaryColor, $nonaryColor)' })))),
            h("rh-divider", { padding: false, hrShow: true, background: false, fullWidth: true })));
    }
    static get is() { return "rh-list-item-primary"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-list-item-primary.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-list-item-primary.molecule.css"]
    }; }
    static get properties() { return {
        "status": {
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
            "attribute": "status",
            "reflect": false,
            "defaultValue": "true"
        },
        "nested": {
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
            "attribute": "nested",
            "reflect": false,
            "defaultValue": "false"
        },
        "subtitle": {
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
            "attribute": "subtitle",
            "reflect": false
        },
        "elements": {
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
            "attribute": "elements",
            "reflect": false
        },
        "firstTitle": {
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
            "attribute": "title",
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
        "iconRight": {
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
            "attribute": "icon-right",
            "reflect": false,
            "defaultValue": "true"
        },
        "colorBg": {
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
            "attribute": "color-bg",
            "reflect": false
        }
    }; }
    static get states() { return {
        "togglePaddingTop": {}
    }; }
    static get events() { return [{
            "method": "checked",
            "name": "checkEvent",
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
            "method": "fire",
            "name": "statusUpdate",
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
    static get elementRef() { return "titleElement"; }
}
