import { SessionService } from '../session-service';
import { ModalService } from '../modal-service';
export declare class JWLFlowService {
    private modalService;
    private sessionService;
    constructor(modalService: ModalService, sessionService: SessionService);
    private enableButton(btnId, enabled);
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
     * Show client side signup form errors
     * @param email
     * @param password
     * @param firstname
     * @param lastname
     * @returns {Array}
     */
    private validateSignupForm(email, password, firstname, lastname);
    /**
     * Perform signup
     */
    private doSignup();
    /**
     * Show client side validate form errors
     * @param code
     * @returns {Array}
     */
    private validateEmailValidationForm(code);
    /**
       * Perform email validation
       */
    private doEmailValidation(userData);
    setupEmailValidation(userData: any): void;
    setupSignup(): void;
    /**
     *  Setup login
     */
    setupLogin(): void;
    startFlow(wlId: string): void;
}
