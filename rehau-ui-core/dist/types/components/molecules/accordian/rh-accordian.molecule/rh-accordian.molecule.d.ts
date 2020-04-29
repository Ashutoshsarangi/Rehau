import { EventEmitter } from '../../../../stencil.core';
import { BasicAccordionModel } from '../../../interfaces/basic-accordion-model';
export declare class RhAccordianMolecule {
    accordions: Array<BasicAccordionModel>;
    private containerAccordions;
    private tabContainer;
    onClick: EventEmitter<any>;
    private scrollPosition;
    componentDidLoad(): void;
    private active;
    private select;
    handleScroll(): void;
    render(): any;
}
