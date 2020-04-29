import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { GatewayService } from '../gateway-service/gateway.service';
import { LogService } from '../logger-service/logger.service';
export declare const onlineOfflineData: Subject<{}>;
export declare class OnlineOfflineService {
    private authService;
    private gatewayService;
    private logService;
    private refreshTime;
    failureRate: BehaviorSubject<number>;
    REGUARD_OFFLINE: boolean;
    private tickInterval;
    private remoteOnline;
    private localOnline;
    constructor(authService: AuthService, gatewayService: GatewayService, logService: LogService);
    initialize(): Promise<void>;
    private tick;
    private notify;
    private checkConnection;
}
