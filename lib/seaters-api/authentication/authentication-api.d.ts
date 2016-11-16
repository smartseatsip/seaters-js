import { ApiContext } from '../../api';
import { AuthenticationTokenInput, AuthenticationTokenOutput, UserData } from './token';
import { SignupData, ValidationData } from './signup';
export declare class AuthenticationApi {
    private apiContext;
    constructor(apiContext: ApiContext);
    token(input: AuthenticationTokenInput): Promise<AuthenticationTokenOutput>;
    /**
     * Signs up a new user
     * @param input
     * @returns {any}
       */
    signup(input: SignupData): Promise<UserData>;
    /**
     * Validates a newly created user
     * @param input
     * @returns {any}
       */
    validate(input: ValidationData): Promise<UserData>;
}
