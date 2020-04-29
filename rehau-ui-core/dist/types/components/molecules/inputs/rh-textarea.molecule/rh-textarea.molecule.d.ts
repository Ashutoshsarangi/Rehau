import { EventEmitter } from '../../../../stencil.core';
export declare class MhFreeTextMolecule {
    private element;
    componentTitle: string;
    text: string;
    maxLenght: number;
    placeholder: string;
    padding: boolean;
    private value;
    updatedText: EventEmitter<any>;
    private savedText;
    componentWillLoad(): void;
    private keyPressed;
    render(): any;
}
