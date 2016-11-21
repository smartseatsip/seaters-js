/// <reference path="../../node_modules/typescript/lib/lib.d.ts" />
"use strict";
var JoinWlService = (function () {
    function JoinWlService(wlService, sessionService) {
        this.wlService = wlService;
        this.sessionService = sessionService;
    }
    /**
     * Check for required field
     * @param value
     * @returns {boolean}
     */
    JoinWlService.prototype.validateRequired = function (value) {
        return value != undefined && value.trim().length > 0;
    };
    /**
     * Hide all form field errors
     */
    JoinWlService.prototype.resetFormErrors = function () {
        //Reset all errors
        var errorFields = this.modal.getElementsByClassName('sl-input-error');
        for (var i = 0; i < errorFields.length; i++) {
            errorFields[i].style.display = 'none';
        }
    };
    /**
     * Display a form field error
     * @param field
     * @param error
     */
    JoinWlService.prototype.showFieldError = function (field, error) {
        var el = this.modal.getElementsByClassName(field)[0];
        el.innerHTML = error;
        el.style.display = 'block';
    };
    /**
     * Client side form validation
     * @param validationErrors
     */
    JoinWlService.prototype.showFormErrors = function (validationErrors) {
        //set errors that apply
        for (var i = 0; i < validationErrors.length; i++) {
            var field = validationErrors[i].field + '-error';
            var error = validationErrors[i].error;
            this.showFieldError(field, error);
        }
    };
    JoinWlService.prototype.onEscape = function (callback) {
        function escapeListener(evt) {
            if (evt.key == 'Escape') {
                callback();
                evt.preventDefault();
            }
        }
        function removeEscapeListener() {
            window.removeEventListener('keydown', escapeListener, true);
        }
        window.addEventListener('keydown', escapeListener, true);
        return removeEscapeListener;
    };
    JoinWlService.prototype.showOverlay = function () {
        console.log('showing seaters overlay');
        this.overlay.style.display = 'block';
    };
    JoinWlService.prototype.hideOverlay = function () {
        console.log('hiding seaters overlay');
        this.overlay.style.display = 'none';
        this.modal.innerHTML = '';
    };
    JoinWlService.prototype.setupOverlay = function () {
        var _this = this;
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
        this.onEscape(function () { return _this.hideOverlay(); });
        document.getElementsByTagName('body')[0].appendChild(this.overlay);
        return this.overlay;
    };
    JoinWlService.prototype.setupModal = function () {
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
    };
    JoinWlService.prototype.setModalContent = function (template, style) {
        this.modal.innerHTML = template;
        var styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        this.modal.appendChild(styleElement);
    };
    JoinWlService.prototype.setupTest = function () {
        var _this = this;
        this.setModalContent(require('./join-wl/test.html'), require('./join-wl/test.css'));
        var joinBtn = this.findByStrsClass('strs-join-button');
        joinBtn.onclick = function () { return _this.setupTest2(); };
    };
    JoinWlService.prototype.setupTest2 = function () {
        this.setModalContent(require('./join-wl/test2.html'), require('./join-wl/test2.css'));
    };
    /**
     * Show client side login form errors
     * @param email
     * @param password
     * @returns {Array}
     */
    JoinWlService.prototype.validateLoginForm = function (email, password) {
        var validationErrors = [];
        //Test email
        if (!this.validateRequired(email)) {
            //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-email', error: 'Mandatory' });
        }
        //Test password
        if (!this.validateRequired(password)) {
            //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-password', error: 'Mandatory' });
        }
        return validationErrors;
    };
    /**
     * Show server side login form errors
     * @param error
     */
    JoinWlService.prototype.showFormErrorsApiLogin = function (error) {
        //Test for detailed errors
        if (error.details.length > 0) {
            if (error.details[0].field === 'emailPasswordCredentials.email') {
                this.showFieldError('sl-email-error', error.details[0].error.defaultMessage);
            }
        }
        else {
            this.showFieldError('sl-email-error', error.error.defaultMessage);
        }
    };
    /**
     * Perform login
     */
    JoinWlService.prototype.doLogin = function () {
        var _this = this;
        //Reset form errors
        this.resetFormErrors();
        //Get fields
        var email = this.modal.getElementsByClassName("sl-email")[0].value;
        var password = this.modal.getElementsByClassName("sl-password")[0].value;
        //..and do client validation first
        var validationErrors = this.validateLoginForm(email, password);
        if (validationErrors.length > 0)
            this.showFormErrors(validationErrors);
        else {
            //Login
            this.sessionService.doEmailPasswordLogin(email, password)
                .then(function (res) {
                alert("You have sucessfully logged in");
            }, function (err) {
                if (err instanceof Error) {
                }
                else {
                }
                _this.showFormErrorsApiLogin(err);
            });
        }
    };
    /**
     *  Setup login
     */
    JoinWlService.prototype.setupLogin = function () {
        var _this = this;
        this.setModalContent(require('./join-wl/login.html'), require('./join-wl/app.css'));
        var loginBtn = this.findByStrsClass('sl-btn-login');
        loginBtn.onclick = function () { return _this.doLogin(); };
    };
    /**
     * Show client side signup form errors
     * @param email
     * @param password
     * @param firstname
     * @param lastname
     * @returns {Array}
     */
    JoinWlService.prototype.validateSignupForm = function (email, password, firstname, lastname) {
        var validationErrors = [];
        //Test email
        if (!this.validateRequired(email)) {
            //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-email', error: 'Mandatory' });
        }
        //Test password
        if (!this.validateRequired(password)) {
            //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-password', error: 'Mandatory' });
        }
        //Test firstname
        if (!this.validateRequired(firstname)) {
            //validationErrors.push({field:'sl-firstname', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-firstname', error: 'Mandatory' });
        }
        //Test lastname
        if (!this.validateRequired(lastname)) {
            //validationErrors.push({field:'sl-lastname', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-lastname', error: 'Mandatory' });
        }
        return validationErrors;
    };
    /**
     * Perfor signup
     */
    JoinWlService.prototype.doSignup = function () {
        var _this = this;
        //Reset form errors
        this.resetFormErrors();
        //Get fields
        var email = this.modal.getElementsByClassName("sl-email")[0].value;
        var password = this.modal.getElementsByClassName("sl-password")[0].value;
        var firstname = this.modal.getElementsByClassName("sl-firstname")[0].value;
        var lastname = this.modal.getElementsByClassName("sl-lastname")[0].value;
        //..and do client validation first
        var validationErrors = this.validateSignupForm(email, password, firstname, lastname);
        if (validationErrors.length > 0)
            this.showFormErrors(validationErrors);
        else {
            //Login
            this.sessionService.doEmailPasswordSignUp(email, password, firstname, lastname)
                .then(function (res) {
                alert("You have sucessfully signed up");
            }, function (err) {
                if (err instanceof Error) {
                }
                else {
                }
                _this.showFieldError('sl-email-error', err.message);
            });
        }
    };
    JoinWlService.prototype.setupSignup = function () {
        var _this = this;
        this.setModalContent(require('./join-wl/signup.html'), require('./join-wl/app.css'));
        var signupBtn = this.findByStrsClass('sl-btn-signup');
        signupBtn.onclick = function () { return _this.doSignup(); };
    };
    /**
     * Show client side validate form errors
     * @param code
     * @returns {Array}
     */
    JoinWlService.prototype.validateEmailValidationForm = function (code) {
        var validationErrors = [];
        //Test email
        if (!this.validateRequired(code)) {
            //validationErrors.push({field:'sl-confirmation-code', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-confirmation-code', error: 'Mandatory' });
        }
        return validationErrors;
    };
    /**
     * Perform email validation
     */
    JoinWlService.prototype.doEmailValidation = function () {
        var _this = this;
        //Reset form errors
        this.resetFormErrors();
        //Get fields
        var confirmationCode = this.modal.getElementsByClassName("sl-confirmation-code")[0].value;
        var email = "test@test.com";
        //..and do client validation first
        var validationErrors = this.validateEmailValidationForm(confirmationCode);
        if (validationErrors.length > 0)
            this.showFormErrors(validationErrors);
        else {
            //Login
            this.sessionService.doValidation(email, confirmationCode)
                .then(function (res) {
                alert("You have confirmed your email");
            }, function (err) {
                if (err instanceof Error) {
                }
                else {
                }
                //For now, add general always show this error, as error info is in different format coming back
                _this.showFieldError('sl-confirmation-code-error', "Wrong validation code");
            });
        }
    };
    JoinWlService.prototype.setupEmailValidation = function () {
        var _this = this;
        this.setModalContent(require('./join-wl/validate.html'), require('./join-wl/app.css'));
        var validateEmailBtn = this.findByStrsClass('sl-btn-validate');
        validateEmailBtn.onclick = function () { return _this.doEmailValidation(); };
    };
    JoinWlService.prototype.findByStrsClass = function (cssClass) {
        return this.modal.getElementsByClassName(cssClass)[0];
    };
    JoinWlService.prototype.joinWl = function (wlId) {
        console.log('launching JoinWl popup for %s', wlId);
        this.setupOverlay();
        this.setupModal();
        //this.setupTest();
        this.setupLogin();
        this.showOverlay();
    };
    return JoinWlService;
}());
exports.JoinWlService = JoinWlService;
