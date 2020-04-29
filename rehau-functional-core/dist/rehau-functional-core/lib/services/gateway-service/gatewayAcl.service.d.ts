import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { WebService } from '../web-service/web.service';
import { LogService } from '../logger-service/logger.service';
import { Gateway, GatewayAclServiceUserHome, GatewayAclServiceUser } from '../../models/getway.model';
export declare class GatewayAclService {
    private httpClient;
    private authService;
    private webService;
    private logService;
    private static INIT_INTERVAL;
    private static MAX_INTERVAL;
    private static MAX_RETRIES;
    private static REQ_TIMEOUT;
    private storageName;
    constructor(httpClient: HttpClient, authService: AuthService, webService: WebService, logService: LogService);
    cloudGetHomes(accessToken: string): Promise<{
        homes: GatewayAclServiceUserHome[];
        response: GatewayAclServiceUser;
    }>;
    userControllerGET(accessToken: string): Promise<GatewayAclServiceUser>;
    getGatewaysToHome(accessToken: string, homeId: string, aclUser: GatewayAclServiceUser): Promise<Gateway[]>;
    getHomeOfUser(accessToken: string, homeID: string): Promise<GatewayAclServiceUserHome>;
}
