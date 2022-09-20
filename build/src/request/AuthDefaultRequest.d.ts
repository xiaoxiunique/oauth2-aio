import { AuthConfig, AuthSource } from '../config';
import { AuthRequest } from './AuthRequest';
import { AuthToken } from '../model/AuthToken';
import { AuthCallback } from '../model/AuthCallback';
export declare abstract class AuthDefaultRequest extends AuthRequest {
    protected config: AuthConfig;
    protected source: AuthSource;
    protected constructor(config: AuthConfig, source: AuthSource);
    /**
     * 获取 accessToken
     * @param authCallBack
     * @protected
     */
    protected abstract getAccessToken(authCallBack: AuthCallback): Promise<any>;
    /**
     * 获取用户信息
     * @param authToken
     * @protected
     */
    protected abstract getUserInfo(authToken: AuthToken): Promise<unknown>;
    /**
     * 获取 authorize 地址
     * @param state
     */
    authorize(state: string): string;
    /**
     * 统一登陆接口
     * @param callback
     */
    login(callback: AuthCallback): Promise<unknown>;
    /**
     * accessToken endpoint
     * @param code
     * @protected
     */
    protected accessTokenEndpoint(code: string): string;
    /**
     * refresh token 地址
     * @param refreshToken
     * @protected
     */
    protected refreshTokenEndpoint(refreshToken: string): string;
    protected userInfoEndpoint(authToken: AuthToken): string;
    protected doPostAuthorizationCode(code: string): Promise<any>;
    protected doGetUserInfo(authToken: AuthToken): Promise<unknown>;
    refresh(authToken: AuthToken): Promise<void>;
}
