"use strict";
var moment = require('moment');
var AUTH_HEADER = 'Authorization';
var AUTH_BEARER = 'SeatersBearer';
(function (SESSION_STRATEGY) {
    SESSION_STRATEGY[SESSION_STRATEGY["EXPIRE"] = 0] = "EXPIRE";
})(exports.SESSION_STRATEGY || (exports.SESSION_STRATEGY = {}));
var SESSION_STRATEGY = exports.SESSION_STRATEGY;
var SessionService = (function () {
    function SessionService(api, sessionStrategy) {
        this.api = api;
        this.sessionStrategy = sessionStrategy || SESSION_STRATEGY.EXPIRE;
    }
    SessionService.prototype.applyExpireSessionStrategy = function (session) {
        var _this = this;
        var expiration = moment.utc(session.expirationDate);
        var now = moment();
        console.log('session expires on %s (in %s minutes)', session.expirationDate, expiration.diff(now, 'minutes'));
        setTimeout(function () { return _this.doLogout(); }, expiration.diff(now, 'milliseconds'));
    };
    SessionService.prototype.finishLogin = function (session) {
        this.api.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + session.token);
        switch (this.sessionStrategy) {
            default: this.applyExpireSessionStrategy(session);
        }
        return this.setCurrentFan();
    };
    SessionService.prototype.setCurrentFan = function () {
        var _this = this;
        return this.api.fan.fan()
            .then(function (fan) { return _this.currentFan = fan; });
    };
    SessionService.prototype.doEmailPasswordLogin = function (email, password, mfaToken) {
        var _this = this;
        return this.api.authentication.token({
            emailPasswordCredentials: {
                email: email,
                password: password,
                mfaToken: mfaToken
            }
        }).then(function (r) { return _this.finishLogin(r); });
    };
    //TODO: handle error case
    SessionService.prototype.doEmailPasswordSignUp = function (email, password, firstname, lastname, language) {
        var _this = this;
        return this.api.authentication.signup({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            language: language || 'en' //TODO: refer to config setting for default language
        })
            .then(function () { return _this.doEmailPasswordLogin(email, password); });
    };
    SessionService.prototype.doEmailValidation = function (email, code) {
        var _this = this;
        return this.api.authentication.validate({
            email: email,
            code: code
        }).then(function () { return _this.setCurrentFan(); });
    };
    SessionService.prototype.doLogout = function () {
        console.log('[SessionService] doLogout'); //DEBUG
        this.api.unsetHeader(AUTH_HEADER);
        this.currentFan = undefined;
    };
    SessionService.prototype.whoami = function () {
        return this.currentFan;
    };
    return SessionService;
}());
exports.SessionService = SessionService;
