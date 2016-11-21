"use strict";
(function (ERROR_TYPE) {
    ERROR_TYPE[ERROR_TYPE["CLIENT"] = 0] = "CLIENT";
    ERROR_TYPE[ERROR_TYPE["SERVER"] = 1] = "SERVER";
    ERROR_TYPE[ERROR_TYPE["LIBRARY"] = 2] = "LIBRARY";
})(exports.ERROR_TYPE || (exports.ERROR_TYPE = {}));
var ERROR_TYPE = exports.ERROR_TYPE;
