import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import SimpleCrypto from 'simple-crypto-js';
import { OAuthProvider } from 'ionic-cordova-oauth/dist/provider';
import shajs from 'sha.js';
import { OauthBrowser, OauthCordova } from 'ionic-cordova-oauth';
import { retryBackoff } from 'backoff-rxjs';
import { timeout } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { createAction, props, Store, select, createReducer, on } from '@ngrx/store';
import { Router } from '@angular/router';
import { transition, trigger, query, style, animate, group } from '@angular/animations';
import { delay } from 'q';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
import { Injectable, Inject, NgModule, APP_INITIALIZER, forwardRef, defineInjectable, inject } from '@angular/core';
import { __awaiter, __generator, __assign, __values, __spread, __extends } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var onBoardingNextStep = createAction('[OnBoarding Step] Manage Next Step', props());
/** @type {?} */
var onBoardingBackStep = createAction('[OnBoarding Step] Manage Back Step', props());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RehauFunctionalCoreService = /** @class */ (function () {
    function RehauFunctionalCoreService(store) {
        this.store = store;
        this.onBoardingData$ = store.pipe(select('onBoardingData'));
    }
    /**
     * @return {?}
     */
    RehauFunctionalCoreService.prototype.showSuccess = /**
     * @return {?}
     */
    function () {
        this.onBoardingData$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            console.log('this is list of onBoardings from App.component -->', data);
        }));
        this.store.dispatch(onBoardingNextStep({ payload: { configPosition: 6 } }));
    };
    RehauFunctionalCoreService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    RehauFunctionalCoreService.ctorParameters = function () { return [
        { type: Store }
    ]; };
    /** @nocollapse */ RehauFunctionalCoreService.ngInjectableDef = defineInjectable({ factory: function RehauFunctionalCoreService_Factory() { return new RehauFunctionalCoreService(inject(Store)); }, token: RehauFunctionalCoreService, providedIn: "root" });
    return RehauFunctionalCoreService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} configService
 * @return {?}
 */
function CONFIG_FACTORY(configService) {
    return (/**
     * @return {?}
     */
    function () { return configService.initConfig(); });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LogService = /** @class */ (function () {
    function LogService() {
    }
    /**
     * @description This Method is for general console logs
     * @param content is the text you want to print as console
     */
    /**
     * \@description This Method is for general console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    LogService.prototype.log = /**
     * \@description This Method is for general console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        console.log.apply(console, __spread(['✅ '], content));
    };
    /**
     * @description This Method is for error console logs
     * @param content is the text you want to print as console
     */
    /**
     * \@description This Method is for error console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    LogService.prototype.log_e = /**
     * \@description This Method is for error console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        console.log.apply(console, __spread(['🚫❗️ '], content));
    };
    /**
     * @description This Method is for warning console logs
     * @param content is the text you want to print as console
     */
    /**
     * \@description This Method is for warning console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    LogService.prototype.log_w = /**
     * \@description This Method is for warning console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        console.log.apply(console, __spread(['🔶 '], content));
    };
    /**
     * @description This Method is for debugging console logs
     * @param content is the text you want to print as console
     */
    /**
     * \@description This Method is for debugging console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    LogService.prototype.log_d = /**
     * \@description This Method is for debugging console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        console.log.apply(console, __spread(['🔷 TODO: '], content));
    };
    LogService.decorators = [
        { type: Injectable }
    ];
    return LogService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description Service for configuring global properties
 */
var ConfigService = /** @class */ (function () {
    function ConfigService(configuration, logService) {
        this.configuration = configuration;
        this.logService = logService;
    }
    /**
     * @return {?}
     */
    ConfigService.prototype.initConfig = /**
     * @return {?}
     */
    function () {
        this.conFig = this.configuration;
        this.logService.log('Configuration data loaded1: ', this.conFig);
    };
    ConfigService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] },
        { type: LogService }
    ]; };
    return ConfigService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
/**
 * @param {?} http
 * @return {?}
 */
function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
/**
 * @param {?} configService
 * @return {?}
 */
function TRANSLATE_FACTORY(configService) {
    return (/**
     * @return {?}
     */
    function () { return configService.initTranslation(); });
}
var TranslateServiceModule = /** @class */ (function () {
    function TranslateServiceModule() {
    }
    TranslateServiceModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        HttpClientModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: HttpLoaderFactory,
                                deps: [HttpClient]
                            }
                        }),
                    ],
                    exports: [
                        TranslateModule,
                    ]
                },] }
    ];
    return TranslateServiceModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                for (var item_1 = __values(item), item_1_1 = item_1.next(); !item_1_1.done; item_1_1 = item_1.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RehauFunctionalCoreModule = /** @class */ (function () {
    function RehauFunctionalCoreModule() {
    }
    /**
     * @param {?} SERVICE_CONFIG
     * @return {?}
     */
    RehauFunctionalCoreModule.forRoot = /**
     * @param {?} SERVICE_CONFIG
     * @return {?}
     */
    function (SERVICE_CONFIG) {
        return {
            ngModule: RehauFunctionalCoreModule,
            providers: [
                { provide: 'SERVICE_CONFIG', useValue: SERVICE_CONFIG },
                {
                    provide: APP_INITIALIZER,
                    useFactory: CONFIG_FACTORY,
                    deps: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return ConfigService; }))],
                    multi: true
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: TRANSLATE_FACTORY,
                    deps: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return TranslationService; }))],
                    multi: true
                },
                ConfigService,
            ]
        };
    };
    RehauFunctionalCoreModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [],
                    exports: [
                        TranslateServiceModule
                    ]
                },] }
    ];
    return RehauFunctionalCoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var initialState = {
    configPosition: 0
};
var ɵ0 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
function (state, _a) {
    var payload = _a.payload;
    return ({ configPosition: payload.configPosition + 1 });
}, ɵ1 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
function (state, _a) {
    var payload = _a.payload;
    return ({ configPosition: payload.configPosition - 1 });
};
/** @type {?} */
var Reducer = createReducer(initialState, on(onBoardingNextStep, (ɵ0)), on(onBoardingBackStep, (ɵ1)));
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function onBoardingReducer(state, action) {
    return Reducer(state, action);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var userInfoAction = createAction('User info from CIDAAS', props());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var initialState$1 = {
    userInfo: {}
};
var ɵ0$1 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
function (state, _a) {
    var payload = _a.payload;
    return ({ userInfo: __assign({}, payload.userInfo) });
};
/** @type {?} */
var Reducer$1 = createReducer(initialState$1, on(userInfoAction, (ɵ0$1)));
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function cidaasReducer(state, action) {
    return Reducer$1(state, action);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var loaderAction = createAction('Show-Hide laoder', props());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var initialState$2 = {
    showLoader: false,
};
var ɵ0$2 = /**
 * @param {?} state
 * @return {?}
 */
function (state) { return (__assign({}, state)); };
/** @type {?} */
var Reducer$2 = createReducer(initialState$2, on(loaderAction, (ɵ0$2)));
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function loaderReducer(state, action) {
    return Reducer$2(state, action);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var reducers = {
    onBoardingData: onBoardingReducer,
    cidaasData: cidaasReducer,
    loaderState: loaderReducer
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CacheService = /** @class */ (function () {
    function CacheService(configuration) {
        this.configuration = configuration;
        this.simpleCrypto = new SimpleCrypto(this.configuration.globalConfig.SECRET_KEY);
    }
    /**
     * @description This Method is required for Removing particular data from local storage.
     * @param key  is required for the removing particular data
     */
    /**
     * \@description This Method is required for Removing particular data from local storage.
     * @param {?} key  is required for the removing particular data
     * @return {?}
     */
    CacheService.prototype.removeLocalData = /**
     * \@description This Method is required for Removing particular data from local storage.
     * @param {?} key  is required for the removing particular data
     * @return {?}
     */
    function (key) {
        localStorage.removeItem(key);
    };
    /**
     * @description This Method is required for getting Local storage Data.
     * @param Key This is required for the geting particular data with crypted formated.
     */
    /**
     * \@description This Method is required for getting Local storage Data.
     * @param {?} key
     * @return {?}
     */
    CacheService.prototype.getLocalData = /**
     * \@description This Method is required for getting Local storage Data.
     * @param {?} key
     * @return {?}
     */
    function (key) {
        // Set the second paramter to true, then it will return object instead of string
        if (localStorage.getItem(key)) {
            return this.simpleCrypto.decrypt(localStorage.getItem(key), true);
        }
        else {
            return false;
        }
    };
    /**
     * @description This Method is for setting Key, Value pair in the Local storage.
     * @param key is used for the storeing data.
     * @param value is the Actual value which need to be encrypted befor store.
     */
    /**
     * \@description This Method is for setting Key, Value pair in the Local storage.
     * @param {?} key is used for the storeing data.
     * @param {?} value is the Actual value which need to be encrypted befor store.
     * @return {?}
     */
    CacheService.prototype.setLocalData = /**
     * \@description This Method is for setting Key, Value pair in the Local storage.
     * @param {?} key is used for the storeing data.
     * @param {?} value is the Actual value which need to be encrypted befor store.
     * @return {?}
     */
    function (key, value) {
        /** @type {?} */
        var encrypted = this.simpleCrypto.encrypt(value);
        localStorage.setItem(key, encrypted);
    };
    CacheService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CacheService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    return CacheService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
var CidaasProvider = /** @class */ (function (_super) {
    __extends(CidaasProvider, _super);
    function CidaasProvider(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.revokeUrl = CidaasProvider.baseURL + '/authz-srv/revoke';
        _this.authUrl = CidaasProvider.baseURL + '/authz-srv/authz';
        _this.defaults = {
            responseType: 'code'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A " + _this.name + " app scope must exist");
        }
        return _this;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    CidaasProvider.base64URLEncode = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    };
    /**
     * @param {?} buffer
     * @return {?}
     */
    CidaasProvider.prototype.sha256 = /**
     * @param {?} buffer
     * @return {?}
     */
    function (buffer) {
        return shajs('sha256').update(buffer).digest();
    };
    /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    CidaasProvider.prototype.removeParam = /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    function (key, sourceURL) {
        /** @type {?} */
        var rtn = sourceURL.split('?')[0];
        /** @type {?} */
        var param = '';
        /** @type {?} */
        var paramsArr = [];
        /** @type {?} */
        var queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : '';
        if (queryString !== '') {
            paramsArr = queryString.split('&');
            for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
                param = paramsArr[i].split('=')[0];
                if (param === key) {
                    paramsArr.splice(i, 1);
                }
            }
            rtn = rtn + '?' + paramsArr.join('&');
        }
        return rtn;
    };
    /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    CidaasProvider.prototype.addParam = /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    function (key, sourceURL) {
        sourceURL += "&scope=";
        sourceURL += "" + this.options.appScope.join(' ');
        return sourceURL;
    };
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    CidaasProvider.prototype.optionsToDialogUrl = /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var url = _super.prototype.optionsToDialogUrl.call(this, options);
        url = this.removeParam('scope', url);
        url = this.addParam('scope', url);
        if (options.authType) {
            url += "&auth_type=" + options.authType;
        }
        if (options.nonce) {
            url += "&nonce=" + options.nonce;
        }
        if (options.code_challenge_method === 'plain') {
            url += "&code_challenge=" + options.code_challenge + "&code_challenge_method=" + options.code_challenge_method;
        }
        if (options.code_challenge_method === 'S256') {
            url += "&code_challenge=" + CidaasProvider.base64URLEncode(this.sha256(options.code_challenge)) + "&code_challenge_method=" + options.code_challenge_method;
        }
        if (options.viewType) {
            url += "&view_type=" + options.viewType;
        }
        console.log('Calling URL: ' + url);
        return url;
    };
    CidaasProvider.CLIENT_ID = '9feab210-c025-406d-a10c-3d8323214491';
    CidaasProvider.baseURL = 'https://accounts.rehau.com';
    CidaasProvider.tokenEndpoint = CidaasProvider.baseURL + '/token-srv/token';
    return CidaasProvider;
}(OAuthProvider));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WebService = /** @class */ (function () {
    function WebService(http, logService, configuration) {
        this.http = http;
        this.logService = logService;
        this.configuration = configuration;
        this.BASE_URL = this.configuration.globalConfig.BASE_URL;
    }
    // getApi(), postApi() are responsible for Main Api cals depending on the Http methods
    // /**
    //  * @description This method is for Get Api Calls
    //  * @param endPoint String Just need to pass the Endpoint
    //  * @returns This function returns the respective response from the Api
    //  */
    // getApi(endPoint, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.get(this.BASE_URL + endPoint).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.get(this.BASE_URL + endPoint);
    //   }
    // }
    /**
     * @description This method is for Post Api calls
     * @param endPoint String Api Endpoint need to pass
     * @param data Object required for the Post request
     * @returns Return the respective responce from the Apis.
     */
    // postApi(endPoint, data, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.post(this.BASE_URL + endPoint, data).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.post(this.BASE_URL + endPoint, data);
    //   }
    // }
    /**
     * @description This method is for Get Api Calls
     * @param url String url for the API
     * @param httpOptions header part is optional
     * @param retryConfig is the object if want to hit API multiple time after failure
     * @returns This function returns the respective response from the Api
     */
    // getApi(), postApi() are responsible for Main Api cals depending on the Http methods
    // /**
    //  * @description This method is for Get Api Calls
    //  * @param endPoint String Just need to pass the Endpoint
    //  * @returns This function returns the respective response from the Api
    //  */
    // getApi(endPoint, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.get(this.BASE_URL + endPoint).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.get(this.BASE_URL + endPoint);
    //   }
    // }
    /**
       * @description This method is for Post Api calls
       * @param endPoint String Api Endpoint need to pass
       * @param data Object required for the Post request
       * @returns Return the respective responce from the Apis.
       */
    // postApi(endPoint, data, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.post(this.BASE_URL + endPoint, data).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.post(this.BASE_URL + endPoint, data);
    //   }
    // }
    /**
     * \@description This method is for Get Api Calls
     * @param {?} url String url for the API
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} This function returns the respective response from the Api
     */
    WebService.prototype.getApi = 
    // getApi(), postApi() are responsible for Main Api cals depending on the Http methods
    // /**
    //  * @description This method is for Get Api Calls
    //  * @param endPoint String Just need to pass the Endpoint
    //  * @returns This function returns the respective response from the Api
    //  */
    // getApi(endPoint, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.get(this.BASE_URL + endPoint).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.get(this.BASE_URL + endPoint);
    //   }
    // }
    /**
       * @description This method is for Post Api calls
       * @param endPoint String Api Endpoint need to pass
       * @param data Object required for the Post request
       * @returns Return the respective responce from the Apis.
       */
    // postApi(endPoint, data, retryConfig: any = {}): Observable<any> {
    //   if (Object.keys(retryConfig).length !== 0) {
    //     return this.http.post(this.BASE_URL + endPoint, data).pipe(
    //       timeout(retryConfig.REQ_TIMEOUT),
    //       retryBackoff({
    //         initialInterval: retryConfig.INIT_INTERVAL,
    //         maxInterval: retryConfig.MAX_INTERVAL,
    //         maxRetries: retryConfig.MAX_RETRIES,
    //         shouldRetry: error => {
    //           this.logService.log_w('Aborted remote request');
    //           return true;
    //         },
    //         backoffDelay: (iteration, initialInterval) =>
    //           Math.pow(1.5, iteration) * initialInterval
    //       })
    //     );
    //   } else {
    //     return this.http.post(this.BASE_URL + endPoint, data);
    //   }
    // }
    /**
     * \@description This method is for Get Api Calls
     * @param {?} url String url for the API
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} This function returns the respective response from the Api
     */
    function (url, httpOptions, retryConfig) {
        var _this = this;
        if (httpOptions === void 0) { httpOptions = {}; }
        if (retryConfig === void 0) { retryConfig = {}; }
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.get(url, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.logService.log_w('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                function (iteration, initialInterval) {
                    return Math.pow(1.5, iteration) * initialInterval;
                })
            }));
        }
        else {
            return this.http.get(url, httpOptions);
        }
    };
    /**
     * This method is for Post Api calls
     * @param url String Api URL
     * @param requestBody Object required for the Post request
     * @param httpOptions header part is optional
     * @param retryConfig is the object if want to hit API multiple time after failure
     * @returns Return the respective responce from the Apis.
     */
    /**
     * This method is for Post Api calls
     * @param {?} url String Api URL
     * @param {?} requestBody Object required for the Post request
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} Return the respective responce from the Apis.
     */
    WebService.prototype.postApi = /**
     * This method is for Post Api calls
     * @param {?} url String Api URL
     * @param {?} requestBody Object required for the Post request
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} Return the respective responce from the Apis.
     */
    function (url, requestBody, httpOptions, retryConfig) {
        if (httpOptions === void 0) { httpOptions = {}; }
        if (retryConfig === void 0) { retryConfig = {}; }
        console.log(url, 'url');
        console.log(requestBody, 'requestBody');
        console.log(httpOptions, 'httpOptions');
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.post(url, requestBody, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.log('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                function (iteration, initialInterval) {
                    return Math.pow(1.5, iteration) * initialInterval;
                })
            }));
        }
        else {
            return this.http.post(url, requestBody, httpOptions);
        }
    };
    /**
     * This method is for Request Api calls
     * @param method String method need to pass in request API
     * @param url String API URL
     * @param httpOptions header details is optional
     * @param retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @returns Return the respective responce from the Apis.
     */
    /**
     * This method is for Request Api calls
     * @param {?} method String method need to pass in request API
     * @param {?} url String API URL
     * @param {?} httpOptions header details is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @return {?} Return the respective responce from the Apis.
     */
    WebService.prototype.requestApi = /**
     * This method is for Request Api calls
     * @param {?} method String method need to pass in request API
     * @param {?} url String API URL
     * @param {?} httpOptions header details is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @return {?} Return the respective responce from the Apis.
     */
    function (method, url, httpOptions, retryConfig) {
        if (retryConfig === void 0) { retryConfig = {}; }
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.request(method, url, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    // this.logService.log_w('Aborted remote request');
                    console.log('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                function (iteration, initialInterval) {
                    return Math.pow(1.5, iteration) * initialInterval;
                })
            }));
        }
        else {
            return this.http.post(method, url, httpOptions);
            // return this.postApi(url, {}, httpOptions);
        }
    };
    WebService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WebService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: LogService },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    /** @nocollapse */ WebService.ngInjectableDef = defineInjectable({ factory: function WebService_Factory() { return new WebService(inject(HttpClient), inject(LogService), inject("SERVICE_CONFIG")); }, token: WebService, providedIn: "root" });
    return WebService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var userData = 'USERDATA';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var LoaderFlag = new Subject();
var StoreService = /** @class */ (function () {
    function StoreService(store, logService) {
        this.store = store;
        this.logService = logService;
        this.userData$ = this.store.pipe(select('cidaasData'));
        this.showLoader$ = store.pipe(select('loaderState'));
    }
    /**
     * @param {?} Data
     * @return {?}
     */
    StoreService.prototype.dispatchUserData = /**
     * @param {?} Data
     * @return {?}
     */
    function (Data) {
        this.store.dispatch(userInfoAction({ payload: { userInfo: Data } }));
    };
    /**
     * @description This function will return the latest state of userData from store
     * @returns object of user data
     */
    /**
     * \@description This function will return the latest state of userData from store
     * @return {?} object of user data
     */
    StoreService.prototype.getUserData = /**
     * \@description This function will return the latest state of userData from store
     * @return {?} object of user data
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var userData;
            return __generator(this, function (_a) {
                this.userData$.subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (Object.keys(data.userInfo).length > 0) {
                        userData = data.userInfo;
                    }
                }));
                return [2 /*return*/, userData];
            });
        });
    };
    /**
     * @description This function will update the state of loader
     * @param state is the value of state to dispatch
     */
    /**
     * \@description This function will update the state of loader
     * @param {?} state is the value of state to dispatch
     * @return {?}
     */
    StoreService.prototype.dispatchLoaderState = /**
     * \@description This function will update the state of loader
     * @param {?} state is the value of state to dispatch
     * @return {?}
     */
    function (state) {
        this.logService.log('in dispatch method tab loader state', state);
        this.store.dispatch(loaderAction(state));
        LoaderFlag.next(state);
    };
    /**
     * @description This function will return the latest state of loader
     * @returns current loader state
     */
    /**
     * \@description This function will return the latest state of loader
     * @return {?} current loader state
     */
    StoreService.prototype.getLoaderState = /**
     * \@description This function will return the latest state of loader
     * @return {?} current loader state
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var loaderState;
            return __generator(this, function (_a) {
                this.showLoader$.subscribe((/**
                 * @param {?} state
                 * @return {?}
                 */
                function (state) {
                    loaderState = state;
                }));
                this.logService.log('in get loader state --->', loaderState);
                LoaderFlag.next(loaderState.showLoader);
                return [2 /*return*/, loaderState.showLoader];
            });
        });
    };
    StoreService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StoreService.ctorParameters = function () { return [
        { type: Store },
        { type: LogService }
    ]; };
    return StoreService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthService = /** @class */ (function () {
    function AuthService(webService, cacheService, logservice, storeService, configuration) {
        this.webService = webService;
        this.cacheService = cacheService;
        this.logservice = logservice;
        this.storeService = storeService;
        this.configuration = configuration;
    }
    /**
     * @param {?} body
     * @param {?} message
     * @return {?}
     */
    AuthService.prototype.oAuthCallback = /**
     * @param {?} body
     * @param {?} message
     * @return {?}
     */
    function (body, message) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken(body, message)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * @description This function is responsible to call postAPI method to get the new token
     * @returns object of ITokenEndpointResponse
     */
    /**
     * \@description This function is responsible to call postAPI method to get the new token
     * @param {?} body
     * @return {?} object of ITokenEndpointResponse
     */
    AuthService.prototype.tokenRequest = /**
     * \@description This function is responsible to call postAPI method to get the new token
     * @param {?} body
     * @return {?} object of ITokenEndpointResponse
     */
    function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.webService.postApi(this.configuration.cidaasConfig.ciddasTokenEndpoint, body).toPromise()];
            });
        });
    };
    /**
     * @description This function will call the token request method to get new token
     * @description And will store the user data in store and local storage
     * @returns object of user data
     */
    /**
     * \@description This function will call the token request method to get new token / And will store the user data in store and local storage
     * @private
     * @param {?} body
     * @param {?} message
     * @return {?} object of user data
     */
    AuthService.prototype.getToken = /**
     * \@description This function will call the token request method to get new token / And will store the user data in store and local storage
     * @private
     * @param {?} body
     * @param {?} message
     * @return {?} object of user data
     */
    function (body, message) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tokenRequest(body)];
                    case 1:
                        response = _a.sent();
                        if (!response.access_token || !response.refresh_token) {
                            // Here We clean the User Object from Local Storage and Store.
                            this.storeService.dispatchUserData({});
                            this.cacheService.removeLocalData(userData);
                            return [2 /*return*/, response];
                        }
                        else {
                            body.access_token = response.access_token;
                            body.refresh_token = response.refresh_token;
                            // Here We Set the User Object in Local Storage and Store.
                            this.storeService.dispatchUserData(body);
                            this.cacheService.setLocalData(userData, body);
                            return [2 /*return*/, body];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1.error instanceof ErrorEvent) {
                            this.logservice.log_e('An error occurred for getting ' + message + ':', e_1.error.message);
                            this.logservice.log('Never the less leave the use do its thing without tokens');
                            body.status = e_1.status;
                            body.message = e_1.error.message;
                            return [2 /*return*/, body];
                        }
                        else if (e_1.status === 0) {
                            this.logservice.log_e('An error occurred for getting ' + message + ':', e_1.error.message);
                            this.logservice.log('Never the less leave the use do its thing without tokens');
                            body.status = e_1.status;
                            body.message = e_1.error.message;
                            return [2 /*return*/, body];
                        }
                        else if (e_1.status === 408) {
                            this.logservice.log_e('An error occurred for getting ' + message + ':', e_1.error.message);
                            this.logservice.log('Never the less leave the use do its thing without tokens');
                            body.status = e_1.status;
                            body.message = e_1.error.message;
                            return [2 /*return*/, body];
                        }
                        else {
                            this.logservice.log_e("Backend returned code for getting " + message + " " + e_1.status + ", " +
                                ("body was for getting " + message + " : " + e_1.error));
                            this.storeService.dispatchUserData({});
                            this.cacheService.removeLocalData(userData);
                            // await this.logoutService.doLogout();
                            return [2 /*return*/, body];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // tslint:disable-next-line:jsdoc-format
    /**
     * @description This function will check whether user is new or existing.
     * @description If user is existing then this function will get the current or refreshed token
     * @returns boolean value based on expired
     */
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check whether user is new or existing. / If user is existing then this function will get the current or refreshed token
     * @return {?} boolean value based on expired
     */
    AuthService.prototype.isLoggedIn = 
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check whether user is new or existing. / If user is existing then this function will get the current or refreshed token
     * @return {?} boolean value based on expired
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUserFromStore, currentUser, res, res, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storeService.getUserData()];
                    case 1:
                        currentUserFromStore = _a.sent();
                        currentUser = this.cacheService.getLocalData(userData);
                        this.logservice.log('User data from local storage = ', currentUser);
                        this.logservice.log('User data from store = ', currentUserFromStore);
                        if (!(currentUserFromStore && currentUser)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.checkTokenStatus(currentUser)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        if (!(currentUserFromStore && !currentUser)) return [3 /*break*/, 5];
                        this.cacheService.setLocalData(userData, currentUserFromStore); // update locsal storage
                        // update locsal storage
                        return [4 /*yield*/, this.checkTokenStatus(currentUserFromStore)];
                    case 4:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 5:
                        if (!(!currentUserFromStore && currentUser)) return [3 /*break*/, 7];
                        this.storeService.dispatchUserData(currentUser); // update store
                        // update store
                        return [4 /*yield*/, this.checkTokenStatus(currentUser)];
                    case 6:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 7: return [2 /*return*/, false];
                }
            });
        });
    };
    // tslint:disable-next-line:jsdoc-format
    /**
     * @description This function will check the status of token whether it is expired or not
     * @description If token is expired then it will call refresh token method
     * @param currentUser is the currentuser object either from store or local storage
     * @returns boolean value or refresh token object based on condition
     */
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check the status of token whether it is expired or not / If token is expired then it will call refresh token method
     * @param {?} currentUser is the currentuser object either from store or local storage
     * @return {?} boolean value or refresh token object based on condition
     */
    AuthService.prototype.checkTokenStatus = 
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check the status of token whether it is expired or not / If token is expired then it will call refresh token method
     * @param {?} currentUser is the currentuser object either from store or local storage
     * @return {?} boolean value or refresh token object based on condition
     */
    function (currentUser) {
        return __awaiter(this, void 0, void 0, function () {
            var isExpired, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isExpired = this.isTokenExpire(currentUser.access_token);
                        if (!isExpired) return [3 /*break*/, 2];
                        this.logservice.log_w('THIS ACCESS_TOKEN IS EXPIRED in Login, try getting new one.');
                        return [4 /*yield*/, this.refreshTokenWrapper(currentUser)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * @description This function is required for checking the access_token is expired or not.
     * @param access_token Need Access_token for checking is it expired
     * @returns boolean value based on expied
     */
    // tslint:disable-next-line:variable-name
    /**
     * \@description This function is required for checking the access_token is expired or not.
     * @param {?} access_token Need Access_token for checking is it expired
     * @return {?} boolean value based on expied
     */
    // tslint:disable-next-line:variable-name
    AuthService.prototype.isTokenExpire = /**
     * \@description This function is required for checking the access_token is expired or not.
     * @param {?} access_token Need Access_token for checking is it expired
     * @return {?} boolean value based on expied
     */
    // tslint:disable-next-line:variable-name
    function (access_token) {
        /** @type {?} */
        var helper = new JwtHelperService();
        return helper.isTokenExpired(access_token);
    };
    /**
     * @description This method will get call whenevr we need to refresh the expise token
     * @param user is the object conatining all CIDAAS login data
     * @returns object of CIDAAS login data including regresh token
     */
    /**
     * \@description This method will get call whenevr we need to refresh the expise token
     * @private
     * @param {?} user is the object conatining all CIDAAS login data
     * @return {?} object of CIDAAS login data including regresh token
     */
    AuthService.prototype.refreshTokenWrapper = /**
     * \@description This method will get call whenevr we need to refresh the expise token
     * @private
     * @param {?} user is the object conatining all CIDAAS login data
     * @return {?} object of CIDAAS login data including regresh token
     */
    function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var body, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            client_id: this.configuration.cidaasConfig.cidaasClientId,
                            grant_type: 'refresh_token',
                            refresh_token: user.refresh_token
                        };
                        return [4 /*yield*/, this.getToken(body, 'refresh token')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @description This method will decide the access token
     * @returns decoded access token
     */
    /**
     * \@description This method will decide the access token
     * @return {?} decoded access token
     */
    AuthService.prototype.getCorrelationId = /**
     * \@description This method will decide the access token
     * @return {?} decoded access token
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, helper, decodedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUser()];
                    case 1:
                        user = _a.sent();
                        helper = new JwtHelperService();
                        decodedToken = helper.decodeToken(user.access_token);
                        return [2 /*return*/, decodedToken.sub];
                }
            });
        });
    };
    /**
     * @description This method is to get the userData related to CIDAAS login
     * @returns object of CIDAAS login data
     */
    /**
     * \@description This method is to get the userData related to CIDAAS login
     * @return {?} object of CIDAAS login data
     */
    AuthService.prototype.getUser = /**
     * \@description This method is to get the userData related to CIDAAS login
     * @return {?} object of CIDAAS login data
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, helper, isExpired;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.cacheService.getLocalData(userData);
                        helper = new JwtHelperService();
                        if (!user) return [3 /*break*/, 2];
                        isExpired = this.isTokenExpire(user.access_token);
                        if (!isExpired) return [3 /*break*/, 2];
                        this.logservice.log('THIS ACCESS_TOKEN IS EXPIRED in getUser, try getting new one.');
                        return [4 /*yield*/, this.refreshTokenWrapper(user)];
                    case 1:
                        user = _a.sent();
                        this.logservice.log('refreshTest::got result in getUser ' + user);
                        _a.label = 2;
                    case 2: return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: WebService },
        { type: CacheService },
        { type: LogService },
        { type: StoreService },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    /** @nocollapse */ AuthService.ngInjectableDef = defineInjectable({ factory: function AuthService_Factory() { return new AuthService(inject(WebService), inject(CacheService), inject(LogService), inject(StoreService), inject("SERVICE_CONFIG")); }, token: AuthService, providedIn: "root" });
    return AuthService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var bodyParam = { grant_type: 'authorization_code' };
/** @type {?} */
var loginDesign = {
    closebuttoncolor: '#dd0060',
    hardwareback: 'no',
    hidenavigationbuttons: 'no',
    hideurlbar: 'yes',
    navigationbuttoncolor: '#dd0060',
    toolbarcolor: '#f7f7f7'
};
/** @type {?} */
var registerDesign = {
    closebuttoncolor: '#dd0060',
    hardwareback: 'no',
    hidenavigationbuttons: 'no',
    hideurlbar: 'yes',
    navigationbuttoncolor: '#dd0060',
    toolbarcolor: '#f7f7f7'
};
/** @type {?} */
var userObject = {
    message: '',
    status: '',
    accessToken: '',
    refreshToken: ''
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoginService = /** @class */ (function () {
    function LoginService(authService, logService, configService, storeService, cacheService, configuration) {
        this.authService = authService;
        this.logService = logService;
        this.configService = configService;
        this.storeService = storeService;
        this.cacheService = cacheService;
        this.configuration = configuration;
        // cidaasParam = { clientId: CidaasProvider.CLIENT_ID };
        this.cidaasParam = { clientId: this.configuration.cidaasConfig.cidaasClientId };
        this.cidaasRegisterProvider = this.configuration.cidaasConfig.cidaasRegisterProvider;
        this.cidaasLoginProvider = this.configuration.cidaasConfig.cidaasLoginProvider;
        this.cidaasLoginDesign = this.configuration.cidaasConfig.cidaasLoginDesign;
        this.cidaasRegisterDesign = this.configuration.cidaasConfig.cidaasRegisterDesign;
    }
    /**
     * @description This is CIDAAS Authentication main function
     * @param actionType is the string which indicates the type of action whether it is login or register
     * @param platform is used to define the platform to use. Default value is browser
     */
    /**
     * \@description This is CIDAAS Authentication main function
     * @param {?} actionType is the string which indicates the type of action whether it is login or register
     * @param {?=} platform is used to define the platform to use. Default value is browser
     * @return {?}
     */
    LoginService.prototype.cidaasAuth = /**
     * \@description This is CIDAAS Authentication main function
     * @param {?} actionType is the string which indicates the type of action whether it is login or register
     * @param {?=} platform is used to define the platform to use. Default value is browser
     * @return {?}
     */
    function (actionType, platform) {
        if (platform === void 0) { platform = 'browser'; }
        return __awaiter(this, void 0, void 0, function () {
            var provider, pkceBody, result, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actionType = actionType.trim();
                        if (actionType === 'register token') {
                            // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasRegisterProvider });
                            provider = new CidaasProvider(__assign({}, this.cidaasParam, this.cidaasRegisterProvider));
                        }
                        else if (actionType === 'login token') {
                            // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasLoginProvider });
                            provider = new CidaasProvider(__assign({}, this.cidaasParam, this.cidaasLoginProvider));
                        }
                        pkceBody = {
                            grant_type: bodyParam.grant_type,
                            client_id: provider.options.clientId,
                            redirect_uri: provider.options.redirectUri,
                            code_verifier: CidaasProvider.base64URLEncode(provider.options.code_challenge)
                        };
                        this.logService.log('TEST CONFI SERVICE = ', +this.configService.configuration);
                        this.logService.log('pkceBody required for login = ' + pkceBody);
                        this.logService.log('provider body required for login =' + provider);
                        res = userObject;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.login(provider, pkceBody, actionType, platform)];
                    case 2:
                        result = _a.sent();
                        if (result.access_token === '' || result.access_token === undefined) {
                            this.logService.log_e('login failed == ');
                            this.logService.log_e(result);
                            res.message = 'login Failed';
                            res.status = '1';
                            return [2 /*return*/, res];
                        }
                        else {
                            this.logService.log('login successFull == ');
                            this.logService.log(result);
                            res.message = 'login success';
                            res.status = '0';
                            res.accessToken = result.access_token;
                            res.refreshToken = result.refresh_token;
                            return [2 /*return*/, res];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throwError(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description This is logout function
     * @description it will remove userData from local storage and store
     */
    /**
     * \@description This is logout function / it will remove userData from local storage and store
     * @return {?}
     */
    LoginService.prototype.cidaasLogout = /**
     * \@description This is logout function / it will remove userData from local storage and store
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.storeService.dispatchUserData({});
                    this.cacheService.removeLocalData(userData);
                    return [2 /*return*/, true];
                }
                catch (err) {
                    throwError(err);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description This is Login function to call oauth loginVia API
     * @param provider is the CIDAAS provider object
     * @param pkceBody is the ITokenEndpointBody object
     * @param actionType it is identifier for the API action whether it is for login/register
     */
    /**
     * \@description This is Login function to call oauth loginVia API
     * @param {?} provider is the CIDAAS provider object
     * @param {?} pkceBody is the ITokenEndpointBody object
     * @param {?} actionType it is identifier for the API action whether it is for login/register
     * @param {?} platform
     * @return {?}
     */
    LoginService.prototype.login = /**
     * \@description This is Login function to call oauth loginVia API
     * @param {?} provider is the CIDAAS provider object
     * @param {?} pkceBody is the ITokenEndpointBody object
     * @param {?} actionType it is identifier for the API action whether it is for login/register
     * @param {?} platform
     * @return {?}
     */
    function (provider, pkceBody, actionType, platform) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (platform === 'browser') {
                            this.oauth = new OauthBrowser();
                        }
                        else {
                            this.oauth = new OauthCordova();
                        }
                        if (this.cidaasLoginDesign === undefined || Object.keys(this.cidaasLoginDesign).length === 0) {
                            this.cidaasLoginDesign = loginDesign;
                        }
                        if (this.cidaasRegisterDesign === undefined || Object.keys(this.cidaasRegisterDesign).length === 0) {
                            this.cidaasRegisterDesign = registerDesign;
                        }
                        if (!(actionType === 'register token')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.oauth.logInVia(provider, this.cidaasLoginDesign)];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(actionType === 'login token')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.oauth.logInVia(provider, this.cidaasRegisterDesign)];
                    case 3:
                        res = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!!!res) return [3 /*break*/, 6];
                        pkceBody.code = res.code;
                        return [4 /*yield*/, this.authService.oAuthCallback(pkceBody, actionType)];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LoginService.ctorParameters = function () { return [
        { type: AuthService },
        { type: LogService },
        { type: ConfigService },
        { type: StoreService },
        { type: CacheService },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    return LoginService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthGuard = /** @class */ (function () {
    function AuthGuard(logService, authService, router, configuration) {
        this.logService = logService;
        this.authService = authService;
        this.router = router;
        this.configuration = configuration;
    }
    /**
     * @description This method will check user already login or not
     * @returns Return the true if user already logged in or else false
     */
    /**
     * \@description This method will check user already login or not
     * @return {?} Return the true if user already logged in or else false
     */
    AuthGuard.prototype.canActivate = /**
     * \@description This method will check user already login or not
     * @return {?} Return the true if user already logged in or else false
     */
    function () {
        var _this = this;
        this.logService.log('can Activate method is called!!!');
        /** @type {?} */
        var loginScreenUrl = this.configuration.globalConfig.loginScreenUrl;
        try {
            return this.authService.isLoggedIn().then((/**
             * @param {?} isLoggedIn
             * @return {?}
             */
            function (isLoggedIn) {
                _this.logService.log('User exist or not', isLoggedIn);
                if (isLoggedIn) {
                    _this.logService.log('Already logged in user!!!');
                    return true;
                }
                else {
                    _this.logService.log_w('Please do login to continue......');
                    _this.router.navigate(['/' + loginScreenUrl]); // this route will be based on parameter passed in global config
                    return false;
                }
            }));
        }
        catch (err) {
            this.logService.log_e('Error occured in isLoggedIn method');
            return false;
        }
    };
    AuthGuard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: LogService },
        { type: AuthService },
        { type: Router },
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
    ]; };
    return AuthGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var slideInAnimation = trigger('routeAnimations', [
    transition('TabLevel => SecondLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('ThirdLevel => ForthLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('SecondLevel => ThirdLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(-100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('SecondLevel => TabLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('ForthLevel => ThirdLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(100%)' }))
            ], { optional: true })
        ])
    ]),
    transition('ThirdLevel => SecondLevel', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.15s linear', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.15s linear', style({ transform: 'translateX(100%)' }))
            ], { optional: true })
        ])
    ]),
    transition(':decrement', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
            query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
                optional: true,
            }),
            query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
                optional: true,
            }),
        ]),
    ]),
    transition(':increment', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
            query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
                optional: true,
            }),
            query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
                optional: true,
            }),
        ]),
    ]),
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OnBoardingService = /** @class */ (function () {
    function OnBoardingService(logService) {
        this.logService = logService;
    }
    /**
     * @description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param currentPageTitle title for current active page
     * @param nextPageTitle title for next page
     * @param prevPageTitle title for prev page
     */
    /**
     * \@description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param {?} currentPageTitle title for current active page
     * @param {?} nextPageTitle title for next page
     * @param {?} prevPageTitle title for prev page
     * @return {?}
     */
    OnBoardingService.prototype.nextClickActionHandler = /**
     * \@description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param {?} currentPageTitle title for current active page
     * @param {?} nextPageTitle title for next page
     * @param {?} prevPageTitle title for prev page
     * @return {?}
     */
    function (currentPageTitle, nextPageTitle, prevPageTitle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logService.log('currentPageTitile -->', currentPageTitle);
                        this.logService.log('nextPageTitle -->', nextPageTitle);
                        this.logService.log('prevPageTitle -->', prevPageTitle);
                        return [4 /*yield*/, delay(5000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 'success'];
                }
            });
        });
    };
    /**
     * @description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param currentPageTitle title for current active page
     * @param nextPageTitle title for next page
     * @param prevPageTitle title for prev page
     */
    /**
     * \@description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param {?} currentPageTitle title for current active page
     * @param {?} nextPageTitle title for next page
     * @param {?} prevPageTitle title for prev page
     * @return {?}
     */
    OnBoardingService.prototype.prevClickActionHandler = /**
     * \@description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param {?} currentPageTitle title for current active page
     * @param {?} nextPageTitle title for next page
     * @param {?} prevPageTitle title for prev page
     * @return {?}
     */
    function (currentPageTitle, nextPageTitle, prevPageTitle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logService.log('currentPageTitile -->', currentPageTitle);
                        this.logService.log('nextPageTitle -->', nextPageTitle);
                        this.logService.log('prevPageTitle -->', prevPageTitle);
                        return [4 /*yield*/, delay(5000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 'success'];
                }
            });
        });
    };
    OnBoardingService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OnBoardingService.ctorParameters = function () { return [
        { type: LogService }
    ]; };
    return OnBoardingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CommonConstants = {
    SRV: 'https://private-eb271b-zwaytest.apiary-mock.com/v1/',
    AUTHENTICATION_URL: 'https://find.z-wave.me/zboxweb',
    PROXY_CONTROL_URL: 'https://find.z-wave.me/ZAutomation/api/v1/',
    // GATEWAY_CONTROL_ENDPOINT: 'https://fd2xt8lnsa.execute-api.eu-west-1.amazonaws.com/dev/api/v1/gateways/control',
    //    GATEWAY_CONTROL_ENDPOINT: 'https://postb.in/uPTXSyId/',
    LECKAGE_PROTECTION_ID: 123,
    WATER_SENSOR_ID: 456,
    LECKAGE_MANUFACTURER_ID: 1043,
    LECKAGE_MANUFACTURER_PRODUCT_ID: 1,
    LECKAGE_MANUFACTURER_TYPE: 1
};
/** @enum {string} */
var GatewayCredentialsTypes = {
    ADMIN: 'admin',
    LOCAL: 'local',
    REMOTE: 'remote',
};
/** @type {?} */
var gatewayDeviceControlEndpoint = 'https://fieldtest.smarthome-dev.aws.rehau.com' + '/deviceControl/api/v1';
// gatewayAclService interafece
/** @type {?} */
var gatewayAclEndpoint = 'https://fieldtest.smarthome-dev.aws.rehau.com' + '/acl/api/v1';
/** @enum {string} */
var GatewayAclServiceUserGatewayCredsType = {
    ADMIN: 'admin',
    LOCAL: 'local',
    REMOTE: 'remote',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GatewayAclService = /** @class */ (function () {
    function GatewayAclService(httpClient, authService, webService, logService) {
        this.httpClient = httpClient;
        this.authService = authService;
        this.webService = webService;
        this.logService = logService;
        this.storageName = 'gateway_device';
    }
    /**
     * @param {?} accessToken
     * @return {?}
     */
    GatewayAclService.prototype.cloudGetHomes = /**
     * @param {?} accessToken
     * @return {?}
     */
    function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, gatewayAclUser, result, _b, _c, homeId, e_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userControllerGET(accessToken)];
                    case 1:
                        gatewayAclUser = _d.sent();
                        result = [];
                        try {
                            for (_b = __values(Object.keys(gatewayAclUser.homes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                homeId = _c.value;
                                result.push(gatewayAclUser.homes[homeId]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, { homes: result, response: gatewayAclUser }];
                    case 2:
                        e_2 = _d.sent();
                        console.error('gatewayAclServer::cloudGetHomes: Could not fetch Homes ' + JSON.stringify(e_2));
                        return [2 /*return*/, { homes: [], response: null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} accessToken
     * @return {?}
     */
    GatewayAclService.prototype.userControllerGET = /**
     * @param {?} accessToken
     * @return {?}
     */
    function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var httpOptions, _a, _b, _c, _d, url, retryConfig, gwUser;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = {};
                        _b = HttpHeaders.bind;
                        _c = {
                            'Content-Type': 'application/json',
                            // tslint:disable-next-line:object-literal-key-quotes
                            'access_token': accessToken
                        };
                        _d = 'x-correlation-id';
                        return [4 /*yield*/, this.authService.getCorrelationId()];
                    case 1:
                        httpOptions = (_a.headers = new (_b.apply(HttpHeaders, [void 0, (_c[_d] = _e.sent(),
                                _c)]))(),
                            _a);
                        url = gatewayAclEndpoint + '/users/';
                        retryConfig = {
                            REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
                            INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
                            MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
                            MAX_RETRIES: GatewayAclService.MAX_RETRIES,
                        };
                        return [4 /*yield*/, this.webService.getApi(url, httpOptions, retryConfig).toPromise()];
                    case 2:
                        gwUser = _e.sent();
                        this.logService.log(gwUser);
                        return [2 /*return*/, gwUser];
                }
            });
        });
    };
    /**
     * @param {?} accessToken
     * @param {?} homeId
     * @param {?} aclUser
     * @return {?}
     */
    GatewayAclService.prototype.getGatewaysToHome = /**
     * @param {?} accessToken
     * @param {?} homeId
     * @param {?} aclUser
     * @return {?}
     */
    function (accessToken, homeId, aclUser) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, e_4, _b, result, _c, _d, gatewayId, gwResult, _e, _f, credId, credentials, newCreds;
            return __generator(this, function (_g) {
                result = [];
                try {
                    for (_c = __values(Object.keys(aclUser.homes[homeId].gateways)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        gatewayId = _d.value;
                        gwResult = {
                            credentials: []
                        };
                        try {
                            for (_e = __values(Object.keys(aclUser.homes[homeId].gateways[gatewayId].userCredentials)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                credId = _f.value;
                                gwResult.homeGwId = gatewayId;
                                console.log('Getting credId: ' + credId);
                                credentials = aclUser.homes[homeId].gateways[gatewayId].userCredentials[credId];
                                console.log('Getting homeId: ' + homeId);
                                console.log(credentials);
                                if (credentials.type === GatewayAclServiceUserGatewayCredsType.ADMIN ||
                                    credentials.type === GatewayAclServiceUserGatewayCredsType.LOCAL ||
                                    credentials.type === GatewayAclServiceUserGatewayCredsType.REMOTE) {
                                    newCreds = {
                                        user: credentials.user,
                                        password: credentials.password,
                                        type: credentials.type === 'admin' ? GatewayCredentialsTypes.ADMIN :
                                            credentials.type === 'local' ? GatewayCredentialsTypes.LOCAL :
                                                credentials.type === 'remote' ? GatewayCredentialsTypes.REMOTE :
                                                    null
                                    };
                                    console.log('Got correct type! ' + JSON.stringify(newCreds));
                                    gwResult.credentials.push(newCreds);
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        result.push(gwResult);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return [2 /*return*/, result];
            });
        });
    };
    /**
     * @param {?} accessToken
     * @param {?} homeID
     * @return {?}
     */
    GatewayAclService.prototype.getHomeOfUser = /**
     * @param {?} accessToken
     * @param {?} homeID
     * @return {?}
     */
    function (accessToken, homeID) {
        return __awaiter(this, void 0, void 0, function () {
            var httpOptions, _a, _b, _c, _d, url, retryConfig, home;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log('GatewayACLService::getHomeOfUser: ' + accessToken + ' for HomeID ' + homeID);
                        _a = {};
                        _b = HttpHeaders.bind;
                        _c = {
                            'Content-Type': 'application/json',
                            access_token: accessToken
                        };
                        _d = 'x-correlation-id';
                        return [4 /*yield*/, this.authService.getCorrelationId()];
                    case 1:
                        httpOptions = (_a.headers = new (_b.apply(HttpHeaders, [void 0, (_c[_d] = _e.sent(),
                                _c)]))(),
                            _a);
                        url = gatewayAclEndpoint + '/users/homes/' + homeID;
                        retryConfig = {
                            REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
                            INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
                            MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
                            MAX_RETRIES: GatewayAclService.MAX_RETRIES,
                        };
                        return [4 /*yield*/, this.webService.getApi(url, httpOptions, retryConfig).toPromise()];
                    case 2:
                        home = _e.sent();
                        this.logService.log(home);
                        return [2 /*return*/, home];
                }
            });
        });
    };
    GatewayAclService.INIT_INTERVAL = 2000;
    GatewayAclService.MAX_INTERVAL = 6000;
    GatewayAclService.MAX_RETRIES = 3;
    GatewayAclService.REQ_TIMEOUT = 8000;
    GatewayAclService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    GatewayAclService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: AuthService },
        { type: WebService },
        { type: LogService }
    ]; };
    /** @nocollapse */ GatewayAclService.ngInjectableDef = defineInjectable({ factory: function GatewayAclService_Factory() { return new GatewayAclService(inject(HttpClient), inject(AuthService), inject(WebService), inject(LogService)); }, token: GatewayAclService, providedIn: "root" });
    return GatewayAclService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GatewayAlreadyConfiguredError = /** @class */ (function (_super) {
    __extends(GatewayAlreadyConfiguredError, _super);
    function GatewayAlreadyConfiguredError(m) {
        var _this = _super.call(this, m) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, GatewayAlreadyConfiguredError.prototype);
        return _this;
    }
    return GatewayAlreadyConfiguredError;
}(Error));
var GatewaySerialNotFoundError = /** @class */ (function (_super) {
    __extends(GatewaySerialNotFoundError, _super);
    function GatewaySerialNotFoundError(m) {
        var _this = _super.call(this, m) || this;
        _this.name = 'GatewaySerialNotFoundError';
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, GatewayAlreadyConfiguredError.prototype);
        return _this;
    }
    return GatewaySerialNotFoundError;
}(Error));
var GatewayService = /** @class */ (function () {
    function GatewayService(http, gatewayAclService, authService, cacheService, webService, logService) {
        this.http = http;
        this.gatewayAclService = gatewayAclService;
        this.authService = authService;
        this.cacheService = cacheService;
        this.webService = webService;
        this.logService = logService;
        this.observerId = 48976446132111;
        this.completedFirstRun = false;
        this.storageName = 'gateway_device';
    }
    /**
     * @description Calls the Gateway API
     * @param gateway gateWay Information
     * @param apiEndpoint This is Api End P{oints}
     * @param method Specific Method To Follow
     * @param body Body If It is a POST Api Call
     * @param headers not used right now
     * @param connectionType explicitly decide, if it should be called locally, or remotely. Default: remote
     */
    /**
     * \@description Calls the Gateway API
     * @param {?} gateway gateWay Information
     * @param {?} apiEndpoint This is Api End P{oints}
     * @param {?=} method Specific Method To Follow
     * @param {?=} body Body If It is a POST Api Call
     * @param {?=} headers not used right now
     * @param {?=} connectionType explicitly decide, if it should be called locally, or remotely. Default: remote
     * @param {?=} retryLocal
     * @param {?=} retryRemote
     * @param {?=} killRequestObject
     * @param {?=} localResponseType
     * @return {?}
     */
    GatewayService.prototype.callApi = /**
     * \@description Calls the Gateway API
     * @param {?} gateway gateWay Information
     * @param {?} apiEndpoint This is Api End P{oints}
     * @param {?=} method Specific Method To Follow
     * @param {?=} body Body If It is a POST Api Call
     * @param {?=} headers not used right now
     * @param {?=} connectionType explicitly decide, if it should be called locally, or remotely. Default: remote
     * @param {?=} retryLocal
     * @param {?=} retryRemote
     * @param {?=} killRequestObject
     * @param {?=} localResponseType
     * @return {?}
     */
    function (gateway, apiEndpoint, method, body, headers, connectionType, retryLocal, retryRemote, killRequestObject, localResponseType) {
        if (method === void 0) { method = 'get'; }
        if (body === void 0) { body = null; }
        if (retryLocal === void 0) { retryLocal = 2; }
        if (retryRemote === void 0) { retryRemote = 3; }
        if (killRequestObject === void 0) { killRequestObject = { continue: true }; }
        if (localResponseType === void 0) { localResponseType = 'json'; }
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, retryConfig, username, password, useCredentials, _b, _c, creds, requestBody, user, requestHeader, _d, _e, e_2, url, httpOption, apiResponse, e_3, basicAuthString, httpOptions, url, apiResponse, e_4, curtime, cancelRequestLocal, cancelRequestRemote, remotePromise, localPromise, response, e_5, result, e_6, e_7;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        retryConfig = {
                            REQ_TIMEOUT: GatewayService.REQ_TIMEOUT_LOCAL,
                            INIT_INTERVAL: GatewayService.INIT_INTERVAL_LOCAL,
                            MAX_INTERVAL: GatewayService.MAX_INTERVAL_LOCAL,
                            MAX_RETRIES: retryLocal,
                        };
                        // If no connection Type is given and the Method is run for the first Time
                        if (!connectionType && this.completedFirstRun) {
                            if (this.localOnline) {
                                connectionType = 'local';
                            }
                            else if (this.remoteOnline) {
                                connectionType = 'remote';
                            }
                            else {
                                // go to race between remote and local
                                connectionType = undefined;
                            }
                        }
                        // try remote call first, else try local
                        useCredentials = connectionType === 'local'
                            ? GatewayCredentialsTypes.LOCAL
                            : GatewayCredentialsTypes.REMOTE;
                        try {
                            // this.logService.log('cred type: ' + useCredentials);
                            for (_b = __values(gateway.credentials), _c = _b.next(); !_c.done; _c = _b.next()) {
                                creds = _c.value;
                                // this.logService.log('iterate creds' + JSON.stringify(creds));
                                if (creds.type === useCredentials) {
                                    username = creds.user;
                                    password = creds.password;
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (username === undefined || password === undefined) {
                            throw new Error('Username or Password undefined');
                        }
                        if (!(connectionType === 'remote')) return [3 /*break*/, 10];
                        this.logService.log('Connection is remote');
                        requestBody = {
                            boxId: gateway.boxId,
                            username: username,
                            password: password,
                            urlEndpoint: apiEndpoint,
                            method: method,
                            body: undefined
                        };
                        if (method.toUpperCase() === 'POST' ||
                            method.toUpperCase() === 'PUT' ||
                            method.toUpperCase() === 'PATCH') {
                            requestBody.body = JSON.stringify(body);
                        }
                        return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _f.sent();
                        requestHeader = {
                            access_token: user.access_token
                        };
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 4, , 5]);
                        _d = requestHeader;
                        _e = 'x-correlation-id';
                        return [4 /*yield*/, this.authService.getCorrelationId()];
                    case 3:
                        _d[_e] = _f.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _f.sent();
                        this.logService.log_e(e_2);
                        return [3 /*break*/, 5];
                    case 5:
                        url = gatewayDeviceControlEndpoint + '/gateways/control';
                        httpOption = {
                            headers: requestHeader
                        };
                        _f.label = 6;
                    case 6:
                        _f.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.webService.postApi(url, requestBody, httpOption, retryConfig).toPromise()];
                    case 7:
                        apiResponse = _f.sent();
                        this.remoteOnline = true;
                        this.completedFirstRun = true;
                        return [2 /*return*/, apiResponse];
                    case 8:
                        e_3 = _f.sent();
                        this.logService.log_e('gatewayservice::callApi: Network error remote request' +
                            JSON.stringify(e_3));
                        this.remoteOnline = false;
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 29];
                    case 10:
                        if (!(connectionType === 'local' || connectionType === 'admin')) return [3 /*break*/, 18];
                        this.logService.log('Connection is local');
                        basicAuthString = 'Basic ' + btoa(username + ':' + password);
                        _f.label = 11;
                    case 11:
                        _f.trys.push([11, 13, , 17]);
                        httpOptions = {
                            headers: { Authorization: basicAuthString }
                        };
                        if (method.toUpperCase() !== 'GET' &&
                            method.toUpperCase() !== 'OPTIONS') {
                            // tslint:disable-next-line:no-string-literal
                            httpOptions['body'] = body;
                        }
                        // tslint:disable-next-line:no-string-literal
                        httpOptions['responseType'] = localResponseType;
                        url = 'http://' + gateway.localIp + ':8083/' + apiEndpoint;
                        // Create separate method for request API
                        return [4 /*yield*/, this.webService.requestApi(method, url, httpOptions, retryConfig).toPromise()];
                    case 12:
                        apiResponse = _f.sent();
                        this.localOnline = true;
                        this.completedFirstRun = true;
                        return [2 /*return*/, apiResponse];
                    case 13:
                        e_4 = _f.sent();
                        this.logService.log_e('gatewayservice::callApi: Network error local request' +
                            JSON.stringify(e_4));
                        this.localOnline = false;
                        if (!!connectionType) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.callApi(gateway, apiEndpoint, method, body, headers, 'remote')];
                    case 14: return [2 /*return*/, _f.sent()];
                    case 15: throw e_4;
                    case 16: return [3 /*break*/, 17];
                    case 17: return [3 /*break*/, 29];
                    case 18:
                        if (!!connectionType) return [3 /*break*/, 29];
                        // Do requests in parallel, if no connectionType is specified
                        curtime = new Date().getTime();
                        cancelRequestLocal = { continue: true };
                        cancelRequestRemote = { continue: true };
                        remotePromise = this.callApi(gateway, apiEndpoint, method, body, headers, 'remote', undefined, undefined, cancelRequestRemote);
                        localPromise = this.callApi(gateway, apiEndpoint, method, body, headers, 'local', undefined, undefined, cancelRequestLocal);
                        _f.label = 19;
                    case 19:
                        _f.trys.push([19, 21, , 29]);
                        // wait for first to finish
                        return [4 /*yield*/, Promise.race([remotePromise, localPromise])];
                    case 20:
                        response = _f.sent();
                        cancelRequestLocal.continue = false;
                        cancelRequestRemote.continue = false;
                        return [2 /*return*/, response];
                    case 21:
                        e_5 = _f.sent();
                        // jumps in this catch, if one of the request fails
                        this.logService.log_e('gatewayservice::callApi: parallel promise failed ' + e_5);
                        // wait for both to finish
                        // the promise that failed before will fail again here and throw an exception
                        // the other one is still open and could resolve or reject
                        result = void 0;
                        _f.label = 22;
                    case 22:
                        _f.trys.push([22, 24, , 25]);
                        return [4 /*yield*/, remotePromise];
                    case 23:
                        result = _f.sent();
                        this.remoteOnline = true;
                        return [3 /*break*/, 25];
                    case 24:
                        e_6 = _f.sent();
                        this.remoteOnline = false;
                        this.logService.log_e('gatewayservice::callApi: remote request failed with error ' +
                            JSON.stringify(e_6));
                        return [3 /*break*/, 25];
                    case 25:
                        _f.trys.push([25, 27, , 28]);
                        return [4 /*yield*/, localPromise];
                    case 26:
                        result = _f.sent();
                        this.localOnline = true;
                        return [3 /*break*/, 28];
                    case 27:
                        e_7 = _f.sent();
                        this.localOnline = false;
                        this.logService.log_e('gatewayservice::callApi: Local request failed with error ' +
                            JSON.stringify(e_7));
                        return [3 /*break*/, 28];
                    case 28:
                        if (result === undefined) {
                            throw new Error('gatewayservice::callApi: Both requests failed');
                        }
                        return [2 /*return*/, result];
                    case 29: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Calls the ZWaveAPI and get data for all the conected devices
     * @param gateway gateWay Information
     * @param getMock bollean type
     * @param doDefaultRetrys retry parameter type boolean
     */
    /**
     * \@description Calls the ZWaveAPI and get data for all the conected devices
     * @param {?} gateway gateWay Information
     * @param {?=} getMock bollean type
     * @param {?=} doDefaultRetrys retry parameter type boolean
     * @return {?}
     */
    GatewayService.prototype.getLeckageDeviceConnectedToGateway = /**
     * \@description Calls the ZWaveAPI and get data for all the conected devices
     * @param {?} gateway gateWay Information
     * @param {?=} getMock bollean type
     * @param {?=} doDefaultRetrys retry parameter type boolean
     * @return {?}
     */
    function (gateway, getMock, doDefaultRetrys) {
        if (getMock === void 0) { getMock = false; }
        if (doDefaultRetrys === void 0) { doDefaultRetrys = false; }
        return __awaiter(this, void 0, void 0, function () {
            var allDevices, foundDevices, nodeId, device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // if (getMock) {
                        //   return [
                        //     {
                        //       nodeId: 3,
                        //       givenName: 'MockDevice'
                        //     }
                        //   ];
                        // }
                        if (!doDefaultRetrys) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.callApi(gateway, 'ZWaveAPI/Data', 'get', null, null, null)];
                    case 1:
                        allDevices = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.callApi(gateway, 'ZWaveAPI/Data', 'get', null, null, null, 1, 1)];
                    case 3:
                        allDevices = _a.sent();
                        _a.label = 4;
                    case 4:
                        foundDevices = [];
                        this.logService.log('gatewayService::got devices: ' + JSON.stringify(allDevices));
                        // tslint:disable-next-line:forin
                        for (nodeId in allDevices.devices) {
                            device = allDevices.devices[nodeId];
                            if (device.data.manufacturerId.value ===
                                CommonConstants.LECKAGE_MANUFACTURER_ID &&
                                device.data.manufacturerProductId.value ===
                                    CommonConstants.LECKAGE_MANUFACTURER_PRODUCT_ID &&
                                device.data.manufacturerProductType.value ===
                                    CommonConstants.LECKAGE_MANUFACTURER_TYPE) {
                                foundDevices.push({
                                    nodeId: nodeId,
                                    givenName: device.data.givenName.value
                                });
                            }
                        }
                        return [2 /*return*/, foundDevices];
                }
            });
        });
    };
    /**
     * @description not in use
     */
    /**
     * \@description not in use
     * @return {?}
     */
    GatewayService.prototype.onLogout = /**
     * \@description not in use
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description method to save the gateway object in local storage for persistence use
     * @param accessToken accesstoken
     * @param gateway object to save
     */
    /**
     * \@description method to save the gateway object in local storage for persistence use
     * @param {?} accessToken accesstoken
     * @param {?} gateway object to save
     * @return {?}
     */
    GatewayService.prototype.saveGateway = /**
     * \@description method to save the gateway object in local storage for persistence use
     * @param {?} accessToken accesstoken
     * @param {?} gateway object to save
     * @return {?}
     */
    function (accessToken, gateway) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logService.log(accessToken);
                this.cacheService.setLocalData(this.storageName, JSON.stringify(gateway));
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description method to fetch gateway object from local storage and return parse gateway object
     * @param accessToken access token
     */
    /**
     * \@description method to fetch gateway object from local storage and return parse gateway object
     * @param {?} accessToken access token
     * @return {?}
     */
    GatewayService.prototype.getPairedGateway = /**
     * \@description method to fetch gateway object from local storage and return parse gateway object
     * @param {?} accessToken access token
     * @return {?}
     */
    function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var rawGatewayObject, gw;
            return __generator(this, function (_a) {
                this.logService.log('in get pair getway service', accessToken);
                rawGatewayObject = JSON.stringify(this.cacheService.getLocalData(this.storageName));
                this.logService.log(rawGatewayObject);
                gw = JSON.parse(rawGatewayObject);
                return [2 /*return*/, gw];
            });
        });
    };
    GatewayService.INIT_INTERVAL_REMOTE = 2000;
    GatewayService.MAX_INTERVAL_REMOTE = 6000;
    GatewayService.REQ_TIMEOUT_REMOTE = 20000;
    GatewayService.INIT_INTERVAL_LOCAL = 2000;
    GatewayService.MAX_INTERVAL_LOCAL = 6000;
    GatewayService.REQ_TIMEOUT_LOCAL = 6000;
    GatewayService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    GatewayService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: GatewayAclService },
        { type: AuthService },
        { type: CacheService },
        { type: WebService },
        { type: LogService }
    ]; };
    /** @nocollapse */ GatewayService.ngInjectableDef = defineInjectable({ factory: function GatewayService_Factory() { return new GatewayService(inject(HttpClient), inject(GatewayAclService), inject(AuthService), inject(CacheService), inject(WebService), inject(LogService)); }, token: GatewayService, providedIn: "root" });
    return GatewayService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GatewayDeviceControlService = /** @class */ (function () {
    function GatewayDeviceControlService(authService, webService) {
        this.authService = authService;
        this.webService = webService;
    }
    /**
     * @param {?} gateway
     * @param {?} mac
     * @param {?} accessToken
     * @return {?}
     */
    GatewayDeviceControlService.prototype.updateGatewayData = /**
     * @param {?} gateway
     * @param {?} mac
     * @param {?} accessToken
     * @return {?}
     */
    function (gateway, mac, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var httpOptions, _a, _b, _c, _d, url, retryConfig, apiResponse;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = {};
                        _b = HttpHeaders.bind;
                        _c = {
                            'Content-Type': 'application/json',
                            // tslint:disable-next-line:object-literal-key-quotes
                            'access_token': accessToken
                        };
                        _d = 'x-correlation-id';
                        return [4 /*yield*/, this.authService.getCorrelationId()];
                    case 1:
                        httpOptions = (_a.headers = new (_b.apply(HttpHeaders, [void 0, (_c[_d] = _e.sent(),
                                _c)]))(),
                            _a);
                        url = gatewayDeviceControlEndpoint + '/gateways/' + mac;
                        retryConfig = {
                            REQ_TIMEOUT: GatewayDeviceControlService.REQ_TIMEOUT,
                            INIT_INTERVAL: GatewayDeviceControlService.INIT_INTERVAL,
                            MAX_INTERVAL: GatewayDeviceControlService.MAX_INTERVAL,
                            MAX_RETRIES: GatewayDeviceControlService.MAX_RETRIES,
                        };
                        return [4 /*yield*/, this.webService.getApi(url, httpOptions, retryConfig).toPromise()];
                    case 2:
                        apiResponse = _e.sent();
                        if (apiResponse.boxId &&
                            apiResponse.homeGwId &&
                            apiResponse.homeId &&
                            apiResponse.id &&
                            apiResponse.localIp) {
                            gateway.boxId = apiResponse.boxId;
                            gateway.homeGwId = apiResponse.homeGwId;
                            gateway.homeId = apiResponse.homeId;
                            gateway.id = apiResponse.id;
                            gateway.localIp = apiResponse.localIp;
                        }
                        else {
                            throw new Error('Could not fetch Gateway, empty response!');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GatewayDeviceControlService.INIT_INTERVAL = 2000;
    GatewayDeviceControlService.MAX_INTERVAL = 6000;
    GatewayDeviceControlService.MAX_RETRIES = 3;
    GatewayDeviceControlService.REQ_TIMEOUT = 6000;
    GatewayDeviceControlService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    GatewayDeviceControlService.ctorParameters = function () { return [
        { type: AuthService },
        { type: WebService }
    ]; };
    /** @nocollapse */ GatewayDeviceControlService.ngInjectableDef = defineInjectable({ factory: function GatewayDeviceControlService_Factory() { return new GatewayDeviceControlService(inject(AuthService), inject(WebService)); }, token: GatewayDeviceControlService, providedIn: "root" });
    return GatewayDeviceControlService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var onlineOfflineData = new Subject();
var OnlineOfflineService = /** @class */ (function () {
    function OnlineOfflineService(authService, gatewayService, logService) {
        this.authService = authService;
        this.gatewayService = gatewayService;
        this.logService = logService;
        // observerId = 5689564564;
        // private observer: IOnlineOfflineObserver[] = [];
        this.refreshTime = 5000;
        this.failureRate = new BehaviorSubject(0);
        this.REGUARD_OFFLINE = false;
        this.remoteOnline = true;
        this.localOnline = true;
        // ngOnInit not supported for services so logic has to be in constructor
        this.logService.log('onlineOffline::onInit');
        // this.initialize();
    }
    /**
     * @return {?}
     */
    OnlineOfflineService.prototype.initialize = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.logService.log('onlineOffline::initialize');
                clearInterval(this.tickInterval);
                this.tickInterval = setInterval((/**
                 * @return {?}
                 */
                function () {
                    _this.tick();
                }), this.refreshTime);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    OnlineOfflineService.prototype.tick = /**
     * @private
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var localBefore, remoteBefore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logService.log('onlineOffline::tick');
                        localBefore = this.localOnline;
                        remoteBefore = this.remoteOnline;
                        // await this.checkLocalConnection();
                        // await this.checkRemoteConnection();
                        return [4 /*yield*/, this.checkConnection('local')];
                    case 1:
                        // await this.checkLocalConnection();
                        // await this.checkRemoteConnection();
                        _a.sent();
                        return [4 /*yield*/, this.checkConnection('remote')];
                    case 2:
                        _a.sent();
                        if (localBefore !== this.localOnline ||
                            remoteBefore !== this.remoteOnline) {
                            this.notify();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    OnlineOfflineService.prototype.notify = /**
     * @private
     * @return {?}
     */
    function () {
        this.logService.log('onlineOffline::notify');
        onlineOfflineData.next({ localOnline: this.localOnline, remoteOnline: this.remoteOnline });
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    OnlineOfflineService.prototype.checkConnection = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var user, gateway, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        gateway = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.gatewayService.callApi(gateway, 'ZAutomation/api/v1/status', 'get', null, null, type)];
                    case 4:
                        response = _a.sent();
                        if (response !== undefined && response.code === 200) {
                            if (type === 'local') {
                                this.localOnline = true;
                            }
                            else {
                                this.remoteOnline = true;
                            }
                        }
                        else {
                            this.logService.log('onlineOffline::local offline-- ' + JSON.stringify(response));
                            // this.localOnline = true;
                            if (type === 'local') {
                                this.localOnline = false;
                            }
                            else {
                                this.remoteOnline = false;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.logService.log('onlineOffline::local offline catch');
                        if (type === 'local') {
                            this.localOnline = false;
                        }
                        else {
                            this.remoteOnline = false;
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OnlineOfflineService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    OnlineOfflineService.ctorParameters = function () { return [
        { type: AuthService },
        { type: GatewayService },
        { type: LogService }
    ]; };
    /** @nocollapse */ OnlineOfflineService.ngInjectableDef = defineInjectable({ factory: function OnlineOfflineService_Factory() { return new OnlineOfflineService(inject(AuthService), inject(GatewayService), inject(LogService)); }, token: OnlineOfflineService, providedIn: "root" });
    return OnlineOfflineService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var FlowUnit = {
    FLOW_L_M: 'L/M',
    FLOW_L_H: 'L/H',
    FLOW_M3_H: 'm3/H',
};
/** @enum {string} */
var AmountUnit = {
    AMOUNT_LITERS: 'l',
    AMOUNT_CUBICMETERS: 'm3',
};
/** @enum {string} */
var TemperatureUnit = {
    TEMPERATURE_C: 'C',
    TEMPERATURE_F: 'F',
};
/** @enum {string} */
var PressureUnit = {
    PRESSURE_BAR: 'Bar',
    PRESSURE_PA: 'Pa',
};
var Settings = /** @class */ (function () {
    function Settings() {
        this.amountUnit = AmountUnit.AMOUNT_LITERS;
        this.flowUnit = FlowUnit.FLOW_L_H;
        this.pressureUnit = PressureUnit.PRESSURE_BAR;
        this.temperatureUnit = TemperatureUnit.TEMPERATURE_C;
    }
    return Settings;
}());
var SensorSettingService = /** @class */ (function () {
    function SensorSettingService(cacheService) {
        this.cacheService = cacheService;
        this.storageName = 'user_settings';
    }
    /**
     * @description convert the amount parameters to specific value
     * @param unit amount parameter to change
     * @param inValue initial value of unit
     */
    /**
     * \@description convert the amount parameters to specific value
     * @param {?} unit amount parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    SensorSettingService.prototype.convertAmount = /**
     * \@description convert the amount parameters to specific value
     * @param {?} unit amount parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    function (unit, inValue) {
        console.log('Hy I am Unit', unit);
        if (unit === AmountUnit.AMOUNT_LITERS) {
            return this.roundValueToZeroDigits(inValue * 1000);
        }
        else if (unit === AmountUnit.AMOUNT_CUBICMETERS) {
            return this.roundValue(inValue);
        }
        else {
            return this.roundValueToZeroDigits(inValue * 1000);
        }
    };
    /**
     * @description convert the flow parameters to specific value
     * @param unit flow parameter to change
     * @param inValue initial value of unit
     */
    /**
     * \@description convert the flow parameters to specific value
     * @param {?} unit flow parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    SensorSettingService.prototype.convertFlow = /**
     * \@description convert the flow parameters to specific value
     * @param {?} unit flow parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    function (unit, inValue) {
        if (unit === FlowUnit.FLOW_L_M) {
            return this.roundValue(inValue / 60);
        }
        else if (unit === FlowUnit.FLOW_L_H) {
            return this.roundValueToZeroDigits(inValue);
        }
        else if (unit === FlowUnit.FLOW_M3_H) {
            return this.roundValue(inValue / 1000);
        }
        else {
            return this.roundValue(inValue / 60);
        }
    };
    /**
     * @description convert the temperature parameters to specific value
     * @param unit unit of parameter to change
     * @param inValue initial value of unit
     */
    /**
     * \@description convert the temperature parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    SensorSettingService.prototype.convertTemp = /**
     * \@description convert the temperature parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    function (unit, inValue) {
        if (unit === TemperatureUnit.TEMPERATURE_C) {
            return this.roundValue(inValue);
        }
        else if (unit === TemperatureUnit.TEMPERATURE_F) {
            return this.roundValue((inValue * 9) / 5 + 32);
        }
        else {
            return this.roundValue(inValue);
        }
    };
    /**
     * @description convert the pressure parameters to specific value
     * @param unit unit of parameter to change
     * @param inValue initial value of unit
     */
    /**
     * \@description convert the pressure parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    SensorSettingService.prototype.convertPressure = /**
     * \@description convert the pressure parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    function (unit, inValue) {
        if (unit === PressureUnit.PRESSURE_BAR) {
            return this.roundValue(inValue / 100);
        }
        else if (unit === PressureUnit.PRESSURE_PA) {
            return this.roundValue(inValue);
        }
        else {
            return this.roundValue(inValue / 100);
        }
    };
    /**
     * @description get settings parameter object from local storage
     */
    /**
     * \@description get settings parameter object from local storage
     * @return {?}
     */
    SensorSettingService.prototype.getSettings = /**
     * \@description get settings parameter object from local storage
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var gw, rawGatewayObject;
            return __generator(this, function (_a) {
                gw = new Settings();
                rawGatewayObject = this.cacheService.getLocalData(this.storageName);
                if (rawGatewayObject !== null) {
                    gw = (rawGatewayObject);
                }
                if (gw == null) {
                    console.log('GW was null, create new object');
                    gw = new Settings();
                }
                return [2 /*return*/, gw];
            });
        });
    };
    /**
     * @description set settings parameter object in local storage
     * @param settings object to store
     */
    /**
     * \@description set settings parameter object in local storage
     * @param {?} settings object to store
     * @return {?}
     */
    SensorSettingService.prototype.setSettings = /**
     * \@description set settings parameter object in local storage
     * @param {?} settings object to store
     * @return {?}
     */
    function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.cacheService.setLocalData(this.storageName, (settings));
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    SensorSettingService.prototype.roundValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value.toFixed(1);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    SensorSettingService.prototype.roundValueToZeroDigits = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value.toFixed(0);
    };
    SensorSettingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SensorSettingService.ctorParameters = function () { return [
        { type: CacheService }
    ]; };
    /** @nocollapse */ SensorSettingService.ngInjectableDef = defineInjectable({ factory: function SensorSettingService_Factory() { return new SensorSettingService(inject(CacheService)); }, token: SensorSettingService, providedIn: "root" });
    return SensorSettingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SafeGuardDevice = /** @class */ (function () {
    function SafeGuardDevice() {
        this.sensorDevices = [];
    }
    /**
     * @return {?}
     */
    SafeGuardDevice.prototype.getAllConfigParams = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 1];
            });
        });
    };
    return SafeGuardDevice;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var sensorUpdateSub = new Subject();
/** @type {?} */
var sensorsDataSub = new Subject();
var ZAutomationService = /** @class */ (function () {
    function ZAutomationService(onlineOfflineService, authService, gatewayService, settingService, logService, cacheService) {
        var _this = this;
        this.onlineOfflineService = onlineOfflineService;
        this.authService = authService;
        this.gatewayService = gatewayService;
        this.settingService = settingService;
        this.logService = logService;
        this.cacheService = cacheService;
        this.appStartTime = Math.floor(new Date().getTime() / 1000);
        this.storageName = 'zautomation_object';
        // private observer: IzAutomationObserver[] = [];
        this.remoteOnline = true;
        this.localOnline = true;
        this.refreshTime = 2500;
        this.freezeButtonUntil = 0;
        this.safeGuardChecked = { flag: false };
        this.failureRate = new BehaviorSubject(0);
        this.logService.log('zAutomationAPI::onInit');
        if (this.cacheService.getLocalData('safeGuardChecked')) {
            this.safeGuardChecked = this.cacheService.getLocalData('safeGuardChecked');
        }
        // this.onlineOfflineService.subscribe(this);
        onlineOfflineData.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.onlineOfflineUpdate(data.localOnline, data.remoteOnline);
        }));
    }
    Object.defineProperty(ZAutomationService.prototype, "deviceMap", {
        get: /**
         * @return {?}
         */
        function () {
            return this._deviceMap;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._deviceMap = value;
            this.setConfigWrapperToStorage(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description function to maintain the state of variables localOnline and remoteOnline
     * @param localOnline boolean value true if device connected localy
     * @param remoteOnline boolean value true if device connected remotely
     */
    /**
     * \@description function to maintain the state of variables localOnline and remoteOnline
     * @param {?} localOnline boolean value true if device connected localy
     * @param {?} remoteOnline boolean value true if device connected remotely
     * @return {?}
     */
    ZAutomationService.prototype.onlineOfflineUpdate = /**
     * \@description function to maintain the state of variables localOnline and remoteOnline
     * @param {?} localOnline boolean value true if device connected localy
     * @param {?} remoteOnline boolean value true if device connected remotely
     * @return {?}
     */
    function (localOnline, remoteOnline) {
        this.logService.log('zAutomationAPI::onlineOfflineUpdate ' + localOnline + ' ' + remoteOnline);
        this.remoteOnline = remoteOnline;
        this.localOnline = localOnline;
    };
    /**
     * @description this method will initialize onlineOfflineService
     * @description and continuosly check for device connectivity status
     * @description it will continuosly call tick method which will fetch connected device info
     */
    /**
     * \@description this method will initialize onlineOfflineService / and continuosly check for device connectivity status / it will continuosly call tick method which will fetch connected device info
     * @return {?}
     */
    ZAutomationService.prototype.initialize = /**
     * \@description this method will initialize onlineOfflineService / and continuosly check for device connectivity status / it will continuosly call tick method which will fetch connected device info
     * @return {?}
     */
    function () {
        var _this = this;
        this.logService.log('initialize method call-- in zAutomation service');
        clearInterval(this.tickInterval);
        this.onlineOfflineService.initialize();
        // this.onlineOfflineInitialize();
        this.tick(true);
        this.logService.log('Tick Runs 1st Time ------------------->');
        this.tickInterval = setInterval((/**
         * @return {?}
         */
        function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // await this.onlineOfflineInitialize();
                this.tick(false);
                return [2 /*return*/];
            });
        }); }), this.refreshTime);
    };
    /**
     * @description if device is connected either localy or remotely then this function will call the polldata function
     * @description to get the connected device info
     * @param firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     */
    /**
     * \@description if device is connected either localy or remotely then this function will call the polldata function / to get the connected device info
     * @private
     * @param {?} firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     * @return {?}
     */
    ZAutomationService.prototype.tick = /**
     * \@description if device is connected either localy or remotely then this function will call the polldata function / to get the connected device info
     * @private
     * @param {?} firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     * @return {?}
     */
    function (firstRun) {
        return __awaiter(this, void 0, void 0, function () {
            var user, gw, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logService.log('in tick function zAutomation service');
                        // if (this.observer.length > 0) {
                        this.logService.log('zAutomationAPI::tick');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        if (!this.localOnline && !this.remoteOnline) {
                            this.logService.log('zAutomationAPI::no tick, because Offline');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.authService.getUser()];
                    case 2:
                        user = _b.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 3:
                        gw = _b.sent();
                        if (!(gw.leckageDeviceId !== undefined)) return [3 /*break*/, 8];
                        if (!firstRun) return [3 /*break*/, 5];
                        this.logService.log('zAutomationAPI::firstRunLoad');
                        _a = this;
                        return [4 /*yield*/, this.getConfigWrapperFromStorage()];
                    case 4:
                        _a._deviceMap = _b.sent();
                        this.notify();
                        return [3 /*break*/, 7];
                    case 5:
                        // if (firstRun || this.observer.length > 0) {
                        this.logService.log('zAutomationAPI::tick::polldata');
                        this.logService.log('DEBUG firstrun:' + firstRun);
                        return [4 /*yield*/, this.pollData()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        // if (this.observer.length === 0) {
                        //   this.logService.log('DEBUG observer length 0');
                        //   // return;
                        // }
                        this.decFailureRate();
                        return [3 /*break*/, 9];
                    case 8:
                        this.logService.log('zAutomationAPI::tick: leackage device undefined, skipping network requests');
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_1 = _b.sent();
                        this.logService.log('zAutomationAPI::tick:Catch: Could not get tick, error: ' +
                            e_1.message +
                            ';;;;;;;' +
                            e_1.stack);
                        this.incFailureRate();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description this function will call fetchpull data to either get whole data or to get data from last update time
     */
    /**
     * \@description this function will call fetchpull data to either get whole data or to get data from last update time
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.pollData = /**
     * \@description this function will call fetchpull data to either get whole data or to get data from last update time
     * @private
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.deviceMap &&
                            this.deviceMap.updateTime &&
                            Object.keys(this.deviceMap.devices).length > 0)) return [3 /*break*/, 2];
                        this.logService.log('zAutomationAPI::pollData: Polling delta data');
                        return [4 /*yield*/, this.fetchPollData('delta')];
                    case 1:
                        _a.sent(); // passing parameter delta to fetch data from last upodatetime
                        return [3 /*break*/, 4];
                    case 2:
                        this.logService.log('zAutomationAPI::pollData: Polling complete data');
                        return [4 /*yield*/, this.fetchPollData('complete')];
                    case 3:
                        _a.sent(); // passing parameter complete to get whole object
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description call device API and get the data either complete or from last update time based on parameter passed
     * @param type should be delta if need to fetch data using last update time else complete
     */
    /**
     * \@description call device API and get the data either complete or from last update time based on parameter passed
     * @private
     * @param {?} type should be delta if need to fetch data using last update time else complete
     * @return {?}
     */
    ZAutomationService.prototype.fetchPollData = /**
     * \@description call device API and get the data either complete or from last update time based on parameter passed
     * @private
     * @param {?} type should be delta if need to fetch data using last update time else complete
     * @return {?}
     */
    function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var url, newWrapper, user, gateway, pollObject, _a, update, deviceID, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.logService.log('in fetchPollData method');
                        if (type === 'delta') {
                            url = 'ZAutomation/api/v1/devices?since=' + this.deviceMap.updateTime;
                            // url = 'ZWaveAPI/Data/' + this.deviceMap.updateTime;
                        }
                        else {
                            url = 'ZAutomation/api/v1/devices';
                            // url = 'ZWaveAPI/Data/?call=4';
                        }
                        newWrapper = { updateTime: '', devices: null };
                        this.logService.log('zAutomationAPI::pollCompleteData');
                        return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _c.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        gateway = _c.sent();
                        return [4 /*yield*/, this.gatewayService.callApi(gateway, url)];
                    case 3:
                        pollObject = _c.sent();
                        this.logService.log('I am PollObject, I might have all the Device Data', pollObject);
                        if (!(type === 'delta')) return [3 /*break*/, 5];
                        // tslint:disable-next-line:no-string-literal
                        newWrapper.updateTime = pollObject['data']['updateTime'];
                        // tslint:disable-next-line:no-string-literal
                        _a = newWrapper;
                        return [4 /*yield*/, this.parseDevices(pollObject['data']['devices'])];
                    case 4:
                        // tslint:disable-next-line:no-string-literal
                        _a.devices = _c.sent();
                        if (newWrapper && newWrapper.devices) {
                            // this.logService.log('zAutomationAPI::MergeAndSave: New one');
                            update = false;
                            // tslint:disable-next-line:forin
                            for (deviceID in newWrapper.devices) {
                                // this.logService.log('zAutomationAPI::MergeAndSave: Updating' + JSON.stringify(newWrapper.devices[deviceID]));
                                this._deviceMap.devices[deviceID] = newWrapper.devices[deviceID];
                                update = true;
                            }
                            if (update) {
                                // this.logService.log('zAutomationAPI::MergeAndSave: Notify');
                                this.setConfigWrapperToStorage(this._deviceMap);
                                this.notify();
                            }
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        // tslint:disable-next-line:no-string-literal
                        newWrapper.updateTime = pollObject['data']['updateTime'];
                        // tslint:disable-next-line:no-string-literal
                        _b = newWrapper;
                        return [4 /*yield*/, this.parseDevices(pollObject['data']['devices'])];
                    case 6:
                        // tslint:disable-next-line:no-string-literal
                        _b.devices = _c.sent();
                        // this.logService.log(newWrapper);
                        this.deviceMap = newWrapper;
                        this.notify();
                        _c.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     */
    /**
     * \@description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     * @private
     * @param {?} gateway
     * @return {?}
     */
    ZAutomationService.prototype.getDeviceAndInstance = /**
     * \@description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     * @private
     * @param {?} gateway
     * @return {?}
     */
    function (gateway) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { device: gateway.leckageDeviceId, instance: 0 }];
            });
        });
    };
    /**
     * @description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     */
    /**
     * \@description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     * @private
     * @param {?} pollObject
     * @return {?}
     */
    ZAutomationService.prototype.parseDevices = /**
     * \@description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     * @private
     * @param {?} pollObject
     * @return {?}
     */
    function (pollObject) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, user, data, deviceIDandInstance, result, pollObject_1, pollObject_1_1, obj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, this.getDeviceAndInstance(data)];
                    case 3:
                        deviceIDandInstance = _b.sent();
                        result = {};
                        try {
                            for (pollObject_1 = __values(pollObject), pollObject_1_1 = pollObject_1.next(); !pollObject_1_1.done; pollObject_1_1 = pollObject_1.next()) {
                                obj = pollObject_1_1.value;
                                // this.logService.log('Checking if ' + deviceIDandInstance.device + ' equals ' + obj.nodeId);
                                if (obj &&
                                    obj.nodeId &&
                                    obj.nodeId.toString() === deviceIDandInstance.device.toString()) {
                                    // tslint:disable-next-line:no-string-literal
                                    result[obj['id']] = obj;
                                }
                                else if (obj.id === 'DummyDevice_18') {
                                    result[obj.id] = obj;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (pollObject_1_1 && !pollObject_1_1.done && (_a = pollObject_1.return)) _a.call(pollObject_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @description getting zautomation_object from the Local storage
     */
    /**
     * \@description getting zautomation_object from the Local storage
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.getConfigWrapperFromStorage = /**
     * \@description getting zautomation_object from the Local storage
     * @private
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, object;
            return __generator(this, function (_a) {
                result = (this.cacheService.getLocalData(this.storageName));
                object = (result);
                return [2 /*return*/, object];
            });
        });
    };
    /**
     * @description setting zautomation_object from the Local storage
     * @param obj Object need to stored in local storage.
     */
    /**
     * \@description setting zautomation_object from the Local storage
     * @private
     * @param {?} obj Object need to stored in local storage.
     * @return {?}
     */
    ZAutomationService.prototype.setConfigWrapperToStorage = /**
     * \@description setting zautomation_object from the Local storage
     * @private
     * @param {?} obj Object need to stored in local storage.
     * @return {?}
     */
    function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.cacheService.setLocalData(this.storageName, (obj));
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description this function notify every time when some chanegs are there in sensor values.
     */
    /**
     * \@description this function notify every time when some chanegs are there in sensor values.
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.notify = /**
     * \@description this function notify every time when some chanegs are there in sensor values.
     * @private
     * @return {?}
     */
    function () {
        sensorUpdateSub.next({ flag: true });
    };
    /**
     * @description this is needed for filtering a specific sensor device from the whole Array
     * @param regex  is regular erpression need to filteraton.
     */
    /**
     * \@description this is needed for filtering a specific sensor device from the whole Array
     * @param {?} regex  is regular erpression need to filteraton.
     * @return {?}
     */
    ZAutomationService.prototype.filterDeviceMap = /**
     * \@description this is needed for filtering a specific sensor device from the whole Array
     * @param {?} regex  is regular erpression need to filteraton.
     * @return {?}
     */
    function (regex) {
        for (var id in this.deviceMap.devices) {
            if (regex.test(id)) {
                return this.deviceMap.devices[id];
            }
        }
    };
    /**
     * @description this just increase the Failure Counter
     */
    /**
     * \@description this just increase the Failure Counter
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.incFailureRate = /**
     * \@description this just increase the Failure Counter
     * @private
     * @return {?}
     */
    function () {
        if (this.failureRate.getValue() < 3) {
            this.failureRate.next(this.failureRate.getValue() + 1);
        }
    };
    /**
     * @description It Just Decrease the Failure Counter.
     */
    /**
     * \@description It Just Decrease the Failure Counter.
     * @private
     * @return {?}
     */
    ZAutomationService.prototype.decFailureRate = /**
     * \@description It Just Decrease the Failure Counter.
     * @private
     * @return {?}
     */
    function () {
        if (this.failureRate.getValue() > 0) {
            this.failureRate.next(this.failureRate.getValue() - 1);
        }
    };
    /**
     * @description it needed for getting the updated value for a perticular Sensor.
     * @param sensorNo using this we know which sensors updated information needed.
     */
    /**
     * \@description it needed for getting the updated value for a perticular Sensor.
     * @param {?} sensorNo using this we know which sensors updated information needed.
     * @return {?}
     */
    ZAutomationService.prototype.updateSensorValue = /**
     * \@description it needed for getting the updated value for a perticular Sensor.
     * @param {?} sensorNo using this we know which sensors updated information needed.
     * @return {?}
     */
    function (sensorNo) {
        return __awaiter(this, void 0, void 0, function () {
            var user, gateway, deviceIDandInstance, deviceIDandInstanceString, sensorPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logService.log('in updateSensorValue-->', sensorNo);
                        return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        gateway = _a.sent();
                        return [4 /*yield*/, this.getDeviceAndInstance(gateway)];
                    case 3:
                        deviceIDandInstance = _a.sent();
                        deviceIDandInstanceString = 'ZWayVDev_zway_' +
                            deviceIDandInstance.device +
                            '-' +
                            deviceIDandInstance.instance;
                        sensorPath = '';
                        switch (sensorNo) {
                            case 0: {
                                sensorPath = deviceIDandInstanceString + '-50-0';
                                break;
                            }
                            case 1: {
                                sensorPath = deviceIDandInstanceString + '-49-23';
                                break;
                            }
                            case 2: {
                                sensorPath = deviceIDandInstanceString + '-49-56';
                                break;
                            }
                            case 3: {
                                sensorPath = deviceIDandInstanceString + '-49-57';
                                break;
                            }
                        }
                        this.logService.log('call api --->sensorPath', sensorPath);
                        return [4 /*yield*/, this.gatewayService.callApi(gateway, 'ZAutomation/api/v1/devices/' + sensorPath + '/command/update')];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param sensorsValue need the initaial sensor values.
     */
    /**
     * \@description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param {?} sensorsValue need the initaial sensor values.
     * @return {?}
     */
    ZAutomationService.prototype.getSensorValue = /**
     * \@description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param {?} sensorsValue need the initaial sensor values.
     * @return {?}
     */
    function (sensorsValue) {
        return __awaiter(this, void 0, void 0, function () {
            var sensors, user, gateway, settings, waterMeter, waterTemperature, waterFlow, waterPressure, dummyDevice, now, nowOneMin, i, e_3, guardChecked;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sensors = sensorsValue;
                        this.logService.log('in update method-- device metrics');
                        return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.gatewayService.getPairedGateway(user.access_token)];
                    case 2:
                        gateway = _a.sent();
                        if (!(this.deviceMap && this.deviceMap.updateTime)) return [3 /*break*/, 7];
                        // this.onlineOfflineService.REGUARD_OFFLINE = false;
                        // if (!DemoMode.IS_MOCK_DATA_MODE || !DemoMode.IS_JUST_MOCK_DATA_MODE) {
                        if (this.device) {
                            this.device.sensorDevices = [];
                        }
                        else {
                            this.device = new SafeGuardDevice();
                        }
                        if (this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-37$', 'g')).metrics.isFailed) {
                            // REGUARD is offline
                            // this.onlineOfflineService.REGUARD_OFFLINE = true;
                            setTimeout((/**
                             * @return {?}
                             */
                            function () {
                                _this.getSensorValue(sensors);
                            }), 5000);
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.settingService.getSettings()];
                    case 4:
                        settings = _a.sent();
                        // WATERMETER
                        waterMeter = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-50-0$', 'g'));
                        this.logService.log('DeviceMetricsComponent::Update: settings meter before converting: ' +
                            JSON.stringify(waterMeter.metrics.level));
                        sensors[0].timestamp = waterMeter.updateTime;
                        sensors[0].value =
                            '' +
                                this.settingService.convertAmount(settings.amountUnit, waterMeter.metrics.level);
                        // Translation service
                        // this.sensors[0].subTitle = this.translationService.instant(
                        //   settings.amountUnit
                        // );
                        // this.sensors[0].title = this.translationService.instant('Amount');
                        // TEMPERATURE
                        waterTemperature = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-23$', 'g'));
                        sensors[1].timestamp = waterTemperature.updateTime;
                        sensors[1].value =
                            '' +
                                this.settingService.convertTemp(settings.temperatureUnit, waterTemperature.metrics.level);
                        // Translation Services
                        // this.sensors[1].subTitle = this.translationService.instant(
                        //   settings.temperatureUnit
                        // );
                        // this.sensors[1].title = this.translationService.instant(
                        //   'Temperature'
                        // );
                        // FLOW
                        waterFlow = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-56$', 'g'));
                        sensors[2].timestamp = waterFlow.updateTime;
                        sensors[2].value =
                            '' +
                                this.settingService.convertFlow(settings.flowUnit, waterFlow.metrics.level);
                        // Translation Services
                        // this.sensors[2].subTitle = this.translationService.instant(
                        //   settings.flowUnit
                        // );
                        // this.sensors[2].title = this.translationService.instant('Flow');
                        // PRESSURE
                        waterPressure = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-57$', 'g'));
                        this.logService.log('DeviceMetricsComponent::Update: settings waterPressure: ' +
                            JSON.stringify(waterPressure));
                        this.logService.log('Water Sensor Updated Time', waterPressure.updateTime);
                        sensors[3].timestamp = waterPressure.updateTime;
                        sensors[3].value =
                            '' +
                                this.settingService.convertPressure(settings.pressureUnit, waterPressure.metrics.level);
                        // Dummy Device 18
                        // PRESSURE
                        // alert('11');
                        dummyDevice = this.filterDeviceMap(new RegExp('DummyDevice_18', 'g'));
                        if (dummyDevice) {
                            this.logService.log('Dummy Device Updated level', dummyDevice.metrics.level);
                            sensors[4].timestamp = dummyDevice.updateTime;
                            sensors[4].value = dummyDevice.metrics.level;
                        }
                        this.logService.log('Hey I am New Sensor Value', sensors);
                        this.cacheService.setLocalData('sensors', (sensors));
                        this.logService.log('sensors-local-storage: ' + JSON.stringify(sensors));
                        now = Math.floor(new Date().getTime() / 1000) - 60 * 2;
                        nowOneMin = Math.floor(new Date().getTime() / 1000) - 20;
                        this.logService.log('before loop sensor--->', sensors);
                        for (i = 0; i < sensors.length; i++) {
                            this.logService.log('DeviceMetricsComponent::Update: oldstamp: ' +
                                sensors[i].timestamp +
                                'newstamp: ' +
                                now);
                            if (sensors[i].timestamp) {
                                if (sensors[i].timestamp < now &&
                                    this.appStartTime < nowOneMin) {
                                    this.updateSensorValue(i);
                                    this.logService.log('DeviceMetricsComponent::Update: UpdateSensorValueCalled ' +
                                        (now - sensors[i].timestamp));
                                }
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        this.logService.log('DeviceMetricsComponent::Update: Error fetching deviceMetrics! ' + e_3);
                        return [3 /*break*/, 6];
                    case 6:
                        // }
                        if (this.freezeButtonUntil <= new Date().getTime()) {
                            guardChecked = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-37$', 'g'));
                            this.safeGuardChecked.flag = guardChecked.metrics.level === 'on';
                            this.cacheService.setLocalData('safeGuardChecked', (this.safeGuardChecked));
                        }
                        _a.label = 7;
                    case 7:
                        sensorsDataSub.next({ data: sensors });
                        return [2 /*return*/];
                }
            });
        });
    };
    ZAutomationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ZAutomationService.ctorParameters = function () { return [
        { type: OnlineOfflineService },
        { type: AuthService },
        { type: GatewayService },
        { type: SensorSettingService },
        { type: LogService },
        { type: CacheService }
    ]; };
    /** @nocollapse */ ZAutomationService.ngInjectableDef = defineInjectable({ factory: function ZAutomationService_Factory() { return new ZAutomationService(inject(OnlineOfflineService), inject(AuthService), inject(GatewayService), inject(SensorSettingService), inject(LogService), inject(CacheService)); }, token: ZAutomationService, providedIn: "root" });
    return ZAutomationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { RehauFunctionalCoreService, RehauFunctionalCoreModule, reducers, CacheService, LogService, LoginService, AuthService, LoaderFlag, StoreService, TranslationService, AuthGuard, slideInAnimation, OnBoardingService, GatewayAlreadyConfiguredError, GatewaySerialNotFoundError, GatewayService, GatewayAclService, GatewayDeviceControlService, sensorUpdateSub, sensorsDataSub, ZAutomationService, ConfigService as ɵe, CONFIG_FACTORY as ɵd, SensorSettingService as ɵs, OnlineOfflineService as ɵr, HttpLoaderFactory as ɵa, TRANSLATE_FACTORY as ɵb, TranslateServiceModule as ɵc, WebService as ɵq, userInfoAction as ɵm, cidaasReducer as ɵl, initialState$1 as ɵk, loaderAction as ɵp, initialState$2 as ɵn, loaderReducer as ɵo, onBoardingBackStep as ɵj, onBoardingNextStep as ɵi, initialState as ɵg, onBoardingReducer as ɵh };

//# sourceMappingURL=rehau-functional-core.js.map