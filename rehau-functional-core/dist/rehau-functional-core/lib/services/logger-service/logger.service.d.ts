export declare class LogService {
    /**
     * @description This Method is for general console logs
     * @param content is the text you want to print as console
     */
    log(...content: any[]): void;
    /**
     * @description This Method is for error console logs
     * @param content is the text you want to print as console
     */
    log_e(...content: any[]): void;
    /**
     * @description This Method is for warning console logs
     * @param content is the text you want to print as console
     */
    log_w(...content: any[]): void;
    /**
     * @description This Method is for debugging console logs
     * @param content is the text you want to print as console
     */
    log_d(...content: any[]): void;
}
