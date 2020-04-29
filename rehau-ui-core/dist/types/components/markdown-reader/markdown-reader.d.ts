import { RouterHistory } from '@stencil/router';
export declare class MarkdownReaderPage {
    history: RouterHistory;
    element: HTMLElement;
    private id;
    private name;
    private md;
    componentWillLoad(): Promise<any>;
    componentDidLoad(): void;
    render(): any;
}
