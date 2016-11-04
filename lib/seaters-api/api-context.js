"use strict";
var popsicle = require('popsicle');
var rxjs_1 = require('rxjs');
var api_endpoint_1 = require('./api-endpoint');
var ApiContext = (function () {
    function ApiContext(apiPrefix) {
        this.apiPrefix = apiPrefix;
        this.requestStartedSubject = new rxjs_1.Subject();
    }
    ApiContext.prototype.prefixConcreteEndpoint = function (concreteEndpoint) {
        // normalize concreteEndpoint
        concreteEndpoint = concreteEndpoint.replace(/^\//, '');
        return this.apiPrefix + '/' + concreteEndpoint;
    };
    ApiContext.prototype.renderAbsoluteEndpoint = function (concreteEndpoint, queryParams) {
        return concreteEndpoint; //TODO: queryParams + concreteEndpoint
    };
    ApiContext.prototype.renderConcreteEndpoint = function (request) {
        return request.abstractEndpoint; //TODO: replace endpoint params
    };
    ApiContext.prototype.createEndpoint = function (requestDefinition) {
        return new api_endpoint_1.ApiEndpoint(requestDefinition.abstractEndpoint, requestDefinition.endpointParams || new Map(), requestDefinition.queryParams || new Map(), this.apiPrefix);
    };
    ApiContext.prototype.createPopsicleRequestOptions = function (requestDefinition, endpoint) {
        return {
            url: endpoint.absoluteEndpoint,
            method: requestDefinition.method || 'GET',
            query: requestDefinition.queryParams,
            headers: requestDefinition.headers,
            body: requestDefinition.body
        };
    };
    ApiContext.prototype.doRequest = function (requestDefinition) {
        var endpoint = this.createEndpoint(requestDefinition);
        var popsicleRequestOptions = this.createPopsicleRequestOptions(requestDefinition, endpoint);
        var popsicleRequest = popsicle.request(popsicleRequestOptions);
        var apiRequest = {
            requestDefinition: requestDefinition,
            endpoint: endpoint,
            popsicleRequest: popsicleRequest
        };
        this.requestStartedSubject.next(apiRequest);
        return popsicleRequest;
    };
    return ApiContext;
}());
exports.ApiContext = ApiContext;
