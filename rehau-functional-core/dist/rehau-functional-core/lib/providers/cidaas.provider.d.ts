import { OAuthProvider } from 'ionic-cordova-oauth/dist/provider';
import { IcidaasProviderOptions } from '../models/cidaas.model';
export declare class CidaasProvider extends OAuthProvider {
    static CLIENT_ID: string;
    static baseURL: string;
    static tokenEndpoint: string;
    revokeUrl: string;
    options: IcidaasProviderOptions;
    protected authUrl: string;
    protected defaults: object;
    static base64URLEncode(str: any): string;
    constructor(options?: IcidaasProviderOptions);
    sha256(buffer: any): any;
    private removeParam;
    private addParam;
    protected optionsToDialogUrl(options: any): string;
}
