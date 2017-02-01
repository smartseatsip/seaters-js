import { ApiContext } from '../../api';
import { UserData, SessionToken, ResetEmailData, SignupData, ValidationData, AuthenticationTokenInput } from './authentication-types';

export class AuthenticationApi {

    constructor (private apiContext: ApiContext) {

    }

    token(input: AuthenticationTokenInput): Promise<SessionToken> {
        return this.apiContext.put<any>('/v2/authentication/token', input)
        .then(data => {
          return {
            expirationDate: data.token.expirationDate,
            token: data.token.value
          };//TODO: remove this code when API is adapted
        });
    }

  /**
   * Signs up a new user
   * @param input
   * @returns {any}
     */
    signup(input: SignupData): Promise<UserData> {
      return this.apiContext.post<UserData>('/v2/authentication/signup', input);
    }

  /**
   * Validates a newly created user
   * @param input
   * @returns {any}
     */
    validate(input: ValidationData) : Promise<void> {
      return this.apiContext.put<void>('/auth/validate', input);
    }

    /**
     *
     * @param input
     * @returns {any}
     */
    resetEmail(input: ResetEmailData) : Promise <void> {
      return this.apiContext.post<void>('/auth/signup/reset-email', input);
    }

}
