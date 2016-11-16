"use strict";
var seaters_api_1 = require('./seaters-api');
var session_service_1 = require('./services/session-service');
var wl_service_1 = require('./services/wl-service');
var join_wl_service_1 = require('./services/join-wl-service');
var SeatersClient = (function () {
    function SeatersClient(apiPrefix) {
        this.api = new seaters_api_1.SeatersApi(apiPrefix || '/api' /*'https://api.dev-seaters.com/api'*/);
        this.sessionService = new session_service_1.SessionService(this.api);
        this.wlService = new wl_service_1.WlService(this.api);
        this.joinWlService = new join_wl_service_1.JoinWlService(this.wlService, this.sessionService);
    }
    SeatersClient.prototype.test = function () {
        //DEBUG
        throw 'FOOBAR';
    };
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
