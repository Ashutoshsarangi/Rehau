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
export declare const slideInAnimation: import("@angular/animations").AnimationTriggerMetadata;
