import { h } from "@stencil/core";
export class RhCard {
    render() {
        return (h("div", { style: { 'box-sizing': 'border-box' } },
            h("div", { class: "inner-wrapper" },
                h("div", { class: "row-wrap row flex-wrap" },
                    h("div", { class: "column-wrap col-6" },
                        h("div", { class: "flex-wrap report-card" },
                            h("h3", null,
                                this.cardtitle,
                                h("label", { class: "label" }, this.cardsubtitle)),
                            h("div", { class: "inner-wrapper" },
                                h("div", { class: "report-value" },
                                    "41",
                                    h("span", { class: "decimal-value" }, ".3")))))))));
    }
    static get is() { return "rh-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-card.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-card.molecule.css"]
    }; }
    static get properties() { return {
        "cardtitle": {
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
            "attribute": "cardtitle",
            "reflect": false
        },
        "cardsubtitle": {
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
            "attribute": "cardsubtitle",
            "reflect": false
        },
        "carddescription": {
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
            "attribute": "carddescription",
            "reflect": false
        }
    }; }
}
