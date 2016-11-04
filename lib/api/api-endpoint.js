"use strict";
var ApiEndpoint = (function () {
    function ApiEndpoint(abstractEndpoint, endpointParams, queryParams, prefix) {
        this.endpointParams = endpointParams;
        this.queryParams = queryParams;
        this.prefix = prefix;
        this.abstractEndpoint = this.normalizeAbstractEndpoint(abstractEndpoint);
        this.concreteEndpoint = this.renderConcreteEndpoint();
        this.concreteEndpointWithQueryParams = this.renderConcreteEndpointWithQueryParams();
        this.absoluteEndpoint = this.renderAbsoluteEndpoint();
    }
    ApiEndpoint.prototype.normalizeAbstractEndpoint = function (abstractEndpoint) {
        return abstractEndpoint
            .replace(/^\//, '') // no prefixed '/'
            .replace(/\/$/, ''); // no trailing '/'
    };
    ApiEndpoint.prototype.renderEndpointParam = function (paramName) {
        if (!this.endpointParams.has(paramName)) {
            throw 'Unable to render endpoint param: ' + paramName;
        }
        return encodeURIComponent(this.endpointParams.get(paramName));
    };
    ApiEndpoint.prototype.renderConcreteEndpoint = function () {
        var _this = this;
        var endpointParamRx = /:([a-zA-Z][a-zA-Z0-9]*)/;
        return this.abstractEndpoint.replace(endpointParamRx, function (match) {
            return _this.renderEndpointParam(match[1]);
        });
    };
    ApiEndpoint.prototype.renderConcreteEndpointWithQueryParams = function () {
        if (this.queryParams.size === 0) {
            return this.concreteEndpoint;
        }
        var params = [];
        for (var queryParam in this.queryParams.keys()) {
            params.push(encodeURIComponent(queryParam) + '=' +
                encodeURIComponent(this.queryParams.get(queryParam)));
        }
        var res = this.concreteEndpoint;
        // if there is already a query part
        if (res.lastIndexOf('?') >= 0) {
            // append '&' there is none yet 
            if (!/&$/.test(res)) {
                res = res + '&';
            }
        }
        else {
            res = +'?';
        }
        return res + params.join('&');
    };
    ApiEndpoint.prototype.renderAbsoluteEndpoint = function () {
        // remove trailing '/' from the prefix
        var normalizedPrefix = this.prefix.replace(/\/$/, '');
        return normalizedPrefix + '/' + this.concreteEndpointWithQueryParams;
    };
    return ApiEndpoint;
}());
exports.ApiEndpoint = ApiEndpoint;
