import { RouterHistory } from '@stencil/router';
import { HorizontalTabMenuModel } from '../../../interfaces/horizontal-tab-menu-model';
export declare class IconNavbarsPage {
    history: RouterHistory;
    private breadcrumbsArray;
    tabsThreeElements: Array<HorizontalTabMenuModel>;
    componentWillLoad(): void;
    private navigateTo;
    private checkEvent;
    render(): any;
}
