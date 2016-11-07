import { ApiContext } from '../../api';
import { AuthenticationTokenInput, AuthenticationTokenOutput } from './token';
export declare class AuthenticationApi {
    private apiContext;
    constructor(apiContext: ApiContext);
    token(input: AuthenticationTokenInput): Promise<AuthenticationTokenOutput>;
}
