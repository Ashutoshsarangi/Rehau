import { LogService } from '../logger-service/logger.service';
export declare class OnBoardingService {
    private logService;
    constructor(logService: LogService);
    /**
     * @description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param currentPageTitle title for current active page
     * @param nextPageTitle title for next page
     * @param prevPageTitle title for prev page
     */
    nextClickActionHandler(currentPageTitle: any, nextPageTitle: any, prevPageTitle: any): Promise<string>;
    /**
     * @description This Method is responsible to handle any action to process in betwwen on boarding screens
     * @param currentPageTitle title for current active page
     * @param nextPageTitle title for next page
     * @param prevPageTitle title for prev page
     */
    prevClickActionHandler(currentPageTitle: any, nextPageTitle: any, prevPageTitle: any): Promise<string>;
}
