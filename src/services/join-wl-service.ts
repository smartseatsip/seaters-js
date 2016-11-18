/// <reference path="../../node_modules/typescript/lib/lib.d.ts" />

import { SessionService } from './session-service';
import { WlService } from './wl-service';
import { Promise } from 'es6-promise';

declare var require: any;

export class JoinWlService {

    private overlay: HTMLElement;

    private modal: HTMLElement;

    private iframe: HTMLIFrameElement;

    constructor (
        private wlService: WlService,
        private sessionService: SessionService
    ) {
    }

    /**
     * Check for required field
     * @param value
     * @returns {boolean}
     */
    private validateRequired(value:string) {
      return value!=undefined && value.trim().length > 0;
    }

    /**
     * Hide all form field errors
     */
    private resetFormErrors() {
      //Reset all errors
      var errorFields = this.modal.getElementsByClassName('sl-input-error');
      for (var i=0;i<errorFields.length;i++){
        (<HTMLElement>errorFields[i]).style.display = 'none';
      }
    }

    /**
     * Display a form field error
     * @param field
     * @param error
     */
    private showFieldError(field:string, error:string) {
      var el = this.modal.getElementsByClassName(field)[0];
      el.innerHTML = error;
      (<HTMLElement>el).style.display = 'block';
    }

    /**
     * Client side form validation
     * @param validationErrors
     */
    private showFormErrors(validationErrors) {
      //set errors that apply
      for (var i=0; i < validationErrors.length; i++) {
        var field = validationErrors[i].field+'-error';
        var error = validationErrors[i].error;
        this.showFieldError(field,error);
      }
    }

    private onEscape (callback: () => void): () => void {
        function escapeListener (evt: KeyboardEvent): void {
            if (evt.key == 'Escape') {
                callback();
                evt.preventDefault();
            }
        }

        function removeEscapeListener (): void {
            window.removeEventListener('keydown', escapeListener, true);
        }

        window.addEventListener('keydown', escapeListener, true);

        return removeEscapeListener;
    }

    private showOverlay () {
        console.log('showing seaters overlay');
        this.overlay.style.display = 'block';
    }

    private hideOverlay () {
        console.log('hiding seaters overlay');
        this.overlay.style.display = 'none';
        this.modal.innerHTML = '';
    }

    private setupOverlay () {
        if (this.overlay !== undefined) {
            return this.overlay;
        }

        this.overlay = document.createElement('div');
        this.overlay.id = 'seaters-overlay';
        this.overlay.style.position = 'fixed';
        this.overlay.style.left = '0px';
        this.overlay.style.right = '0px';
        this.overlay.style.top = '0px';
        this.overlay.style.bottom = '0px';
        this.overlay.style.backgroundColor = 'rgba(30, 30, 30, 0.3)';
        this.overlay.style.display = 'none';

        this.onEscape(() => this.hideOverlay());

        document.getElementsByTagName('body')[0].appendChild(this.overlay);
        return this.overlay;
    }


    private setupModal () {
        if (this.modal !== undefined) {
            return this.modal;
        }

        this.modal = document.createElement('div');
        this.modal.id = 'seaters-modal';
        this.modal.style.marginLeft = 'auto 50%';
        this.modal.style.marginRight = 'auto 50%';
        this.modal.style.minHeight = '300px';
        this.modal.style.backgroundColor = '#fff';
        this.modal.style.borderRadius = '5px';
        this.modal.style.boxShadow = '2px 2px 5px #888888';
        this.modal.style.width = '332px';
        this.modal.style.margin = '0px auto';
        this.modal.style.marginTop = '200px';
        this.modal.style.padding = '8px';

        this.overlay.appendChild(this.modal);

        return this.modal;
    }

    private setModalContent (template: string, style: string) {
        this.modal.innerHTML = template;
        var styleElement = <HTMLStyleElement>document.createElement('style');
        styleElement.innerHTML = style;
        this.modal.appendChild(styleElement);
    }

    private setupTest () {
        this.setModalContent(
            require('./join-wl/test.html'),
            require('./join-wl/test.css')
        );
        var joinBtn = <HTMLButtonElement>this.findByStrsClass('strs-join-button');
        joinBtn.onclick = () => this.setupTest2();
    }

    private setupTest2 () {
        this.setModalContent(
            require('./join-wl/test2.html'),
            require('./join-wl/test2.css')
        );
    }


    /**
     * Show client side login form errors
     * @param email
     * @param password
     * @returns {Array}
     */
    private validateLoginForm(email:string, password:string) {
      var validationErrors = [];

      //Test email
      if(!this.validateRequired(email)) {
        //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-email', error:'Mandatory'});
      }

      //Test password
      if(!this.validateRequired(password)) {
        //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-password', error:'Mandatory'});
      }
      return validationErrors;
    }

    /**
     * Show server side login form errors
     * @param error
     */
    private showFormErrorsApiLogin(error) {
      //Test for detailed errors
      if (error.details.length > 0) {
        if (error.details[0].field === 'emailPasswordCredentials.email'){
          this.showFieldError('sl-email-error', error.details[0].error.defaultMessage);
        }
      }
      //Test for general error
      else {
        this.showFieldError('sl-email-error',error.error.defaultMessage);
      }
    }

    /**
     * Perform login
     */
    private doLogin() {
      var _this = this;
      //Reset form errors
      this.resetFormErrors();

      //Get fields
      var email = (<HTMLInputElement>this.modal.getElementsByClassName("sl-email")[0]).value;
      var password = (<HTMLInputElement>this.modal.getElementsByClassName("sl-password")[0]).value;

      //..and do client validation first
      var validationErrors = this.validateLoginForm(email, password);
      if (validationErrors.length > 0)
        this.showFormErrors(validationErrors);
      else {
        //Login
        this.sessionService.doEmailPasswordLogin(email, password)
        .then(function(res) {
          alert("You have sucessfully logged in");
        }, function(err) {

          if(err instanceof Error) {
            //$scope.error = err.stack;
          } else {
            //$scope.error = err;
          }
          _this.showFormErrorsApiLogin(err);
        });

      }
    }

    /**
     *  Setup login
     */
    private setupLogin () {
      this.setModalContent(
        require('./join-wl/login.html'),
        require('./join-wl/app.css')
      );
      var loginBtn = <HTMLButtonElement>this.findByStrsClass('sl-btn-login');
      loginBtn.onclick = () => this.doLogin();
    }

    /**
     * Show client side signup form errors
     * @param email
     * @param password
     * @param firstname
     * @param lastname
     * @returns {Array}
     */
    private validateSignupForm(email: string, password:string, firstname:string, lastname:string) {
      var validationErrors = [];

      //Test email
      if(!this.validateRequired(email)) {
        //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-email', error:'Mandatory'});
      }

      //Test password
      if(!this.validateRequired(password)) {
        //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-password', error:'Mandatory'});
      }

      //Test firstname
      if(!this.validateRequired(firstname)) {
        //validationErrors.push({field:'sl-firstname', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-firstname', error:'Mandatory'});
      }

      //Test lastname
      if(!this.validateRequired(lastname)) {
        //validationErrors.push({field:'sl-lastname', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-lastname', error:'Mandatory'});
      }
      return validationErrors;
    }

    /**
     * Perfor signup
     */
    private doSignup() {
      var _this = this;

      //Reset form errors
      this.resetFormErrors();

      //Get fields
      var email = (<HTMLInputElement>this.modal.getElementsByClassName("sl-email")[0]).value;
      var password = (<HTMLInputElement>this.modal.getElementsByClassName("sl-password")[0]).value;
      var firstname = (<HTMLInputElement>this.modal.getElementsByClassName("sl-firstname")[0]).value;
      var lastname = (<HTMLInputElement>this.modal.getElementsByClassName("sl-lastname")[0]).value;

      //..and do client validation first
      var validationErrors = this.validateSignupForm(email, password, firstname, lastname);
      if (validationErrors.length > 0)
        this.showFormErrors(validationErrors);
      else {
        //Login
        this.sessionService.doEmailPasswordSignUp(email, password, firstname, lastname)
          .then(function(res) {
            alert("You have sucessfully signed up");
          }, function(err) {

            if(err instanceof Error) {
              //$scope.error = err.stack;
            } else {
              //$scope.error = err;
            }

            _this.showFieldError('sl-email-error',err.message);
          });
      }
    }

    private setupSignup () {
      this.setModalContent(
        require('./join-wl/signup.html'),
        require('./join-wl/app.css')
      );
      var signupBtn = <HTMLButtonElement>this.findByStrsClass('sl-btn-signup');
      signupBtn.onclick = () => this.doSignup();
    }

    /**
     * Show client side validate form errors
     * @param code
     * @returns {Array}
     */
    private validateEmailValidationForm(code:string) {
      var validationErrors = [];

      //Test email
      if(!this.validateRequired(code)) {
        //validationErrors.push({field:'sl-confirmation-code', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-confirmation-code', error:'Mandatory'});
      }
      return validationErrors;
    }

    /**
     * Perform email validation
     */
    private doEmailValidation() {
      var _this = this;

      //Reset form errors
      this.resetFormErrors();

      //Get fields
      var confirmationCode = (<HTMLInputElement>this.modal.getElementsByClassName("sl-confirmation-code")[0]).value;
      var email = "test@test.com";

      //..and do client validation first
      var validationErrors = this.validateEmailValidationForm(confirmationCode);
      if (validationErrors.length > 0)
        this.showFormErrors(validationErrors);
      else {
        //Login
        this.sessionService.doValidation(email, confirmationCode)
          .then(function(res) {
            alert("You have confirmed your email");
          }, function(err) {

            if(err instanceof Error) {
              //$scope.error = err.stack;
            } else {
              //$scope.error = err;
            }

            //For now, add general always show this error, as error info is in different format coming back
            _this.showFieldError('sl-confirmation-code-error',"Wrong validation code");
          });

      }
    }

    private setupEmailValidation () {
      this.setModalContent(
        require('./join-wl/validate.html'),
        require('./join-wl/app.css')
      );
      var validateEmailBtn = <HTMLButtonElement>this.findByStrsClass('sl-btn-validate');
      validateEmailBtn.onclick = () => this.doEmailValidation();
    }

    private findByStrsClass (cssClass: string) {
        return this.modal.getElementsByClassName(cssClass)[0];
    }

    joinWl (wlId) {
        console.log('launching JoinWl popup for %s', wlId);
        this.setupOverlay();
        this.setupModal();
        //this.setupTest();
        this.setupEmailValidation();
        this.showOverlay();
    }

}
