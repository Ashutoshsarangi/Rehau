/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const CommonConstants = {
    SRV: 'https://private-eb271b-zwaytest.apiary-mock.com/v1/',
    AUTHENTICATION_URL: 'https://find.z-wave.me/zboxweb',
    PROXY_CONTROL_URL: 'https://find.z-wave.me/ZAutomation/api/v1/',
    // GATEWAY_CONTROL_ENDPOINT: 'https://fd2xt8lnsa.execute-api.eu-west-1.amazonaws.com/dev/api/v1/gateways/control',
    //    GATEWAY_CONTROL_ENDPOINT: 'https://postb.in/uPTXSyId/',
    LECKAGE_PROTECTION_ID: 123,
    WATER_SENSOR_ID: 456,
    LECKAGE_MANUFACTURER_ID: 1043,
    LECKAGE_MANUFACTURER_PRODUCT_ID: 1,
    LECKAGE_MANUFACTURER_TYPE: 1
};
/** @enum {string} */
const GatewayCredentialsTypes = {
    ADMIN: 'admin',
    LOCAL: 'local',
    REMOTE: 'remote',
};
export { GatewayCredentialsTypes };
/**
 * @record
 */
export function GatewayCredentials() { }
if (false) {
    /** @type {?} */
    GatewayCredentials.prototype.user;
    /** @type {?} */
    GatewayCredentials.prototype.password;
    /** @type {?} */
    GatewayCredentials.prototype.type;
}
/** @enum {string} */
const SupportedDeviceTypes = {
    leckageDetector: 'LeckageDetector',
    floodSensorRehau: 'FloodSensorRehau',
    floodSensorOther: 'FloodSensorOther',
};
export { SupportedDeviceTypes };
/**
 * @record
 */
export function PairedDevicesData() { }
if (false) {
    /** @type {?} */
    PairedDevicesData.prototype.vendorId;
    /** @type {?} */
    PairedDevicesData.prototype.productId;
    /** @type {?} */
    PairedDevicesData.prototype.productType;
    /** @type {?} */
    PairedDevicesData.prototype.serialnumber;
    /** @type {?} */
    PairedDevicesData.prototype.nodeId;
    /** @type {?} */
    PairedDevicesData.prototype.deviceName;
    /** @type {?} */
    PairedDevicesData.prototype.type;
    /** @type {?} */
    PairedDevicesData.prototype.creationTime;
    /** @type {?} */
    PairedDevicesData.prototype.virtualDevices;
}
/**
 * @record
 */
export function Gateway() { }
if (false) {
    /** @type {?|undefined} */
    Gateway.prototype.id;
    /** @type {?|undefined} */
    Gateway.prototype.boxId;
    /** @type {?|undefined} */
    Gateway.prototype.localIp;
    /** @type {?|undefined} */
    Gateway.prototype.credentials;
    /** @type {?|undefined} */
    Gateway.prototype.password;
    /** @type {?|undefined} */
    Gateway.prototype.homeId;
    /** @type {?|undefined} */
    Gateway.prototype.homeGwId;
    /** @type {?|undefined} */
    Gateway.prototype.pairedDevices;
    /** @type {?|undefined} */
    Gateway.prototype.leckageDeviceId;
    /** @type {?|undefined} */
    Gateway.prototype.waterSensorDeviceId;
    /** @type {?|undefined} */
    Gateway.prototype.claimed;
    /** @type {?|undefined} */
    Gateway.prototype.remoteAccessActivated;
}
/**
 * @record
 */
export function ILogoutInterface() { }
if (false) {
    /** @type {?} */
    ILogoutInterface.prototype.observerId;
    /**
     * @return {?}
     */
    ILogoutInterface.prototype.onLogout = function () { };
}
/** @type {?} */
export const gatewayDeviceControlEndpoint = 'https://fieldtest.smarthome-dev.aws.rehau.com' + '/deviceControl/api/v1';
// gatewayAclService interafece
/** @type {?} */
export const gatewayAclEndpoint = 'https://fieldtest.smarthome-dev.aws.rehau.com' + '/acl/api/v1';
/** @enum {string} */
const GatewayAclServiceUserGatewayCredsType = {
    ADMIN: 'admin',
    LOCAL: 'local',
    REMOTE: 'remote',
};
export { GatewayAclServiceUserGatewayCredsType };
/**
 * @record
 */
export function GatewayAclServiceUserHomeGatewaysCredentials() { }
if (false) {
    /** @type {?} */
    GatewayAclServiceUserHomeGatewaysCredentials.prototype.user;
    /** @type {?} */
    GatewayAclServiceUserHomeGatewaysCredentials.prototype.password;
    /** @type {?} */
    GatewayAclServiceUserHomeGatewaysCredentials.prototype.type;
    /** @type {?|undefined} */
    GatewayAclServiceUserHomeGatewaysCredentials.prototype.boxId;
}
/**
 * @record
 */
export function GatewayAclServiceUserHomeGatewaysCredentialsDictionary() { }
/**
 * @record
 */
export function GatewayAclServiceUserHomeGateway() { }
if (false) {
    /** @type {?} */
    GatewayAclServiceUserHomeGateway.prototype.homeGwId;
    /** @type {?|undefined} */
    GatewayAclServiceUserHomeGateway.prototype.gwMac;
    /** @type {?|undefined} */
    GatewayAclServiceUserHomeGateway.prototype.userCredentials;
}
/**
 * @record
 */
export function GatewayAclServiceUserHomeGatewaysDictionary() { }
/**
 * @record
 */
export function GatewayAclServiceUserHome() { }
if (false) {
    /** @type {?} */
    GatewayAclServiceUserHome.prototype.homeId;
    /** @type {?|undefined} */
    GatewayAclServiceUserHome.prototype.id;
    /** @type {?|undefined} */
    GatewayAclServiceUserHome.prototype.masterUser;
    /** @type {?} */
    GatewayAclServiceUserHome.prototype.gateways;
}
/**
 * @record
 */
export function GatewayAclServiceHomeDictionary() { }
/**
 * @record
 */
export function GatewayAclServiceUser() { }
if (false) {
    /** @type {?} */
    GatewayAclServiceUser.prototype.id;
    /** @type {?} */
    GatewayAclServiceUser.prototype.ssoId;
    /** @type {?} */
    GatewayAclServiceUser.prototype.homes;
    /** @type {?} */
    GatewayAclServiceUser.prototype.type;
}
/**
 * @record
 */
export function IGatewayReducedReturn() { }
if (false) {
    /** @type {?} */
    IGatewayReducedReturn.prototype.id;
    /** @type {?} */
    IGatewayReducedReturn.prototype.boxId;
    /** @type {?} */
    IGatewayReducedReturn.prototype.localIp;
    /** @type {?} */
    IGatewayReducedReturn.prototype.pairedDevices;
    /** @type {?} */
    IGatewayReducedReturn.prototype.remoteAccessActivated;
    /** @type {?} */
    IGatewayReducedReturn.prototype.homeGwId;
    /** @type {?} */
    IGatewayReducedReturn.prototype.homeId;
    /** @type {?} */
    IGatewayReducedReturn.prototype.type;
}
/** @enum {string} */
const ISupportedDeviceTypes = {
    leckageDetector: 'LeckageDetector',
    floodSensorRehau: 'FloodSensorRehau',
    floodSensorOther: 'FloodSensorOther',
    otherDevice: 'otherDevice',
};
export { ISupportedDeviceTypes };
/**
 * @record
 */
export function IVirtualDevice() { }
if (false) {
    /** @type {?} */
    IVirtualDevice.prototype.vDevId;
    /** @type {?} */
    IVirtualDevice.prototype.deviceType;
}
/**
 * @record
 */
export function IPairedDevicesData() { }
if (false) {
    /** @type {?} */
    IPairedDevicesData.prototype.vendorId;
    /** @type {?} */
    IPairedDevicesData.prototype.productId;
    /** @type {?} */
    IPairedDevicesData.prototype.productType;
    /** @type {?} */
    IPairedDevicesData.prototype.serialnumber;
    /** @type {?} */
    IPairedDevicesData.prototype.nodeId;
    /** @type {?} */
    IPairedDevicesData.prototype.deviceName;
    /** @type {?} */
    IPairedDevicesData.prototype.type;
    /** @type {?} */
    IPairedDevicesData.prototype.creationTime;
    /** @type {?} */
    IPairedDevicesData.prototype.virtualDevices;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0d2F5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9nZXR3YXkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNLE9BQU8sZUFBZSxHQUFHO0lBQzdCLEdBQUcsRUFBRSxxREFBcUQ7SUFDMUQsa0JBQWtCLEVBQUUsZ0NBQWdDO0lBQ3BELGlCQUFpQixFQUFFLDRDQUE0Qzs7O0lBRy9ELHFCQUFxQixFQUFFLEdBQUc7SUFDMUIsZUFBZSxFQUFFLEdBQUc7SUFDcEIsdUJBQXVCLEVBQUUsSUFBSTtJQUM3QiwrQkFBK0IsRUFBRSxDQUFDO0lBQ2xDLHlCQUF5QixFQUFFLENBQUM7Q0FDN0I7OztJQUdDLE9BQVEsT0FBTztJQUNmLE9BQVEsT0FBTztJQUNmLFFBQVMsUUFBUTs7Ozs7O0FBR25CLHdDQUlDOzs7SUFIQyxrQ0FBYTs7SUFDYixzQ0FBaUI7O0lBQ2pCLGtDQUE4Qjs7OztJQUk5QixpQkFBa0IsaUJBQWlCO0lBQ25DLGtCQUFtQixrQkFBa0I7SUFDckMsa0JBQW1CLGtCQUFrQjs7Ozs7O0FBR3ZDLHVDQVVDOzs7SUFUQyxxQ0FBaUI7O0lBQ2pCLHNDQUFrQjs7SUFDbEIsd0NBQW9COztJQUNwQix5Q0FBcUI7O0lBQ3JCLG1DQUFlOztJQUNmLHVDQUFtQjs7SUFDbkIsaUNBQTJCOztJQUMzQix5Q0FBbUI7O0lBQ25CLDJDQUFpQzs7Ozs7QUFHbkMsNkJBYUM7OztJQVpDLHFCQUFZOztJQUNaLHdCQUFlOztJQUNmLDBCQUFpQjs7SUFDakIsOEJBQW1DOztJQUNuQywyQkFBa0I7O0lBQ2xCLHlCQUFnQjs7SUFDaEIsMkJBQWtCOztJQUNsQixnQ0FBb0M7O0lBQ3BDLGtDQUF5Qjs7SUFDekIsc0NBQTZCOztJQUM3QiwwQkFBa0I7O0lBQ2xCLHdDQUFnQzs7Ozs7QUFHbEMsc0NBR0M7OztJQUZDLHNDQUFtQjs7OztJQUNuQixzREFBeUI7OztBQUczQixNQUFNLE9BQU8sNEJBQTRCLEdBQUcsK0NBQStDLEdBQUcsdUJBQXVCOzs7QUFLckgsTUFBTSxPQUFPLGtCQUFrQixHQUFHLCtDQUErQyxHQUFHLGFBQWE7OztJQUcvRixPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87SUFDZixRQUFTLFFBQVE7Ozs7OztBQUluQixrRUFLQzs7O0lBSkMsNERBQWE7O0lBQ2IsZ0VBQWlCOztJQUNqQiw0REFBNEM7O0lBQzVDLDZEQUFlOzs7OztBQUdqQiw0RUFFQzs7OztBQUVELHNEQUlDOzs7SUFIQyxvREFBaUI7O0lBQ2pCLGlEQUFlOztJQUNmLDJEQUF5RTs7Ozs7QUFHM0UsaUVBRUM7Ozs7QUFFRCwrQ0FLQzs7O0lBSkMsMkNBQWU7O0lBQ2YsdUNBQVk7O0lBQ1osK0NBQW9COztJQUNwQiw2Q0FBc0Q7Ozs7O0FBR3hELHFEQUVDOzs7O0FBRUQsMkNBS0M7OztJQUpDLG1DQUFXOztJQUNYLHNDQUFjOztJQUNkLHNDQUF1Qzs7SUFDdkMscUNBQWE7Ozs7O0FBTWYsMkNBU0M7OztJQVJDLG1DQUFXOztJQUNYLHNDQUFjOztJQUNkLHdDQUFnQjs7SUFDaEIsOENBQW9DOztJQUNwQyxzREFBK0I7O0lBQy9CLHlDQUFpQjs7SUFDakIsdUNBQWU7O0lBQ2YscUNBQWE7Ozs7SUFJYixpQkFBa0IsaUJBQWlCO0lBQ25DLGtCQUFtQixrQkFBa0I7SUFDckMsa0JBQW1CLGtCQUFrQjtJQUNyQyxhQUFjLGFBQWE7Ozs7OztBQUc3QixvQ0FHQzs7O0lBRkMsZ0NBQWU7O0lBQ2Ysb0NBQW1COzs7OztBQUdyQix3Q0FVQzs7O0lBVEMsc0NBQWlCOztJQUNqQix1Q0FBa0I7O0lBQ2xCLHlDQUFvQjs7SUFDcEIsMENBQXFCOztJQUNyQixvQ0FBZTs7SUFDZix3Q0FBbUI7O0lBQ25CLGtDQUE0Qjs7SUFDNUIsMENBQW1COztJQUNuQiw0Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQ29tbW9uQ29uc3RhbnRzID0ge1xuICBTUlY6ICdodHRwczovL3ByaXZhdGUtZWIyNzFiLXp3YXl0ZXN0LmFwaWFyeS1tb2NrLmNvbS92MS8nLFxuICBBVVRIRU5USUNBVElPTl9VUkw6ICdodHRwczovL2ZpbmQuei13YXZlLm1lL3pib3h3ZWInLFxuICBQUk9YWV9DT05UUk9MX1VSTDogJ2h0dHBzOi8vZmluZC56LXdhdmUubWUvWkF1dG9tYXRpb24vYXBpL3YxLycsXG4gIC8vIEdBVEVXQVlfQ09OVFJPTF9FTkRQT0lOVDogJ2h0dHBzOi8vZmQyeHQ4bG5zYS5leGVjdXRlLWFwaS5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS9kZXYvYXBpL3YxL2dhdGV3YXlzL2NvbnRyb2wnLFxuICAvLyAgICBHQVRFV0FZX0NPTlRST0xfRU5EUE9JTlQ6ICdodHRwczovL3Bvc3RiLmluL3VQVFhTeUlkLycsXG4gIExFQ0tBR0VfUFJPVEVDVElPTl9JRDogMTIzLFxuICBXQVRFUl9TRU5TT1JfSUQ6IDQ1NixcbiAgTEVDS0FHRV9NQU5VRkFDVFVSRVJfSUQ6IDEwNDMsXG4gIExFQ0tBR0VfTUFOVUZBQ1RVUkVSX1BST0RVQ1RfSUQ6IDEsXG4gIExFQ0tBR0VfTUFOVUZBQ1RVUkVSX1RZUEU6IDFcbn07XG5cbmV4cG9ydCBlbnVtIEdhdGV3YXlDcmVkZW50aWFsc1R5cGVzIHtcbiAgQURNSU4gPSAnYWRtaW4nLFxuICBMT0NBTCA9ICdsb2NhbCcsXG4gIFJFTU9URSA9ICdyZW1vdGUnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2F0ZXdheUNyZWRlbnRpYWxzIHtcbiAgdXNlcjogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICB0eXBlOiBHYXRld2F5Q3JlZGVudGlhbHNUeXBlcztcbn1cblxuZXhwb3J0IGVudW0gU3VwcG9ydGVkRGV2aWNlVHlwZXMge1xuICBsZWNrYWdlRGV0ZWN0b3IgPSAnTGVja2FnZURldGVjdG9yJyxcbiAgZmxvb2RTZW5zb3JSZWhhdSA9ICdGbG9vZFNlbnNvclJlaGF1JyxcbiAgZmxvb2RTZW5zb3JPdGhlciA9ICdGbG9vZFNlbnNvck90aGVyJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhaXJlZERldmljZXNEYXRhIHtcbiAgdmVuZG9ySWQ6IHN0cmluZztcbiAgcHJvZHVjdElkOiBzdHJpbmc7XG4gIHByb2R1Y3RUeXBlOiBzdHJpbmc7XG4gIHNlcmlhbG51bWJlcjogc3RyaW5nO1xuICBub2RlSWQ6IHN0cmluZztcbiAgZGV2aWNlTmFtZTogc3RyaW5nO1xuICB0eXBlOiBTdXBwb3J0ZWREZXZpY2VUeXBlcztcbiAgY3JlYXRpb25UaW1lOiBEYXRlO1xuICB2aXJ0dWFsRGV2aWNlczogSVZpcnR1YWxEZXZpY2VbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHYXRld2F5IHtcbiAgaWQ/OiBzdHJpbmc7XG4gIGJveElkPzogc3RyaW5nO1xuICBsb2NhbElwPzogc3RyaW5nO1xuICBjcmVkZW50aWFscz86IEdhdGV3YXlDcmVkZW50aWFsc1tdO1xuICBwYXNzd29yZD86IHN0cmluZztcbiAgaG9tZUlkPzogc3RyaW5nO1xuICBob21lR3dJZD86IHN0cmluZztcbiAgcGFpcmVkRGV2aWNlcz86IFBhaXJlZERldmljZXNEYXRhW107XG4gIGxlY2thZ2VEZXZpY2VJZD86IG51bWJlcjtcbiAgd2F0ZXJTZW5zb3JEZXZpY2VJZD86IG51bWJlcjtcbiAgY2xhaW1lZD86IGJvb2xlYW47XG4gIHJlbW90ZUFjY2Vzc0FjdGl2YXRlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxvZ291dEludGVyZmFjZSB7XG4gIG9ic2VydmVySWQ6IG51bWJlcjtcbiAgb25Mb2dvdXQoKTogUHJvbWlzZTxhbnk+O1xufVxuXG5leHBvcnQgY29uc3QgZ2F0ZXdheURldmljZUNvbnRyb2xFbmRwb2ludCA9ICdodHRwczovL2ZpZWxkdGVzdC5zbWFydGhvbWUtZGV2LmF3cy5yZWhhdS5jb20nICsgJy9kZXZpY2VDb250cm9sL2FwaS92MSc7XG5cblxuLy8gZ2F0ZXdheUFjbFNlcnZpY2UgaW50ZXJhZmVjZVxuXG5leHBvcnQgY29uc3QgZ2F0ZXdheUFjbEVuZHBvaW50ID0gJ2h0dHBzOi8vZmllbGR0ZXN0LnNtYXJ0aG9tZS1kZXYuYXdzLnJlaGF1LmNvbScgKyAnL2FjbC9hcGkvdjEnO1xuXG5leHBvcnQgZW51bSBHYXRld2F5QWNsU2VydmljZVVzZXJHYXRld2F5Q3JlZHNUeXBlIHtcbiAgQURNSU4gPSAnYWRtaW4nLFxuICBMT0NBTCA9ICdsb2NhbCcsXG4gIFJFTU9URSA9ICdyZW1vdGUnXG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBHYXRld2F5QWNsU2VydmljZVVzZXJIb21lR2F0ZXdheXNDcmVkZW50aWFscyB7XG4gIHVzZXI6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbiAgdHlwZTogR2F0ZXdheUFjbFNlcnZpY2VVc2VyR2F0ZXdheUNyZWRzVHlwZTtcbiAgYm94SWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2F0ZXdheUFjbFNlcnZpY2VVc2VySG9tZUdhdGV3YXlzQ3JlZGVudGlhbHNEaWN0aW9uYXJ5IHtcbiAgW3VzZXJuYW1lOiBzdHJpbmddOiBHYXRld2F5QWNsU2VydmljZVVzZXJIb21lR2F0ZXdheXNDcmVkZW50aWFscztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHYXRld2F5QWNsU2VydmljZVVzZXJIb21lR2F0ZXdheSB7XG4gIGhvbWVHd0lkOiBzdHJpbmc7XG4gIGd3TWFjPzogc3RyaW5nO1xuICB1c2VyQ3JlZGVudGlhbHM/OiBHYXRld2F5QWNsU2VydmljZVVzZXJIb21lR2F0ZXdheXNDcmVkZW50aWFsc0RpY3Rpb25hcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2F0ZXdheUFjbFNlcnZpY2VVc2VySG9tZUdhdGV3YXlzRGljdGlvbmFyeSB7XG4gIFtob21lR3dJZDogc3RyaW5nXTogR2F0ZXdheUFjbFNlcnZpY2VVc2VySG9tZUdhdGV3YXk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2F0ZXdheUFjbFNlcnZpY2VVc2VySG9tZSB7XG4gIGhvbWVJZDogc3RyaW5nO1xuICBpZD86IHN0cmluZztcbiAgbWFzdGVyVXNlcj86IHN0cmluZztcbiAgZ2F0ZXdheXM6IEdhdGV3YXlBY2xTZXJ2aWNlVXNlckhvbWVHYXRld2F5c0RpY3Rpb25hcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2F0ZXdheUFjbFNlcnZpY2VIb21lRGljdGlvbmFyeSB7XG4gIFtob21lSWQ6IHN0cmluZ106IEdhdGV3YXlBY2xTZXJ2aWNlVXNlckhvbWU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2F0ZXdheUFjbFNlcnZpY2VVc2VyIHtcbiAgaWQ6IHN0cmluZztcbiAgc3NvSWQ6IHN0cmluZztcbiAgaG9tZXM6IEdhdGV3YXlBY2xTZXJ2aWNlSG9tZURpY3Rpb25hcnk7XG4gIHR5cGU6IHN0cmluZztcbn1cblxuLy8gZ2F0ZXdheURldmljZUNvbnRyb2xTZXJ2aWNlIGludGVyZmFjZVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdhdGV3YXlSZWR1Y2VkUmV0dXJuIHtcbiAgaWQ6IHN0cmluZztcbiAgYm94SWQ6IHN0cmluZztcbiAgbG9jYWxJcDogc3RyaW5nO1xuICBwYWlyZWREZXZpY2VzOiBJUGFpcmVkRGV2aWNlc0RhdGFbXTtcbiAgcmVtb3RlQWNjZXNzQWN0aXZhdGVkOiBib29sZWFuO1xuICBob21lR3dJZDogc3RyaW5nO1xuICBob21lSWQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBJU3VwcG9ydGVkRGV2aWNlVHlwZXMge1xuICBsZWNrYWdlRGV0ZWN0b3IgPSAnTGVja2FnZURldGVjdG9yJyxcbiAgZmxvb2RTZW5zb3JSZWhhdSA9ICdGbG9vZFNlbnNvclJlaGF1JyxcbiAgZmxvb2RTZW5zb3JPdGhlciA9ICdGbG9vZFNlbnNvck90aGVyJyxcbiAgb3RoZXJEZXZpY2UgPSAnb3RoZXJEZXZpY2UnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZpcnR1YWxEZXZpY2Uge1xuICB2RGV2SWQ6IHN0cmluZztcbiAgZGV2aWNlVHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQYWlyZWREZXZpY2VzRGF0YSB7XG4gIHZlbmRvcklkOiBzdHJpbmc7XG4gIHByb2R1Y3RJZDogc3RyaW5nO1xuICBwcm9kdWN0VHlwZTogc3RyaW5nO1xuICBzZXJpYWxudW1iZXI6IHN0cmluZztcbiAgbm9kZUlkOiBzdHJpbmc7XG4gIGRldmljZU5hbWU6IHN0cmluZztcbiAgdHlwZTogSVN1cHBvcnRlZERldmljZVR5cGVzO1xuICBjcmVhdGlvblRpbWU6IERhdGU7XG4gIHZpcnR1YWxEZXZpY2VzOiBJVmlydHVhbERldmljZVtdO1xufVxuXG5cbiJdfQ==