"use strict";
var seaters_api_1 = require('./seaters-api');
var session_service_1 = require('./services/session-service');
var SeatersClient = (function () {
    function SeatersClient(apiPrefix) {
        this.api = new seaters_api_1.SeatersApi(apiPrefix || '/api');
        this.sessionService = new session_service_1.SessionService(this.api);
    }
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
