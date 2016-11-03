"use strict";
var SeatersClient = (function () {
    function SeatersClient() {
    }
    SeatersClient.prototype.greet = function (name) {
        return 'Hello, ' + name;
    };
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
