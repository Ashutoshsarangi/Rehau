import { EventEmitter } from '@angular/core';
import { DefaultLangChangeEvent, LangChangeEvent, TranslateLoader, TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LogService } from '../logger-service/logger.service';
export declare class TranslationService {
    private translateService;
    configuration: any;
    private logService;
    constructor(translateService: TranslateService, configuration: any, logService: LogService);
    initTranslation(): void;
    private splitLanguages;
    currentLang(): string;
    currentLoader(): TranslateLoader;
    onLangChange(): EventEmitter<LangChangeEvent>;
    onTranslationChange(): EventEmitter<TranslationChangeEvent>;
    onDefaultLangChange(): EventEmitter<DefaultLangChangeEvent>;
    /**
     * @description Sets the default language to use as a fallback
     * @param lang language parameter needed
     */
    setDefaultLang(lang: string): void;
    /**
     * @description Gets the default language
     */
    getDefaultLang(): string;
    /**
     * @description Changes the lang currently used
     * @param lang language parameter needed
     */
    use(lang: string): Observable<any>;
    /**
     * @description Gets an object of translations for a given language with the current loader
     * @param lang language parameter needed
     */
    getTranslation(lang: string): Observable<any>;
    /**
     * @description Add new langs to the list
     * @param langs language parameter needed
     */
    addLangs(langs: Array<string>): void;
    /**
     * @description Returns an array of currently available langs
     */
    getLangs(): Array<string>;
    /**
     * @description Calls resetLang and retrieves the translations object for the current loader
     * @param lang language parameter needed
     */
    reloadLang(lang: string): Observable<string | object>;
    /**
     * @description Removes the current translations for this lang.
     * @description You will have to call use, reloadLang or getTranslation again to be able to get translations
     * @param lang language parameter needed
     */
    resetLang(lang: string): void;
    /**
     * @description Returns the current browser lang if available, or undefined otherwise
     */
    getBrowserLang(): string | undefined;
    /**
     * @description Returns the current browser culture language name (e.g. 'de-DE' if available, or undefined otherwise
     */
    getBrowserCultureLang(): string | undefined;
    /**
     * @description Gets the translated value of a key (or an array of keys) or the key if the value was not found
     * @param key key of the json value
     * @param interpolateParams Object Optional
     */
    get(key: string | Array<string>, interpolateParams?: object): Observable<string | object>;
    /**
     * @description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous.
     * @description You are responsible for knowing when your translations have been loaded and it is safe to use this method.
     * @description If you are not sure then you should use the get method instead
     * @param key Key for the service
     */
    instant(key: string): Observable<any>;
    /**
     * @description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
     * default file loader is asynchronous.
     * @description You are responsible for knowing when your translations have been loaded and it is safe to use this method.
     * @description If you are not sure then you should use the get method instead
     * @param key Key for the service
     */
    instantObject(item: object): Observable<any>;
    /**
     * @description Gets the instant value of each key in the object
     * @param object which need to be translated
     */
    mainInstant(item: object): object;
}
