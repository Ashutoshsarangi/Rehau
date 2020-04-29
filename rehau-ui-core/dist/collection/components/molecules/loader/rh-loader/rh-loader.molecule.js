import { h } from "@stencil/core";
export class RhLoader {
    render() {
        return (h("div", null,
            h("div", { class: "loader-background" },
                h("div", { class: "loader" }))));
    }
    static get is() { return "rh-loader"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-loader.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-loader.molecule.css"]
    }; }
}
