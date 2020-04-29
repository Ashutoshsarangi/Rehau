import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogService } from '../logger-service/logger.service';
import { AuthService } from '../auth-service/auth.service';
export declare class AuthGuard implements CanActivate {
    private logService;
    private authService;
    private router;
    configuration: any;
    constructor(logService: LogService, authService: AuthService, router: Router, configuration: any);
    /**
     * @description This method will check user already login or not
     * @returns Return the true if user already logged in or else false
     */
    canActivate(): Observable<boolean> | Promise<boolean> | boolean;
}
