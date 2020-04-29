import { Injectable } from '@angular/core';
import { CacheService } from '../cache-service/cache.service';

export enum FlowUnit {
  FLOW_L_M = 'L/M',
  FLOW_L_H = 'L/H',
  FLOW_M3_H = 'm3/H'
}

export enum AmountUnit {
  AMOUNT_LITERS = 'l',
  AMOUNT_CUBICMETERS = 'm3'
}

export enum TemperatureUnit {
  TEMPERATURE_C = 'C',
  TEMPERATURE_F = 'F'
}

export enum PressureUnit {
  PRESSURE_BAR = 'Bar',
  PRESSURE_PA = 'Pa'
}

export class Settings {
  amountUnit: AmountUnit = AmountUnit.AMOUNT_LITERS;
  flowUnit: FlowUnit = FlowUnit.FLOW_L_H;
  pressureUnit: PressureUnit = PressureUnit.PRESSURE_BAR;
  temperatureUnit: TemperatureUnit = TemperatureUnit.TEMPERATURE_C;
}

@Injectable({
  providedIn: 'root'
})
export class SensorSettingService {
  private storageName = 'user_settings';

  constructor(private cacheService: CacheService) { }

  /**
   * @description convert the amount parameters to specific value
   * @param unit amount parameter to change
   * @param inValue initial value of unit
   */
  convertAmount(unit: AmountUnit, inValue: number): string {
    console.log('Hy I am Unit', unit);
    if (unit === AmountUnit.AMOUNT_LITERS) {
      return this.roundValueToZeroDigits(inValue * 1000);
    } else if (unit === AmountUnit.AMOUNT_CUBICMETERS) {
      return this.roundValue(inValue);
    } else {
      return this.roundValueToZeroDigits(inValue * 1000);
    }
  }

  /**
   * @description convert the flow parameters to specific value
   * @param unit flow parameter to change
   * @param inValue initial value of unit
   */
  convertFlow(unit: FlowUnit, inValue: number): string {
    if (unit === FlowUnit.FLOW_L_M) {
      return this.roundValue(inValue / 60);
    } else if (unit === FlowUnit.FLOW_L_H) {
      return this.roundValueToZeroDigits(inValue);
    } else if (unit === FlowUnit.FLOW_M3_H) {
      return this.roundValue(inValue / 1000);
    } else {
      return this.roundValue(inValue / 60);
    }
  }

  /**
   * @description convert the temperature parameters to specific value
   * @param unit unit of parameter to change
   * @param inValue initial value of unit
   */
  convertTemp(unit: TemperatureUnit, inValue: number): string {
    if (unit === TemperatureUnit.TEMPERATURE_C) {
      return this.roundValue(inValue);
    } else if (unit === TemperatureUnit.TEMPERATURE_F) {
      return this.roundValue((inValue * 9) / 5 + 32);
    } else {
      return this.roundValue(inValue);
    }
  }

  /**
   * @description convert the pressure parameters to specific value
   * @param unit unit of parameter to change
   * @param inValue initial value of unit
   */
  convertPressure(unit: PressureUnit, inValue: number): string {
    if (unit === PressureUnit.PRESSURE_BAR) {
      return this.roundValue(inValue / 100);
    } else if (unit === PressureUnit.PRESSURE_PA) {
      return this.roundValue(inValue);
    } else {
      return this.roundValue(inValue / 100);
    }
  }

  /**
   * @description get settings parameter object from local storage
   */
  async getSettings(): Promise<Settings> {
    let gw: Settings = new Settings();
    const rawGatewayObject: any = this.cacheService.getLocalData(this.storageName);
    if (rawGatewayObject !== null) {
      gw = (rawGatewayObject);
    }
    if (gw == null) {
      console.log('GW was null, create new object');
      gw = new Settings();
    }
    return gw;
  }

  /**
   * @description set settings parameter object in local storage
   * @param settings object to store
   */
  async setSettings(settings: Settings) {
    this.cacheService.setLocalData(this.storageName, (settings));
  }

  private roundValue(value: number): string {
    return value.toFixed(1);
  }

  private roundValueToZeroDigits(value: number): string {
    return value.toFixed(0);
  }
}
