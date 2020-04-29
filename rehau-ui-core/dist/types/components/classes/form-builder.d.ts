import { FormController, FormRow, ResultValidation } from './../interfaces/forms';
export declare class FormBuilder {
    private _controllers;
    private _name;
    constructor(name: string, controllers: FormRow[]);
    readonly rowedControllers: FormRow[];
    readonly controllers: FormController[];
    readonly valid: boolean;
    readonly controllersAsObject: {
        [key: string]: FormController;
    };
    readonly states: {
        groupValidity: boolean;
        controllers: {
            [key: string]: {
                type: string;
                state: ResultValidation;
            };
        };
    };
    readonly name: string;
    updateValue(value: any, id: string): void;
    getController(name: string): FormController;
    getControllerValidity(name: string): boolean;
    getControllerState(name: string): {
        type: string;
        state: ResultValidation;
    };
    private checkValidity;
}
