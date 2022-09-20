export interface AuthCallback {
  code?: string;
  auth_code?: string;
  state?: string;
  authorization_code?: string;
  oauth_token?: string;
  oauth_verifier?: string;
}
