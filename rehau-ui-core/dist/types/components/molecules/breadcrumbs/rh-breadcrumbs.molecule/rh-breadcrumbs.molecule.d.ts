export declare class RhBreadcrumbsMolecule {
    breadcrumbs: Array<string>;
    private goBackEmitter;
    private goBackToEmitter;
    isWeb: boolean;
    componentWillLoad(): void;
    goBackTo(index: number, last: boolean): void;
    goBackToRoot(): void;
    goBack(): void;
    render(): any;
}
