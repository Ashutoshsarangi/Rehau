import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
export class Badges {
    componentWillLoad() {
        this.breadcrumbsArray = this.history.location.pathname.split('/').slice(1);
    }
    navigateTo(event) {
        if (event.detail !== null) {
            if (event.detail > 0) {
                this.history.push(`${Environment.basePathWeb}/ui-showcase/${this.breadcrumbsArray[event.detail]}`);
            }
            else if (event.detail === 0) {
                this.history.push(`${Environment.basePathWeb}/${this.breadcrumbsArray[0]}`);
            }
        }
        else {
            this.history.push(`${Environment.basePathWeb}/ui-showcase`);
        }
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-breadcrumbs", { breadcrumbs: this.breadcrumbsArray, onGoBack: (event) => this.navigateTo(event), onGoBackTo: (event) => this.navigateTo(event) }),
            h("rh-divider", { logoText: true, padding: true, text: 'badge for Warning' }),
            h("rh-badges", { badgetitle: "warning", badgeBgColor: "primary", badgeStatus: "warning" }),
            h("rh-divider", { logoText: true, padding: true, text: 'badge for Report' }),
            h("rh-badges", { badgetitle: "report", badgeStatus: "report", badgeRound: true }),
            h("rh-divider", { logoText: true, padding: true, text: 'badge for disruption' }),
            h("rh-badges", { badgetitle: "disruption", badgeStatus: "disruption" }),
            h("rh-divider", { logoText: true, padding: true, text: 'badge for transparent' }),
            h("rh-badges", { badgetitle: "warning", badgeStatus: "warning", badgeBgColor: "transparent", badgeRound: true })));
    }
    static get is() { return "badges-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["badges.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["badges.page.css"]
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
