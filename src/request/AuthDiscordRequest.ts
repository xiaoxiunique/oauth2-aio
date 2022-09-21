import {AuthDefaultRequest} from './AuthDefaultRequest';
import {AuthToken} from '../model/AuthToken';
import {AuthConfig, DISCORD} from '../config';
import axios, {AxiosResponse} from 'axios';
import * as qs from 'qs';

export interface DiscordUserInfo {
  id: string;
  email: string;
  avatar: string;
  username: string;
  discriminator: string;
}

export class AuthDiscordRequest extends AuthDefaultRequest<DiscordUserInfo> {
  constructor(config: AuthConfig) {
    super(config, DISCORD);
  }

  protected async doPostAuthorizationCode(code: string): Promise<any> {
    const data = {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.config.redirectUri,
    };

    const dataStr = qs.stringify(data);
    return axios.post(this.source.accessTokenApiEndpoint, dataStr, {
      headers: {
        withCredentials: false,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  }

  protected async getUserInfo(authToken: AuthToken): Promise<AxiosResponse<DiscordUserInfo>> {
    let userInfoRes: AxiosResponse<DiscordUserInfo> = {} as any;

    userInfoRes = await axios.get(
      this.userInfoEndpoint(authToken),
      {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authToken.accessToken}`,
        },
      },
    );
    return userInfoRes;
  }
}
