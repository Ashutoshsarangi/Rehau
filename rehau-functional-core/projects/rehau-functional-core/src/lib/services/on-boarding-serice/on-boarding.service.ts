// IONIC - ANGULAR
import { Inject, Injectable } from '@angular/core';
import { LogService } from '../logger-service/logger.service';
import { delay } from 'q';


@Injectable()
export class OnBoardingService {
  constructor(
    private logService: LogService,
  ) {
  }

  /**
   * @description This Method is responsible to handle any action to process in betwwen on boarding screens
   * @param currentPageTitle title for current active page
   * @param nextPageTitle title for next page
   * @param prevPageTitle title for prev page
   */
  async nextClickActionHandler(currentPageTitle, nextPageTitle, prevPageTitle) {
    this.logService.log('currentPageTitile -->', currentPageTitle);
    this.logService.log('nextPageTitle -->', nextPageTitle);
    this.logService.log('prevPageTitle -->', prevPageTitle);

    await delay(5000);

    return 'success';
  }

  /**
   * @description This Method is responsible to handle any action to process in betwwen on boarding screens
   * @param currentPageTitle title for current active page
   * @param nextPageTitle title for next page
   * @param prevPageTitle title for prev page
   */
  async prevClickActionHandler(currentPageTitle, nextPageTitle, prevPageTitle) {
    this.logService.log('currentPageTitile -->', currentPageTitle);
    this.logService.log('nextPageTitle -->', nextPageTitle);
    this.logService.log('prevPageTitle -->', prevPageTitle);

    await delay(5000);

    return 'success';
  }

}
