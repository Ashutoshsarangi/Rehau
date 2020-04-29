/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LogService } from '../logger-service/logger.service';
var TranslationService = /** @class */ (function () {
    function TranslationService(translateService, configuration, logService) {
        this.translateService = translateService;
        this.configuration = configuration;
        this.logService = logService;
    }
    /**
     * @return {?}
     */
    TranslationService.prototype.initTranslation = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @param {?} langs
     * @return {?}
     */
    TranslationService.prototype.splitLanguages = /**
     * @private
     * @param {?} langs
     * @return {?}
     */
    function (langs) {
        /** @type {?} */
        var availableLanguages = langs.split('|');
        return (availableLanguages = availableLanguages.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.length > 0; })));
    };
    /**
     * @return {?}
     */
    TranslationService.prototype.currentLang = /**
     * @return {?}
     */
    function () {
        return this.translateService.currentLang;
    };
    /**
     * @return {?}
     */
    TranslationService.prototype.currentLoader = /**
     * @return {?}
     */
    function () {
        return this.translateService.currentLoader;
    };
    /**
     * @return {?}
     */
    TranslationService.prototype.onLangChange = /**
     * @return {?}
     */
    function () {
        return this.translateService.onLangChange;
    };
    /**
     * @return {?}
     */
    TranslationService.prototype.onTranslationChange = /**
     * @return {?}
     */
    function () {
        return this.translateService.onTranslationChange;
    };
    /**
     * @return {?}
     */
    TranslationService.prototype.onDefaultLangChange = /**
     * @return {?}
     */
    function () {
        return this.translateService.onDefaultLangChange;
    };
    // #endregion
    /**
     * @description Sets the default language to use as a fallback
     * @param lang language parameter needed
     */
    // #endregion
    /**
     * \@description Sets the default language to use as a fallback
     * @param {?} lang language parameter needed
     * @return {?}
     */
    TranslationService.prototype.setDefaultLang = 
    // #endregion
    /**
     * \@description Sets the default language to use as a fallback
     * @param {?} lang language parameter needed
     * @return {?}
     */
    function (lang) {
        this.translateService.setDefaultLang(lang);
    };
    /**
     * @description Gets the default language
     */
    /**
     * \@description Gets the default language
     * @return {?}
     */
    TranslationService.prototype.getDefaultLang = /**
     * \@description Gets the default language
     * @return {?}
     */
    function () {
        return this.translateService.getDefaultLang();
    };
    /**
     * @description Changes the lang currently used
     * @param lang language parameter needed
     */
    /**
     * \@description Changes the lang currently used
     * @param {?} lang language parameter needed
     * @return {?}
     */
    TranslationService.prototype.use = /**
     * \@description Changes the lang currently used
     * @param {?} lang language parameter needed
     * @return {?}
     */
    function (lang) {
        this.logService.log('The Use Function is called  ---> ', lang);
        return this.translateService.use(lang);
    };
    /**
     * @description Gets an object of translations for a given language with the current loader
     * @param lang language parameter needed
     */
    /**
     * \@description Gets an object of translations for a given language with the current loader
     * @param {?} lang language parameter needed
     * @return {?}
     */
    TranslationService.prototype.getTranslation = /**
     * \@description Gets an object of translations for a given language with the current loader
     * @param {?} lang language parameter needed
     * @return {?}
     */
    function (lang) {
        return this.translateService.getTranslation(lang);
    };
    /**
     * @description Add new langs to the list
     * @param langs language parameter needed
     */
    /**
     * \@description Add new langs to the list
     * @param {?} langs language parameter needed
     * @return {?}
     */
    TranslationService.prototype.addLangs = /**
     * \@description Add new langs to the list
     * @param {?} langs language parameter needed
     * @return {?}
     */
    function (langs) {
        this.translateService.addLangs(langs);
    };
    /**
     * @description Returns an array of currently available langs
     */
    /**
     * \@description Returns an array of currently available langs
     * @return {?}
     */
    TranslationService.prototype.getLangs = /**
     * \@description Returns an array of currently available langs
     * @return {?}
     */
    function () {
        return this.translateService.getLangs();
    };
    /**
     * @description Calls resetLang and retrieves the translations object for the current loader
     * @param lang language parameter needed
     */
    /**
     * \@description Calls resetLang and retrieves the translations object for the current loader
     * @param {?} lang language parameter needed
     * @return {?}
     */
    TranslationService.prototype.reloadLang = /**
     * \@description Calls resetLang and retrieves the translations object for the current loader
     * @param {?} lang language parameter needed
     * @return {?}
     */
    function (lang) {
        return this.translateService.reloadLang(lang);
    };
    /**
     * @description Removes the current translations for this lang.
     * @description You will have to call use, reloadLang or getTranslation again to be able to get translations
     * @param lang language parameter needed
     */
    /**
     * \@description Removes the current translations for this lang. / You will have to call use, reloadLang or getTranslation again to be able to get translations
     * @param {?} lang language parameter needed
     * @return {?}
     */
    TranslationService.prototype.resetLang = /**
     * \@description Removes the current translations for this lang. / You will have to call use, reloadLang or getTranslation again to be able to get translations
     * @param {?} lang language parameter needed
     * @return {?}
     */
    function (lang) {
        this.translateService.resetLang(lang);
    };
    /**
     * @description Returns the current browser lang if available, or undefined otherwise
     */
    /**
     * \@description Returns the current browser lang if available, or undefined otherwise
     * @return {?}
     */
    TranslationService.prototype.getBrowserLang = /**
     * \@description Returns the current browser lang if available, or undefined otherwise
     * @return {?}
     */
    function () {
        return this.translateService.getBrowserLang();
    };
    /**
     * @description Returns the current browser culture language name (e.g. 'de-DE' if available, or undefined otherwise
     */
    /**
     * \@description Returns the current browser culture language name (e.g. 'de-DE' if available, or undefined otherwise
     * @return {?}
     */
    TranslationService.prototype.getBrowserCultureLang = /**
     * \@description Returns the current browser culture language name (e.g. 'de-DE' if available, or undefined otherwise
     * @return {?}
     */
    function () {
        return this.getBrowserCultureLang();
    };
    /**
     * @description Gets the translated value of a key (or an array of keys) or the key if the value was not found
     * @param key key of the json value
     * @param interpolateParams Object Optional
     */
    /**
     * \@description Gets the translated value of a key (or an array of keys) or the key if the value was not found
     * @param {?} key key of the json value
     * @param {?=} interpolateParams Object Optional
     * @return {?}
     */
    TranslationService.prototype.get = /**
     * \@description Gets the translated value of a key (or an array of keys) or the key if the value was not found
     * @param {?} key key of the json value
     * @param {?=} interpolateParams Object Optional
     * @return {?}
     */
    function (key, interpolateParams) {
        return this.translateService.get(key, interpolateParams);
    };
    /**
     * @description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous.
     * @description You are responsible for knowing when your translations have been loaded and it is safe to use this method.
     * @description If you are not sure then you should use the get method instead
     * @param key Key for the service
     */
    /**
     * \@description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous. / You are responsible for knowing when your translations have been loaded and it is safe to use this method. / If you are not sure then you should use the get method instead
     * @param {?} key Key for the service
     * @return {?}
     */
    TranslationService.prototype.instant = /**
     * \@description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous. / You are responsible for knowing when your translations have been loaded and it is safe to use this method. / If you are not sure then you should use the get method instead
     * @param {?} key Key for the service
     * @return {?}
     */
    function (key) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            console.log('Hello **********************');
            subscriber.next(_this.translateService.instant(key));
        }));
    };
    /**
     * @description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous.
     * @description You are responsible for knowing when your translations have been loaded and it is safe to use this method.
     * @description If you are not sure then you should use the get method instead
     * @param key Key for the service
     */
    /**
     * \@description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous. / You are responsible for knowing when your translations have been loaded and it is safe to use this method. / If you are not sure then you should use the get method instead
     * @param {?} item
     * @return {?}
     */
    TranslationService.prototype.instantObject = /**
     * \@description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous. / You are responsible for knowing when your translations have been loaded and it is safe to use this method. / If you are not sure then you should use the get method instead
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        var e_1, _a;
        if (Array.isArray(item)) {
            /** @type {?} */
            var temp_1 = [];
            try {
                for (var item_1 = tslib_1.__values(item), item_1_1 = item_1.next(); !item_1_1.done; item_1_1 = item_1.next()) {
                    var element = item_1_1.value;
                    temp_1.push(this.mainInstant(element));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (item_1_1 && !item_1_1.done && (_a = item_1.return)) _a.call(item_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return new Observable((/**
             * @param {?} subscriber
             * @return {?}
             */
            function (subscriber) {
                console.log('Hello ######################');
                subscriber.next(temp_1);
            }));
        }
        else {
            return new Observable((/**
             * @param {?} subscriber
             * @return {?}
             */
            function (subscriber) {
                console.log('Hello $$$$$$$$$$$$$$$$$$$$$$');
                subscriber.next(_this.mainInstant(item));
            }));
        }
    };
    /**
     * @description Gets the instant value of each key in the object
     * @param object which need to be translated
     */
    /**
     * \@description Gets the instant value of each key in the object
     * @param {?} item
     * @return {?}
     */
    TranslationService.prototype.mainInstant = /**
     * \@description Gets the instant value of each key in the object
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var temp = {};
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                /** @type {?} */
                var keyVal = item[key];
                if (typeof keyVal === 'string' && keyVal.length > 0) {
                    /** @type {?} */
                    var val = this.translateService.instant(keyVal);
                    temp[key] = val;
                }
                else {
                    temp[key] = keyVal;
                }
            }
        }
        return temp;
    };
    TranslationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TranslationService.ctorParameters = function () { return [
        { type: TranslateService },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] },
        { type: LogService }
    ]; };
    return TranslationService;
}());
export { TranslationService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdHJhbnNsYXRlLXNlcnZpY2UvdHJhbnNsYXRlLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWdCLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUlMLGdCQUFnQixFQUVqQixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxVQUFVLEVBQXVCLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUc5RDtJQUVFLDRCQUNVLGdCQUFrQyxFQUFtQyxhQUFrQixFQUN2RixVQUFzQjtRQUR0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQW1DLGtCQUFhLEdBQWIsYUFBYSxDQUFLO1FBQ3ZGLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDOzs7O0lBRTlCLDRDQUFlOzs7SUFBdEI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQy9FO1lBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFB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QkFoTUYsVUFBVTs7OztnQkFSVCxnQkFBZ0I7Z0RBVytCLE1BQU0sU0FBQyxnQkFBZ0I7Z0JBTi9ELFVBQVU7O0lBb01uQix5QkFBQztDQUFBLEFBak1ELElBaU1DO1NBaE1ZLGtCQUFrQjs7Ozs7O0lBRTNCLDhDQUEwQzs7SUFBRSwyQ0FBbUQ7Ozs7O0lBQy9GLHdDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50LFxuICBMYW5nQ2hhbmdlRXZlbnQsXG4gIFRyYW5zbGF0ZUxvYWRlcixcbiAgVHJhbnNsYXRlU2VydmljZSxcbiAgVHJhbnNsYXRpb25DaGFuZ2VFdmVudFxufSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaWJlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IGlzQm9vbGVhbiB9IGZyb20gJ3V0aWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRpb25TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLCBASW5qZWN0KCdTRVJWSUNFX0NPTkZJRycpIHB1YmxpYyBjb25maWd1cmF0aW9uOiBhbnksXG4gICAgcHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgaW5pdFRyYW5zbGF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ0kgYW0gSW5pdCBUcmFuc2xhdG9yJywgdGhpcy5jb25maWd1cmF0aW9uKTtcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uKSB7XG4gICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdJIGFtIGluIGNvbmZpZycsIHRoaXMuY29uZmlndXJhdGlvbik7XG4gICAgICBpZiAoISF0aGlzLmNvbmZpZ3VyYXRpb24uZ2xvYmFsQ29uZmlnLmxhbmd1YWdlcykge1xuICAgICAgICB0aGlzLmFkZExhbmdzKHRoaXMuc3BsaXRMYW5ndWFnZXModGhpcy5jb25maWd1cmF0aW9uLmdsb2JhbENvbmZpZy5sYW5ndWFnZXMpKTtcbiAgICAgIH1cbiAgICAgIGlmICghIXRoaXMuY29uZmlndXJhdGlvbi5nbG9iYWxDb25maWcuZGVmYXVsdExhbmd1YWdlKSB7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdExhbmcodGhpcy5jb25maWd1cmF0aW9uLmdsb2JhbENvbmZpZy5kZWZhdWx0TGFuZ3VhZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKCEhdGhpcy5jb25maWd1cmF0aW9uLmdsb2JhbENvbmZpZy5jdXJyZW50TGFuZ3VhZ2UpIHtcbiAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnSGV5IEl0cyBUUlVFIEkgbmVlZCB0byBiZSBjYWxsZWQnKTtcbiAgICAgICAgdGhpcy51c2UodGhpcy5jb25maWd1cmF0aW9uLmdsb2JhbENvbmZpZy5jdXJyZW50TGFuZ3VhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ1NlcnZpY2UubG9nKCdObyBjb25maWd1cmF0aW9uIHByb3ZpZGVkLiBUaGlzIHNlcnZpY2UgaGFzIG5vdCBkZWZhdWx0IHZhbHVlcy4gU2V0IHRoZW0gYmVmb3JlIHVzZS4nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNwbGl0TGFuZ3VhZ2VzKGxhbmdzOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBsZXQgYXZhaWxhYmxlTGFuZ3VhZ2VzOiBBcnJheTxzdHJpbmc+ID0gbGFuZ3Muc3BsaXQoJ3wnKTtcbiAgICByZXR1cm4gKGF2YWlsYWJsZUxhbmd1YWdlcyA9IGF2YWlsYWJsZUxhbmd1YWdlcy5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA+IDApKTtcbiAgfVxuXG4gIHB1YmxpYyBjdXJyZW50TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmc7XG4gIH1cblxuICBwdWJsaWMgY3VycmVudExvYWRlcigpOiBUcmFuc2xhdGVMb2FkZXIge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExvYWRlcjtcbiAgfVxuXG4gIHB1YmxpYyBvbkxhbmdDaGFuZ2UoKTogRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uub25MYW5nQ2hhbmdlO1xuICB9XG5cbiAgcHVibGljIG9uVHJhbnNsYXRpb25DaGFuZ2UoKTogRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uVHJhbnNsYXRpb25DaGFuZ2U7XG4gIH1cblxuICBwdWJsaWMgb25EZWZhdWx0TGFuZ0NoYW5nZSgpOiBFdmVudEVtaXR0ZXI8RGVmYXVsdExhbmdDaGFuZ2VFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uub25EZWZhdWx0TGFuZ0NoYW5nZTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIHRoZSBkZWZhdWx0IGxhbmd1YWdlIHRvIHVzZSBhcyBhIGZhbGxiYWNrXG4gICAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIHBhcmFtZXRlciBuZWVkZWRcbiAgICovXG4gIHB1YmxpYyBzZXREZWZhdWx0TGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uuc2V0RGVmYXVsdExhbmcobGFuZyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEdldHMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXREZWZhdWx0TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0RGVmYXVsdExhbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQ2hhbmdlcyB0aGUgbGFuZyBjdXJyZW50bHkgdXNlZFxuICAgKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBwYXJhbWV0ZXIgbmVlZGVkXG4gICAqL1xuICBwdWJsaWMgdXNlKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmxvZygnVGhlIFVzZSBGdW5jdGlvbiBpcyBjYWxsZWQgIC0tLT4gJywgbGFuZyk7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZS51c2UobGFuZyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEdldHMgYW4gb2JqZWN0IG9mIHRyYW5zbGF0aW9ucyBmb3IgYSBnaXZlbiBsYW5ndWFnZSB3aXRoIHRoZSBjdXJyZW50IGxvYWRlclxuICAgKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBwYXJhbWV0ZXIgbmVlZGVkXG4gICAqL1xuICBwdWJsaWMgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldFRyYW5zbGF0aW9uKGxhbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgbmV3IGxhbmdzIHRvIHRoZSBsaXN0XG4gICAqIEBwYXJhbSBsYW5ncyBsYW5ndWFnZSBwYXJhbWV0ZXIgbmVlZGVkXG4gICAqL1xuICBwdWJsaWMgYWRkTGFuZ3MobGFuZ3M6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuYWRkTGFuZ3MobGFuZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIGFuIGFycmF5IG9mIGN1cnJlbnRseSBhdmFpbGFibGUgbGFuZ3NcbiAgICovXG4gIHB1YmxpYyBnZXRMYW5ncygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldExhbmdzKCk7XG4gIH1cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBDYWxscyByZXNldExhbmcgYW5kIHJldHJpZXZlcyB0aGUgdHJhbnNsYXRpb25zIG9iamVjdCBmb3IgdGhlIGN1cnJlbnQgbG9hZGVyXG4gICAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIHBhcmFtZXRlciBuZWVkZWRcbiAgICovXG4gIHB1YmxpYyByZWxvYWRMYW5nKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nIHwgb2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZS5yZWxvYWRMYW5nKGxhbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIHRoZSBjdXJyZW50IHRyYW5zbGF0aW9ucyBmb3IgdGhpcyBsYW5nLlxuICAgKiBAZGVzY3JpcHRpb24gWW91IHdpbGwgaGF2ZSB0byBjYWxsIHVzZSwgcmVsb2FkTGFuZyBvciBnZXRUcmFuc2xhdGlvbiBhZ2FpbiB0byBiZSBhYmxlIHRvIGdldCB0cmFuc2xhdGlvbnNcbiAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgcGFyYW1ldGVyIG5lZWRlZFxuICAgKi9cbiAgcHVibGljIHJlc2V0TGFuZyhsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UucmVzZXRMYW5nKGxhbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHRoZSBjdXJyZW50IGJyb3dzZXIgbGFuZyBpZiBhdmFpbGFibGUsIG9yIHVuZGVmaW5lZCBvdGhlcndpc2VcbiAgICovXG4gIHB1YmxpYyBnZXRCcm93c2VyTGFuZygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0QnJvd3NlckxhbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgY3VycmVudCBicm93c2VyIGN1bHR1cmUgbGFuZ3VhZ2UgbmFtZSAoZS5nLiAnZGUtREUnIGlmIGF2YWlsYWJsZSwgb3IgdW5kZWZpbmVkIG90aGVyd2lzZVxuICAgKi9cbiAgcHVibGljIGdldEJyb3dzZXJDdWx0dXJlTGFuZygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmdldEJyb3dzZXJDdWx0dXJlTGFuZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBHZXRzIHRoZSB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5IChvciBhbiBhcnJheSBvZiBrZXlzKSBvciB0aGUga2V5IGlmIHRoZSB2YWx1ZSB3YXMgbm90IGZvdW5kXG4gICAqIEBwYXJhbSBrZXkga2V5IG9mIHRoZSBqc29uIHZhbHVlXG4gICAqIEBwYXJhbSBpbnRlcnBvbGF0ZVBhcmFtcyBPYmplY3QgT3B0aW9uYWxcbiAgICovXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IG9iamVjdCk6IE9ic2VydmFibGU8c3RyaW5nIHwgb2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoa2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gIH1cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBHZXRzIHRoZSBpbnN0YW50IHRyYW5zbGF0ZWQgdmFsdWUgb2YgYSBrZXkgKG9yIGFuIGFycmF5IG9mIGtleXMpLiAvIVxcIFRoaXMgbWV0aG9kIGlzIHN5bmNocm9ub3VzIGFuZCB0aGVcbiAgICogZGVmYXVsdCBmaWxlIGxvYWRlciBpcyBhc3luY2hyb25vdXMuXG4gICAqIEBkZXNjcmlwdGlvbiBZb3UgYXJlIHJlc3BvbnNpYmxlIGZvciBrbm93aW5nIHdoZW4geW91ciB0cmFuc2xhdGlvbnMgaGF2ZSBiZWVuIGxvYWRlZCBhbmQgaXQgaXMgc2FmZSB0byB1c2UgdGhpcyBtZXRob2QuXG4gICAqIEBkZXNjcmlwdGlvbiBJZiB5b3UgYXJlIG5vdCBzdXJlIHRoZW4geW91IHNob3VsZCB1c2UgdGhlIGdldCBtZXRob2QgaW5zdGVhZFxuICAgKiBAcGFyYW0ga2V5IEtleSBmb3IgdGhlIHNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBpbnN0YW50KGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnSGVsbG8gKioqKioqKioqKioqKioqKioqKioqKicpO1xuICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KGtleSkpO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gR2V0cyB0aGUgaW5zdGFudCB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5IChvciBhbiBhcnJheSBvZiBrZXlzKS4gLyFcXCBUaGlzIG1ldGhvZCBpcyBzeW5jaHJvbm91cyBhbmQgdGhlXG4gICAqIGRlZmF1bHQgZmlsZSBsb2FkZXIgaXMgYXN5bmNocm9ub3VzLlxuICAgKiBAZGVzY3JpcHRpb24gWW91IGFyZSByZXNwb25zaWJsZSBmb3Iga25vd2luZyB3aGVuIHlvdXIgdHJhbnNsYXRpb25zIGhhdmUgYmVlbiBsb2FkZWQgYW5kIGl0IGlzIHNhZmUgdG8gdXNlIHRoaXMgbWV0aG9kLlxuICAgKiBAZGVzY3JpcHRpb24gSWYgeW91IGFyZSBub3Qgc3VyZSB0aGVuIHlvdSBzaG91bGQgdXNlIHRoZSBnZXQgbWV0aG9kIGluc3RlYWRcbiAgICogQHBhcmFtIGtleSBLZXkgZm9yIHRoZSBzZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgaW5zdGFudE9iamVjdChpdGVtOiBvYmplY3QpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBjb25zdCB0ZW1wID0gW107XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgaXRlbSkge1xuICAgICAgICB0ZW1wLnB1c2godGhpcy5tYWluSW5zdGFudChlbGVtZW50KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIZWxsbyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJyk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0ZW1wKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIZWxsbyAkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJyk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLm1haW5JbnN0YW50KGl0ZW0pKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gR2V0cyB0aGUgaW5zdGFudCB2YWx1ZSBvZiBlYWNoIGtleSBpbiB0aGUgb2JqZWN0XG4gICAqIEBwYXJhbSBvYmplY3Qgd2hpY2ggbmVlZCB0byBiZSB0cmFuc2xhdGVkXG4gICAqL1xuICBwdWJsaWMgbWFpbkluc3RhbnQoaXRlbTogb2JqZWN0KTogb2JqZWN0IHtcbiAgICBjb25zdCB0ZW1wID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gaXRlbSkge1xuICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBrZXlWYWwgPSBpdGVtW2tleV07XG4gICAgICAgIGlmICh0eXBlb2Yga2V5VmFsID09PSAnc3RyaW5nJyAmJiBrZXlWYWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KGtleVZhbCk7XG4gICAgICAgICAgdGVtcFtrZXldID0gdmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlbXBba2V5XSA9IGtleVZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGVtcDtcbiAgfVxufVxuIl19