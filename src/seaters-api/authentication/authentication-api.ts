import { ApiContext } from '../../api';
import { authentication } from './authentication-types';

export class AuthenticationApi {

    constructor (private apiContext: ApiContext) {

    }

    token(input: authentication.AuthenticationTokenInput): Promise<authentication.SessionToken> {
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
    signup(input: authentication.SignupData): Promise<authentication.UserData> {
      return this.apiContext.post<authentication.UserData>('/v2/authentication/signup', input);
    }

  /**
   * Validates a newly created user
   * @param input
   * @returns {any}
     */
    validate(input: authentication.ValidationData) : Promise<void> {
      return this.apiContext.put<void>('/auth/validate', input);
    }

    /**
     *
     * @param input
     * @returns {any}
     */
    resetEmail(input: authentication.ResetEmailData) : Promise <void> {
      return this.apiContext.post<void>('/auth/signup/reset-email', input);
    }

}
