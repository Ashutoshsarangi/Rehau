import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HorizontalTabMenuModel } from '../interface/horizontal-tab-menu-model';
import { LogService, slideInAnimation } from 'rehau-functional-core/dist/rehau-functional-core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [slideInAnimation],
})
export class LandingComponent implements OnInit, AfterViewInit {

  isOnline: boolean;
  navLinks: any[];
  activeLinkIndex = -1;
  animationState: number;
  tabSelectedIndex = 0;
  goBack = false;
  onBoardingElements = [];
  tempActive;
  progressValue = '-1';


  constructor(
    private router: Router,
    private logService: LogService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.tempActive = '';
    this.matIconRegistry.addSvgIcon(
      'icon1',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/banner/410-d-062-cl.jpg')
    );
    this.navLinks = [
      {
        label: 'Home',
        link: './home',
        icon: 'icon-home',
        iconActive: 'icon-home-filled',
        index: 0
      }, {
        label: 'Notification',
        link: './notification',
        icon: 'icon-notification',
        iconActive: 'icon-notification-fill',
        index: 1
      }, {
        label: 'Settings',
        link: './settings',
        icon: 'icon-settings',
        iconActive: 'icon-settings-filled',
        index: 2
      },
    ];
  }

  ngOnInit() {
    // if (this.router.url === '/landing?reload=') {
    //   this.isOnline = true;
    // }
    // this.router.events.subscribe((res) => {
    //   this.isOnline = false;
    //   this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    // });
  }

  ngAfterViewInit() {
    (document.querySelector('.mat-tab-links') as HTMLElement).style.width = '100%';
    (document.querySelector('.mat-tab-links') as HTMLElement).style.justifyContent = 'space-evenly';
    (document.querySelector('.mat-tab-links') as HTMLElement).style.alignItems = 'center';
    (document.querySelector('.mat-ink-bar') as HTMLElement).style.display = 'none';
  }

  onActivate($event) {
    this.animationState = this.route.firstChild.snapshot.data['routeIdx'];
  }

  handleSelect(data) {
    console.log(data);
    this.tabSelectedIndex = this.navLinks.indexOf(data);
  }

  // doChange() {
  //   setTimeout(() => {
  //     console.log('HEllo');
  //     this.goBack = true;
  //   }, 2000);
  // }
  // testNextClick(event) {
  //   // console.log(event.detail);
  //   const index = this.onBoardingElements.indexOf(event.detail);
  //   if (event.detail.progress) {
  //     let i = 1;
  //     const intval = setInterval(() => {
  //       if (i <= 5) {
  //         this.progressValue = (20 * i).toString();
  //       }
  //       i++;
  //     }, 300);
  //     if (i % 5 === 0) {
  //       console.log('Hey Got Called');
  //       clearInterval(intval);
  //     }

  //   }
  //   // console.log('The Important Index');
  //   setTimeout(() => {
  //     console.log('Next');
  //     this.tempActive = 'next-' + index;
  //   }, 3000);
  // }
  // testPrevClick(event) {
  //   // console.log(event.detail);
  //   const index = this.onBoardingElements.indexOf(event.detail);
  //   // console.log('The Important Index');
  //   setTimeout(() => {
  //     console.log('Prev');
  //     this.tempActive = 'prev-' + index;
  //   }, 3000);
  // }
}
