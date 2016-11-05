"use strict";
var rxjs_1 = require('rxjs');
var popsicle = require('popsicle');
var api_endpoint_1 = require('./api-endpoint');
var api_error_1 = require('./api-error');
var ApiContext = (function () {
    function ApiContext(apiPrefix) {
        this.apiPrefix = apiPrefix;
        this.requestStartedSubject = new rxjs_1.Subject();
        this.headers = new Map();
    }
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
    ApiContext.prototype.doRawRequest = function (requestDefinition) {
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
    ApiContext.prototype.doJsonRequest = function (requestDefinition) {
        return this.doRawRequest(requestDefinition)
            .then(function (response) { return JSON.parse(response.body); });
    };
    ApiContext.prototype.handle2XXResponse = function (response) {
        return Promise.resolve(JSON.parse(response.body));
    };
    ApiContext.prototype.tryParseJSON = function (json) {
        try {
            return JSON.parse(json);
        }
        catch (_error) {
            return json;
        }
    };
    ApiContext.prototype.handleUnexpectedResponse = function (response) {
        var apiError;
        if (response instanceof Error) {
            apiError = {
                rawResponse: response,
                type: api_error_1.ERROR_TYPE.CLIENT,
                error: 'api_unexpected-error',
                errorMsg: response.toString()
            };
        }
        else {
            apiError = {
                rawResponse: response,
                type: api_error_1.ERROR_TYPE.SERVER,
                error: 'api_unexpected-error',
                errorMsg: 'status: ' + response.status + ' ' + response.statusText + '\n' +
                    response.body
            };
        }
        return Promise.reject(apiError);
    };
    ApiContext.prototype.handle4XXResponse = function (response) {
        var body = this.tryParseJSON(response.body);
        var error;
        if (!body) {
            response.body = 'Empty body in 400 response';
            return this.handleUnexpectedResponse(response);
        }
        else if (typeof (body) === 'string') {
            error = {
                rawResponse: response,
                type: api_error_1.ERROR_TYPE.SERVER,
                error: 'api_general-error',
                errorMsg: response.body
            };
        }
        else {
            error = body;
            error.rawResponse = response;
            error.type = api_error_1.ERROR_TYPE.CLIENT;
        }
        return Promise.reject(error);
    };
    ApiContext.prototype.handleResponse = function (response) {
        switch (response.status) {
            case 200:
            case 201:
            case 204: return this.handle2XXResponse(response);
            case 400: return this.handle4XXResponse(response);
            default: return this.handleUnexpectedResponse(response);
        }
    };
    ApiContext.prototype.doRequest = function (requestDefinition) {
        var _this = this;
        return this.doRawRequest(requestDefinition)
            .then(function (response) { return _this.handleResponse(response); }, function (error) { return _this.handleUnexpectedResponse(error); });
    };
    ApiContext.prototype.get = function (abstractEndpoint, endpointParams, queryParams) {
        return this.doRequest({
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || new Map(),
            queryParams: queryParams || new Map()
        });
    };
    return ApiContext;
}());
exports.ApiContext = ApiContext;
