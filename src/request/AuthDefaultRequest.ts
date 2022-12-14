import {AuthConfig, AuthSource} from '../config';
import {AuthRequest} from './AuthRequest';
import {AuthToken} from '../model/AuthToken';
import {AuthCallback} from '../model/AuthCallback';
import axios, {AxiosResponse} from 'axios';

export abstract class AuthDefaultRequest<U> extends AuthRequest {
  protected constructor(
    protected config: AuthConfig,
    protected source: AuthSource
  ) {
    super();
  }

  /**
   * 获取 accessToken
   * @param authCallBack
   * @protected
   */
  protected async getAccessToken(authCallBack: AuthCallback): Promise<AuthToken> {
    if (!authCallBack.code) {
      return Promise.reject('code is null');
    }

    const response = await this.doPostAuthorizationCode(authCallBack.code);

    const keys = Object.keys(this.source.mapping!);
    return keys.reduce((prev, curr) => {
      prev[curr] = response.data[this.source.mapping![curr]];
      return prev;
    }, {} as { [key: string]: string });
  }

  /**
   * 获取用户信息
   * @param authToken
   * @protected
   */
  protected abstract getUserInfo(authToken: AuthToken): Promise<AxiosResponse<U>>;

  /**
   * 获取 authorize 地址
   * @param state
   */
  authorize(state: string): string {
    const url = new URL(this.source.authorizeApiEndpoint);
    url.searchParams.append('client_id', this.config.clientId);
    url.searchParams.append('redirect_uri', this.config.redirectUri);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('state', state);
    url.searchParams.append('scope', this.config.scopes.join(' '));
    return url.toString();
  }

  /**
   * 统一登陆接口
   * @param callback
   */
  async login(callback: AuthCallback): Promise<unknown> {
    const authToken = await this.getAccessToken(callback);
    let user: Promise<unknown> = {} as any;
    try {
      user = this.getUserInfo(authToken);
    } catch (e) {
      throw new Error('getUserInfo error' + e);
    }
    return user;
  }

  /**
   * accessToken endpoint
   * @param code
   * @protected
   */
  protected accessTokenEndpoint(code: string) {
    const url = new URL(this.source.accessTokenApiEndpoint);
    url.searchParams.append('client_id', this.config.clientId);
    url.searchParams.append('client_secret', this.config.clientSecret);
    url.searchParams.append('grant_type', 'authorization_code');
    url.searchParams.append('code', code);
    url.searchParams.append('redirect_uri', this.config.redirectUri);
    return url.toString();
  }

  /**
   * refresh token 地址
   * @param refreshToken
   * @protected
   */
  protected refreshTokenEndpoint(refreshToken: string) {
    const url = new URL(this.source.refreshTokenEndpoint);
    url.searchParams.append('client_id', this.config.clientId);
    url.searchParams.append('client_secret', this.config.clientSecret);
    url.searchParams.append('grant_type', 'refresh_token');
    url.searchParams.append('refresh_token', refreshToken);
    return url.toString();
  }

  protected userInfoEndpoint(authToken: AuthToken) {
    return `${this.source.userInfoApiEndpoint}?access_token=${authToken.accessToken}`;
  }

  protected async doPostAuthorizationCode(code: string): Promise<any> {
    return axios.post(this.accessTokenEndpoint(code));
  }

  protected async doGetUserInfo(authToken: AuthToken): Promise<unknown> {
    let r: AxiosResponse<any> = {} as any;
    try {
      r = await axios.get(this.userInfoEndpoint(authToken));
    } catch (e) {
      throw new Error('doGetUserInfo error' + e);
    }
    return r;
  }

  refresh(authToken: AuthToken): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
