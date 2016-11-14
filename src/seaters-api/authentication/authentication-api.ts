import { ApiContext } from '../../api';
import { AuthenticationTokenInput, AuthenticationTokenOutput, UserData } from './token';
import { SignupData } from './signup';


export class AuthenticationApi {

    constructor (private apiContext: ApiContext) {

    }

    token(input: AuthenticationTokenInput): Promise<AuthenticationTokenOutput> {
        return this.apiContext.put<AuthenticationTokenOutput>('/v2/authentication/token', input);
    }

    signup(input: SignupData): Promise<UserData> {
      return this.apiContext.post<UserData>('/auth/signup', input);
    }

}
