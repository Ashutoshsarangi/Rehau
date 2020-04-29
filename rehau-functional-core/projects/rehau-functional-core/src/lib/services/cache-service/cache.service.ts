// IONIC - ANGULAR
import { Inject, Injectable } from '@angular/core';
import SimpleCrypto from 'simple-crypto-js';


@Injectable()
export class CacheService {
  constructor( @Inject('SERVICE_CONFIG') public configuration: any ) {
  }
  simpleCrypto = new SimpleCrypto(this.configuration.globalConfig.SECRET_KEY);

  /**
   * @description This Method is required for Removing particular data from local storage.
   * @param key  is required for the removing particular data
   */
  removeLocalData(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * @description This Method is required for getting Local storage Data.
   * @param Key This is required for the geting particular data with crypted formated.
   */
  getLocalData(key: string) {
    // Set the second paramter to true, then it will return object instead of string
    if (localStorage.getItem(key)) {
      return this.simpleCrypto.decrypt(localStorage.getItem(key), true);
    } else {
      return false;
    }
  }

  /**
   * @description This Method is for setting Key, Value pair in the Local storage.
   * @param key is used for the storeing data.
   * @param value is the Actual value which need to be encrypted befor store.
   */
  setLocalData(key: string, value: any) {
    const encrypted = this.simpleCrypto.encrypt(value);
    localStorage.setItem(key, encrypted);
  }
}
