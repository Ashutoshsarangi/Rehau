import { HttpClient } from '@angular/common/http';
import { GatewayAclService } from './gatewayAcl.service';
import { AuthService } from '../auth-service/auth.service';
import { CacheService } from '../cache-service/cache.service';
import { WebService } from '../web-service/web.service';
import { LogService } from '../logger-service/logger.service';
import { Gateway, ILogoutInterface } from '../../models/getway.model';
export declare class GatewayAlreadyConfiguredError extends Error {
    constructor(m: string);
}
export declare class GatewaySerialNotFoundError extends Error {
    constructor(m: string);
}
export declare class GatewayService implements ILogoutInterface {
    private http;
    private gatewayAclService;
    private authService;
    private cacheService;
    private webService;
    private logService;
    private static INIT_INTERVAL_REMOTE;
    private static MAX_INTERVAL_REMOTE;
    private static REQ_TIMEOUT_REMOTE;
    private static INIT_INTERVAL_LOCAL;
    private static MAX_INTERVAL_LOCAL;
    private static REQ_TIMEOUT_LOCAL;
    observerId: number;
    private localOnline;
    private remoteOnline;
    private completedFirstRun;
    private storageName;
    constructor(http: HttpClient, gatewayAclService: GatewayAclService, authService: AuthService, cacheService: CacheService, webService: WebService, logService: LogService);
    /**
     * @description Calls the Gateway API
     * @param gateway gateWay Information
     * @param apiEndpoint This is Api End P{oints}
     * @param method Specific Method To Follow
     * @param body Body If It is a POST Api Call
     * @param headers not used right now
     * @param connectionType explicitly decide, if it should be called locally, or remotely. Default: remote
     */
    callApi(gateway: Gateway, apiEndpoint: string, method?: string, body?: any | null, headers?: {}, connectionType?: 'remote' | 'local' | 'admin', retryLocal?: number, retryRemote?: number, killRequestObject?: {
        continue: boolean;
    }, localResponseType?: string): any;
    /**
     * @description Calls the ZWaveAPI and get data for all the conected devices
     * @param gateway gateWay Information
     * @param getMock bollean type
     * @param doDefaultRetrys retry parameter type boolean
     */
    getLeckageDeviceConnectedToGateway(gateway: Gateway, getMock?: boolean, doDefaultRetrys?: boolean): Promise<any[]>;
    /**
     * @description not in use
     */
    onLogout(): Promise<void>;
    /**
     * @description method to save the gateway object in local storage for persistence use
     * @param accessToken accesstoken
     * @param gateway object to save
     */
    saveGateway(accessToken: string, gateway: Gateway): Promise<void>;
    /**
     * @description method to fetch gateway object from local storage and return parse gateway object
     * @param accessToken access token
     */
    getPairedGateway(accessToken: string): Promise<Gateway>;
}
