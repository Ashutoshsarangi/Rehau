import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
export class NavbarsListPage {
    navigateTo(destination) {
        this.history.push(`${Environment.basePathWeb}/ui-showcase/${destination}`);
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-divider", { logoText: true, padding: true, text: '05.04.02 Navbar variants' }),
            h("rh-list-item-primary", { title: 'Navbars with Icon', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('icon-navbars') }),
            h("rh-list-item-primary", { title: 'Navbars with Label', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('label-navbars') }),
            h("rh-list-item-primary", { title: 'Navbars with Label and Icon', padding: true, icon: 'icon-next', onClick: () => this.navigateTo('icon-label-navbars') })));
    }
    static get is() { return "navbars-list-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["navbars-list.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["navbars-list.page.css"]
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
