export declare const CommonConstants: {
    SRV: string;
    AUTHENTICATION_URL: string;
    PROXY_CONTROL_URL: string;
    LECKAGE_PROTECTION_ID: number;
    WATER_SENSOR_ID: number;
    LECKAGE_MANUFACTURER_ID: number;
    LECKAGE_MANUFACTURER_PRODUCT_ID: number;
    LECKAGE_MANUFACTURER_TYPE: number;
};
export declare enum GatewayCredentialsTypes {
    ADMIN = "admin",
    LOCAL = "local",
    REMOTE = "remote"
}
export interface GatewayCredentials {
    user: string;
    password: string;
    type: GatewayCredentialsTypes;
}
export declare enum SupportedDeviceTypes {
    leckageDetector = "LeckageDetector",
    floodSensorRehau = "FloodSensorRehau",
    floodSensorOther = "FloodSensorOther"
}
export interface PairedDevicesData {
    vendorId: string;
    productId: string;
    productType: string;
    serialnumber: string;
    nodeId: string;
    deviceName: string;
    type: SupportedDeviceTypes;
    creationTime: Date;
    virtualDevices: IVirtualDevice[];
}
export interface Gateway {
    id?: string;
    boxId?: string;
    localIp?: string;
    credentials?: GatewayCredentials[];
    password?: string;
    homeId?: string;
    homeGwId?: string;
    pairedDevices?: PairedDevicesData[];
    leckageDeviceId?: number;
    waterSensorDeviceId?: number;
    claimed?: boolean;
    remoteAccessActivated?: boolean;
}
export interface ILogoutInterface {
    observerId: number;
    onLogout(): Promise<any>;
}
export declare const gatewayDeviceControlEndpoint: string;
export declare const gatewayAclEndpoint: string;
export declare enum GatewayAclServiceUserGatewayCredsType {
    ADMIN = "admin",
    LOCAL = "local",
    REMOTE = "remote"
}
export interface GatewayAclServiceUserHomeGatewaysCredentials {
    user: string;
    password: string;
    type: GatewayAclServiceUserGatewayCredsType;
    boxId?: string;
}
export interface GatewayAclServiceUserHomeGatewaysCredentialsDictionary {
    [username: string]: GatewayAclServiceUserHomeGatewaysCredentials;
}
export interface GatewayAclServiceUserHomeGateway {
    homeGwId: string;
    gwMac?: string;
    userCredentials?: GatewayAclServiceUserHomeGatewaysCredentialsDictionary;
}
export interface GatewayAclServiceUserHomeGatewaysDictionary {
    [homeGwId: string]: GatewayAclServiceUserHomeGateway;
}
export interface GatewayAclServiceUserHome {
    homeId: string;
    id?: string;
    masterUser?: string;
    gateways: GatewayAclServiceUserHomeGatewaysDictionary;
}
export interface GatewayAclServiceHomeDictionary {
    [homeId: string]: GatewayAclServiceUserHome;
}
export interface GatewayAclServiceUser {
    id: string;
    ssoId: string;
    homes: GatewayAclServiceHomeDictionary;
    type: string;
}
export interface IGatewayReducedReturn {
    id: string;
    boxId: string;
    localIp: string;
    pairedDevices: IPairedDevicesData[];
    remoteAccessActivated: boolean;
    homeGwId: string;
    homeId: string;
    type: string;
}
export declare enum ISupportedDeviceTypes {
    leckageDetector = "LeckageDetector",
    floodSensorRehau = "FloodSensorRehau",
    floodSensorOther = "FloodSensorOther",
    otherDevice = "otherDevice"
}
export interface IVirtualDevice {
    vDevId: string;
    deviceType: string;
}
export interface IPairedDevicesData {
    vendorId: string;
    productId: string;
    productType: string;
    serialnumber: string;
    nodeId: string;
    deviceName: string;
    type: ISupportedDeviceTypes;
    creationTime: Date;
    virtualDevices: IVirtualDevice[];
}
