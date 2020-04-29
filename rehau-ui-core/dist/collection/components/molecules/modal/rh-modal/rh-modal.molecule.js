import { h } from "@stencil/core";
export class RhModal {
    render() {
        return (h("div", null,
            h("div", { class: "modal-backdrop fade show" }),
            h("div", { class: "modal fade", id: "myModal", role: "dialog" },
                h("div", { class: "modal-dialog" },
                    h("div", { class: "modal-content" },
                        h("div", { class: "modal-inner" },
                            h("div", { class: "modal-header" },
                                h("h3", { class: "modal-title" }, this.modalHeader)),
                            h("div", { class: "modal-body" },
                                h("p", { class: "copy" }, this.modalMessage))),
                        h("div", { class: "modal-footer" },
                            h("rh-primary-button", { id: 'rh-primary-button_1', text: this.actionText, icon: "icon-next", transparentbutton: true, disabled: false })))))));
    }
    static get is() { return "rh-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-modal.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-modal.molecule.css"]
    }; }
    static get properties() { return {
        "modalHeader": {
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
            "attribute": "modal-header",
            "reflect": false
        },
        "modalMessage": {
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
            "attribute": "modal-message",
            "reflect": false
        },
        "actionText": {
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
            "attribute": "action-text",
            "reflect": false
        }
    }; }
}
