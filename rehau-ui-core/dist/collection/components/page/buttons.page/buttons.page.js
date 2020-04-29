import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';
export class ButtonsPage {
    constructor() {
        this.img = `${Environment.assetsBasePath}/img/icons/fruit.jpg`;
        this.contractActions = [
            {
                title: 'Modify contract',
                icon: `${Environment.assetsBasePath}/img/icons/f01-adjust-contract-r.svg`
            },
            {
                title: 'Questions',
                icon: `${Environment.assetsBasePath}/img/icons/g01-ask-question-r.svg`
            },
            {
                title: 'Report a car damage',
                icon: `${Environment.assetsBasePath}/img/icons/f36-policy-documents-r.svg`
            }
        ];
        this.timeArray = [
            {
                title: '1 Day',
                selected: false
            },
            {
                title: '1 Week',
                selected: true
            },
            {
                title: '1 Month',
                selected: false
            },
            {
                title: '1 Year',
                selected: false
            },
            {
                title: '1 Years',
                selected: false
            }
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
            h("rh-divider", { logoText: true, padding: true, text: '04.01.02 Primary Transparent buttons' }),
            h("rh-primary-button", { id: 'rh-primary-button_1', text: 'mehr', icon: "icon-next", transparentbutton: true, disabled: false, onButtonClicked: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '04.01.02 Primary cta buttons' }),
            h("rh-primary-button", { id: 'rh-primary-button_1', text: 'mehr', icon: "icon-next", ctabutton: true, disabled: false, onButtonClicked: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '04.01.02 Secondary buttons' }),
            h("rh-primary-button", { id: 'rh-primary-button_9', text: 'mehr', secondary: true, icon: "icon-settings", disabled: false, onButtonClicked: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '02.01 standard buttons' }),
            h("rh-primary-button", { id: 'rh-primary-button_10', text: 'mehr', standard: true, icon: "icon-home", disabled: false, onButtonClicked: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '02.01 Icon buttons' }),
            h("rh-primary-button", { id: 'rh-primary-button_11', icon: "icon-plus", iconbutton: true, disabled: false, onButtonClicked: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '02.01 Icon Secondary buttons' }),
            h("rh-primary-button", { id: 'rh-primary-button_12', icon: "icon-plus", iconsecondary: true, disabled: false, onButtonClicked: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '04.01.02 Inactive buttons' }),
            h("rh-primary-button", { id: 'rh-primary-button_9', text: 'mehr', ctabutton: true, icon: "icon-settings", disabled: true, onButtonClicked: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '04.01.02 Toggle Switch buttons' }),
            h("rh-toggle-switch", { id: 'rh-toggle-switch_1', leftText: 'on', rightText: 'off', disabled: false, onSwitchClick: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '04.01.02 Toggle Switch buttons' }),
            h("rh-toggle-switch", { id: 'rh-toggle-switch_1', leftText: 'ANWESEND', rightText: 'Abwesend', disabled: false, onSwitchClick: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '04.01.02 Toggle Switch buttons with border' }),
            h("rh-toggle-switch", { id: 'rh-toggle-switch_1', leftText: 'on', rightText: 'off', disabled: false, border: true, checked: true, onSwitchClick: (event) => this.checkEvent(event) }),
            h("rh-divider", { logoText: true, padding: true, text: '04.01.02 Toggle Switch Inactive' }),
            h("rh-toggle-switch", { id: 'rh-toggle-switch_2', leftText: 'on', rightText: 'off', disabled: true, onSwitchClick: (event) => this.checkEvent(event) })));
    }
    static get is() { return "buttons-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["buttons.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["buttons.page.css"]
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
