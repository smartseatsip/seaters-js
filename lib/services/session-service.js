"use strict";
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
    SessionService.prototype.doEmailPasswordLogin = function (email, password, mfaToken) {
        return this.api.authentication.token({
            emailPasswordCredentials: {
                email: email,
                password: password,
                mfaToken: mfaToken
            }
        }).then(this.finishLogin);
    };
    SessionService.prototype.applyAutorenewSessionStrategy = function (token) {
        console.log('autorenewing session on %s', token.expirationDate);
    };
    SessionService.prototype.applyExpireSessionStrategy = function (token) {
        console.log('session expires on %s', token.expirationDate);
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
