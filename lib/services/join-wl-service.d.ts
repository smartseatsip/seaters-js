/// <reference path="../../node_modules/typescript/lib/lib.d.ts" />
import { SessionService } from './session-service';
import { WlService } from './wl-service';
export declare class JoinWlService {
    private wlService;
    private sessionService;
    private overlay;
    private modal;
    private iframe;
    constructor(wlService: WlService, sessionService: SessionService);
    /**
     * Check for required field
     * @param value
     * @returns {boolean}
     */
    private validateRequired(value);
    /**
     * Hide all form field errors
     */
    private resetFormErrors();
    /**
     * Display a form field error
     * @param field
     * @param error
     */
    private showFieldError(field, error);
    /**
     * Client side form validation
     * @param validationErrors
     */
    private showFormErrors(validationErrors);
    private onEscape(callback);
    private showOverlay();
    private hideOverlay();
    private setupOverlay();
    private setupModal();
    private setModalContent(template, style);
    private setupTest();
    private setupTest2();
    /**
     * Show client side login form errors
     * @param email
     * @param password
     * @returns {Array}
     */
    private validateLoginForm(email, password);
    /**
     * Show server side login form errors
     * @param error
     */
    private showFormErrorsApiLogin(error);
    /**
     * Perform login
     */
    private doLogin();
    /**
     *  Setup login
     */
    private setupLogin();
    /**
     * Show client side signup form errors
     * @param email
     * @param password
     * @param firstname
     * @param lastname
     * @returns {Array}
     */
    private validateSignupForm(email, password, firstname, lastname);
    /**
     * Perfor signup
     */
    private doSignup();
    private setupSignup();
    /**
     * Show client side validate form errors
     * @param code
     * @returns {Array}
     */
    private validateEmailValidationForm(code);
    /**
     * Perform email validation
     */
    private doEmailValidation();
    private setupEmailValidation();
    private findByStrsClass(cssClass);
    joinWl(wlId: any): void;
}
