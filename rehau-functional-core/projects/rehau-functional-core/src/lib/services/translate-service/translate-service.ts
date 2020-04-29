import { EventEmitter, Inject, Injectable } from '@angular/core';
import {
  DefaultLangChangeEvent,
  LangChangeEvent,
  TranslateLoader,
  TranslateService,
  TranslationChangeEvent
} from '@ngx-translate/core';

import { Observable, Subject, Subscriber } from 'rxjs';
import { LogService } from '../logger-service/logger.service';
import { isBoolean } from 'util';

@Injectable()
export class TranslationService {
  constructor(
    private translateService: TranslateService, @Inject('SERVICE_CONFIG') public configuration: any,
    private logService: LogService) { }

  public initTranslation(): void {
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
    } else {
      this.logService.log('No configuration provided. This service has not default values. Set them before use.');
    }
  }

  private splitLanguages(langs: string): Array<string> {
    let availableLanguages: Array<string> = langs.split('|');
    return (availableLanguages = availableLanguages.filter(x => x.length > 0));
  }

  public currentLang(): string {
    return this.translateService.currentLang;
  }

  public currentLoader(): TranslateLoader {
    return this.translateService.currentLoader;
  }

  public onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  public onTranslationChange(): EventEmitter<TranslationChangeEvent> {
    return this.translateService.onTranslationChange;
  }

  public onDefaultLangChange(): EventEmitter<DefaultLangChangeEvent> {
    return this.translateService.onDefaultLangChange;
  }
  // #endregion

  /**
   * @description Sets the default language to use as a fallback
   * @param lang language parameter needed
   */
  public setDefaultLang(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

  /**
   * @description Gets the default language
   */
  public getDefaultLang(): string {
    return this.translateService.getDefaultLang();
  }

  /**
   * @description Changes the lang currently used
   * @param lang language parameter needed
   */
  public use(lang: string): Observable<any> {
    this.logService.log('The Use Function is called  ---> ', lang);
    return this.translateService.use(lang);
  }

  /**
   * @description Gets an object of translations for a given language with the current loader
   * @param lang language parameter needed
   */
  public getTranslation(lang: string): Observable<any> {
    return this.translateService.getTranslation(lang);
  }

  /**
   * @description Add new langs to the list
   * @param langs language parameter needed
   */
  public addLangs(langs: Array<string>): void {
    this.translateService.addLangs(langs);
  }

  /**
   * @description Returns an array of currently available langs
   */
  public getLangs(): Array<string> {
    return this.translateService.getLangs();
  }
  /**
   * @description Calls resetLang and retrieves the translations object for the current loader
   * @param lang language parameter needed
   */
  public reloadLang(lang: string): Observable<string | object> {
    return this.translateService.reloadLang(lang);
  }

  /**
   * @description Removes the current translations for this lang.
   * @description You will have to call use, reloadLang or getTranslation again to be able to get translations
   * @param lang language parameter needed
   */
  public resetLang(lang: string): void {
    this.translateService.resetLang(lang);
  }

  /**
   * @description Returns the current browser lang if available, or undefined otherwise
   */
  public getBrowserLang(): string | undefined {
    return this.translateService.getBrowserLang();
  }

  /**
   * @description Returns the current browser culture language name (e.g. 'de-DE' if available, or undefined otherwise
   */
  public getBrowserCultureLang(): string | undefined {
    return this.getBrowserCultureLang();
  }

  /**
   * @description Gets the translated value of a key (or an array of keys) or the key if the value was not found
   * @param key key of the json value
   * @param interpolateParams Object Optional
   */
  public get(key: string | Array<string>, interpolateParams?: object): Observable<string | object> {
    return this.translateService.get(key, interpolateParams);
  }
  /**
   * @description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
   * default file loader is asynchronous.
   * @description You are responsible for knowing when your translations have been loaded and it is safe to use this method.
   * @description If you are not sure then you should use the get method instead
   * @param key Key for the service
   */
  public instant(key: string): Observable<any> {
    return new Observable(subscriber => {
      console.log('Hello **********************');
      subscriber.next(this.translateService.instant(key));
    });
  }
  /**
   * @description Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the
   * default file loader is asynchronous.
   * @description You are responsible for knowing when your translations have been loaded and it is safe to use this method.
   * @description If you are not sure then you should use the get method instead
   * @param key Key for the service
   */
  public instantObject(item: object): Observable<any> {
    if (Array.isArray(item)) {
      const temp = [];
      for (const element of item) {
        temp.push(this.mainInstant(element));
      }
      return new Observable(subscriber => {
        console.log('Hello ######################');
        subscriber.next(temp);
      });
    } else {
      return new Observable(subscriber => {
        console.log('Hello $$$$$$$$$$$$$$$$$$$$$$');
        subscriber.next(this.mainInstant(item));
      });
    }
  }

  /**
   * @description Gets the instant value of each key in the object
   * @param object which need to be translated
   */
  public mainInstant(item: object): object {
    const temp = {};
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const keyVal = item[key];
        if (typeof keyVal === 'string' && keyVal.length > 0) {
          const val = this.translateService.instant(keyVal);
          temp[key] = val;
        } else {
          temp[key] = keyVal;
        }
      }
    }
    return temp;
  }
}
