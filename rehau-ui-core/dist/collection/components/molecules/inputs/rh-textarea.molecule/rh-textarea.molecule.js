import { h } from "@stencil/core";
export class MhFreeTextMolecule {
    constructor() {
        this.text = '';
        this.savedText = '';
    }
    componentWillLoad() {
        this.value = this.text.substring(0, this.maxLenght).trim();
        this.savedText = this.value;
    }
    keyPressed() {
        let textarea = this.element.shadowRoot.querySelector('textarea');
        this.value = textarea.value.substring(0, this.maxLenght).replace(/  +/g, ' ');
        textarea.value = this.value;
    }
    render() {
        return (h("div", { class: 'grid main-grid' + (this.padding ? ' box-padding' : '') },
            h("div", { class: 'col-xs no-padding' },
                h("label", { class: 'label' }, this.componentTitle)),
            h("div", { class: 'row middle-xs' },
                h("div", { class: 'col-xs textarea-container' },
                    h("textarea", { placeholder: this.placeholder, maxlength: this.maxLenght, onKeyUp: () => this.keyPressed(), onKeyDown: () => this.keyPressed() }, this.value)))));
    }
    static get is() { return "rh-textarea"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-textarea.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-textarea.molecule.css"]
    }; }
    static get properties() { return {
        "componentTitle": {
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
            "attribute": "title",
            "reflect": false
        },
        "text": {
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
            "attribute": "text",
            "reflect": false,
            "defaultValue": "''"
        },
        "maxLenght": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "max-lenght",
            "reflect": false
        },
        "placeholder": {
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
            "attribute": "placeholder",
            "reflect": false
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
        }
    }; }
    static get states() { return {
        "value": {}
    }; }
    static get events() { return [{
            "method": "updatedText",
            "name": "updatedText",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
}
