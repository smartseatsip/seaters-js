"use strict";
var AuthenticationApi = (function () {
    function AuthenticationApi(apiContext) {
        this.apiContext = apiContext;
    }
    AuthenticationApi.prototype.token = function (input) {
        return this.apiContext.put('/v2/authentication/token', input)
            .then(function (data) {
            return {
                expirationDate: data.token.expirationDate,
                token: data.token.value
            }; //TODO: remove this code when API is adapted
        });
    };
    /**
     * Signs up a new user
     * @param input
     * @returns {any}
       */
    AuthenticationApi.prototype.signup = function (input) {
        return this.apiContext.post('/auth/signup', input);
    };
    /**
     * Validates a newly created user
     * @param input
     * @returns {any}
       */
    AuthenticationApi.prototype.validate = function (input) {
        return this.apiContext.put('/auth/validate', input);
    };
    return AuthenticationApi;
}());
exports.AuthenticationApi = AuthenticationApi;
