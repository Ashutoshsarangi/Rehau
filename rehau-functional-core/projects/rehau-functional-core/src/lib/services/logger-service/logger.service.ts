// IONIC - ANGULAR
import { Injectable, Inject } from '@angular/core';
import { DEBUG_LOG_ON, _DEV_ } from '../../config/app-setting.config';

@Injectable()

export class LogService {
  /**
   * @description This Method is for general console logs
   * @param content is the text you want to print as console
   */
  log(...content) {
    if (!DEBUG_LOG_ON && !_DEV_) {
      return;
    }

    console.log('✅ ', ...content);
  }
  /**
   * @description This Method is for error console logs
   * @param content is the text you want to print as console
   */
  log_e(...content) {
    if (!DEBUG_LOG_ON && !_DEV_) {
      return;
    }

    console.log('🚫❗️ ', ...content);
  }

  /**
   * @description This Method is for warning console logs
   * @param content is the text you want to print as console
   */
  log_w(...content) {
    if (!DEBUG_LOG_ON && !_DEV_) {
      return;
    }

    console.log('🔶 ', ...content);
  }


  /**
   * @description This Method is for debugging console logs
   * @param content is the text you want to print as console
   */
  log_d(...content) {
    if (!DEBUG_LOG_ON && !_DEV_) {
      return;
    }

    console.log('🔷 TODO: ', ...content);
  }

}
