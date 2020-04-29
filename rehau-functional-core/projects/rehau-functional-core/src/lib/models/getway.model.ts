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

export enum GatewayCredentialsTypes {
  ADMIN = 'admin',
  LOCAL = 'local',
  REMOTE = 'remote'
}

export interface GatewayCredentials {
  user: string;
  password: string;
  type: GatewayCredentialsTypes;
}

export enum SupportedDeviceTypes {
  leckageDetector = 'LeckageDetector',
  floodSensorRehau = 'FloodSensorRehau',
  floodSensorOther = 'FloodSensorOther'
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

export const gatewayDeviceControlEndpoint = 'https://fieldtest.smarthome-dev.aws.rehau.com' + '/deviceControl/api/v1';


// gatewayAclService interafece

export const gatewayAclEndpoint = 'https://fieldtest.smarthome-dev.aws.rehau.com' + '/acl/api/v1';

export enum GatewayAclServiceUserGatewayCredsType {
  ADMIN = 'admin',
  LOCAL = 'local',
  REMOTE = 'remote'
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

// gatewayDeviceControlService interface


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

export enum ISupportedDeviceTypes {
  leckageDetector = 'LeckageDetector',
  floodSensorRehau = 'FloodSensorRehau',
  floodSensorOther = 'FloodSensorOther',
  otherDevice = 'otherDevice'
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


