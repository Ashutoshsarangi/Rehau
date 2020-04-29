import { h } from "@stencil/core";
import { Environment } from '../../../../envs/env.dev';
import * as logger from '../../../../utils/logger-utils';
export class IconNavbarsPage {
    constructor() {
        this.tabsThreeElements = [
            {
                id: 0,
                name: 'tab1',
                label: '',
                active: true,
                notification: false,
                icon: 'icon-home',
                iconactive: 'icon-home-filled',
            },
            {
                id: 1,
                name: 'tab2',
                label: '',
                active: false,
                notification: true,
                icon: 'icon-notification',
                iconactive: 'icon-notification-fill',
            },
            {
                id: 2,
                name: 'tab3',
                label: '',
                active: false,
                notification: false,
                icon: 'icon-settings',
                iconactive: 'icon-settings-filled',
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
            h("rh-divider", { logoText: true, padding: true, text: '05.04.02 Mobile view Tab-Menu' }),
            h("rh-navbar", { id: 'rh-navbar_1', tabs: this.tabsThreeElements, onOnClick: (event) => this.checkEvent(event) },
                h("div", { slot: "tab1", class: "tab-container" },
                    h("div", { class: "header" },
                        h("rh-header", { headertitle: "Content 1", subtitle: "Demo page" })),
                    h("div", { class: "inner-wrapper" },
                        h("div", { class: "content" },
                            h("p", { class: "copy" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                            h("div", { class: "inner-wrapper" },
                                h("rh-checkbox", { id: 'rh-rectangular-checkbox-form_2', left: true, padding: true, text: "click me", isFormComponent: true }))))),
                h("div", { slot: "tab2", class: "tab-container" },
                    h("div", { class: "header" },
                        h("rh-header", { headertitle: "Content 2", subtitle: "Demo page" })),
                    h("div", { class: "inner-wrapper" },
                        h("div", { class: "content" },
                            h("p", { class: "copy" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                            h("div", { class: "inner-wrapper" },
                                h("rh-textbox", { id: 'rh-textbox_1', disabled: false, label: 'Name', type: 'text', isFormComponent: true, errorText: 'the text should be "api-response"', error: false, placeholder: 'Insert your name', padding: true }))))),
                h("div", { slot: "tab3", class: "tab-container" },
                    h("div", { class: "header" },
                        h("rh-header", { headertitle: "content 3", subtitle: "Demo page 3" })),
                    h("div", { class: "inner-wrapper" },
                        h("div", { class: "content" },
                            h("p", { class: "copy" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                            h("div", { class: "inner-wrapper" },
                                h("rh-primary-button", { id: 'rh-primary-button_1', text: 'mehr', icon: "icon-next", ctabutton: true, disabled: false }))))))));
    }
    static get is() { return "icon-navbars-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["icon-navbars.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["icon-navbars.page.css"]
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
