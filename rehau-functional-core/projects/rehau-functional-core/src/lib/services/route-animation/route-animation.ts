/**
 * This is the animation file used for creating animations in the application.
 * For Tab we have to give "data: { routeIdx: 0 }" in the routing params. Each component should be given a routeIdx.
 * Then within the tab component (the component which has the tabs) need have the below function.
 * onActivate($event) { this.animationState = this.route.firstChild.snapshot.data['routeIdx'];}
 * And the param to be added is animationState. In the html file for the tab component add the tag
 * <div [@routeAnimations]="animationState"><router-outlet (activate)="onActivate($event)"></router-outlet></div>
 * This way the tab animation would work fine.
 *
 * For other navigations we have animation values as "TabLevel", "SecondLevel", "ThirdLevel", "Forthlevel"
 * Add the value properly in your routes for animations and import the slideInAnimation as a param in the Component decorator
 */

import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('TabLevel => SecondLevel', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100%' }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.15s linear', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('ThirdLevel => ForthLevel', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100%' }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.15s linear', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('SecondLevel => ThirdLevel', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100%' }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.15s linear', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('SecondLevel => TabLevel', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100%' }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.15s linear', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.15s linear', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('ForthLevel => ThirdLevel', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100%' }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.15s linear', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.15s linear', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('ThirdLevel => SecondLevel', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100%' }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.15s linear', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.15s linear', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
    transition(':decrement', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
          query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
              optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
              optional: true,
          }),
      ]),
    ]),
    transition(':increment', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
          query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
              optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
              optional: true,
          }),
      ]),
    ]),
]);
