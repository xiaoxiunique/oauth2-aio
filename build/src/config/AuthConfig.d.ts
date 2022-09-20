export interface AuthConfig {
    /**
     * oauth2 client id
     */
    clientId: string;
    /**
     * oauth2 client secret
     */
    clientSecret: string;
    /**
     * oauth2 redirect uri
     */
    redirectUri: string;
    /**
     * oauth2 scopes
     */
    scopes: string[];
}
