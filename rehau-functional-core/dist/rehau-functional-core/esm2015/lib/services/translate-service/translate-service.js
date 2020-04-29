/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LogService } from '../logger-service/logger.service';
export class TranslationService {
    /**
     * @param {?} translateService
     * @param {?} configuration
     * @param {?} logService
     */
    constructor(translateService, configuration, logService) {
        this.translateService = translateService;
        this.configuration = configuration;
        this.logService = logService;
    }
    /**
     * @return {?}
     */
    initTranslation() {
        this.logService.log('I am Init Translator', this.configuration);
        if (this.configuration) {
            this.logService.log('I am in config', this.configuration);
            if (!!this.configuration.globalConfig.languages) {
                this.addLangs(this.splitLanguages(this.configuration.globalConfig.languages));
            }
            if (!!this.configuration.globalConfig.defaultLanguage) {
                this.setDefaultLang(this.configuration.globalConfig.defaultLanguage);
            }
            if (!!this.configuration.globalConfig.currentLanguage) {
                this.logService.log('Hey Its TRUE I need to be called');
                this.use(this.configuration.globalConfig.currentLanguage);
            }
        }
        else {
            this.logService.log('No configuration provided. This service has not default values. Set them before use.');
        }
    }
    /**
     * @private
     * @param {?} langs
     * @return {?}
     */
    splitLanguages(langs) {
        /** @type {?} */
        let availableLanguages = langs.split('|');
        return (availableLanguages = availableLanguages.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x.length > 0)));
    }
    /**
     * @return {?}
     */
    currentLang() {
        return this.translateService.currentLang;
    }
    /**
     * @return {?}
     */
    currentLoader() {
        return this.translateService.currentLoader;
    }
    /**
     * @return {?}
     */
    onLangChange() {
        return this.translateService.onLangChange;
    }
    /**
     * @return {?}
     */
    onTranslationChange() {
        return this.translateService.onTranslationChange;
    }
    /**
     * @return {?}
     */
    onDefaultLangChange() {
        return this.translateService.onDefaultLangChange;
    }
    // #endregion
    /**
     * \@description Sets the default language to use as a fallback
     * @param {?} lang language parameter needed
     * @return {?}
     */
    setDefaultLang(lang) {
        this.translateService.setDefaultLang(lang);
    }
    /**
     * \@description Gets the default language
     * @return {?}
     */
    getDefaultLang() {
        return this.translateService.getDefaultLang();
    }
    /**
     * \@description Changes the lang currently used
     * @param {?} lang language parameter needed
     * @return {?}
     */
    use(lang) {
        this.logService.log('The Use Function is called  ---> ', lang);
        return this.translateService.use(lang);
    }
    /**
     * \@description Gets an object of translations for a given language with the current loader
     * @param {?} lang language parameter needed
     * @return {?}
     */
    getTranslation(lang) {
        return this.translateService.getTranslation(lang);
    }
    /**
     * \@description Add new langs to the list
     * @param {?} langs language parameter needed
     * @return {?}
     */
    addLangs(langs) {
        this.translateService.addLangs(langs);
    }
    /**
     * \@description Returns an array of currently available langs
     * @return {?}
     */
    getLangs() {
        return this.translateService.getLangs();
    }
    /**
     * \@description Calls resetLang and retrieves the translations object for the current loader
     * @param {?} lang language parameter needed
     * @return {?}
     */
    reloadLang(lang) {
        return this.translateService.reloadLang(lang);
    }
    /**
     * \@description Removes the current translations for this lang. / You will have to call use, reloadLang or getTranslation again to be able to get translations
     * @param {?} lang language parameter needed
     * @return {?}
     */
    resetLang(lang) {
        this.translateService.resetLang(lang);
    }
    /**
     * \@description Returns the current browser lang if available, or undefined otherwise
     * @return {?}
     */
    getBrowserLang() {
        return this.translateService.getBrowserLang();
    }
    /**
     * \@description Returns the current browser culture language name (e.g. 'de-DE' if available, or undefined otherwise
     * @return {?}
     */
    getBrowserCultureLang() {
        return this.getBrowserCultureLang();
    }
    /**
     * \@description Gets the translated value of a key (or an array of keys) or the key if the value was not found
     * @param {?} key key of the json value
     * @param {?=} interpolateParams Object Optional
     * @return {?}
     */
    get(key, interpolateParams) {
        return this.translateService.get(key, interpolateParams);
    }
    /**
     * \@description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous. / You are responsible for knowing when your translations have been loaded and it is safe to use this method. / If you are not sure then you should use the get method instead
     * @param {?} key Key for the service
     * @return {?}
     */
    instant(key) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        subscriber => {
            console.log('Hello **********************');
            subscriber.next(this.translateService.instant(key));
        }));
    }
    /**
     * \@description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous. / You are responsible for knowing when your translations have been loaded and it is safe to use this method. / If you are not sure then you should use the get method instead
     * @param {?} item
     * @return {?}
     */
    instantObject(item) {
        if (Array.isArray(item)) {
            /** @type {?} */
            const temp = [];
            for (const element of item) {
                temp.push(this.mainInstant(element));
            }
            return new Observable((/**
             * @param {?} subscriber
             * @return {?}
             */
            subscriber => {
                console.log('Hello ######################');
                subscriber.next(temp);
            }));
        }
        else {
            return new Observable((/**
             * @param {?} subscriber
             * @return {?}
             */
            subscriber => {
                console.log('Hello $$$$$$$$$$$$$$$$$$$$$$');
                subscriber.next(this.mainInstant(item));
            }));
        }
    }
    /**
     * \@description Gets the instant value of each key in the object
     * @param {?} item
     * @return {?}
     */
    mainInstant(item) {
        /** @type {?} */
        const temp = {};
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                /** @type {?} */
                const keyVal = item[key];
                if (typeof keyVal === 'string' && keyVal.length > 0) {
                    /** @type {?} */
                    const val = this.translateService.instant(keyVal);
                    temp[key] = val;
                }
                else {
                    temp[key] = keyVal;
                }
            }
        }
        return temp;
    }
}
TranslationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TranslationService.ctorParameters = () => [
    { type: TranslateService },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] },
    { type: LogService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TranslationService.prototype.translateService;
    /** @type {?} */
    TranslationService.prototype.configuration;
    /**
     * @type {?}
     * @private
     */
    TranslationService.prototype.logService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdHJhbnNsYXRlLXNlcnZpY2UvdHJhbnNsYXRlLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBSUwsZ0JBQWdCLEVBRWpCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFVBQVUsRUFBdUIsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBSTlELE1BQU0sT0FBTyxrQkFBa0I7Ozs7OztJQUM3QixZQUNVLGdCQUFrQyxFQUFtQyxhQUFrQixFQUN2RixVQUFzQjtRQUR0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQW1DLGtCQUFhLEdBQWIsYUFBYSxDQUFLO1FBQ3ZGLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDOzs7O0lBRTlCLGVBQWU7UUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUMvRTtZQUNELElBQUksQ0FBQyxDQUFD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QUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7O0lBTU0sV0FBVyxDQUFDLElBQVk7O2NBQ3ZCLElBQUksR0FBRyxFQUFFO1FBQ2YsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztzQkFDdEIsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzswQkFDN0MsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO29CQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUNqQjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO2lCQUNwQjthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztZQWhNRixVQUFVOzs7O1lBUlQsZ0JBQWdCOzRDQVcrQixNQUFNLFNBQUMsZ0JBQWdCO1lBTi9ELFVBQVU7Ozs7Ozs7SUFNZiw4Q0FBMEM7O0lBQUUsMkNBQW1EOzs7OztJQUMvRix3Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdExhbmdDaGFuZ2VFdmVudCxcbiAgTGFuZ0NoYW5nZUV2ZW50LFxuICBUcmFuc2xhdGVMb2FkZXIsXG4gIFRyYW5zbGF0ZVNlcnZpY2UsXG4gIFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnRcbn0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmliZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXItc2VydmljZS9sb2dnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBpc0Jvb2xlYW4gfSBmcm9tICd1dGlsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0aW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSwgQEluamVjdCgnU0VSVklDRV9DT05GSUcnKSBwdWJsaWMgY29uZmlndXJhdGlvbjogYW55LFxuICAgIHByaXZhdGUgbG9nU2VydmljZTogTG9nU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGluaXRUcmFuc2xhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdJIGFtIEluaXQgVHJhbnNsYXRvcicsIHRoaXMuY29uZmlndXJhdGlvbik7XG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbikge1xuICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnSSBhbSBpbiBjb25maWcnLCB0aGlzLmNvbmZpZ3VyYXRpb24pO1xuICAgICAgaWYgKCEhdGhpcy5jb25maWd1cmF0aW9uLmdsb2JhbENvbmZpZy5sYW5ndWFnZXMpIHtcbiAgICAgICAgdGhpcy5hZGRMYW5ncyh0aGlzLnNwbGl0TGFuZ3VhZ2VzKHRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcubGFuZ3VhZ2VzKSk7XG4gICAgICB9XG4gICAgICBpZiAoISF0aGlzLmNvbmZpZ3VyYXRpb24uZ2xvYmFsQ29uZmlnLmRlZmF1bHRMYW5ndWFnZSkge1xuICAgICAgICB0aGlzLnNldERlZmF1bHRMYW5nKHRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcuZGVmYXVsdExhbmd1YWdlKTtcbiAgICAgIH1cbiAgICAgIGlmICghIXRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcuY3VycmVudExhbmd1YWdlKSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5sb2coJ0hleSBJdHMgVFJVRSBJIG5lZWQgdG8gYmUgY2FsbGVkJyk7XG4gICAgICAgIHRoaXMudXNlKHRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcuY3VycmVudExhbmd1YWdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnTm8gY29uZmlndXJhdGlvbiBwcm92aWRlZC4gVGhpcyBzZXJ2aWNlIGhhcyBub3QgZGVmYXVsdCB2YWx1ZXMuIFNldCB0aGVtIGJlZm9yZSB1c2UuJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzcGxpdExhbmd1YWdlcyhsYW5nczogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgbGV0IGF2YWlsYWJsZUxhbmd1YWdlczogQXJyYXk8c3RyaW5nPiA9IGxhbmdzLnNwbGl0KCd8Jyk7XG4gICAgcmV0dXJuIChhdmFpbGFibGVMYW5ndWFnZXMgPSBhdmFpbGFibGVMYW5ndWFnZXMuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKSk7XG4gIH1cblxuICBwdWJsaWMgY3VycmVudExhbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmN1cnJlbnRMYW5nO1xuICB9XG5cbiAgcHVibGljIGN1cnJlbnRMb2FkZXIoKTogVHJhbnNsYXRlTG9hZGVyIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmN1cnJlbnRMb2FkZXI7XG4gIH1cblxuICBwdWJsaWMgb25MYW5nQ2hhbmdlKCk6IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uTGFuZ0NoYW5nZTtcbiAgfVxuXG4gIHB1YmxpYyBvblRyYW5zbGF0aW9uQ2hhbmdlKCk6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZS5vblRyYW5zbGF0aW9uQ2hhbmdlO1xuICB9XG5cbiAgcHVibGljIG9uRGVmYXVsdExhbmdDaGFuZ2UoKTogRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uRGVmYXVsdExhbmdDaGFuZ2U7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgZGVmYXVsdCBsYW5ndWFnZSB0byB1c2UgYXMgYSBmYWxsYmFja1xuICAgKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBwYXJhbWV0ZXIgbmVlZGVkXG4gICAqL1xuICBwdWJsaWMgc2V0RGVmYXVsdExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLnNldERlZmF1bHRMYW5nKGxhbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBHZXRzIHRoZSBkZWZhdWx0IGxhbmd1YWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0RGVmYXVsdExhbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldERlZmF1bHRMYW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIENoYW5nZXMgdGhlIGxhbmcgY3VycmVudGx5IHVzZWRcbiAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgcGFyYW1ldGVyIG5lZWRlZFxuICAgKi9cbiAgcHVibGljIHVzZShsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ1RoZSBVc2UgRnVuY3Rpb24gaXMgY2FsbGVkICAtLS0+ICcsIGxhbmcpO1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UudXNlKGxhbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBHZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2Ugd2l0aCB0aGUgY3VycmVudCBsb2FkZXJcbiAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgcGFyYW1ldGVyIG5lZWRlZFxuICAgKi9cbiAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXRUcmFuc2xhdGlvbihsYW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQWRkIG5ldyBsYW5ncyB0byB0aGUgbGlzdFxuICAgKiBAcGFyYW0gbGFuZ3MgbGFuZ3VhZ2UgcGFyYW1ldGVyIG5lZWRlZFxuICAgKi9cbiAgcHVibGljIGFkZExhbmdzKGxhbmdzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmFkZExhbmdzKGxhbmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyBhbiBhcnJheSBvZiBjdXJyZW50bHkgYXZhaWxhYmxlIGxhbmdzXG4gICAqL1xuICBwdWJsaWMgZ2V0TGFuZ3MoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXRMYW5ncygpO1xuICB9XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQ2FsbHMgcmVzZXRMYW5nIGFuZCByZXRyaWV2ZXMgdGhlIHRyYW5zbGF0aW9ucyBvYmplY3QgZm9yIHRoZSBjdXJyZW50IGxvYWRlclxuICAgKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBwYXJhbWV0ZXIgbmVlZGVkXG4gICAqL1xuICBwdWJsaWMgcmVsb2FkTGFuZyhsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZyB8IG9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UucmVsb2FkTGFuZyhsYW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyB0aGUgY3VycmVudCB0cmFuc2xhdGlvbnMgZm9yIHRoaXMgbGFuZy5cbiAgICogQGRlc2NyaXB0aW9uIFlvdSB3aWxsIGhhdmUgdG8gY2FsbCB1c2UsIHJlbG9hZExhbmcgb3IgZ2V0VHJhbnNsYXRpb24gYWdhaW4gdG8gYmUgYWJsZSB0byBnZXQgdHJhbnNsYXRpb25zXG4gICAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIHBhcmFtZXRlciBuZWVkZWRcbiAgICovXG4gIHB1YmxpYyByZXNldExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLnJlc2V0TGFuZyhsYW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgY3VycmVudCBicm93c2VyIGxhbmcgaWYgYXZhaWxhYmxlLCBvciB1bmRlZmluZWQgb3RoZXJ3aXNlXG4gICAqL1xuICBwdWJsaWMgZ2V0QnJvd3NlckxhbmcoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldEJyb3dzZXJMYW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIGN1cnJlbnQgYnJvd3NlciBjdWx0dXJlIGxhbmd1YWdlIG5hbWUgKGUuZy4gJ2RlLURFJyBpZiBhdmFpbGFibGUsIG9yIHVuZGVmaW5lZCBvdGhlcndpc2VcbiAgICovXG4gIHB1YmxpYyBnZXRCcm93c2VyQ3VsdHVyZUxhbmcoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCcm93c2VyQ3VsdHVyZUxhbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gR2V0cyB0aGUgdHJhbnNsYXRlZCB2YWx1ZSBvZiBhIGtleSAob3IgYW4gYXJyYXkgb2Yga2V5cykgb3IgdGhlIGtleSBpZiB0aGUgdmFsdWUgd2FzIG5vdCBmb3VuZFxuICAgKiBAcGFyYW0ga2V5IGtleSBvZiB0aGUganNvbiB2YWx1ZVxuICAgKiBAcGFyYW0gaW50ZXJwb2xhdGVQYXJhbXMgT2JqZWN0IE9wdGlvbmFsXG4gICAqL1xuICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBvYmplY3QpOiBPYnNlcnZhYmxlPHN0cmluZyB8IG9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICB9XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gR2V0cyB0aGUgaW5zdGFudCB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5IChvciBhbiBhcnJheSBvZiBrZXlzKS4gLyFcXCBUaGlzIG1ldGhvZCBpcyBzeW5jaHJvbm91cyBhbmQgdGhlXG4gICAqIGRlZmF1bHQgZmlsZSBsb2FkZXIgaXMgYXN5bmNocm9ub3VzLlxuICAgKiBAZGVzY3JpcHRpb24gWW91IGFyZSByZXNwb25zaWJsZSBmb3Iga25vd2luZyB3aGVuIHlvdXIgdHJhbnNsYXRpb25zIGhhdmUgYmVlbiBsb2FkZWQgYW5kIGl0IGlzIHNhZmUgdG8gdXNlIHRoaXMgbWV0aG9kLlxuICAgKiBAZGVzY3JpcHRpb24gSWYgeW91IGFyZSBub3Qgc3VyZSB0aGVuIHlvdSBzaG91bGQgdXNlIHRoZSBnZXQgbWV0aG9kIGluc3RlYWRcbiAgICogQHBhcmFtIGtleSBLZXkgZm9yIHRoZSBzZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgaW5zdGFudChrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0hlbGxvICoqKioqKioqKioqKioqKioqKioqKionKTtcbiAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChrZXkpKTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEdldHMgdGhlIGluc3RhbnQgdHJhbnNsYXRlZCB2YWx1ZSBvZiBhIGtleSAob3IgYW4gYXJyYXkgb2Yga2V5cykuIC8hXFwgVGhpcyBtZXRob2QgaXMgc3luY2hyb25vdXMgYW5kIHRoZVxuICAgKiBkZWZhdWx0IGZpbGUgbG9hZGVyIGlzIGFzeW5jaHJvbm91cy5cbiAgICogQGRlc2NyaXB0aW9uIFlvdSBhcmUgcmVzcG9uc2libGUgZm9yIGtub3dpbmcgd2hlbiB5b3VyIHRyYW5zbGF0aW9ucyBoYXZlIGJlZW4gbG9hZGVkIGFuZCBpdCBpcyBzYWZlIHRvIHVzZSB0aGlzIG1ldGhvZC5cbiAgICogQGRlc2NyaXB0aW9uIElmIHlvdSBhcmUgbm90IHN1cmUgdGhlbiB5b3Ugc2hvdWxkIHVzZSB0aGUgZ2V0IG1ldGhvZCBpbnN0ZWFkXG4gICAqIEBwYXJhbSBrZXkgS2V5IGZvciB0aGUgc2VydmljZVxuICAgKi9cbiAgcHVibGljIGluc3RhbnRPYmplY3QoaXRlbTogb2JqZWN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgY29uc3QgdGVtcCA9IFtdO1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGl0ZW0pIHtcbiAgICAgICAgdGVtcC5wdXNoKHRoaXMubWFpbkluc3RhbnQoZWxlbWVudCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnSGVsbG8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIycpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodGVtcCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnSGVsbG8gJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCcpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy5tYWluSW5zdGFudChpdGVtKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEdldHMgdGhlIGluc3RhbnQgdmFsdWUgb2YgZWFjaCBrZXkgaW4gdGhlIG9iamVjdFxuICAgKiBAcGFyYW0gb2JqZWN0IHdoaWNoIG5lZWQgdG8gYmUgdHJhbnNsYXRlZFxuICAgKi9cbiAgcHVibGljIG1haW5JbnN0YW50KGl0ZW06IG9iamVjdCk6IG9iamVjdCB7XG4gICAgY29uc3QgdGVtcCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3Qga2V5VmFsID0gaXRlbVtrZXldO1xuICAgICAgICBpZiAodHlwZW9mIGtleVZhbCA9PT0gJ3N0cmluZycgJiYga2V5VmFsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChrZXlWYWwpO1xuICAgICAgICAgIHRlbXBba2V5XSA9IHZhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wW2tleV0gPSBrZXlWYWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRlbXA7XG4gIH1cbn1cbiJdfQ==