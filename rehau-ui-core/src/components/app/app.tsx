import { Component, h } from '@stencil/core';
import '@stencil/router';

import { Environment } from './../../envs/env.dev';

@Component({
  tag: 'rh-app',
  styleUrl: 'app.scss',
  shadow: true
})
export class AppPage {
  public render(): any {
    return (
      <stencil-router>
        <stencil-route-switch scrollTopOffset={0}>
          {!Environment.prod
            ? [
              <stencil-route
                url='/'
                routeRender={() => {
                  return <stencil-router-redirect url='/ui-showcase' />;
                }}
                exact={true}
              />,
              <stencil-route url={`/ui-showcase`} component='showcases-page' exact={true} />,
              <stencil-route url={`${Environment.basePathWeb}/md-reader`} component='markdown-reader' />
            ]
            : [
              <stencil-route url={`${Environment.basePathWeb}/ui-showcase`} component='showcases-page' exact={true} />
            ]}

          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/buttons`} component='buttons-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/form`} component='form-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/navbars-list`} component='navbars-list-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/icon-navbars`} component='icon-navbars-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/label-navbars`} component='label-navbars-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/icon-label-navbars`} component='icon-label-navbars-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/list-items`} component='list-items' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/headers`} component='headers-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/accordian`} component='accordian-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/tab`} component='tab-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/loader`} component='loader-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/onboarding`} component='onboarding-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/progress-bar`} component='progress-bar-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/carousel-slider`} component='carousel-slider-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/badges`} component='badges-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/modal`} component='modal-page' />
          <stencil-route url={`${Environment.basePathWeb}/ui-showcase/home`} component='home-page' />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
