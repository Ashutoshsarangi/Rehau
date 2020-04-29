import { Component, OnInit } from '@angular/core';
import { CacheService, LogService, LoginService, AuthService } from 'rehau-functional-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private cacheService: CacheService,
    private logService: LogService,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
  }


}
