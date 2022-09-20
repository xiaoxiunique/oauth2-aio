export abstract class AuthSource {

  /**
   * 授权 API
   */
  abstract authorizeApiEndpoint: string;

  /**
   * 获取 accessToken 的 API
   */
  abstract accessTokenApiEndpoint: string;

  /**
   * 获取用户 Info
   */
  abstract userInfoApiEndpoint: unknown;

  abstract refreshTokenEndpoint: string;
}
