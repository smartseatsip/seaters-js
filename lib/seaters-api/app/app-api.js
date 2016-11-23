"use strict";
var paging_options_1 = require('../paging-options');
var AppApi = (function () {
    function AppApi(apiContext) {
        this.apiContext = apiContext;
    }
    AppApi.prototype.env = function () {
        return this.apiContext.get('/app/env');
    };
    AppApi.prototype.countries = function (pagingOptions) {
        return this.apiContext.get('/app/countries', null, paging_options_1.PagingOptions.toQueryParams(pagingOptions));
    };
    return AppApi;
}());
exports.AppApi = AppApi;
