import { AuthService } from '../auth-service/auth.service';
import { WebService } from '../web-service/web.service';
import { Gateway } from '../../models/getway.model';
export declare class GatewayDeviceControlService {
    private authService;
    private webService;
    private static INIT_INTERVAL;
    private static MAX_INTERVAL;
    private static MAX_RETRIES;
    private static REQ_TIMEOUT;
    constructor(authService: AuthService, webService: WebService);
    updateGatewayData(gateway: Gateway, mac: string, accessToken: string): Promise<void>;
}
