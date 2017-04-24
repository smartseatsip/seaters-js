import { SeatersApiContext, SeatersApiException } from '../../seaters-api';
import { Fan } from '../fan';
import {
  UserData,
  SessionToken,
  ResetEmailData,
  SignupData,
  ValidationData,
  AuthenticationTokenInput
} from './authentication-types';

export class AuthenticationApi {

  constructor (private apiContext: SeatersApiContext) {

  }

  token (input: AuthenticationTokenInput): Promise<SessionToken> {
    return this.apiContext.put<any>('/v2/authentication/token', input)
      .then(data => {
        return {
          expirationDate: data.token.expirationDate,
          token: data.token.value
        };// (T)ODO: remove this code when API is adapted
      });
  }

  /**
   * Signs up a new user
   * @param input
   * @returns {any}
   */
  signup (input: SignupData): Promise<UserData> {
    return this.apiContext.post<UserData>('/v2/authentication/signup', input);
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
    return this.apiContext.post<void>('/auth/signup/reset-email', input);
  }

  /**
   * Obtain a seaters ession by passing an oauth code for a given provider
   * Examples that should work are github, facebook. For your specific provider name
   * please refer to a seaters developer.
   */
  loginWithOAuthCode (oauthProvider: string, code: string): Promise<SessionToken> {
    let endpoint = '/login/:oauthProvider';
    let endpointParams = { oauthProvider: oauthProvider };
    let queryParams = { code: code };
    return this.apiContext.get<any>(endpoint, endpointParams, queryParams)
      .then(data => {
        return {
          expirationDate: data.token.expirationDate,
          token: data.token.value
        };
      });
  }

}
