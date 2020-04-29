import { EventEmitter } from '../../../../stencil.core';
import { ControlProperties } from '../../../interfaces/forms';
export declare class RhCheckboxMolecule {
    text: string;
    textError: string;
    left: boolean;
    checked: boolean;
    disabled: boolean;
    padding: boolean;
    onChange: EventEmitter<any>;
    isFormComponent: boolean;
    formController: ControlProperties;
    changed: EventEmitter;
    private inputField;
    private formInputElement;
    private status;
    constructor();
    componentWillLoad(): any;
    componentWillUpdate(): any;
    private handleChange;
    private checkmarkClicked;
    render(): any;
}
