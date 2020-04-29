import { EventEmitter } from '../../../../stencil.core';
import { RadioButton } from '../../../interfaces/radio-button';
import { ControlProperties } from '../../../interfaces/forms';
export declare class RhRadioButtonsListMolecule {
    inputTitle: string;
    radioButtonList: RadioButton[];
    disabled: boolean;
    showDesktopCol: boolean;
    hasMargin: boolean;
    padding: boolean;
    radioPosition: string;
    radioCheck: EventEmitter;
    private changed;
    formController: ControlProperties;
    isFormComponent: boolean;
    private status;
    constructor();
    componentWillLoad(): void;
    handleChange(radioButton: RadioButton): void;
    emitSelectedRadioButton(radioButton: RadioButton): void;
    render(): any;
}
