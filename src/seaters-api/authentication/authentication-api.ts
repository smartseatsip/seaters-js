import { ApiContext } from '../../api';
import { AuthenticationTokenInput, UserData, SessionToken } from './token';
import { SignupData, ValidationData } from './signup';

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
      return this.apiContext.post<UserData>('/auth/signup', input);
    }

  /**
   * Validates a newly created user
   * @param input
   * @returns {any}
     */
    validate(input: ValidationData) : Promise<void> {
      return this.apiContext.put<void>('/auth/validate', input);
    }

}
