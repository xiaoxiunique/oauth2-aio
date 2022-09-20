import {AuthDefaultRequest} from './AuthDefaultRequest';
import {AuthToken} from '../model/AuthToken';
import {AuthCallback} from '../model/AuthCallback';
import {AuthConfig, GOOGLE} from '../config';
import axios, {AxiosResponse} from 'axios';

export interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export class AuthGoogleRequest extends AuthDefaultRequest {
  constructor(config: AuthConfig) {
    super(config, GOOGLE);
  }

  protected async getAccessToken(authCallBack: AuthCallback): Promise<{
    expiresIn: any;
    scope: any;
    accessToken: any;
    tokenType: any;
    refreshToken: any;
  }> {
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

  protected async getUserInfo(authToken: AuthToken): Promise<GoogleUserInfo> {
    let userInfoRes: AxiosResponse<any> = {} as any;

    userInfoRes = await axios.post(
      this.userInfoEndpoint(authToken),
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken.accessToken}`,
        },
      }
    );
    return userInfoRes && (userInfoRes.data as GoogleUserInfo);
  }

  authorize(state: string): string {
    const url = new URL(this.source.authorizeApiEndpoint);

    url.searchParams.append('client_id', this.config.clientId);
    url.searchParams.append('redirect_uri', this.config.redirectUri);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', this.config.scopes.join(' '));
    url.searchParams.append('state', state);
    url.searchParams.append('access_type', 'offline');
    url.searchParams.append('prompt', 'consent');
    return url.toString();
  }

  // TODO: check response
}
