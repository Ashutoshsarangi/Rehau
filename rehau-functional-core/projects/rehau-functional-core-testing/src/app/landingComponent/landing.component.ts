import { Component } from '@angular/core';
import { CacheService, StoreService, AuthService, LoginService  } from 'rehau-functional-core';
import { LogService } from 'rehau-functional-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(
    private cacheService: CacheService,
    private logService: LogService,
    private storeService: StoreService,
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router
  ) { }

  logout() {
    try {
      this.loginService.cidaasLogout().then(res => {
        this.logService.log('Logout success', res);
        this.router.navigate(['/home']);
      });
    } catch (err) {
      this.logService.log_e('Error occured in isLoggedIn method', err);
    }
  }

}
