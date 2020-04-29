import { Oauth } from 'ionic-cordova-oauth';
import { AuthService } from '../auth-service/auth.service';
import { LogService } from '../logger-service/logger.service';
import { StoreService } from '../store-service/store.service';
import { CacheService } from '../cache-service/cache.service';
import { ConfigService } from '../config-service/config-service';
export declare class LoginService {
    private authService;
    private logService;
    private configService;
    private storeService;
    private cacheService;
    configuration: any;
    constructor(authService: AuthService, logService: LogService, configService: ConfigService, storeService: StoreService, cacheService: CacheService, configuration: any);
    oauth: Oauth;
    cidaasParam: {
        clientId: any;
    };
    cidaasRegisterProvider: any;
    cidaasLoginProvider: any;
    cidaasLoginDesign: any;
    cidaasRegisterDesign: any;
    /**
     * @description This is CIDAAS Authentication main function
     * @param actionType is the string which indicates the type of action whether it is login or register
     * @param platform is used to define the platform to use. Default value is browser
     */
    cidaasAuth(actionType: any, platform?: string): Promise<{
        message: string;
        status: string;
        accessToken: string;
        refreshToken: string;
    }>;
    /**
     * @description This is logout function
     * @description it will remove userData from local storage and store
     */
    cidaasLogout(): Promise<boolean>;
    /**
     * @description This is Login function to call oauth loginVia API
     * @param provider is the CIDAAS provider object
     * @param pkceBody is the ITokenEndpointBody object
     * @param actionType it is identifier for the API action whether it is for login/register
     */
    login(provider: any, pkceBody: any, actionType: any, platform: any): Promise<void>;
}
