/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { OAuthProvider } from 'ionic-cordova-oauth/dist/provider';
import shajs from 'sha.js';
// @dynamic
var CidaasProvider = /** @class */ (function (_super) {
    tslib_1.__extends(CidaasProvider, _super);
    function CidaasProvider(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.revokeUrl = CidaasProvider.baseURL + '/authz-srv/revoke';
        _this.authUrl = CidaasProvider.baseURL + '/authz-srv/authz';
        _this.defaults = {
            responseType: 'code'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A " + _this.name + " app scope must exist");
        }
        return _this;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    CidaasProvider.base64URLEncode = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    };
    /**
     * @param {?} buffer
     * @return {?}
     */
    CidaasProvider.prototype.sha256 = /**
     * @param {?} buffer
     * @return {?}
     */
    function (buffer) {
        return shajs('sha256').update(buffer).digest();
    };
    /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    CidaasProvider.prototype.removeParam = /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    function (key, sourceURL) {
        /** @type {?} */
        var rtn = sourceURL.split('?')[0];
        /** @type {?} */
        var param = '';
        /** @type {?} */
        var paramsArr = [];
        /** @type {?} */
        var queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : '';
        if (queryString !== '') {
            paramsArr = queryString.split('&');
            for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
                param = paramsArr[i].split('=')[0];
                if (param === key) {
                    paramsArr.splice(i, 1);
                }
            }
            rtn = rtn + '?' + paramsArr.join('&');
        }
        return rtn;
    };
    /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    CidaasProvider.prototype.addParam = /**
     * @private
     * @param {?} key
     * @param {?} sourceURL
     * @return {?}
     */
    function (key, sourceURL) {
        sourceURL += "&scope=";
        sourceURL += "" + this.options.appScope.join(' ');
        return sourceURL;
    };
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    CidaasProvider.prototype.optionsToDialogUrl = /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var url = _super.prototype.optionsToDialogUrl.call(this, options);
        url = this.removeParam('scope', url);
        url = this.addParam('scope', url);
        if (options.authType) {
            url += "&auth_type=" + options.authType;
        }
        if (options.nonce) {
            url += "&nonce=" + options.nonce;
        }
        if (options.code_challenge_method === 'plain') {
            url += "&code_challenge=" + options.code_challenge + "&code_challenge_method=" + options.code_challenge_method;
        }
        if (options.code_challenge_method === 'S256') {
            url += "&code_challenge=" + CidaasProvider.base64URLEncode(this.sha256(options.code_challenge)) + "&code_challenge_method=" + options.code_challenge_method;
        }
        if (options.viewType) {
            url += "&view_type=" + options.viewType;
        }
        console.log('Calling URL: ' + url);
        return url;
    };
    CidaasProvider.CLIENT_ID = '9feab210-c025-406d-a10c-3d8323214491';
    CidaasProvider.baseURL = 'https://accounts.rehau.com';
    CidaasProvider.tokenEndpoint = CidaasProvider.baseURL + '/token-srv/token';
    return CidaasProvider;
}(OAuthProvider));
export { CidaasProvider };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lkYWFzLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVoYXUtZnVuY3Rpb25hbC1jb3JlLyIsInNvdXJjZXMiOlsibGliL3Byb3ZpZGVycy9jaWRhYXMucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbEUsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDOztBQUkzQjtJQUFvQywwQ0FBYTtJQWtCL0Msd0JBQVksT0FBb0M7UUFBcEMsd0JBQUEsRUFBQSxZQUFvQztRQUFoRCxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUtmO1FBcEJELGVBQVMsR0FBRyxjQUFjLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBSS9DLGFBQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ3RELGNBQVEsR0FBVztZQUMzQixZQUFZLEVBQUUsTUFBTTtTQUNyQixDQUFDO1FBVUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBSyxLQUFJLENBQUMsSUFBSSwwQkFBdUIsQ0FBQyxDQUFDO1NBQ3hEOztJQUNILENBQUM7Ozs7O0lBWk0sOEJBQWU7Ozs7SUFBdEIsVUFBdUIsR0FBRztRQUN4QixPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2FBQzFCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFTRCwrQkFBTTs7OztJQUFOLFVBQU8sTUFBTTtRQUNYLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FB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QUFTLEdBQUcsc0NBQXNDLENBQUM7SUFDbkQsc0JBQU8sR0FBRyw0QkFBNEIsQ0FBQztJQUN2Qyw0QkFBYSxHQUFHLGNBQWMsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7SUE0RXJFLHFCQUFDO0NBQUEsQUEvRUQsQ0FBb0MsYUFBYSxHQStFaEQ7U0EvRVksY0FBYzs7O0lBQ3pCLHlCQUEwRDs7SUFDMUQsdUJBQThDOztJQUM5Qyw2QkFBbUU7O0lBQ25FLG1DQUF5RDs7SUFHekQsaUNBQWdDOzs7OztJQUNoQyxpQ0FBZ0U7Ozs7O0lBQ2hFLGtDQUVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT0F1dGhQcm92aWRlciB9IGZyb20gJ2lvbmljLWNvcmRvdmEtb2F1dGgvZGlzdC9wcm92aWRlcic7XG5pbXBvcnQgeyBJY2lkYWFzUHJvdmlkZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2NpZGFhcy5tb2RlbCc7XG5pbXBvcnQgc2hhanMgZnJvbSAnc2hhLmpzJztcblxuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIENpZGFhc1Byb3ZpZGVyIGV4dGVuZHMgT0F1dGhQcm92aWRlciB7XG4gIHN0YXRpYyBDTElFTlRfSUQgPSAnOWZlYWIyMTAtYzAyNS00MDZkLWExMGMtM2Q4MzIzMjE0NDkxJztcbiAgc3RhdGljIGJhc2VVUkwgPSAnaHR0cHM6Ly9hY2NvdW50cy5yZWhhdS5jb20nO1xuICBzdGF0aWMgdG9rZW5FbmRwb2ludCA9IENpZGFhc1Byb3ZpZGVyLmJhc2VVUkwgKyAnL3Rva2VuLXNydi90b2tlbic7XG4gIHJldm9rZVVybCA9IENpZGFhc1Byb3ZpZGVyLmJhc2VVUkwgKyAnL2F1dGh6LXNydi9yZXZva2UnO1xuXG5cbiAgb3B0aW9uczogSWNpZGFhc1Byb3ZpZGVyT3B0aW9ucztcbiAgcHJvdGVjdGVkIGF1dGhVcmwgPSBDaWRhYXNQcm92aWRlci5iYXNlVVJMICsgJy9hdXRoei1zcnYvYXV0aHonO1xuICBwcm90ZWN0ZWQgZGVmYXVsdHM6IG9iamVjdCA9IHtcbiAgICByZXNwb25zZVR5cGU6ICdjb2RlJ1xuICB9O1xuICBzdGF0aWMgYmFzZTY0VVJMRW5jb2RlKHN0cik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHN0ci50b1N0cmluZygnYmFzZTY0JylcbiAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpXG4gICAgICAucmVwbGFjZSgvPS9nLCAnJyk7XG4gIH1cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSWNpZGFhc1Byb3ZpZGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICBpZiAoIW9wdGlvbnMuYXBwU2NvcGUgfHwgb3B0aW9ucy5hcHBTY29wZS5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBICR7dGhpcy5uYW1lfSBhcHAgc2NvcGUgbXVzdCBleGlzdGApO1xuICAgIH1cbiAgfVxuXG4gIHNoYTI1NihidWZmZXIpIHtcbiAgICByZXR1cm4gc2hhanMoJ3NoYTI1NicpLnVwZGF0ZShidWZmZXIpLmRpZ2VzdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVQYXJhbShrZXksIHNvdXJjZVVSTCkge1xuICAgIGxldCBydG4gPSBzb3VyY2VVUkwuc3BsaXQoJz8nKVswXTtcbiAgICBsZXQgcGFyYW0gPSAnJztcbiAgICBsZXQgcGFyYW1zQXJyID0gW107XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSAoc291cmNlVVJMLmluZGV4T2YoJz8nKSAhPT0gLTEpID8gc291cmNlVVJMLnNwbGl0KCc/JylbMV0gOiAnJztcbiAgICBpZiAocXVlcnlTdHJpbmcgIT09ICcnKSB7XG4gICAgICBwYXJhbXNBcnIgPSBxdWVyeVN0cmluZy5zcGxpdCgnJicpO1xuICAgICAgZm9yIChsZXQgaSA9IHBhcmFtc0Fyci5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICBwYXJhbSA9IHBhcmFtc0FycltpXS5zcGxpdCgnPScpWzBdO1xuICAgICAgICBpZiAocGFyYW0gPT09IGtleSkge1xuICAgICAgICAgIHBhcmFtc0Fyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJ0biA9IHJ0biArICc/JyArIHBhcmFtc0Fyci5qb2luKCcmJyk7XG4gICAgfVxuICAgIHJldHVybiBydG47XG4gIH1cblxuICBwcml2YXRlIGFkZFBhcmFtKGtleSwgc291cmNlVVJMKSB7XG4gICAgc291cmNlVVJMICs9IGAmc2NvcGU9YDtcbiAgICBzb3VyY2VVUkwgKz0gYCR7dGhpcy5vcHRpb25zLmFwcFNjb3BlLmpvaW4oJyAnKX1gO1xuICAgIHJldHVybiBzb3VyY2VVUkw7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3B0aW9uc1RvRGlhbG9nVXJsKG9wdGlvbnMpIHtcbiAgICBsZXQgdXJsID0gc3VwZXIub3B0aW9uc1RvRGlhbG9nVXJsKG9wdGlvbnMpO1xuICAgIHVybCA9IHRoaXMucmVtb3ZlUGFyYW0oJ3Njb3BlJywgdXJsKTtcbiAgICB1cmwgPSB0aGlzLmFkZFBhcmFtKCdzY29wZScsIHVybCk7XG4gICAgaWYgKG9wdGlvbnMuYXV0aFR5cGUpIHtcbiAgICAgIHVybCArPSBgJmF1dGhfdHlwZT0ke29wdGlvbnMuYXV0aFR5cGV9YDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubm9uY2UpIHtcbiAgICAgIHVybCArPSBgJm5vbmNlPSR7b3B0aW9ucy5ub25jZX1gO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5jb2RlX2NoYWxsZW5nZV9tZXRob2QgPT09ICdwbGFpbicpIHtcbiAgICAgIHVybCArPSBgJmNvZGVfY2hhbGxlbmdlPSR7b3B0aW9ucy5jb2RlX2NoYWxsZW5nZX0mY29kZV9jaGFsbGVuZ2VfbWV0aG9kPSR7b3B0aW9ucy5jb2RlX2NoYWxsZW5nZV9tZXRob2R9YDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuY29kZV9jaGFsbGVuZ2VfbWV0aG9kID09PSAnUzI1NicpIHtcbiAgICAgIHVybCArPSBgJmNvZGVfY2hhbGxlbmdlPSR7XG4gICAgICAgIENpZGFhc1Byb3ZpZGVyLmJhc2U2NFVSTEVuY29kZSh0aGlzLnNoYTI1NihvcHRpb25zLmNvZGVfY2hhbGxlbmdlKSlcbiAgICAgICAgfSZjb2RlX2NoYWxsZW5nZV9tZXRob2Q9JHtvcHRpb25zLmNvZGVfY2hhbGxlbmdlX21ldGhvZH1gO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy52aWV3VHlwZSkge1xuICAgICAgdXJsICs9IGAmdmlld190eXBlPSR7b3B0aW9ucy52aWV3VHlwZX1gO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnQ2FsbGluZyBVUkw6ICcgKyB1cmwpO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxufVxuIl19