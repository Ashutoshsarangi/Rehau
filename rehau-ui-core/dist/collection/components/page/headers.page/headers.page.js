import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';
export class HeadersPage {
    constructor() {
        this.flag = false;
    }
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
    checkEvent(ev) {
        logger.consoleLog('Back Button', ev);
    }
    clickEvent(ev) {
        logger.consoleLog('Right Side Button', ev);
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-breadcrumbs", { breadcrumbs: this.breadcrumbsArray, onGoBack: (event) => this.navigateTo(event), onGoBackTo: (event) => this.navigateTo(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '05.04.02 Header' }),
            h("rh-header", { headertitle: "My Home", subtitle: "Subtitle" }),
            h("rh-divider", { logoText: true, padding: true, text: '05.04.02 Offline Header' }),
            h("rh-header", { headertitle: "My Home", subtitle: "Leakage detected! protection active", deviceOnline: this.flag, badgetitle: "warning", badgeActive: true, badgeBgColor: "primary" }),
            h("rh-divider", { logoText: true, padding: true, text: '05.04.02 Header' }),
            h("rh-header", { headertitle: "Title" }),
            h("rh-divider", { logoText: true, padding: true, text: '05.04.02 Header for inner pages' }),
            h("rh-header", { headertitle: "Title", innerpageheader: true, onBackButtonAction: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '05.04.02 Header with menu' }),
            h("rh-header", { headertitle: "Title", innerpageheader: true, righticon: true, onBackButtonAction: (event) => this.checkEvent(event), onButtonAction: (event) => this.clickEvent(event) })));
    }
    static get is() { return "headers-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["headers.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["headers.page.css"]
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
