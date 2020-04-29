import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfig } from './models/app-config.model';
export declare class RehauFunctionalCoreModule {
    static forRoot(SERVICE_CONFIG: AppConfig): ModuleWithProviders<RouterModule>;
}
