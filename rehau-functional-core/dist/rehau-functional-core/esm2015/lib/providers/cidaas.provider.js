/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OAuthProvider } from 'ionic-cordova-oauth/dist/provider';
import shajs from 'sha.js';
// @dynamic
export class CidaasProvider extends OAuthProvider {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.revokeUrl = CidaasProvider.baseURL + '/authz-srv/revoke';
        this.authUrl = CidaasProvider.baseURL + '/authz-srv/authz';
        this.defaults = {
            responseType: 'code'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static base64URLEncode(str) {
        return str.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
    /**
     * @param {?} buffer
     * @return {?}
     */
    sha256(buffer) {
        return shajs('sha256').update(buffer).digest();
    }
    /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    removeParam(key, sourceURL) {
        /** @type {?} */
        let rtn = sourceURL.split('?')[0];
        /** @type {?} */
        let param = '';
        /** @type {?} */
        let paramsArr = [];
        /** @type {?} */
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
    /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    addParam(key, sourceURL) {
        sourceURL += `&scope=`;
        sourceURL += `${this.options.appScope.join(' ')}`;
        return sourceURL;
    }
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    optionsToDialogUrl(options) {
        /** @type {?} */
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
            url += `&code_challenge=${CidaasProvider.base64URLEncode(this.sha256(options.code_challenge))}&code_challenge_method=${options.code_challenge_method}`;
        }
        if (options.viewType) {
            url += `&view_type=${options.viewType}`;
        }
        console.log('Calling URL: ' + url);
        return url;
    }
}
CidaasProvider.CLIENT_ID = '9feab210-c025-406d-a10c-3d8323214491';
CidaasProvider.baseURL = 'https://accounts.rehau.com';
CidaasProvider.tokenEndpoint = CidaasProvider.baseURL + '/token-srv/token';
if (false) {
    /** @type {?} */
    CidaasProvider.CLIENT_ID;
    /** @type {?} */
    CidaasProvider.baseURL;
    /** @type {?} */
    CidaasProvider.tokenEndpoint;
    /** @type {?} */
    CidaasProvider.prototype.revokeUrl;
    /** @type {?} */
    CidaasProvider.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    CidaasProvider.prototype.authUrl;
    /**
     * @type {?}
     * @protected
     */
    CidaasProvider.prototype.defaults;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lkYWFzLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3Byb3ZpZGVycy9jaWRhYXMucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVsRSxPQUFPLEtBQUssTUFBTSxRQUFRLENBQUM7O0FBSTNCLE1BQU0sT0FBTyxjQUFlLFNBQVEsYUFBYTs7OztJQWtCL0MsWUFBWSxVQUFrQyxFQUFFO1FBQzlDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQWZqQixjQUFTLEdBQUcsY0FBYyxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUkvQyxZQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUN0RCxhQUFRLEdBQVc7WUFDM0IsWUFBWSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQVVBLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksdUJBQXVCLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7Ozs7O0lBWkQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHO1FBQ3hCLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDMUIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7YUFDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7YUFDbkIsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7OztJQVNELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFD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QztBQUNuRCxzQkFBTyxHQUFHLDRCQUE0QixDQUFDO0FBQ3ZDLDRCQUFhLEdBQUcsY0FBYyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7O0lBRm5FLHlCQUEwRDs7SUFDMUQsdUJBQThDOztJQUM5Qyw2QkFBbUU7O0lBQ25FLG1DQUF5RDs7SUFHekQsaUNBQWdDOzs7OztJQUNoQyxpQ0FBZ0U7Ozs7O0lBQ2hFLGtDQUVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT0F1dGhQcm92aWRlciB9IGZyb20gJ2lvbmljLWNvcmRvdmEtb2F1dGgvZGlzdC9wcm92aWRlcic7XG5pbXBvcnQgeyBJY2lkYWFzUHJvdmlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2NpZGFhcy5tb2RlbCc7XG5pbXBvcnQgc2hhanMgZnJvbSAnc2hhLmpzJztcblxuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIENpZGFhc1Byb3ZpZGVyIGV4dGVuZHMgT0F1dGhQcm92aWRlciB7XG4gIHN0YXRpYyBDTElFTlRfSUQgPSAnOWZlYWIyMTAtYzAyNS00MDZkLWExMGMtM2Q4MzIzMjE0NDkxJztcbiAgc3RhdGljIGJhc2VVUkwgPSAnaHR0cHM6Ly9hY2NvdW50cy5yZWhhdS5jb20nO1xuICBzdGF0aWMgdG9rZW5FbmRwb2ludCA9IENpZGFhc1Byb3ZpZGVyLmJhc2VVUkwgKyAnL3Rva2VuLXNydi90b2tlbic7XG4gIHJldm9rZVVybCA9IENpZGFhc1Byb3ZpZGVyLmJhc2VVUkwgKyAnL2F1dGh6LXNydi9yZXZva2UnO1xuXG5cbiAgb3B0aW9uczogSWNpZGFhc1Byb3ZpZGVyT3B0aW9ucztcbiAgcHJvdGVjdGVkIGF1dGhVcmwgPSBDaWRhYXNQcm92aWRlci5iYXNlVVJMICsgJy9hdXRoei1zcnYvYXV0aHonO1xuICBwcm90ZWN0ZWQgZGVmYXVsdHM6IG9iamVjdCA9IHtcbiAgICByZXNwb25zZVR5cGU6ICdjb2RlJ1xuICB9O1xuICBzdGF0aWMgYmFzZTY0VVJMRW5jb2RlKHN0cik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHN0ci50b1N0cmluZygnYmFzZTY0JylcbiAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpXG4gICAgICAucmVwbGFjZSgvPS9nLCAnJyk7XG4gIH1cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSWNpZGFhc1Byb3ZpZGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICBpZiAoIW9wdGlvbnMuYXBwU2NvcGUgfHwgb3B0aW9ucy5hcHBTY29wZS5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBICR7dGhpcy5uYW1lfSBhcHAgc2NvcGUgbXVzdCBleGlzdGApO1xuICAgIH1cbiAgfVxuXG4gIHNoYTI1NihidWZmZXIpIHtcbiAgICByZXR1cm4gc2hhanMoJ3NoYTI1NicpLnVwZGF0ZShidWZmZXIpLmRpZ2VzdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVQYXJhbShrZXksIHNvdXJjZVVSTCkge1xuICAgIGxldCBydG4gPSBzb3VyY2VVUkwuc3BsaXQoJz8nKVswXTtcbiAgICBsZXQgcGFyYW0gPSAnJztcbiAgICBsZXQgcGFyYW1zQXJyID0gW107XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSAoc291cmNlVVJMLmluZGV4T2YoJz8nKSAhPT0gLTEpID8gc291cmNlVVJMLnNwbGl0KCc/JylbMV0gOiAnJztcbiAgICBpZiAocXVlcnlTdHJpbmcgIT09ICcnKSB7XG4gICAgICBwYXJhbXNBcnIgPSBxdWVyeVN0cmluZy5zcGxpdCgnJicpO1xuICAgICAgZm9yIChsZXQgaSA9IHBhcmFtc0Fyci5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICBwYXJhbSA9IHBhcmFtc0FycltpXS5zcGxpdCgnPScpWzBdO1xuICAgICAgICBpZiAocGFyYW0gPT09IGtleSkge1xuICAgICAgICAgIHBhcmFtc0Fyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJ0biA9IHJ0biArICc/JyArIHBhcmFtc0Fyci5qb2luKCcmJyk7XG4gICAgfVxuICAgIHJldHVybiBydG47XG4gIH1cblxuICBwcml2YXRlIGFkZFBhcmFtKGtleSwgc291cmNlVVJMKSB7XG4gICAgc291cmNlVVJMICs9IGAmc2NvcGU9YDtcbiAgICBzb3VyY2VVUkwgKz0gYCR7dGhpcy5vcHRpb25zLmFwcFNjb3BlLmpvaW4oJyAnKX1gO1xuICAgIHJldHVybiBzb3VyY2VVUkw7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3B0aW9uc1RvRGlhbG9nVXJsKG9wdGlvbnMpIHtcbiAgICBsZXQgdXJsID0gc3VwZXIub3B0aW9uc1RvRGlhbG9nVXJsKG9wdGlvbnMpO1xuICAgIHVybCA9IHRoaXMucmVtb3ZlUGFyYW0oJ3Njb3BlJywgdXJsKTtcbiAgICB1cmwgPSB0aGlzLmFkZFBhcmFtKCdzY29wZScsIHVybCk7XG4gICAgaWYgKG9wdGlvbnMuYXV0aFR5cGUpIHtcbiAgICAgIHVybCArPSBgJmF1dGhfdHlwZT0ke29wdGlvbnMuYXV0aFR5cGV9YDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubm9uY2UpIHtcbiAgICAgIHVybCArPSBgJm5vbmNlPSR7b3B0aW9ucy5ub25jZX1gO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5jb2RlX2NoYWxsZW5nZV9tZXRob2QgPT09ICdwbGFpbicpIHtcbiAgICAgIHVybCArPSBgJmNvZGVfY2hhbGxlbmdlPSR7b3B0aW9ucy5jb2RlX2NoYWxsZW5nZX0mY29kZV9jaGFsbGVuZ2VfbWV0aG9kPSR7b3B0aW9ucy5jb2RlX2NoYWxsZW5nZV9tZXRob2R9YDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuY29kZV9jaGFsbGVuZ2VfbWV0aG9kID09PSAnUzI1NicpIHtcbiAgICAgIHVybCArPSBgJmNvZGVfY2hhbGxlbmdlPSR7XG4gICAgICAgIENpZGFhc1Byb3ZpZGVyLmJhc2U2NFVSTEVuY29kZSh0aGlzLnNoYTI1NihvcHRpb25zLmNvZGVfY2hhbGxlbmdlKSlcbiAgICAgICAgfSZjb2RlX2NoYWxsZW5nZV9tZXRob2Q9JHtvcHRpb25zLmNvZGVfY2hhbGxlbmdlX21ldGhvZH1gO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy52aWV3VHlwZSkge1xuICAgICAgdXJsICs9IGAmdmlld190eXBlPSR7b3B0aW9ucy52aWV3VHlwZX1gO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnQ2FsbGluZyBVUkw6ICcgKyB1cmwpO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxufVxuIl19