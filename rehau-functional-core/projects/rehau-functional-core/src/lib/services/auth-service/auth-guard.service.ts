import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogService } from '../logger-service/logger.service';
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
        private logService: LogService,
        private authService: AuthService,
        private router: Router,
        @Inject('SERVICE_CONFIG') public configuration: any
    ) {
    }

  /**
   * @description This method will check user already login or not
   * @returns Return the true if user already logged in or else false
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.logService.log('can Activate method is called!!!');
    const loginScreenUrl = this.configuration.globalConfig.loginScreenUrl;
    try {
        return this.authService.isLoggedIn().then(isLoggedIn => {
          this.logService.log('User exist or not', isLoggedIn);
          if (isLoggedIn) {
            this.logService.log('Already logged in user!!!');
            return true;
          } else {
            this.logService.log_w('Please do login to continue......');
            this.router.navigate(['/' + loginScreenUrl]); // this route will be based on parameter passed in global config
            return false;
          }
        });
      } catch (err) {
        this.logService.log_e('Error occured in isLoggedIn method');
        return false;
      }
  }
}
