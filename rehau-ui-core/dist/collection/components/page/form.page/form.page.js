import { h } from "@stencil/core";
import { Environment } from '../../../envs/env.dev';
import * as logger from '../../../utils/logger-utils';
import { END_POINT } from './../../const/mock-end-points';
import { FormBuilder } from './../../classes/form-builder';
export class FormPage {
    constructor() {
        this.radioButtonList = [
            {
                id: 1,
                text: "mrs.",
                value: "one",
                checked: false,
                height: false,
                tooltipActive: false,
                disabled: false
            },
            {
                id: 2,
                text: "mr.",
                value: "one",
                checked: false,
                height: false,
                tooltipActive: false,
                disabled: false
            },
            {
                id: 3,
                text: "inactive",
                value: "one",
                checked: false,
                height: false,
                tooltipActive: false,
                disabled: false
            }
        ];
        this.dropdownList = [
            {
                titleUp: 'RAUTOOL A-one',
            },
            {
                titleUp: 'RAUTOOL A-light 2 Kombi'
            },
            {
                titleUp: 'RAUTOOL A-light2'
            },
            {
                titleUp: 'RAUTOOL Xpand QC'
            },
            {
                titleUp: 'RAUTOOL G2'
            },
            {
                titleUp: 'RAUTOOL K-Tools'
            },
            {
                titleUp: 'RAUTOOL M1'
            },
            {
                titleUp: 'RAUTOOL H/G1'
            }
        ];
        this.formController = {
            type: 'checkbox',
            name: 'checkbox-error-handling',
            properties: {
                id: '',
                name: 'checkbox-error-handling',
                type: 'checkbox',
                validators: [
                    {
                        type: 'requiredTrue',
                        errorMessage: 'This field is required',
                        priority: 1
                    }
                ]
            }
        };
        this.inputFormController = {
            type: 'text',
            name: 'input',
            properties: {
                id: '',
                name: 'input',
                type: 'text',
                validators: [
                    {
                        type: 'required',
                        errorMessage: 'This field is required',
                        priority: 1
                    },
                    {
                        type: 'minLength',
                        minLength: 3,
                        errorMessage: 'Minlegth problem',
                        priority: 2
                    }
                ]
            }
        };
        this.dropdownFormController = {
            type: 'text',
            name: 'input-dropdown',
            properties: {
                id: '',
                name: 'input-dropdown',
                type: 'text',
                validators: [
                    {
                        type: 'required',
                        errorMessage: 'This field is required',
                        priority: 1
                    }
                ]
            }
        };
    }
    async componentWillLoad() {
        this.breadcrumbsArray = this.history.location.pathname.split('/').slice(1);
        // const responseRadio: Response = await fetch(`${END_POINT.MOCKS}radio-button-list.json`);
        // const dataRadio: any = await responseRadio.json();
        // this.radioButtonList = [...dataRadio.list1];
        const responseForm = await fetch(`${END_POINT.MOCKS}radio-button-list.json`);
        const dataForm = await responseForm.json();
        dataForm.form[0].controls = [
            this.formController,
            ...dataForm.form[0].controls,
            this.inputFormController,
            this.dropdownFormController
        ];
        this.form = new FormBuilder('form', dataForm.form);
        return;
    }
    navigateTo(event) {
        if (event.detail !== null) {
            if (event.detail > 0) {
                this.history.push(`${Environment.basePathWeb}/ui-showcase/${this.breadcrumbsArray[event.detail]}`);
            }
            else if (event.detail === 0) {
                this.history.push(`${Environment.basePathWeb}/${this.breadcrumbsArray[0]}`);
            }
        }
        else {
            this.history.push(`${Environment.basePathWeb}/ui-showcase`);
        }
    }
    handleChange(value, id) {
        logger.consoleLog('value', value);
        this.form.updateValue(value, id);
        this.formValidity = this.form.states.groupValidity;
        this.showCustomError = false;
    }
    checkControl(name) {
        return name === 'input';
    }
    checkEvent(ev) {
        let value = ev._controllers[0].controls.filter((control) => this.checkControl(control.name))[0].value;
        if (value !== 'api-response')
            this.showCustomError = true;
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("rh-breadcrumbs", { breadcrumbs: this.breadcrumbsArray, onGoBack: (event) => this.navigateTo(event), onGoBackTo: (event) => this.navigateTo(event) }),
            h("form", { name: this.form.name },
                h("rh-divider", { hrShow: true, background: false, fullWidth: true }),
                h("rh-list-item-5", { id: 'rh-list-item-5_3', padding: true, titleGray: true, title: 'rh-radio-buttons-list', subtitle: 'Technical component' }),
                h("rh-divider", { logoText: true, padding: true, text: 'Radio Button List' }),
                h("rh-radio-buttons-list", { id: 'rh-radio-buttons-list_1', title: 'Show radio buttons on mobile devices', radioButtonList: this.radioButtonList, formController: this.form.controllers[1].properties, isFormComponent: true, padding: true, disabled: true, onRadioCheck: (event) => { }, onChanged: (event) => this.handleChange(event.detail.currentValue, this.form.controllers[1].name) }),
                h("rh-divider", { logoText: true, padding: true, text: 'Radio Button List' }),
                h("rh-radio-buttons-list", { id: 'rh-radio-buttons-list_2', title: 'Show radio buttons on Desktop', radioButtonList: this.radioButtonList, formController: this.form.controllers[1].properties, isFormComponent: true, padding: true, showDesktopCol: true, disabled: false, onRadioCheck: (event) => { }, onChanged: (event) => this.handleChange(event.detail.currentValue, this.form.controllers[1].name) }),
                h("rh-divider", { logoText: true, padding: true, text: 'rh-checkbox' }),
                h("rh-checkbox", { id: 'rh-rectangular-checkbox-form_1', left: true, padding: true, text: "check me", disabled: false, isFormComponent: true, formController: this.form.controllers[0].properties, onChanged: (event) => this.handleChange(event.detail.currentValue, this.form.controllers[0].name) }),
                h("rh-checkbox", { id: 'rh-rectangular-checkbox-form_2', left: true, padding: true, text: "click me", checked: true, disabled: false, textError: 'Please accept the terms of use in order to continue to the next steps.', isFormComponent: true, formController: this.form.controllers[0].properties, onChanged: (event) => this.handleChange(event.detail.currentValue, this.form.controllers[0].name) }),
                h("rh-checkbox", { id: 'rh-rectangular-checkbox-form_2', left: true, padding: true, text: "click me", disabled: true, isFormComponent: true, formController: this.form.controllers[0].properties, onChanged: (event) => this.handleChange(event.detail.currentValue, this.form.controllers[0].name) }),
                h("rh-divider", { hrShow: true, background: false, fullWidth: true }),
                h("rh-list-item-5", { id: 'rh-list-item-5_4', padding: true, titleGray: true, title: 'rh-input-field-dropdown', subtitle: 'Technical component' }),
                h("rh-divider", { logoText: true, padding: true, text: 'rh-textbox' }),
                h("rh-textbox", { id: 'rh-textbox_1', disabled: false, label: 'Name', type: 'text', isFormComponent: true, formController: this.inputFormController.properties, onUpdate: event => this.handleChange(event.detail, this.inputFormController.name), showCustomError: this.showCustomError, errorText: 'the text should be "api-response"', error: false, placeholder: 'Insert your name', padding: true }),
                h("rh-divider", { logoText: true, padding: true, text: '04.03.13 Text area' }),
                h("rh-textarea", { id: 'rh-textarea_1', padding: true, title: 'Label', text: 'Mr Montanari cut the line at the roundabout trying to take over. I had to break and lost control of my Multipla, ending on the guard rail', onUpdatedText: (event) => this.checkEvent(event), placeholder: 'Placeholder...' }),
                h("rh-divider", { logoText: true, padding: true, text: 'rh-input-dropdown-form' }),
                h("rh-input-field-dropdown", { id: 'rh-input-field-dropdown_1', padding: true, label: 'Label', value: this.inputText, elementlist: this.dropdownList, placeholder: 'Please select', isFormComponent: true, formController: this.dropdownFormController.properties, onUpdate: (event) => this.handleChange(event.detail.value.titleUp, this.dropdownFormController.name) }))));
    }
    static get is() { return "form-page"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["form.page.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["form.page.css"]
    }; }
    static get properties() { return {
        "history": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "RouterHistory",
                "resolved": "RouterHistory",
                "references": {
                    "RouterHistory": {
                        "location": "import",
                        "path": "@stencil/router"
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
    static get states() { return {
        "formValidity": {},
        "showCustomError": {}
    }; }
}
