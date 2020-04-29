import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';
export class DividersPage {
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
            h("rh-list-item-5", { id: 'rh-list-item-5_1', padding: true, titleGray: true, title: 'rh-divider', subtitle: 'Technical component' }),
            h("p", { class: 'div-p' }, "04.12.03 Medium Divider (32pt)"),
            h("rh-divider", { id: 'rh-divider_1', logoText: true, padding: false, bigSize: true }),
            h("p", { class: 'div-p' }, "04.12.01 Section Divider With Text (48pt)"),
            h("rh-divider", { id: 'rh-divider_2', logoText: true, padding: true, text: 'Text discription title' }),
            h("p", { class: 'div-p' }, "04.12.01 Section Divider With Text-icon (48pt)"),
            h("rh-divider", { id: 'rh-divider_3', logoText: true, padding: true, text: 'Text discription title', icon: '../assets/img/icons/g25-esclamation-mark-rounded-pos-r.svg', onChecked: (event) => this.checkEvent(event) }),
            h("p", { class: 'div-p' }, "04.12.02 Objects Divider (16pt)"),
            h("rh-divider", { id: 'rh-divider_4', logoText: true, padding: false, bigSize: false }),
            h("p", { class: 'div-p' }, "04.12.04 Grey line dividers"),
            h("rh-divider", { id: 'rh-divider_5', hrShow: true, background: false, fullWidth: true }),
            h("br", null),
            h("rh-divider", { id: 'rh-divider_6', hrShow: true, background: false, fullWidth: false }),
            h("br", null),
            h("p", { class: 'div-p' }, "04.12.05 White line dividers"),
            h("div", { class: 'div-background-color' },
                h("br", null),
                h("rh-divider", { id: 'rh-divider_7', hrShow: true, background: true, fullWidth: true }),
                h("br", null),
                h("rh-divider", { id: 'rh-divider_8', hrShow: true, background: true, fullWidth: false }),
                h("br", null))));
    }
    static get is() { return "dividers-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dividers.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dividers.page.css"]
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
