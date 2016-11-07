/**
 * Input for `PUT /api/v2/authentication/token`
 */
export interface AuthenticationTokenInput {
    emailPasswordCredentials?: EmailPasswordCredentials;
    facebookCredentials?: FacebookCredentials;
    sessionTokenCredentials?: SessionTokenCredentials;
    clientInfo?: ClientInfo;
    storedTokenCredentials?: StoredTokenCredentials;
}
/**
 * Login via email-password combination
 */
export interface EmailPasswordCredentials {
    mfaToken?: string;
    password: string;
    email: string;
}
/**
 * Login via facebook oauth token
 */
export interface FacebookCredentials {
    mfaToken?: string;
    accessToken: string;
}
/**
 * Relogin using a valid session token
 */
export interface SessionTokenCredentials {
    mfaToken?: string;
    accessToken: string;
}
/**
 * Information about the connecting client
 */
export interface ClientInfo {
    /**
     * Seaters application
     */
    type: string;
    /**
     * Version of the application
     */
    version: string;
}
/**
 * Login using a stored long term token
 */
export interface StoredTokenCredentials {
    mfaToken: string;
    token: string;
}
export interface AuthenticationTokenOutput {
    userData: UserData;
    token: SessionToken;
}
/**
 * 30-minute lasting session token that can be used in the Seaters authentication header
 */
export interface SessionToken {
    /**
     * date when the token expires, ISO date format
     */
    expirationDate: string;
    /**
     * session token value to be used in Seaters authentication header
     */
    value: string;
}
/**
 * User information for the authenticated user
 */
export interface UserData {
    facebookId?: string;
    mobilePhoneNumber?: {
        countryCallingCode: string;
        localNumber: string;
    };
    email: string;
    roles: string[];
    locale: string;
    name: {
        firstName: string;
        lastName: string;
    };
}