/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { LogService } from '../logger-service/logger.service';
var EnvData = /** @class */ (function () {
    function EnvData() {
        this.env = 'development';
    }
    return EnvData;
}());
export { EnvData };
if (false) {
    /** @type {?} */
    EnvData.prototype.env;
}
var BU = /** @class */ (function () {
    function BU() {
    }
    return BU;
}());
export { BU };
if (false) {
    /** @type {?} */
    BU.prototype.name;
    /** @type {?} */
    BU.prototype.pass;
}
/** @type {?} */
var SERVICE_NAME = 'ConfigService';
/**
 * \@description Service for configuring global properties
 */
var ConfigService = /** @class */ (function () {
    function ConfigService(configuration, logService) {
        this.configuration = configuration;
        this.logService = logService;
    }
    /**
     * @return {?}
     */
    ConfigService.prototype.initConfig = /**
     * @return {?}
     */
    function () {
        this.conFig = this.configuration;
        this.logService.log('Configuration data loaded1: ', this.conFig);
    };
    ConfigService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['SERVICE_CONFIG',] }] },
        { type: LogService }
    ]; };
    return ConfigService;
}());
export { ConfigService };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    ConfigService.prototype.conFig;
    /** @type {?} */
    ConfigService.prototype.enviRonment;
    /**
     * @type {?}
     * @protected
     */
    ConfigService.prototype.actions;
    /** @type {?} */
    ConfigService.prototype.configuration;
    /**
     * @type {?}
     * @private
     */
    ConfigService.prototype.logService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlnLXNlcnZpY2UvY29uZmlnLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUU5RDtJQUFBO1FBQ1MsUUFBRyxHQUFRLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0lBQUQsY0FBQztBQUFELENBQUMsQUFGRCxJQUVDOzs7O0lBREMsc0JBQWdDOztBQUdsQztJQUFBO0lBR0EsQ0FBQztJQUFELFNBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLGtCQUFvQjs7SUFDcEIsa0JBQW9COzs7SUFHaEIsWUFBWSxHQUFHLGVBQWU7Ozs7QUFLcEM7SUFNRSx1QkFDbUMsYUFBd0IsRUFDakQsVUFBc0I7UUFERyxrQkFBYSxHQUFiLGFBQWEsQ0FBVztRQUNqRCxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzVCLENBQUM7Ozs7SUFFRSxrQ0FBVTs7O0lBQWpCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDOztnQkFkRixVQUFVOzs7O2dEQU9OLE1BQU0sU0FBQyxnQkFBZ0I7Z0JBdkJuQixVQUFVOztJQWdDbkIsb0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWZZLGFBQWE7Ozs7OztJQUN4QiwrQkFBc0I7O0lBQ3RCLG9DQUE0Qjs7Ozs7SUFDNUIsZ0NBQTRCOztJQUcxQixzQ0FBeUQ7Ozs7O0lBQ3pELG1DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2FwcC1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlci1zZXJ2aWNlL2xvZ2dlci5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIEVudkRhdGEge1xuICBwdWJsaWMgZW52OiBhbnkgPSAnZGV2ZWxvcG1lbnQnO1xufVxuXG5leHBvcnQgY2xhc3MgQlUge1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgcGFzczogc3RyaW5nO1xufVxuXG5jb25zdCBTRVJWSUNFX05BTUUgPSAnQ29uZmlnU2VydmljZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFNlcnZpY2UgZm9yIGNvbmZpZ3VyaW5nIGdsb2JhbCBwcm9wZXJ0aWVzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGNvbkZpZzogYW55OyAvLyBDb25maWdJbnRlcmZhY2VcbiAgcHVibGljIGVudmlSb25tZW50OiBFbnZEYXRhO1xuICBwcm90ZWN0ZWQgYWN0aW9uczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnU0VSVklDRV9DT05GSUcnKSBwdWJsaWMgY29uZmlndXJhdGlvbjogQXBwQ29uZmlnLFxuICAgIHByaXZhdGUgbG9nU2VydmljZTogTG9nU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBpbml0Q29uZmlnKCkge1xuICAgIHRoaXMuY29uRmlnID0gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgIHRoaXMubG9nU2VydmljZS5sb2coJ0NvbmZpZ3VyYXRpb24gZGF0YSBsb2FkZWQxOiAnLCB0aGlzLmNvbkZpZyk7XG4gIH1cblxufVxuIl19