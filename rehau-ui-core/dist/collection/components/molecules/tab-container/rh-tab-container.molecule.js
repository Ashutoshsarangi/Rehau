import { h } from "@stencil/core";
export class RhTabMolecule {
    render() {
        return (h("div", { class: 'tab-container' },
            h("slot", null)));
    }
    static get is() { return "rh-tab-container"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-tab-container.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-tab-container.molecule.css"]
    }; }
}
