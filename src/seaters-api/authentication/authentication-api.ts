import { ApiContext } from '../../api';
import { AuthenticationTokenInput, AuthenticationTokenOutput } from './token';


export class AuthenticationApi {

    constructor (private apiContext: ApiContext) {

    }

    token(input: AuthenticationTokenInput): Promise<AuthenticationTokenOutput> {
        return this.apiContext.put<AuthenticationTokenOutput>('/v2/authentication/token', input);
    }

}