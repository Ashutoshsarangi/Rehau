import { RouterHistory } from '@stencil/router';
import { ListItemVariation3 } from '../../interfaces/list-item-variation3';
import { BasicListItem } from '../../interfaces/basic-listitem-model';
export declare class ListItemms {
    history: RouterHistory;
    listItem3: Array<ListItemVariation3>;
    basicListItem: Array<BasicListItem>;
    private breadcrumbsArray;
    componentWillLoad(): void;
    private navigateTo;
    private checkEvent;
    render(): any;
}
