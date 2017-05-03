import { PhoneNumber } from '../fan';

export interface SignupData {
  language: string;
  email: string;
  lastName: string;
  firstName: string;
  password: string;
}

export type ValidationData = EmailValidationData | MobilePhoneValidationData;
export interface EmailValidationData {
  code: string;
  email: string;
}

export interface MobilePhoneValidationData {
  code: string;
  mobile: PhoneNumber;
}

export interface ResetEmailData {
  email: string;
  token: string;
}

/**
 * Relogin using a valid session token
 */
export interface SessionTokenCredentials {

  mfaToken?: string;
  accessToken: string;

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
  token: string;

}

/**
 * User information for the authenticated user
 */
export interface UserData {

  facebookId?: string;
  mobilePhoneNumber?: PhoneNumber;
  email: string;
  roles: string[];
  locale: string;
  name: {
    firstName: string,
    lastName: string
  };

}

/**
 * Email-Password login credentials
 */
export interface EmailPasswordCredentials {
  email: string;
  password: string;
  mfaToken?: string;
}

/**
 * Refresh token login credentials
 */
export interface RefreshTokenCredentials {
  token: string;
  mfaToken?: string;
}

/**
 * Long-Term token login credentials
 */
export interface StoredTokenCredentials {
  token: string;
  mfaToken?: string;
}

/**
 * The result from a successful authentication
 */
export interface AuthenticationSuccess {
  token: {
    value: string,
    expirationDate: string
  };
  userData: UserData;
}
