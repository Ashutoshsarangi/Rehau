import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
export class CardPage {
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
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-divider", { logoText: true, padding: true, text: '06.03.08 Cards pages' }),
            h("rh-card", { cardtitle: "Amount", cardsubtitle: "METER\u00B3" })));
    }
    static get is() { return "card-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["card.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["card.page.css"]
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
