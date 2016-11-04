"use strict";
var popsicle = require('popsicle');
var ApiContext = (function () {
    function ApiContext(apiPrefix) {
        this.apiPrefix = apiPrefix;
        // normalize apiPrefix: remove trailing '/'
        this.apiPrefix = apiPrefix.replace(/\/$/, '');
    }
    ApiContext.prototype.prefixConcreteEndpoint = function (concreteEndpoint) {
        // normalize concreteEndpoint
        concreteEndpoint = concreteEndpoint.replace(/^\//, '');
        return this.apiPrefix + '/' + concreteEndpoint;
    };
    ApiContext.prototype.renderConcreteEndpoint = function (request) {
        return request.abstractEndpoint; //TODO: replace endpoint params
    };
    ApiContext.prototype.createPopsicleRequest = function (request) {
        var concreteEndpoint = this.renderConcreteEndpoint(request);
        var popsicleRequestOptions = {
            url: this.prefixConcreteEndpoint(concreteEndpoint),
            method: request.method || 'GET',
            query: request.queryParams,
            headers: request.headers,
            body: request.body
        };
        return popsicle.request(popsicleRequestOptions);
    };
    return ApiContext;
}());
exports.ApiContext = ApiContext;
