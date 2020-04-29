/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { transition, trigger, query, style, animate, group } from '@angular/animations';
/** @type {?} */
export const slideInAnimation = trigger('routeAnimations', [
    transition('TabLevel => SecondLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('ThirdLevel => ForthLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('SecondLevel => ThirdLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('SecondLevel => TabLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('ForthLevel => ThirdLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('ThirdLevel => SecondLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(100%)' }))
            ], { optional: true })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3JvdXRlLWFuaW1hdGlvbi9yb3V0ZS1hbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFFTixNQUFNLHFCQUFxQixDQUFDOztBQUU3QixNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixFQUFFO0lBQ3pELFVBQVUsQ0FBQyx5QkFBeUIsRUFBRTtRQUNwQyxLQUFLLENBQ0gsZ0JBQWdCLEVBQ2hCLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFDM0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQ25CO1FBQ0QsS0FBSyxDQUFDO1lBQ0osS0FBSyxDQUNILFFBQVEsRUFDUjtnQkFDRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2FBQ2hFLEVBQ0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQ25CO1lBQ0QsS0FBSyxDQUNILFFBQVEsRUFDUjtnQkFDRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2FBQ25FLEVBQ0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQ25CO1NBQ0Ys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LE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDeEYsS0FBSyxDQUFDO1lBQ0YsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekgsUUFBUSxFQUFFLElBQUk7YUFDakIsQ0FBQztZQUNGLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFILFFBQVEsRUFBRSxJQUFJO2FBQ2pCLENBQUM7U0FDTCxDQUFDO0tBQ0gsQ0FBQztDQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgaXMgdGhlIGFuaW1hdGlvbiBmaWxlIHVzZWQgZm9yIGNyZWF0aW5nIGFuaW1hdGlvbnMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICogRm9yIFRhYiB3ZSBoYXZlIHRvIGdpdmUgXCJkYXRhOiB7IHJvdXRlSWR4OiAwIH1cIiBpbiB0aGUgcm91dGluZyBwYXJhbXMuIEVhY2ggY29tcG9uZW50IHNob3VsZCBiZSBnaXZlbiBhIHJvdXRlSWR4LlxuICogVGhlbiB3aXRoaW4gdGhlIHRhYiBjb21wb25lbnQgKHRoZSBjb21wb25lbnQgd2hpY2ggaGFzIHRoZSB0YWJzKSBuZWVkIGhhdmUgdGhlIGJlbG93IGZ1bmN0aW9uLlxuICogb25BY3RpdmF0ZSgkZXZlbnQpIHsgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHRoaXMucm91dGUuZmlyc3RDaGlsZC5zbmFwc2hvdC5kYXRhWydyb3V0ZUlkeCddO31cbiAqIEFuZCB0aGUgcGFyYW0gdG8gYmUgYWRkZWQgaXMgYW5pbWF0aW9uU3RhdGUuIEluIHRoZSBodG1sIGZpbGUgZm9yIHRoZSB0YWIgY29tcG9uZW50IGFkZCB0aGUgdGFnXG4gKiA8ZGl2IFtAcm91dGVBbmltYXRpb25zXT1cImFuaW1hdGlvblN0YXRlXCI+PHJvdXRlci1vdXRsZXQgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiPjwvcm91dGVyLW91dGxldD48L2Rpdj5cbiAqIFRoaXMgd2F5IHRoZSB0YWIgYW5pbWF0aW9uIHdvdWxkIHdvcmsgZmluZS5cbiAqXG4gKiBGb3Igb3RoZXIgbmF2aWdhdGlvbnMgd2UgaGF2ZSBhbmltYXRpb24gdmFsdWVzIGFzIFwiVGFiTGV2ZWxcIiwgXCJTZWNvbmRMZXZlbFwiLCBcIlRoaXJkTGV2ZWxcIiwgXCJGb3J0aGxldmVsXCJcbiAqIEFkZCB0aGUgdmFsdWUgcHJvcGVybHkgaW4geW91ciByb3V0ZXMgZm9yIGFuaW1hdGlvbnMgYW5kIGltcG9ydCB0aGUgc2xpZGVJbkFuaW1hdGlvbiBhcyBhIHBhcmFtIGluIHRoZSBDb21wb25lbnQgZGVjb3JhdG9yXG4gKi9cblxuaW1wb3J0IHtcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbiAgcXVlcnksXG4gIHN0eWxlLFxuICBhbmltYXRlLFxuICBncm91cCxcbiAgYW5pbWF0ZUNoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5leHBvcnQgY29uc3Qgc2xpZGVJbkFuaW1hdGlvbiA9IHRyaWdnZXIoJ3JvdXRlQW5pbWF0aW9ucycsIFtcbiAgdHJhbnNpdGlvbignVGFiTGV2ZWwgPT4gU2Vjb25kTGV2ZWwnLCBbXG4gICAgcXVlcnkoXG4gICAgICAnOmVudGVyLCA6bGVhdmUnLFxuICAgICAgc3R5bGUoeyBwb3NpdGlvbjogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfSksXG4gICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICApLFxuICAgIGdyb3VwKFtcbiAgICAgIHF1ZXJ5KFxuICAgICAgICAnOmVudGVyJyxcbiAgICAgICAgW1xuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScgfSksXG4gICAgICAgICAgYW5pbWF0ZSgnMC4xNXMgbGluZWFyJywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScgfSkpXG4gICAgICAgIF0sXG4gICAgICAgIHsgb3B0aW9uYWw6IHRydWUgfVxuICAgICAgKSxcbiAgICAgIHF1ZXJ5KFxuICAgICAgICAnOmxlYXZlJyxcbiAgICAgICAgW1xuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknIH0pLFxuICAgICAgICAgIGFuaW1hdGUoJzAuMTVzIGxpbmVhcicsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknIH0pKVxuICAgICAgICBdLFxuICAgICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICAgIClcbiAgICBdKVxuICBdKSxcbiAgdHJhbnNpdGlvbignVGhpcmRMZXZlbCA9PiBGb3J0aExldmVsJywgW1xuICAgIHF1ZXJ5KFxuICAgICAgJzplbnRlciwgOmxlYXZlJyxcbiAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH0pLFxuICAgICAgeyBvcHRpb25hbDogdHJ1ZSB9XG4gICAgKSxcbiAgICBncm91cChbXG4gICAgICBxdWVyeShcbiAgICAgICAgJzplbnRlcicsXG4gICAgICAgIFtcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknIH0pLFxuICAgICAgICAgIGFuaW1hdGUoJzAuMTVzIGxpbmVhcicsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknIH0pKVxuICAgICAgICBdLFxuICAgICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICAgICksXG4gICAgICBxdWVyeShcbiAgICAgICAgJzpsZWF2ZScsXG4gICAgICAgIFtcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyB9KSxcbiAgICAgICAgICBhbmltYXRlKCcwLjE1cyBsaW5lYXInLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyB9KSlcbiAgICAgICAgXSxcbiAgICAgICAgeyBvcHRpb25hbDogdHJ1ZSB9XG4gICAgICApXG4gICAgXSlcbiAgXSksXG4gIHRyYW5zaXRpb24oJ1NlY29uZExldmVsID0+IFRoaXJkTGV2ZWwnLCBbXG4gICAgcXVlcnkoXG4gICAgICAnOmVudGVyLCA6bGVhdmUnLFxuICAgICAgc3R5bGUoeyBwb3NpdGlvbjogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfSksXG4gICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICApLFxuICAgIGdyb3VwKFtcbiAgICAgIHF1ZXJ5KFxuICAgICAgICAnOmVudGVyJyxcbiAgICAgICAgW1xuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScgfSksXG4gICAgICAgICAgYW5pbWF0ZSgnMC4xNXMgbGluZWFyJywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScgfSkpXG4gICAgICAgIF0sXG4gICAgICAgIHsgb3B0aW9uYWw6IHRydWUgfVxuICAgICAgKSxcbiAgICAgIHF1ZXJ5KFxuICAgICAgICAnOmxlYXZlJyxcbiAgICAgICAgW1xuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknIH0pLFxuICAgICAgICAgIGFuaW1hdGUoJzAuMTVzIGxpbmVhcicsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknIH0pKVxuICAgICAgICBdLFxuICAgICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICAgIClcbiAgICBdKVxuICBdKSxcbiAgdHJhbnNpdGlvbignU2Vjb25kTGV2ZWwgPT4gVGFiTGV2ZWwnLCBbXG4gICAgcXVlcnkoXG4gICAgICAnOmVudGVyLCA6bGVhdmUnLFxuICAgICAgc3R5bGUoeyBwb3NpdGlvbjogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfSksXG4gICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICApLFxuICAgIGdyb3VwKFtcbiAgICAgIHF1ZXJ5KFxuICAgICAgICAnOmVudGVyJyxcbiAgICAgICAgW1xuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknIH0pLFxuICAgICAgICAgIGFuaW1hdGUoJzAuMTVzIGxpbmVhcicsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknIH0pKVxuICAgICAgICBdLFxuICAgICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICAgICksXG4gICAgICBxdWVyeShcbiAgICAgICAgJzpsZWF2ZScsXG4gICAgICAgIFtcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyB9KSxcbiAgICAgICAgICBhbmltYXRlKCcwLjE1cyBsaW5lYXInLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknIH0pKVxuICAgICAgICBdLFxuICAgICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICAgIClcbiAgICBdKVxuICBdKSxcbiAgdHJhbnNpdGlvbignRm9ydGhMZXZlbCA9PiBUaGlyZExldmVsJywgW1xuICAgIHF1ZXJ5KFxuICAgICAgJzplbnRlciwgOmxlYXZlJyxcbiAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH0pLFxuICAgICAgeyBvcHRpb25hbDogdHJ1ZSB9XG4gICAgKSxcbiAgICBncm91cChbXG4gICAgICBxdWVyeShcbiAgICAgICAgJzplbnRlcicsXG4gICAgICAgIFtcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyB9KSxcbiAgICAgICAgICBhbmltYXRlKCcwLjE1cyBsaW5lYXInLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyB9KSlcbiAgICAgICAgXSxcbiAgICAgICAgeyBvcHRpb25hbDogdHJ1ZSB9XG4gICAgICApLFxuICAgICAgcXVlcnkoXG4gICAgICAgICc6bGVhdmUnLFxuICAgICAgICBbXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScgfSksXG4gICAgICAgICAgYW5pbWF0ZSgnMC4xNXMgbGluZWFyJywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyB9KSlcbiAgICAgICAgXSxcbiAgICAgICAgeyBvcHRpb25hbDogdHJ1ZSB9XG4gICAgICApXG4gICAgXSlcbiAgXSksXG4gIHRyYW5zaXRpb24oJ1RoaXJkTGV2ZWwgPT4gU2Vjb25kTGV2ZWwnLCBbXG4gICAgcXVlcnkoXG4gICAgICAnOmVudGVyLCA6bGVhdmUnLFxuICAgICAgc3R5bGUoeyBwb3NpdGlvbjogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfSksXG4gICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICApLFxuICAgIGdyb3VwKFtcbiAgICAgIHF1ZXJ5KFxuICAgICAgICAnOmVudGVyJyxcbiAgICAgICAgW1xuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknIH0pLFxuICAgICAgICAgIGFuaW1hdGUoJzAuMTVzIGxpbmVhcicsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknIH0pKVxuICAgICAgICBdLFxuICAgICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICAgICksXG4gICAgICBxdWVyeShcbiAgICAgICAgJzpsZWF2ZScsXG4gICAgICAgIFtcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyB9KSxcbiAgICAgICAgICBhbmltYXRlKCcwLjE1cyBsaW5lYXInLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknIH0pKVxuICAgICAgICBdLFxuICAgICAgICB7IG9wdGlvbmFsOiB0cnVlIH1cbiAgICAgIClcbiAgICBdKVxuICBdKSxcbiAgICB0cmFuc2l0aW9uKCc6ZGVjcmVtZW50JywgW1xuICAgICAgcXVlcnkoJzplbnRlciwgOmxlYXZlJywgc3R5bGUoeyBwb3NpdGlvbjogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9KSwgeyBvcHRpb25hbDogdHJ1ZSB9KSxcbiAgICAgIGdyb3VwKFtcbiAgICAgICAgICBxdWVyeSgnOmVudGVyJywgW3N0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknIH0pLCBhbmltYXRlKCcuM3MgZWFzZS1vdXQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyB9KSldLCB7XG4gICAgICAgICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHF1ZXJ5KCc6bGVhdmUnLCBbc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScgfSksIGFuaW1hdGUoJy4zcyBlYXNlLW91dCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScgfSkpXSwge1xuICAgICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICAgIHRyYW5zaXRpb24oJzppbmNyZW1lbnQnLCBbXG4gICAgICBxdWVyeSgnOmVudGVyLCA6bGVhdmUnLCBzdHlsZSh7IHBvc2l0aW9uOiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH0pLCB7IG9wdGlvbmFsOiB0cnVlIH0pLFxuICAgICAgZ3JvdXAoW1xuICAgICAgICAgIHF1ZXJ5KCc6ZW50ZXInLCBbc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyB9KSwgYW5pbWF0ZSgnLjNzIGVhc2Utb3V0Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScgfSkpXSwge1xuICAgICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBxdWVyeSgnOmxlYXZlJywgW3N0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknIH0pLCBhbmltYXRlKCcuM3MgZWFzZS1vdXQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyB9KSldLCB7XG4gICAgICAgICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgXSksXG5dKTtcbiJdfQ==