import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
export class ShowcasesPage {
    navigateTo(destination) {
        this.history.push(`${Environment.basePathWeb}/ui-showcase/${destination}`);
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-list-item-primary", { title: 'Buttons', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('buttons') }),
            h("rh-list-item-primary", { title: 'Form', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('form') }),
            h("rh-list-item-primary", { title: 'Navbars', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('navbars-list') }),
            h("rh-list-item-primary", { title: 'List Items', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('list-items') }),
            h("rh-list-item-primary", { title: 'Headers', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('headers') }),
            h("rh-list-item-primary", { title: 'Accordian', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('accordian') }),
            h("rh-list-item-primary", { title: 'Loader', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('loader') }),
            h("rh-list-item-primary", { title: 'Onboarding pages', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('onboarding') }),
            h("rh-list-item-primary", { title: 'Progress Bar Pages', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('progress-bar') }),
            h("rh-list-item-primary", { title: 'Badges Pages', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('badges') }),
            h("rh-list-item-primary", { title: 'Modal Pages', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('modal') }),
            h("rh-list-item-primary", { title: 'Home Pages', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('home') })));
    }
    static get is() { return "showcases-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["showcases.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["showcases.page.css"]
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
