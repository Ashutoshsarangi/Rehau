import { Component, OnInit } from '@angular/core';
import { CacheService, LogService, LoginService, AuthService } from 'rehau-functional-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private cacheService: CacheService,
    private logService: LogService,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.logService.log('Check whether user data is present in Local storage/store');
  }
  login() {
    // try {
    //   this.authService.isLoggedIn().then(isLoggedIn => {
    //     this.logService.log('User exist or not');
    //     this.logService.log(isLoggedIn);
    //   });
    // } catch (err) {
    //   this.logService.log_e('Error occured in isLoggedIn method');
    // }
    this.logService.log('Am calling is login forst for first time');
    try {
      this.loginService.cidaasAuth(' login token').then(res => {
        this.logService.log('final result===', res);
        if (res === undefined) {
          this.logService.log_e('User closed the CIDAAS AUTH POPUP');
        } else if (res.status === '0') {
          this.logService.log('refresh token success');
          this.logService.log(res);
          this.router.navigate(['/landing']);
        } else {
          this.logService.log_e('Error while log in == ' + res.message);
        }
      });
    } catch (err) {
      this.logService.log_e('error in test app in cidaasAuth');
    }
  }


}
