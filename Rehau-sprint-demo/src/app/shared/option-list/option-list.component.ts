import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { LogService, CacheService, LoginService } from 'rehau-functional-core/dist/rehau-functional-core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { settingsAction } from '../../stores/settings/action/settings.action';
import { SettingsModel } from '../../stores/model/settings.model';
import { LeakageSettingsModel } from '../../stores/model/settings.model';
import { leakageSettingsActions } from '../../stores/settings/action/settings.action';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css'],
})

export class AppOptionListComponent {
  @Input() listItems: any[];
  @Input() icon: '';
  @Input() picklist: boolean;
  @Input() isSubTitle: boolean;
  currentlySelected: any;
  settingsParam$: Observable<SettingsModel>;
  leakageSettingsParam$: Observable<LeakageSettingsModel>;
  settingsParams: any;
  leakageSettingsParams: any;

  constructor(
    private router: Router,
    private logService: LogService,
    private cacheService: CacheService,
    private loginService: LoginService,
    private store: Store<{ settingsData: SettingsModel, leakageSettingData: LeakageSettingsModel }>
  ) {
    this.settingsParam$ = store.pipe(select('settingsData'));
    this.leakageSettingsParam$ = store.pipe(select('leakageSettingData'));
  }



  /**
   * This function used for the navigation on click of any list view
   * @param event this will contain the object of selected list
   */
  async navigateAction(event) {
    const text = event.detail.title;
    const url = event.detail.url;
    if (text === 'Logout') {
      try {
        this.loginService.cidaasLogout().then(res => {
          this.logService.log('logged out successfully', res);
        });
        this.router.navigate(['/' + url]);
      } catch (err) {
        this.logService.log_e('error in Logged out method', err);
      }
    } else {
      if (url) {
        this.router.navigate(['/' + url]);
      } else {
        this.logService.log_e('Page is not designed yet');
      }
    }
  }

  /**
   * This function will update the settings parameters based on the checkbox selected by user
   * @param event this will contain the object of selected list
   */
  async selectAction(event) {
    this.logService.log('slect item-->', event.target.itemList);
    const index = event.target.itemList.indexOf(event.target.itemList.find(list => list.active ===  true));
    this.logService.log_e('index--->', index);
    this.logService.log_w('category --->', event.target.itemList[index].category);
    switch (event.target.itemList[index].category) {
      case 'dropLeakage': {
         this.updateLeakageSettingsParam(index, event);
         break;
      }
      default: {
         this.updateSettingsParam(index, event);
         break;
      }
    }

  }

  /**
   * This function will update the leakage settings parameters based on the checkbox selected by user
   * @param index index of selected target in the list item
   * @param event this will contain the object of selected list
   */
  async updateLeakageSettingsParam(index, event) {
    const type = event.target.itemList[index].type;
    const value = event.target.itemList[index].title;

    this.logService.log('index, value, type, subValue', index, value, type);
    this.leakageSettingsParam$.subscribe((data) => {
      this.leakageSettingsParams = data.dropLeakage;
    });

    this.logService.log('leakage data -->', this.leakageSettingsParams);
    this.leakageSettingsParams[type].selectedParam = index;
    this.logService.log('after parameter changes', this.leakageSettingsParams);
    this.store.dispatch(leakageSettingsActions({ payload: { dropLeakage: this.leakageSettingsParams } }));
  }

  /**
   * This function will update the settings parameters based on the checkbox selected by user
   * @param index index of selected target in the list item
   * @param event this will contain the object of selected list
   */
  async updateSettingsParam(index, event) {
    const type = event.target.itemList[index].type;
    const value = event.target.itemList[index].title;

    this.logService.log('index, value, type, subValue', index, value, type);
    this.settingsParam$.subscribe((data) => {
      this.settingsParams = data.settingsParams;
    });

    await Object.keys(this.settingsParams).forEach((item) => {
      if (this.settingsParams[item].hasOwnProperty(type)) {
        Object.keys(this.settingsParams[item]).forEach((key) => {
          this.settingsParams[item][type].selectedParam = index;
        });
      }
    });

    this.logService.log('after parameter changes', this.settingsParams);
    this.store.dispatch(settingsAction({ payload: { settingsParams: this.settingsParams } }));
  }


}
