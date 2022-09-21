import {AuthSource} from './AuthSource';

const GOOGLE: AuthSource = {
  accessTokenApiEndpoint: 'https://oauth2.googleapis.com/token',
  authorizeApiEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  userInfoApiEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
  refreshTokenEndpoint: 'https://oauth2.googleapis.com/token',

  mapping: {
    accessToken: "access_token",
    refreshToken: "refresh_token",
    expiresIn: "expires_in",
    scope: "scope",
    tokenType: "token_type"
  }
};

const DISCORD: AuthSource = {
  accessTokenApiEndpoint: 'https://discord.com/api/v8/oauth2/token',
  authorizeApiEndpoint: 'https://discord.com/api/oauth2/authorize',
  userInfoApiEndpoint: 'https://discord.com/api/users/@me',
  refreshTokenEndpoint: 'https://discord.com/api/v8/oauth2/token',

  mapping: {
    accessToken: "access_token",
    refreshToken: "refresh_token",
    expiresIn: "expires_in",
    scope: "scope",
    tokenType: "token_type"
  }

}

const TWITTER: AuthSource = {
  accessTokenApiEndpoint: 'https://api.twitter.com/oauth/access_token',
  authorizeApiEndpoint: 'https://api.twitter.com/oauth/authorize',
  userInfoApiEndpoint: 'https://api.twitter.com/1.1/account/verify_credentials.json',
  refreshTokenEndpoint: 'https://api.twitter.com/oauth/access_token',
}

export {GOOGLE, DISCORD, TWITTER};
