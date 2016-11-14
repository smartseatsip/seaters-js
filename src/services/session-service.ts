import { SeatersApi } from '../seaters-api';
import { AuthenticationTokenOutput, UserData, SessionToken } from '../seaters-api/authentication/token';
import { Promise } from 'es6-promise';

const AUTH_HEADER = 'Authentication';
const AUTH_BEARER = 'Seaters';

export enum SESSION_STRATEGY {
    AUTORENEW, EXPIRE
}

export class SessionService {

    private currentUser: UserData;

    constructor (
        private api: SeatersApi,
        private sessionStrategy?: SESSION_STRATEGY
    ) {
            if (!sessionStrategy) {
                this.sessionStrategy = SESSION_STRATEGY.EXPIRE;
            }
    }

    doEmailPasswordLogin (email: string, password: string, mfaToken?: string): Promise<UserData> {
        return this.api.authentication.token({
            emailPasswordCredentials: {
                email: email,
                password: password,
                mfaToken: mfaToken
            }
        }).then(this.finishLogin);
    }

    private applyAutorenewSessionStrategy (token: SessionToken) {
        console.log('autorenewing session on %s', token.expirationDate);
    }

    private applyExpireSessionStrategy (token: SessionToken) {
        console.log('session expires on %s', token.expirationDate);
    }

    private finishLogin (tokenOutput: AuthenticationTokenOutput) {
        this.api.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + tokenOutput.token.value);
        this.currentUser = tokenOutput.userData;
        var token = tokenOutput.token;
        switch (this.sessionStrategy) {
            case SESSION_STRATEGY.AUTORENEW:
                this.applyAutorenewSessionStrategy(token); break;
            default: this.applyExpireSessionStrategy(token);
        }
        return tokenOutput.userData;
    }

    doLogout () {
        this.api.unsetHeader(AUTH_HEADER);
        this.currentUser = undefined;
    }

    whoami () {
        return this.currentUser;
    }

}