"use strict";
var SeatersClient = (function () {
    function SeatersClient() {
    }
    SeatersClient.prototype.greeter = function (name) {
        return 'Hello, ' + name;
    };
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
