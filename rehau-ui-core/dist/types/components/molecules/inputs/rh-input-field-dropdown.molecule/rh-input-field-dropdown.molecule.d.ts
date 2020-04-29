import { EventEmitter } from '../../../../stencil.core';
import { DropdownElement } from '../../../interfaces/dropdown-element';
import { ControlProperties } from '../../../interfaces/forms';
import { InputDropdownEmit } from '../../../interfaces/input-dropdown-emit';
export declare class RhInputFieldDropdownMolecule {
    padding: boolean;
    label: string;
    opened: boolean;
    placeholder: string;
    value: string;
    elementlist: DropdownElement[];
    update: EventEmitter<InputDropdownEmit>;
    formController: ControlProperties;
    isFormComponent: boolean;
    private status;
    containerSize: number;
    private dropdownField;
    componentDidLoad(): void;
    componentDidRender(): void;
    componentDidUpdate(): void;
    private resize;
    constructor();
    selectedEvent(event: any): void;
    onCheck(value: DropdownElement, emit?: boolean): void;
    render(): any;
}
