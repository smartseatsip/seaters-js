"use strict";
var es6_promise_1 = require('es6-promise');
var waiting_list_service_1 = require('../waiting-list-service');
var fan_group_service_1 = require('../fan-group-service');
(function (JWL_EXIT_STATUS) {
    JWL_EXIT_STATUS[JWL_EXIT_STATUS["JOINED"] = 0] = "JOINED";
    JWL_EXIT_STATUS[JWL_EXIT_STATUS["CANCELLED"] = 1] = "CANCELLED";
    JWL_EXIT_STATUS[JWL_EXIT_STATUS["ERROR"] = 2] = "ERROR";
})(exports.JWL_EXIT_STATUS || (exports.JWL_EXIT_STATUS = {}));
var JWL_EXIT_STATUS = exports.JWL_EXIT_STATUS;
var JwlFlowService = (function () {
    function JwlFlowService(modalService, sessionService, waitingListService, fanGroupService) {
        this.modalService = modalService;
        this.sessionService = sessionService;
        this.waitingListService = waitingListService;
        this.fanGroupService = fanGroupService;
    }
    /**
     * Extract the message from an error and log this message with it's details
     */
    JwlFlowService.prototype.extractMsgAndLogError = function (pre, err) {
        var message = err instanceof Error ? err.message : JSON.stringify(err);
        var details = err.stack || '';
        console.error('[JwlFlowService] ' + pre + ': ' + message, details);
        return message;
    };
    /**
     * Sets a button to either enabled or disabled
     */
    JwlFlowService.prototype.enableButton = function (btnId, enabled) {
        this.modalService.findElementById(btnId).disabled = !enabled;
    };
    /**
     * Show server side login form errors
     * @param error
     */
    JwlFlowService.prototype.showFormErrorsApiLogin = function (error) {
        if (error instanceof String) {
            this.modalService.showFieldError('sl-email-error', 'Oops! Something went wrong. Please contact customer service.');
        }
        else if (error.details.length > 0) {
            if (error.details[0].field === 'emailPasswordCredentials.email') {
                this.modalService.showFieldError('strs-email-error', error.details[0].error.defaultMessage);
            }
        }
        else {
            this.modalService.showFieldError('sl-email-error', error.error.defaultMessage);
        }
    };
    /**
     * Returns a promise that never resolves
     */
    JwlFlowService.prototype.endoftheline = function () {
        return new es6_promise_1.Promise(function () { return null; });
    };
    JwlFlowService.prototype.defer = function () {
        var r = {};
        r.promise = new es6_promise_1.Promise(function (resolve, reject) {
            r.resolve = resolve;
            r.reject = reject;
        });
        return r;
    };
    /**
     * Entry point for the 'Join WL Flow'
     */
    JwlFlowService.prototype.startFlow = function (wlId) {
        var _this = this;
        return this.ensureFanIsLoggedInWithValidEmail()
            .then(function () { return _this.ensureFanHasJoinedFgAndWl(wlId); })
            .then(function (wl) { return _this.showRankAndLikelihood(wl); });
    };
    JwlFlowService.prototype.ensureFanIsLoggedInWithValidEmail = function () {
        var _this = this;
        console.log('[JwlFlowService] ensuring fan is logged in with valid email');
        var fan = this.sessionService.whoami();
        if (fan) {
            return this.ensureFanHasValidEmail(fan);
        }
        else {
            return this.showLogin()
                .then(function (fan) { return _this.ensureFanHasValidEmail(fan); });
        }
    };
    JwlFlowService.prototype.ensureFanHasJoinedFgAndWl = function (wlId) {
        var _this = this;
        console.log('[JwlFlowService] ensuring fan has joined FG and WL');
        this.modalService.showModal('Loading ...', //TODO: make template
        '');
        return this.waitingListService.getExtendedWaitingList(wlId)
            .then(function (wl) {
            return _this.fanGroupService.getExtendedFanGroup(wl.groupId)
                .then(function (fg) { return { fg: fg, wl: wl }; });
        })
            .then(function (wlAndFg) {
            var wl = wlAndFg.wl, fg = wlAndFg.fg;
            return _this.ensureFGAndWLAreEligable(fg, wl)
                .then(function () { return _this.joinFanGroupIfNeeded(fg); })
                .then(function () { return _this.joinWaitingListIfNeeded(wl); });
        });
    };
    JwlFlowService.prototype.checkFanGroupEligability = function (fg) {
        return fg.actionStatus === fan_group_service_1.FAN_GROUP_ACTION_STATUS.CAN_LEAVE ||
            fg.actionStatus === fan_group_service_1.FAN_GROUP_ACTION_STATUS.CAN_JOIN;
    };
    JwlFlowService.prototype.checkWaitingListEligability = function (wl) {
        return wl.actionStatus === waiting_list_service_1.WAITING_LIST_ACTION_STATUS.BOOK || this.hasRank(wl);
    };
    JwlFlowService.prototype.ensureFGAndWLAreEligable = function (fg, wl) {
        console.log('[JwlFlowService] ensuring FG and WL are eligable for JWL');
        if (!(this.checkFanGroupEligability(fg) && this.checkWaitingListEligability(wl))) {
            this.modalService.showModal('To join this wish list, visit https://seaters.com/' + fg.slug + '/' + wl.waitingListId, //TODO: make template
            '');
            return this.endoftheline();
        }
        else {
            return es6_promise_1.Promise.resolve();
        }
    };
    JwlFlowService.prototype.showRankAndLikelihood = function (wl) {
        var _this = this;
        console.log('[JwlFlowService] showing rank and likelihood');
        this.modalService.showModal(require('./wl.html'), require('./app.css'));
        return new es6_promise_1.Promise(function (resolve, reject) {
            var closeBtn = _this.modalService.findElementById('sl-btn-close');
            closeBtn.onclick = function () {
                _this.modalService.closeModal();
                resolve(JWL_EXIT_STATUS.JOINED);
            };
            var waitingListName = _this.modalService.findElementById('sl-wl-name');
            waitingListName.innerHTML = wl.displayName;
            var displaySection;
            //TODO: split up different scenario's in different modal contents
            if (wl.waitingListStatus === 'OPEN' && _this.hasRank(wl)) {
                displaySection = _this.modalService.findElementById('sl-wl-open');
                displaySection.style.display = 'block';
                //set wl group info
                var waitingListLikelihood = _this.modalService.findElementById('sl-wl-likelihood');
                waitingListLikelihood.innerHTML = wl.position.likelihood + " %";
                var waitingListRank = _this.modalService.findElementById('sl-wl-rank');
                waitingListRank.innerHTML = "# " + wl.position.rank;
            }
            else if (wl.waitingListStatus === 'CLOSED') {
                displaySection = _this.modalService.findElementById('sl-wl-closed');
                displaySection.style.display = 'block';
                //set fan group slug
                var fanGroupSlug = _this.modalService.findElementById('sl-fg-slug');
                fanGroupSlug.innerHTML = wl.groupName.en;
                fanGroupSlug.href = "http://www.seaters.com/" + wl.groupSlug;
            }
            //TODO: link to seaters for further actions (soon/pay/preauth/accept/print...)
        });
    };
    JwlFlowService.prototype.showLogin = function () {
        var _this = this;
        // show the log in screen
        this.modalService.showModal(require('./login.html'), require('./app.css'));
        // resolve whenever doLogin or showSignup is completed
        return new es6_promise_1.Promise(function (resolve, reject) {
            var loginBtn = _this.modalService.findElementById('sl-btn-login');
            loginBtn.onclick = function () { return _this.doLogin().then(resolve, reject); };
            var navToSignup = _this.modalService.findElementById('sl-nav-signup');
            navToSignup.onclick = function (evt) {
                evt.preventDefault(); //TODO: preventDefault at modal level should be enough
                _this.showSignup().then(resolve, reject);
            };
        });
    };
    JwlFlowService.prototype.doLogin = function () {
        var _this = this;
        //Reset form errors
        this.modalService.resetFormErrors();
        // Get fields
        var email = this.modalService.findElementById("sl-email").value;
        var password = this.modalService.findElementById("sl-password").value;
        // Client-side validation first
        var validationErrors = this.validateLoginForm(email, password);
        if (validationErrors.length > 0) {
            this.modalService.showFormErrors(validationErrors);
            return this.endoftheline(); // will come back via another call to doLogin
        }
        //TODO: show/hide loader
        this.enableButton('sl-btn-login', false);
        return this.sessionService.doEmailPasswordLogin(email, password)
            .then(function (fan) { return fan; }, function (err) {
            _this.enableButton('sl-btn-login', true);
            var message = _this.extractMsgAndLogError('doLogin', err);
            _this.showFormErrorsApiLogin(err);
            return _this.endoftheline(); // will come back via another call to doLogin
        });
    };
    /**
     * Show client side login form errors
     * @param email
     * @param password
     * @returns {Array}
     */
    JwlFlowService.prototype.validateLoginForm = function (email, password) {
        var validationErrors = [];
        //Test email
        if (!this.modalService.validateRequired(email)) {
            //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
            validationErrors.push({ field: 'strs-email', error: 'Mandatory' });
        }
        //Test password
        if (!this.modalService.validateRequired(password)) {
            //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
            validationErrors.push({ field: 'strs-password', error: 'Mandatory' });
        }
        return validationErrors;
    };
    JwlFlowService.prototype.showSignup = function () {
        var _this = this;
        // show the signup screen
        this.modalService.showModal(require('./signup.html'), require('./app.css'));
        return new es6_promise_1.Promise(function (resolve, reject) {
            var signupBtn = _this.modalService.findElementById('sl-btn-signup');
            signupBtn.onclick = function () { return _this.doSignup().then(resolve, reject); };
        });
    };
    JwlFlowService.prototype.doSignup = function () {
        var _this = this;
        // Reset form errors
        this.modalService.resetFormErrors();
        // Get fields
        var email = this.modalService.findElementById("sl-email").value;
        var password = this.modalService.findElementById("sl-password").value;
        var firstname = this.modalService.findElementById("sl-firstname").value;
        var lastname = this.modalService.findElementById("sl-lastname").value;
        // Client-side validations
        var validationErrors = this.validateSignupForm(email, password, firstname, lastname);
        if (validationErrors.length > 0) {
            this.modalService.showFormErrors(validationErrors);
            return this.endoftheline(); // will come back via another call to doSignup 
        }
        this.enableButton('sl-btn-signup', false);
        this.sessionService.doEmailPasswordSignUp(email, password, firstname, lastname)
            .then(function (fan) { return fan; }, function (err) {
            _this.enableButton('sl-btn-signup', true);
            var message = _this.extractMsgAndLogError('doSignup', err);
            _this.modalService.showFieldError('sl-email-error', message);
            return _this.endoftheline();
        });
    };
    JwlFlowService.prototype.ensureFanHasValidEmail = function (fan) {
        if (fan.validatedEmail) {
            return es6_promise_1.Promise.resolve();
        }
        else {
            return this.showValidateEmail(fan);
        }
    };
    JwlFlowService.prototype.showValidateEmail = function (fan) {
        var _this = this;
        this.modalService.showModal(require('./validate.html'), require('./app.css'));
        var deferred = this.defer();
        var userSpan = this.modalService.findElementById('sl-span-firstname');
        userSpan.innerHTML = fan.firstName;
        var validateEmailBtn = this.modalService.findElementById('sl-btn-validate');
        validateEmailBtn.onclick = function () { return _this.doEmailValidation(fan).then(deferred.resolve, deferred.reject); };
        return deferred.promise;
    };
    JwlFlowService.prototype.doEmailValidation = function (fan) {
        var _this = this;
        // Reset form errors
        this.modalService.resetFormErrors();
        // Get fields
        var confirmationCode = this.modalService.findElementById("sl-confirmation-code").value;
        var email = fan.email;
        // Client-side validations
        var validationErrors = this.validateEmailValidationForm(confirmationCode);
        if (validationErrors.length > 0) {
            this.modalService.showFormErrors(validationErrors);
            return this.endoftheline();
        }
        //Validate
        this.enableButton('sl-btn-validate', false);
        return this.sessionService.doEmailValidation(email, confirmationCode)
            .then(function (fan) { return fan; }, function (err) {
            _this.enableButton('sl-btn-validate', true);
            var message = _this.extractMsgAndLogError('doEmailValidation', err);
            //For now, add general always show this error, as error info is in different format coming back
            _this.modalService.showFieldError('sl-confirmation-code-error', "Wrong validation code");
            return _this.endoftheline();
        });
    };
    ////---------------
    JwlFlowService.prototype.validateSignupForm = function (email, password, firstname, lastname) {
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
    JwlFlowService.prototype.validateEmailValidationForm = function (code) {
        var validationErrors = [];
        //Test email
        if (!this.modalService.validateRequired(code)) {
            //validationErrors.push({field:'sl-confirmation-code', error:'sl_input_err_required'});
            validationErrors.push({ field: 'sl-confirmation-code', error: 'Mandatory' });
        }
        return validationErrors;
    };
    JwlFlowService.prototype.hasRank = function (wl) {
        return wl.actionStatus === waiting_list_service_1.WAITING_LIST_ACTION_STATUS.CONFIRM ||
            wl.actionStatus === waiting_list_service_1.WAITING_LIST_ACTION_STATUS.WAIT ||
            wl.actionStatus === waiting_list_service_1.WAITING_LIST_ACTION_STATUS.GO_LIVE;
    };
    JwlFlowService.prototype.joinWaitingListIfNeeded = function (wl) {
        var numberOfSeats = 1; //TODO: ask user how many seats
        if (this.hasRank(wl)) {
            return es6_promise_1.Promise.resolve(wl);
        }
        else if (wl.actionStatus === waiting_list_service_1.WAITING_LIST_ACTION_STATUS.BOOK) {
            return this.waitingListService.joinWaitingList(wl.waitingListId, numberOfSeats);
        }
        else {
            return es6_promise_1.Promise.reject('Unsupported WL action status: ' + wl.actionStatus);
        }
    };
    JwlFlowService.prototype.joinFanGroupIfNeeded = function (fg) {
        if (fg.actionStatus === fan_group_service_1.FAN_GROUP_ACTION_STATUS.CAN_LEAVE) {
            return es6_promise_1.Promise.resolve(fg);
        }
        else if (fg.actionStatus === fan_group_service_1.FAN_GROUP_ACTION_STATUS.CAN_JOIN) {
            return this.fanGroupService.joinFanGroup(fg.id);
        }
        else {
            return es6_promise_1.Promise.reject('Unsupported FG action status: ' + fg.actionStatus);
        }
    };
    return JwlFlowService;
}());
exports.JwlFlowService = JwlFlowService;
