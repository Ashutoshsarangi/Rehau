import { h } from "@stencil/core";
export class RhHeaderMolecule {
    constructor() {
        this.innerpageheader = false;
        this.backicon = false;
        this.righticon = false;
        this.deviceOnline = true;
    }
    selectedChecked(event) {
        this.checked.emit(event);
    }
    selectedClicked(event) {
        this.trigger.emit(event);
    }
    render() {
        // const headerClass: { [s: string]: boolean } = {
        //   'innerpageheader': this.innerpageheader
        // };
        const rightIconClass = {
            'righticon': this.righticon,
            'hidden': !this.righticon
        };
        const onlineClass = {
            'navbar': true,
            'innerpageheader': this.innerpageheader,
            'offline-navbar': !this.deviceOnline
        };
        return (h("div", null,
            h("nav", { class: onlineClass },
                h("rh-icon", { class: 'icon', name: 'icon-next up', color: 'var(--quaternaryColor, $quaternaryColor)', onClick: (event) => this.selectedChecked(event), size: '28px' }),
                h("div", { class: "navbar-wrapper" },
                    h("div", { class: "title-wrapper" },
                        h("span", { class: "title" }, this.headertitle),
                        this.badgeActive && (h("div", { class: 'col no-padding no-margin badgde-align' },
                            h("rh-badges", { badgetitle: this.badgetitle, badgeBgColor: this.badgeBgColor, badgeStatus: this.badgeStatus, onClick: (event) => this.selectedChecked(event), class: "header-badge" })))),
                    h("span", { class: "subtitle" }, this.subtitle)),
                h("rh-primary-button", { class: rightIconClass, id: 'rh-primary-button_12', icon: "icon-plus", iconsecondary: true, onButtonClicked: (event) => this.selectedClicked(event) }))));
    }
    static get is() { return "rh-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-header.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-header.molecule.css"]
    }; }
    static get properties() { return {
        "headertitle": {
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
            "attribute": "headertitle",
            "reflect": false
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
        "innerpageheader": {
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
            "attribute": "innerpageheader",
            "reflect": false,
            "defaultValue": "false"
        },
        "backicon": {
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
            "attribute": "backicon",
            "reflect": false,
            "defaultValue": "false"
        },
        "righticon": {
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
            "attribute": "righticon",
            "reflect": false,
            "defaultValue": "false"
        },
        "badgetitle": {
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
            "attribute": "badgetitle",
            "reflect": false
        },
        "badgeActive": {
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
            "attribute": "badge-active",
            "reflect": false
        },
        "badgeBgColor": {
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
            "attribute": "badge-bg-color",
            "reflect": false
        },
        "badgeStatus": {
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
            "attribute": "badge-status",
            "reflect": false
        },
        "deviceOnline": {
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
            "attribute": "device-online",
            "reflect": false,
            "defaultValue": "true"
        }
    }; }
    static get events() { return [{
            "method": "checked",
            "name": "backButtonAction",
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
            "method": "trigger",
            "name": "buttonAction",
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
