import { AuthDefaultRequest } from "./AuthDefaultRequest";
import { AuthToken } from "../model/AuthToken";
import { AuthCallback } from "../model/AuthCallback";
import { AuthConfig } from "../config";
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
export declare class AuthGoogleRequest extends AuthDefaultRequest {
    constructor(config: AuthConfig);
    protected getAccessToken(authCallBack: AuthCallback): Promise<{
        expiresIn: any;
        scope: any;
        accessToken: any;
        tokenType: any;
        refreshToken: any;
    }>;
    protected getUserInfo(authToken: AuthToken): Promise<GoogleUserInfo>;
    authorize(state: string): string;
    protected userInfoEndpoint(authToken: AuthToken): string;
}
