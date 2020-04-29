import { FormController, FormRow, ResultValidation } from './../interfaces/forms';
import { validateInput } from './../../utils/input-validators';

export class FormBuilder {
  private _controllers: FormRow[];
  private _name: string;

  constructor(name: string, controllers: FormRow[]) {
    this._controllers = controllers;
    this._name = name;
  }

  get rowedControllers(): FormRow[] {
    return this._controllers;
  }

  get controllers(): FormController[] {
    return this._controllers.reduce((a, b) => [...a, ...b.controls], []);
  }

  get valid(): boolean {
    return this.checkValidity();
  }

  get controllersAsObject(): { [key: string]: FormController } {
    const toReturn: { [key: string]: FormController } = {};
    this.controllers.map(controller => {
      toReturn[controller.name] = controller;
    });
    return toReturn;
  }

  get states(): { groupValidity: boolean; controllers: { [key: string]: { type: string; state: ResultValidation } } } {
    const toReturn: any = {
      groupValidity: this.valid,
      controllers: {}
    };
    this.controllers.map(controller => {
      toReturn.controllers[controller.name] = {
        type: controller.type,
        state: validateInput(
          (controller.properties && controller.properties.validators) || [],
          controller.value || null
        )
      };
    });
    return toReturn;
  }

  get name(): string {
    return this._name;
  }

  public updateValue(value: any, id: string): void {
    if (this.controllersAsObject[id]) {
      this.controllersAsObject[id].value = value;
    }
  }

  public getController(name: string): FormController {
    return this.controllers.filter(controller => controller.name === name)[0];
  }

  public getControllerValidity(name: string): boolean {
    return this.checkValidity(name);
  }

  public getControllerState(name: string): { type: string; state: ResultValidation } {
    const controller: FormController = this.controllers.filter(
      (formController: FormController) => formController.name === name
    )[0];
    return {
      type: controller.type,
      state: validateInput((controller.properties && controller.properties.validators) || [], controller.value || null)
    };
  }

  private checkValidity(name?: string): boolean {
    if (name) {
      const controller: FormController = this.controllers.filter(
        (formController: FormController) => formController.name === name
      )[0];
      if (controller.properties && controller.properties.validators) {
        return validateInput(controller.properties.validators, controller.value).valid;
      }
      return true;
    } else {
      let result: boolean = true;
      this.controllers.map(controller => {
        if (
          controller.properties &&
          controller.properties.validators &&
          !validateInput(controller.properties.validators, controller.value).valid
        ) {
          result = false;
        }
      });
      return result;
    }
  }
}
