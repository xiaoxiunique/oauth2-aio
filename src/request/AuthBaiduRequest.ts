import {AuthDefaultRequest} from './AuthDefaultRequest';
import {AuthToken} from '../model/AuthToken';
import {AuthCallback} from '../model/AuthCallback';
import {AuthConfig, BAIDU} from '../config';
import axios, {AxiosResponse} from 'axios';

export interface BaiduUserInfo {
  avatar_url: string;
  baidu_name: string;
  errmsg: string;
  errno: number;
  netdisk_name: string;
  request_id: string;
  uk: number;
  vip_type: number;
}

export class AuthBaiduRequest extends AuthDefaultRequest<BaiduUserInfo> {
  constructor(config: AuthConfig) {
    super(config, BAIDU);
  }

  protected async getAccessToken(authCallBack: AuthCallback): Promise<AuthToken> {
    if (!authCallBack.code) {
      return Promise.reject('code is null');
    }

    const response = await this.doPostAuthorizationCode(authCallBack.code);
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
      scope: response.data.scope,
      tokenType: response.data.token_type
    };
  }

  protected userInfoEndpoint(authToken: AuthToken): string {
    return super.userInfoEndpoint(authToken) + `&method=uinfo`;
  }

  protected async getUserInfo(authToken: AuthToken): Promise<AxiosResponse<BaiduUserInfo>> {
    let userInfoRes: AxiosResponse<BaiduUserInfo> = {} as any;

    userInfoRes = await axios.post<BaiduUserInfo>(
      this.userInfoEndpoint(authToken),
      {},
    );
    return userInfoRes;
  }

  authorize(state: string): string {
    const url = new URL(this.source.authorizeApiEndpoint);
    url.searchParams.append('client_id', this.config.clientId);
    url.searchParams.append('device_id', this.config.deviceId!!);
    url.searchParams.append('redirect_uri', this.config.redirectUri);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', this.config.scopes.join(' '));
    return url.toString();
  }

  // TODO: check response
}
