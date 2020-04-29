import { h } from "@stencil/core";
export class RhBadges {
    constructor() {
        this.badgeRound = false;
    }
    selectedChecked(event) {
        this.checked.emit(event);
    }
    render() {
        const badgeStyle = {
            background: this.badgeBgColor === 'primary' || this.badgeStatus === 'warning' || this.badgeStatus === 'disruption'
                ? 'var(--primaryColor, $primaryColor)'
                : this.badgeBgColor === 'secondary'
                    ? 'var(--secondaryColor, $secondaryColor)'
                    : this.badgeBgColor === 'tertiary' || this.badgeStatus === 'report'
                        ? '#ff9500'
                        : this.badgeBgColor === 'transparent' || this.badgeBgColor === 'transparent'
                            ? 'transparent !important'
                            : this.badgeBgColor
        };
        const badgeClass = {
            'badge': true,
            'badgeRound': this.badgeRound,
            'badge-transparent': !this.badgeBgColor && !this.badgeStatus || this.badgeBgColor === 'transparent'
        };
        return (h("div", null,
            h("div", { class: 'col no-padding no-margin badgde-align' },
                h("div", { style: badgeStyle, class: badgeClass, onClick: (event) => this.selectedChecked(event) }, this.badgetitle))));
    }
    static get is() { return "rh-badges"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-badges.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-badges.molecule.css"]
    }; }
    static get properties() { return {
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
        "badgeRound": {
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
            "attribute": "badge-round",
            "reflect": false,
            "defaultValue": "false"
        }
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
        }]; }
}
