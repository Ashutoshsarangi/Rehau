import SimpleCrypto from 'simple-crypto-js';
export declare class CacheService {
    configuration: any;
    constructor(configuration: any);
    simpleCrypto: SimpleCrypto;
    /**
     * @description This Method is required for Removing particular data from local storage.
     * @param key  is required for the removing particular data
     */
    removeLocalData(key: string): void;
    /**
     * @description This Method is required for getting Local storage Data.
     * @param Key This is required for the geting particular data with crypted formated.
     */
    getLocalData(key: string): string | false | object;
    /**
     * @description This Method is for setting Key, Value pair in the Local storage.
     * @param key is used for the storeing data.
     * @param value is the Actual value which need to be encrypted befor store.
     */
    setLocalData(key: string, value: any): void;
}
