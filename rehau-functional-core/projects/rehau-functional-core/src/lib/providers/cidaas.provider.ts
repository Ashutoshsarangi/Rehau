import { OAuthProvider } from 'ionic-cordova-oauth/dist/provider';
import { IcidaasProviderOptions } from '../models/cidaas.model';
import shajs from 'sha.js';


// @dynamic
export class CidaasProvider extends OAuthProvider {
  static CLIENT_ID = '9feab210-c025-406d-a10c-3d8323214491';
  static baseURL = 'https://accounts.rehau.com';
  static tokenEndpoint = CidaasProvider.baseURL + '/token-srv/token';
  revokeUrl = CidaasProvider.baseURL + '/authz-srv/revoke';


  options: IcidaasProviderOptions;
  protected authUrl = CidaasProvider.baseURL + '/authz-srv/authz';
  protected defaults: object = {
    responseType: 'code'
  };
  static base64URLEncode(str): string {
    return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
  constructor(options: IcidaasProviderOptions = {}) {
    super(options);

    if (!options.appScope || options.appScope.length <= 0) {
      throw new Error(`A ${this.name} app scope must exist`);
    }
  }

  sha256(buffer) {
    return shajs('sha256').update(buffer).digest();
  }

  private removeParam(key, sourceURL) {
    let rtn = sourceURL.split('?')[0];
    let param = '';
    let paramsArr = [];
    const queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
      paramsArr = queryString.split('&');
      for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
        param = paramsArr[i].split('=')[0];
        if (param === key) {
          paramsArr.splice(i, 1);
        }
      }
      rtn = rtn + '?' + paramsArr.join('&');
    }
    return rtn;
  }

  private addParam(key, sourceURL) {
    sourceURL += `&scope=`;
    sourceURL += `${this.options.appScope.join(' ')}`;
    return sourceURL;
  }

  protected optionsToDialogUrl(options) {
    let url = super.optionsToDialogUrl(options);
    url = this.removeParam('scope', url);
    url = this.addParam('scope', url);
    if (options.authType) {
      url += `&auth_type=${options.authType}`;
    }
    if (options.nonce) {
      url += `&nonce=${options.nonce}`;
    }
    if (options.code_challenge_method === 'plain') {
      url += `&code_challenge=${options.code_challenge}&code_challenge_method=${options.code_challenge_method}`;
    }
    if (options.code_challenge_method === 'S256') {
      url += `&code_challenge=${
        CidaasProvider.base64URLEncode(this.sha256(options.code_challenge))
        }&code_challenge_method=${options.code_challenge_method}`;
    }
    if (options.viewType) {
      url += `&view_type=${options.viewType}`;
    }
    console.log('Calling URL: ' + url);
    return url;
  }

}
