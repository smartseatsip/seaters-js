import { SeatersApi } from '../seaters-api';
import { Fan } from '../seaters-api/fan/fan'
import { SessionToken } from '../seaters-api/authentication/token';
import { Promise } from 'es6-promise';
import * as moment from 'moment';
import {fail} from "assert";

const AUTH_HEADER = 'Authorization';
const AUTH_BEARER = 'SeatersBearer';

export enum SESSION_STRATEGY {
    EXPIRE
}

export class SessionService {

    private currentFan: Fan;

    private sessionStrategy: SESSION_STRATEGY;
    private sessionToken : string = "";

    constructor (
        private api: SeatersApi,
        sessionStrategy?: SESSION_STRATEGY
    ) {
        this.sessionStrategy = sessionStrategy || SESSION_STRATEGY.EXPIRE;
    }

    private applyExpireSessionStrategy (session: SessionToken): void {
        var expiration = moment.utc(session.expirationDate);
        var now = moment();
        console.log(
            'session expires on %s (in %s minutes)',
            session.expirationDate,
            expiration.diff(now, 'minutes')
        );
        setTimeout(
            () => this.doLogout(),
            expiration.diff(now, 'milliseconds')
        );
    }

    private finishLogin (session: SessionToken): Promise<Fan> {
        this.api.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + session.token);
        this.sessionToken = session.token;
        switch (this.sessionStrategy) {
            default: this.applyExpireSessionStrategy(session);
        }
        return this.setCurrentFan();
    }

    private setCurrentFan (): Promise<Fan> {
        return this.api.fan.fan()
        .then(fan => this.currentFan = fan);
    }

    doEmailPasswordLogin (email: string, password: string, mfaToken?: string): Promise<Fan> {
        return this.api.authentication.token({
            emailPasswordCredentials: {
                email: email,
                password: password,
                mfaToken: mfaToken
            }
        }).then((r) => this.finishLogin(r));
    }

    //TODO: handle error case
    doEmailPasswordSignUp (email:string, password: string, firstname: string, lastname: string, language?: string) : Promise<Fan> {
        return this.api.authentication.signup({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            language: language || 'en' //TODO: refer to config setting for default language
        })
        .then(() => this.doEmailPasswordLogin(email, password));
    }

    doEmailValidation (email: string, code: string): Promise<Fan> {
        return this.api.authentication.validate({
            email: email,
            code: code
        }).then(() => this.setCurrentFan());
    }

    doEmailReset (email: string): Promise<void> {
      return this.api.authentication.resetEmail({
        email: email,
        token: this.sessionToken
      });
    }

    doLogout () {
        console.log('[SessionService] doLogout');//DEBUG
        this.api.unsetHeader(AUTH_HEADER);
        this.currentFan = undefined;
        this.sessionToken = undefined;
    }

    whoami () {
        return this.currentFan;
    }

}
