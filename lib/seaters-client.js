"use strict";
var seaters_api_1 = require('./seaters-api');
var SeatersClient = (function () {
    function SeatersClient(apiPrefix) {
        this.apiContext = new seaters_api_1.ApiContext(apiPrefix || '/api');
    }
    SeatersClient.prototype.greet = function (name) {
        return 'Hello, ' + name;
    };
    SeatersClient.prototype.getAppEnv = function () {
        return this.apiContext.createPopsicleRequest({
            abstractEndpoint: '/app/env',
            method: 'GET'
        });
    };
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
