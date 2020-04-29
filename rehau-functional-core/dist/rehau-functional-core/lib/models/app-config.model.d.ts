export interface AppConfig {
    cidaasConfig: CidaasConfig;
    globalConfig: GlobalConfig;
}
interface CidaasConfig {
    cidaasClientId: string;
    cidaasBaseURL: string;
    ciddasTokenEndpoint: string;
    cidaasRevokeUrl: string;
    cidaasRegisterProvider: CidaasRegisterProvider;
    cidaasLoginProvider: CidaasLoginProvider;
    cidaasLoginDesign?: CidaasLoginDesign;
    cidaasRegisterDesign?: CidaasRegisterDesign;
}
interface GlobalConfig {
    SECRET_KEY?: string;
    BASE_URL: string;
    backendBasePath: string;
    currentLanguage: string;
    loginScreenUrl: string;
}
interface CidaasRegisterProvider {
    appScope: Array<string>;
    responseType: string;
    redirectUri: string;
    code_challenge: string;
    code_challenge_method: string;
    nonce: string;
    viewType: string;
}
interface CidaasLoginProvider {
    appScope: Array<string>;
    responseType: string;
    redirectUri: string;
    code_challenge: string;
    code_challenge_method: string;
    nonce: string;
}
interface CidaasLoginDesign {
    closebuttoncolor: string;
    hardwareback: string;
    hidenavigationbuttons: string;
    hideurlbar: string;
    navigationbuttoncolor: string;
    toolbarcolor: string;
}
interface CidaasRegisterDesign {
    closebuttoncolor: string;
    hardwareback: string;
    hidenavigationbuttons: string;
    hideurlbar: string;
    navigationbuttoncolor: string;
    toolbarcolor: string;
}
export {};
