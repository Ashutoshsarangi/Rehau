import { h } from "@stencil/core";
export class TabPage {
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-tab-container", null,
                h("rh-tab", { tabname: "Tab 1" }),
                h("rh-tab", { tabname: "Tab 2" }),
                h("rh-tab", { tabname: "Tab 3" }),
                h("rh-tab", { tabname: "Tab 4" }))));
    }
    static get is() { return "tab-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["tab.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tab.page.css"]
    }; }
}
