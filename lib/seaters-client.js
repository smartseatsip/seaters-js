"use strict";
var popsicle_1 = require('popsicle');
var SeatersClient = (function () {
    function SeatersClient() {
    }
    SeatersClient.prototype.greet = function (name) {
        return 'Hello, ' + name;
    };
    SeatersClient.prototype.getAppEnv = function () {
        return popsicle_1.request('/api/app/env');
    };
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
