/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../logger-service/logger.service';
import { AuthService } from '../auth-service/auth.service';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(logService, authService, router, configuration) {
        this.logService = logService;
        this.authService = authService;
        this.router = router;
        this.configuration = configuration;
    }
    /**
     * @description This method will check user already login or not
     * @returns Return the true if user already logged in or else false
     */
    /**
     * \@description This method will check user already login or not
     * @return {?} Return the true if user already logged in or else false
     */
    AuthGuard.prototype.canActivate = /**
     * \@description This method will check user already login or not
     * @return {?} Return the true if user already logged in or else false
     */
    function () {
        var _this = this;
        this.logService.log('can Activate method is called!!!');
        /** @type {?} */
        var loginScreenUrl = this.configuration.globalConfig.loginScreenUrl;
        try {
            return this.authService.isLoggedIn().then((/**
             * @param {?} isLoggedIn
             * @return {?}
             */
            function (isLoggedIn) {
                _this.logService.log('User exist or not', isLoggedIn);
                if (isLoggedIn) {
                    _this.logService.log('Already logged in user!!!');
                    return true;
                }
                else {
                    _this.logService.log_w('Please do login to continue......');
                    _this.router.navigate(['/' + loginScreenUrl]); // this route will be based on parameter passed in global config
                    return false;
                }
            }));
        }
        catch (err) {
            this.logService.log_e('Error occured in isLoggedIn method');
            return false;
        }
    };
    AuthGuard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: LogService },
        { type: AuthService },
        { type: Router },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    return AuthGuard;
}());
export { AuthGuard };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2F1dGgtc2VydmljZS9hdXRoLWd1YXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBZSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTNEO0lBSUUsbUJBQ2MsVUFBc0IsRUFDdEIsV0FBd0IsRUFDeEIsTUFBYyxFQUNXLGFBQWtCO1FBSDNDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNXLGtCQUFhLEdBQWIsYUFBYSxDQUFLO0lBRXZELENBQUM7SUFFSDs7O09BR0c7Ozs7O0lBQ0gsK0JBQVc7Ozs7SUFBWDtRQUFBLGlCQW1CQztRQWxCQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDOztZQUNsRCxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsY0FBYztRQUNyRSxJQUFJO1lBQ0EsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUk7Ozs7WUFBQyxVQUFBLFVBQVU7Z0JBQ2xELEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLFVBQVUsRUFBRTtvQkFDZCxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO29CQUNqRCxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO29CQUMzRCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0VBQWdFO29CQUM5RyxPQUFPLEtBQUssQ0FBQztpQkFDZDtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDNUQsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNMLENBQUM7O2dCQW5DRixVQUFVOzs7O2dCQUhGLFVBQVU7Z0JBQ1YsV0FBVztnQkFIRSxNQUFNO2dEQWFuQixNQUFNLFNBQUMsZ0JBQWdCOztJQTRCaEMsZ0JBQUM7Q0FBQSxBQXBDRCxJQW9DQztTQW5DWSxTQUFTOzs7Ozs7SUFJZCwrQkFBOEI7Ozs7O0lBQzlCLGdDQUFnQzs7Ozs7SUFDaEMsMkJBQXNCOztJQUN0QixrQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC1zZXJ2aWNlL2F1dGguc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgQEluamVjdCgnU0VSVklDRV9DT05GSUcnKSBwdWJsaWMgY29uZmlndXJhdGlvbjogYW55XG4gICAgKSB7XG4gICAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2Qgd2lsbCBjaGVjayB1c2VyIGFscmVhZHkgbG9naW4gb3Igbm90XG4gICAqIEByZXR1cm5zIFJldHVybiB0aGUgdHJ1ZSBpZiB1c2VyIGFscmVhZHkgbG9nZ2VkIGluIG9yIGVsc2UgZmFsc2VcbiAgICovXG4gIGNhbkFjdGl2YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnY2FuIEFjdGl2YXRlIG1ldGhvZCBpcyBjYWxsZWQhISEnKTtcbiAgICBjb25zdCBsb2dpblNjcmVlblVybCA9IHRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcubG9naW5TY3JlZW5Vcmw7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuaXNMb2dnZWRJbigpLnRoZW4oaXNMb2dnZWRJbiA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnVXNlciBleGlzdCBvciBub3QnLCBpc0xvZ2dlZEluKTtcbiAgICAgICAgICBpZiAoaXNMb2dnZWRJbikge1xuICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnQWxyZWFkeSBsb2dnZWQgaW4gdXNlciEhIScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nU2VydmljZS5sb2dfdygnUGxlYXNlIGRvIGxvZ2luIHRvIGNvbnRpbnVlLi4uLi4uJyk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nICsgbG9naW5TY3JlZW5VcmxdKTsgLy8gdGhpcyByb3V0ZSB3aWxsIGJlIGJhc2VkIG9uIHBhcmFtZXRlciBwYXNzZWQgaW4gZ2xvYmFsIGNvbmZpZ1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZ19lKCdFcnJvciBvY2N1cmVkIGluIGlzTG9nZ2VkSW4gbWV0aG9kJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgfVxufVxuIl19