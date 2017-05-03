import { SeatersApiContext, SeatersApiException } from '../../seaters-api';
import { Fan } from '../fan';
import {
  UserData, SessionToken, ResetEmailData, SignupData,
  ValidationData, EmailValidationData, MobilePhoneValidationData,
  EmailPasswordCredentials, StoredTokenCredentials, RefreshTokenCredentials,
  AuthenticationSuccess
} from './authentication-types';

export class AuthenticationApi {

  constructor (private apiContext: SeatersApiContext) {

  }

  /**
   * Login using email-password credentials
   * @param credentials email, password and optionally MFA token
   */
  emailPasswordLogin (credentials: EmailPasswordCredentials): Promise<AuthenticationSuccess> {
    return this.apiContext.put('/v2/authentication/login', credentials);
  }

  /**
   * Login using long-term stored token
   * @param credentials long term stored token and optionally MFA token
   */
  storedTokenLogin (credentials: StoredTokenCredentials): Promise<AuthenticationSuccess> {
    return this.apiContext.put('/v2/authentication/stored-token', credentials);
  }

  /**
   * Extend your session with a refresh token
   * @param credentials Refresh token
   */
  refreshTokenLogin (credentials: RefreshTokenCredentials): Promise<AuthenticationSuccess> {
    return this.apiContext.put('/v2/authentication/refresh-token', credentials);
  }

  /**
   * Signs up a new user
   * @param input
   * @returns {any}
   */
  signup (input: SignupData): Promise<UserData> {
    return this.apiContext.post('/v2/authentication/signup', input);
  }

  /**
   * Validates an email or phone number and marks it as confirmed
   *
   * @param input Either the email or the phone and the confirmation code
   * @returns Promise that resolves with the validated user or rejects with a SeatersApiException
   * @see SeatersApiException
   */
  validate (input: ValidationData): Promise<Fan> {
    return this.apiContext.put('/auth/validate', input);
  }

  /**
   *
   * @param input
   * @returns {any}
   */
  resetEmail (input: ResetEmailData): Promise<void> {
    return this.apiContext.post('/auth/signup/reset-email', input);
  }

  /**
   * Obtain a seaters ession by passing an oauth code for a given provider
   * Examples that should work are github, facebook. For your specific provider name
   * please refer to a seaters developer.
   */
  loginWithOAuthCode (oauthProvider: string, code: string): Promise<AuthenticationSuccess> {
    let endpoint = '/login/:oauthProvider';
    let endpointParams = { oauthProvider: oauthProvider };
    let queryParams = { code: code };
    return this.apiContext.get(endpoint, endpointParams, queryParams);
  }

}
