import { Inject, Injectable } from '@angular/core';
import { AppConfig } from '../../models/app-config.model';
import { LogService } from '../logger-service/logger.service';

export class EnvData {
  public env: any = 'development';
}

export class BU {
  public name: string;
  public pass: string;
}

const SERVICE_NAME = 'ConfigService';

/**
 * @description Service for configuring global properties
 */
@Injectable()
export class ConfigService {
  protected conFig: any; // ConfigInterface
  public enviRonment: EnvData;
  protected actions: string[];

  constructor(
    @Inject('SERVICE_CONFIG') public configuration: AppConfig,
    private logService: LogService
  ) { }

  public initConfig() {
    this.conFig = this.configuration;
    this.logService.log('Configuration data loaded1: ', this.conFig);
  }

}
