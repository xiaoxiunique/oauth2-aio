"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGoogleRequest = void 0;
const AuthDefaultRequest_1 = require("./AuthDefaultRequest");
const config_1 = require("../config");
const axios_1 = require("axios");
class AuthGoogleRequest extends AuthDefaultRequest_1.AuthDefaultRequest {
    constructor(config) {
        super(config, config_1.GOOGLE);
    }
    async getAccessToken(authCallBack) {
        if (!authCallBack.code) {
            return Promise.reject('code is null');
        }
        const response = await this.doPostAuthorizationCode(authCallBack.code);
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
            scope: response.data.scope,
            tokenType: response.data.token_type,
        };
    }
    async getUserInfo(authToken) {
        let userInfoRes = {};
        try {
            userInfoRes = await axios_1.default.post(this.userInfoEndpoint(authToken), {}, {
                headers: {
                    Authorization: `Bearer ${authToken.accessToken}`,
                },
            });
        }
        catch (e) {
            throw new Error('get userinfo error' + e);
        }
        return userInfoRes && userInfoRes.data;
    }
    authorize(state) {
        const url = new URL(this.source.authorizeApiEndpoint);
        url.searchParams.append('client_id', this.config.clientId);
        url.searchParams.append('redirect_uri', this.config.redirectUri);
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('scope', this.config.scopes.join(' '));
        url.searchParams.append('state', state);
        url.searchParams.append('access_type', 'offline');
        url.searchParams.append('prompt', 'select_account');
        return url.toString();
    }
    userInfoEndpoint(authToken) {
        return super.userInfoEndpoint(authToken);
    }
}
exports.AuthGoogleRequest = AuthGoogleRequest;
//# sourceMappingURL=AuthGoogleRequest.js.map