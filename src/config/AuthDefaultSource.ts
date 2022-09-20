import {AuthSource} from './AuthSource';

const GOOGLE: AuthSource = {
  accessTokenApiEndpoint: 'https://oauth2.googleapis.com/token',
  authorizeApiEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  userInfoApiEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
  refreshTokenEndpoint: 'https://oauth2.googleapis.com/token',
};

export {GOOGLE};
