import { h } from "@stencil/core";
import { Environment } from './../../envs/env.dev';
export class AppPage {
    render() {
        return (h("stencil-router", null,
            h("stencil-route-switch", { scrollTopOffset: 0 },
                !Environment.prod
                    ? [
                        h("stencil-route", { url: '/', routeRender: () => {
                                return h("stencil-router-redirect", { url: '/ui-showcase' });
                            }, exact: true }),
                        h("stencil-route", { url: `/ui-showcase`, component: 'showcases-page', exact: true }),
                        h("stencil-route", { url: `${Environment.basePathWeb}/md-reader`, component: 'markdown-reader' })
                    ]
                    : [
                        h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase`, component: 'showcases-page', exact: true })
                    ],
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/buttons`, component: 'buttons-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/form`, component: 'form-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/navbars-list`, component: 'navbars-list-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/icon-navbars`, component: 'icon-navbars-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/label-navbars`, component: 'label-navbars-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/icon-label-navbars`, component: 'icon-label-navbars-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/list-items`, component: 'list-items' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/headers`, component: 'headers-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/accordian`, component: 'accordian-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/tab`, component: 'tab-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/loader`, component: 'loader-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/onboarding`, component: 'onboarding-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/progress-bar`, component: 'progress-bar-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/carousel-slider`, component: 'carousel-slider-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/badges`, component: 'badges-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/modal`, component: 'modal-page' }),
                h("stencil-route", { url: `${Environment.basePathWeb}/ui-showcase/home`, component: 'home-page' }))));
    }
    static get is() { return "rh-app"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["app.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["app.css"]
    }; }
}
