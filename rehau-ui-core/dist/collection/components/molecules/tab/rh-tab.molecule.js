import { h } from "@stencil/core";
export class RhTabMolecule {
    render() {
        return (h("div", null,
            h("h1", null, this.tabname)));
    }
    static get is() { return "rh-tab"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-tab.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-tab.molecule.css"]
    }; }
    static get properties() { return {
        "tabname": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "tabname",
            "reflect": false
        }
    }; }
}
