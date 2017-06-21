import { SeatersApi, SeatersApiException, seatersExceptionV1MessageMapper } from '../../seaters-api';
import { session } from './session-types';
import { MobilePhoneValidationData, AuthenticationSuccess } from '../../seaters-api/authentication';

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
  private sessionToken: string = '';

  private validationMessageMapper = seatersExceptionV1MessageMapper({
    'Wrong validation code': VALIDATION_ERRORS.WRONG_VALIDATION_CODE
  });

  constructor (
    private seatersApi: SeatersApi,
    sessionStrategy?: SESSION_STRATEGY
  ) {
    this.sessionStrategy = sessionStrategy || SESSION_STRATEGY.EXPIRE;
  }

  /**
   * Configure the given session to be used. This method is intended for transitional
   * phase where the SDK is not the one doing the login process (Seaters FanWebApp)
   *
   * @param session a valid session that is not expired
   * @param fan a valid fan object
   */
  public configureSession (session: session.SessionToken, fan: session.Fan) {
    this.setSession(session);
    this.currentFan = fan;
  }

  public updateCurrentFan (fan: session.Fan): Promise<session.Fan> {
    this.currentFan = fan;
    return Promise.resolve<session.Fan>(this.currentFan);
  }

  doEmailPasswordLogin (email: string, password: string, mfaToken?: string): Promise<session.Session> {
    return this.seatersApi.authentication.emailPasswordLogin({
      email: email,
      password: password,
      mfaToken: mfaToken
    }).then((r) => this.finishLogin(r));
  }

  doStoredTokenLogin (storedToken: string, mfaToken?: string): Promise<session.Session> {
    return this.seatersApi.authentication.storedTokenLogin({
      token: storedToken,
      mfaToken: mfaToken
    }).then((r) => this.finishLogin(r));
  }

  doOAuthCodeLogin (oauthProvider: string, code: string): Promise<session.Session> {
    return this.seatersApi.authentication.loginWithOAuthCode(oauthProvider, code)
      .then((r) => this.finishLogin(r));
  }

  doLogout () {
    console.log('[SessionService] doLogout'); // DEBUG
    this.seatersApi.apiContext.unsetHeader(AUTH_HEADER);
    this.currentFan = undefined;
    this.sessionToken = undefined;
  }

  // TODO: handle error case
  doEmailPasswordSignUp (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    language?: string
  ): Promise<session.Session> {
    return this.seatersApi.authentication.signup({
      email: email,
      password: password,
      firstName: firstname,
      lastName: lastname,
      language: language || 'en' // TODO: refer to config setting for default language
    })
      .then(() => this.doEmailPasswordLogin(email, password));
  }

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
    return this.seatersApi.authentication.validate({
      mobile: phone,
      code: code
    } as MobilePhoneValidationData).catch(this.validationMessageMapper);
  }

  doEmailReset (email: string): Promise<void> {
    return this.seatersApi.authentication.resetEmail({
      email: email,
      token: this.sessionToken
    });
  }

  whoami () {
    return this.currentFan;
  }

  private applyExpireSessionStrategy (session: session.SessionToken): void {
    let diff = new Date(session.expirationDate).getTime() - new Date().getTime();
    console.log(
      'session expires on %s (in %s minutes)',
      session.expirationDate,
      Math.round(diff / (1000 * 60))
    );
    setTimeout(
      () => this.doLogout(),
      diff
    );
  }

  private finishLogin (authSuccess: AuthenticationSuccess): Promise<session.Session> {
    this.setSession({
      expirationDate: authSuccess.token.expirationDate,
      token: authSuccess.token.value
    });
    return this.setCurrentFan().then((identity) => {
      return {
        active: true,
        expiresOn: authSuccess.token.expirationDate,
        identity: identity,
        token: authSuccess.token.value
      };
    });
  }

  private setSession (session: session.SessionToken): void {
    this.seatersApi.apiContext.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + session.token);
    this.sessionToken = session.token;
    switch (this.sessionStrategy) {
      default:
        this.applyExpireSessionStrategy(session);
    }
  }

  private setCurrentFan (): Promise<session.Fan> {
    return this.seatersApi.fan.fan()
      .then(fan => this.currentFan = fan);
  }

  private doRefreshTokenLogin (refreshToken: string, mfaToken?: string): Promise<session.Session> {
    return this.seatersApi.authentication.refreshTokenLogin({
      token: refreshToken,
      mfaToken: mfaToken
    }).then((r) => this.finishLogin(r));
  }

}
