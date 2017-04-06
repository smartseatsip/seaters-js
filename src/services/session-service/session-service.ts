import { SeatersApi, SeatersApiException, seatersExceptionV1MessageMapper } from '../../seaters-api';
import { session } from './session-types';
import { Promise } from 'es6-promise';
import * as moment from 'moment';
import { MobilePhoneValidationData } from '../../seaters-api/authentication';

const AUTH_HEADER = 'Authorization';
const AUTH_BEARER = 'SeatersBearer';

export enum VALIDATION_ERRORS {
    WRONG_VALIDATION_CODE
}

export enum SESSION_STRATEGY {
    EXPIRE
}

export class SessionService {

    private currentFan: session.Fan;

    private sessionStrategy: SESSION_STRATEGY;
    private sessionToken : string = "";

    constructor (
        private seatersApi: SeatersApi,
        sessionStrategy?: SESSION_STRATEGY
    ) {
        this.sessionStrategy = sessionStrategy || SESSION_STRATEGY.EXPIRE;
    }

    private applyExpireSessionStrategy (session: session.SessionToken): void {
        //TODO: replace moment with smaller lib or embed needed functionality
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

    private finishLogin (session: session.SessionToken): Promise<session.Fan> {
        this.seatersApi.apiContext.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + session.token);
        this.sessionToken = session.token;
        switch (this.sessionStrategy) {
            default: this.applyExpireSessionStrategy(session);
        }
        return this.setCurrentFan();
    }

    private setCurrentFan (): Promise<session.Fan> {
        return this.seatersApi.fan.fan()
        .then(fan => this.currentFan = fan);
    }

    public updateCurrentFan (fan : session.Fan): Promise<session.Fan> {
        this.currentFan = fan;
        return Promise.resolve<session.Fan>(this.currentFan);
    }

    doEmailPasswordLogin (email: string, password: string, mfaToken?: string): Promise<session.Fan> {
        return this.seatersApi.authentication.token({
            emailPasswordCredentials: {
                email: email,
                password: password,
                mfaToken: mfaToken
            }
        }).then((r) => this.finishLogin(r));
    }

    //TODO: handle error case
    doEmailPasswordSignUp (email:string, password: string, firstname: string, lastname: string, language?: string) : Promise<session.Fan> {
        return this.seatersApi.authentication.signup({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            language: language || 'en' //TODO: refer to config setting for default language
        })
        .then(() => this.doEmailPasswordLogin(email, password));
    }

    private validationMessageMapper = seatersExceptionV1MessageMapper({
        'Wrong validation code': VALIDATION_ERRORS.WRONG_VALIDATION_CODE
    });

    /**
     * Validate an email by providing a confirmation code
     * 
     * @param email The email that you want to validate
     * @param code The code that validates the email
     * @returns a Promise that resolves with an updated fan or rejects with a VALIDATION_ERRORS
     * @see VALIDATION_ERRORS
     */
    doEmailValidation (email: string, code: string): Promise<session.Fan> {
        return this.seatersApi.authentication.validate({
            email: email,
            code: code
        })
        .then(() => this.setCurrentFan())
        .catch(this.validationMessageMapper);
    }

    /**
     * Validate a phone number by providing a confirmation code
     * 
     * @param phone The phone number that you want to validate
     * @param code The code that validates the email
     * @returns a Promise that resolves with an updated fan or rejects with a VALIDATION_ERRORS
     * @see VALIDATION_ERRORS
     */
    doMobilePhoneNumberValidation (phone: session.PhoneNumber, code: string): Promise<session.Fan> {
        return this.seatersApi.authentication.validate(<MobilePhoneValidationData> {
            mobile: phone,
            code: code
        }).catch(this.validationMessageMapper);
    }

    doEmailReset (email: string): Promise<void> {
      return this.seatersApi.authentication.resetEmail({
        email: email,
        token: this.sessionToken
      });
    }

    doOAuthCodeLogin (oauthProvider: string, code: string) : Promise<session.Fan> {
      return this.seatersApi.authentication.loginWithOAuthCode(oauthProvider, code)
        .then((r) => this.finishLogin(r));
    }

    doLogout () {
        console.log('[SessionService] doLogout');//DEBUG
        this.seatersApi.apiContext.unsetHeader(AUTH_HEADER);
        this.currentFan = undefined;
        this.sessionToken = undefined;
    }

    whoami () {
        return this.currentFan;
    }

}
