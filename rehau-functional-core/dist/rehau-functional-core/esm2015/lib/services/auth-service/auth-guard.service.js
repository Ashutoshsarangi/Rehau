/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../logger-service/logger.service';
import { AuthService } from '../auth-service/auth.service';
export class AuthGuard {
    /**
     * @param {?} logService
     * @param {?} authService
     * @param {?} router
     * @param {?} configuration
     */
    constructor(logService, authService, router, configuration) {
        this.logService = logService;
        this.authService = authService;
        this.router = router;
        this.configuration = configuration;
    }
    /**
     * \@description This method will check user already login or not
     * @return {?} Return the true if user already logged in or else false
     */
    canActivate() {
        this.logService.log('can Activate method is called!!!');
        /** @type {?} */
        const loginScreenUrl = this.configuration.globalConfig.loginScreenUrl;
        try {
            return this.authService.isLoggedIn().then((/**
             * @param {?} isLoggedIn
             * @return {?}
             */
            isLoggedIn => {
                this.logService.log('User exist or not', isLoggedIn);
                if (isLoggedIn) {
                    this.logService.log('Already logged in user!!!');
                    return true;
                }
                else {
                    this.logService.log_w('Please do login to continue......');
                    this.router.navigate(['/' + loginScreenUrl]); // this route will be based on parameter passed in global config
                    return false;
                }
            }));
        }
        catch (err) {
            this.logService.log_e('Error occured in isLoggedIn method');
            return false;
        }
    }
}
AuthGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthGuard.ctorParameters = () => [
    { type: LogService },
    { type: AuthService },
    { type: Router },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthGuard.prototype.logService;
    /**
     * @type {?}
     * @private
     */
    AuthGuard.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    AuthGuard.prototype.router;
    /** @type {?} */
    AuthGuard.prototype.configuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2F1dGgtc2VydmljZS9hdXRoLWd1YXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBZSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzNELE1BQU0sT0FBTyxTQUFTOzs7Ozs7O0lBR3BCLFlBQ2MsVUFBc0IsRUFDdEIsV0FBd0IsRUFDeEIsTUFBYyxFQUNXLGFBQWtCO1FBSDNDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNXLGtCQUFhLEdBQWIsYUFBYSxDQUFLO0lBRXZELENBQUM7Ozs7O0lBTUgsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7O2NBQ2xELGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxjQUFjO1FBQ3JFLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSTs7OztZQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDckQsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztvQkFDakQsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdFQUFnRTtvQkFDOUcsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQzVELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDTCxDQUFDOzs7WUFuQ0YsVUFBVTs7OztZQUhGLFVBQVU7WUFDVixXQUFXO1lBSEUsTUFBTTs0Q0FhbkIsTUFBTSxTQUFDLGdCQUFnQjs7Ozs7OztJQUh4QiwrQkFBOEI7Ozs7O0lBQzlCLGdDQUFnQzs7Ozs7SUFDaEMsMkJBQXNCOztJQUN0QixrQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgQEluamVjdCgnU0VSVklDRV9DT05GSUcnKSBwdWJsaWMgY29uZmlndXJhdGlvbjogYW55XG4gICAgKSB7XG4gICAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2Qgd2lsbCBjaGVjayB1c2VyIGFscmVhZHkgbG9naW4gb3Igbm90XG4gICAqIEByZXR1cm5zIFJldHVybiB0aGUgdHJ1ZSBpZiB1c2VyIGFscmVhZHkgbG9nZ2VkIGluIG9yIGVsc2UgZmFsc2VcbiAgICovXG4gIGNhbkFjdGl2YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnY2FuIEFjdGl2YXRlIG1ldGhvZCBpcyBjYWxsZWQhISEnKTtcbiAgICBjb25zdCBsb2dpblNjcmVlblVybCA9IHRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcubG9naW5TY3JlZW5Vcmw7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuaXNMb2dnZWRJbigpLnRoZW4oaXNMb2dnZWRJbiA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnVXNlciBleGlzdCBvciBub3QnLCBpc0xvZ2dlZEluKTtcbiAgICAgICAgICBpZiAoaXNMb2dnZWRJbikge1xuICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnQWxyZWFkeSBsb2dnZWQgaW4gdXNlciEhIScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfdygnUGxlYXNlIGRvIGxvZ2luIHRvIGNvbnRpbnVlLi4uLi4uJyk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nICsgbG9naW5TY3JlZW5VcmxdKTsgLy8gdGhpcyByb3V0ZSB3aWxsIGJlIGJhc2VkIG9uIHBhcmFtZXRlciBwYXNzZWQgaW4gZ2xvYmFsIGNvbmZpZ1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ19lKCdFcnJvciBvY2N1cmVkIGluIGlzTG9nZ2VkSW4gbWV0aG9kJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgfVxufVxuIl19