import { h } from "@stencil/core";
import { validateInput } from '../../../../utils/input-validators';
export class RhInputFieldDropdownMolecule {
    constructor() {
        this.isFormComponent = false;
        this.formController = {
            disabled: false,
            icon: '',
            id: '',
            label: '',
            placeholder: '',
            showAllErrors: true,
            type: 'text',
            validators: [{ type: 'required', priority: 1 }]
        };
        this.status = {
            currentValue: '',
            errors: [],
            isPristine: true,
            valid: false
        };
    }
    componentDidLoad() {
        if (!!this.dropdownField) {
            this.containerSize = this.dropdownField.getBoundingClientRect().bottom;
            this.resize();
        }
    }
    componentDidRender() {
        if (!!this.dropdownField) {
            this.resize();
        }
    }
    componentDidUpdate() {
        this.resize();
    }
    resize() {
        if (!!this.dropdownField) {
            this.containerSize = this.dropdownField.clientHeight;
            var windowHeight = window.innerHeight;
            var offsetVal = window.pageYOffset;
            var offsetVal2 = document.body.scrollTop;
        }
        // console.log("windowHeight: " + windowHeight + " containerSize : " + this.containerSize + " offsetVal2: " + offsetVal2);
    }
    selectedEvent(event) {
        this.opened = !this.opened;
    }
    onCheck(value, emit) {
        if (emit) {
            this.status = validateInput(this.formController.validators, value);
            this.status.isPristine = false;
            this.update.emit({ status: this.status, value: value });
        }
        else {
            this.update.emit({ value: value });
        }
        this.value = value.titleUp;
        this.opened = false;
    }
    render() {
        const paddingClass = {
            'box': !this.padding,
            'box-padding': this.padding
        };
        const label = {
            'label': true
        };
        const textBackground = {
            'label-placeholder': true
        };
        const labelClass = {
            'label-styling': true,
            'label-color': true
        };
        return (h("div", { class: paddingClass },
            h("div", null,
                h("div", { class: 'custom-label' },
                    h("label", { color: '$primary', class: label }, this.label)),
                h("div", { class: 'grid no-padding dropdown-field', ref: (el) => (this.dropdownField = el) },
                    h("div", { class: 'row no-padding dropdown-position' },
                        h("div", { class: 'col-xs no-padding col-height', onClick: (event) => this.selectedEvent(event) },
                            h("input", { class: textBackground, placeholder: this.placeholder, value: this.value, type: 'text', disabled: true })),
                        h("div", { class: 'col-xs-2 no-padding right-aligned', onClick: (event) => this.selectedEvent(event) },
                            h("div", { class: 'icon-positioning' },
                                h("rh-icon", { class: 'icon', name: this.opened ? 'icon-next up' : 'icon-next down', color: 'var(--quaternaryColor, $quaternaryColor)', size: '18px' }))),
                        h("div", { class: 'col-xs-12 no-padding' }, this.opened && (h("div", { class: 'dropdown-open' },
                            h("ol", null,
                                console.log("elementlist:   " + this.elementlist),
                                this.elementlist.map((dropdown, index, elementlist) => (h("div", { class: 'list-item', onClick: () => {
                                        this.onCheck(dropdown, this.isFormComponent);
                                    } },
                                    h("div", { class: 'divider-label-distance' },
                                        h("label", { class: labelClass }, dropdown.titleUp)),
                                    index !== elementlist.length - 1 && (h("div", null))))))))))))));
    }
    static get is() { return "rh-input-field-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-input-field-dropdown.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-input-field-dropdown.molecule.css"]
    }; }
    static get properties() { return {
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
        "label": {
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
            "attribute": "label",
            "reflect": false
        },
        "opened": {
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
            "attribute": "opened",
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
        "value": {
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
            "attribute": "value",
            "reflect": false
        },
        "elementlist": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DropdownElement[]",
                "resolved": "DropdownElement[]",
                "references": {
                    "DropdownElement": {
                        "location": "import",
                        "path": "../../../interfaces/dropdown-element"
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
    static get states() { return {
        "containerSize": {}
    }; }
    static get events() { return [{
            "method": "update",
            "name": "update",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "InputDropdownEmit",
                "resolved": "InputDropdownEmit",
                "references": {
                    "InputDropdownEmit": {
                        "location": "import",
                        "path": "../../../interfaces/input-dropdown-emit"
                    }
                }
            }
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "resize",
            "target": "document",
            "capture": false,
            "passive": true
        }]; }
}
