import { h } from "@stencil/core";
export class AccordianPage {
    constructor() {
        this.accordionElements = [
            {
                id: '0',
                accordTitle: "Leckageschutz",
                subtitle: "Rohrbruch festgestellt",
                label: "12:23",
                content: "Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3Hey 3",
                badgetitle: 'Error',
                badgeActive: true,
                badgeStatus: "warning",
                badgeBgColor: 'primary',
            },
            {
                id: '1',
                accordTitle: "Wassermelder",
                subtitle: "Rohrbruch festgestellt",
                label: "12:23",
                content: "Hey 2",
                badgetitle: 'warning',
                badgeActive: true,
                badgeStatus: "warning",
                badgeBgColor: 'secondary',
            },
            {
                id: '2',
                accordTitle: "Gateway",
                subtitle: "Verbindungsfehler Wassermelder",
                label: "VOR 2 WOCHEN",
                content: "Hey 3",
                badgetitle: 'Notification',
                badgeActive: true,
                badgeStatus: "report",
                badgeBgColor: 'tertiary',
            }
        ];
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-divider", { logoText: true, padding: true, text: 'Accordian ' }),
            h("rh-accordian", { accordions: this.accordionElements })));
    }
    static get is() { return "accordian-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["accordian.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["accordian.page.css"]
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
