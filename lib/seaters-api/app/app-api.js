"use strict";
var AppApi = (function () {
    function AppApi(apiContext) {
        this.apiContext = apiContext;
    }
    AppApi.prototype.env = function () {
        return this.apiContext.get('/app/env');
    };
    return AppApi;
}());
exports.AppApi = AppApi;
