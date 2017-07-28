import { uuidv4, normalizeLondonTimezoneDate } from '../util';
import { SeatersApi, SeatersApiException, seatersExceptionV1MessageMapper } from '../../seaters-api';
import { session } from './session-types';
import { MobilePhoneValidationData, AuthenticationSuccess } from '../../seaters-api/authentication';

const AUTH_HEADER = 'Authorization';
const AUTH_BEARER = 'SeatersBearer';
const MS_TO_EXTEND_BEFORE_SESSION_EXPIRES = 60;

export enum VALIDATION_ERRORS {
  WRONG_VALIDATION_CODE
}

export enum SESSION_STRATEGY {
  EXPIRE, EXTEND
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
    this.sessionStrategy = sessionStrategy || SESSION_STRATEGY.EXTEND;
  }

  /**
   * Configure the given session to be used. This method is intended for transitional
   * phase where the SDK is not the one doing the login process (Seaters FanWebApp)
   *
   * @param session a valid session that is not expired
   * @param fan a valid fan object
   */
  configureSession (session: session.SessionToken, fan: session.Fan) {
    this.setSession(session);
    this.currentFan = fan;
  }

  /**
   * Manually configure the fan (in case the current fan was changed / retrieved externally)
   *
   * @param fan latest fan object
   */
  updateCurrentFan (fan: session.Fan): Promise<session.Fan> {
    this.currentFan = fan;
    return Promise.resolve<session.Fan>(this.currentFan);
  }

  /**
   * Log in using an email/password
   *
   * @param email valid email or seaters username
   * @param password plain text password
   * @param mfaToken authenticator token
   */
  doEmailPasswordLogin (email: string, password: string, mfaToken?: string): Promise<session.Session> {
    return this.seatersApi.authentication.emailPasswordLogin({
      email: email,
      password: password,
      mfaToken: mfaToken
    }).then((r) => this.finishLogin(r));
  }

  /**
   * Log in using a stored token (long term validity)
   *
   * @param storedToken long term token
   * @param mfaToken authenticator token
   */
  doStoredTokenLogin (storedToken: string, mfaToken?: string): Promise<session.Session> {
    return this.seatersApi.authentication.storedTokenLogin({
      token: storedToken,
      mfaToken: mfaToken
    }).then((r) => this.finishLogin(r));
  }

  /**
   * @deprecated Use doOAuthCodeLoginV2 instead to retrieve the session
   * @param oauthProvider
   * @param code
   * @returns {Promise<TResult2|TResult1>}
   */
  doOAuthCodeLogin (oauthProvider: string, code: string): Promise<session.Fan> {
    console.warn('[SessionService] doOAuthCodeLogin is deprecated and will be removed soon, use doOAuthCodeLoginV2 instead to retrieve the session');
    return this.seatersApi.authentication.loginWithOAuthCode(oauthProvider, code)
      .then((r) => this.finishLogin(r))
      .then((session) => session.identity);
  }

  doOAuthCodeLoginV2 (oauthProvider: string, code: string): Promise<session.Session> {
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
      language: language || 'en'
    })
      .then(() => this.doEmailPasswordLogin(email, password));
  }

  doEmailSignUp (
    email: string,
    fanGroupId: string,
    language?: string
  ): Promise<session.Session> {
    return this.seatersApi.authentication.signupAnonymous({
      email: email,
      fanGroupId: fanGroupId,
      language: language || 'en'
    })
      .then((authSuccess) => this.finishLogin(authSuccess));
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

  /**
   * Change the email associated to the current user
   * @param email new email address
   */
  doEmailReset (email: string): Promise<void> {
    return this.seatersApi.authentication.resetEmail({
      email: email,
      token: this.sessionToken
    });
  }

  checkStoredTokenValidity (authToken: session.StoredToken, applicationName: string, deviceId?: string, applicationId?: string): boolean {
    // ensure the expiration date is in the future
    let expirationDate = new Date(normalizeLondonTimezoneDate(authToken.expirationDate));
    let diff = (expirationDate.getTime() - new Date().getTime());
    if (diff < 0) return false;
    // check if application name, device id and application id matches
    if (authToken.applicationName !== applicationName) return false;
    if (deviceId && authToken.deviceId !== deviceId) return false;
    if (applicationId && authToken.applicationId !== applicationId) return false;
    // the token is valid
    return true;
  }

  /**
   * Checks if there are any valid stored tokens and returns the first one. If there are none
   * it will create a new token and return this
   * @param applicationName the name of the application, e.g. "Seaters Embedded"
   * @param deviceId defaults to "SDK-device-<random UUID>"
   * @param applicationId defaults to "SDK-app-<random UUID>"
   */
  obtainStoredToken (applicationName: string, deviceId?: string, applicationId?: string): Promise<session.StoredToken> {
    if (!applicationName) {
      throw new Error('[SessionService] applicationName is mandatory to obtain a stored token');
    }
    return this.seatersApi.authentication.getStoredTokens()
      .then((storedTokens) => {
        // find the existing stored token, using the provided data to match
        let storedToken = storedTokens.find((t) => this.checkStoredTokenValidity(t, applicationName, deviceId, applicationId));
        if (storedToken) {
          return storedToken;
        } else {
          // if no acceptable token was found, create a new token
          let input = {
            applicationName: applicationName,
            deviceId: deviceId || ('SDK-device-' + uuidv4()),
            applicationId: applicationId || ('SDK-application-' + uuidv4())
          };
          return this.seatersApi.authentication.createStoredToken(input);
        }
      });
  }

  /**
   * Return the current logged in fan
   */
  whoami (): session.Fan {
    return this.currentFan;
  }

  private waitUntilMillisBeforeSessionExpires (session: session.SessionToken, msBefore: number): Promise<any> {
    let expirationDate = normalizeLondonTimezoneDate(session.expirationDate);
    let diff = new Date(expirationDate).getTime() - new Date().getTime();
    console.log(
      'session expires on %s (in %s minutes)',
      expirationDate,
      Math.round(diff / (1000 * 60))
    );
    return new Promise((resolve, reject) => setTimeout(() => resolve(), diff - msBefore));
  }

  private applyExpireSessionStrategy (session: session.SessionToken): void {
    this.waitUntilMillisBeforeSessionExpires(session, 0)
      .then(() => {
        console.log('[SessionService] session expired');
        this.doLogout();
      });
  }

  private applyExtendSessionStrategy (session: session.SessionToken): void {
    this.waitUntilMillisBeforeSessionExpires(session, MS_TO_EXTEND_BEFORE_SESSION_EXPIRES)
      .then(() => {
        console.log('[SessionService] session about to expire, renewing');
        this.doRefreshTokenLogin(session.token);
      });
  }

  private finishLogin (authSuccess: AuthenticationSuccess): Promise<session.Session> {
    let expirationDate = normalizeLondonTimezoneDate(authSuccess.token.expirationDate);
    this.setSession({
      expirationDate: expirationDate,
      token: authSuccess.token.value
    });
    return this.setCurrentFan().then((identity) => {
      return {
        expiresOn: expirationDate,
        identity: identity,
        token: authSuccess.token.value
      };
    });
  }

  private setSession (session: session.SessionToken): void {
    this.seatersApi.apiContext.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + session.token);
    this.sessionToken = session.token;
    switch (this.sessionStrategy) {
      case SESSION_STRATEGY.EXTEND:
        return this.applyExtendSessionStrategy(session);
      case SESSION_STRATEGY.EXPIRE:
        return this.applyExpireSessionStrategy(session);
      default:
        throw new Error('Unknown session strategy: ' + JSON.stringify(this.sessionStrategy));
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
