"use strict";
var AuthenticationApi = (function () {
    function AuthenticationApi(apiContext) {
        this.apiContext = apiContext;
    }
    AuthenticationApi.prototype.token = function (input) {
        return this.apiContext.put('/v2/authentication/token', input);
    };
    return AuthenticationApi;
}());
exports.AuthenticationApi = AuthenticationApi;
