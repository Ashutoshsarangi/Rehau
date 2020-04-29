import { h } from "@stencil/core";
export class RhCarouselSliderMolecule {
    render() {
        const backgroundColor = {
            'background-color': this.colorBg === 'transparent' ? 'transparent' : this.colorBg === 'grey' ? '#EBEBEB' : '#FFFFFF'
        };
        return (h("div", null, "carousel"));
    }
    static get is() { return "rh-carousel-slider"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-carousel-slider.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-carousel-slider.molecule.css"]
    }; }
    static get properties() { return {
        "carousels": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<BasicCarouselModel>",
                "resolved": "BasicCarouselModel[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "BasicCarouselModel": {
                        "location": "import",
                        "path": "../../../interfaces/basic-carousel-model"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "padding": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "padding",
            "reflect": false
        },
        "colorBg": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string | 'transparent' | 'grey' | 'white'",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "color-bg",
            "reflect": false
        }
    }; }
}
