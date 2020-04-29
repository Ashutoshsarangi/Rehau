// IONIC - ANGULAR
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LogService, CacheService, TranslationService } from 'rehau-functional-core/dist/rehau-functional-core';
import { SettingsModel } from '../stores/model/settings.model';
import { settingsAction } from '../stores/settings/action/settings.action';

// import { AppCacheService } from '../services/cache.service';

@Injectable()
export class SettingService {
    settingsParam$: Observable<SettingsModel>;
    constructor(
        private logService: LogService,
        private cacheService: CacheService,
        private translationService: TranslationService,
        private store: Store<{ settingsData: SettingsModel }>
     ) {
        this.settingsParam$ = store.pipe(select('settingsData'));
     }

    /**
     * @description This function will update the state of settings parameters in Store and local storage
     * @returns object of settings parameter
     */
    dispatchSettingsParams(data) {
        this.logService.log('in dispatch method', data);
        this.cacheService.setLocalData('settingsParms', data);
        this.store.dispatch(settingsAction({ payload: { settingsParams: data } }));
    }

    /**
     * @description This function will return the latest state of settingsParam
     * @returns object of settings parameter
     */
    async getSettingsData() {
        let settingData;
        settingData = await this.cacheService.getLocalData('settingsParms');
        this.logService.log('setting data from locat store --->', settingData);
        if (settingData) {
            this.logService.log('updating Ng store', settingData);
            this.dispatchSettingsParams(settingData);
        } else {
            this.logService.log_w('setting param not in local store', settingData);
            this.settingsParam$.subscribe((data) => {
                settingData = data.settingsParams;
                this.logService.log('setting param update in local storage with initial value of NG store', settingData);
                this.cacheService.setLocalData('settingsParms', settingData);
            });
        }
        return settingData;
    }

}
