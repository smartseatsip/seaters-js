import { ApiContext } from '../../api';
import { AuthenticationTokenInput, AuthenticationTokenOutput, UserData } from './token';
import { SignupData, ValidationData } from './signup';

export class AuthenticationApi {

    constructor (private apiContext: ApiContext) {

    }

    token(input: AuthenticationTokenInput): Promise<AuthenticationTokenOutput> {
        return this.apiContext.put<AuthenticationTokenOutput>('/v2/authentication/token', input);
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
    validate(input: ValidationData) : Promise<UserData> {
      return this.apiContext.put<UserData>('/auth/validate', input);
    }

}
