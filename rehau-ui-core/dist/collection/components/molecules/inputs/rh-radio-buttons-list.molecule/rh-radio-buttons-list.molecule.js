import { h } from "@stencil/core";
import { validateInput } from '../../../../utils/input-validators';
export class RhRadioButtonsListMolecule {
    constructor() {
        this.disabled = false;
        this.showDesktopCol = false;
        this.hasMargin = true;
        this.radioPosition = 'left' || 'right';
        this.isFormComponent = false;
        this.formController = {
            disabled: false,
            icon: '',
            id: '',
            label: '',
            placeholder: '',
            showAllErrors: false,
            type: 'radio',
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
        const radioButton = this.radioButtonList.find((singleRadioButton) => singleRadioButton.checked);
        if (radioButton && radioButton.value)
            this.handleChange(radioButton);
    }
    handleChange(radioButton) {
        this.radioCheck.emit(radioButton);
        if (this.isFormComponent) {
            this.status = validateInput(this.formController.validators, radioButton.value);
            this.status.isPristine = false;
            this.changed.emit(this.status);
        }
    }
    emitSelectedRadioButton(radioButton) {
        this.radioCheck.emit(radioButton);
    }
    render() {
        const mainColumnClasses = {
            'main-column': true,
            'column-padding': this.padding,
            'col-xs-12 column-height': !this.showDesktopCol,
            'col-xs-6 small-tooltip': this.showDesktopCol,
            'no-desktop': !this.padding && !this.showDesktopCol
        };
        const disabled = {
            'disabled': this.disabled
        };
        return (h("div", { class: { 'grid': true } },
            this.inputTitle && (h("label", { class: { 'label': true, 'title-no-margin': !this.hasMargin } }, this.inputTitle)),
            h("div", { class: 'row' }, this.radioButtonList.map((radioButton, index) => [
                h("div", { class: mainColumnClasses },
                    h("div", { class: 'row' },
                        this.radioPosition === 'left' && (h("div", { class: 'col-xs-auto' },
                            h("div", { class: 'radio-label radio-left' },
                                h("input", { type: 'radio', 
                                    // GET ID FROM FORM
                                    id: radioButton.id.toString(), checked: radioButton.checked, disabled: this.disabled, class: disabled, name: this.formController.name ? this.formController.name : 'radio-button-list', value: radioButton.value, onChange: () => {
                                        this.handleChange(radioButton);
                                    } }),
                                h("label", { htmlFor: radioButton.id.toString() },
                                    h("span", { class: "radio" }),
                                    h("span", { class: "text-label text-wrap" }, radioButton.text))))),
                        this.radioPosition === 'right' && (h("div", { class: 'col-xs-auto' },
                            h("div", { class: 'radio-label radio-right' },
                                h("input", { type: 'radio', 
                                    // GET ID FROM FORM
                                    id: radioButton.id.toString(), checked: radioButton.checked, disabled: radioButton.disabled, class: disabled, name: this.formController.name ? this.formController.name : 'radio-button-list', value: radioButton.value, onChange: () => {
                                        this.handleChange(radioButton);
                                    } }),
                                h("label", { htmlFor: radioButton.id.toString() }))))))
            ]))));
    }
    static get is() { return "rh-radio-buttons-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-radio-buttons-list.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-radio-buttons-list.molecule.css"]
    }; }
    static get properties() { return {
        "inputTitle": {
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
        "radioButtonList": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "RadioButton[]",
                "resolved": "RadioButton[]",
                "references": {
                    "RadioButton": {
                        "location": "import",
                        "path": "../../../interfaces/radio-button"
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
        "showDesktopCol": {
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
            "attribute": "show-desktop-col",
            "reflect": false,
            "defaultValue": "false"
        },
        "hasMargin": {
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
            "attribute": "has-margin",
            "reflect": false,
            "defaultValue": "true"
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
        "radioPosition": {
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
            "attribute": "radio-position",
            "reflect": false,
            "defaultValue": "'left' || 'right'"
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
        }
    }; }
    static get events() { return [{
            "method": "radioCheck",
            "name": "radioCheck",
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
                "original": "ResultValidation",
                "resolved": "ResultValidation",
                "references": {
                    "ResultValidation": {
                        "location": "import",
                        "path": "../../../interfaces/forms"
                    }
                }
            }
        }]; }
}
