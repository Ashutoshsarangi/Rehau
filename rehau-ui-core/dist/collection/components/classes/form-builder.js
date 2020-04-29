import { validateInput } from './../../utils/input-validators';
export class FormBuilder {
    constructor(name, controllers) {
        this._controllers = controllers;
        this._name = name;
    }
    get rowedControllers() {
        return this._controllers;
    }
    get controllers() {
        return this._controllers.reduce((a, b) => [...a, ...b.controls], []);
    }
    get valid() {
        return this.checkValidity();
    }
    get controllersAsObject() {
        const toReturn = {};
        this.controllers.map(controller => {
            toReturn[controller.name] = controller;
        });
        return toReturn;
    }
    get states() {
        const toReturn = {
            groupValidity: this.valid,
            controllers: {}
        };
        this.controllers.map(controller => {
            toReturn.controllers[controller.name] = {
                type: controller.type,
                state: validateInput((controller.properties && controller.properties.validators) || [], controller.value || null)
            };
        });
        return toReturn;
    }
    get name() {
        return this._name;
    }
    updateValue(value, id) {
        if (this.controllersAsObject[id]) {
            this.controllersAsObject[id].value = value;
        }
    }
    getController(name) {
        return this.controllers.filter(controller => controller.name === name)[0];
    }
    getControllerValidity(name) {
        return this.checkValidity(name);
    }
    getControllerState(name) {
        const controller = this.controllers.filter((formController) => formController.name === name)[0];
        return {
            type: controller.type,
            state: validateInput((controller.properties && controller.properties.validators) || [], controller.value || null)
        };
    }
    checkValidity(name) {
        if (name) {
            const controller = this.controllers.filter((formController) => formController.name === name)[0];
            if (controller.properties && controller.properties.validators) {
                return validateInput(controller.properties.validators, controller.value).valid;
            }
            return true;
        }
        else {
            let result = true;
            this.controllers.map(controller => {
                if (controller.properties &&
                    controller.properties.validators &&
                    !validateInput(controller.properties.validators, controller.value).valid) {
                    result = false;
                }
            });
            return result;
        }
    }
}
