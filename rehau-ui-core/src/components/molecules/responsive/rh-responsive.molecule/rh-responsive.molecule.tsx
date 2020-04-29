import { Component, Prop, h, State } from '@stencil/core';

import { Breakpoints, ResponsiveController } from '../responsive.controller';

import { Subscription } from 'rxjs';

@Component({
  tag: 'rh-responsive',
  styleUrl: 'rh-responsive.molecule.scss',
  shadow: true
})
export class MhResponsiveMolecule {
  @Prop() public breakpoints: Breakpoints[];

  @State() private currentBreakpoint: Breakpoints;

  private resizeSubscription: Subscription;

  constructor() {}

  public componentWillLoad(): void {
    const responsiveController: ResponsiveController = new ResponsiveController();
    this.resizeSubscription = responsiveController.resizeDispatcher().subscribe(([breakpoint]) => {
      this.currentBreakpoint = breakpoint;
    });
  }

  public componentDidUnload(): void {
    this.resizeSubscription.unsubscribe();
  }

  public render(): any {
    return this.breakpoints.includes(this.currentBreakpoint[0]) ? <slot></slot> : {};
  }
}
