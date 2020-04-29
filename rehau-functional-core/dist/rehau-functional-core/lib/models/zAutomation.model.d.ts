export interface Sensor {
    title: string;
    subTitle: string;
    value: string;
    timestamp?: number;
}
export declare enum SupportedDeviceTypes {
    leckageDetector = "LeckageDetector",
    floodSensorRehau = "FloodSensorRehau",
    floodSensorOther = "FloodSensorOther"
}
export interface VirtualDevice {
    creationTime: number;
    creatorId: number;
    customIcons: any;
    deviceType: string;
    h: number;
    hasHistory: boolean;
    id: string;
    location: number;
    metrics: VirtualDeviceMetrics;
    order: VirtualDeviceOrder;
    permanently_hidden: false;
    probeType: string;
    tags: string[];
    updateTime: number;
    visibility: boolean;
}
export interface VirtualDeviceOrder {
    rooms: number;
    elements: number;
    ashboard: number;
    room: number;
}
export declare class DeviceMetric {
    icon: string;
    title: string;
    isFailed: boolean;
    level: any;
    scaleTitle: any;
}
export declare class DeviceOrder {
    rooms: number;
    elements: number;
    ashboard: number;
    room: number;
}
export declare class DeviceData {
    creationTime: number;
    creatorId: number;
    customIcons: {};
    deviceType: string;
    h: number;
    hasHistory: boolean;
    id: string;
    location: number;
    metrics: DeviceMetric;
    order: DeviceOrder;
    permanently_hidden: false;
    probeType: string;
    tags: string[];
    updateTime: number;
    visibility: boolean;
}
export interface VirtualDeviceMetrics {
    icon: string;
    title: string;
    level: string;
    lastLevel: string;
    modificationTime: string;
    scaleTitle: any;
    isFailed: boolean;
}
export interface DeviceMap {
    updateTime: string;
    devices: {
        [id: string]: VirtualDevice;
    };
}
export declare class SafeGuardDevice {
    mainDevice: DeviceData;
    sensorDevices: DeviceData[];
    getAllConfigParams(): Promise<number>;
}
