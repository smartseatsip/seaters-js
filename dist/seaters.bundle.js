var SeatersSDK =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "C:\\local_projects\\seaters\\seaters-js/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(22));
__export(__webpack_require__(7));
__export(__webpack_require__(23));
__export(__webpack_require__(24));
__export(__webpack_require__(5));
__export(__webpack_require__(25));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(27));
__export(__webpack_require__(4));
__export(__webpack_require__(32));
__export(__webpack_require__(33));
__export(__webpack_require__(9));
__export(__webpack_require__(12));
__export(__webpack_require__(8));
__export(__webpack_require__(10));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fan;
(function (fan) {
    var WAITING_LIST_ACTION_STATUS;
    (function (WAITING_LIST_ACTION_STATUS) {
        WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["UNLOCK"] = 0] = "UNLOCK";
        WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["SOON"] = 1] = "SOON";
        WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["BOOK"] = 2] = "BOOK";
        WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["WAIT"] = 3] = "WAIT";
        WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["CONFIRM"] = 4] = "CONFIRM";
        WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["GO_LIVE"] = 5] = "GO_LIVE";
        WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["ERROR"] = 6] = "ERROR";
    })(WAITING_LIST_ACTION_STATUS = fan.WAITING_LIST_ACTION_STATUS || (fan.WAITING_LIST_ACTION_STATUS = {}));
    var FAN_GROUP_ACTION_STATUS;
    (function (FAN_GROUP_ACTION_STATUS) {
        FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["CAN_JOIN"] = 0] = "CAN_JOIN";
        FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["CAN_LEAVE"] = 1] = "CAN_LEAVE";
        FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["CAN_UNLOCK"] = 2] = "CAN_UNLOCK";
        FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["CAN_REQUEST"] = 3] = "CAN_REQUEST";
        FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["WAITING_FOR_APPROVAL"] = 4] = "WAITING_FOR_APPROVAL";
    })(FAN_GROUP_ACTION_STATUS = fan.FAN_GROUP_ACTION_STATUS || (fan.FAN_GROUP_ACTION_STATUS = {}));
})(fan = exports.fan || (exports.fan = {}));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(18));
__export(__webpack_require__(6));
__export(__webpack_require__(19));
__export(__webpack_require__(20));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(3);
var SeatersApiContext = function (_super) {
    __extends(SeatersApiContext, _super);
    function SeatersApiContext(prefix, requestDriver) {
        return _super.call(this, prefix, requestDriver) || this;
    }
    SeatersApiContext.buildPagingQueryParams = function (pagingOptions) {
        pagingOptions = pagingOptions || {};
        return {
            maxPageSize: pagingOptions.maxPageSize || 9999,
            itemOffset: pagingOptions.page || 0
        };
    };
    SeatersApiContext.convertPagedResultToArray = function (promise) {
        return new Promise(function (resolve, reject) {
            promise.then(function (response) {
                if (response.items === undefined) {
                    resolve(response);
                }
                resolve(response.items);
            }).catch(reject);
        });
    };
    /**
     * Returns a promise that either resolves with the requested resource
     * or rejects on error with a SeatersApiException.
     *
     * @param requestDefinition Definition of which resource is requested
     *
     * @see SeatersApiException
     */
    SeatersApiContext.prototype.doSeatersRequest = function (requestDefinition) {
        var _this = this;
        return this.doRequest(requestDefinition).then(function (res) {
            return _this.handleServerResponse(res);
        }, function (err) {
            return _this.handleClientError(err);
        });
    };
    SeatersApiContext.prototype.doTypedSeatersRequest = function (requestDefinition) {
        var _this = this;
        return this.doSeatersRequest(requestDefinition).then(function (body) {
            return _this.parseResult(body);
        });
    };
    SeatersApiContext.prototype.get = function (abstractEndpoint, endpointParams, queryParams) {
        return this.doTypedSeatersRequest({
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {}
        });
    };
    SeatersApiContext.prototype.put = function (abstractEndpoint, body, endpointParams, queryParams) {
        return this.doTypedSeatersRequest({
            method: 'PUT',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {},
            body: body
        });
    };
    SeatersApiContext.prototype.post = function (abstractEndpoint, body, endpointParams, queryParams) {
        return this.doTypedSeatersRequest({
            method: 'POST',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {},
            body: body
        });
    };
    SeatersApiContext.prototype.delete = function (abstractEndpoint, endpointParams, queryParams) {
        return this.doTypedSeatersRequest({
            method: 'DELETE',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {}
        });
    };
    SeatersApiContext.prototype.handleServerResponse = function (response) {
        switch (response.status) {
            case 200:
            case 201:
            case 202:
            case 204:
                return this.handle2XXResponse(response);
            case 400:
                return this.handle400Response(response);
            case 401:
                return this.handle401Response(response);
            case 404:
                return this.handle404Response(response);
            case 422:
                return this.handle422Response(response);
            default:
                return this.handleUnexpectedResponse(response);
        }
    };
    SeatersApiContext.prototype.handle2XXResponse = function (response) {
        return Promise.resolve(response.body);
    };
    SeatersApiContext.prototype.dataFromLegacyResponse = function (response) {
        var data;
        try {
            data = JSON.parse(response.body);
            if (!data.message || typeof data.message !== 'string') {
                throw new Error('error data did not contain a message string');
            }
            if (!data.uuid || typeof data.uuid !== 'string') {
                throw new Error('error data did not contain a uuid string');
            }
        } catch (err) {
            return Promise.reject({
                type: 'server_error',
                message: 'Response was of type 400 but is not properly structured',
                uuid: null,
                errors: [{
                    _rawResponse: { response: response, parseError: err },
                    message: response.body,
                    statusCode: response.status,
                    statusText: response.statusText
                }]
            });
        }
        return Promise.resolve(data);
    };
    /**
     * (legacy) old endpoints return 400 with only a message string
     * This type of error is mapped to a proper SeatersApiException
     */
    SeatersApiContext.prototype.handle400Response = function (response) {
        return this.dataFromLegacyResponse(response).then(function (data) {
            return Promise.reject({
                type: 'validation_error_v1',
                message: data.message,
                uuid: data.uuid,
                errors: [{
                    defaultMessage: data.message,
                    errorCode: null,
                    reference: []
                }]
            });
        });
    };
    SeatersApiContext.prototype.createServerError = function (response, message) {
        return {
            _rawResponse: response,
            message: message,
            statusCode: response.status,
            statusText: response.statusText
        };
    };
    SeatersApiContext.prototype.handle401Response = function (response) {
        var _this = this;
        return this.dataFromLegacyResponse(response).then(function (data) {
            return Promise.reject({
                type: 'unauthorized',
                message: data.message,
                uuid: data.uuid,
                errors: [_this.createServerError(response, data.message)]
            });
        });
    };
    SeatersApiContext.prototype.handle404Response = function (response) {
        var _this = this;
        return this.dataFromLegacyResponse(response).then(function (data) {
            return Promise.reject({
                type: 'not_found',
                message: data.message,
                uuid: data.uuid,
                errors: [_this.createServerError(response, data.message)]
            });
        });
    };
    SeatersApiContext.prototype.handle422Response = function (response) {
        // todo exception cases for v2/authentication endpoints
        // TODO - verify this format is returned
        return Promise.reject(response);
    };
    SeatersApiContext.prototype.handleUnexpectedResponse = function (response) {
        return Promise.reject({
            type: 'server_error',
            message: 'An unexpected response was given by the server',
            uuid: null,
            errors: [this.createServerError(response, response.body)]
        });
    };
    SeatersApiContext.prototype.handleClientError = function (error) {
        return Promise.reject({
            type: 'client_error',
            message: 'the api client failed to complete the request',
            uuid: null,
            errors: [{ error: error }]
        });
    };
    SeatersApiContext.prototype.parseResult = function (body) {
        if (typeof body === 'string' && body.length > 0) {
            try {
                return Promise.resolve(JSON.parse(body));
            } catch (e) {
                // Incase the respons
                return Promise.resolve(body);
            }
        } else {
            return Promise.resolve(null);
        }
    };
    return SeatersApiContext;
}(api_1.ApiContext);
exports.SeatersApiContext = SeatersApiContext;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Subject = function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.next = function (evt) {
        this.observers.forEach(function (observer) {
            return observer(evt);
        });
    };
    Subject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
        return this.observers.length - 1;
    };
    Subject.prototype.unsubscribe = function (observerHandle) {
        this.observers.splice(observerHandle, 1);
    };
    return Subject;
}();
exports.Subject = Subject;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ApiEndpoint = function () {
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
        return abstractEndpoint.replace(/^\//, '') // no prefixed '/'
        .replace(/\/$/, ''); // no trailing '/'
    };
    ApiEndpoint.prototype.renderEndpointParam = function (parameter) {
        if (!this.endpointParams.hasOwnProperty(parameter)) {
            throw new Error('Unable to render endpoint param: ' + parameter);
        }
        // SimpleJSONPrimitive can always be cast to string
        return encodeURIComponent(this.endpointParams[parameter]);
    };
    ApiEndpoint.prototype.renderConcreteEndpoint = function () {
        var _this = this;
        var endpointParamRx = /:([a-zA-Z][a-zA-Z0-9]*)/g;
        return this.abstractEndpoint.replace(endpointParamRx, function (match) {
            return _this.renderEndpointParam(match.substr(1));
        });
    };
    ApiEndpoint.prototype.renderQueryParams = function () {
        var _this = this;
        var paramsArray = Object.keys(this.queryParams).map(function (key) {
            var value = _this.queryParams[key];
            if (Array.isArray(value)) {
                var valueArray = value;
                return valueArray.map(function (param) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(param);
                }).join('&');
            } else {
                var valueString = value;
                return encodeURIComponent(key) + '=' + encodeURIComponent(valueString);
            }
        });
        return paramsArray.join('&');
    };
    ApiEndpoint.prototype.renderConcreteEndpointWithQueryParams = function () {
        if (Object.keys(this.queryParams).length === 0) {
            return this.concreteEndpoint;
        }
        var res = this.concreteEndpoint;
        // if there is already a query part
        if (res.lastIndexOf('?') >= 0) {
            // append '&' there is none yet
            if (!/&$/.test(res)) {
                res = res + '&';
            }
        } else {
            res = res + '?';
        }
        return res + this.renderQueryParams();
    };
    ApiEndpoint.prototype.renderAbsoluteEndpoint = function () {
        // remove trailing '/' from the prefix
        var normalizedPrefix = this.prefix.replace(/\/$/, '');
        return normalizedPrefix + '/' + this.concreteEndpointWithQueryParams;
    };
    return ApiEndpoint;
}();
exports.ApiEndpoint = ApiEndpoint;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var DeferredPromise = function () {
    function DeferredPromise() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return DeferredPromise;
}();
exports.DeferredPromise = DeferredPromise;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-floating-promises */
var seaters_api_context_1 = __webpack_require__(4);
var AppApi = function () {
    function AppApi(apiContext) {
        this.apiContext = apiContext;
    }
    AppApi.prototype.env = function () {
        return this.apiContext.get('/app/env');
    };
    AppApi.prototype.countries = function (pagingOptions) {
        var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
        return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/countries', null, queryParams));
    };
    AppApi.prototype.languages = function (pagingOptions) {
        var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
        return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/languages', null, queryParams));
    };
    AppApi.prototype.timeZones = function (pagingOptions) {
        var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
        return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/time-zones', null, queryParams));
    };
    AppApi.prototype.currencies = function (pagingOptions) {
        var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
        return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/currencies', null, queryParams));
    };
    AppApi.prototype.translations = function (target, language, pagingOptions) {
        var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
        if (target) {
            queryParams.target = target;
        }
        if (language) {
            queryParams.lang = language;
        }
        return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/translations', null, queryParams));
    };
    return AppApi;
}();
exports.AppApi = AppApi;
/* tslint:enable:no-floating-promises */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-floating-promises */

Object.defineProperty(exports, "__esModule", { value: true });
var seaters_api_1 = __webpack_require__(1);
var FanApi = function () {
    function FanApi(apiContext) {
        this.apiContext = apiContext;
    }
    FanApi.prototype.fan = function () {
        return this.apiContext.get('/fan');
    };
    FanApi.prototype.updateFan = function (fan) {
        return this.apiContext.put('/fan', fan);
    };
    FanApi.prototype.fanGroup = function (fanGroupId) {
        return this.apiContext.get('/fan/groups/:fanGroupId', { fanGroupId: fanGroupId });
    };
    FanApi.prototype.fanGroupBySlug = function (slug) {
        return this.apiContext.get('/fan/fangroups-by-slug/:slug', { slug: slug });
    };
    FanApi.prototype.fanGroupLookBySlug = function (slug) {
        return this.apiContext.get('/fan/fangroups-by-slug/:slug/look', { slug: slug });
    };
    FanApi.prototype.fanGroupTranslatedDescription = function (fanGroupId) {
        return this.apiContext.get('/fan/groups/:fanGroupId/translated-description', { fanGroupId: fanGroupId });
    };
    FanApi.prototype.fanGroups = function (fanGroupIds) {
        return this.apiContext.get('/fan/groups', {}, {
            groupIds: fanGroupIds
        });
    };
    FanApi.prototype.fanGroupLook = function (slug) {
        return this.apiContext.get('/fan/fangroups-by-slug/:slug/look', { slug: slug });
    };
    FanApi.prototype.joinFanGroup = function (fanGroupId) {
        return this.apiContext.post('/fan/groups/:fanGroupId', null, { fanGroupId: fanGroupId });
    };
    FanApi.prototype.joinProtectedFanGroup = function (fg, code) {
        var data = {
            code: code
        };
        var endpointParams = { fanGroupId: fg.id };
        if (!fg.membership.request) {
            var endpoint1 = '/fan/groups/:fanGroupId/request-with-data';
            return this.apiContext.post(endpoint1, data, endpointParams);
        } else {
            var endpoint2 = '/fan/groups/:fanGroupId/request';
            return this.apiContext.put(endpoint2, data, endpointParams);
        }
    };
    FanApi.prototype.leaveFanGroup = function (fanGroupId) {
        return this.apiContext.delete('/fan/groups/:fanGroupId', { fanGroupId: fanGroupId });
    };
    FanApi.prototype.shareFanGroup = function (fanGroupId) {
        return this.apiContext.get('/fan/groups/:fanGroupId/share', { fanGroupId: fanGroupId });
    };
    FanApi.prototype.waitingListsInFanGroup = function (fanGroupId, pagingOptions) {
        var endpointParams = { fanGroupId: fanGroupId };
        var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
        return this.apiContext.get('/fan/groups/:fanGroupId/waiting-lists', endpointParams, queryParams);
    };
    FanApi.prototype.waitingListsInFanGroups = function (fanGroupIds, pagingOptions) {
        var endpointParams = undefined;
        var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
        queryParams = Object.assign(queryParams, {
            groupIds: fanGroupIds
        });
        return this.apiContext.get('/fan/groups/waiting-lists', endpointParams, queryParams);
    };
    FanApi.prototype.joinedFanGroups = function (pagingOptions) {
        return this.apiContext.get('/fan/joined-groups', null, seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions));
    };
    FanApi.prototype.joinedWaitingListsWithoutSeat = function (pagingOptions) {
        return this.apiContext.get('/fan/joined-waiting-lists', null, seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions));
    };
    FanApi.prototype.joinedWaitingListsWithSeat = function (pagingOptions) {
        return this.apiContext.get('/fan/active-waiting-lists-with-seat', null, seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions));
    };
    FanApi.prototype.waitingList = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.get(endpoint, endpointParams);
    };
    FanApi.prototype.waitingLists = function (waitingListIds) {
        var endpoint = '/fan/waiting-lists';
        return this.apiContext.put(endpoint, {
            waitingListIds: waitingListIds
        });
    };
    FanApi.prototype.waitingListPrice = function (waitingListId, numberOfSeats) {
        var endpoint = '/fan/waiting-lists/:waitingListId/price/:numberOfSeats';
        var endpointParams = {
            waitingListId: waitingListId,
            numberOfSeats: numberOfSeats
        };
        return this.apiContext.get(endpoint, endpointParams);
    };
    FanApi.prototype.joinWaitingList = function (waitingListId, numberOfSeats) {
        var endpoint = '/fan/waiting-lists/:waitingListId/position';
        var endpointParams = { waitingListId: waitingListId };
        var data = { numberOfSeats: numberOfSeats };
        return this.apiContext.post(endpoint, data, endpointParams);
    };
    FanApi.prototype.joinProtectedWaitingList = function (wl, code, numberOfSeats) {
        var data = {
            code: code,
            numberOfSeats: numberOfSeats
        };
        var endpointParams = { waitingListId: wl.waitingListId };
        var endpoint = '/fan/waiting-lists/:waitingListId/request';
        if (!wl.request) {
            return this.apiContext.post(endpoint, data, endpointParams);
        } else {
            return this.apiContext.put(endpoint, data, endpointParams);
        }
    };
    FanApi.prototype.leaveWaitingList = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId/position';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.delete(endpoint, endpointParams).then(function () {
            return undefined;
        });
    };
    FanApi.prototype.acceptSeats = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId/accept';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.post(endpoint, null, endpointParams);
    };
    FanApi.prototype.rejectSeats = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId/reject';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.post(endpoint, null, endpointParams);
    };
    FanApi.prototype.exportSeats = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId/export-seat';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.put(endpoint, null, endpointParams);
    };
    FanApi.prototype.positionPaymentInfo = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId/position/payment-info';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.get(endpoint, endpointParams);
    };
    FanApi.prototype.positionBraintreeToken = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId/position/braintree-token';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.get(endpoint, endpointParams);
    };
    FanApi.prototype.getPositionSalesTransaction = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId/transaction';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.get(endpoint, endpointParams);
    };
    FanApi.prototype.createPositionSalesTransaction = function (waitingListId, transaction) {
        var endpoint = '/fan/waiting-lists/:waitingListId/transaction';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.post(endpoint, transaction, endpointParams);
    };
    FanApi.prototype.deletePositionSalesTransaction = function (waitingListId) {
        var endpoint = '/fan/waiting-lists/:waitingListId/transaction';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.delete(endpoint, endpointParams);
    };
    FanApi.prototype.updateAttendeesInfo = function (waitingListId, attendeesInfo) {
        var endpoint = '/v2/fan/waiting-lists/:waitingListId/position/attendees-info';
        var endpointParams = { waitingListId: waitingListId };
        return this.apiContext.put(endpoint, attendeesInfo, endpointParams);
    };
    FanApi.prototype.getEventDescription = function (waitingListId) {
        return this.apiContext.get('/fan/waiting-lists/:waitingListId/event-description', { waitingListId: waitingListId });
    };
    FanApi.prototype.getVenueConditions = function (waitingListId) {
        return this.apiContext.get('/fan/waiting-lists/:waitingListId/venue-conditions', { waitingListId: waitingListId });
    };
    FanApi.prototype.getTranslatedEventDescription = function (waitingListId) {
        return this.apiContext.get('/fan/waiting-lists/:waitingListId/translated-event-description', { waitingListId: waitingListId });
    };
    FanApi.prototype.getTranslatedVenueConditions = function (waitingListId) {
        return this.apiContext.get('/fan/waiting-lists/:waitingListId/translated-venue-conditions', { waitingListId: waitingListId });
    };
    return FanApi;
}();
exports.FanApi = FanApi;
/* tslint:enable:no-floating-promises */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var HealthApi = function () {
    function HealthApi(apiContext) {
        this.apiContext = apiContext;
    }
    HealthApi.prototype.node = function () {
        return this.apiContext.doSeatersRequest({
            method: 'GET',
            abstractEndpoint: '/health/node'
        });
    };
    return HealthApi;
}();
exports.HealthApi = HealthApi;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.HEALTH_NODE_OK = 'OK';

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var AuthenticationApi = function () {
    function AuthenticationApi(apiContext) {
        this.apiContext = apiContext;
    }
    /**
     * Login using email-password credentials
     * @param credentials email, password and optionally MFA token
     */
    AuthenticationApi.prototype.emailPasswordLogin = function (credentials) {
        return this.apiContext.put('/v2/authentication/login', credentials);
    };
    /**
     * Login using long-term stored token
     * @param credentials long term stored token and optionally MFA token
     */
    AuthenticationApi.prototype.storedTokenLogin = function (credentials) {
        return this.apiContext.put('/v2/authentication/stored-token', credentials);
    };
    /**
     * Extend your session with a refresh token
     * @param credentials Refresh token
     */
    AuthenticationApi.prototype.refreshTokenLogin = function (credentials) {
        return this.apiContext.put('/v2/authentication/refresh-token', credentials);
    };
    /**
     * Signs up a new user
     * @param input
     * @returns {any}
     */
    AuthenticationApi.prototype.signup = function (input) {
        return this.apiContext.post('/v2/authentication/signup', input);
    };
    /**
     * Validates an email or phone number and marks it as confirmed
     *
     * @param input Either the email or the phone and the confirmation code
     * @returns Promise that resolves with the validated user or rejects with a SeatersApiException
     * @see SeatersApiException
     */
    AuthenticationApi.prototype.validate = function (input) {
        return this.apiContext.put('/auth/validate', input);
    };
    /**
     *
     * @param input
     * @returns {any}
     */
    AuthenticationApi.prototype.resetEmail = function (input) {
        return this.apiContext.post('/auth/signup/reset-email', input);
    };
    /**
     * Obtain a seaters ession by passing an oauth code for a given provider
     * Examples that should work are github, facebook. For your specific provider name
     * please refer to a seaters developer.
     */
    AuthenticationApi.prototype.loginWithOAuthCode = function (oauthProvider, code) {
        var endpoint = '/login/:oauthProvider';
        var endpointParams = { oauthProvider: oauthProvider };
        var queryParams = { code: code };
        return this.apiContext.get(endpoint, endpointParams, queryParams);
    };
    return AuthenticationApi;
}();
exports.AuthenticationApi = AuthenticationApi;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fan_types_1 = __webpack_require__(2);
var util_1 = __webpack_require__(0);
var WAITING_LIST_ACTION_STATUS = fan_types_1.fan.WAITING_LIST_ACTION_STATUS;
var EXPORTABLE_TICKETING_SYSTEMS = ['UPLOAD', 'DIGITICK'];
var WaitingListService = function () {
    function WaitingListService(api) {
        this.api = api;
    }
    WaitingListService.prototype.getWaitingList = function (waitingListId) {
        var _this = this;
        return this.getRawWaitingList(waitingListId).then(function (wl) {
            return _this.extendRawWaitingList(wl);
        });
    };
    WaitingListService.prototype.getWaitingLists = function (waitingListIds) {
        var _this = this;
        return this.api.fan.waitingLists(waitingListIds).then(function (wls) {
            return wls.map(function (wl) {
                return _this.extendRawWaitingList(wl);
            });
        });
    };
    WaitingListService.prototype.getWaitingListsInFanGroup = function (fanGroupId, pagingOptions) {
        return this.api.fan.waitingListsInFanGroup(fanGroupId, pagingOptions);
    };
    WaitingListService.prototype.getWaitingListsInFanGroups = function (fanGroupIds, pagingOptions) {
        return this.api.fan.waitingListsInFanGroups(fanGroupIds, pagingOptions);
    };
    WaitingListService.prototype.getMyWaitingListsWithoutSeat = function (page) {
        var _this = this;
        return this.api.fan.joinedWaitingListsWithoutSeat(page).then(function (res) {
            return _this.extendRawWaitingLists(res);
        });
    };
    WaitingListService.prototype.getMyWaitingListsWithSeat = function (page) {
        var _this = this;
        return this.api.fan.joinedWaitingListsWithSeat(page).then(function (res) {
            return _this.extendRawWaitingLists(res);
        });
    };
    WaitingListService.prototype.getPositionBraintreePaymentInfo = function (waitingListId) {
        var _this = this;
        return this.getPositionPaymentInfo(waitingListId).then(function (paymentInfo) {
            // ensure it's a proper braintree payment
            if (paymentInfo.paymentSystemType !== 'BRAINTREE') {
                throw new Error('WaitingList ' + waitingListId + ' is not configured to use braintree');
            }
            if (paymentInfo.transactions.length !== 1) {
                console.error('[FanService] unexpected nbr of transactions for wl (%s) : %s', waitingListId, paymentInfo.transactions.length);
                throw new Error('Unexpected number of transactions for braintree payment for WL ' + waitingListId);
            }
            // fetch the token for this position
            return _this.positionBraintreeToken(waitingListId).then(function (braintreeToken) {
                // combine the settings with the token
                return {
                    total: paymentInfo.transactions[0].total,
                    currency: paymentInfo.transactions[0].currency,
                    threeDSEnabled: paymentInfo.braintreeConfig.threeDSEnabled,
                    token: braintreeToken.token
                };
            });
        });
    };
    WaitingListService.prototype.joinWaitingList = function (waitingListId, numberOfSeats) {
        var _this = this;
        return this.api.fan.joinWaitingList(waitingListId, numberOfSeats).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                return wl.actionStatus !== WAITING_LIST_ACTION_STATUS.BOOK;
            });
        }).then(function (wl) {
            return _this.waitForDirectSales(wl);
        });
    };
    WaitingListService.prototype.joinProtectedWaitingList = function (waitingListId, code, numberOfSeats) {
        var _this = this;
        return this.getWaitingList(waitingListId).then(function (wl) {
            return _this.api.fan.joinProtectedWaitingList(wl, code, numberOfSeats);
        }).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                return _this.checkUnlockStatus(wl);
            });
        }).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                return wl.actionStatus !== WAITING_LIST_ACTION_STATUS.UNLOCK;
            });
        }).then(function (wl) {
            return _this.waitForDirectSales(wl);
        });
    };
    WaitingListService.prototype.leaveWaitingList = function (waitingListId) {
        var _this = this;
        return this.api.fan.leaveWaitingList(waitingListId).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                return wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK;
            });
        });
    };
    WaitingListService.prototype.getPositionPaymentInfo = function (waitingListId) {
        return this.api.fan.positionPaymentInfo(waitingListId);
    };
    WaitingListService.prototype.payPosition = function (waitingListId, transaction) {
        var _this = this;
        return this.submitTransaction(waitingListId, transaction).then(function () {
            return _this.waitUntilCanGoLive(waitingListId);
        });
    };
    WaitingListService.prototype.preauthorizePosition = function (waitingListId, transaction) {
        var _this = this;
        return this.submitTransaction(waitingListId, transaction).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                return wl.position.expirationDate === null;
            });
        });
    };
    WaitingListService.prototype.saveAttendeesInfo = function (waitingListId, attendeesInfo) {
        var _this = this;
        return this.api.fan.updateAttendeesInfo(waitingListId, attendeesInfo).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                var storedAttendees = wl.position.attendeesInfo && wl.position.attendeesInfo.attendees || [];
                // every attendee must be found in the stored attendees
                // console.log('storedAttendees', storedAttendees);
                // console.log('input attendees', attendeesInfo.attendees);
                return attendeesInfo.attendees.every(function (attendee) {
                    return !!storedAttendees.find(function (storedAttendee) {
                        return util_1.compareFlatObjects(attendee, storedAttendee);
                    });
                });
            });
        });
    };
    WaitingListService.prototype.acceptSeats = function (waitingListId) {
        var _this = this;
        return this.api.fan.acceptSeats(waitingListId).then(function () {
            return _this.waitUntilCanGoLive(waitingListId);
        });
    };
    WaitingListService.prototype.rejectSeats = function (waitingListId) {
        var _this = this;
        return this.api.fan.rejectSeats(waitingListId).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                return wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK || wl.actionStatus === WAITING_LIST_ACTION_STATUS.UNLOCK;
            });
        });
    };
    WaitingListService.prototype.exportSeats = function (waitingListId) {
        var _this = this;
        return this.waitUntilSeatsCanBeExported(waitingListId).then(function () {
            return _this.api.fan.exportSeats(waitingListId);
        }).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                return wl && wl.seat && wl.seat.exportedVoucherUrl && wl.seat.exportedVoucherUrl.length > 0;
            });
        });
    };
    WaitingListService.prototype.getEventDescriptionForWaitingList = function (waitingListId) {
        return this.api.fan.getEventDescription(waitingListId);
    };
    WaitingListService.prototype.getTranslatedEventDescriptionForWaitingList = function (waitingListId) {
        return this.api.fan.getTranslatedEventDescription(waitingListId);
    };
    WaitingListService.prototype.getVenueConditionsForWaitingList = function (waitingListId) {
        return this.api.fan.getVenueConditions(waitingListId);
    };
    WaitingListService.prototype.getTranslatedVenueConditionsForWaitingList = function (waitingListId) {
        return this.api.fan.getTranslatedVenueConditions(waitingListId);
    };
    WaitingListService.prototype.positionBraintreeToken = function (waitingListId) {
        return this.api.fan.positionBraintreeToken(waitingListId);
    };
    WaitingListService.prototype.getWaitingListPrice = function (waitingListId, numberOfSeats) {
        return this.api.fan.waitingListPrice(waitingListId, numberOfSeats);
    };
    WaitingListService.prototype.hasPreviousPayment = function (wl) {
        return !!(wl.position && wl.position.transactionStatus);
    };
    WaitingListService.prototype.hasPaymentInProgress = function (wl) {
        if (!wl.position) {
            return false;
        } else {
            return ['CREATING', 'CREATED', 'APPROVED', 'CANCELLED', 'REFUNDING'].indexOf(wl.position.transactionStatus) >= 0;
        }
    };
    WaitingListService.prototype.canPay = function (wl) {
        if (WAITING_LIST_ACTION_STATUS.WAIT === wl.actionStatus) {
            return !!wl.position.expirationDate;
        } else if (WAITING_LIST_ACTION_STATUS.CONFIRM === wl.actionStatus) {
            return !wl.position.transactionStatus || wl.position.transactionStatus === 'FAILURE';
        } else {
            return false;
        }
    };
    WaitingListService.prototype.checkUnlockStatus = function (wl) {
        if (!wl.request) {
            console.error('[WaitingListService] checkUnlockStatus - no request made');
            // tslint:disable-next-line
            throw 'strs.api.servererror';
        } else if (wl.request.status === 'PENDING') {
            return false;
        } else if (wl.request.status === 'ACCEPTED') {
            return true;
        } else if (wl.request.status === 'REJECTED') {
            console.warn('[WaitingListService] checkUnlockStatus - code rejected');
            // tslint:disable-next-line
            throw 'strs.api.wl.invalidcode';
        } else {
            console.error('[WaitingListService] checkUnlockStatus - unknown status');
            // tslint:disable-next-line
            throw 'strs.api.servererror';
        }
    };
    WaitingListService.prototype.getRawWaitingList = function (waitingListId) {
        return this.api.fan.waitingList(waitingListId);
    };
    WaitingListService.prototype.extendRawWaitingList = function (wl) {
        return Object.assign(wl, {
            actionStatus: this.getWaitingListActionStatus(wl),
            // (T)ODO: pending status
            shouldProvideAttendeesInfo: this.shouldProvideAttendeesInfo(wl),
            processing: undefined
        });
    };
    WaitingListService.prototype.extendRawWaitingLists = function (wls) {
        var _this = this;
        wls.items = wls.items.map(function (wl) {
            return _this.extendRawWaitingList(wl);
        });
        return wls;
    };
    WaitingListService.prototype.pollWaitingList = function (waitingListId, condition, limit, delayInMs) {
        var _this = this;
        return util_1.retryUntil(function () {
            return _this.getWaitingList(waitingListId);
        }, condition, limit || 10, delayInMs || 1000);
    };
    WaitingListService.prototype.getWaitingListActionStatus = function (waitingList) {
        var seat = waitingList.seat;
        var position = waitingList.position;
        var request = waitingList.request;
        // Comming soon
        if (waitingList.waitingListStatus === 'PUBLISHED') {
            return WAITING_LIST_ACTION_STATUS.SOON;
        }
        // Not in WL
        if (!position) {
            // Code protected WL
            if (waitingList.accessMode === 'CODE_PROTECTED') {
                if (!request) {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK;
                } else if (request.status === 'PENDING') {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK; // (-)PENDING
                } else if (request.status === 'REJECTED') {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK;
                } else if (request.status === 'ACCEPTED') {
                    return WAITING_LIST_ACTION_STATUS.BOOK;
                } else {
                    console.error('[WaitingListService] - unexpected request status: %s', request.status);
                    return WAITING_LIST_ACTION_STATUS.ERROR;
                }
            } else if (waitingList.accessMode === 'PUBLIC') {
                // Public WL
                return WAITING_LIST_ACTION_STATUS.BOOK;
            } else {
                console.error('[WaitingListService] - unexpected accessMode: %s', waitingList.accessMode);
                return WAITING_LIST_ACTION_STATUS.ERROR;
            }
        }
        // In WL
        if (position.status === 'WAITING_SEAT') {
            return WAITING_LIST_ACTION_STATUS.WAIT;
        }
        // In WL with seat
        if (position.status === 'HAS_SEAT') {
            if (seat) {
                if (seat.status === 'ASSIGNED') {
                    // free WL
                    if (waitingList.freeWaitingList) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    } else if (!position.transactionStatus) {
                        // non free WL
                        // no payment yet
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    } else if (['FAILURE', 'CANCELLED', 'REFUNDED'].indexOf(position.transactionStatus) >= 0) {
                        // failed payment
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    } else if (['CREATING', 'CREATED', 'APPROVED', 'REFUNDING'].indexOf(position.transactionStatus) >= 0) {
                        // payment in progress
                        return WAITING_LIST_ACTION_STATUS.CONFIRM; // (-)PENDING
                    } else {
                        console.error('[WaitingListService] - unexpected transactionStatus: %s', position.transactionStatus);
                        return WAITING_LIST_ACTION_STATUS.ERROR;
                    }
                } else if (waitingList.seatDistributionMode === 'TICKET' && seat.ticketingSystemType) {
                    // non-voucher - tickets are being requested
                    return WAITING_LIST_ACTION_STATUS.CONFIRM; // (-)PENDING
                } else if (seat.status === 'ACCEPTED') {
                    // go live
                    return WAITING_LIST_ACTION_STATUS.GO_LIVE;
                } else {
                    console.error('[WaitingListService] unexpected seat status: %s', seat.status);
                    return WAITING_LIST_ACTION_STATUS.ERROR;
                }
            } else {
                console.error('[WaitingListService] has seat without actual seat');
                return WAITING_LIST_ACTION_STATUS.ERROR;
            }
        } else if (position.status === 'BEING_PROCESSED') {
            return WAITING_LIST_ACTION_STATUS.WAIT; // (-)PENDING
        } else {
            console.error('[WaitinglistService] unexpected position status: %s', position.status);
            return WAITING_LIST_ACTION_STATUS.ERROR;
        }
    };
    WaitingListService.prototype.waitForDirectSales = function (wl) {
        var _this = this;
        // Immediately return when wl is not direct sales
        if (!wl.directSalesEnabled) {
            return Promise.resolve(wl);
        }
        console.log('waiting list is direct sales', wl);
        // Instantly resolve when waiting list was already confirmed
        if (wl.actionStatus === WAITING_LIST_ACTION_STATUS.CONFIRM) {
            return Promise.resolve(wl);
        }
        // Wait a bit for direct sales to come through
        return util_1.timeoutPromise(1000).then(function () {
            return _this.getWaitingList(wl.waitingListId);
        });
    };
    WaitingListService.prototype.hasVoucher = function (wl) {
        return wl.seatDistributionMode === 'VOUCHER' && wl.seat && wl.seat.voucherNumber && wl.seat.voucherNumber !== '';
    };
    WaitingListService.prototype.hasTicket = function (wl) {
        return wl.seatDistributionMode === 'TICKET' && wl.seat && !!wl.seat.ticketingSystemType;
    };
    WaitingListService.prototype.seatsCanBeExported = function (wl) {
        if (!(this.hasVoucher(wl) || this.hasTicket(wl))) {
            return false;
        }
        switch (wl.seatDistributionMode) {
            case 'VOUCHER':
                return true;
            case 'TICKET':
                var ts = wl.seat.ticketingSystemType;
                if (EXPORTABLE_TICKETING_SYSTEMS.indexOf(ts) < 0) {
                    throw new Error('Ticketing system type "' + ts + '" does not support exporting tickets');
                }
                return true;
            default:
                throw new Error('Unknown WL seatDistributionMode ' + JSON.stringify(wl.seatDistributionMode));
        }
    };
    WaitingListService.prototype.waitUntilCanGoLive = function (waitingListId) {
        return this.pollWaitingList(waitingListId, function (wl) {
            return wl.actionStatus === WAITING_LIST_ACTION_STATUS.GO_LIVE;
        });
    };
    WaitingListService.prototype.waitUntilSeatsCanBeExported = function (waitingListId) {
        var _this = this;
        return this.pollWaitingList(waitingListId, function (wl) {
            return _this.seatsCanBeExported(wl);
        }, 60, 1000);
    };
    WaitingListService.prototype.shouldProvideAttendeesInfo = function (wl) {
        if (!wl.eventRequiredAttendeeInfo || wl.eventRequiredAttendeeInfo.length === 0) {
            // if no info is asked, we don't need to ask for attendee info
            return false;
        } else {
            return true;
        }
    };
    WaitingListService.prototype.submitTransaction = function (waitingListId, transaction) {
        var _this = this;
        return this.getWaitingList(waitingListId).then(function (wl) {
            return _this.ensureFanCanPayPosition(wl);
        }).then(function (wl) {
            return _this.removePreviousTransactionIfAny(wl);
        }).then(function (wl) {
            return _this.createTransaction(waitingListId, transaction);
        }).then(undefined, function (err) {
            console.error('[WaitingListService] submitTransaction failed: %s', err, transaction);
            throw err;
        });
    };
    WaitingListService.prototype.ensureFanCanPayPosition = function (wl) {
        if (!this.canPay(wl)) {
            throw new Error('Trying to submit transaction for WL that is not in a state that requires payment');
        } else if (this.hasPaymentInProgress(wl)) {
            throw new Error('Trying to submit transaction for WL which has a payment in progress');
        } else {
            return Promise.resolve(wl);
        }
    };
    WaitingListService.prototype.removePreviousTransactionIfAny = function (wl) {
        var _this = this;
        if (!this.hasPreviousPayment(wl)) {
            return Promise.resolve(wl);
        }
        return this.api.fan.deletePositionSalesTransaction(wl.waitingListId).then(function () {
            return _this.pollWaitingList(wl.waitingListId, function (wl) {
                return _this.hasPreviousPayment(wl);
            }, 60, 1000);
        });
    };
    WaitingListService.prototype.createTransaction = function (waitingListId, transaction) {
        var _this = this;
        return this.api.fan.createPositionSalesTransaction(waitingListId, transaction).then(function () {
            return _this.pollWaitingList(waitingListId, function (wl) {
                return _this.hasProcessedPayment(wl);
            }, 60, 1000);
        });
    };
    WaitingListService.prototype.hasProcessedPayment = function (wl) {
        return wl.position && ['FAILURE', 'COMPLETED'].indexOf(wl.position.transactionStatus) >= 0;
    };
    return WaitingListService;
}();
exports.WaitingListService = WaitingListService;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var fan_types_1 = __webpack_require__(2);
var FAN_GROUP_ACTION_STATUS = fan_types_1.fan.FAN_GROUP_ACTION_STATUS;
var FanGroupService = function () {
    function FanGroupService(api) {
        this.api = api;
    }
    FanGroupService.prototype.getFanGroups = function (fanGroupIds) {
        var _this = this;
        return this.api.fan.fanGroups(fanGroupIds).then(function (fgs) {
            return fgs.map(function (fg) {
                return _this.extendRawWaitingList(fg);
            });
        });
    };
    FanGroupService.prototype.getFanGroup = function (fanGroupId) {
        var _this = this;
        return this.getRawFanGroup(fanGroupId).then(function (fg) {
            return Object.assign(fg, {
                actionStatus: _this.getFanGroupActionStatus(fg)
            });
        });
    };
    FanGroupService.prototype.getFanGroupBySlug = function (slug) {
        var _this = this;
        return this.api.fan.fanGroupBySlug(slug).then(function (fg) {
            return Object.assign(fg, {
                actionStatus: _this.getFanGroupActionStatus(fg)
            });
        });
    };
    FanGroupService.prototype.getFanGroupLookBySlug = function (slug) {
        return this.api.fan.fanGroupLookBySlug(slug);
    };
    FanGroupService.prototype.getFanGroupTranslatedDescription = function (fanGroupId) {
        return this.api.fan.fanGroupTranslatedDescription(fanGroupId);
    };
    FanGroupService.prototype.joinFanGroup = function (fanGroupId) {
        var _this = this;
        return this.api.fan.joinFanGroup(fanGroupId).then(function () {
            return util_1.retryUntil(function () {
                return _this.getFanGroup(fanGroupId);
            }, function (fg) {
                return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE;
            }, 10, 1000);
        });
    };
    FanGroupService.prototype.joinProtectedFanGroup = function (fanGroupId, code) {
        var _this = this;
        return this.getFanGroup(fanGroupId).then(function (fg) {
            return _this.api.fan.joinProtectedFanGroup(fg, code);
        }).then(function () {
            return _this.pollFanGroup(fanGroupId, function (fg) {
                return _this.checkUnlockStatus(fg);
            });
        }).then(function () {
            return _this.pollFanGroup(fanGroupId, function (fg) {
                return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE;
            });
        });
    };
    FanGroupService.prototype.leaveFanGroup = function (fanGroupId) {
        var _this = this;
        return this.api.fan.leaveFanGroup(fanGroupId).then(function () {
            return _this.pollFanGroup(fanGroupId, function (fg) {
                return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_JOIN;
            });
        });
    };
    FanGroupService.prototype.shareFanGroup = function (fanGroupId) {
        return this.api.fan.shareFanGroup(fanGroupId);
    };
    FanGroupService.prototype.checkUnlockStatus = function (fg) {
        if (!fg.membership.request) {
            console.error('[FanGroupService] checkUnlockStatus - no request made');
            throw new Error('strs.api.servererror');
        } else if (fg.membership.request.status === 'PENDING') {
            return false;
        } else if (fg.membership.request.status === 'ACCEPTED') {
            return true;
        } else if (fg.membership.request.status === 'REJECTED') {
            console.warn('[FanGroupService] checkUnlockStatus - code rejected');
            throw new Error('strs.api.fg.invalidcode');
        } else {
            console.error('[FanGroupService] checkUnlockStatus - unknown status');
            throw new Error('strs.api.servererror');
        }
    };
    FanGroupService.prototype.extendRawWaitingList = function (fg) {
        return Object.assign(fg, {
            actionStatus: this.getFanGroupActionStatus(fg)
        });
    };
    FanGroupService.prototype.getRawFanGroup = function (fanGroupId) {
        return this.api.fan.fanGroup(fanGroupId);
    };
    FanGroupService.prototype.getFanGroupActionStatus = function (fanGroup) {
        var membership = fanGroup.membership;
        if (membership.member) {
            return FAN_GROUP_ACTION_STATUS.CAN_LEAVE;
        } else if (fanGroup.accessMode === 'PUBLIC' || membership.request && membership.request.status === 'ACCEPTED') {
            return FAN_GROUP_ACTION_STATUS.CAN_JOIN;
        } else if (membership.request && membership.request.status === 'PENDING') {
            return FAN_GROUP_ACTION_STATUS.WAITING_FOR_APPROVAL;
        } else if (fanGroup.accessMode === 'CODE_PROTECTED' || fanGroup.accessMode === 'PRIVATE') {
            return FAN_GROUP_ACTION_STATUS.CAN_UNLOCK;
        }
        // state that was not implemented
        console.error('GroupService - unhandled group status', JSON.stringify(fanGroup));
    };
    FanGroupService.prototype.pollFanGroup = function (fanGroupId, condition) {
        var _this = this;
        return util_1.retryUntil(function () {
            return _this.getFanGroup(fanGroupId);
        }, condition, 10, 1000);
    };
    return FanGroupService;
}();
exports.FanGroupService = FanGroupService;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(44));
__export(__webpack_require__(45));
exports.TYPE_FIELD = 'type';
exports.TYPO_TOLERANCE_STRICT = 'strict';

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = '1.20.12';
__export(__webpack_require__(17));
var fan_types_1 = __webpack_require__(2);
exports.fan = fan_types_1.fan;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(3);
var seaters_api_1 = __webpack_require__(1);
var services_1 = __webpack_require__(34);
var SeatersClient = function () {
    function SeatersClient(options) {
        options = Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
        var requestDriver = api_1.getRequestDriver(options.requestDriver);
        this.seatersApi = new seaters_api_1.SeatersApi(options.apiPrefix, requestDriver);
        this.sessionService = new services_1.SessionService(this.seatersApi);
        this.appService = new services_1.AppService(this.seatersApi);
        this.publicService = new services_1.PublicService(this.appService, requestDriver, this.seatersApi);
        this.fanService = new services_1.FanService(this.seatersApi, this.sessionService, this.publicService);
    }
    return SeatersClient;
}();
SeatersClient.DEFAULT_OPTIONS = {
    apiPrefix: 'https://api.dev-seaters.com/api',
    requestDriver: 'BROWSER'
};
exports.SeatersClient = SeatersClient;
/**
 * Obtain a seaters client. This will only instantiate the client with the given options the first time you invoke it.
 * Calls made after the initial call will return the original instance.
 */
exports.getSeatersClient = function () {
    var client = undefined;
    return function (options) {
        if (!client) {
            client = new SeatersClient(options);
        }
        return client;
    };
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var subject_1 = __webpack_require__(5);
var api_endpoint_1 = __webpack_require__(6);
var ApiContext = function () {
    function ApiContext(apiPrefix, requestDriver) {
        this.apiPrefix = apiPrefix;
        this.requestDriver = requestDriver;
        this.requestsSubject = new subject_1.Subject();
        this.headers = new Map();
        this.headers.set('Content-Type', 'application/json');
    }
    ApiContext.prototype.setHeader = function (header, value) {
        this.headers.set(header, value);
    };
    ApiContext.prototype.unsetHeader = function (header) {
        this.headers.delete(header);
    };
    ApiContext.prototype.createEndpoint = function (requestDefinition) {
        return new api_endpoint_1.ApiEndpoint(requestDefinition.abstractEndpoint, requestDefinition.endpointParams || {}, requestDefinition.queryParams || {}, this.apiPrefix);
    };
    ApiContext.prototype.createRequestOptions = function (requestDefinition, endpoint) {
        var headers = this.mergeHeaders(requestDefinition.headers);
        var body = requestDefinition.body !== undefined ? JSON.stringify(requestDefinition.body) : null;
        return {
            url: endpoint.absoluteEndpoint,
            method: requestDefinition.method || 'GET',
            headers: headers,
            body: body
        };
    };
    ApiContext.prototype.doRequest = function (requestDefinition) {
        var endpoint = this.createEndpoint(requestDefinition);
        var requestOptions = this.createRequestOptions(requestDefinition, endpoint);
        var request = this.requestDriver(requestOptions);
        var apiRequest = {
            requestDefinition: requestDefinition,
            endpoint: endpoint,
            rawRequest: {
                options: requestOptions,
                promise: request
            }
        };
        // notify all request listeners about the request that was just started
        this.requestsSubject.next(apiRequest);
        return request;
    };
    ApiContext.prototype.mergeHeaders = function (otherHeaders) {
        var merged = {};
        this.headers.forEach(function (v, k) {
            return merged[k] = v;
        });
        return Object.assign(merged, otherHeaders);
    };
    return ApiContext;
}();
exports.ApiContext = ApiContext;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_TYPE;
(function (ERROR_TYPE) {
    ERROR_TYPE[ERROR_TYPE["CLIENT"] = 0] = "CLIENT";
    ERROR_TYPE[ERROR_TYPE["SERVER"] = 1] = "SERVER";
    ERROR_TYPE[ERROR_TYPE["LIBRARY"] = 2] = "LIBRARY";
})(ERROR_TYPE = exports.ERROR_TYPE || (exports.ERROR_TYPE = {}));

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Obtain the request driver for the given type
 */
function getRequestDriver(type) {
    switch (type) {
        case 'BROWSER':
            return __webpack_require__(21)['default'];
        default:
            return __webpack_require__(26)['default'];
    }
}
exports.getRequestDriver = getRequestDriver;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var READY_STATE_DONE = 4; // xhr readyState 4 means the request is done.
function buildServerResponse(xhr) {
    return {
        status: xhr.status,
        statusText: xhr.statusText,
        body: xhr.responseText,
        headers: Object,
        driver: 'BROWSER',
        raw: xhr
    };
}
function buildXhr(options) {
    var xhr = new window.XMLHttpRequest();
    xhr.open(options.method, options.url);
    var headers = options.headers;
    if (headers) {
        Object.keys(headers).forEach(function (header) {
            var value = headers[header];
            xhr.setRequestHeader(header, value);
        });
    }
    xhr.send(options.body);
    return xhr;
}
function default_1(options) {
    var xhr = buildXhr(options);
    var deferred = new util_1.DeferredPromise();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === READY_STATE_DONE) {
            deferred.resolve(buildServerResponse(xhr));
        }
    };
    return deferred.promise;
}
exports.default = default_1;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var deferred_promise_1 = __webpack_require__(7);
var RetryUntilTimeoutError = function (_super) {
    __extends(RetryUntilTimeoutError, _super);
    function RetryUntilTimeoutError(limit) {
        var _this = _super.call(this, 'retryUntil - maximum number of tries was reached (' + limit + ')') || this;
        _this.limit = limit;
        return _this;
    }
    return RetryUntilTimeoutError;
}(Error);
exports.RetryUntilTimeoutError = RetryUntilTimeoutError;
function retryUntil(promiseFn, conditionFn, limit, delay) {
    var deferred = new deferred_promise_1.DeferredPromise();
    function retry(attempt) {
        if (attempt > limit) {
            console.log('[retryUntil] - polling timeout');
            return deferred.reject(new RetryUntilTimeoutError(limit));
        }
        /* tslint:disable:no-floating-promises */
        promiseFn().then(function (result) {
            var conditionIsMet;
            try {
                conditionIsMet = conditionFn(result);
            } catch (e) {
                console.log('[retryUntil] - condition quit with an exception', e.message || e, e.stack || '<no stacktrace>');
                deferred.reject(e.toString && e.toString() || e);
                return undefined;
            }
            if (conditionIsMet) {
                console.log('[retryUntil] - condition has been met');
                deferred.resolve(result);
                return undefined;
            } else {
                // delay the next attempt if needed
                return timeoutPromise(delay || 0).then(function () {
                    return retry(attempt + 1);
                });
            }
        });
        /* tslint:enable:no-floating-promises */
    }
    retry(1);
    return deferred.promise;
}
exports.retryUntil = retryUntil;
function timeoutPromise(timeInMs) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve();
        }, timeInMs);
    });
}
exports.timeoutPromise = timeoutPromise;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_COMPARISON_OPTIONS = {
    ignoreNullFields: false,
    ignoreUndefinedFields: false,
    looseComparison: false
};
/**
 * Deep compare of 2 objects; matching the value of each key
 * @param o an Object
 * @param p an Object
 * @param options
 */
function compareObjects(o, p, options) {
    var i;
    var keysO = Object.keys(o).sort();
    var keysP = Object.keys(p).sort();
    // initialize default options
    options = options || DEFAULT_COMPARISON_OPTIONS;
    // remove null fields from both objects
    if (options.ignoreNullFields) {
        keysO = keysO.filter(function (k) {
            return o[k] !== null;
        });
        keysP = keysP.filter(function (k) {
            return o[k] !== null;
        });
    }
    // remove undefined fields from both objects
    if (options.ignoreUndefinedFields) {
        keysO = keysO.filter(function (k) {
            return o[k] !== undefined;
        });
        keysP = keysP.filter(function (k) {
            return o[k] !== undefined;
        });
    }
    if (keysO.length !== keysP.length) {
        return false;
    }
    // not the same nr of keys
    if (keysO.join('') !== keysP.join('')) {
        return false;
    }
    // different keys
    for (i = 0; i < keysO.length; ++i) {
        if (o[keysO[i]] instanceof Array) {
            if (!(p[keysO[i]] instanceof Array)) {
                return false;
            }
            // (i)f (compareObjects(o[keysO[i]], p[keysO[i]] === false) return false
            // (w)ould work, too, and perhaps is a better fit, still, this is easy, too
            if (p[keysO[i]].sort().join('') !== o[keysO[i]].sort().join('')) {
                return false;
            }
        } else if (o[keysO[i]] instanceof Date) {
            if (!(p[keysO[i]] instanceof Date)) {
                return false;
            }
            if ('' + o[keysO[i]] !== '' + p[keysO[i]]) {
                return false;
            }
        } else if (o[keysO[i]] instanceof Function) {
            if (!(p[keysO[i]] instanceof Function)) {
                return false;
            }
            // (i)gnore functions, or check them regardless?
        } else if (o[keysO[i]] instanceof Object) {
            if (!(p[keysO[i]] instanceof Object)) {
                return false;
            }
            if (o[keysO[i]] === o) {
                if (p[keysO[i]] !== p) {
                    return false;
                }
            } else if (compareObjects(o[keysO[i]], p[keysO[i]], options) === false) {
                return false;
            } // (W)ARNING: does not deal with circular refs other than ^^
        }
        if (options.looseComparison) {
            if (o[keysO[i]].toString() !== p[keysO[i]].toString()) {
                return false;
            }
        } else {
            // (n)ot the same value
            if (o[keysO[i]] !== p[keysO[i]]) {
                return false;
            }
        }
    }
    return true;
}
exports.compareObjects = compareObjects;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
function createFlatArray(o, array) {
    Object.keys(o).map(function (key) {
        var value = o[key];
        if (value === undefined || value === null) {
            return;
        } else if (value instanceof Function) {
            throw new Error('Functions are not supported');
        } else if (value instanceof Array) {
            throw new Error('Arrays are not supported');
        } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
            return createFlatArray(value, array);
        }
        array.push(key + value);
        return;
    });
    return array;
}
/**
 * This function stringifies and sorts all key-values in the array and compares them
 * without any null or undefined values
 *
 * @param o {object}
 * @param p {object}
 * @returns {boolean} whether or not the objects o and p are equal
 */
function compareFlatObjects(o, p) {
    var oArray = createFlatArray(o, []);
    var pArray = createFlatArray(p, []);
    oArray.sort();
    pArray.sort();
    return oArray.join('') === pArray.join('');
}
exports.compareFlatObjects = compareFlatObjects;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SEATERS_DEFAULT_LOCALE = 'en';
var LocalizableText = function () {
    function LocalizableText(translationMap) {
        var _this = this;
        Object.keys(translationMap).forEach(function (k) {
            return _this[k] = translationMap[k];
        });
    }
    /**
     * Translate the text in the given locale. Will fall back to 'en' when neither locale neither fallbackLocale are available
     * @param locale Locale to try to retrieve the translated text
     * @param fallbackLocale Fall back to a translation in this locale if preferred locale was not available
     */
    LocalizableText.prototype.localize = function (locale, fallbackLocale) {
        if (this.hasOwnProperty(locale)) {
            return this[locale];
        } else if (this.hasOwnProperty(fallbackLocale)) {
            return this[fallbackLocale];
        } else if (this.hasOwnProperty(SEATERS_DEFAULT_LOCALE)) {
            return this[fallbackLocale];
        } else {
            var err = 'LocalizableText - translation map is missing SEATERS_DEFAULT_LOCALE: ' + JSON.stringify(this);
            console.error(err);
            throw err;
        }
    };
    return LocalizableText;
}();
exports.LocalizableText = LocalizableText;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var http = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"http\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var https = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"https\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var url = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"url\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
function buildHttpRequest(options) {
    var parsedUrl = url.parse(options.url);
    return {
        method: options.method || 'GET',
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.path,
        headers: options.headers
    };
}
function buildServerResponse(req, res, body) {
    return {
        status: res.statusCode,
        statusText: res.statusMessage,
        body: body,
        headers: Object,
        driver: 'NODE',
        raw: { req: req, res: res }
    };
}
function default_1(options) {
    var deferred = new util_1.DeferredPromise();
    var rawRequest = buildHttpRequest(options);
    var requestProvider = rawRequest.protocol === 'https:' ? https : http;
    console.log('%s %s', options.method || 'GET', options.url);
    var req = requestProvider.request(rawRequest, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            return body += chunk;
        });
        res.on('end', function () {
            return deferred.resolve(buildServerResponse(req, res, body));
        });
    });
    if (options.body) {
        console.log('data: %s', options.body);
        req.write(options.body);
    }
    req.end();
    return deferred.promise;
}
exports.default = default_1;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var app_api_1 = __webpack_require__(8);
var fan_api_1 = __webpack_require__(9);
var admin_1 = __webpack_require__(28);
var health_1 = __webpack_require__(31);
var authentication_api_1 = __webpack_require__(12);
var seaters_api_context_1 = __webpack_require__(4);
var SeatersApi = function () {
    function SeatersApi(prefix, requestDriver) {
        this.apiContext = new seaters_api_context_1.SeatersApiContext(prefix, requestDriver);
        this.app = new app_api_1.AppApi(this.apiContext);
        this.fan = new fan_api_1.FanApi(this.apiContext);
        this.admin = new admin_1.AdminApi(this.apiContext);
        this.health = new health_1.HealthApi(this.apiContext);
        this.authentication = new authentication_api_1.AuthenticationApi(this.apiContext);
    }
    return SeatersApi;
}();
exports.SeatersApi = SeatersApi;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(29));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-floating-promises */
var seaters_api_1 = __webpack_require__(1);
var seaters_api_controller_1 = __webpack_require__(30);
var AdminApi = function (_super) {
    __extends(AdminApi, _super);
    function AdminApi(apiContext) {
        var _this = _super.call(this) || this;
        _this.apiContext = apiContext;
        return _this;
    }
    AdminApi.prototype.getUsers = function (page) {
        return this.apiContext.get('/seaters-admin/users', null, seaters_api_1.SeatersApiContext.buildPagingQueryParams(page));
    };
    AdminApi.prototype.searchUsers = function (query, page) {
        return this.apiContext.put('/seaters-admin/users', query, null, seaters_api_1.SeatersApiContext.buildPagingQueryParams(page));
    };
    AdminApi.prototype.getUser = function (id) {
        return this.apiContext.get('/seaters-admin/users/:id', { id: id });
    };
    AdminApi.prototype.updateUser = function (user) {
        return this.apiContext.put('/seaters-admin/users/:id', user, { id: user.id });
    };
    AdminApi.prototype.deleteUser = function (id) {
        return this.apiContext.delete('/seaters-admin/users/:id', { id: id });
    };
    AdminApi.prototype.createUser = function (user) {
        return this.apiContext.post('/seaters-admin/users', user);
    };
    AdminApi.prototype.getUserOwnerships = function (userId, page) {
        return this.apiContext.get('/seaters-admin/users/:id/ownerships', null, seaters_api_1.SeatersApiContext.buildPagingQueryParams(page));
    };
    AdminApi.prototype.createUserOwnership = function (ownership) {
        return this.apiContext.post('/seaters-admin/users/:id/ownerships', ownership, { id: ownership.userId });
    };
    AdminApi.prototype.deleteUserOwnership = function (ownership) {
        return this.apiContext.delete('/seaters-admin/users/:userId/ownerships/:fanGroupId', { userId: ownership.userId, fanGroupId: ownership.fanGroupId });
    };
    return AdminApi;
}(seaters_api_controller_1.SeatersApiController);
exports.AdminApi = AdminApi;
/* tslint:enable:no-floating-promises */

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SeatersApiController = function () {
    function SeatersApiController() {}
    SeatersApiController.prototype.buildParams = function (obj) {
        var map = new Map();
        Object.keys(obj).forEach(function (k) {
            return map.set(k, obj[k]);
        });
        return map;
    };
    SeatersApiController.prototype.buildPagingQueryParams = function (pagingOptions) {
        return this.buildParams({
            maxPageSize: pagingOptions.maxPageSize,
            itemOffset: pagingOptions.itemOffset
        });
    };
    return SeatersApiController;
}();
exports.SeatersApiController = SeatersApiController;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(10));
__export(__webpack_require__(11));

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var PagingOptions = function () {
    function PagingOptions(itemOffset, maxPageSize) {
        this.itemOffset = itemOffset;
        this.maxPageSize = maxPageSize;
    }
    PagingOptions.toQueryParams = function (pagingOptions, queryParams) {
        if (!queryParams) {
            queryParams = new Map();
        }
        if (!pagingOptions) {
            return queryParams;
        }
        if (pagingOptions.itemOffset) {
            queryParams.set('itemOffset', pagingOptions.itemOffset.toString());
        }
        if (pagingOptions.maxPageSize) {
            queryParams.set('maxPageSize', pagingOptions.maxPageSize.toString());
        }
        return queryParams;
    };
    return PagingOptions;
}();
exports.PagingOptions = PagingOptions;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Map Seaters API V1 exceptions to a usuable format
 *
 * @param mapping A mapping of V1 error messages to values of the given type
 * @return Returns an Promise that rejects with the mapped error
 */
function seatersExceptionV1MessageMapper(mapping) {
    return function (err) {
        if ((typeof err === "undefined" ? "undefined" : _typeof(err)) !== 'object') {
            console.error('[seatersExceptionV1MessageMapper] Uncaught Exception', err);
            throw err;
        } else if (err.type !== 'validation_error_v1') {
            console.error('[seatersExceptionV1MessageMapper] invoked with non-v1 exception', err);
            throw err;
        } else if (!mapping.hasOwnProperty(err.message)) {
            console.error('[seatersExceptionV1MessageMapper] unmapped v1 error: %s', err.message, err);
            throw err;
        } else {
            return Promise.reject(mapping[err.message]);
        }
    };
}
exports.seatersExceptionV1MessageMapper = seatersExceptionV1MessageMapper;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(35));
__export(__webpack_require__(37));
__export(__webpack_require__(46));
__export(__webpack_require__(48));
__export(__webpack_require__(0));

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(36));
__export(__webpack_require__(2));
__export(__webpack_require__(13));
__export(__webpack_require__(14));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var waiting_list_service_1 = __webpack_require__(13);
var fan_group_service_1 = __webpack_require__(14);
var util_1 = __webpack_require__(0);
var FanService = function () {
    function FanService(seatersApi, sessionService, publicService) {
        this.seatersApi = seatersApi;
        this.sessionService = sessionService;
        this.publicService = publicService;
        this.waitingListService = new waiting_list_service_1.WaitingListService(seatersApi);
        this.fanGroupService = new fan_group_service_1.FanGroupService(seatersApi);
    }
    /**
     *  FAN GROUPS
     */
    FanService.prototype.getFanGroups = function (fanGroupIds) {
        return this.fanGroupService.getFanGroups(fanGroupIds);
    };
    FanService.prototype.getFanGroup = function (fanGroupId) {
        return this.fanGroupService.getFanGroup(fanGroupId);
    };
    FanService.prototype.getFanGroupBySlug = function (slug) {
        return this.fanGroupService.getFanGroupBySlug(slug);
    };
    FanService.prototype.getFanGroupLookBySlug = function (slug) {
        return this.fanGroupService.getFanGroupLookBySlug(slug);
    };
    FanService.prototype.getFanGroupTranslatedDescription = function (fanGroupId) {
        return this.fanGroupService.getFanGroupTranslatedDescription(fanGroupId);
    };
    FanService.prototype.joinFanGroup = function (fanGroupId) {
        return this.fanGroupService.joinFanGroup(fanGroupId);
    };
    FanService.prototype.joinProtectedFanGroup = function (fanGroupId, code) {
        return this.fanGroupService.joinProtectedFanGroup(fanGroupId, code);
    };
    FanService.prototype.leaveFanGroup = function (fanGroupId) {
        return this.fanGroupService.leaveFanGroup(fanGroupId);
    };
    FanService.prototype.shareFanGroup = function (fanGroupId) {
        return this.fanGroupService.shareFanGroup(fanGroupId);
    };
    /**
     *  WAITING LISTS
     */
    FanService.prototype.getWaitingList = function (waitingListId) {
        return this.waitingListService.getWaitingList(waitingListId);
    };
    FanService.prototype.getWaitingLists = function (waitingListIds) {
        return this.waitingListService.getWaitingLists(waitingListIds);
    };
    FanService.prototype.getWaitingListsInFanGroup = function (fanGroupId, pagingOptions) {
        var _this = this;
        return this.waitingListService.getWaitingListsInFanGroup(fanGroupId, pagingOptions).then(function (r) {
            return _this.convertPagedResult(r);
        });
    };
    FanService.prototype.getWaitingListsInFanGroups = function (fanGroupIds, pagingOptions) {
        var _this = this;
        return this.waitingListService.getWaitingListsInFanGroups(fanGroupIds, pagingOptions).then(function (r) {
            return _this.convertPagedResult(r);
        });
    };
    FanService.prototype.getMyWaitingListsWithoutSeat = function (page) {
        return this.waitingListService.getMyWaitingListsWithoutSeat(page);
    };
    FanService.prototype.getMyWaitingListsWithSeat = function (page) {
        return this.waitingListService.getMyWaitingListsWithSeat(page);
    };
    FanService.prototype.getPositionBraintreePaymentInfo = function (waitingListId) {
        return this.waitingListService.getPositionBraintreePaymentInfo(waitingListId);
    };
    FanService.prototype.joinWaitingList = function (waitingListId, numberOfSeats) {
        return this.waitingListService.joinWaitingList(waitingListId, numberOfSeats);
    };
    FanService.prototype.joinProtectedWaitingList = function (waitingListId, code, numberOfSeats) {
        return this.waitingListService.joinProtectedWaitingList(waitingListId, code, numberOfSeats);
    };
    FanService.prototype.leaveWaitingList = function (waitingListId) {
        return this.waitingListService.leaveWaitingList(waitingListId);
    };
    FanService.prototype.getPositionPaymentInfo = function (waitingListId) {
        return this.waitingListService.getPositionPaymentInfo(waitingListId);
    };
    FanService.prototype.payPosition = function (waitingListId, transaction) {
        return this.waitingListService.payPosition(waitingListId, transaction);
    };
    FanService.prototype.preauthorizePosition = function (waitingListId, transaction) {
        return this.waitingListService.preauthorizePosition(waitingListId, transaction);
    };
    FanService.prototype.saveAttendeesInfo = function (waitingListId, attendeesInfo) {
        return this.waitingListService.saveAttendeesInfo(waitingListId, attendeesInfo);
    };
    FanService.prototype.acceptSeats = function (waitingListId) {
        return this.waitingListService.acceptSeats(waitingListId);
    };
    FanService.prototype.rejectSeats = function (waitingListId) {
        return this.waitingListService.rejectSeats(waitingListId);
    };
    FanService.prototype.exportSeats = function (waitingListId) {
        return this.waitingListService.exportSeats(waitingListId);
    };
    FanService.prototype.getEventDescriptionForWaitingList = function (waitingListId) {
        return this.waitingListService.getEventDescriptionForWaitingList(waitingListId).then(function (translationMap) {
            return new util_1.LocalizableText(translationMap);
        });
    };
    FanService.prototype.getTranslatedEventDescriptionForWaitingList = function (waitingListId) {
        return this.waitingListService.getTranslatedEventDescriptionForWaitingList(waitingListId);
    };
    FanService.prototype.getVenueConditionsForWaitingList = function (waitingListId) {
        return this.waitingListService.getVenueConditionsForWaitingList(waitingListId).then(function (translationMap) {
            return new util_1.LocalizableText(translationMap);
        });
    };
    FanService.prototype.getTranslatedVenueConditionsForWaitingList = function (waitingListId) {
        return this.waitingListService.getTranslatedVenueConditionsForWaitingList(waitingListId);
    };
    FanService.prototype.positionBraintreeToken = function (waitingListId) {
        return this.waitingListService.positionBraintreeToken(waitingListId);
    };
    FanService.prototype.getWaitingListPrice = function (waitingListId, numberOfSeats) {
        return this.waitingListService.getWaitingListPrice(waitingListId, numberOfSeats);
    };
    /**
     *  COMBINATIONS
     */
    FanService.prototype.updateFan = function (fan) {
        var _this = this;
        return this.seatersApi.fan.updateFan(fan).then(function (fan) {
            return _this.sessionService.updateCurrentFan(fan);
        });
    };
    FanService.prototype.getWaitingListsByKeywords = function (keywords, page) {
        var _this = this;
        return this.publicService.getWaitingListsByKeywords(keywords, page).then(function (pagedPublicWls) {
            var waitingListIds = pagedPublicWls.items.map(function (wl) {
                return wl.waitingListId;
            });
            return _this.getWaitingLists(waitingListIds).then(function (wls) {
                return {
                    items: wls,
                    itemOffset: pagedPublicWls.itemOffset,
                    maxPageSize: pagedPublicWls.maxPageSize,
                    page: pagedPublicWls.page,
                    totalSize: pagedPublicWls.totalSize
                };
            });
        });
    };
    /**
     *  HELPERS
     */
    FanService.prototype.convertPagedResult = function (result) {
        return {
            items: result.items,
            itemOffset: result.itemOffset,
            maxPageSize: result.maxPageSize,
            page: Math.round(result.itemOffset / result.maxPageSize),
            totalSize: result.totalSize
        };
    };
    return FanService;
}();
exports.FanService = FanService;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(38));

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var algolia_for_seaters_1 = __webpack_require__(39);
var PublicService = function () {
    function PublicService(appService, requestDriver, seatersApi) {
        this.seatersApi = seatersApi;
        this.algoliaForSeatersService = new algolia_for_seaters_1.AlgoliaForSeatersService(appService, requestDriver);
    }
    PublicService.prototype.getFanGroup = function (fanGroupId) {
        return this.algoliaForSeatersService.getFanGroupById(fanGroupId);
    };
    PublicService.prototype.getFanGroupLookBySlug = function (slug) {
        return this.seatersApi.fan.fanGroupLook(slug);
    };
    PublicService.prototype.getFanGroups = function (fanGroupIds) {
        return this.algoliaForSeatersService.getFanGroupsById(fanGroupIds);
    };
    PublicService.prototype.getWaitingList = function (waitingListId) {
        return this.algoliaForSeatersService.getWaitingListById(waitingListId);
    };
    PublicService.prototype.getWaitingListsInFanGroup = function (fanGroupId, pagingOptions) {
        var _this = this;
        return this.algoliaForSeatersService.getWaitingListsByFanGroupId(fanGroupId, pagingOptions.maxPageSize, pagingOptions.page).then(function (result) {
            return _this.convertAlgoliaResultSet(result);
        });
    };
    PublicService.prototype.getWaitingListsInFanGroups = function (fanGroupIds, pagingOptions) {
        var _this = this;
        return this.algoliaForSeatersService.getWaitingListsByFanGroupIds(fanGroupIds, pagingOptions.maxPageSize, pagingOptions.page).then(function (result) {
            return _this.convertAlgoliaResultSet(result);
        });
    };
    PublicService.prototype.getWaitingListPrice = function (waitingListId, numberOfSeats) {
        return this.seatersApi.fan.waitingListPrice(waitingListId, numberOfSeats);
    };
    PublicService.prototype.searchSeatersContent = function (query, locale, page) {
        var _this = this;
        page = this.defaultPage(page);
        return this.algoliaForSeatersService.searchSeatersContent(query, locale, page.maxPageSize, page.page).then(function (result) {
            return _this.convertAlgoliaResultSet(result);
        });
    };
    PublicService.prototype.getWaitingListsByKeywords = function (keywords, page) {
        var _this = this;
        page = this.defaultPage(page);
        return this.algoliaForSeatersService.getWaitingListsByKeywords(keywords, page.maxPageSize, page.page).then(function (result) {
            return _this.convertAlgoliaResultSet(result);
        });
    };
    PublicService.prototype.defaultPage = function (page) {
        if ((typeof page === "undefined" ? "undefined" : _typeof(page)) === 'object') {
            return page;
        } else {
            return {
                maxPageSize: 10,
                page: 0
            };
        }
    };
    PublicService.prototype.convertAlgoliaResultSet = function (searchResult) {
        return {
            items: searchResult.hits,
            itemOffset: searchResult.page * searchResult.hitsPerPage,
            page: searchResult.page,
            maxPageSize: searchResult.hitsPerPage,
            totalSize: searchResult.nbHits
        };
    };
    return PublicService;
}();
exports.PublicService = PublicService;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(40));
__export(__webpack_require__(15));

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var algolia_api_1 = __webpack_require__(41);
var algolia_for_seaters_types_1 = __webpack_require__(15);
var DEFAULT_LOCALE = 'en';
var AlgoliaForSeatersService = function () {
    function AlgoliaForSeatersService(appService, requestDriver) {
        this.appService = appService;
        this.requestDriver = requestDriver;
    }
    AlgoliaForSeatersService.prototype.getFanGroupById = function (fanGroupId) {
        var q = this.buildExactQuery(fanGroupId, 'fanGroupId', algolia_for_seaters_types_1.FG_ALGOLIA_TYPE);
        return this.findExactlyOne(q, 'FanGroup', fanGroupId);
    };
    AlgoliaForSeatersService.prototype.getFanGroupsById = function (fanGroupIds) {
        var fanGroupIdsFilter = fanGroupIds.map(function (fanGroupId) {
            return 'fanGroupId:' + fanGroupId;
        }).join(' OR ');
        var q = {
            query: '',
            typoTolerance: algolia_for_seaters_types_1.TYPO_TOLERANCE_STRICT,
            facetFilters: [{
                facet: algolia_for_seaters_types_1.TYPE_FIELD,
                value: algolia_for_seaters_types_1.FG_ALGOLIA_TYPE
            }],
            filters: fanGroupIdsFilter
        };
        return this.findExactlyN(q, fanGroupIds);
    };
    AlgoliaForSeatersService.prototype.getWaitingListsByFanGroupId = function (fanGroupId, hitsPerPage, page) {
        var _this = this;
        // TODO: sort by date ascending
        var q = this.buildExactQuery(fanGroupId, 'groupId', 'WAITING_LIST');
        q.page = page;
        q.hitsPerPage = hitsPerPage;
        return this.search(q).then(function (r) {
            return _this.stripAlgoliaFieldsFromSearchResultHits(r);
        });
    };
    AlgoliaForSeatersService.prototype.getWaitingListsByFanGroupIds = function (fanGroupIds, hitsPerPage, page) {
        var _this = this;
        var fanGroupIdsFilter = fanGroupIds.map(function (fanGroupId) {
            return 'groupId:' + fanGroupId;
        }).join(' OR ');
        var q = {
            query: '',
            typoTolerance: algolia_for_seaters_types_1.TYPO_TOLERANCE_STRICT,
            facetFilters: [{
                facet: algolia_for_seaters_types_1.TYPE_FIELD,
                value: algolia_for_seaters_types_1.WL_ALGOLIA_TYPE
            }],
            filters: fanGroupIdsFilter
        };
        return this.search(q).then(function (r) {
            return _this.stripAlgoliaFieldsFromObject(r);
        });
    };
    AlgoliaForSeatersService.prototype.getWaitingListById = function (waitingListId) {
        var q = this.buildExactQuery(waitingListId, 'waitingListId', 'WAITING_LIST');
        return this.findExactlyOne(q, 'WaitingList', waitingListId);
    };
    AlgoliaForSeatersService.prototype.search = function (searchQuery) {
        var _this = this;
        return this.api().then(function (api) {
            return api.indices.searchIndex(_this.searchIndex, searchQuery);
        }).then(function (res) {
            res.hits.filter(function (item) {
                return item.type === algolia_for_seaters_types_1.WL_ALGOLIA_TYPE;
            }).forEach(function (item) {
                return _this.patchWaitingList(item);
            });
            return res;
        });
    };
    AlgoliaForSeatersService.prototype.searchSeatersContent = function (query, locale, hitsPerPage, page) {
        var _this = this;
        return this.getSearchableAttributes(locale).then(function (searchableAttributes) {
            var q = {
                query: query,
                facetFilters: [],
                restrictSearchableAttributes: searchableAttributes,
                hitsPerPage: hitsPerPage,
                page: page
            };
            return _this.search(q).then(function (r) {
                return _this.stripAlgoliaFieldsFromSearchResultHits(r);
            });
        });
    };
    AlgoliaForSeatersService.prototype.getWaitingListsByKeywords = function (keywords, hitsPerPage, page) {
        var _this = this;
        var q = {
            query: '',
            facetFilters: [{ facet: 'type', value: 'WAITING_LIST' }],
            hitsPerPage: hitsPerPage,
            page: page,
            tagFilters: keywords
        };
        return this.search(q).then(function (r) {
            return _this.stripAlgoliaFieldsFromSearchResultHits(r);
        });
    };
    AlgoliaForSeatersService.prototype.api = function () {
        var _this = this;
        if (!this._apiP) {
            this._apiP = this.appService.getEnv().then(function (env) {
                var cfg = env.algoliaConfiguration;
                _this.searchIndex = cfg.indexName;
                return new algolia_api_1.AlgoliaApi(cfg.appId, cfg.apiKey, _this.requestDriver);
            });
        }
        return this._apiP;
    };
    AlgoliaForSeatersService.prototype.buildExactQuery = function (query, field, type) {
        return {
            query: query,
            typoTolerance: 'strict',
            facetFilters: [{
                facet: 'type',
                value: type
            }],
            restrictSearchableAttributes: [field]
        };
    };
    AlgoliaForSeatersService.prototype.findExactlyOne = function (searchQuery, entityType, identifier) {
        return this.findExactlyN(searchQuery, [identifier]).then(function (results) {
            return results[0];
        });
    };
    AlgoliaForSeatersService.prototype.findExactlyN = function (searchQuery, identifiers) {
        var n = identifiers.length;
        return this.search(searchQuery).then(function (searchResult) {
            if (searchResult.nbHits === n) {
                if (searchResult.hits.length === n) {
                    return searchResult.hits;
                } else {
                    // depending on algolia's limits we can technically ask for too many fangroups in one search query
                    // by the time this happens we're hopefully not using algolia for this purpose anymore.
                    var err = '[AlgoliaForSeatersService] could not fetch entire requested page-size';
                    console.error(err);
                    throw new Error(err);
                }
            } else {
                var err = '[AlgoliaForSeatersService] unexpected nb hits from algolia on query';
                console.log('[AlgoliaForSeatersService] expected %s but found %s results', n, searchResult.nbHits);
                console.error(err, searchResult);
                throw new Error(err);
            }
        });
    };
    AlgoliaForSeatersService.prototype.getSearchableAttributes = function (locale) {
        if (!locale) {
            locale = DEFAULT_LOCALE;
        }
        return this.appService.getEnv().then(function (env) {
            var cfg = env.algoliaConfiguration;
            if (!cfg.attributes.hasOwnProperty(locale)) {
                if (locale === DEFAULT_LOCALE || !cfg.attributes.hasOwnProperty(DEFAULT_LOCALE)) {
                    var err = '[AlgoliaForSeatersService] seaters misconfiguration - searchable attributes for default locale undefined';
                    console.error(err);
                    throw err;
                } else {
                    console.warn('[AlgoliaForSeatersService] locale is not supported for search - falling back to %s', DEFAULT_LOCALE);
                    locale = DEFAULT_LOCALE;
                }
            }
            return cfg.attributes[locale];
        });
    };
    AlgoliaForSeatersService.prototype.stripAlgoliaFieldsFromObject = function (result) {
        delete result._geoloc;
        delete result._tags;
        delete result._highlightResult;
        delete result.objectID;
        return result;
    };
    AlgoliaForSeatersService.prototype.stripAlgoliaFieldsFromSearchResultHits = function (result) {
        var _this = this;
        result.hits.forEach(function (hit) {
            return _this.stripAlgoliaFieldsFromObject(hit);
        });
        return result;
    };
    AlgoliaForSeatersService.prototype.patchWaitingList = function (wl) {
        // TODO remove as soon as backend exposes .price
        if (!wl.hasOwnProperty('price')) {
            wl.price = {
                facialPrice: wl.facialPrice,
                formattedFacialPrice: wl.formattedFacialPrice,
                totalFacialPrice: wl.totalFacialPrice,
                formattedTotalFacialPrice: wl.formattedTotalFacialPrice,
                feeExcVat: wl.feeExcVat,
                formattedFeeExcVat: wl.formattedFeeExcVat,
                feeVat: wl.feeVat,
                formattedFeeVat: wl.formattedFeeVat,
                fee: wl.fee,
                formattedFee: wl.formattedFee,
                total: wl.total,
                formattedTotal: wl.formattedTotal
            };
        }
        return wl;
    };
    return AlgoliaForSeatersService;
}();
exports.AlgoliaForSeatersService = AlgoliaForSeatersService;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(42));

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(3);
var indices_api_1 = __webpack_require__(43);
var APP_ID_HEADER = 'X-Algolia-Application-Id';
var API_KEY_HEADER = 'X-Algolia-API-Key';
var API_LOCATION_INFIX = '-dsn.algolia.net/1/';
function apiPrefix(appId, apiKey) {
    return 'https://' + appId.toLowerCase() + API_LOCATION_INFIX;
}
var AlgoliaApi = function (_super) {
    __extends(AlgoliaApi, _super);
    function AlgoliaApi(appId, apiKey, requestDriver) {
        var _this = _super.call(this, apiPrefix(appId, apiKey), requestDriver) || this;
        _this.appId = appId;
        _this.apiKey = apiKey;
        _this.indices = new indices_api_1.IndicesApi(_this);
        _this.setHeader(APP_ID_HEADER, appId);
        _this.setHeader(API_KEY_HEADER, apiKey);
        return _this;
    }
    return AlgoliaApi;
}(api_1.ApiContext);
exports.AlgoliaApi = AlgoliaApi;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var IndicesApi = function () {
    function IndicesApi(apiContext) {
        this.apiContext = apiContext;
    }
    IndicesApi.prototype.searchIndex = function (index, searchQuery) {
        var abstractEndpoint = '/indexes/:index/query';
        var endpointParams = { index: index };
        var body = { params: this.serializeSearchQuery(searchQuery) };
        return this.apiContext.doRequest({
            method: 'POST',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams,
            body: body
        }).then(function (response) {
            if (response.status !== 200) {
                return Promise.reject({
                    error: 'Unexpected response status code',
                    response: response
                });
            }
            try {
                return JSON.parse(response.body);
            } catch (exception) {
                return Promise.reject({
                    error: 'Unable to parse algolia response',
                    parseException: exception,
                    response: response
                });
            }
        });
    };
    IndicesApi.prototype.serializeSearchQuery = function (searchQuery) {
        var params = [];
        function defaultSerializer(item) {
            return encodeURIComponent(item);
        }
        function defaultArraySerializer(item) {
            return defaultSerializer(JSON.stringify(item));
        }
        var serializers = {
            query: defaultSerializer,
            hitsPerPage: defaultSerializer,
            page: defaultSerializer,
            restrictSearchableAttributes: defaultArraySerializer,
            facetFilters: function facetFilters(_facetFilters) {
                return defaultArraySerializer(_facetFilters.map(function (facet) {
                    return facet.facet + ':' + facet.value;
                }));
            },
            typoTolerance: defaultSerializer,
            maxValuesPerFacet: defaultSerializer,
            tagFilters: defaultArraySerializer,
            filters: defaultSerializer
        };
        Object.keys(searchQuery).forEach(function (key) {
            if (!serializers.hasOwnProperty(key)) {
                throw new Error('Unmapped SearchQuery property: ' + key);
            }
            params.push(key + '=' + serializers[key](searchQuery[key]));
        });
        return params.join('&');
    };
    return IndicesApi;
}();
exports.IndicesApi = IndicesApi;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.FG_ALGOLIA_TYPE = 'FAN_GROUP';

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.WL_ALGOLIA_TYPE = 'WAITING_LIST';

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(47));

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var seaters_api_1 = __webpack_require__(1);
var AUTH_HEADER = 'Authorization';
var AUTH_BEARER = 'SeatersBearer';
var VALIDATION_ERRORS;
(function (VALIDATION_ERRORS) {
    VALIDATION_ERRORS[VALIDATION_ERRORS["WRONG_VALIDATION_CODE"] = 0] = "WRONG_VALIDATION_CODE";
})(VALIDATION_ERRORS = exports.VALIDATION_ERRORS || (exports.VALIDATION_ERRORS = {}));
var SESSION_STRATEGY;
(function (SESSION_STRATEGY) {
    SESSION_STRATEGY[SESSION_STRATEGY["EXPIRE"] = 0] = "EXPIRE";
})(SESSION_STRATEGY = exports.SESSION_STRATEGY || (exports.SESSION_STRATEGY = {}));
var SessionService = function () {
    function SessionService(seatersApi, sessionStrategy) {
        this.seatersApi = seatersApi;
        this.sessionToken = '';
        this.validationMessageMapper = seaters_api_1.seatersExceptionV1MessageMapper({
            'Wrong validation code': VALIDATION_ERRORS.WRONG_VALIDATION_CODE
        });
        this.sessionStrategy = sessionStrategy || SESSION_STRATEGY.EXPIRE;
    }
    /**
     * Configure the given session to be used. This method is intended for transitional
     * phase where the SDK is not the one doing the login process (Seaters FanWebApp)
     *
     * @param session a valid session that is not expired
     * @param fan a valid fan object
     */
    SessionService.prototype.configureSession = function (session, fan) {
        this.setSession(session);
        this.currentFan = fan;
    };
    SessionService.prototype.updateCurrentFan = function (fan) {
        this.currentFan = fan;
        return Promise.resolve(this.currentFan);
    };
    SessionService.prototype.doEmailPasswordLogin = function (email, password, mfaToken) {
        var _this = this;
        return this.seatersApi.authentication.emailPasswordLogin({
            email: email,
            password: password,
            mfaToken: mfaToken
        }).then(function (r) {
            return _this.finishLogin(r);
        });
    };
    SessionService.prototype.doStoredTokenLogin = function (storedToken, mfaToken) {
        var _this = this;
        return this.seatersApi.authentication.storedTokenLogin({
            token: storedToken,
            mfaToken: mfaToken
        }).then(function (r) {
            return _this.finishLogin(r);
        });
    };
    /**
     * @deprecated Use doOAuthCodeLoginV2 instead to retrieve the session
     * @param oauthProvider
     * @param code
     * @returns {Promise<TResult2|TResult1>}
     */
    SessionService.prototype.doOAuthCodeLogin = function (oauthProvider, code) {
        var _this = this;
        console.warn('[sessionService] doOAuthCodeLogin is deprecated and will be removed soon, use doOAuthCodeLoginV2 instead to retrieve the session');
        return this.seatersApi.authentication.loginWithOAuthCode(oauthProvider, code).then(function (r) {
            return _this.finishLogin(r);
        }).then(function (session) {
            return session.identity;
        });
    };
    SessionService.prototype.doOAuthCodeLoginV2 = function (oauthProvider, code) {
        var _this = this;
        return this.seatersApi.authentication.loginWithOAuthCode(oauthProvider, code).then(function (r) {
            return _this.finishLogin(r);
        });
    };
    SessionService.prototype.doLogout = function () {
        console.log('[SessionService] doLogout'); // DEBUG
        this.seatersApi.apiContext.unsetHeader(AUTH_HEADER);
        this.currentFan = undefined;
        this.sessionToken = undefined;
    };
    // TODO: handle error case
    SessionService.prototype.doEmailPasswordSignUp = function (email, password, firstname, lastname, language) {
        var _this = this;
        return this.seatersApi.authentication.signup({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            language: language || 'en' // TODO: refer to config setting for default language
        }).then(function () {
            return _this.doEmailPasswordLogin(email, password);
        });
    };
    /**
     * Validate an email by providing a confirmation code
     *
     * @param email The email that you want to validate
     * @param code The code that validates the email
     * @returns a Promise that resolves with an updated fan or rejects with a VALIDATION_ERRORS
     * @see VALIDATION_ERRORS
     */
    SessionService.prototype.doEmailValidation = function (email, code) {
        var _this = this;
        return this.seatersApi.authentication.validate({
            email: email,
            code: code
        }).then(function () {
            return _this.setCurrentFan();
        }).catch(this.validationMessageMapper);
    };
    /**
     * Validate a phone number by providing a confirmation code
     *
     * @param phone The phone number that you want to validate
     * @param code The code that validates the email
     * @returns a Promise that resolves with an updated fan or rejects with a VALIDATION_ERRORS
     * @see VALIDATION_ERRORS
     */
    SessionService.prototype.doMobilePhoneNumberValidation = function (phone, code) {
        return this.seatersApi.authentication.validate({
            mobile: phone,
            code: code
        }).catch(this.validationMessageMapper);
    };
    SessionService.prototype.doEmailReset = function (email) {
        return this.seatersApi.authentication.resetEmail({
            email: email,
            token: this.sessionToken
        });
    };
    SessionService.prototype.whoami = function () {
        return this.currentFan;
    };
    SessionService.prototype.applyExpireSessionStrategy = function (session) {
        var _this = this;
        var diff = new Date(session.expirationDate).getTime() - new Date().getTime();
        console.log('session expires on %s (in %s minutes)', session.expirationDate, Math.round(diff / (1000 * 60)));
        setTimeout(function () {
            return _this.doLogout();
        }, diff);
    };
    SessionService.prototype.finishLogin = function (authSuccess) {
        this.setSession({
            expirationDate: authSuccess.token.expirationDate,
            token: authSuccess.token.value
        });
        return this.setCurrentFan().then(function (identity) {
            return {
                expiresOn: authSuccess.token.expirationDate,
                identity: identity,
                token: authSuccess.token.value
            };
        });
    };
    SessionService.prototype.setSession = function (session) {
        this.seatersApi.apiContext.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + session.token);
        this.sessionToken = session.token;
        switch (this.sessionStrategy) {
            default:
                this.applyExpireSessionStrategy(session);
        }
    };
    SessionService.prototype.setCurrentFan = function () {
        var _this = this;
        return this.seatersApi.fan.fan().then(function (fan) {
            return _this.currentFan = fan;
        });
    };
    SessionService.prototype.doRefreshTokenLogin = function (refreshToken, mfaToken) {
        var _this = this;
        return this.seatersApi.authentication.refreshTokenLogin({
            token: refreshToken,
            mfaToken: mfaToken
        }).then(function (r) {
            return _this.finishLogin(r);
        });
    };
    return SessionService;
}();
exports.SessionService = SessionService;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(49));

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var health_types_1 = __webpack_require__(11);
var ALL_COUNTRIES_PAGE_SIZE = 1000;
var ALL_LANGUAGES_PAGE_SIZE = 1000;
var ALL_CURRENCIES_PAGE_SIZE = 1000;
var ALL_TIME_ZONES_PAGE_SIZE = 1000;
var ALL_TRANSLATIONS_PAGE_SIZE = 20000;
var AppService = function () {
    function AppService(seatersApi) {
        this.seatersApi = seatersApi;
    }
    /**
     * Fetch the application environment details
     */
    AppService.prototype.getEnv = function () {
        if (!this.envP) {
            this.envP = this.seatersApi.app.env();
        }
        return this.envP;
    };
    /**
     * Fetch a list of countries
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     */
    AppService.prototype.getCountries = function () {
        return this.seatersApi.app.countries({ page: 0, maxPageSize: ALL_COUNTRIES_PAGE_SIZE });
    };
    /**
     * Fetch a list of languages
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     */
    AppService.prototype.getLanguages = function () {
        return this.seatersApi.app.languages({ page: 0, maxPageSize: ALL_LANGUAGES_PAGE_SIZE });
    };
    /**
     * Fetch a list of currencies
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     */
    AppService.prototype.getCurrencies = function () {
        return this.seatersApi.app.currencies({ page: 0, maxPageSize: ALL_CURRENCIES_PAGE_SIZE });
    };
    /**
     * Fetch a list of time zones
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     */
    AppService.prototype.getTimeZones = function () {
        return this.seatersApi.app.timeZones({ page: 0, maxPageSize: ALL_TIME_ZONES_PAGE_SIZE });
    };
    /**
     * Fetch a list of translations
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     * @param target restrict to translations for the given target application
     * @param language restrict to translations in the given language (alpha-2 country code)
     */
    AppService.prototype.getTranslations = function (target, language) {
        return this.seatersApi.app.translations(target, language, { page: 0, maxPageSize: ALL_TRANSLATIONS_PAGE_SIZE });
    };
    /**
     * Check if the API is in maintenance mode
     */
    AppService.prototype.isInMaintenance = function () {
        return this.seatersApi.health.node().then(function (msg) {
            return msg !== health_types_1.HEALTH_NODE_OK;
        }).catch(function (err) {
            console.error('Seaters API under maintenance', err);
            return true;
        });
    };
    return AppService;
}();
exports.AppService = AppService;

/***/ })
/******/ ]);
//# sourceMappingURL=seaters.bundle.js.map