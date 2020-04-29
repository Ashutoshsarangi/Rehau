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
import { __awaiter } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const onBoardingNextStep = createAction('[OnBoarding Step] Manage Next Step', props());
/** @type {?} */
const onBoardingBackStep = createAction('[OnBoarding Step] Manage Back Step', props());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RehauFunctionalCoreService {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.store = store;
        this.onBoardingData$ = store.pipe(select('onBoardingData'));
    }
    /**
     * @return {?}
     */
    showSuccess() {
        this.onBoardingData$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            console.log('this is list of onBoardings from App.component -->', data);
        }));
        this.store.dispatch(onBoardingNextStep({ payload: { configPosition: 6 } }));
    }
}
RehauFunctionalCoreService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RehauFunctionalCoreService.ctorParameters = () => [
    { type: Store }
];
/** @nocollapse */ RehauFunctionalCoreService.ngInjectableDef = defineInjectable({ factory: function RehauFunctionalCoreService_Factory() { return new RehauFunctionalCoreService(inject(Store)); }, token: RehauFunctionalCoreService, providedIn: "root" });

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
    () => configService.initConfig());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LogService {
    /**
     * \@description This Method is for general console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    log(...content) {
        console.log('✅ ', ...content);
    }
    /**
     * \@description This Method is for error console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    log_e(...content) {
        console.log('🚫❗️ ', ...content);
    }
    /**
     * \@description This Method is for warning console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    log_w(...content) {
        console.log('🔶 ', ...content);
    }
    /**
     * \@description This Method is for debugging console logs
     * @param {...?} content is the text you want to print as console
     * @return {?}
     */
    log_d(...content) {
        console.log('🔷 TODO: ', ...content);
    }
}
LogService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description Service for configuring global properties
 */
class ConfigService {
    /**
     * @param {?} configuration
     * @param {?} logService
     */
    constructor(configuration, logService) {
        this.configuration = configuration;
        this.logService = logService;
    }
    /**
     * @return {?}
     */
    initConfig() {
        this.conFig = this.configuration;
        this.logService.log('Configuration data loaded1: ', this.conFig);
    }
}
ConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] },
    { type: LogService }
];

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
    () => configService.initTranslation());
}
class TranslateServiceModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TranslationService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RehauFunctionalCoreModule {
    /**
     * @param {?} SERVICE_CONFIG
     * @return {?}
     */
    static forRoot(SERVICE_CONFIG) {
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
                        () => ConfigService))],
                    multi: true
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: TRANSLATE_FACTORY,
                    deps: [forwardRef((/**
                         * @return {?}
                         */
                        () => TranslationService))],
                    multi: true
                },
                ConfigService,
            ]
        };
    }
}
RehauFunctionalCoreModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [],
                exports: [
                    TranslateServiceModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const initialState = {
    configPosition: 0
};
const ɵ0 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
(state, { payload }) => ({ configPosition: payload.configPosition + 1 }), ɵ1 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
(state, { payload }) => ({ configPosition: payload.configPosition - 1 });
/** @type {?} */
const Reducer = createReducer(initialState, on(onBoardingNextStep, (ɵ0)), on(onBoardingBackStep, (ɵ1)));
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
const userInfoAction = createAction('User info from CIDAAS', props());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const initialState$1 = {
    userInfo: {}
};
const ɵ0$1 = /**
 * @param {?} state
 * @param {?} __1
 * @return {?}
 */
(state, { payload }) => ({ userInfo: Object.assign({}, payload.userInfo) });
/** @type {?} */
const Reducer$1 = createReducer(initialState$1, on(userInfoAction, (ɵ0$1)));
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
const loaderAction = createAction('Show-Hide laoder', props());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const initialState$2 = {
    showLoader: false,
};
const ɵ0$2 = /**
 * @param {?} state
 * @return {?}
 */
state => (Object.assign({}, state));
/** @type {?} */
const Reducer$2 = createReducer(initialState$2, on(loaderAction, (ɵ0$2)));
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
const reducers = {
    onBoardingData: onBoardingReducer,
    cidaasData: cidaasReducer,
    loaderState: loaderReducer
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CacheService {
    /**
     * @param {?} configuration
     */
    constructor(configuration) {
        this.configuration = configuration;
        this.simpleCrypto = new SimpleCrypto(this.configuration.globalConfig.SECRET_KEY);
    }
    /**
     * \@description This Method is required for Removing particular data from local storage.
     * @param {?} key  is required for the removing particular data
     * @return {?}
     */
    removeLocalData(key) {
        localStorage.removeItem(key);
    }
    /**
     * \@description This Method is required for getting Local storage Data.
     * @param {?} key
     * @return {?}
     */
    getLocalData(key) {
        // Set the second paramter to true, then it will return object instead of string
        if (localStorage.getItem(key)) {
            return this.simpleCrypto.decrypt(localStorage.getItem(key), true);
        }
        else {
            return false;
        }
    }
    /**
     * \@description This Method is for setting Key, Value pair in the Local storage.
     * @param {?} key is used for the storeing data.
     * @param {?} value is the Actual value which need to be encrypted befor store.
     * @return {?}
     */
    setLocalData(key, value) {
        /** @type {?} */
        const encrypted = this.simpleCrypto.encrypt(value);
        localStorage.setItem(key, encrypted);
    }
}
CacheService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CacheService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
class CidaasProvider extends OAuthProvider {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.revokeUrl = CidaasProvider.baseURL + '/authz-srv/revoke';
        this.authUrl = CidaasProvider.baseURL + '/authz-srv/authz';
        this.defaults = {
            responseType: 'code'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static base64URLEncode(str) {
        return str.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
    /**
     * @param {?} buffer
     * @return {?}
     */
    sha256(buffer) {
        return shajs('sha256').update(buffer).digest();
    }
    /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    removeParam(key, sourceURL) {
        /** @type {?} */
        let rtn = sourceURL.split('?')[0];
        /** @type {?} */
        let param = '';
        /** @type {?} */
        let paramsArr = [];
        /** @type {?} */
        const queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : '';
        if (queryString !== '') {
            paramsArr = queryString.split('&');
            for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
                param = paramsArr[i].split('=')[0];
                if (param === key) {
                    paramsArr.splice(i, 1);
                }
            }
            rtn = rtn + '?' + paramsArr.join('&');
        }
        return rtn;
    }
    /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    addParam(key, sourceURL) {
        sourceURL += `&scope=`;
        sourceURL += `${this.options.appScope.join(' ')}`;
        return sourceURL;
    }
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    optionsToDialogUrl(options) {
        /** @type {?} */
        let url = super.optionsToDialogUrl(options);
        url = this.removeParam('scope', url);
        url = this.addParam('scope', url);
        if (options.authType) {
            url += `&auth_type=${options.authType}`;
        }
        if (options.nonce) {
            url += `&nonce=${options.nonce}`;
        }
        if (options.code_challenge_method === 'plain') {
            url += `&code_challenge=${options.code_challenge}&code_challenge_method=${options.code_challenge_method}`;
        }
        if (options.code_challenge_method === 'S256') {
            url += `&code_challenge=${CidaasProvider.base64URLEncode(this.sha256(options.code_challenge))}&code_challenge_method=${options.code_challenge_method}`;
        }
        if (options.viewType) {
            url += `&view_type=${options.viewType}`;
        }
        console.log('Calling URL: ' + url);
        return url;
    }
}
CidaasProvider.CLIENT_ID = '9feab210-c025-406d-a10c-3d8323214491';
CidaasProvider.baseURL = 'https://accounts.rehau.com';
CidaasProvider.tokenEndpoint = CidaasProvider.baseURL + '/token-srv/token';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebService {
    /**
     * @param {?} http
     * @param {?} logService
     * @param {?} configuration
     */
    constructor(http, logService, configuration) {
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
     * \@description This method is for Get Api Calls
     * @param {?} url String url for the API
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} This function returns the respective response from the Api
     */
    getApi(url, httpOptions = {}, retryConfig = {}) {
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.get(url, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    this.logService.log_w('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                (iteration, initialInterval) => Math.pow(1.5, iteration) * initialInterval)
            }));
        }
        else {
            return this.http.get(url, httpOptions);
        }
    }
    /**
     * This method is for Post Api calls
     * @param {?} url String Api URL
     * @param {?} requestBody Object required for the Post request
     * @param {?=} httpOptions header part is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure
     * @return {?} Return the respective responce from the Apis.
     */
    postApi(url, requestBody, httpOptions = {}, retryConfig = {}) {
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
                error => {
                    console.log('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                (iteration, initialInterval) => Math.pow(1.5, iteration) * initialInterval)
            }));
        }
        else {
            return this.http.post(url, requestBody, httpOptions);
        }
    }
    /**
     * This method is for Request Api calls
     * @param {?} method String method need to pass in request API
     * @param {?} url String API URL
     * @param {?} httpOptions header details is optional
     * @param {?=} retryConfig is the object if want to hit API multiple time after failure. it is optional
     * @return {?} Return the respective responce from the Apis.
     */
    requestApi(method, url, httpOptions, retryConfig = {}) {
        if (Object.keys(retryConfig).length !== 0) {
            return this.http.request(method, url, httpOptions).pipe(timeout(retryConfig.REQ_TIMEOUT), retryBackoff({
                initialInterval: retryConfig.INIT_INTERVAL,
                maxInterval: retryConfig.MAX_INTERVAL,
                maxRetries: retryConfig.MAX_RETRIES,
                shouldRetry: (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    // this.logService.log_w('Aborted remote request');
                    console.log('Aborted remote request');
                    return true;
                }),
                backoffDelay: (/**
                 * @param {?} iteration
                 * @param {?} initialInterval
                 * @return {?}
                 */
                (iteration, initialInterval) => Math.pow(1.5, iteration) * initialInterval)
            }));
        }
        else {
            return this.http.post(method, url, httpOptions);
            // return this.postApi(url, {}, httpOptions);
        }
    }
}
WebService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WebService.ctorParameters = () => [
    { type: HttpClient },
    { type: LogService },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];
/** @nocollapse */ WebService.ngInjectableDef = defineInjectable({ factory: function WebService_Factory() { return new WebService(inject(HttpClient), inject(LogService), inject("SERVICE_CONFIG")); }, token: WebService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const userData = 'USERDATA';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const LoaderFlag = new Subject();
class StoreService {
    /**
     * @param {?} store
     * @param {?} logService
     */
    constructor(store, logService) {
        this.store = store;
        this.logService = logService;
        this.userData$ = this.store.pipe(select('cidaasData'));
        this.showLoader$ = store.pipe(select('loaderState'));
    }
    /**
     * @param {?} Data
     * @return {?}
     */
    dispatchUserData(Data) {
        this.store.dispatch(userInfoAction({ payload: { userInfo: Data } }));
    }
    /**
     * \@description This function will return the latest state of userData from store
     * @return {?} object of user data
     */
    getUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let userData;
            this.userData$.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (Object.keys(data.userInfo).length > 0) {
                    userData = data.userInfo;
                }
            }));
            return userData;
        });
    }
    /**
     * \@description This function will update the state of loader
     * @param {?} state is the value of state to dispatch
     * @return {?}
     */
    dispatchLoaderState(state) {
        this.logService.log('in dispatch method tab loader state', state);
        this.store.dispatch(loaderAction(state));
        LoaderFlag.next(state);
    }
    /**
     * \@description This function will return the latest state of loader
     * @return {?} current loader state
     */
    getLoaderState() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let loaderState;
            this.showLoader$.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                loaderState = state;
            }));
            this.logService.log('in get loader state --->', loaderState);
            LoaderFlag.next(loaderState.showLoader);
            return loaderState.showLoader;
        });
    }
}
StoreService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StoreService.ctorParameters = () => [
    { type: Store },
    { type: LogService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthService {
    /**
     * @param {?} webService
     * @param {?} cacheService
     * @param {?} logservice
     * @param {?} storeService
     * @param {?} configuration
     */
    constructor(webService, cacheService, logservice, storeService, configuration) {
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
    oAuthCallback(body, message) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const response = yield this.getToken(body, message);
            return response;
        });
    }
    /**
     * \@description This function is responsible to call postAPI method to get the new token
     * @param {?} body
     * @return {?} object of ITokenEndpointResponse
     */
    tokenRequest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.webService.postApi(this.configuration.cidaasConfig.ciddasTokenEndpoint, body).toPromise();
        });
    }
    /**
     * \@description This function will call the token request method to get new token / And will store the user data in store and local storage
     * @private
     * @param {?} body
     * @param {?} message
     * @return {?} object of user data
     */
    getToken(body, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /** @type {?} */
                const response = yield this.tokenRequest(body);
                if (!response.access_token || !response.refresh_token) {
                    // Here We clean the User Object from Local Storage and Store.
                    this.storeService.dispatchUserData({});
                    this.cacheService.removeLocalData(userData);
                    return response;
                }
                else {
                    body.access_token = response.access_token;
                    body.refresh_token = response.refresh_token;
                    // Here We Set the User Object in Local Storage and Store.
                    this.storeService.dispatchUserData(body);
                    this.cacheService.setLocalData(userData, body);
                    return body;
                }
            }
            catch (e) {
                if (e.error instanceof ErrorEvent) {
                    this.logservice.log_e('An error occurred for getting ' + message + ':', e.error.message);
                    this.logservice.log('Never the less leave the use do its thing without tokens');
                    body.status = e.status;
                    body.message = e.error.message;
                    return body;
                }
                else if (e.status === 0) {
                    this.logservice.log_e('An error occurred for getting ' + message + ':', e.error.message);
                    this.logservice.log('Never the less leave the use do its thing without tokens');
                    body.status = e.status;
                    body.message = e.error.message;
                    return body;
                }
                else if (e.status === 408) {
                    this.logservice.log_e('An error occurred for getting ' + message + ':', e.error.message);
                    this.logservice.log('Never the less leave the use do its thing without tokens');
                    body.status = e.status;
                    body.message = e.error.message;
                    return body;
                }
                else {
                    this.logservice.log_e(`Backend returned code for getting ${message} ${e.status}, ` +
                        `body was for getting ${message} : ${e.error}`);
                    this.storeService.dispatchUserData({});
                    this.cacheService.removeLocalData(userData);
                    // await this.logoutService.doLogout();
                    return body;
                }
            }
        });
    }
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check whether user is new or existing. / If user is existing then this function will get the current or refreshed token
     * @return {?} boolean value based on expired
     */
    isLoggedIn() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const currentUserFromStore = yield this.storeService.getUserData();
            /** @type {?} */
            const currentUser = this.cacheService.getLocalData(userData);
            this.logservice.log('User data from local storage = ', currentUser);
            this.logservice.log('User data from store = ', currentUserFromStore);
            if (currentUserFromStore && currentUser) {
                /** @type {?} */
                const res = yield this.checkTokenStatus(currentUser);
                return res;
            }
            else if (currentUserFromStore && !currentUser) { // if data is present in store but not in local stoarge
                this.cacheService.setLocalData(userData, currentUserFromStore); // update locsal storage
                // update locsal storage
                /** @type {?} */
                const res = yield this.checkTokenStatus(currentUserFromStore);
                return res;
            }
            else if (!currentUserFromStore && currentUser) { // if data is present in local storage but not in Store
                this.storeService.dispatchUserData(currentUser); // update store
                // update store
                /** @type {?} */
                const res = yield this.checkTokenStatus(currentUser);
                return res;
            }
            else {
                return false;
            }
        });
    }
    // tslint:disable-next-line:jsdoc-format
    /**
     * \@description This function will check the status of token whether it is expired or not / If token is expired then it will call refresh token method
     * @param {?} currentUser is the currentuser object either from store or local storage
     * @return {?} boolean value or refresh token object based on condition
     */
    checkTokenStatus(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const isExpired = this.isTokenExpire(currentUser.access_token);
            if (isExpired) {
                this.logservice.log_w('THIS ACCESS_TOKEN IS EXPIRED in Login, try getting new one.');
                /** @type {?} */
                const res = yield this.refreshTokenWrapper(currentUser);
                return res;
            }
            else {
                return true;
            }
        });
    }
    /**
     * \@description This function is required for checking the access_token is expired or not.
     * @param {?} access_token Need Access_token for checking is it expired
     * @return {?} boolean value based on expied
     */
    // tslint:disable-next-line:variable-name
    isTokenExpire(access_token) {
        /** @type {?} */
        const helper = new JwtHelperService();
        return helper.isTokenExpired(access_token);
    }
    /**
     * \@description This method will get call whenevr we need to refresh the expise token
     * @private
     * @param {?} user is the object conatining all CIDAAS login data
     * @return {?} object of CIDAAS login data including regresh token
     */
    refreshTokenWrapper(user) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const body = {
                client_id: this.configuration.cidaasConfig.cidaasClientId,
                grant_type: 'refresh_token',
                refresh_token: user.refresh_token
            };
            /** @type {?} */
            const result = yield this.getToken(body, 'refresh token');
            return result;
        });
    }
    /**
     * \@description This method will decide the access token
     * @return {?} decoded access token
     */
    getCorrelationId() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const user = yield this.getUser();
            /** @type {?} */
            const helper = new JwtHelperService();
            /** @type {?} */
            const decodedToken = helper.decodeToken(user.access_token);
            return decodedToken.sub;
        });
    }
    /**
     * \@description This method is to get the userData related to CIDAAS login
     * @return {?} object of CIDAAS login data
     */
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let user = this.cacheService.getLocalData(userData);
            /** @type {?} */
            const helper = new JwtHelperService();
            if (user) {
                /** @type {?} */
                const isExpired = this.isTokenExpire(user.access_token);
                if (isExpired) {
                    this.logservice.log('THIS ACCESS_TOKEN IS EXPIRED in getUser, try getting new one.');
                    user = yield this.refreshTokenWrapper(user);
                    this.logservice.log('refreshTest::got result in getUser ' + user);
                }
            }
            return user;
        });
    }
}
AuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: WebService },
    { type: CacheService },
    { type: LogService },
    { type: StoreService },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];
/** @nocollapse */ AuthService.ngInjectableDef = defineInjectable({ factory: function AuthService_Factory() { return new AuthService(inject(WebService), inject(CacheService), inject(LogService), inject(StoreService), inject("SERVICE_CONFIG")); }, token: AuthService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const bodyParam = { grant_type: 'authorization_code' };
/** @type {?} */
const loginDesign = {
    closebuttoncolor: '#dd0060',
    hardwareback: 'no',
    hidenavigationbuttons: 'no',
    hideurlbar: 'yes',
    navigationbuttoncolor: '#dd0060',
    toolbarcolor: '#f7f7f7'
};
/** @type {?} */
const registerDesign = {
    closebuttoncolor: '#dd0060',
    hardwareback: 'no',
    hidenavigationbuttons: 'no',
    hideurlbar: 'yes',
    navigationbuttoncolor: '#dd0060',
    toolbarcolor: '#f7f7f7'
};
/** @type {?} */
const userObject = {
    message: '',
    status: '',
    accessToken: '',
    refreshToken: ''
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoginService {
    /**
     * @param {?} authService
     * @param {?} logService
     * @param {?} configService
     * @param {?} storeService
     * @param {?} cacheService
     * @param {?} configuration
     */
    constructor(authService, logService, configService, storeService, cacheService, configuration) {
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
     * \@description This is CIDAAS Authentication main function
     * @param {?} actionType is the string which indicates the type of action whether it is login or register
     * @param {?=} platform is used to define the platform to use. Default value is browser
     * @return {?}
     */
    cidaasAuth(actionType, platform = 'browser') {
        return __awaiter(this, void 0, void 0, function* () {
            actionType = actionType.trim();
            /** @type {?} */
            let provider;
            if (actionType === 'register token') {
                // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasRegisterProvider });
                provider = new CidaasProvider(Object.assign({}, this.cidaasParam, this.cidaasRegisterProvider));
            }
            else if (actionType === 'login token') {
                // provider = new CidaasProvider({ ...this.cidaasParam, ...cidaasLoginProvider });
                provider = new CidaasProvider(Object.assign({}, this.cidaasParam, this.cidaasLoginProvider));
            }
            /** @type {?} */
            const pkceBody = {
                grant_type: bodyParam.grant_type,
                client_id: provider.options.clientId,
                redirect_uri: provider.options.redirectUri,
                code_verifier: CidaasProvider.base64URLEncode(provider.options.code_challenge)
            };
            this.logService.log('TEST CONFI SERVICE = ', +this.configService.configuration);
            this.logService.log('pkceBody required for login = ' + pkceBody);
            this.logService.log('provider body required for login =' + provider);
            /** @type {?} */
            let result;
            /** @type {?} */
            const res = userObject;
            try {
                result = yield this.login(provider, pkceBody, actionType, platform);
                if (result.access_token === '' || result.access_token === undefined) {
                    this.logService.log_e('login failed == ');
                    this.logService.log_e(result);
                    res.message = 'login Failed';
                    res.status = '1';
                    return res;
                }
                else {
                    this.logService.log('login successFull == ');
                    this.logService.log(result);
                    res.message = 'login success';
                    res.status = '0';
                    res.accessToken = result.access_token;
                    res.refreshToken = result.refresh_token;
                    return res;
                }
            }
            catch (err) {
                throwError(err);
            }
        });
    }
    /**
     * \@description This is logout function / it will remove userData from local storage and store
     * @return {?}
     */
    cidaasLogout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.storeService.dispatchUserData({});
                this.cacheService.removeLocalData(userData);
                return true;
            }
            catch (err) {
                throwError(err);
            }
        });
    }
    /**
     * \@description This is Login function to call oauth loginVia API
     * @param {?} provider is the CIDAAS provider object
     * @param {?} pkceBody is the ITokenEndpointBody object
     * @param {?} actionType it is identifier for the API action whether it is for login/register
     * @param {?} platform
     * @return {?}
     */
    login(provider, pkceBody, actionType, platform) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let res;
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
            if (actionType === 'register token') {
                res = yield this.oauth.logInVia(provider, this.cidaasLoginDesign);
            }
            else if (actionType === 'login token') {
                res = yield this.oauth.logInVia(provider, this.cidaasRegisterDesign);
            }
            if (!!res) {
                pkceBody.code = res.code;
                /** @type {?} */
                const data = yield this.authService.oAuthCallback(pkceBody, actionType);
                return data;
            }
        });
    }
}
LoginService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LoginService.ctorParameters = () => [
    { type: AuthService },
    { type: LogService },
    { type: ConfigService },
    { type: StoreService },
    { type: CacheService },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthGuard {
    /**
     * @param {?} logService
     * @param {?} authService
     * @param {?} router
     * @param {?} configuration
     */
    constructor(logService, authService, router, configuration) {
        this.logService = logService;
        this.authService = authService;
        this.router = router;
        this.configuration = configuration;
    }
    /**
     * \@description This method will check user already login or not
     * @return {?} Return the true if user already logged in or else false
     */
    canActivate() {
        this.logService.log('can Activate method is called!!!');
        /** @type {?} */
        const loginScreenUrl = this.configuration.globalConfig.loginScreenUrl;
        try {
            return this.authService.isLoggedIn().then((/**
             * @param {?} isLoggedIn
             * @return {?}
             */
            isLoggedIn => {
                this.logService.log('User exist or not', isLoggedIn);
                if (isLoggedIn) {
                    this.logService.log('Already logged in user!!!');
                    return true;
                }
                else {
                    this.logService.log_w('Please do login to continue......');
                    this.router.navigate(['/' + loginScreenUrl]); // this route will be based on parameter passed in global config
                    return false;
                }
            }));
        }
        catch (err) {
            this.logService.log_e('Error occured in isLoggedIn method');
            return false;
        }
    }
}
AuthGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthGuard.ctorParameters = () => [
    { type: LogService },
    { type: AuthService },
    { type: Router },
    { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const slideInAnimation = trigger('routeAnimations', [
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
class OnBoardingService {
    /**
     * @param {?} logService
     */
    constructor(logService) {
        this.logService = logService;
    }
    /**
     * \@description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param {?} currentPageTitle title for current active page
     * @param {?} nextPageTitle title for next page
     * @param {?} prevPageTitle title for prev page
     * @return {?}
     */
    nextClickActionHandler(currentPageTitle, nextPageTitle, prevPageTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log('currentPageTitile -->', currentPageTitle);
            this.logService.log('nextPageTitle -->', nextPageTitle);
            this.logService.log('prevPageTitle -->', prevPageTitle);
            yield delay(5000);
            return 'success';
        });
    }
    /**
     * \@description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param {?} currentPageTitle title for current active page
     * @param {?} nextPageTitle title for next page
     * @param {?} prevPageTitle title for prev page
     * @return {?}
     */
    prevClickActionHandler(currentPageTitle, nextPageTitle, prevPageTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log('currentPageTitile -->', currentPageTitle);
            this.logService.log('nextPageTitle -->', nextPageTitle);
            this.logService.log('prevPageTitle -->', prevPageTitle);
            yield delay(5000);
            return 'success';
        });
    }
}
OnBoardingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OnBoardingService.ctorParameters = () => [
    { type: LogService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CommonConstants = {
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
const GatewayCredentialsTypes = {
    ADMIN: 'admin',
    LOCAL: 'local',
    REMOTE: 'remote',
};
/** @type {?} */
const gatewayDeviceControlEndpoint = 'https://fieldtest.smarthome-dev.aws.rehau.com' + '/deviceControl/api/v1';
// gatewayAclService interafece
/** @type {?} */
const gatewayAclEndpoint = 'https://fieldtest.smarthome-dev.aws.rehau.com' + '/acl/api/v1';
/** @enum {string} */
const GatewayAclServiceUserGatewayCredsType = {
    ADMIN: 'admin',
    LOCAL: 'local',
    REMOTE: 'remote',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GatewayAclService {
    /**
     * @param {?} httpClient
     * @param {?} authService
     * @param {?} webService
     * @param {?} logService
     */
    constructor(httpClient, authService, webService, logService) {
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
    cloudGetHomes(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /** @type {?} */
                const gatewayAclUser = yield this.userControllerGET(accessToken);
                /** @type {?} */
                const result = [];
                for (const homeId of Object.keys(gatewayAclUser.homes)) {
                    result.push(gatewayAclUser.homes[homeId]);
                }
                return { homes: result, response: gatewayAclUser };
            }
            catch (e) {
                console.error('gatewayAclServer::cloudGetHomes: Could not fetch Homes ' + JSON.stringify(e));
                return { homes: [], response: null };
            }
        });
    }
    /**
     * @param {?} accessToken
     * @return {?}
     */
    userControllerGET(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    // tslint:disable-next-line:object-literal-key-quotes
                    'access_token': accessToken,
                    'x-correlation-id': yield this.authService.getCorrelationId()
                })
            };
            /** @type {?} */
            const url = gatewayAclEndpoint + '/users/';
            /** @type {?} */
            const retryConfig = {
                REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
                INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
                MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
                MAX_RETRIES: GatewayAclService.MAX_RETRIES,
            };
            /** @type {?} */
            const gwUser = yield this.webService.getApi(url, httpOptions, retryConfig).toPromise();
            this.logService.log(gwUser);
            return gwUser;
        });
    }
    /**
     * @param {?} accessToken
     * @param {?} homeId
     * @param {?} aclUser
     * @return {?}
     */
    getGatewaysToHome(accessToken, homeId, aclUser) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const result = [];
            for (const gatewayId of Object.keys(aclUser.homes[homeId].gateways)) {
                /** @type {?} */
                const gwResult = {
                    credentials: []
                };
                for (const credId of Object.keys(aclUser.homes[homeId].gateways[gatewayId].userCredentials)) {
                    gwResult.homeGwId = gatewayId;
                    console.log('Getting credId: ' + credId);
                    /** @type {?} */
                    const credentials = aclUser.homes[homeId].gateways[gatewayId].userCredentials[credId];
                    console.log('Getting homeId: ' + homeId);
                    console.log(credentials);
                    if (credentials.type === GatewayAclServiceUserGatewayCredsType.ADMIN ||
                        credentials.type === GatewayAclServiceUserGatewayCredsType.LOCAL ||
                        credentials.type === GatewayAclServiceUserGatewayCredsType.REMOTE) {
                        /** @type {?} */
                        const newCreds = {
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
                result.push(gwResult);
            }
            return result;
        });
    }
    /**
     * @param {?} accessToken
     * @param {?} homeID
     * @return {?}
     */
    getHomeOfUser(accessToken, homeID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GatewayACLService::getHomeOfUser: ' + accessToken + ' for HomeID ' + homeID);
            /** @type {?} */
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    access_token: accessToken,
                    'x-correlation-id': yield this.authService.getCorrelationId()
                })
            };
            /** @type {?} */
            const url = gatewayAclEndpoint + '/users/homes/' + homeID;
            /** @type {?} */
            const retryConfig = {
                REQ_TIMEOUT: GatewayAclService.REQ_TIMEOUT,
                INIT_INTERVAL: GatewayAclService.INIT_INTERVAL,
                MAX_INTERVAL: GatewayAclService.MAX_INTERVAL,
                MAX_RETRIES: GatewayAclService.MAX_RETRIES,
            };
            /** @type {?} */
            const home = yield this.webService.getApi(url, httpOptions, retryConfig).toPromise();
            this.logService.log(home);
            return home;
        });
    }
}
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
GatewayAclService.ctorParameters = () => [
    { type: HttpClient },
    { type: AuthService },
    { type: WebService },
    { type: LogService }
];
/** @nocollapse */ GatewayAclService.ngInjectableDef = defineInjectable({ factory: function GatewayAclService_Factory() { return new GatewayAclService(inject(HttpClient), inject(AuthService), inject(WebService), inject(LogService)); }, token: GatewayAclService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GatewayAlreadyConfiguredError extends Error {
    /**
     * @param {?} m
     */
    constructor(m) {
        super(m);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, GatewayAlreadyConfiguredError.prototype);
    }
}
class GatewaySerialNotFoundError extends Error {
    /**
     * @param {?} m
     */
    constructor(m) {
        super(m);
        this.name = 'GatewaySerialNotFoundError';
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, GatewayAlreadyConfiguredError.prototype);
    }
}
class GatewayService {
    /**
     * @param {?} http
     * @param {?} gatewayAclService
     * @param {?} authService
     * @param {?} cacheService
     * @param {?} webService
     * @param {?} logService
     */
    constructor(http, gatewayAclService, authService, cacheService, webService, logService) {
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
    callApi(gateway, apiEndpoint, method = 'get', body = null, headers, connectionType, retryLocal = 2, retryRemote = 3, killRequestObject = { continue: true }, localResponseType = 'json') {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const retryConfig = {
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
            /** @type {?} */
            let username;
            /** @type {?} */
            let password;
            /** @type {?} */
            const useCredentials = connectionType === 'local'
                ? GatewayCredentialsTypes.LOCAL
                : GatewayCredentialsTypes.REMOTE;
            // this.logService.log('cred type: ' + useCredentials);
            for (const creds of gateway.credentials) {
                // this.logService.log('iterate creds' + JSON.stringify(creds));
                if (creds.type === useCredentials) {
                    username = creds.user;
                    password = creds.password;
                }
            }
            if (username === undefined || password === undefined) {
                throw new Error('Username or Password undefined');
            }
            if (connectionType === 'remote') {
                this.logService.log('Connection is remote');
                /** @type {?} */
                const requestBody = {
                    boxId: gateway.boxId,
                    username,
                    password,
                    urlEndpoint: apiEndpoint,
                    method,
                    body: undefined
                };
                if (method.toUpperCase() === 'POST' ||
                    method.toUpperCase() === 'PUT' ||
                    method.toUpperCase() === 'PATCH') {
                    requestBody.body = JSON.stringify(body);
                }
                /** @type {?} */
                const user = yield this.authService.getUser();
                /** @type {?} */
                const requestHeader = {
                    access_token: user.access_token
                };
                try {
                    requestHeader['x-correlation-id'] = yield this.authService.getCorrelationId();
                }
                catch (e) {
                    this.logService.log_e(e);
                }
                /** @type {?} */
                const url = gatewayDeviceControlEndpoint + '/gateways/control';
                /** @type {?} */
                const httpOption = {
                    headers: requestHeader
                };
                try {
                    /** @type {?} */
                    const apiResponse = yield this.webService.postApi(url, requestBody, httpOption, retryConfig).toPromise();
                    this.remoteOnline = true;
                    this.completedFirstRun = true;
                    return apiResponse;
                }
                catch (e) {
                    this.logService.log_e('gatewayservice::callApi: Network error remote request' +
                        JSON.stringify(e));
                    this.remoteOnline = false;
                }
            }
            else if (connectionType === 'local' || connectionType === 'admin') {
                this.logService.log('Connection is local');
                /** @type {?} */
                const basicAuthString = 'Basic ' + btoa(username + ':' + password);
                // const user = await this.userService.getUser();
                try {
                    /** @type {?} */
                    const httpOptions = {
                        headers: { Authorization: basicAuthString }
                    };
                    if (method.toUpperCase() !== 'GET' &&
                        method.toUpperCase() !== 'OPTIONS') {
                        // tslint:disable-next-line:no-string-literal
                        httpOptions['body'] = body;
                    }
                    // tslint:disable-next-line:no-string-literal
                    httpOptions['responseType'] = localResponseType;
                    /** @type {?} */
                    const url = 'http://' + gateway.localIp + ':8083/' + apiEndpoint;
                    // Create separate method for request API
                    /** @type {?} */
                    const apiResponse = yield this.webService.requestApi(method, url, httpOptions, retryConfig).toPromise();
                    this.localOnline = true;
                    this.completedFirstRun = true;
                    return apiResponse;
                }
                catch (e) {
                    this.logService.log_e('gatewayservice::callApi: Network error local request' +
                        JSON.stringify(e));
                    this.localOnline = false;
                    if (!connectionType) {
                        return yield this.callApi(gateway, apiEndpoint, method, body, headers, 'remote');
                    }
                    else {
                        throw e;
                    }
                }
            }
            else if (!connectionType) {
                // Do requests in parallel, if no connectionType is specified
                /** @type {?} */
                const curtime = new Date().getTime();
                /** @type {?} */
                const cancelRequestLocal = { continue: true };
                /** @type {?} */
                const cancelRequestRemote = { continue: true };
                /** @type {?} */
                const remotePromise = this.callApi(gateway, apiEndpoint, method, body, headers, 'remote', undefined, undefined, cancelRequestRemote);
                /** @type {?} */
                const localPromise = this.callApi(gateway, apiEndpoint, method, body, headers, 'local', undefined, undefined, cancelRequestLocal);
                try {
                    // wait for first to finish
                    /** @type {?} */
                    const response = yield Promise.race([remotePromise, localPromise]);
                    cancelRequestLocal.continue = false;
                    cancelRequestRemote.continue = false;
                    return response;
                }
                catch (e) {
                    // jumps in this catch, if one of the request fails
                    this.logService.log_e('gatewayservice::callApi: parallel promise failed ' + e);
                    // wait for both to finish
                    // the promise that failed before will fail again here and throw an exception
                    // the other one is still open and could resolve or reject
                    /** @type {?} */
                    let result;
                    try {
                        result = yield remotePromise;
                        this.remoteOnline = true;
                    }
                    catch (e) {
                        this.remoteOnline = false;
                        this.logService.log_e('gatewayservice::callApi: remote request failed with error ' +
                            JSON.stringify(e));
                    }
                    try {
                        result = yield localPromise;
                        this.localOnline = true;
                    }
                    catch (e) {
                        this.localOnline = false;
                        this.logService.log_e('gatewayservice::callApi: Local request failed with error ' +
                            JSON.stringify(e));
                    }
                    if (result === undefined) {
                        throw new Error('gatewayservice::callApi: Both requests failed');
                    }
                    return result;
                }
            }
        });
    }
    /**
     * \@description Calls the ZWaveAPI and get data for all the conected devices
     * @param {?} gateway gateWay Information
     * @param {?=} getMock bollean type
     * @param {?=} doDefaultRetrys retry parameter type boolean
     * @return {?}
     */
    getLeckageDeviceConnectedToGateway(gateway, getMock = false, doDefaultRetrys = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (getMock) {
            //   return [
            //     {
            //       nodeId: 3,
            //       givenName: 'MockDevice'
            //     }
            //   ];
            // }
            /** @type {?} */
            let allDevices;
            if (doDefaultRetrys) {
                allDevices = yield this.callApi(gateway, 'ZWaveAPI/Data', 'get', null, null, null);
            }
            else {
                allDevices = yield this.callApi(gateway, 'ZWaveAPI/Data', 'get', null, null, null, 1, 1);
            }
            /** @type {?} */
            const foundDevices = [];
            this.logService.log('gatewayService::got devices: ' + JSON.stringify(allDevices));
            // tslint:disable-next-line:forin
            for (const nodeId in allDevices.devices) {
                /** @type {?} */
                const device = allDevices.devices[nodeId];
                if (device.data.manufacturerId.value ===
                    CommonConstants.LECKAGE_MANUFACTURER_ID &&
                    device.data.manufacturerProductId.value ===
                        CommonConstants.LECKAGE_MANUFACTURER_PRODUCT_ID &&
                    device.data.manufacturerProductType.value ===
                        CommonConstants.LECKAGE_MANUFACTURER_TYPE) {
                    foundDevices.push({
                        nodeId,
                        givenName: device.data.givenName.value
                    });
                }
            }
            return foundDevices;
        });
    }
    /**
     * \@description not in use
     * @return {?}
     */
    onLogout() {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.localStorageService.removePersistentItem(this.storageName);
        });
    }
    /**
     * \@description method to save the gateway object in local storage for persistence use
     * @param {?} accessToken accesstoken
     * @param {?} gateway object to save
     * @return {?}
     */
    saveGateway(accessToken, gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log(accessToken);
            this.cacheService.setLocalData(this.storageName, JSON.stringify(gateway));
        });
    }
    /**
     * \@description method to fetch gateway object from local storage and return parse gateway object
     * @param {?} accessToken access token
     * @return {?}
     */
    getPairedGateway(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log('in get pair getway service', accessToken);
            /** @type {?} */
            const rawGatewayObject = JSON.stringify(this.cacheService.getLocalData(this.storageName));
            this.logService.log(rawGatewayObject);
            /** @type {?} */
            const gw = JSON.parse(rawGatewayObject);
            return gw;
        });
    }
}
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
GatewayService.ctorParameters = () => [
    { type: HttpClient },
    { type: GatewayAclService },
    { type: AuthService },
    { type: CacheService },
    { type: WebService },
    { type: LogService }
];
/** @nocollapse */ GatewayService.ngInjectableDef = defineInjectable({ factory: function GatewayService_Factory() { return new GatewayService(inject(HttpClient), inject(GatewayAclService), inject(AuthService), inject(CacheService), inject(WebService), inject(LogService)); }, token: GatewayService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GatewayDeviceControlService {
    /**
     * @param {?} authService
     * @param {?} webService
     */
    constructor(authService, webService) {
        this.authService = authService;
        this.webService = webService;
    }
    /**
     * @param {?} gateway
     * @param {?} mac
     * @param {?} accessToken
     * @return {?}
     */
    updateGatewayData(gateway, mac, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    // tslint:disable-next-line:object-literal-key-quotes
                    'access_token': accessToken,
                    'x-correlation-id': yield this.authService.getCorrelationId()
                })
            };
            /** @type {?} */
            const url = gatewayDeviceControlEndpoint + '/gateways/' + mac;
            /** @type {?} */
            const retryConfig = {
                REQ_TIMEOUT: GatewayDeviceControlService.REQ_TIMEOUT,
                INIT_INTERVAL: GatewayDeviceControlService.INIT_INTERVAL,
                MAX_INTERVAL: GatewayDeviceControlService.MAX_INTERVAL,
                MAX_RETRIES: GatewayDeviceControlService.MAX_RETRIES,
            };
            /** @type {?} */
            const apiResponse = yield this.webService.getApi(url, httpOptions, retryConfig).toPromise();
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
        });
    }
}
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
GatewayDeviceControlService.ctorParameters = () => [
    { type: AuthService },
    { type: WebService }
];
/** @nocollapse */ GatewayDeviceControlService.ngInjectableDef = defineInjectable({ factory: function GatewayDeviceControlService_Factory() { return new GatewayDeviceControlService(inject(AuthService), inject(WebService)); }, token: GatewayDeviceControlService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const onlineOfflineData = new Subject();
class OnlineOfflineService {
    /**
     * @param {?} authService
     * @param {?} gatewayService
     * @param {?} logService
     */
    constructor(authService, gatewayService, logService) {
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
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log('onlineOffline::initialize');
            clearInterval(this.tickInterval);
            this.tickInterval = setInterval((/**
             * @return {?}
             */
            () => {
                this.tick();
            }), this.refreshTime);
        });
    }
    /**
     * @private
     * @return {?}
     */
    tick() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log('onlineOffline::tick');
            /** @type {?} */
            const localBefore = this.localOnline;
            /** @type {?} */
            const remoteBefore = this.remoteOnline;
            // await this.checkLocalConnection();
            // await this.checkRemoteConnection();
            yield this.checkConnection('local');
            yield this.checkConnection('remote');
            if (localBefore !== this.localOnline ||
                remoteBefore !== this.remoteOnline) {
                this.notify();
            }
        });
    }
    /**
     * @private
     * @return {?}
     */
    notify() {
        this.logService.log('onlineOffline::notify');
        onlineOfflineData.next({ localOnline: this.localOnline, remoteOnline: this.remoteOnline });
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    checkConnection(type) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const gateway = yield this.gatewayService.getPairedGateway(user.access_token);
            try {
                /** @type {?} */
                const response = yield this.gatewayService.callApi(gateway, 'ZAutomation/api/v1/status', 'get', null, null, type);
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
            }
            catch (e) {
                this.logService.log('onlineOffline::local offline catch');
                if (type === 'local') {
                    this.localOnline = false;
                }
                else {
                    this.remoteOnline = false;
                }
            }
        });
    }
}
OnlineOfflineService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
OnlineOfflineService.ctorParameters = () => [
    { type: AuthService },
    { type: GatewayService },
    { type: LogService }
];
/** @nocollapse */ OnlineOfflineService.ngInjectableDef = defineInjectable({ factory: function OnlineOfflineService_Factory() { return new OnlineOfflineService(inject(AuthService), inject(GatewayService), inject(LogService)); }, token: OnlineOfflineService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const FlowUnit = {
    FLOW_L_M: 'L/M',
    FLOW_L_H: 'L/H',
    FLOW_M3_H: 'm3/H',
};
/** @enum {string} */
const AmountUnit = {
    AMOUNT_LITERS: 'l',
    AMOUNT_CUBICMETERS: 'm3',
};
/** @enum {string} */
const TemperatureUnit = {
    TEMPERATURE_C: 'C',
    TEMPERATURE_F: 'F',
};
/** @enum {string} */
const PressureUnit = {
    PRESSURE_BAR: 'Bar',
    PRESSURE_PA: 'Pa',
};
class Settings {
    constructor() {
        this.amountUnit = AmountUnit.AMOUNT_LITERS;
        this.flowUnit = FlowUnit.FLOW_L_H;
        this.pressureUnit = PressureUnit.PRESSURE_BAR;
        this.temperatureUnit = TemperatureUnit.TEMPERATURE_C;
    }
}
class SensorSettingService {
    /**
     * @param {?} cacheService
     */
    constructor(cacheService) {
        this.cacheService = cacheService;
        this.storageName = 'user_settings';
    }
    /**
     * \@description convert the amount parameters to specific value
     * @param {?} unit amount parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    convertAmount(unit, inValue) {
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
    }
    /**
     * \@description convert the flow parameters to specific value
     * @param {?} unit flow parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    convertFlow(unit, inValue) {
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
    }
    /**
     * \@description convert the temperature parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    convertTemp(unit, inValue) {
        if (unit === TemperatureUnit.TEMPERATURE_C) {
            return this.roundValue(inValue);
        }
        else if (unit === TemperatureUnit.TEMPERATURE_F) {
            return this.roundValue((inValue * 9) / 5 + 32);
        }
        else {
            return this.roundValue(inValue);
        }
    }
    /**
     * \@description convert the pressure parameters to specific value
     * @param {?} unit unit of parameter to change
     * @param {?} inValue initial value of unit
     * @return {?}
     */
    convertPressure(unit, inValue) {
        if (unit === PressureUnit.PRESSURE_BAR) {
            return this.roundValue(inValue / 100);
        }
        else if (unit === PressureUnit.PRESSURE_PA) {
            return this.roundValue(inValue);
        }
        else {
            return this.roundValue(inValue / 100);
        }
    }
    /**
     * \@description get settings parameter object from local storage
     * @return {?}
     */
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let gw = new Settings();
            /** @type {?} */
            const rawGatewayObject = this.cacheService.getLocalData(this.storageName);
            if (rawGatewayObject !== null) {
                gw = (rawGatewayObject);
            }
            if (gw == null) {
                console.log('GW was null, create new object');
                gw = new Settings();
            }
            return gw;
        });
    }
    /**
     * \@description set settings parameter object in local storage
     * @param {?} settings object to store
     * @return {?}
     */
    setSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheService.setLocalData(this.storageName, (settings));
        });
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    roundValue(value) {
        return value.toFixed(1);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    roundValueToZeroDigits(value) {
        return value.toFixed(0);
    }
}
SensorSettingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SensorSettingService.ctorParameters = () => [
    { type: CacheService }
];
/** @nocollapse */ SensorSettingService.ngInjectableDef = defineInjectable({ factory: function SensorSettingService_Factory() { return new SensorSettingService(inject(CacheService)); }, token: SensorSettingService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SafeGuardDevice {
    constructor() {
        this.sensorDevices = [];
    }
    /**
     * @return {?}
     */
    getAllConfigParams() {
        return __awaiter(this, void 0, void 0, function* () {
            return 1;
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const sensorUpdateSub = new Subject();
/** @type {?} */
const sensorsDataSub = new Subject();
class ZAutomationService {
    /**
     * @param {?} onlineOfflineService
     * @param {?} authService
     * @param {?} gatewayService
     * @param {?} settingService
     * @param {?} logService
     * @param {?} cacheService
     */
    constructor(onlineOfflineService, authService, gatewayService, settingService, logService, cacheService) {
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
        (data) => {
            this.onlineOfflineUpdate(data.localOnline, data.remoteOnline);
        }));
    }
    /**
     * @return {?}
     */
    get deviceMap() {
        return this._deviceMap;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set deviceMap(value) {
        this._deviceMap = value;
        this.setConfigWrapperToStorage(value);
    }
    /**
     * \@description function to maintain the state of variables localOnline and remoteOnline
     * @param {?} localOnline boolean value true if device connected localy
     * @param {?} remoteOnline boolean value true if device connected remotely
     * @return {?}
     */
    onlineOfflineUpdate(localOnline, remoteOnline) {
        this.logService.log('zAutomationAPI::onlineOfflineUpdate ' + localOnline + ' ' + remoteOnline);
        this.remoteOnline = remoteOnline;
        this.localOnline = localOnline;
    }
    /**
     * \@description this method will initialize onlineOfflineService / and continuosly check for device connectivity status / it will continuosly call tick method which will fetch connected device info
     * @return {?}
     */
    initialize() {
        this.logService.log('initialize method call-- in zAutomation service');
        clearInterval(this.tickInterval);
        this.onlineOfflineService.initialize();
        // this.onlineOfflineInitialize();
        this.tick(true);
        this.logService.log('Tick Runs 1st Time ------------------->');
        this.tickInterval = setInterval((/**
         * @return {?}
         */
        () => __awaiter(this, void 0, void 0, function* () {
            // await this.onlineOfflineInitialize();
            this.tick(false);
        })), this.refreshTime);
    }
    /**
     * \@description if device is connected either localy or remotely then this function will call the polldata function / to get the connected device info
     * @private
     * @param {?} firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     * @return {?}
     */
    tick(firstRun) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log('in tick function zAutomation service');
            // if (this.observer.length > 0) {
            this.logService.log('zAutomationAPI::tick');
            try {
                if (!this.localOnline && !this.remoteOnline) {
                    this.logService.log('zAutomationAPI::no tick, because Offline');
                    return;
                }
                /** @type {?} */
                const user = yield this.authService.getUser();
                /** @type {?} */
                const gw = yield this.gatewayService.getPairedGateway(user.access_token);
                if (gw.leckageDeviceId !== undefined) {
                    if (firstRun) {
                        this.logService.log('zAutomationAPI::firstRunLoad');
                        this._deviceMap = yield this.getConfigWrapperFromStorage();
                        this.notify();
                    }
                    else {
                        // if (firstRun || this.observer.length > 0) {
                        this.logService.log('zAutomationAPI::tick::polldata');
                        this.logService.log('DEBUG firstrun:' + firstRun);
                        yield this.pollData();
                    }
                    // if (this.observer.length === 0) {
                    //   this.logService.log('DEBUG observer length 0');
                    //   // return;
                    // }
                    this.decFailureRate();
                }
                else {
                    this.logService.log('zAutomationAPI::tick: leackage device undefined, skipping network requests');
                }
            }
            catch (e) {
                this.logService.log('zAutomationAPI::tick:Catch: Could not get tick, error: ' +
                    e.message +
                    ';;;;;;;' +
                    e.stack);
                this.incFailureRate();
            }
        });
    }
    /**
     * \@description this function will call fetchpull data to either get whole data or to get data from last update time
     * @private
     * @return {?}
     */
    pollData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.deviceMap &&
                this.deviceMap.updateTime &&
                Object.keys(this.deviceMap.devices).length > 0) {
                this.logService.log('zAutomationAPI::pollData: Polling delta data');
                yield this.fetchPollData('delta'); // passing parameter delta to fetch data from last upodatetime
            }
            else {
                this.logService.log('zAutomationAPI::pollData: Polling complete data');
                yield this.fetchPollData('complete'); // passing parameter complete to get whole object
            }
        });
    }
    /**
     * \@description call device API and get the data either complete or from last update time based on parameter passed
     * @private
     * @param {?} type should be delta if need to fetch data using last update time else complete
     * @return {?}
     */
    fetchPollData(type) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log('in fetchPollData method');
            /** @type {?} */
            let url;
            if (type === 'delta') {
                url = 'ZAutomation/api/v1/devices?since=' + this.deviceMap.updateTime;
                // url = 'ZWaveAPI/Data/' + this.deviceMap.updateTime;
            }
            else {
                url = 'ZAutomation/api/v1/devices';
                // url = 'ZWaveAPI/Data/?call=4';
            }
            /** @type {?} */
            const newWrapper = { updateTime: '', devices: null };
            this.logService.log('zAutomationAPI::pollCompleteData');
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const gateway = yield this.gatewayService.getPairedGateway(user.access_token);
            /** @type {?} */
            const pollObject = yield this.gatewayService.callApi(gateway, url);
            this.logService.log('I am PollObject, I might have all the Device Data', pollObject);
            if (type === 'delta') {
                // tslint:disable-next-line:no-string-literal
                newWrapper.updateTime = pollObject['data']['updateTime'];
                // tslint:disable-next-line:no-string-literal
                newWrapper.devices = yield this.parseDevices(pollObject['data']['devices']);
                if (newWrapper && newWrapper.devices) {
                    // this.logService.log('zAutomationAPI::MergeAndSave: New one');
                    /** @type {?} */
                    let update = false;
                    // tslint:disable-next-line:forin
                    for (const deviceID in newWrapper.devices) {
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
            }
            else {
                // tslint:disable-next-line:no-string-literal
                newWrapper.updateTime = pollObject['data']['updateTime'];
                // tslint:disable-next-line:no-string-literal
                newWrapper.devices = yield this.parseDevices(pollObject['data']['devices']);
                // this.logService.log(newWrapper);
                this.deviceMap = newWrapper;
                this.notify();
            }
        });
    }
    /**
     * \@description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     * @private
     * @param {?} gateway
     * @return {?}
     */
    getDeviceAndInstance(gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            return { device: gateway.leckageDeviceId, instance: 0 };
        });
    }
    /**
     * \@description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     * @private
     * @param {?} pollObject
     * @return {?}
     */
    parseDevices(pollObject) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const data = yield this.gatewayService.getPairedGateway(user.access_token);
            /** @type {?} */
            const deviceIDandInstance = yield this.getDeviceAndInstance(data);
            /** @type {?} */
            const result = {};
            for (const obj of pollObject) {
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
            return result;
        });
    }
    /**
     * \@description getting zautomation_object from the Local storage
     * @private
     * @return {?}
     */
    getConfigWrapperFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const result = (this.cacheService.getLocalData(this.storageName));
            /** @type {?} */
            const object = (result);
            return object;
        });
    }
    /**
     * \@description setting zautomation_object from the Local storage
     * @private
     * @param {?} obj Object need to stored in local storage.
     * @return {?}
     */
    setConfigWrapperToStorage(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheService.setLocalData(this.storageName, (obj));
        });
    }
    /**
     * \@description this function notify every time when some chanegs are there in sensor values.
     * @private
     * @return {?}
     */
    notify() {
        sensorUpdateSub.next({ flag: true });
    }
    /**
     * \@description this is needed for filtering a specific sensor device from the whole Array
     * @param {?} regex  is regular erpression need to filteraton.
     * @return {?}
     */
    filterDeviceMap(regex) {
        for (const id in this.deviceMap.devices) {
            if (regex.test(id)) {
                return this.deviceMap.devices[id];
            }
        }
    }
    /**
     * \@description this just increase the Failure Counter
     * @private
     * @return {?}
     */
    incFailureRate() {
        if (this.failureRate.getValue() < 3) {
            this.failureRate.next(this.failureRate.getValue() + 1);
        }
    }
    /**
     * \@description It Just Decrease the Failure Counter.
     * @private
     * @return {?}
     */
    decFailureRate() {
        if (this.failureRate.getValue() > 0) {
            this.failureRate.next(this.failureRate.getValue() - 1);
        }
    }
    /**
     * \@description it needed for getting the updated value for a perticular Sensor.
     * @param {?} sensorNo using this we know which sensors updated information needed.
     * @return {?}
     */
    updateSensorValue(sensorNo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logService.log('in updateSensorValue-->', sensorNo);
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const gateway = yield this.gatewayService.getPairedGateway(user.access_token);
            /** @type {?} */
            const deviceIDandInstance = yield this.getDeviceAndInstance(gateway);
            /** @type {?} */
            const deviceIDandInstanceString = 'ZWayVDev_zway_' +
                deviceIDandInstance.device +
                '-' +
                deviceIDandInstance.instance;
            /** @type {?} */
            let sensorPath = '';
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
            yield this.gatewayService.callApi(gateway, 'ZAutomation/api/v1/devices/' + sensorPath + '/command/update');
        });
    }
    /**
     * \@description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param {?} sensorsValue need the initaial sensor values.
     * @return {?}
     */
    getSensorValue(sensorsValue) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const sensors = sensorsValue;
            this.logService.log('in update method-- device metrics');
            /** @type {?} */
            const user = yield this.authService.getUser();
            /** @type {?} */
            const gateway = yield this.gatewayService.getPairedGateway(user.access_token);
            if (this.deviceMap && this.deviceMap.updateTime) {
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
                    () => {
                        this.getSensorValue(sensors);
                    }), 5000);
                    return;
                }
                // this.onlineOfflineService.REGUARD_OFFLINE = false;
                try {
                    /** @type {?} */
                    const settings = yield this.settingService.getSettings();
                    // WATERMETER
                    /** @type {?} */
                    const waterMeter = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-50-0$', 'g'));
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
                    /** @type {?} */
                    const waterTemperature = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-23$', 'g'));
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
                    /** @type {?} */
                    const waterFlow = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-56$', 'g'));
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
                    /** @type {?} */
                    const waterPressure = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-49-57$', 'g'));
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
                    /** @type {?} */
                    const dummyDevice = this.filterDeviceMap(new RegExp('DummyDevice_18', 'g'));
                    if (dummyDevice) {
                        this.logService.log('Dummy Device Updated level', dummyDevice.metrics.level);
                        sensors[4].timestamp = dummyDevice.updateTime;
                        sensors[4].value = dummyDevice.metrics.level;
                    }
                    this.logService.log('Hey I am New Sensor Value', sensors);
                    this.cacheService.setLocalData('sensors', (sensors));
                    this.logService.log('sensors-local-storage: ' + JSON.stringify(sensors));
                    /** @type {?} */
                    const now = Math.floor(new Date().getTime() / 1000) - 60 * 2;
                    /** @type {?} */
                    const nowOneMin = Math.floor(new Date().getTime() / 1000) - 20;
                    this.logService.log('before loop sensor--->', sensors);
                    for (let i = 0; i < sensors.length; i++) {
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
                }
                catch (e) {
                    this.logService.log('DeviceMetricsComponent::Update: Error fetching deviceMetrics! ' + e);
                }
                // }
                if (this.freezeButtonUntil <= new Date().getTime()) {
                    /** @type {?} */
                    const guardChecked = this.filterDeviceMap(new RegExp(gateway.leckageDeviceId + '-[0-9]*-37$', 'g'));
                    this.safeGuardChecked.flag = guardChecked.metrics.level === 'on';
                    this.cacheService.setLocalData('safeGuardChecked', (this.safeGuardChecked));
                }
            }
            sensorsDataSub.next({ data: sensors });
        });
    }
}
ZAutomationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ZAutomationService.ctorParameters = () => [
    { type: OnlineOfflineService },
    { type: AuthService },
    { type: GatewayService },
    { type: SensorSettingService },
    { type: LogService },
    { type: CacheService }
];
/** @nocollapse */ ZAutomationService.ngInjectableDef = defineInjectable({ factory: function ZAutomationService_Factory() { return new ZAutomationService(inject(OnlineOfflineService), inject(AuthService), inject(GatewayService), inject(SensorSettingService), inject(LogService), inject(CacheService)); }, token: ZAutomationService, providedIn: "root" });

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