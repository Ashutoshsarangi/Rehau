import { BehaviorSubject, Subject } from 'rxjs';
import { OnlineOfflineService } from '../onlineOffline-service/onlineOffline.service';
import { AuthService } from '../auth-service/auth.service';
import { GatewayService } from '../gateway-service/gateway.service';
import { CacheService } from '../cache-service/cache.service';
import { SensorSettingService } from '../leakage-helper-service/settings.service';
import { DeviceData, DeviceMap, SafeGuardDevice } from '../../models/zAutomation.model';
import { LogService } from '../logger-service/logger.service';
export declare const sensorUpdateSub: Subject<{}>;
export declare const sensorsDataSub: Subject<{}>;
export declare class ZAutomationService {
    private onlineOfflineService;
    private authService;
    private gatewayService;
    private settingService;
    private logService;
    private cacheService;
    appStartTime: number;
    device: SafeGuardDevice;
    tickInterval: any;
    private storageName;
    private _deviceMap;
    deviceMap: DeviceMap;
    private remoteOnline;
    private localOnline;
    private refreshTime;
    private freezeButtonUntil;
    safeGuardChecked: any;
    failureRate: BehaviorSubject<number>;
    constructor(onlineOfflineService: OnlineOfflineService, authService: AuthService, gatewayService: GatewayService, settingService: SensorSettingService, logService: LogService, cacheService: CacheService);
    /**
     * @description function to maintain the state of variables localOnline and remoteOnline
     * @param localOnline boolean value true if device connected localy
     * @param remoteOnline boolean value true if device connected remotely
     */
    onlineOfflineUpdate(localOnline: boolean, remoteOnline: boolean): void;
    /**
     * @description this method will initialize onlineOfflineService
     * @description and continuosly check for device connectivity status
     * @description it will continuosly call tick method which will fetch connected device info
     */
    initialize(): void;
    /**
     * @description if device is connected either localy or remotely then this function will call the polldata function
     * @description to get the connected device info
     * @param firstRun is to check whether function is hitted very first time as need to
     * fetch zAutomation object from local storage in first run
     */
    private tick;
    /**
     * @description this function will call fetchpull data to either get whole data or to get data from last update time
     */
    private pollData;
    /**
     * @description call device API and get the data either complete or from last update time based on parameter passed
     * @param type should be delta if need to fetch data using last update time else complete
     */
    private fetchPollData;
    /**
     * @description Here We need to Provide the Leakage Device Id and
     *  Its Instance.
     */
    private getDeviceAndInstance;
    /**
     * @description It parse from all the Device Data and return the Array of
     * devices whose node id is matches with gateway.leckageDeviceId.
     */
    private parseDevices;
    /**
     * @description getting zautomation_object from the Local storage
     */
    private getConfigWrapperFromStorage;
    /**
     * @description setting zautomation_object from the Local storage
     * @param obj Object need to stored in local storage.
     */
    private setConfigWrapperToStorage;
    /**
     * @description this function notify every time when some chanegs are there in sensor values.
     */
    private notify;
    /**
     * @description this is needed for filtering a specific sensor device from the whole Array
     * @param regex  is regular erpression need to filteraton.
     */
    filterDeviceMap(regex: RegExp): DeviceData;
    /**
     * @description this just increase the Failure Counter
     */
    private incFailureRate;
    /**
     * @description It Just Decrease the Failure Counter.
     */
    private decFailureRate;
    /**
     * @description it needed for getting the updated value for a perticular Sensor.
     * @param sensorNo using this we know which sensors updated information needed.
     */
    updateSensorValue(sensorNo: number): Promise<void>;
    /**
     * @description this function is needed for the getting the Sensor values
     * and store it in local storage.
     * @param sensorsValue need the initaial sensor values.
     */
    getSensorValue(sensorsValue: any): Promise<void>;
}
