define("seaters-client", ["require", "exports"], function (require, exports) {
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
});
define("index", ["require", "exports", "seaters-client"], function (require, exports, seaters_client_1) {
    "use strict";
    exports.version = "0.0.1";
    exports.SeatersClient = seaters_client_1.SeatersClient;
});
