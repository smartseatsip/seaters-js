import { SessionService } from '../session-service';
import { Promise } from 'es6-promise';
import { ModalService } from '../modal-service';

declare var require: any;

export class JWLFlowService {

    constructor (
        private modalService: ModalService,
        private sessionService: SessionService
    ) {
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
      if(!this.modalService.validateRequired(email)) {
        //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-email', error:'Mandatory'});
      }

      //Test password
      if(!this.modalService.validateRequired(password)) {
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
          this.modalService.showFieldError('sl-email-error', error.details[0].error.defaultMessage);
        }
      }
      //Test for general error
      else {
        this.modalService.showFieldError('sl-email-error',error.error.defaultMessage);
      }
    }

    /**
     * Perform login
     */
    private doLogin() {
      var _this = this;
      //Reset form errors
      this.modalService.resetFormErrors();

      //Get fields
      var email = (<HTMLInputElement>this.modalService.findElementById("sl-email")).value;
      var password = (<HTMLInputElement>this.modalService.findElementById("sl-password")).value;

      //..and do client validation first
      var validationErrors = this.validateLoginForm(email, password);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
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
      if(!this.modalService.validateRequired(email)) {
        //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-email', error:'Mandatory'});
      }

      //Test password
      if(!this.modalService.validateRequired(password)) {
        //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-password', error:'Mandatory'});
      }

      //Test firstname
      if(!this.modalService.validateRequired(firstname)) {
        //validationErrors.push({field:'sl-firstname', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-firstname', error:'Mandatory'});
      }

      //Test lastname
      if(!this.modalService.validateRequired(lastname)) {
        //validationErrors.push({field:'sl-lastname', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-lastname', error:'Mandatory'});
      }
      return validationErrors;
    }

    /**
     * Perform signup
     */
    private doSignup() {
      var _this = this;

      //Reset form errors
      this.modalService.resetFormErrors();

      //Get fields
      var email = (<HTMLInputElement>this.modalService.findElementById("sl-email")).value;
      var password = (<HTMLInputElement>this.modalService.findElementById("sl-password")).value;
      var firstname = (<HTMLInputElement>this.modalService.findElementById("sl-firstname")).value;
      var lastname = (<HTMLInputElement>this.modalService.findElementById("sl-lastname")).value;

      //..and do client validation first
      var validationErrors = this.validateSignupForm(email, password, firstname, lastname);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
      else {
        //Login
        this.sessionService.doEmailPasswordSignUp(email, password, firstname, lastname)
          .then(function(res) {
           //Continue with email validation
            _this.setupEmailValidation(res);
          }, function(err) {

            if(err instanceof Error) {
              //$scope.error = err.stack;
            } else {
              //$scope.error = err;
            }

            _this.modalService.showFieldError('sl-email-error',err.message);
          });
      }
    }

    /**
     * Show client side validate form errors
     * @param code
     * @returns {Array}
     */
    private validateEmailValidationForm(code:string) {
      var validationErrors = [];

      //Test email
      if(!this.modalService.validateRequired(code)) {
        //validationErrors.push({field:'sl-confirmation-code', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-confirmation-code', error:'Mandatory'});
      }
      return validationErrors;
    }

  /**
     * Perform email validation
     */
    private doEmailValidation(userData) {
      var _this = this;

      //Reset form errors
      this.modalService.resetFormErrors();

      //Get fields
      var confirmationCode = (<HTMLInputElement>this.modalService.findElementById("sl-confirmation-code")).value;
      var email = userData.email;

      //..and do client validation first
      var validationErrors = this.validateEmailValidationForm(confirmationCode);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
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
            _this.modalService.showFieldError('sl-confirmation-code-error',"Wrong validation code");
          });

      }
    }

    setupEmailValidation (userData) {
      console.log(userData);

      this.modalService.showModal(
        require('./validate.html'),
        require('./app.css')
      );
      var validateEmailBtn = this.modalService.findElementById('sl-btn-validate');
      validateEmailBtn.onclick = () => this.doEmailValidation(userData);
      var userSpan = this.modalService.findElementById('sl-span-firstname');
      userSpan.innerHTML = userData.firstName;
    }

    setupSignup () {
      this.modalService.showModal(
        require('./signup.html'),
        require('./app.css')
      );
      var signupBtn = this.modalService.findElementById('sl-btn-signup');
      signupBtn.onclick = () => this.doSignup();
    }

    /**
     *  Setup login
     */
    setupLogin () {
      this.modalService.showModal(
        require('./login.html'),
        require('./app.css')
      );
      var loginBtn = this.modalService.findElementById('sl-btn-login');
      loginBtn.onclick = () => this.doLogin();
      var navToSignup = this.modalService.findElementById('sl-nav-signup');
      navToSignup.onclick= (evt) => { evt.preventDefault(); this.setupSignup()};
    }

    startFlow() {

      //TODO: other parts of flow

      //Signup flow starts here
      this.setupLogin();


    }

}
