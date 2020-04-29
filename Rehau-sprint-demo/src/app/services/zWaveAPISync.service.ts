import { Injectable } from '@angular/core';
import { GatewayService, AuthService, CacheService, OnlineOfflineService } from 'rehau-functional-core/dist/rehau-functional-core';
// import {
//   IOnlineOfflineObserver,
//   OnlineOfflineService
// } from '../onlineOffline.service';

export interface IConfigParamWrapper {
  [commandClass: number]: IConfigParamCommandClass;

  timestamp: string;
}

export interface IConfigParamCommandClass {
  commandClass: number;

  [config: number]: IConfigParams;
}

export interface IConfigParams {
  configID: number;
  value: number;
  timestamp: string;
}

export interface IzWaveAPISyncObserver {
  observerId: number;
  /**
   *
   * @param updatedKeys Contains the keys the object subscribed to, that changed ->
   * if anything changes that matches your key, you will be sent the exact key you subscribed with
   */
  zWaveAPISyncUpdate(updatedKeys?: Array<string>);
}

/**
 * Class to wrap around JSON Objects.
 * This enables to extract and change nodes inside the JSON based on a simple key notation
 * e.g. 'key1.key2.key3' would extract the 'key3' object from the JSON, or change it.
 */
export class JSONObjectModifier {
  private jsonObject: any;
  constructor(jsonObject: object) {
    this.jsonObject = jsonObject;
  }

  public getObject() {
    return this.jsonObject;
  }

  /**
   * Returns the in the parameter secified node of the JSON
   * e.g. getNodeByKey(`devices.2.instances.0`)
   * returns undefined if no element is present with that key
   * @param key String that identifies one object inside of the zWave JSON
   */
  public getNodeByKey(key: string): object {
    // traverses down in the object to extract the requested node
    let lastElement = this.jsonObject;
    const keys = this.splitUpKey(key);
    for (const k of keys) {
      if (lastElement === undefined) {
        return undefined;
      }
      lastElement = lastElement[k];
    }
    return lastElement;
  }

  /**
   * Exchanges the object specified by `key` with the one provided in `obj`
   * @param key specifies the node in which the object needs to be exchanged
   * @param newObj object should be placed the `key` position
   */
  public insertChanges(key: string, newObj: object) {
    const keyArray = this.splitUpKey(key);
    this.changeNestedObject(this.jsonObject, newObj, keyArray);
  }
  /**
   * Recursivly traverses through object following the keys described in the array.
   * If one of the keys in the array does not exist, the structure will be created from there following the keys provided.
   * Note, that the structure will always be created as objects,
   * even if one of the missing keys is a number and could be a index of an array.
   * If the last key in the array is missing, it will be created as well.
   * If the last key is a new element in an array, it will be inserted as such
   * @param obj reference to the object that will be changed
   * @param newObj object that will be inserted at the provided location
   * @param keys Array of keys describing the location of the new object
   * @param index index used for traversing, should not be set externally
   * @returns Return should be ignored, only for recursive operation. Use the reference of the passed object
   */
  private changeNestedObject(
    obj: object,
    newObj: object,
    keys: Array<string>,
    index: number = 0
  ) {
    if (index === keys.length) {
      return newObj;
    }
    // inserts a missing node in the chain
    if (obj === undefined) {
      obj = {};
    }
    obj[keys[index]] = this.changeNestedObject(
      obj[keys[index]],
      newObj,
      keys,
      index + 1
    );

    return obj;
  }

  private splitUpKey(key: string): Array<string> {
    return key.split('.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class ZWaveAPISync {
  observerId = 2380982390183;
  private refreshTime = 2500;
  private tickInterval;
  private remoteOnline = true;
  private localOnline = true;
  private firstRun = true;
  private MAX_OBJECT_AGE_MS = 3000000;
  private lastFullRefresh = 0;
  private storageName = 'zwaveapisync_object';
  private zwaveApiObj: any;
  get zwaveApiObject(): any {
    return this.zwaveApiObj;
  }
  private observers: Array<{
    observer: IzWaveAPISyncObserver;
    filters: Array<string>;
  }> = [];

  // tslint:disable-next-line:adjacent-overload-signatures
  set zwaveApiObject(value: any) {
    this.zwaveApiObj = value;
    this.setzWaveAPIObjectToStorage(value);
  }

  /**
   * Returns the in `filter` secified node of the JSON
   * e.g. `devices.2.instances.0` returns the 0th instance of the 2nd device
   * @param filter String that identifies one object inside of the zWave JSON
   */
  public async getNodeOfZWaveObject(filter: string) {
    const obj = new JSONObjectModifier(this.zwaveApiObj);
    return obj.getNodeByKey(filter);
  }

  /**
   * Value describing at which point the whole JSON will be refreshed
   * 300000 -> 5 Minutes
   */

  constructor(
    private cacheService: CacheService,
    private authService: AuthService,
    private gatewayService: GatewayService,
    private onlineOfflineService: OnlineOfflineService,
    // private logoutService: LogoutService
  ) {}
  // ngOnDestroy(): void {}

  async onLogout(): Promise<any> {
    // this.onlineOfflineService.unsubscribe(this);
    clearTimeout(this.tickInterval);
    // Reseting the init Method
    this.firstRun = true;
  }

  onlineOfflineUpdate(localOnline: boolean, remoteOnline: boolean) {
    console.log(
      'zWaveAPISync::onlineOfflineUpdate ' + localOnline + ' ' + remoteOnline
    );
    this.localOnline = localOnline;
    this.remoteOnline = remoteOnline;
  }

  /**
   * Gets called initially, but also when there were no subscribers for a certain time and the first one subscribes again
   */
  private async initialize() {
    console.log('zWaveAPISync::init first run: ' + this.firstRun);
    if (this.firstRun) {
      // only restart service on first run, which means after initial app start, or after logout and login
      // this.onlineOfflineService.subscribe(this);
      this.onlineOfflineService.initialize();
      try {
        this.lastFullRefresh = await this.getLastRefreshtime();
      } catch (e) {
        console.log('zWaveAPISync::failed to get refreshtime');
        this.lastFullRefresh = 0;
      }
      this.tick(this.firstRun);
      this.firstRun = false;
      clearInterval(this.tickInterval);
      this.tickInterval = setInterval(() => {
        this.tick();
      }, this.refreshTime);
    }
  }

  private async tick(firstRun: boolean = false) {
    console.log('zWaveAPISync::tick');

    try {
      if (!this.localOnline && !this.remoteOnline) {
        console.log('zWaveAPISync::no tick, because Offline');
        return;
      }

      // keep polling always, even if there is no subscriber
      // we always want to have the endpoint synced
      /*if (this.observers.length === 0) {
        console.log('zWaveAPISync::tick::noSubscriber skipping work');
        return;
      }*/
      console.log('zWaveAPISync::tick::polldata');
      await this.pollData(firstRun);
    } catch (e) {
      console.log('zWaveAPISync::tick::Error ticking ' + JSON.stringify(e));
    }
  }

  private async getzWaveAPIObjectFromStorage(): Promise<any> {
    // const result = await this.cacheService.getPersistentItem(
    //   this.storageName
    // );
    const result = await localStorage.getItem(
      this.storageName
    );
    const object = JSON.parse(JSON.parse(result));
    this.zwaveApiObj = object;
    return object;
  }

  private async setzWaveAPIObjectToStorage(obj: any) {
    this.zwaveApiObj = obj;
    // await this.cacheService.setPresistentItem(
    //   this.storageName,
    //   JSON.stringify(obj)
    // );
    await localStorage.setItem(
      this.storageName,
      JSON.stringify(obj)
    );
  }

  private async setLastRefreshtime(time: number) {
    const obj = {
      lastRefreshTime: time
    };
    // await this.cacheService.setPresistentItem(
    //   this.storageName,
    //   JSON.stringify(obj)
    // );
    await localStorage.setItem(
      this.storageName,
      JSON.stringify(obj)
    );
  }

  private async getLastRefreshtime(): Promise<number> {
    // const result = await this.cacheService.getPersistentItem(
    //   this.storageName
    // );
    const result = await localStorage.getItem(
      this.storageName
    );
    const object = JSON.parse(JSON.parse(result));
    return object.lastRefreshTime;
  }

  private async pollData(firstRun: boolean = false) {
    try {
      console.log('zWaveAPISync::pollData');
      const curTime = new Date().getTime();
      const wrapper = await this.getzWaveAPIObjectFromStorage();
      if (!wrapper || curTime - this.lastFullRefresh > this.MAX_OBJECT_AGE_MS) {
        console.log('zWaveAPISync::pollData::pollCompleteData');
        await this.pollCompleteData();
      } else {
        console.log('zWaveAPISync::pollData::pollDelta');
        // CATCH DELTA
        await this.pollDeltaData(wrapper);
      }
      if (firstRun) {
        this.notify();
      }
    } catch (e) {
      console.log(
        'zWaveAPISync::pollData: Error occured fetching Data errormessage:' +
          e.message
      );
      console.log(
        'zWaveAPISync::pollData: Error occured fetching Data errorstack: ' +
          e.stack
      );
    }
  }

  private async pollDeltaData(newDelta: IConfigParamWrapper) {
    console.log('zWaveAPISync::pollDeltaData--');
    const user = await this.authService.getUser();
    const gateway = await this.gatewayService.getPairedGateway(
      user.access_token
    );
    const pollObject = await this.gatewayService.callApi(
      gateway,
      'ZWaveAPI/Data/' + this.zwaveApiObject.updateTime
    );
    if (pollObject.updateTime) {
      const obj = new JSONObjectModifier(this.zwaveApiObject);
      for (const key of Object.keys(pollObject)) {
        obj.insertChanges(key, pollObject[key]);
      }
      this.zwaveApiObject.updateTime = pollObject.updateTime;
      this.zwaveApiObject = obj.getObject();
      this.notify(Object.keys(pollObject));
    }
  }

  async pollCompleteData() {
    console.log('zWaveAPISync::pollCompleteData');
    const user = await this.authService.getUser();
    if (!user) {
      console.log('zWaveAPISync::user is empty aborting');
      return;
    }
    const gateway = await this.gatewayService.getPairedGateway(
      user.access_token
    );
    if (!gateway) {
      console.log('zWaveAPISync::gateway is empty aborting');
      return;
    }

    const pollObject = await this.gatewayService.callApi(
      gateway,
      'ZWaveAPI/Data/?call=4'
    );
    this.lastFullRefresh = new Date().getTime();
    this.setLastRefreshtime(this.lastFullRefresh);
    this.zwaveApiObject = pollObject;
    this.notify();
    console.log(
      // tslint:disable-next-line:no-string-literal
      'zWaveAPISync::updateTimeOfObject:' + this.zwaveApiObject['updateTime']
    );
  }

  private notify(updatedKeys?: Array<string>) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.observers.length; i++) {
      const changedKeysForObserver = [];
      if (
        updatedKeys === undefined ||
        this.observers[i].filters === undefined ||
        this.observers[i].filters.length === 0 ||
        this.observers[i].filters[0] === ''
      ) {
        // notify observer, because whole object changed
        this.observers[i].observer.zWaveAPISyncUpdate(
          this.observers[i].filters
        );
      } else {
        for (const key of updatedKeys) {
          for (const filter of this.observers[i].filters) {
            if (filter.indexOf(key) >= 0) {
              changedKeysForObserver.push(filter);
            }
          }
        }
        if (changedKeysForObserver.length > 0) {
          this.observers[i].observer.zWaveAPISyncUpdate(changedKeysForObserver);
        }
      }
    }
  }

  /**
   *
   * @param observer reference to observer implementing the correct Interface
   * @param filters Observer will be informed if an object changes that is identified by that key of or wildcard
   */
  subscribe(observer: IzWaveAPISyncObserver, filters: Array<string>) {
    console.log('First unsubscribe before subscribing');
    this.unsubscribe(observer);
    console.log('zWaveAPISync::subscribe ' + observer.observerId);
    const idx = this.indexOfObserver(observer);
    if (idx === -1) {
      // tslint:disable-next-line:object-literal-shorthand
      this.observers.push({observer: observer, filters: filters });
      // has to be initialized by first subscriber, to work again after logout/login
      if (this.observers.length === 1) {
        console.log('zWaveAPISync::init because first sub');
        this.initialize();
      }
    } else {
      console.log(
        'zWaveAPISync::subscribe::observer was not removed from array'
      );
    }
  }

  unsubscribe(observer: IzWaveAPISyncObserver) {
    console.log('zWaveAPISync::unsubscribing ' + observer.observerId);
    const idx = this.indexOfObserver(observer);
    if (idx !== -1) {
      this.observers.splice(idx, 1);
    }

    if (this.observers.length === 0) {
      // service should run all the time
      // console.log('clearing timout');
      // clearInterval(this.tickInterval);
      // this.onlineOfflineService.unsubscribe(this);
    }
  }

  private indexOfObserver(observer): number {
    let idx = -1;
    for (const obs of this.observers) {
      if (obs.observer.observerId === observer.observerId) {
        idx = this.observers.indexOf(obs);
      }
    }
    return idx;
  }
}
