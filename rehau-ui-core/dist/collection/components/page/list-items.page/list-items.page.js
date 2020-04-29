import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';
export class ListItemms {
    constructor() {
        this.listItem3 = [
            {
                title: 'l/min'
            },
            {
                title: 'l/h'
            },
            {
                title: 'm³/h'
            }
        ];
        this.basicListItem = [
            {
                title: 'Item - 1'
            },
            {
                title: 'Item - 2'
            },
            {
                title: 'Item - 3'
            },
            {
                title: 'Item - 4',
                subtitle: 'Subtitle - 1'
            },
        ];
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
        logger.consoleLog(ev);
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-breadcrumbs", { breadcrumbs: this.breadcrumbsArray, onGoBack: (event) => this.navigateTo(event), onGoBackTo: (event) => this.navigateTo(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '06.03.08 List with Title' }),
            h("rh-list-item", { itemList: this.basicListItem, onCheckEvent: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '06.03.08 List with Title and Subtitle' }),
            h("rh-list-item-check", { itemList: this.listItem3, onCheckEvent: (event) => this.checkEvent(event) })));
    }
    static get is() { return "list-items"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["list-items.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["list-items.page.css"]
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
