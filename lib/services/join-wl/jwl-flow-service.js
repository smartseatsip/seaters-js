"use strict";
var JWLFlowService = (function () {
    function JWLFlowService(modalService, sessionService) {
        this.modalService = modalService;
        this.sessionService = sessionService;
    }
    //Sets a button to either enabled or disabled
    JWLFlowService.prototype.enableButton = function (btnId, enabled) {
        this.modalService.findElementById(btnId).disabled = !enabled;
    };
    /**
     * Show client side login form errors
     * @param email
     * @param password
     * @returns {Array}
     */
    JWLFlowService.prototype.validateLoginForm = function (email, password) {
        var validationErrors = [];
        //Test email
        if (!this.modalService.validateRequired(email)) {
            //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-email', error: 'Mandatory' });
        }
        //Test password
        if (!this.modalService.validateRequired(password)) {
            //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-password', error: 'Mandatory' });
        }
        return validationErrors;
    };
    /**
     * Show server side login form errors
     * @param error
     */
    JWLFlowService.prototype.showFormErrorsApiLogin = function (error) {
        //Test for detailed errors
        if (error.details.length > 0) {
            if (error.details[0].field === 'emailPasswordCredentials.email') {
                this.modalService.showFieldError('sl-email-error', error.details[0].error.defaultMessage);
            }
        }
        else {
            this.modalService.showFieldError('sl-email-error', error.error.defaultMessage);
        }
    };
    /**
     * Perform login
     */
    JWLFlowService.prototype.doLogin = function () {
        var _this = this;
        //Reset form errors
        this.modalService.resetFormErrors();
        //Get fields
        var email = this.modalService.findElementById("sl-email").value;
        var password = this.modalService.findElementById("sl-password").value;
        //..and do client validation first
        var validationErrors = this.validateLoginForm(email, password);
        if (validationErrors.length > 0)
            this.modalService.showFormErrors(validationErrors);
        else {
            //Login
            this.enableButton('sl-btn-login', false);
            this.sessionService.doEmailPasswordLogin(email, password)
                .then(function (res) {
                _this.enableButton('sl-btn-login', true);
                alert("You have sucessfully logged in");
            }, function (err) {
                _this.enableButton('sl-btn-login', true);
                if (err instanceof Error) {
                }
                else {
                }
                _this.showFormErrorsApiLogin(err);
            });
        }
    };
    /**
     * Show client side signup form errors
     * @param email
     * @param password
     * @param firstname
     * @param lastname
     * @returns {Array}
     */
    JWLFlowService.prototype.validateSignupForm = function (email, password, firstname, lastname) {
        var validationErrors = [];
        //Test email
        if (!this.modalService.validateRequired(email)) {
            //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-email', error: 'Mandatory' });
        }
        //Test password
        if (!this.modalService.validateRequired(password)) {
            //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-password', error: 'Mandatory' });
        }
        //Test firstname
        if (!this.modalService.validateRequired(firstname)) {
            //validationErrors.push({field:'sl-firstname', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-firstname', error: 'Mandatory' });
        }
        //Test lastname
        if (!this.modalService.validateRequired(lastname)) {
            //validationErrors.push({field:'sl-lastname', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-lastname', error: 'Mandatory' });
        }
        return validationErrors;
    };
    /**
     * Perform signup
     */
    JWLFlowService.prototype.doSignup = function () {
        var _this = this;
        //Reset form errors
        this.modalService.resetFormErrors();
        //Get fields
        var email = this.modalService.findElementById("sl-email").value;
        var password = this.modalService.findElementById("sl-password").value;
        var firstname = this.modalService.findElementById("sl-firstname").value;
        var lastname = this.modalService.findElementById("sl-lastname").value;
        //..and do client validation first
        var validationErrors = this.validateSignupForm(email, password, firstname, lastname);
        if (validationErrors.length > 0)
            this.modalService.showFormErrors(validationErrors);
        else {
            //Login
            this.enableButton('sl-btn-signup', false);
            this.sessionService.doEmailPasswordSignUp(email, password, firstname, lastname)
                .then(function (res) {
                //Continue with email validation
                _this.enableButton('sl-btn-signup', true);
                _this.setupEmailValidation(res);
            }, function (err) {
                _this.enableButton('sl-btn-signup', true);
                if (err instanceof Error) {
                }
                else {
                }
                _this.modalService.showFieldError('sl-email-error', err.message);
            });
        }
    };
    /**
     * Show client side validate form errors
     * @param code
     * @returns {Array}
     */
    JWLFlowService.prototype.validateEmailValidationForm = function (code) {
        var validationErrors = [];
        //Test email
        if (!this.modalService.validateRequired(code)) {
            //validationErrors.push({field:'sl-confirmation-code', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-confirmation-code', error: 'Mandatory' });
        }
        return validationErrors;
    };
    /**
       * Perform email validation
       */
    JWLFlowService.prototype.doEmailValidation = function (userData) {
        var _this = this;
        //Reset form errors
        this.modalService.resetFormErrors();
        //Get fields
        var confirmationCode = this.modalService.findElementById("sl-confirmation-code").value;
        var email = userData.email;
        //..and do client validation first
        var validationErrors = this.validateEmailValidationForm(confirmationCode);
        if (validationErrors.length > 0)
            this.modalService.showFormErrors(validationErrors);
        else {
            //Validate
            this.enableButton('sl-btn-validate', false);
            this.sessionService.doValidation(email, confirmationCode)
                .then(function (res) {
                _this.enableButton('sl-btn-validate', true);
                alert("You have confirmed your email");
            }, function (err) {
                _this.enableButton('sl-btn-validate', true);
                if (err instanceof Error) {
                }
                else {
                }
                //For now, add general always show this error, as error info is in different format coming back
                _this.modalService.showFieldError('sl-confirmation-code-error', "Wrong validation code");
            });
        }
    };
    JWLFlowService.prototype.setupEmailValidation = function (userData) {
        var _this = this;
        console.log(userData);
        this.modalService.showModal(require('./validate.html'), require('./app.css'));
        var validateEmailBtn = this.modalService.findElementById('sl-btn-validate');
        validateEmailBtn.onclick = function () { return _this.doEmailValidation(userData); };
        var userSpan = this.modalService.findElementById('sl-span-firstname');
        userSpan.innerHTML = userData.firstName;
    };
    JWLFlowService.prototype.setupSignup = function () {
        var _this = this;
        this.modalService.showModal(require('./signup.html'), require('./app.css'));
        var signupBtn = this.modalService.findElementById('sl-btn-signup');
        signupBtn.onclick = function () { return _this.doSignup(); };
    };
    /**
     *  Setup login
     */
    JWLFlowService.prototype.setupLogin = function () {
        var _this = this;
        this.modalService.showModal(require('./login.html'), require('./app.css'));
        var loginBtn = this.modalService.findElementById('sl-btn-login');
        loginBtn.onclick = function () { return _this.doLogin(); };
        var navToSignup = this.modalService.findElementById('sl-nav-signup');
        navToSignup.onclick = function (evt) { evt.preventDefault(); _this.setupSignup(); };
    };
    JWLFlowService.prototype.startFlow = function (wlId) {
        //TODO: other parts of flow
        //Signup flow starts here
        this.setupLogin();
    };
    return JWLFlowService;
}());
exports.JWLFlowService = JWLFlowService;
