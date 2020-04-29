import { AppConfig } from '../../models/app-config.model';
import { LogService } from '../logger-service/logger.service';
export declare class EnvData {
    env: any;
}
export declare class BU {
    name: string;
    pass: string;
}
/**
 * @description Service for configuring global properties
 */
export declare class ConfigService {
    configuration: AppConfig;
    private logService;
    protected conFig: any;
    enviRonment: EnvData;
    protected actions: string[];
    constructor(configuration: AppConfig, logService: LogService);
    initConfig(): void;
}
