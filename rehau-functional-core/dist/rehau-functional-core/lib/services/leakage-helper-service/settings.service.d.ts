import { CacheService } from '../cache-service/cache.service';
export declare enum FlowUnit {
    FLOW_L_M = "L/M",
    FLOW_L_H = "L/H",
    FLOW_M3_H = "m3/H"
}
export declare enum AmountUnit {
    AMOUNT_LITERS = "l",
    AMOUNT_CUBICMETERS = "m3"
}
export declare enum TemperatureUnit {
    TEMPERATURE_C = "C",
    TEMPERATURE_F = "F"
}
export declare enum PressureUnit {
    PRESSURE_BAR = "Bar",
    PRESSURE_PA = "Pa"
}
export declare class Settings {
    amountUnit: AmountUnit;
    flowUnit: FlowUnit;
    pressureUnit: PressureUnit;
    temperatureUnit: TemperatureUnit;
}
export declare class SensorSettingService {
    private cacheService;
    private storageName;
    constructor(cacheService: CacheService);
    /**
     * @description convert the amount parameters to specific value
     * @param unit amount parameter to change
     * @param inValue initial value of unit
     */
    convertAmount(unit: AmountUnit, inValue: number): string;
    /**
     * @description convert the flow parameters to specific value
     * @param unit flow parameter to change
     * @param inValue initial value of unit
     */
    convertFlow(unit: FlowUnit, inValue: number): string;
    /**
     * @description convert the temperature parameters to specific value
     * @param unit unit of parameter to change
     * @param inValue initial value of unit
     */
    convertTemp(unit: TemperatureUnit, inValue: number): string;
    /**
     * @description convert the pressure parameters to specific value
     * @param unit unit of parameter to change
     * @param inValue initial value of unit
     */
    convertPressure(unit: PressureUnit, inValue: number): string;
    /**
     * @description get settings parameter object from local storage
     */
    getSettings(): Promise<Settings>;
    /**
     * @description set settings parameter object in local storage
     * @param settings object to store
     */
    setSettings(settings: Settings): Promise<void>;
    private roundValue;
    private roundValueToZeroDigits;
}
