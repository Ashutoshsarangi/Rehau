import { Injectable } from '@angular/core';
import {
  ZAutomationService,
  sensorUpdateSub,
} from 'rehau-functional-core/dist/rehau-functional-core';

@Injectable({
  providedIn: 'root'
})
export class DeviceHelperService {
  constructor(
    private zAutomationService: ZAutomationService,
  ) { }

  public initializeHome(sensorData) {
    console.log('inititialze mthod called');
    this.zAutomationService.initialize();
    sensorUpdateSub.subscribe((data) => {
      console.log('in sensor update suscriber');
      this.zAutomationService.getSensorValue(sensorData);
    });
  }

  public inilializeSetting() {
    // this.zwaveapiService.subscribe(this);
    // this.logoutService.subscribe(this);
    // this.onlineOfflineService.subscribe(this);
    // this.leakageService.subscribe(this);
  }
  public updatePresentMode() {
    console.log('Update Called in settings!');
    if (true
      // this.zwaveapiService.configurationObject == null ||
      // this.zwaveapiService.configurationObject === undefined
    ) {
      console.log('Config Object is Null or undefined');
    } else {
      return this.updateAllSettings();
      //      this.updateAllSettings(this.zwaveapiService.configurationObject);
    }
  }
  public updateAllSettings() {
    // Some Conditions Based on zwaveapiService
    // then
    // return true / false
  }
  /**
   * 
   * @param type string We need to pass  'flow', 'temprature', 'pressure' etc.
   */

  // Unit
  public getUnit(type) {

  }

  public setUnit(setting) {
    // This will call Stting.Services.ts from Functional-core.To Save the Data.
  }

  // Drop Leakage

  public getLekageMeasurementItems() {
    const temp = {
      action: '',
      frequency: '',
      time: ''
    };
    const measurementItems = [];
    // this.measurementItems = [
    //   {
    //     url: 'settings/leakage/time',
    //     text: this.transalteService.instant('Time'),
    //     value: timeString
    //   },
    //   {
    //     url: 'settings/leakage/frequency',
    //     text: this.transalteService.instant('Frequency'),
    //     value: this.checkDayDisplay(this.frequency)
    //   },
    //   {
    //     url: 'settings/leakage/action',
    //     text: this.transalteService.instant('Action'),
    //     value: this.transalteService.instant(this.action)
    //   }
    // ];

    // Some Internal Codeing to get  measurementItems

    return measurementItems;
  }

  public setLeakageMeasurementState() {

  }

  // Need to pass action/frequency/time based on type we need to write the Logig
  public getLeakageAction(type) {

  }
  // Need to pass action/frequency/time based on type we need to write the Logig
  public setLeakageAction(type) {

  }

  // Limit



}
