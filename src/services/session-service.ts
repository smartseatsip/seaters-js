import { SeatersApi } from '../seaters-api';
import { AuthenticationTokenOutput, UserData, SessionToken } from '../seaters-api/authentication/token';
import { Promise } from 'es6-promise';
import * as moment from 'moment';
import {fail} from "assert";

const AUTH_HEADER = 'Authorization';
const AUTH_BEARER = 'SeatersBearer';

export enum SESSION_STRATEGY {
    EXPIRE
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

    private applyExpireSessionStrategy (token: SessionToken) {
        var expiration = moment.utc(token.expirationDate);
        var now = moment();
        console.log('session expires on %s (in %s minutes)',
            token.expirationDate, expiration.diff(now, 'minutes'));
    }

    private finishLogin (tokenOutput: AuthenticationTokenOutput) {
        this.api.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + tokenOutput.token.value);
        this.currentUser = tokenOutput.userData;
        var token = tokenOutput.token;
        switch (this.sessionStrategy) {
            default: this.applyExpireSessionStrategy(token);
        }
        return tokenOutput.userData;
    }

    doEmailPasswordLogin (email: string, password: string, mfaToken?: string): Promise<UserData> {
        return this.api.authentication.token({
            emailPasswordCredentials: {
                email: email,
                password: password,
                mfaToken: mfaToken
            }
        }).then((r) => this.finishLogin(r));
    }

    doLogout () {
        this.api.unsetHeader(AUTH_HEADER);
        this.currentUser = undefined;
    }


    //TODO: user is not logged in yet after signup; need separate verify call first ?
    //TODO: handle error case
    doEmailPasswordSignUp (email:string, password: string, firstname: string, lastname: string, language?: string) : Promise<UserData> {
        return this.api.authentication.signup({
            email:email,
            password:password,
            firstName: firstname,
            lastName: lastname,
            language: language || 'en' //TODO: refer to config setting for default language
        })
    }

    //TODO: proper return of data and/or error case ?
    doValidation (email: string, code: string): Promise<UserData> {
        return this.api.authentication.validate({
            email: email,
            code: code
        })
    }

    whoami () {
        return this.currentUser;
    }

}
