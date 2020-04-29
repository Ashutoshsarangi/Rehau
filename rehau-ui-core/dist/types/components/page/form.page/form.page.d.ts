import { RouterHistory } from '@stencil/router';
export declare class FormPage {
    history: RouterHistory;
    private formValidity;
    private showCustomError;
    private breadcrumbsArray;
    private form;
    private inputText;
    private radioButtonList;
    private dropdownList;
    private formController;
    private inputFormController;
    private dropdownFormController;
    componentWillLoad(): Promise<any>;
    private navigateTo;
    private handleChange;
    private checkControl;
    private checkEvent;
    render(): any;
}
