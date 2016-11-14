"use strict";
var moment = require('moment');
var AUTH_HEADER = 'Authentication';
var AUTH_BEARER = 'Seaters';
(function (SESSION_STRATEGY) {
    SESSION_STRATEGY[SESSION_STRATEGY["AUTORENEW"] = 0] = "AUTORENEW";
    SESSION_STRATEGY[SESSION_STRATEGY["EXPIRE"] = 1] = "EXPIRE";
})(exports.SESSION_STRATEGY || (exports.SESSION_STRATEGY = {}));
var SESSION_STRATEGY = exports.SESSION_STRATEGY;
var SessionService = (function () {
    function SessionService(api, sessionStrategy) {
        this.api = api;
        this.sessionStrategy = sessionStrategy;
        if (!sessionStrategy) {
            this.sessionStrategy = SESSION_STRATEGY.EXPIRE;
        }
    }
    SessionService.prototype.applyAutorenewSessionStrategy = function (token) {
        console.log('autorenewing session on %s (in %s minutes)', token.expirationDate, moment.utc(token.expirationDate).diff(moment(), 'minutes')); //DEBUG
    };
    SessionService.prototype.applyExpireSessionStrategy = function (token) {
        console.log('session expires on %s (in %s minutes)', token.expirationDate, moment.utc(token.expirationDate).diff(moment(), 'minutes')); //DEBUG
    };
    SessionService.prototype.finishLogin = function (tokenOutput) {
        this.api.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + tokenOutput.token.value);
        this.currentUser = tokenOutput.userData;
        var token = tokenOutput.token;
        switch (this.sessionStrategy) {
            case SESSION_STRATEGY.AUTORENEW:
                this.applyAutorenewSessionStrategy(token);
                break;
            default: this.applyExpireSessionStrategy(token);
        }
        return tokenOutput.userData;
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
    SessionService.prototype.doLogout = function () {
        this.api.unsetHeader(AUTH_HEADER);
        this.currentUser = undefined;
    };
    SessionService.prototype.whoami = function () {
        return this.currentUser;
    };
    return SessionService;
}());
exports.SessionService = SessionService;
