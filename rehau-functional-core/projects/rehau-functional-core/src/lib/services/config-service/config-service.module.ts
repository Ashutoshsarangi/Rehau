import { ConfigService } from './config-service';


export function CONFIG_FACTORY(configService: ConfigService): any {
  return () => configService.initConfig();
}

export class ConfigServiceModule {
}
