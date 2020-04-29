import { h } from "@stencil/core";
import { validateInput } from '../../../../utils/input-validators';
export class RhCheckboxMolecule {
    constructor() {
        this.left = true;
        this.disabled = false;
        this.padding = false;
        this.isFormComponent = false;
        this.formController = {
            disabled: true,
            icon: '',
            id: '',
            label: '',
            placeholder: '',
            showAllErrors: false,
            type: 'checkbox',
            validators: []
        };
        this.status = {
            currentValue: '',
            errors: [],
            isPristine: true,
            valid: false
        };
    }
    componentWillLoad() {
        if (this.isFormComponent) {
            this.status = validateInput(this.formController.validators, this.checked);
            this.status.isPristine = true;
        }
    }
    componentWillUpdate() {
        if (this.isFormComponent) {
            this.status = Object.assign(Object.assign({}, this.status), validateInput(this.formController.validators, this.checked));
        }
    }
    handleChange(noEmit) {
        this.checked = this.formInputElement.checked;
        this.status = validateInput(this.formController.validators, this.checked);
        this.status.isPristine = false;
        if (!noEmit) {
            this.changed.emit(this.status);
        }
    }
    checkmarkClicked() {
        this.checked = this.inputField.checked;
        this.onChange.emit(this.checked);
    }
    render() {
        const checkMarkClasses = {
            'checkmark': true
        };
        const messageClasses = {
            'message-container': true,
        };
        const disabled = {
            'disabled': this.disabled
        };
        if (!this.isFormComponent)
            return (h("div", { class: 'grid' + (this.padding ? ' shape-padding' : '') },
                h("div", { class: 'row' },
                    h("div", { class: 'col-xs-auto checkbox-container' + (this.left ? ' first-xs' : '') },
                        h("label", { class: 'checkbox-label' },
                            h("input", { type: 'checkbox', checked: this.checked, disabled: this.disabled, class: disabled, ref: (element) => this.inputField = element, onClick: () => this.checkmarkClicked() }),
                            h("span", { class: checkMarkClasses }),
                            h("span", { class: messageClasses }, this.text)),
                        this.textError && !this.checked && (h("div", { class: 'row error-container' },
                            h("label", null, this.textError)))))));
        else {
            return (h("div", { class: 'grid' + (this.padding ? ' shape-padding' : '') },
                h("div", { class: 'row' },
                    h("div", { class: 'col-xs-auto checkbox-container' + (this.left ? ' first-xs' : '') },
                        h("label", { class: 'checkbox-label' },
                            h("input", { id: this.formController.id, name: this.formController.name ? this.formController.name : 'checkbox-error-handling', disabled: this.disabled, class: disabled, type: 'checkbox', checked: this.checked, ref: (element) => this.formInputElement = element, onClick: (event) => this.handleChange() }),
                            h("span", { class: checkMarkClasses }),
                            h("span", { class: messageClasses }, this.text)),
                        this.textError && this.status.errors.length > 0 && (h("div", { class: 'row error-container' },
                            h("label", null, this.textError)))))));
        }
    }
    static get is() { return "rh-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-checkbox.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-checkbox.molecule.css"]
    }; }
    static get properties() { return {
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
            "reflect": false
        },
        "textError": {
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
            "attribute": "text-error",
            "reflect": false
        },
        "left": {
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
            "attribute": "left",
            "reflect": false,
            "defaultValue": "true"
        },
        "checked": {
            "type": "boolean",
            "mutable": true,
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
            "attribute": "checked",
            "reflect": false
        },
        "disabled": {
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
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
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
            "reflect": false,
            "defaultValue": "false"
        },
        "isFormComponent": {
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
            "attribute": "is-form-component",
            "reflect": false,
            "defaultValue": "false"
        },
        "formController": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ControlProperties",
                "resolved": "ControlProperties",
                "references": {
                    "ControlProperties": {
                        "location": "import",
                        "path": "../../../interfaces/forms"
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
    static get events() { return [{
            "method": "onChange",
            "name": "onChange",
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
        }, {
            "method": "changed",
            "name": "changed",
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
}
