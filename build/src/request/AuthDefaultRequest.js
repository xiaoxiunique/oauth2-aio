"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDefaultRequest = void 0;
const AuthRequest_1 = require("./AuthRequest");
const axios_1 = require("axios");
class AuthDefaultRequest extends AuthRequest_1.AuthRequest {
    constructor(config, source) {
        super();
        this.config = config;
        this.source = source;
    }
    /**
     * 获取 authorize 地址
     * @param state
     */
    authorize(state) {
        const url = new URL(this.source.authorizeApiEndpoint);
        url.searchParams.append("client_id", this.config.clientId);
        url.searchParams.append("redirect_uri", this.config.redirectUri);
        url.searchParams.append("response_type", "code");
        url.searchParams.append("state", state);
        return url.toString();
    }
    /**
     * 统一登陆接口
     * @param callback
     */
    async login(callback) {
        const authToken = await this.getAccessToken(callback);
        let user = {};
        try {
            user = this.getUserInfo(authToken);
        }
        catch (e) {
            console.error("getUserInfo error", e);
        }
        return user;
    }
    /**
     * accessToken endpoint
     * @param code
     * @protected
     */
    accessTokenEndpoint(code) {
        const url = new URL(this.source.accessTokenApiEndpoint);
        url.searchParams.append("client_id", this.config.clientId);
        url.searchParams.append("client_secret", this.config.clientSecret);
        url.searchParams.append("grant_type", "authorization_code");
        url.searchParams.append("code", code);
        url.searchParams.append("redirect_uri", this.config.redirectUri);
        return url.toString();
    }
    /**
     * refresh token 地址
     * @param refreshToken
     * @protected
     */
    refreshTokenEndpoint(refreshToken) {
        const url = new URL(this.source.refreshTokenEndpoint);
        url.searchParams.append("client_id", this.config.clientId);
        url.searchParams.append("client_secret", this.config.clientSecret);
        url.searchParams.append("grant_type", "refresh_token");
        url.searchParams.append("refresh_token", refreshToken);
        return url.toString();
    }
    userInfoEndpoint(authToken) {
        return `${this.source.userInfoApiEndpoint}?access_token=${authToken.accessToken}`;
    }
    async doPostAuthorizationCode(code) {
        return await axios_1.default.post(this.accessTokenEndpoint(code));
    }
    async doGetUserInfo(authToken) {
        return await axios_1.default.get(this.userInfoEndpoint(authToken));
    }
    refresh(authToken) {
        throw new Error("Method not implemented.");
    }
}
exports.AuthDefaultRequest = AuthDefaultRequest;
//# sourceMappingURL=AuthDefaultRequest.js.map