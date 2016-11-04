"use strict";
var seaters_api_1 = require('./seaters-api');
var SeatersClient = (function () {
    function SeatersClient(apiPrefix) {
        this.api = new seaters_api_1.SeatersApi(apiPrefix || '/api');
    }
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
