var SeatersSDK = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = 'C:\\ProjetsSeaters\\seaters-js/dist'; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 21));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(27));
      __export(__webpack_require__(11));
      __export(__webpack_require__(28));
      __export(__webpack_require__(29));
      __export(__webpack_require__(9));
      __export(__webpack_require__(30));
      __export(__webpack_require__(31));
      __export(__webpack_require__(32));

      /***/
    },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(34));
      __export(__webpack_require__(6));
      __export(__webpack_require__(14));
      __export(__webpack_require__(44));
      __export(__webpack_require__(45));
      __export(__webpack_require__(7));
      __export(__webpack_require__(17));
      __export(__webpack_require__(12));
      __export(__webpack_require__(15));

      /***/
    },
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var fan;
      (function(fan) {
        var WAITING_LIST_ACTION_STATUS;
        (function(WAITING_LIST_ACTION_STATUS) {
          WAITING_LIST_ACTION_STATUS[(WAITING_LIST_ACTION_STATUS['UNLOCK'] = 0)] = 'UNLOCK';
          WAITING_LIST_ACTION_STATUS[(WAITING_LIST_ACTION_STATUS['SOON'] = 1)] = 'SOON';
          WAITING_LIST_ACTION_STATUS[(WAITING_LIST_ACTION_STATUS['BOOK'] = 2)] = 'BOOK';
          WAITING_LIST_ACTION_STATUS[(WAITING_LIST_ACTION_STATUS['WAIT'] = 3)] = 'WAIT';
          WAITING_LIST_ACTION_STATUS[(WAITING_LIST_ACTION_STATUS['CONFIRM'] = 4)] = 'CONFIRM';
          WAITING_LIST_ACTION_STATUS[(WAITING_LIST_ACTION_STATUS['GO_LIVE'] = 5)] = 'GO_LIVE';
          WAITING_LIST_ACTION_STATUS[(WAITING_LIST_ACTION_STATUS['ERROR'] = 6)] = 'ERROR';
          WAITING_LIST_ACTION_STATUS[(WAITING_LIST_ACTION_STATUS['NO_SEATS'] = 7)] = 'NO_SEATS';
        })((WAITING_LIST_ACTION_STATUS = fan.WAITING_LIST_ACTION_STATUS || (fan.WAITING_LIST_ACTION_STATUS = {})));
        var FAN_GROUP_ACTION_STATUS;
        (function(FAN_GROUP_ACTION_STATUS) {
          FAN_GROUP_ACTION_STATUS[(FAN_GROUP_ACTION_STATUS['CAN_JOIN'] = 0)] = 'CAN_JOIN';
          FAN_GROUP_ACTION_STATUS[(FAN_GROUP_ACTION_STATUS['CAN_LEAVE'] = 1)] = 'CAN_LEAVE';
          FAN_GROUP_ACTION_STATUS[(FAN_GROUP_ACTION_STATUS['CAN_UNLOCK'] = 2)] = 'CAN_UNLOCK';
          FAN_GROUP_ACTION_STATUS[(FAN_GROUP_ACTION_STATUS['CAN_REQUEST'] = 3)] = 'CAN_REQUEST';
          FAN_GROUP_ACTION_STATUS[(FAN_GROUP_ACTION_STATUS['WAITING_FOR_APPROVAL'] = 4)] = 'WAITING_FOR_APPROVAL';
        })((FAN_GROUP_ACTION_STATUS = fan.FAN_GROUP_ACTION_STATUS || (fan.FAN_GROUP_ACTION_STATUS = {})));
      })((fan = exports.fan || (exports.fan = {})));

      /***/
    },
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(49));
      var seaters_api_1 = __webpack_require__(1);
      exports.SeatersApi = seaters_api_1.SeatersApi;

      /***/
    },
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var fan_1 = __webpack_require__(13);
      /**
 *  PROFILING
 */
      var profiling;
      (function(profiling) {
        profiling.USER_INTEREST_STATUS = fan_1.UserInterestStatusEnum;
        profiling.USER_INTEREST_ACTION_STATUS = fan_1.UserInterestActionStatusEnum;
        profiling.USER_FAN_ATTRIBUTES_STATUS = fan_1.UserFanAttributeStatusEnum;
        profiling.USER_FAN_ATTRIBUTES_ACTION_STATUS = fan_1.UserFanAttributeActionStatusEnum;
        profiling.FAN_ATTRIBUTES_STATUS = fan_1.ProfilingFanAttributeStatusEnum;
        profiling.FAN_ATTRIBUTES_ACTION_STATUS = fan_1.ProfilingFanAttributeActionStatusEnum;
      })((profiling = exports.profiling || (exports.profiling = {})));

      /***/
    },
    /* 5 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(23));
      __export(__webpack_require__(10));
      __export(__webpack_require__(24));
      __export(__webpack_require__(25));

      /***/
    },
    /* 6 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var api_1 = __webpack_require__(5);
      var SeatersApiContext = /** @class */ (function(_super) {
        __extends(SeatersApiContext, _super);
        function SeatersApiContext(prefix, requestDriver) {
          return _super.call(this, prefix, requestDriver) || this;
        }
        SeatersApiContext.buildPagingQueryParams = function(pagingOptions) {
          pagingOptions = pagingOptions || {};
          var options = {
            maxPageSize: pagingOptions.maxPageSize || 9999,
            itemOffset: pagingOptions.page || 0
          };
          if (pagingOptions.sort) {
            options.sort = pagingOptions.sort;
          }
          if (pagingOptions.filters) {
            options = __assign({}, options, pagingOptions.filters);
          }
          return options;
        };
        SeatersApiContext.buildPagingSortingQueryParams = function(pagingOptions) {
          pagingOptions = pagingOptions || {};
          var options = {
            size: pagingOptions.maxPageSize || 9999,
            page: pagingOptions.page || 0
          };
          if (pagingOptions.sort) {
            options.sort = pagingOptions.sort;
          }
          if (pagingOptions.filters) {
            options = __assign({}, options, pagingOptions.filters);
          }
          if (pagingOptions.query) {
            options.query = pagingOptions.query;
          }
          if (pagingOptions.validated) {
            options.validated = pagingOptions.validated;
          }
          return options;
        };
        SeatersApiContext.convertPagedResultToArray = function(promise) {
          return new Promise(function(resolve, reject) {
            promise
              .then(function(response) {
                if (response.items === undefined) {
                  resolve(response);
                }
                resolve(response.items);
              })
              .catch(reject);
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
        SeatersApiContext.prototype.doSeatersRequest = function(requestDefinition) {
          var _this = this;
          return this.doRequest(requestDefinition).then(
            function(res) {
              return _this.handleServerResponse(res);
            },
            function(err) {
              return _this.handleClientError(err);
            }
          );
        };
        SeatersApiContext.prototype.doTypedSeatersRequest = function(requestDefinition) {
          var _this = this;
          return this.doSeatersRequest(requestDefinition).then(function(body) {
            return _this.parseResult(body);
          });
        };
        SeatersApiContext.prototype.get = function(abstractEndpoint, endpointParams, queryParams) {
          return this.doTypedSeatersRequest({
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {}
          });
        };
        SeatersApiContext.prototype.put = function(abstractEndpoint, body, endpointParams, queryParams) {
          return this.doTypedSeatersRequest({
            method: 'PUT',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {},
            body: body
          });
        };
        SeatersApiContext.prototype.post = function(abstractEndpoint, body, endpointParams, queryParams) {
          return this.doTypedSeatersRequest({
            method: 'POST',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {},
            body: body
          });
        };
        SeatersApiContext.prototype.delete = function(abstractEndpoint, endpointParams, queryParams) {
          return this.doTypedSeatersRequest({
            method: 'DELETE',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {}
          });
        };
        /**
     * For browser, we expect HTMLInputElement containing a file
     * @param oneTimeFileUrl url of a OneTimeFile returned by requestOneTimeFileUpload
     * @param data for browsers: HTMLInputElement, for node: not supported
     */
        SeatersApiContext.prototype.uploadOneTimeFile = function(oneTimeFileUrl, data) {
          var _this = this;
          return this.requestDriver({
            method: 'POST',
            url: oneTimeFileUrl,
            formData: data
          }).then(function(err) {
            return _this.handleServerResponse(err);
          });
        };
        SeatersApiContext.prototype.handleServerResponse = function(response) {
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
        SeatersApiContext.prototype.handle2XXResponse = function(response) {
          return Promise.resolve(response.body);
        };
        SeatersApiContext.prototype.dataFromLegacyResponse = function(response) {
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
              errors: [
                {
                  _rawResponse: { response: response, parseError: err },
                  message: response.body,
                  statusCode: response.status,
                  statusText: response.statusText
                }
              ]
            });
          }
          return Promise.resolve(data);
        };
        /**
     * (legacy) old endpoints return 400 with only a message string
     * This type of error is mapped to a proper SeatersApiException
     */
        SeatersApiContext.prototype.handle400Response = function(response) {
          return this.dataFromLegacyResponse(response).then(function(data) {
            return Promise.reject({
              type: 'validation_error_v1',
              message: data.message,
              uuid: data.uuid,
              errors: [
                {
                  defaultMessage: data.message,
                  errorCode: null,
                  references: []
                }
              ]
            });
          });
        };
        SeatersApiContext.prototype.createServerError = function(response, message) {
          return {
            _rawResponse: response,
            message: message,
            statusCode: response.status,
            statusText: response.statusText
          };
        };
        SeatersApiContext.prototype.handle401Response = function(response) {
          var _this = this;
          return this.dataFromLegacyResponse(response).then(function(data) {
            return Promise.reject({
              type: 'unauthorized',
              message: data.message,
              uuid: data.uuid,
              errors: [_this.createServerError(response, data.message)]
            });
          });
        };
        SeatersApiContext.prototype.handle404Response = function(response) {
          var _this = this;
          return this.dataFromLegacyResponse(response).then(function(data) {
            return Promise.reject({
              type: 'not_found',
              message: data.message,
              uuid: data.uuid,
              errors: [_this.createServerError(response, data.message)]
            });
          });
        };
        SeatersApiContext.prototype.handle422Response = function(response) {
          // todo exception cases for v2/authentication endpoints
          // TODO - verify this format is returned
          return Promise.reject(response);
        };
        SeatersApiContext.prototype.handleUnexpectedResponse = function(response) {
          return Promise.reject({
            type: 'server_error',
            message: 'An unexpected response was given by the server',
            uuid: null,
            errors: [this.createServerError(response, response.body)]
          });
        };
        SeatersApiContext.prototype.handleClientError = function(error) {
          return Promise.reject({
            type: 'client_error',
            message: 'the api client failed to complete the request',
            uuid: null,
            errors: [{ error: error }]
          });
        };
        SeatersApiContext.prototype.parseResult = function(body) {
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
      })(api_1.ApiContext);
      exports.SeatersApiContext = SeatersApiContext;

      /***/
    },
    /* 7 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      /* tslint:disable:no-floating-promises */

      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var seaters_api_1 = __webpack_require__(1);
      var index_1 = __webpack_require__(13);
      var FanApi = /** @class */ (function() {
        function FanApi(apiContext) {
          this.apiContext = apiContext;
        }
        FanApi.prototype.fan = function() {
          return this.apiContext.get('/fan');
        };
        FanApi.prototype.updateFan = function(fan) {
          return this.apiContext.put('/fan', fan);
        };
        FanApi.prototype.updatePassword = function(data) {
          return this.apiContext.put('/fan/password', data.password);
        };
        FanApi.prototype.updateEmail = function(data) {
          return this.apiContext.put('/fan/email', data);
        };
        FanApi.prototype.updateMobilePhoneNumber = function(data) {
          return this.apiContext.put('/fan/mobile-phone-number', data);
        };
        FanApi.prototype.fanGroup = function(fanGroupId) {
          return this.apiContext.get('/fan/groups/:fanGroupId', { fanGroupId: fanGroupId });
        };
        FanApi.prototype.fanGroupBySlug = function(slug) {
          return this.apiContext.get('/fan/fangroups-by-slug/:slug', { slug: slug });
        };
        FanApi.prototype.oauthAuthorizationCodeUrl = function(provider) {
          return this.apiContext.get('/v2/authentication/oauth/url/:provider', { provider: provider });
        };
        FanApi.prototype.fanGroupLookBySlug = function(slug) {
          return this.apiContext.get('/fan/fangroups-by-slug/:slug/look', { slug: slug });
        };
        FanApi.prototype.getOwnedFanGroups = function(pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          return this.apiContext.get('/fan-group-owner/groups', null, queryParams);
        };
        FanApi.prototype.fanGroupTranslatedDescription = function(fanGroupId) {
          return this.apiContext.get('/fan/groups/:fanGroupId/translated-description', { fanGroupId: fanGroupId });
        };
        FanApi.prototype.hasGeoFilteredWaitingLists = function(fanGroupId) {
          return this.apiContext.get(
            'v2/fan/groups/:fanGroupId/filter-info',
            { fanGroupId: fanGroupId },
            { groupId: fanGroupId }
          );
        };
        FanApi.prototype.fanGroups = function(fanGroupIds) {
          return this.apiContext.get(
            '/fan/groups',
            {},
            {
              groupIds: fanGroupIds
            }
          );
        };
        FanApi.prototype.fanGroupLook = function(slug) {
          return this.apiContext.get('/fan/fangroups-by-slug/:slug/look', { slug: slug });
        };
        FanApi.prototype.joinFanGroup = function(fanGroupId) {
          return this.apiContext.post('/fan/groups/:fanGroupId', null, { fanGroupId: fanGroupId });
        };
        FanApi.prototype.joinProtectedFanGroup = function(fg, code) {
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
        FanApi.prototype.leaveFanGroup = function(fanGroupId) {
          return this.apiContext.delete('/fan/groups/:fanGroupId', { fanGroupId: fanGroupId });
        };
        FanApi.prototype.shareFanGroup = function(fanGroupId) {
          return this.apiContext.get('/fan/groups/:fanGroupId/share', { fanGroupId: fanGroupId });
        };
        FanApi.prototype.waitingListsInFanGroup = function(fanGroupId, pagingOptions, keyWords) {
          var endpointParams = { fanGroupId: fanGroupId };
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          if (keyWords !== undefined) {
            queryParams = __assign({}, queryParams, { keyWords: keyWords });
          }
          return this.apiContext.get('/fan/groups/:fanGroupId/waiting-lists', endpointParams, queryParams);
        };
        FanApi.prototype.waitingListsInFanGroupByKeywords = function(groupIds, pagingOptions, keyWords) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          if (keyWords !== undefined) {
            queryParams = __assign({}, queryParams, {
              keyWords: keyWords,
              groupIds: groupIds
            });
          }
          return this.apiContext.get('/v2/fan/groups/waiting-lists/filter', null, queryParams);
        };
        FanApi.prototype.requestOneTimeFileUpload = function(fileName) {
          return this.apiContext.put(
            '/fan-group-owner/request-one-time-upload',
            null,
            null,
            fileName ? { fileName: fileName } : null
          );
        };
        FanApi.prototype.uploadOneTimeFile = function(oneTimeFileUrl, data) {
          return this.apiContext.uploadOneTimeFile(oneTimeFileUrl, data);
        };
        FanApi.prototype.updateWlImage = function(waitingListId, fileId) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/waitinglist-image',
            null,
            { waitingListId: waitingListId },
            { fileId: fileId }
          );
        };
        FanApi.prototype.addProperties = function(waitingListId, properties) {
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:waitingListId/properties',
            {
              publicProperties: properties
            },
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.waitinglistAvailableSeats = function(waitingListId) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/available-seats',
            null,
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.waitinglistParkingAvailableSeats = function(waitingListId) {
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:waitingListId/available-secondary-tickets',
            null,
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.waitingListTotalDemand = function(waitingListId) {
          return this.apiContext.get(
            '/fan-group-owner/waiting-lists/:waitingListId/total-demand',
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.waitingListsInFanGroups = function(fanGroupIds, pagingOptions, keyWords) {
          var endpointParams = {};
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          queryParams = __assign({}, queryParams, { groupIds: fanGroupIds });
          if (keyWords !== undefined) {
            queryParams = __assign({}, queryParams, { keyWords: keyWords });
          }
          return this.apiContext.get('/fan/groups/waiting-lists', endpointParams, queryParams);
        };
        FanApi.prototype.joinedFanGroups = function(pagingOptions) {
          return this.apiContext.get(
            '/fan/joined-groups',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions)
          );
        };
        FanApi.prototype.joinedWaitingListsWithoutSeat = function(pagingOptions) {
          return this.apiContext.get(
            '/fan/joined-waiting-lists',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions)
          );
        };
        FanApi.prototype.joinedWaitingListsWithSeat = function(pagingOptions) {
          return this.apiContext.get(
            '/fan/active-waiting-lists-with-seat',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions)
          );
        };
        FanApi.prototype.waitingListTranslatedVenueDescription = function(waitingListId) {
          return this.apiContext.get('/fan/waiting-lists/:waitingListId/translated-venue-conditions', {
            waitingListId: waitingListId
          });
        };
        FanApi.prototype.waitingList = function(waitingListId) {
          var endpoint = '/fan/waiting-lists/:waitingListId';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.get(endpoint, endpointParams);
        };
        FanApi.prototype.waitingLists = function(waitingListIds) {
          var endpoint = '/fan/waiting-lists';
          return this.apiContext.put(endpoint, {
            waitingListIds: waitingListIds
          });
        };
        FanApi.prototype.getAdditionalInfos = function(waitingListId) {
          return this.apiContext.get('/v2/fan/waiting-lists/:waitingListId/additional-infos', {
            waitingListId: waitingListId
          });
        };
        FanApi.prototype.waitingListPrice = function(waitingListId, numberOfSeats) {
          var endpoint = '/fan/waiting-lists/:waitingListId/price/:numberOfSeats';
          var endpointParams = {
            waitingListId: waitingListId,
            numberOfSeats: numberOfSeats
          };
          return this.apiContext.get(endpoint, endpointParams);
        };
        FanApi.prototype.joinWaitingList = function(
          waitingListId,
          numberOfSeats,
          selectedSeats,
          additionalQueryParams
        ) {
          var endpoint = '/fan/waiting-lists/:waitingListId/position';
          var endpointParams = { waitingListId: waitingListId };
          var queryParams = additionalQueryParams;
          var data = { numberOfSeats: numberOfSeats, pickedSeatsId: selectedSeats };
          return this.apiContext.post(endpoint, data, endpointParams, queryParams);
        };
        FanApi.prototype.joinProtectedWaitingList = function(wl, code, numberOfSeats, additionalQueryParams) {
          var data = {
            code: code,
            numberOfSeats: numberOfSeats
          };
          var endpointParams = { waitingListId: wl.waitingListId };
          var endpoint = '/fan/waiting-lists/:waitingListId/request';
          var queryParams = additionalQueryParams;
          if (!wl.request) {
            return this.apiContext.post(endpoint, data, endpointParams, queryParams);
          } else {
            return this.apiContext.put(endpoint, data, endpointParams, queryParams);
          }
        };
        FanApi.prototype.shareWaitingList = function(waitingListId) {
          return this.apiContext.get('/fan/waiting-lists/:waitingListId/share', { waitingListId: waitingListId });
        };
        FanApi.prototype.leaveWaitingList = function(waitingListId) {
          var endpoint = '/fan/waiting-lists/:waitingListId/position';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.delete(endpoint, endpointParams);
        };
        FanApi.prototype.acceptSeats = function(waitingListId, formatUsed) {
          var data = {
            format: formatUsed != null ? formatUsed : null
          };
          var endpoint = '/fan/waiting-lists/:waitingListId/accept';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.post(endpoint, data, endpointParams);
        };
        FanApi.prototype.rejectSeats = function(waitingListId) {
          var endpoint = '/fan/waiting-lists/:waitingListId/reject';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.post(endpoint, null, endpointParams);
        };
        FanApi.prototype.exportSeats = function(waitingListId, formatUsed) {
          var data = {
            format: formatUsed != null ? formatUsed : null
          };
          var endpoint = '/fan/waiting-lists/:waitingListId/export-seat';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.put(endpoint, data, endpointParams);
        };
        FanApi.prototype.sendExportedSeats = function(waitingListId) {
          var endpoint = 'v2/fan/waiting-lists/:waitingListId/send-exported-seat';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.put(endpoint, null, endpointParams);
        };
        FanApi.prototype.positionPaymentInfo = function(waitingListId) {
          var endpoint = '/fan/waiting-lists/:waitingListId/position/payment-info';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.get(endpoint, endpointParams);
        };
        FanApi.prototype.positionBraintreeToken = function(waitingListId) {
          var endpoint = '/fan/waiting-lists/:waitingListId/position/braintree-token';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.get(endpoint, endpointParams);
        };
        FanApi.prototype.createPositionSalesTransaction = function(waitingListId, transaction) {
          var endpoint = '/fan/waiting-lists/:waitingListId/transaction';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.post(endpoint, transaction, endpointParams);
        };
        FanApi.prototype.getPositionSalesTransaction = function(waitingListId) {
          var endpoint = '/fan/waiting-lists/:waitingListId/transaction';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.get(endpoint, endpointParams);
        };
        FanApi.prototype.sendPayCallback = function(reference) {
          var endpoint = '/v2/fan/payment/PAY/callback';
          var endpointParams = { reference: reference };
          return this.apiContext.post(endpoint, endpointParams);
        };
        FanApi.prototype.deletePositionSalesTransaction = function(waitingListId) {
          var endpoint = '/fan/waiting-lists/:waitingListId/transaction';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.delete(endpoint, endpointParams);
        };
        FanApi.prototype.updateAttendeesInfo = function(waitingListId, attendeesInfo) {
          var data = {
            attendees: attendeesInfo
          };
          var endpoint = '/v2/fan/waiting-lists/:waitingListId/position/attendees-info';
          var endpointParams = { waitingListId: waitingListId };
          return this.apiContext.put(endpoint, data, endpointParams);
        };
        FanApi.prototype.getEventDescription = function(waitingListId) {
          return this.apiContext.get('/fan/waiting-lists/:waitingListId/event-description', {
            waitingListId: waitingListId
          });
        };
        FanApi.prototype.searchEvent = function(eventName, date, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          return this.apiContext.put(
            '/fan-group-owner/search-event',
            { query: eventName, date: date, source: 'SEATERS' },
            null,
            queryParams
          );
        };
        FanApi.prototype.searchVenues = function(venueName, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          return this.apiContext.put('/fan-group-owner/search-venue', { query: venueName }, null, queryParams);
        };
        FanApi.prototype.getVenueConditions = function(waitingListId) {
          return this.apiContext.get('/fan/waiting-lists/:waitingListId/venue-conditions', {
            waitingListId: waitingListId
          });
        };
        FanApi.prototype.getTranslatedEventDescription = function(waitingListId) {
          return this.apiContext.get('/fan/waiting-lists/:waitingListId/translated-event-description', {
            waitingListId: waitingListId
          });
        };
        FanApi.prototype.getTranslatedVenueConditions = function(waitingListId) {
          return this.apiContext.get('/fan/waiting-lists/:waitingListId/translated-venue-conditions', {
            waitingListId: waitingListId
          });
        };
        FanApi.prototype.getWaitingListsAsFGO = function(fanGroupId, searchOptions, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          return this.apiContext.put(
            '/fan-group-owner/groups/:fanGroupId/waiting-lists/search',
            searchOptions,
            { fanGroupId: fanGroupId },
            queryParams
          );
        };
        FanApi.prototype.getWaitingListAsFGO = function(waitingListId) {
          return this.apiContext.get('/fan-group-owner/waiting-lists/:waitingListId', { waitingListId: waitingListId });
        };
        FanApi.prototype.updateWaitingList = function(waitingList) {
          return this.apiContext.put('/fan-group-owner/waiting-lists/:waitingListId', waitingList, {
            waitingListId: waitingList.waitingListId
          });
        };
        FanApi.prototype.draftWaitingList = function(waitingListId) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/draft',
            null,
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.openWaitingList = function(waitingListId) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/open',
            null,
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.closeWaitingList = function(waitingListId) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/close',
            null,
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.publishWaitingList = function(waitingListId) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/publish',
            null,
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.scheduleWaitingList = function(waitingListId, date) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/schedule',
            { date: date },
            { waitingListId: waitingListId },
            null
          );
        };
        FanApi.prototype.createWaitingList = function(fanGroupId, waitingList) {
          return this.apiContext.post(
            '/fan-group-owner/groups/:fanGroupId/waiting-lists/',
            waitingList,
            { fanGroupId: fanGroupId },
            null
          );
        };
        FanApi.prototype.getPositions = function(waitingListId, query, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:waitingListId/positions',
            { query: query || '' },
            { waitingListId: waitingListId },
            queryParams
          );
        };
        FanApi.prototype.getSeats = function(waitingListId, query, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:waitingListId/seats',
            { query: query || '' },
            { waitingListId: waitingListId },
            queryParams
          );
        };
        FanApi.prototype.assignWaitingListSeatToFan = function(waitingListId, fanId) {
          return this.apiContext.put('/fan-group-owner/waiting-lists/:waitingListId/positions/:fanId/assign', null, {
            waitingListId: waitingListId,
            fanId: fanId
          });
        };
        FanApi.prototype.assignWaitingListParkingSeatToFan = function(waitingListId, fanId) {
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:waitingListId/positions/:fanId/assign-with-parking',
            null,
            { waitingListId: waitingListId, fanId: fanId }
          );
        };
        FanApi.prototype.assignWithoutSeats = function(waitingListId, fanId) {
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:waitingListId/positions/:fanId/assign-without-seats',
            null,
            { waitingListId: waitingListId, fanId: fanId }
          );
        };
        FanApi.prototype.declineFanPosition = function(waitingListId, fanId) {
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:waitingListId/positions/:fanId/decline-seats-request',
            null,
            { waitingListId: waitingListId, fanId: fanId }
          );
        };
        FanApi.prototype.removeFanFromWaitingList = function(waitingListId, fanId) {
          return this.apiContext.delete('/fan-group-owner/waiting-lists/:waitingListId/positions/:fanId', {
            waitingListId: waitingListId,
            fanId: fanId
          });
        };
        FanApi.prototype.searchMember = function(fanGroupId, query, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.put(
            '/v2/fan-group-owner/groups/:fanGroupId/members',
            { query: query },
            { fanGroupId: fanGroupId },
            queryParams
          );
        };
        FanApi.prototype.getFanInfo = function(fanId) {
          return this.apiContext.get('v2/fan-group-owner/fan/:fanId/personal-infos', { fanId: fanId }, null);
        };
        FanApi.prototype.getFanAttribute = function(fanId) {
          return this.apiContext.get(
            'v2/fan-group-owner/fan/:fanId/attirbutes?user_fan_attribute_status=LINKED',
            { fanId: fanId },
            null
          );
        };
        FanApi.prototype.getFanInterests = function(fanId) {
          return this.apiContext.get(
            'v2/fan-group-owner/fan/:fanId/interests??user_interest_status=LIKE&user_interest_status=DISLIKE&user_interest_status=NEUTRAL&size=9999',
            { fanId: fanId },
            null
          );
        };
        FanApi.prototype.getFanActivities = function(fanId, fanGroupId) {
          return this.apiContext.get(
            'v2/fan-group-owner/fan/:fanId/groups/:fanGroupId',
            { fanId: fanId, fanGroupId: fanGroupId },
            null
          );
        };
        FanApi.prototype.addPosition = function(waitingListId, fanId, params) {
          return this.apiContext.post('/v2/fan-group-owner/waiting-lists/:waitingListId/fan/:fanId', params, {
            waitingListId: waitingListId,
            fanId: fanId
          });
        };
        FanApi.prototype.getExiredPositions = function(waitingListId, query) {
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:waitingListId/expired-positions',
            { query: query },
            { waitingListId: waitingListId }
          );
        };
        FanApi.prototype.addWaitingListTickets = function(waitingListId, totalTickets, ticketsToAdd) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/add-tickets',
            { originalNumberOfTickets: totalTickets, ticketsToAdd: ticketsToAdd },
            { waitingListId: waitingListId }
          );
        };
        FanApi.prototype.waitinglistFinishedDistributing = function(waitingListId, nextDistributionNumber) {
          return this.apiContext.get(
            '/fan-group-owner/waiting-lists/:waitingListId/distribution-finished/:nextDistributionNumber',
            { waitingListId: waitingListId, nextDistributionNumber: nextDistributionNumber }
          );
        };
        FanApi.prototype.getAvailableSeats = function(wlId) {
          return this.apiContext.get('/v2/fan/waiting-lists/' + wlId + '/available-seats');
        };
        FanApi.prototype.getSeatingMap = function(wlId) {
          return this.apiContext.get('/v2/fan/waiting-lists/' + wlId + '/seating-map');
        };
        FanApi.prototype.getPickedSeats = function(wlId) {
          return this.apiContext.get('/v2/fan/waiting-lists/' + wlId + '/picked-seats');
        };
        // PROFILING : FAN
        /**
     * Gets complete list of categories
     * @param {PagingOptions} pagingOptions
     */
        FanApi.prototype.getProfilingCategories = function(pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.get('v2/fan/interests/categories', null, queryParams);
        };
        /**
     * Gets single category
     * @param categoryId
     */
        FanApi.prototype.getProfilingCategoryById = function(categoryId) {
          return this.apiContext.get('v2/fan/interests/category/' + categoryId, {}, {});
        };
        /**
     * Gets complete list of interests with their user status
     * and their categoryId
     *
     * @param pagingOptions
     */
        FanApi.prototype.getUserInterests = function(pagingOptions) {
          return this.apiContext.get(
            'v2/fan/interests',
            {},
            seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions)
          );
        };
        /**
     * Updates a user interest
     * @param {UserInterestUpdateDTO} options
     */
        FanApi.prototype.updateUserInterest = function(options) {
          return this.apiContext.post('v2/fan/interests/' + options.id + '/' + options.status, {}, {});
        };
        /**
     *
     * Performs search operation
     * on name and aliases of fan attribues
     *
     * @param {string} query search query
     * @param {boolean} validated to fetch only validated fan attributes
     *
     */
        FanApi.prototype.seachFanAttributes = function(query, validated) {
          var queryParams = { query: query, validated: validated ? 'true' : 'false' };
          return this.apiContext.get('v2/fan/fan-attributes/search', null, queryParams);
        };
        /**
     * Gets list of user fan attribute
     * @param pagingOptions
     */
        FanApi.prototype.getUserFanAttributes = function(pagingOptions) {
          return this.apiContext.get(
            'v2/fan/fan-attributes',
            {},
            seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions)
          );
        };
        /**
     * Gets single user fan attributes
     * @param fanAttributeId
     */
        FanApi.prototype.getProfilingFanAttributeById = function(fanAttributeId) {
          return this.apiContext.get('v2/fan/fan-attributes/' + fanAttributeId, {}, {});
        };
        /**
     * Updates user fan attribute
     * (Link / Unlink / Create )
     * @param {UserFanAttributeUpdateDTO} options
     */
        FanApi.prototype.updateUserFanAttribute = function(options) {
          var body = null;
          var endpoint = 'v2/fan/fan-attributes/' + options.id + '/' + options.status;
          if (options.status === index_1.UserFanAttributeActionStatusEnum.create) {
            endpoint = 'v2/fan/fan-attributes/' + index_1.UserFanAttributeActionStatusEnum.create;
            body = { name: options.name };
          }
          return this.apiContext.post(endpoint, body, {});
        };
        FanApi.prototype.getWaitingListCategories = function(pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.get('v2/fan-group-owner/interests/categories', null, queryParams);
        };
        FanApi.prototype.getWaitingListInterests = function(waitingListId) {
          return this.apiContext.get('v2/fan-group-owner/waiting-lists/' + waitingListId + '/interests', {}, {});
        };
        FanApi.prototype.getWaitingListFanAttributes = function(waitingListId, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.get(
            'v2/fan-group-owner/waiting-lists/' + waitingListId + '/fan-attributes',
            {},
            queryParams
          );
        };
        FanApi.prototype.linkWaitingListInterest = function(waitingListId, interestId) {
          return this.apiContext.post(
            'v2/fan-group-owner/waiting-lists/' + waitingListId + '/interests/' + interestId + '/link',
            {},
            {}
          );
        };
        FanApi.prototype.linkWaitingListFanAttribute = function(waitingListId, fanAttributeId) {
          return this.apiContext.post(
            'v2/fan-group-owner/waiting-lists/' + waitingListId + '/fan-attributes/' + fanAttributeId + '/link',
            {},
            {}
          );
        };
        FanApi.prototype.unlinkWaitingListInterest = function(waitingListId, interestId) {
          return this.apiContext.post(
            'v2/fan-group-owner/waiting-lists/' + waitingListId + '/interests/' + interestId + '/unlink',
            {},
            {}
          );
        };
        FanApi.prototype.unlinkWaitingListFanAttribute = function(waitingListId, fanAttributeId) {
          return this.apiContext.post(
            'v2/fan-group-owner/waiting-lists/' + waitingListId + '/fan-attributes/' + fanAttributeId + '/unlink',
            {},
            {}
          );
        };
        // BADGE : FAN
        FanApi.prototype.getBadges = function(fanGroupId, pagingOptions) {
          var queryParams = pagingOptions
            ? seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions)
            : null;
          return this.apiContext.get('v2/fan/groups/' + fanGroupId + '/badges', null, queryParams);
        };
        FanApi.prototype.getBadgeProtection = function(waitingListId) {
          return this.apiContext.get('v2/fan/waiting-lists/' + waitingListId + '/badges');
        };
        // BADGE : FAN GROUP OWNER
        FanApi.prototype.getUserBadges = function(fanGroupId, userId, pagingOptions) {
          return this.apiContext.get(
            'v2/fan-group-owner/groups/' + fanGroupId + '/badges/users/' + userId,
            null,
            seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions)
          );
        };
        FanApi.prototype.getFanGroupBadges = function(fanGroupId, pagingOptions) {
          return this.apiContext.get(
            'v2/fan-group-owner/groups/' + fanGroupId + '/badges',
            null,
            seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions)
          );
        };
        FanApi.prototype.grantBadge = function(fanGroupId, body) {
          return this.apiContext.post('v2/fan-group-owner/groups/' + fanGroupId + '/badges/grant/', body, null);
        };
        FanApi.prototype.revokeBadge = function(fanGroupId, body) {
          return this.apiContext.post('v2/fan-group-owner/groups/' + fanGroupId + '/badges/revoke/', body, null);
        };
        FanApi.prototype.linkBadgeToWl = function(waitingListId, body) {
          return this.apiContext.post('v2/fan-group-owner/waiting-lists/' + waitingListId + '/badges', body, null);
        };
        FanApi.prototype.unlinkBadgeToWl = function(waitingListId, linkId) {
          return this.apiContext.delete(
            'v2/fan-group-owner/waiting-lists/' + waitingListId + '/wl-badges/' + linkId,
            null,
            null
          );
        };
        FanApi.prototype.relinkBadgeToWl = function(waitingListId, linkId) {
          return this.apiContext.put(
            'v2/fan-group-owner/waiting-lists/' + waitingListId + '/wl-badges/' + linkId,
            null,
            null,
            null
          );
        };
        FanApi.prototype.getWLBadges = function(waitingListId, pagingOptions) {
          return this.apiContext.get(
            'v2/fan-group-owner/waiting-lists/' + waitingListId + '/badges',
            null,
            seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions)
          );
        };
        // BADGE : ADMIN
        // SURVEY : FAN
        /**
     * Gets list of surveys per wishlist
     * @param {PagingOptions} pagingOptions
     */
        FanApi.prototype.getSurveys = function(pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.get('v2/fan/survey/instances', null, queryParams);
        };
        FanApi.prototype.getChoices = function(questionId, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.get(
            'v2/fan/surveys/question/:questionId/choices',
            { questionId: questionId },
            queryParams
          );
        };
        FanApi.prototype.addChoices = function(questionId, choices) {
          return this.apiContext.post(
            'v2/admin/surveys/questions/:questionId/choices',
            { choices: choices },
            { questionId: questionId },
            null
          );
        };
        FanApi.prototype.getChoicesAsFO = function(questionId, pagingOptions) {
          if (pagingOptions === void 0) {
            pagingOptions = { itemOffset: 0, maxPageSize: 200000 };
          }
          return this.apiContext.get(
            'v2/admin/surveys/questions/:questionId/choices',
            { questionId: questionId },
            { pagingOptions: pagingOptions }
          );
        };
        /**
     * Gets list of answers for a given surveyInstanceId
     * @param {string} surveyInstanceId
     */
        FanApi.prototype.getAnswers = function(surveyInstanceId) {
          return this.apiContext.get('v2/fan/surveys/instances/:surveyInstanceId/answers', {
            surveyInstanceId: surveyInstanceId
          });
        };
        /**
     * Submits list of answers for a given surveyInstanceId
     * @param {string} surveyInstanceId
     * @param {Answer[]} answers
     */
        FanApi.prototype.submitAnswers = function(surveyInstanceId, answers) {
          return this.apiContext.post(
            'v2/fan/surveys/instances/:surveyInstanceId/answers',
            { answers: answers },
            { surveyInstanceId: surveyInstanceId }
          );
        };
        // SURVEY : FGO
        /**
     * Gets list of surveys per wishlist
     * @param {string} waitingListId
     * @param {PagingOptions} pagingOptions
     */
        FanApi.prototype.getWaitingListSurveys = function(waitingListId, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.get(
            'v2/fan-group-owner/waiting-lists/:waitingListId/surveys/instances',
            { waitingListId: waitingListId },
            queryParams
          );
        };
        /**
     * Gets list of answers for a given user, survey and waitinglist
     * @param {string} waitingListId
     * @param {string} surveyInstanceId
     * @param {PagingOptions} pagingOptions
     */
        FanApi.prototype.getUserAnswers = function(waitingListId, surveyInstanceId, pagingOptions) {
          var queryParams = seaters_api_1.SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
          return this.apiContext.get(
            'v2/fan-group-owner/waiting-lists/:waitingListId/surveys/instances/:surveyInstanceId/answers',
            { waitingListId: waitingListId, surveyInstanceId: surveyInstanceId },
            queryParams
          );
        };
        FanApi.prototype.loadAdditionalCharges = function(waitingListId) {
          return this.apiContext.get('v2/fan/waiting-lists/:waitingListId/additional-charges', {
            waitingListId: waitingListId
          });
        };
        FanApi.prototype.getBasicConnectedAppToken = function() {
          return this.apiContext.post(
            'connected-app/authenticated/basic/token',
            { grant_type: 'client_credentials' },
            null,
            null
          );
        };
        FanApi.prototype.getJoinsCount = function() {
          return this.apiContext.get('connected-app/services/fangroup/count/joins');
        };
        return FanApi;
      })();
      exports.FanApi = FanApi;
      /* tslint:enable:no-floating-promises */

      /***/
    },
    /* 8 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var SeatersApiController = /** @class */ (function() {
        function SeatersApiController() {}
        SeatersApiController.prototype.buildParams = function(obj) {
          if (obj === void 0) {
            obj = {};
          }
          var map = {};
          Object.keys(obj).forEach(function(k) {
            return (map[k] = obj[k]);
          });
          return map;
        };
        SeatersApiController.prototype.buildPagingQueryParams = function(pagingOptions) {
          return this.buildParams({
            maxPageSize: pagingOptions.maxPageSize,
            itemOffset: pagingOptions.itemOffset
          });
        };
        return SeatersApiController;
      })();
      exports.SeatersApiController = SeatersApiController;

      /***/
    },
    /* 9 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var Subject = /** @class */ (function() {
        function Subject() {
          this.observers = [];
        }
        Subject.prototype.next = function(evt) {
          this.observers.forEach(function(observer) {
            return observer(evt);
          });
        };
        Subject.prototype.subscribe = function(observer) {
          this.observers.push(observer);
          return this.observers.length - 1;
        };
        Subject.prototype.unsubscribe = function(observerHandle) {
          this.observers.splice(observerHandle, 1);
        };
        return Subject;
      })();
      exports.Subject = Subject;

      /***/
    },
    /* 10 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var ApiEndpoint = /** @class */ (function() {
        function ApiEndpoint(abstractEndpoint, endpointParams, queryParams, prefix) {
          this.endpointParams = endpointParams;
          this.queryParams = queryParams;
          this.prefix = prefix;
          this.abstractEndpoint = this.normalizeAbstractEndpoint(abstractEndpoint);
          this.concreteEndpoint = this.renderConcreteEndpoint();
          this.concreteEndpointWithQueryParams = this.renderConcreteEndpointWithQueryParams();
          this.absoluteEndpoint = this.renderAbsoluteEndpoint();
        }
        ApiEndpoint.prototype.normalizeAbstractEndpoint = function(abstractEndpoint) {
          return abstractEndpoint
            .replace(/^\//, '') // no prefixed '/'
            .replace(/\/$/, ''); // no trailing '/'
        };
        ApiEndpoint.prototype.renderEndpointParam = function(parameter) {
          if (!this.endpointParams.hasOwnProperty(parameter)) {
            throw new Error('Unable to render endpoint param: ' + parameter);
          }
          // SimpleJSONPrimitive can always be cast to string
          return encodeURIComponent(this.endpointParams[parameter]);
        };
        ApiEndpoint.prototype.renderConcreteEndpoint = function() {
          var _this = this;
          var endpointParamRx = /:([a-zA-Z][a-zA-Z0-9]*)/g;
          return this.abstractEndpoint.replace(endpointParamRx, function(match) {
            return _this.renderEndpointParam(match.substr(1));
          });
        };
        ApiEndpoint.prototype.renderQueryParams = function() {
          var _this = this;
          var paramsArray = Object.keys(this.queryParams).map(function(key) {
            var value = _this.queryParams[key];
            if (Array.isArray(value)) {
              var valueArray = value;
              return valueArray
                .map(function(param) {
                  return encodeURIComponent(key) + '=' + encodeURIComponent(param);
                })
                .join('&');
            } else {
              var valueString = value;
              return encodeURIComponent(key) + '=' + encodeURIComponent(valueString);
            }
          });
          return paramsArray.join('&');
        };
        ApiEndpoint.prototype.renderConcreteEndpointWithQueryParams = function() {
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
        ApiEndpoint.prototype.renderAbsoluteEndpoint = function() {
          // remove trailing '/' from the prefix
          var normalizedPrefix = this.prefix.replace(/\/$/, '');
          return normalizedPrefix + '/' + this.concreteEndpointWithQueryParams;
        };
        return ApiEndpoint;
      })();
      exports.ApiEndpoint = ApiEndpoint;

      /***/
    },
    /* 11 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var DeferredPromise = /** @class */ (function() {
        function DeferredPromise() {
          var _this = this;
          this.promise = new Promise(function(resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
          });
        }
        return DeferredPromise;
      })();
      exports.DeferredPromise = DeferredPromise;

      /***/
    },
    /* 12 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      /* tslint:disable:no-floating-promises */
      var seaters_api_context_1 = __webpack_require__(6);
      var AppApi = /** @class */ (function() {
        function AppApi(apiContext) {
          this.apiContext = apiContext;
        }
        AppApi.prototype.env = function() {
          return this.apiContext.get('/app/env');
        };
        AppApi.prototype.countries = function(pagingOptions) {
          var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(
            this.apiContext.get('/app/countries', null, queryParams)
          );
        };
        AppApi.prototype.languages = function(pagingOptions) {
          var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(
            this.apiContext.get('/app/languages', null, queryParams)
          );
        };
        AppApi.prototype.timeZones = function(pagingOptions) {
          var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(
            this.apiContext.get('/app/time-zones', null, queryParams)
          );
        };
        AppApi.prototype.currencies = function(pagingOptions) {
          var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(
            this.apiContext.get('/app/currencies', null, queryParams)
          );
        };
        AppApi.prototype.translations = function(target, language, pagingOptions) {
          var queryParams = seaters_api_context_1.SeatersApiContext.buildPagingQueryParams(pagingOptions);
          if (target) {
            queryParams.target = target;
          }
          if (language) {
            queryParams.lang = language;
          }
          return seaters_api_context_1.SeatersApiContext.convertPagedResultToArray(
            this.apiContext.get('/app/translations', null, queryParams)
          );
        };
        AppApi.prototype.userDefaultLocale = function() {
          return this.apiContext.doSeatersRequest({
            method: 'GET',
            abstractEndpoint: '/app/user-default-locale'
          });
        };
        return AppApi;
      })();
      exports.AppApi = AppApi;
      /* tslint:enable:no-floating-promises */

      /***/
    },
    /* 13 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(7));
      __export(__webpack_require__(35));

      /***/
    },
    /* 14 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var PagingOptions = /** @class */ (function() {
        function PagingOptions(itemOffset, maxPageSize, sort) {
          this.itemOffset = itemOffset;
          this.maxPageSize = maxPageSize;
          this.sort = sort;
        }
        PagingOptions.toQueryParams = function(pagingOptions, queryParams) {
          if (!queryParams) {
            queryParams = {};
          }
          if (!pagingOptions) {
            return queryParams;
          }
          if (pagingOptions.itemOffset) {
            queryParams.itemOffset = pagingOptions.itemOffset.toString();
          }
          if (pagingOptions.maxPageSize) {
            queryParams.maxPageSize = pagingOptions.maxPageSize.toString();
          }
          if (pagingOptions.sort) {
            queryParams.sort = pagingOptions.sort.toString();
          }
          return queryParams;
        };
        return PagingOptions;
      })();
      exports.PagingOptions = PagingOptions;

      /***/
    },
    /* 15 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var HealthApi = /** @class */ (function() {
        function HealthApi(apiContext) {
          this.apiContext = apiContext;
        }
        HealthApi.prototype.node = function() {
          return this.apiContext.doSeatersRequest({
            method: 'GET',
            abstractEndpoint: '/health/node'
          });
        };
        return HealthApi;
      })();
      exports.HealthApi = HealthApi;

      /***/
    },
    /* 16 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports.HEALTH_NODE_OK = 'OK';

      /***/
    },
    /* 17 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var AuthenticationApi = /** @class */ (function() {
        function AuthenticationApi(apiContext) {
          this.apiContext = apiContext;
        }
        /**
     * Login using email-password credentials
     * @param credentials email, password and optionally MFA token
     */
        AuthenticationApi.prototype.emailPasswordLogin = function(credentials) {
          return this.apiContext.put('/v2/authentication/login', credentials);
        };
        /**
     * Login using long-term stored token
     * @param credentials long term stored token and optionally MFA token
     */
        AuthenticationApi.prototype.storedTokenLogin = function(credentials) {
          return this.apiContext.put('/v2/authentication/stored-token', credentials);
        };
        /**
     * Extend your session with a refresh token
     * @param credentials Refresh token
     */
        AuthenticationApi.prototype.refreshTokenLogin = function(credentials) {
          return this.apiContext.put('/v2/authentication/refresh-token', credentials);
        };
        /**
     * Signs up a new user
     * @param input
     * @returns {any}
     */
        AuthenticationApi.prototype.signup = function(input) {
          return this.apiContext.post('/v2/authentication/signup', input);
        };
        /**
     * Signs up a new user without firstname / lastname / password
     * @param input
     * @returns {any}
     */
        AuthenticationApi.prototype.signupAnonymous = function(input) {
          return this.apiContext.post('/v2/authentication/embedded/signup', input);
        };
        /**
     * Validates an email or phone number and marks it as confirmed
     *
     * @param input Either the email or the phone and the confirmation code
     * @returns Promise that resolves with the validated user or rejects with a SeatersApiException
     * @see SeatersApiException
     */
        AuthenticationApi.prototype.validate = function(input) {
          return this.apiContext.put('/auth/validate', input);
        };
        /**
     *
     * @param input
     * @returns {any}
     */
        AuthenticationApi.prototype.resetPassword = function(input) {
          return this.apiContext.put('/v2/authentication/reset-password', input);
        };
        AuthenticationApi.prototype.verifyOAuth = function(input) {
          var endpoint = '/v2/authentication/verify-oauth/';
          return this.apiContext.put(endpoint, input, null, null);
        };
        /**
     *
     * @param input
     * @returns {any}
     */
        AuthenticationApi.prototype.resetEmail = function(input) {
          return this.apiContext.post('/auth/signup/reset-email', input);
        };
        /**
     * Obtain a seaters session by passing an oauth code for a given provider
     * Examples that should work are github, facebook. For your specific provider name
     * please refer to a seaters developer.
     */
        AuthenticationApi.prototype.loginWithOAuthCode = function(oauthProvider, code) {
          var endpoint = '/login/:oauthProvider';
          var endpointParams = { oauthProvider: oauthProvider };
          var queryParams = { code: code };
          return this.apiContext.get(endpoint, endpointParams, queryParams);
        };
        /**
     * Create a new authentication token that can be stored and is valid for a longer time
     * for the authenticated user.
     */
        AuthenticationApi.prototype.createStoredToken = function(input) {
          var endpoint = '/auth/auth-tokens';
          return this.apiContext.post(endpoint, input, null, null);
        };
        /**
     * Get all stored tokens for authenticated user
     */
        AuthenticationApi.prototype.getStoredTokens = function() {
          var endpoint = '/auth/auth-tokens';
          return this.apiContext.get(endpoint);
        };
        /**
     * Update password
     * @param data
     */
        AuthenticationApi.prototype.updatePassword = function(data) {
          return this.apiContext.put('/v2/authentication/update-password', data);
        };
        return AuthenticationApi;
      })();
      exports.AuthenticationApi = AuthenticationApi;

      /***/
    },
    /* 18 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var seaters_api_1 = __webpack_require__(1);
      var fan_types_1 = __webpack_require__(2);
      var profiling_types_1 = __webpack_require__(4);
      var util_1 = __webpack_require__(0);
      var WAITING_LIST_ACTION_STATUS = fan_types_1.fan.WAITING_LIST_ACTION_STATUS;
      var EXPORTABLE_TICKETING_SYSTEMS = ['UPLOAD', 'DIGITICK'];
      var GROUP_PAYMENT_METHODS = {
        CREDIT_CARD: 'CREDIT_CARD',
        IDEAL: 'IDEAL',
        MASTERPASS: 'MASTERPASS',
        VIRTUAL: 'VIRTUAL'
      };
      var WaitingListService = /** @class */ (function() {
        function WaitingListService(api) {
          this.api = api;
        }
        WaitingListService.prototype.getWaitingList = function(waitingListId) {
          var _this = this;
          return this.getRawWaitingList(waitingListId)
            .then(function(wl) {
              return _this.waitForVoucher(wl);
            })
            .then(function(wl) {
              return _this.extendRawWaitingList(wl);
            });
        };
        WaitingListService.prototype.getWaitingLists = function(waitingListIds) {
          var _this = this;
          return this.api.fan.waitingLists(waitingListIds).then(function(wls) {
            return wls.map(function(wl) {
              return _this.extendRawWaitingList(wl);
            });
          });
        };
        WaitingListService.prototype.getWaitingListsInFanGroup = function(fanGroupId, pagingOptions, keyWords) {
          var _this = this;
          return this.api.fan.waitingListsInFanGroup(fanGroupId, pagingOptions, keyWords).then(function(wls) {
            return _this.extendRawWaitingLists(wls);
          });
        };
        WaitingListService.prototype.getWaitingListsInFanGroupByKeywords = function(
          fanGroupId,
          pagingOptions,
          keyWords
        ) {
          var _this = this;
          return this.api.fan.waitingListsInFanGroupByKeywords(fanGroupId, pagingOptions, keyWords).then(function(wls) {
            return _this.extendRawWaitingLists(wls);
          });
        };
        WaitingListService.prototype.getWaitingListsInFanGroups = function(fanGroupIds, pagingOptions, keyWords) {
          var _this = this;
          return this.api.fan.waitingListsInFanGroups(fanGroupIds, pagingOptions, keyWords).then(function(wls) {
            return _this.extendRawWaitingLists(wls);
          });
        };
        WaitingListService.prototype.getMyWaitingListsWithoutSeat = function(page) {
          var _this = this;
          return this.api.fan.joinedWaitingListsWithoutSeat(page).then(function(res) {
            return _this.extendRawWaitingLists(res);
          });
        };
        WaitingListService.prototype.getMyWaitingListsWithSeat = function(page) {
          var _this = this;
          return this.api.fan.joinedWaitingListsWithSeat(page).then(function(res) {
            return _this.extendRawWaitingLists(res);
          });
        };
        WaitingListService.prototype.getWaitingListTranslatedVenueDescription = function(waitingListId) {
          return this.api.fan.waitingListTranslatedVenueDescription(waitingListId);
        };
        WaitingListService.prototype.getPositionBraintreePaymentInfo = function(waitingListId) {
          var _this = this;
          return this.getPositionPaymentInfo(waitingListId).then(function(paymentInfo) {
            // ensure it's a proper braintree payment
            if (paymentInfo.paymentSystemType !== 'BRAINTREE') {
              throw new Error('WaitingList ' + waitingListId + ' is not configured to use braintree');
            }
            if (paymentInfo.transactions.length !== 1) {
              console.error(
                '[FanService] unexpected nbr of transactions for wl (%s) : %s',
                waitingListId,
                paymentInfo.transactions.length
              );
              throw new Error('Unexpected number of transactions for braintree payment for WL ' + waitingListId);
            }
            // fetch the token for this position
            return _this.positionBraintreeToken(waitingListId).then(function(braintreeToken) {
              // combine the settings with the token
              return __assign({}, paymentInfo.braintreeConfig, {
                // Transaction
                currency: paymentInfo.transactions[0].currency,
                total: paymentInfo.transactions[0].total,
                // Payment method helpers
                masterpassEnabled:
                  !paymentInfo.braintreeConfig.threeDSEnabled &&
                  paymentInfo.braintreeConfig.paymentMethods.indexOf(GROUP_PAYMENT_METHODS.MASTERPASS) !== -1,
                // @TODO: Disable iDEAL payment until the backend is configred
                // idealEnabled: paymentInfo.braintreeConfig.paymentMethods.indexOf(GROUP_PAYMENT_METHODS.IDEAL) !== -1,
                idealEnabled: false,
                // Token
                token: braintreeToken.token
              });
            });
          });
        };
        WaitingListService.prototype.getPositionSeatersPaymentInfo = function(waitingListId) {
          return this.getPositionPaymentInfo(waitingListId).then(function(paymentInfo) {
            // ensure it's a proper seaters payment
            if (paymentInfo.paymentSystemType !== 'SEATERS') {
              throw new Error('WaitingList ' + waitingListId + ' is not configured to use braintree');
            }
            if (paymentInfo.transactions.length !== 1) {
              console.error(
                '[FanService] unexpected nbr of transactions for wl (%s) : %s',
                waitingListId,
                paymentInfo.transactions.length
              );
              throw new Error('Unexpected number of transactions for braintree payment for WL ' + waitingListId);
            }
            return __assign({}, paymentInfo.seatersConfig, {
              virtualEnabled: paymentInfo.seatersConfig.paymentMethods.indexOf('VIRTUAL') !== -1
            });
          });
        };
        WaitingListService.prototype.getPositionPaynlPaymentInfo = function(waitingListId) {
          return this.getPositionPaymentInfo(waitingListId).then(function(paymentInfo) {
            if (paymentInfo.paymentSystemType !== 'PAY') {
              throw new Error('WaitingList ' + waitingListId + ' is not configured to use Paynl');
            }
            if (paymentInfo.transactions.length !== 1) {
              console.error(
                '[FanService] unexpected nbr of transactions for wl (%s) : %s',
                waitingListId,
                paymentInfo.transactions.length
              );
              throw new Error('Unexpected number of transactions for Pay payment for WL ' + waitingListId);
            }
            return __assign({}, paymentInfo);
          });
        };
        WaitingListService.prototype.joinWaitingList = function(
          waitingListId,
          numberOfSeats,
          selectedSeats,
          additionalQueryParams
        ) {
          var _this = this;
          return this.api.fan
            .joinWaitingList(waitingListId, numberOfSeats, selectedSeats, additionalQueryParams)
            .then(function() {
              return _this.pollWaitingList(waitingListId, function(wl) {
                return wl.actionStatus !== WAITING_LIST_ACTION_STATUS.BOOK;
              });
            })
            .then(function(wl) {
              return _this.waitForDirectSales(wl);
            });
        };
        WaitingListService.prototype.joinProtectedWaitingList = function(
          waitingListId,
          code,
          numberOfSeats,
          additionalQueryParams
        ) {
          var _this = this;
          return this.getWaitingList(waitingListId)
            .then(function(wl) {
              return _this.api.fan.joinProtectedWaitingList(wl, code, numberOfSeats, additionalQueryParams);
            })
            .then(function() {
              return _this.pollWaitingList(waitingListId, function(wl) {
                return _this.checkUnlockStatus(wl);
              });
            })
            .then(function() {
              return _this.pollWaitingList(waitingListId, function(wl) {
                return wl.actionStatus !== WAITING_LIST_ACTION_STATUS.UNLOCK;
              });
            })
            .then(function(wl) {
              return _this.waitForDirectSales(wl);
            });
        };
        WaitingListService.prototype.shareWaitingList = function(waitingListId) {
          return this.api.fan.shareWaitingList(waitingListId);
        };
        WaitingListService.prototype.leaveWaitingList = function(waitingListId) {
          var _this = this;
          return this.api.fan.leaveWaitingList(waitingListId).then(function() {
            return _this.pollWaitingList(waitingListId, function(wl) {
              return (
                wl.actionStatus !== WAITING_LIST_ACTION_STATUS.WAIT &&
                wl.actionStatus !== WAITING_LIST_ACTION_STATUS.CONFIRM &&
                wl.actionStatus !== WAITING_LIST_ACTION_STATUS.GO_LIVE
              );
            });
          });
        };
        WaitingListService.prototype.getPositionPaymentInfo = function(waitingListId) {
          return this.api.fan.positionPaymentInfo(waitingListId);
        };
        WaitingListService.prototype.payPosition = function(waitingListId, transaction) {
          var _this = this;
          return this.submitTransaction(waitingListId, transaction).then(function() {
            return _this.waitUntilCanGoLive(waitingListId);
          });
        };
        WaitingListService.prototype.sendPendingPayment = function(waitingListId, transaction) {
          return this.api.fan.createPositionSalesTransaction(waitingListId, transaction);
        };
        WaitingListService.prototype.sendPayCallback = function(reference) {
          return this.api.fan.sendPayCallback(reference);
        };
        WaitingListService.prototype.checkIfGoLive = function(waitingListId) {
          return this.pollWaitingList(
            waitingListId,
            function(wl) {
              return (
                wl.actionStatus === WAITING_LIST_ACTION_STATUS.GO_LIVE ||
                wl.actionStatus === WAITING_LIST_ACTION_STATUS.NO_SEATS
              );
            },
            10,
            1000,
            false
          );
        };
        WaitingListService.prototype.getSalesTransaction = function(waitingListId) {
          return this.api.fan.getPositionSalesTransaction(waitingListId);
        };
        WaitingListService.prototype.deleteSalesTransaction = function(waitingListId) {
          return this.api.fan.deletePositionSalesTransaction(waitingListId);
        };
        WaitingListService.prototype.preauthorizePosition = function(waitingListId, transaction) {
          var _this = this;
          return this.submitTransaction(waitingListId, transaction).then(function() {
            return _this.pollWaitingList(waitingListId, function(wl) {
              return wl.position.expirationDate === null;
            });
          });
        };
        WaitingListService.prototype.saveAttendeesInfo = function(waitingListId, attendeesInfo) {
          var _this = this;
          return this.api.fan
            .updateAttendeesInfo(waitingListId, attendeesInfo)
            .catch(function(e) {
              throw seaters_api_1.SeatersExceptionV3.seatersExceptionV3Mapper(e);
            })
            .then(function() {
              return _this.pollWaitingList(waitingListId, function(wl) {
                var storedAttendees = (wl.position.attendeesInfo && wl.position.attendeesInfo.attendees) || [];
                return storedAttendees.length === attendeesInfo.length;
              });
            });
        };
        WaitingListService.prototype.acceptSeats = function(waitingListId, formatUsed) {
          var _this = this;
          return this.api.fan.acceptSeats(waitingListId, formatUsed).then(function() {
            return _this.waitUntilCanGoLive(waitingListId);
          });
        };
        WaitingListService.prototype.rejectSeats = function(waitingListId) {
          var _this = this;
          return this.api.fan.rejectSeats(waitingListId).then(function() {
            return _this.pollWaitingList(waitingListId, function(wl) {
              return (
                wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK ||
                wl.actionStatus === WAITING_LIST_ACTION_STATUS.UNLOCK
              );
            });
          });
        };
        WaitingListService.prototype.exportSeats = function(waitingListId, formatUsed) {
          var _this = this;
          return this.waitUntilSeatsCanBeExported(waitingListId)
            .then(function() {
              return _this.api.fan.exportSeats(waitingListId, formatUsed);
            })
            .then(function() {
              return _this.pollWaitingList(waitingListId, function(wl) {
                return wl && wl.seat && wl.seat.exportedVoucherUrl && wl.seat.exportedVoucherUrl.length > 0;
              });
            });
        };
        WaitingListService.prototype.getEventDescriptionForWaitingList = function(waitingListId) {
          return this.api.fan.getEventDescription(waitingListId);
        };
        WaitingListService.prototype.getTranslatedEventDescriptionForWaitingList = function(waitingListId) {
          return this.api.fan.getTranslatedEventDescription(waitingListId);
        };
        WaitingListService.prototype.getVenueConditionsForWaitingList = function(waitingListId) {
          return this.api.fan.getVenueConditions(waitingListId);
        };
        WaitingListService.prototype.getTranslatedVenueConditionsForWaitingList = function(waitingListId) {
          return this.api.fan.getTranslatedVenueConditions(waitingListId);
        };
        WaitingListService.prototype.positionBraintreeToken = function(waitingListId) {
          return this.api.fan.positionBraintreeToken(waitingListId);
        };
        WaitingListService.prototype.getWaitingListPrice = function(waitingListId, numberOfSeats) {
          return this.api.fan.waitingListPrice(waitingListId, numberOfSeats);
        };
        // Profiling - FGO
        WaitingListService.prototype.getWaitingListCategories = function(pagingOptions) {
          return this.api.fan.getWaitingListCategories(pagingOptions);
        };
        WaitingListService.prototype.getWaitingListInterests = function(waitingListId) {
          return this.api.fan.getWaitingListInterests(waitingListId);
        };
        WaitingListService.prototype.getWaitingListFanAttributes = function(waitingListId, pagingOptions) {
          pagingOptions = pagingOptions || {};
          if (!pagingOptions.filters) {
            pagingOptions.filters = {
              waitinglist_fan_attribute_status: profiling_types_1.profiling.USER_FAN_ATTRIBUTES_STATUS.LINKED
            };
          }
          return this.api.fan.getWaitingListFanAttributes(waitingListId, pagingOptions);
        };
        WaitingListService.prototype.linkWaitingListInterest = function(waitingListId, interestId) {
          return this.api.fan.linkWaitingListInterest(waitingListId, interestId);
        };
        WaitingListService.prototype.linkWaitingListFanAttribute = function(waitingListId, fanAttributeId) {
          return this.api.fan.linkWaitingListFanAttribute(waitingListId, fanAttributeId);
        };
        WaitingListService.prototype.unlinkWaitingListInterest = function(waitingListId, interestId) {
          return this.api.fan.unlinkWaitingListInterest(waitingListId, interestId);
        };
        WaitingListService.prototype.unlinkWaitingListFanAttribute = function(waitingListId, fanAttributeId) {
          return this.api.fan.unlinkWaitingListFanAttribute(waitingListId, fanAttributeId);
        };
        WaitingListService.prototype.loadAdditionalCharges = function(waitingListId) {
          return this.api.fan.loadAdditionalCharges(waitingListId);
        };
        WaitingListService.prototype.hasPreviousPayment = function(wl) {
          return !!(wl.position && wl.position.transactionStatus);
        };
        WaitingListService.prototype.hasPaymentInProgress = function(wl) {
          if (!wl.position) {
            return false;
          } else {
            return (
              ['CREATING', 'CREATED', 'APPROVED', 'CANCELLED', 'REFUNDING'].indexOf(wl.position.transactionStatus) >= 0
            );
          }
        };
        WaitingListService.prototype.canPay = function(wl) {
          if (WAITING_LIST_ACTION_STATUS.WAIT === wl.actionStatus) {
            return !!wl.position.expirationDate;
          } else if (WAITING_LIST_ACTION_STATUS.CONFIRM === wl.actionStatus) {
            if (wl.position.transactionStatus === 'PENDING') {
              return true;
            }
            return !wl.position.transactionStatus || wl.position.transactionStatus === 'FAILURE';
          } else {
            return false;
          }
        };
        WaitingListService.prototype.checkUnlockStatus = function(wl) {
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
        WaitingListService.prototype.getRawWaitingList = function(waitingListId) {
          return this.api.fan.waitingList(waitingListId);
        };
        WaitingListService.prototype.extendRawWaitingList = function(wl) {
          return __assign({}, wl, {
            actionStatus: this.getWaitingListActionStatus(wl),
            // (T)ODO: pending status
            shouldProvideAttendeesInfo: this.shouldProvideAttendeesInfo(wl),
            processing: undefined
          });
        };
        WaitingListService.prototype.extendRawWaitingLists = function(wls) {
          var _this = this;
          wls.items = wls.items.map(function(wl) {
            return _this.extendRawWaitingList(wl);
          });
          return wls;
        };
        WaitingListService.prototype.pollWaitingList = function(
          waitingListId,
          condition,
          limit,
          delayInMs,
          useRawWaitingList
        ) {
          var _this = this;
          return util_1.retryUntil(
            // We use the raw waitinglist data instead to prevent an infinite loop when re-fetching the waiting list
            function() {
              return useRawWaitingList ? _this.getRawWaitingList(waitingListId) : _this.getWaitingList(waitingListId);
            },
            condition,
            limit || 10,
            delayInMs || 1000
          );
        };
        WaitingListService.prototype.getWaitingListActionStatus = function(waitingList) {
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
              if (seat.status === 'ASSIGNED' || seat.status === 'ASSIGNED_WITHOUT_SEATS') {
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
                } else if (
                  ['CREATING', 'CREATED', 'APPROVED', 'REFUNDING', 'PENDING'].indexOf(position.transactionStatus) >= 0
                ) {
                  // payment in progress
                  return WAITING_LIST_ACTION_STATUS.CONFIRM; // (-)PENDING
                } else if (position.transactionStatus === 'COMPLETED') {
                  // payment in progress
                  return WAITING_LIST_ACTION_STATUS.GO_LIVE;
                } else {
                  console.error('[WaitingListService] - unexpected transactionStatus: %s', position.transactionStatus);
                  return WAITING_LIST_ACTION_STATUS.ERROR;
                }
              } else if (seat.status === 'ACCEPTED') {
                // go live
                return WAITING_LIST_ACTION_STATUS.GO_LIVE;
              } else if (seat.status === 'RSVP_ACCEPTED') {
                // go live
                return WAITING_LIST_ACTION_STATUS.NO_SEATS;
              } else if (waitingList.seatDistributionMode === 'TICKET' && seat.ticketingSystemType) {
                // non-voucher - tickets are being requested
                return WAITING_LIST_ACTION_STATUS.CONFIRM; // (-)PENDING
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
        WaitingListService.prototype.waitForDirectSales = function(wl) {
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
          return util_1.timeoutPromise(1000).then(function() {
            return _this.getWaitingList(wl.waitingListId);
          });
        };
        WaitingListService.prototype.waitForVoucher = function(wl) {
          var _this = this;
          // If there is no seat, skip
          if (!wl || !wl.seat || !wl.seat.status) {
            return Promise.resolve(wl);
          }
          // If the seat has not been accepted yet, skip
          if (wl.seat.status !== 'ACCEPTED') {
            return Promise.resolve(wl);
          }
          // If there is no voucher, skip
          if (!this.hasVoucher(wl)) {
            return Promise.resolve(wl);
          }
          // Wait for voucher number to come though
          return this.pollWaitingList(
            wl.waitingListId,
            function(updatedWl) {
              return _this.seatHasVoucherNumber(updatedWl);
            },
            60,
            1000,
            true
          );
        };
        WaitingListService.prototype.hasVoucher = function(wl) {
          return (
            wl.seatDistributionMode === 'VOUCHER' && wl.seat && wl.seat.voucherNumber && wl.seat.voucherNumber !== ''
          );
        };
        WaitingListService.prototype.seatHasVoucherNumber = function(wl) {
          return (
            wl.seat.voucherNumber !== '' &&
            wl.seat.voucherNumber !== '/' &&
            wl.seat.voucherNumber !== null &&
            wl.seat.voucherNumber !== undefined
          );
        };
        WaitingListService.prototype.hasTicket = function(wl) {
          return wl.seatDistributionMode === 'TICKET' && wl.seat && !!wl.seat.ticketingSystemType;
        };
        WaitingListService.prototype.seatsCanBeExported = function(wl) {
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
        WaitingListService.prototype.waitUntilCanGoLive = function(waitingListId, useRawWishList) {
          return this.pollWaitingList(waitingListId, function(wl) {
            return (
              wl.actionStatus === WAITING_LIST_ACTION_STATUS.GO_LIVE ||
              wl.actionStatus === WAITING_LIST_ACTION_STATUS.NO_SEATS
            );
          });
        };
        WaitingListService.prototype.waitUntilSeatsCanBeExported = function(waitingListId) {
          var _this = this;
          return this.pollWaitingList(
            waitingListId,
            function(wl) {
              return _this.seatsCanBeExported(wl);
            },
            60,
            1000
          );
        };
        WaitingListService.prototype.shouldProvideAttendeesInfo = function(wl) {
          if (!wl.eventRequiredAttendeeInfo || wl.eventRequiredAttendeeInfo.length === 0) {
            // if no info is asked, we don't need to ask for attendee info
            return false;
          } else {
            return true;
          }
        };
        WaitingListService.prototype.submitTransaction = function(waitingListId, transaction) {
          var _this = this;
          return this.getWaitingList(waitingListId)
            .then(function(wl) {
              return _this.ensureFanCanPayPosition(wl);
            })
            .then(function(wl) {
              return _this.removePreviousTransactionIfAny(wl);
            })
            .then(function(wl) {
              return _this.createTransaction(waitingListId, transaction);
            })
            .then(undefined, function(err) {
              console.error('[WaitingListService] submitTransaction failed: %s', err, transaction);
              throw err;
            });
        };
        WaitingListService.prototype.ensureFanCanPayPosition = function(wl) {
          if (!this.canPay(wl)) {
            throw new Error('Trying to submit transaction for WL that is not in a state that requires payment');
          } else if (this.hasPaymentInProgress(wl)) {
            throw new Error('Trying to submit transaction for WL which has a payment in progress');
          } else {
            return Promise.resolve(wl);
          }
        };
        WaitingListService.prototype.removePreviousTransactionIfAny = function(wl) {
          var _this = this;
          if (!this.hasPreviousPayment(wl)) {
            return Promise.resolve(wl);
          }
          return this.api.fan.deletePositionSalesTransaction(wl.waitingListId).then(function() {
            return _this.pollWaitingList(
              wl.waitingListId,
              function(updatedWl) {
                return !_this.hasPreviousPayment(updatedWl);
              },
              60,
              1000
            );
          });
        };
        WaitingListService.prototype.createTransaction = function(waitingListId, transaction) {
          var _this = this;
          return this.api.fan
            .createPositionSalesTransaction(waitingListId, transaction)
            .then(function() {
              return _this.pollWaitingList(
                waitingListId,
                function(wl) {
                  return _this.hasProcessedPayment(wl);
                },
                60,
                1000
              );
            })
            .then(function(wl) {
              if (_this.hasFailedPayment(wl)) {
                var errorMessage = wl.position ? wl.position.paymentFailureMessage : 'Payment Failed!';
                return Promise.reject(errorMessage);
              }
              return wl;
            });
        };
        WaitingListService.prototype.hasProcessedPayment = function(wl) {
          return wl.position && ['FAILURE', 'COMPLETED', 'PENDING'].indexOf(wl.position.transactionStatus) >= 0;
        };
        WaitingListService.prototype.hasFailedPayment = function(wl) {
          return wl.position && wl.position.transactionStatus === 'FAILURE';
        };
        return WaitingListService;
      })();
      exports.WaitingListService = WaitingListService;

      /***/
    },
    /* 19 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var util_1 = __webpack_require__(0);
      var fan_types_1 = __webpack_require__(2);
      var FAN_GROUP_ACTION_STATUS = fan_types_1.fan.FAN_GROUP_ACTION_STATUS;
      var FanGroupService = /** @class */ (function() {
        function FanGroupService(api) {
          this.api = api;
        }
        FanGroupService.prototype.getFanGroups = function(fanGroupIds) {
          var _this = this;
          return this.api.fan.fanGroups(fanGroupIds).then(function(fgs) {
            return fgs.map(function(fg) {
              return _this.extendRawFanGroup(fg);
            });
          });
        };
        FanGroupService.prototype.getFanGroup = function(fanGroupId) {
          var _this = this;
          return this.getRawFanGroup(fanGroupId).then(function(fg) {
            return __assign({}, fg, { actionStatus: _this.getFanGroupActionStatus(fg) });
          });
        };
        FanGroupService.prototype.getFanGroupBySlug = function(slug) {
          var _this = this;
          return this.api.fan.fanGroupBySlug(slug).then(function(fg) {
            return __assign({}, fg, { actionStatus: _this.getFanGroupActionStatus(fg) });
          });
        };
        FanGroupService.prototype.getOauthAuthorizationCodeUrl = function(provider) {
          return this.api.fan.oauthAuthorizationCodeUrl(provider);
        };
        FanGroupService.prototype.getFanGroupLookBySlug = function(slug) {
          return this.api.fan.fanGroupLookBySlug(slug);
        };
        FanGroupService.prototype.getFanGroupTranslatedDescription = function(fanGroupId) {
          return this.api.fan.fanGroupTranslatedDescription(fanGroupId);
        };
        FanGroupService.prototype.joinFanGroup = function(fanGroupId) {
          var _this = this;
          return this.api.fan.joinFanGroup(fanGroupId).then(function() {
            return util_1.retryUntil(
              function() {
                return _this.getFanGroup(fanGroupId);
              },
              function(fg) {
                return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE;
              },
              10,
              1000
            );
          });
        };
        FanGroupService.prototype.joinProtectedFanGroup = function(fanGroupId, code) {
          var _this = this;
          return this.getFanGroup(fanGroupId)
            .then(function(fg) {
              return _this.api.fan.joinProtectedFanGroup(fg, code);
            })
            .then(function() {
              return _this.pollFanGroup(fanGroupId, function(fg) {
                return _this.checkUnlockStatus(fg);
              });
            })
            .then(function() {
              return _this.pollFanGroup(fanGroupId, function(fg) {
                return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE;
              });
            });
        };
        FanGroupService.prototype.requestToJoinPrivateFanGroup = function(fanGroupId) {
          var _this = this;
          return this.getFanGroup(fanGroupId)
            .then(function(fg) {
              return _this.api.fan.joinProtectedFanGroup(fg, null);
            })
            .then(function() {
              return _this.pollFanGroup(fanGroupId, function(fg) {
                return fg.actionStatus === FAN_GROUP_ACTION_STATUS.WAITING_FOR_APPROVAL;
              });
            });
        };
        FanGroupService.prototype.joinedFanGroups = function(pagingOptions) {
          var _this = this;
          return this.api.fan.joinedFanGroups(pagingOptions).then(function(fgs) {
            return _this.extendRawFanGroups(fgs);
          });
        };
        FanGroupService.prototype.leaveFanGroup = function(fanGroupId) {
          var _this = this;
          return this.api.fan.leaveFanGroup(fanGroupId).then(function() {
            return _this.pollFanGroup(fanGroupId, function(fg) {
              return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_JOIN;
            });
          });
        };
        FanGroupService.prototype.shareFanGroup = function(fanGroupId) {
          return this.api.fan.shareFanGroup(fanGroupId);
        };
        FanGroupService.prototype.hasGeoFilteredWaitingLists = function(fanGroupId) {
          return this.api.fan.hasGeoFilteredWaitingLists(fanGroupId);
        };
        FanGroupService.prototype.checkUnlockStatus = function(fg) {
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
        FanGroupService.prototype.extendRawFanGroup = function(fg) {
          return __assign({}, fg, { actionStatus: this.getFanGroupActionStatus(fg) });
        };
        FanGroupService.prototype.extendRawFanGroups = function(fgs) {
          var _this = this;
          return __assign({}, fgs, {
            items: fgs.items.map(function(fg) {
              return _this.extendRawFanGroup(fg);
            })
          });
        };
        FanGroupService.prototype.getRawFanGroup = function(fanGroupId) {
          return this.api.fan.fanGroup(fanGroupId);
        };
        FanGroupService.prototype.getFanGroupActionStatus = function(fanGroup) {
          var membership = fanGroup.membership;
          if (membership.member) {
            return FAN_GROUP_ACTION_STATUS.CAN_LEAVE;
          } else if (
            fanGroup.accessMode === 'PUBLIC' ||
            (membership.request && membership.request.status === 'ACCEPTED')
          ) {
            return FAN_GROUP_ACTION_STATUS.CAN_JOIN;
          } else if (membership.request && membership.request.status === 'PENDING') {
            return FAN_GROUP_ACTION_STATUS.WAITING_FOR_APPROVAL;
          } else if (fanGroup.accessMode === 'CODE_PROTECTED' || fanGroup.accessMode === 'PRIVATE') {
            return FAN_GROUP_ACTION_STATUS.CAN_UNLOCK;
          }
          // state that was not implemented
          console.error('GroupService - unhandled group status', JSON.stringify(fanGroup));
        };
        FanGroupService.prototype.pollFanGroup = function(fanGroupId, condition) {
          var _this = this;
          return util_1.retryUntil(
            function() {
              return _this.getFanGroup(fanGroupId);
            },
            condition,
            10,
            1000
          );
        };
        return FanGroupService;
      })();
      exports.FanGroupService = FanGroupService;

      /***/
    },
    /* 20 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(59));
      __export(__webpack_require__(60));
      exports.TYPE_FIELD = 'type';
      exports.TYPO_TOLERANCE_STRICT = 'strict';

      /***/
    },
    /* 21 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      //noinspection TsLint
      // tslint:disable-next-line
      exports.version = '1.36.2';
      __export(__webpack_require__(22));
      var fan_types_1 = __webpack_require__(2);
      exports.fan = fan_types_1.fan;
      var profiling_types_1 = __webpack_require__(4);
      exports.profiling = profiling_types_1.profiling;

      /***/
    },
    /* 22 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var api_1 = __webpack_require__(5);
      var seaters_api_1 = __webpack_require__(1);
      var services_1 = __webpack_require__(46);
      var SeatersClient = /** @class */ (function() {
        function SeatersClient(options) {
          options = __assign({}, SeatersClient.DEFAULT_OPTIONS, options);
          var requestDriver = api_1.getRequestDriver(options.requestDriver);
          this.seatersApi = new seaters_api_1.SeatersApi(options.apiPrefix, requestDriver);
          this.sessionService = new services_1.SessionService(this.seatersApi);
          this.appService = new services_1.AppService(this.seatersApi);
          this.publicService = new services_1.PublicService(this.appService, requestDriver, this.seatersApi);
          this.fanService = new services_1.FanService(this.seatersApi, this.sessionService, this.publicService);
          this.adminService = new services_1.AdminService(this.seatersApi);
          this.ticketingService = new services_1.TicketingService(this.seatersApi);
          this.paymentService = new services_1.PaymentService(this.seatersApi);
        }
        SeatersClient.DEFAULT_OPTIONS = {
          // tslint:disable-next-line
          apiPrefix: 'https://api.dev-seaters.com/api',
          requestDriver: 'BROWSER'
        };
        return SeatersClient;
      })();
      exports.SeatersClient = SeatersClient;
      /**
 * Obtain a seaters client. This will only instantiate the client with the given options the first time you invoke it.
 * Calls made after the initial call will return the original instance.
 */
      exports.getSeatersClient = (function() {
        var client;
        return function(options) {
          if (!client) {
            client = new SeatersClient(options);
          }
          return client;
        };
      })();
      function wrapClient(promiseMiddleware, client) {
        var wrappedClient = {
          appService: {},
          fanService: {},
          publicService: {},
          sessionService: {},
          adminService: {},
          ticketingService: {},
          paymentService: {}
        };
        // tslint:disable-next-line
        Object.keys(wrappedClient).forEach(function(serviceName) {
          var wrappedService = wrappedClient[serviceName];
          var service = client[serviceName];
          // tslint:disable-next-line
          Object.keys(Object.getPrototypeOf(service)).forEach(function(propertyName) {
            var property = service[propertyName];
            if (typeof property === 'function') {
              // tslint:disable-next-line
              wrappedService[propertyName] = function() {
                var res = property.apply(service, Array.prototype.slice.call(arguments));
                if (res instanceof Promise) {
                  return promiseMiddleware(res);
                } else {
                  return res;
                }
              };
            } else {
              wrappedService[propertyName] = property;
            }
          });
        });
        return wrappedClient;
      }
      exports.wrapClient = wrapClient;

      /***/
    },
    /* 23 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var subject_1 = __webpack_require__(9);
      var api_endpoint_1 = __webpack_require__(10);
      var ApiContext = /** @class */ (function() {
        function ApiContext(apiPrefix, requestDriver) {
          this.apiPrefix = apiPrefix;
          this.requestDriver = requestDriver;
          this.requestsSubject = new subject_1.Subject();
          this.headers = {};
          this.headers['Content-Type'] = 'application/json';
        }
        ApiContext.prototype.setHeader = function(header, value) {
          this.headers[header] = value;
        };
        ApiContext.prototype.unsetHeader = function(header) {
          delete this.headers[header];
        };
        ApiContext.prototype.createEndpoint = function(requestDefinition) {
          return new api_endpoint_1.ApiEndpoint(
            requestDefinition.abstractEndpoint,
            requestDefinition.endpointParams || {},
            requestDefinition.queryParams || {},
            this.apiPrefix
          );
        };
        ApiContext.prototype.createRequestOptions = function(requestDefinition, endpoint) {
          var headers = this.mergeHeaders(requestDefinition.headers);
          var body;
          if (requestDefinition.body === undefined) {
            body = null;
          } else if (typeof requestDefinition.body === 'string') {
            body = requestDefinition.body.toString();
          } else {
            body = JSON.stringify(requestDefinition.body);
          }
          return {
            url: endpoint.absoluteEndpoint,
            method: requestDefinition.method || 'GET',
            headers: headers,
            body: body
          };
        };
        ApiContext.prototype.doRequest = function(requestDefinition) {
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
        ApiContext.prototype.mergeHeaders = function(otherHeaders) {
          var merged = this.headers;
          return __assign({}, merged, otherHeaders);
        };
        return ApiContext;
      })();
      exports.ApiContext = ApiContext;

      /***/
    },
    /* 24 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var ERROR_TYPE;
      (function(ERROR_TYPE) {
        ERROR_TYPE[(ERROR_TYPE['CLIENT'] = 0)] = 'CLIENT';
        ERROR_TYPE[(ERROR_TYPE['SERVER'] = 1)] = 'SERVER';
        ERROR_TYPE[(ERROR_TYPE['LIBRARY'] = 2)] = 'LIBRARY';
      })((ERROR_TYPE = exports.ERROR_TYPE || (exports.ERROR_TYPE = {})));

      /***/
    },
    /* 25 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      /**
 * Obtain the request driver for the given type
 */
      function getRequestDriver(type) {
        switch (type) {
          case 'BROWSER':
            return __webpack_require__(26).default;
          default:
            return __webpack_require__(33).default;
        }
      }
      exports.getRequestDriver = getRequestDriver;

      /***/
    },
    /* 26 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
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
      function formDataBody(filesInputElement) {
        var formData = new window.FormData();
        formData.append('file', filesInputElement.files[0]);
        return formData;
      }
      function buildXhr(options) {
        var xhr = new window.XMLHttpRequest();
        xhr.open(options.method, options.url);
        var headers = options.headers;
        if (headers) {
          Object.keys(headers).forEach(function(header) {
            var value = headers[header];
            xhr.setRequestHeader(header, value);
          });
        }
        var body = options.formData ? formDataBody(options.formData) : options.body;
        xhr.send(body);
        return xhr;
      }
      function default_1(options) {
        var xhr = buildXhr(options);
        var deferred = new util_1.DeferredPromise();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === READY_STATE_DONE) {
            deferred.resolve(buildServerResponse(xhr));
          }
        };
        return deferred.promise;
      }
      exports.default = default_1;

      /***/
    },
    /* 27 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      Object.defineProperty(exports, '__esModule', { value: true });
      var deferred_promise_1 = __webpack_require__(11);
      var RetryUntilTimeoutError = /** @class */ (function(_super) {
        __extends(RetryUntilTimeoutError, _super);
        function RetryUntilTimeoutError(limit) {
          var _this = _super.call(this, 'retryUntil - maximum number of tries was reached (' + limit + ')') || this;
          _this.limit = limit;
          return _this;
        }
        return RetryUntilTimeoutError;
      })(Error);
      exports.RetryUntilTimeoutError = RetryUntilTimeoutError;
      function retryUntil(promiseFn, conditionFn, limit, delay) {
        var deferred = new deferred_promise_1.DeferredPromise();
        function retry(attempt) {
          if (attempt > limit) {
            console.log('[retryUntil] - polling timeout');
            return deferred.reject(new RetryUntilTimeoutError(limit));
          }
          /* tslint:disable:no-floating-promises */
          promiseFn().then(function(result) {
            var conditionIsMet;
            try {
              conditionIsMet = conditionFn(result);
            } catch (e) {
              console.log(
                '[retryUntil] - condition quit with an exception',
                e.message || e,
                e.stack || '<no stacktrace>'
              );
              deferred.reject((e.toString && e.toString()) || e);
              return undefined;
            }
            if (conditionIsMet) {
              console.log('[retryUntil] - condition has been met');
              console.log('RESULT', result);
              deferred.resolve(result);
              return undefined;
            } else {
              // delay the next attempt if needed
              return timeoutPromise(delay || 0).then(function() {
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
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            return resolve();
          }, timeInMs);
        });
      }
      exports.timeoutPromise = timeoutPromise;

      /***/
    },
    /* 28 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
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
          keysO = keysO.filter(function(k) {
            return o[k] !== null;
          });
          keysP = keysP.filter(function(k) {
            return o[k] !== null;
          });
        }
        // remove undefined fields from both objects
        if (options.ignoreUndefinedFields) {
          keysO = keysO.filter(function(k) {
            return o[k] !== undefined;
          });
          keysP = keysP.filter(function(k) {
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
              // (s)elf reference?
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

      /***/
    },
    /* 29 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function(obj) {
              return typeof obj;
            }
          : function(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };

      Object.defineProperty(exports, '__esModule', { value: true });
      function createFlatArray(o, array) {
        Object.keys(o).map(function(key) {
          var value = o[key];
          if (value === undefined || value === null) {
            return;
          } else if (value instanceof Function) {
            throw new Error('Functions are not supported');
          } else if (value instanceof Array) {
            throw new Error('Arrays are not supported');
          } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
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

      /***/
    },
    /* 30 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var SEATERS_DEFAULT_LOCALE = 'en';
      var LocalizableText = /** @class */ (function() {
        function LocalizableText(translationMap) {
          var _this = this;
          Object.keys(translationMap).forEach(function(k) {
            return (_this[k] = translationMap[k]);
          });
        }
        /**
     * Translate the text in the given locale. Will fall back to 'en' when neither locale neither fallbackLocale are available
     * @param locale Locale to try to retrieve the translated text
     * @param fallbackLocale Fall back to a translation in this locale if preferred locale was not available
     */
        LocalizableText.prototype.localize = function(locale, fallbackLocale) {
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
      })();
      exports.LocalizableText = LocalizableText;

      /***/
    },
    /* 31 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

      Object.defineProperty(exports, '__esModule', { value: true });
      function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (Math.random() * 16) | 0;
          var v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
      exports.uuidv4 = uuidv4;

      /***/
    },
    /* 32 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      /**
 * Transforms this format "2017-07-27T17:18:33.994+0000" into "2017-07-27T17:19:38.182Z"
 * Leaves the latter format alone
 */
      function normalizeLondonTimezoneDate(date) {
        return date.replace(/\+0000$/, 'Z');
      }
      exports.normalizeLondonTimezoneDate = normalizeLondonTimezoneDate;

      /***/
    },
    /* 33 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';
      /* WEBPACK VAR INJECTION */ (function(Buffer) {
        Object.defineProperty(exports, '__esModule', { value: true });
        var util_1 = __webpack_require__(0);
        var http = __webpack_require__(
          !(function webpackMissingModule() {
            var e = new Error('Cannot find module "http"');
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          })()
        );
        var https = __webpack_require__(
          !(function webpackMissingModule() {
            var e = new Error('Cannot find module "https"');
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          })()
        );
        var url = __webpack_require__(
          !(function webpackMissingModule() {
            var e = new Error('Cannot find module "url"');
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          })()
        );
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
          var req = requestProvider.request(rawRequest, function(res) {
            var body = '';
            res.on('data', function(chunk) {
              return (body += chunk);
            });
            res.on('end', function() {
              return deferred.resolve(buildServerResponse(req, res, body));
            });
          });
          if (options.body) {
            console.log('data: %s', options.body);
            req.write(options.body);
          }
          if (options.formData) {
            writeBinaryPostData(req, options.formData);
          }
          req.end();
          return deferred.promise;
        }
        exports.default = default_1;
        function writeBinaryPostData(req, filepath) {
          var fs = __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "fs"');
              e.code = 'MODULE_NOT_FOUND';
              throw e;
            })()
          );
          var data = fs.readFileSync(filepath);
          var crlf = '\r\n';
          var boundaryKey = Math.random().toString(16);
          var boundary = '--' + boundaryKey;
          var delimeter = crlf + '--' + boundary;
          var headers = ['Content-Disposition: form-data; name="file"; filename="test.jpg"' + crlf];
          var closeDelimeter = delimeter + '--';
          var multipartBody = Buffer.concat([
            new Buffer(delimeter + crlf + headers.join('') + crlf),
            data,
            new Buffer(closeDelimeter)
          ]);
          req.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
          req.setHeader('Content-Length', multipartBody.length);
          req.write(multipartBody);
        }
        /* WEBPACK VAR INJECTION */
      }.call(
        exports,
        __webpack_require__(
          !(function webpackMissingModule() {
            var e = new Error('Cannot find module "./../../node_modules/buffer/index.js"');
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          })()
        ).Buffer
      ));

      /***/
    },
    /* 34 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var app_api_1 = __webpack_require__(12);
      var fan_api_1 = __webpack_require__(7);
      var admin_1 = __webpack_require__(37);
      var health_1 = __webpack_require__(39);
      var authentication_api_1 = __webpack_require__(17);
      var ticketing_1 = __webpack_require__(40);
      var payment_1 = __webpack_require__(42);
      var seaters_api_context_1 = __webpack_require__(6);
      var SeatersApi = /** @class */ (function() {
        function SeatersApi(prefix, requestDriver) {
          this.apiContext = new seaters_api_context_1.SeatersApiContext(prefix, requestDriver);
          this.app = new app_api_1.AppApi(this.apiContext);
          this.fan = new fan_api_1.FanApi(this.apiContext);
          this.admin = new admin_1.AdminApi(this.apiContext);
          this.health = new health_1.HealthApi(this.apiContext);
          this.authentication = new authentication_api_1.AuthenticationApi(this.apiContext);
          this.ticketing = new ticketing_1.TicketingApi(this.apiContext);
          this.payment = new payment_1.PaymentApi(this.apiContext);
        }
        return SeatersApi;
      })();
      exports.SeatersApi = SeatersApi;

      /***/
    },
    /* 35 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(36));

      /***/
    },
    /* 36 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      /**
 *  PROFILING - FAN ATTRIBUTES
 */
      var ProfilingFanAttributeStatusEnum;
      (function(ProfilingFanAttributeStatusEnum) {
        ProfilingFanAttributeStatusEnum['VALIDATED'] = 'VALIDATED';
        ProfilingFanAttributeStatusEnum['UNVALIDATED'] = 'UNVALIDATED';
      })(
        (ProfilingFanAttributeStatusEnum =
          exports.ProfilingFanAttributeStatusEnum || (exports.ProfilingFanAttributeStatusEnum = {}))
      );
      var ProfilingFanAttributeActionStatusEnum;
      (function(ProfilingFanAttributeActionStatusEnum) {
        ProfilingFanAttributeActionStatusEnum['validate'] = 'validate';
        ProfilingFanAttributeActionStatusEnum['unvalidate'] = 'unvalidate';
      })(
        (ProfilingFanAttributeActionStatusEnum =
          exports.ProfilingFanAttributeActionStatusEnum || (exports.ProfilingFanAttributeActionStatusEnum = {}))
      );
      var UserInterestStatusEnum;
      (function(UserInterestStatusEnum) {
        UserInterestStatusEnum['LIKE'] = 'LIKE';
        UserInterestStatusEnum['DISLIKE'] = 'DISLIKE';
        UserInterestStatusEnum['NEUTRAL'] = 'NEUTRAL';
        UserInterestStatusEnum['UNKNOWN'] = 'UNKNOWN';
      })((UserInterestStatusEnum = exports.UserInterestStatusEnum || (exports.UserInterestStatusEnum = {})));
      var UserInterestActionStatusEnum;
      (function(UserInterestActionStatusEnum) {
        UserInterestActionStatusEnum['like'] = 'like';
        UserInterestActionStatusEnum['dislike'] = 'dislike';
        UserInterestActionStatusEnum['neutral'] = 'neutral';
      })(
        (UserInterestActionStatusEnum =
          exports.UserInterestActionStatusEnum || (exports.UserInterestActionStatusEnum = {}))
      );
      var UserFanAttributeStatusEnum;
      (function(UserFanAttributeStatusEnum) {
        UserFanAttributeStatusEnum['UNLINKED'] = 'UNLINKED';
        UserFanAttributeStatusEnum['LINKED'] = 'LINKED';
      })(
        (UserFanAttributeStatusEnum = exports.UserFanAttributeStatusEnum || (exports.UserFanAttributeStatusEnum = {}))
      );
      var UserFanAttributeActionStatusEnum;
      (function(UserFanAttributeActionStatusEnum) {
        UserFanAttributeActionStatusEnum['link'] = 'link';
        UserFanAttributeActionStatusEnum['unlink'] = 'unlink';
        UserFanAttributeActionStatusEnum['create'] = 'link-by-name'; // create new fan attribute
      })(
        (UserFanAttributeActionStatusEnum =
          exports.UserFanAttributeActionStatusEnum || (exports.UserFanAttributeActionStatusEnum = {}))
      );

      /***/
    },
    /* 37 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(38));

      /***/
    },
    /* 38 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      /* tslint:disable:no-floating-promises */
      var seaters_api_1 = __webpack_require__(1);
      var paging_options_1 = __webpack_require__(14);
      var seaters_api_controller_1 = __webpack_require__(8);
      var AdminApi = /** @class */ (function(_super) {
        __extends(AdminApi, _super);
        function AdminApi(apiContext) {
          var _this = _super.call(this) || this;
          _this.apiContext = apiContext;
          return _this;
        }
        AdminApi.prototype.getUsers = function(page) {
          return this.apiContext.get(
            '/seaters-admin/users',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(page)
          );
        };
        AdminApi.prototype.searchUsers = function(query, page) {
          return this.apiContext.put(
            '/seaters-admin/users',
            query,
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(page)
          );
        };
        AdminApi.prototype.getUser = function(id) {
          return this.apiContext.get('/seaters-admin/users/:id', { id: id });
        };
        AdminApi.prototype.updateUser = function(user) {
          return this.apiContext.put('/seaters-admin/users/:id', user, { id: user.id });
        };
        AdminApi.prototype.deleteUser = function(id) {
          return this.apiContext.delete('/seaters-admin/users/:id', { id: id });
        };
        AdminApi.prototype.createUser = function(user) {
          return this.apiContext.post('/seaters-admin/users', user);
        };
        AdminApi.prototype.getUserOwnerships = function(userId, page) {
          return this.apiContext.get(
            '/seaters-admin/users/:id/ownerships',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(page)
          );
        };
        AdminApi.prototype.createUserOwnership = function(ownership) {
          return this.apiContext.post('/seaters-admin/users/:id/ownerships', ownership, { id: ownership.userId });
        };
        AdminApi.prototype.deleteUserOwnership = function(ownership) {
          return this.apiContext.delete('/seaters-admin/users/:userId/ownerships/:fanGroupId', {
            userId: ownership.userId,
            fanGroupId: ownership.fanGroupId
          });
        };
        AdminApi.prototype.getEvent = function(eventId) {
          return this.apiContext.get('/seaters-admin/events/:id', { id: eventId });
        };
        AdminApi.prototype.getFanGroup = function(fanGroupId) {
          return this.apiContext.get('/seaters-admin/fan-groups/:id', { id: fanGroupId });
        };
        AdminApi.prototype.getFanGroupProtectionCodes = function(fanGroupId, page) {
          return this.apiContext.get(
            '/seaters-admin/fan-groups/:id/protection-codes',
            { id: fanGroupId },
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(page)
          );
        };
        AdminApi.prototype.getFanGroupWaitingLists = function(fanGroupId, page) {
          return this.apiContext.get(
            '/seaters-admin/fan-groups/:id/waiting-lists',
            { id: fanGroupId },
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(page)
          );
        };
        AdminApi.prototype.getWaitingList = function(waitingListId) {
          return this.apiContext.get('/seaters-admin/waiting-lists/:id', { id: waitingListId });
        };
        AdminApi.prototype.updateWaitingList = function(wl) {
          return this.apiContext.put('/seaters-admin/waiting-lists/:id', wl, { id: wl.id });
        };
        AdminApi.prototype.deleteWaitingList = function(waitingListId) {
          return this.apiContext.delete('/seaters-admin/waiting-lists/:id', { id: waitingListId });
        };
        AdminApi.prototype.scheduleClosingDate = function(waitingListId, date) {
          return this.apiContext.put(
            '/fan-group-owner/waiting-lists/:waitingListId/schedule-closing',
            { date: date },
            { waitingListId: waitingListId }
          );
        };
        AdminApi.prototype.createFanGroupProtectionCode = function(fanGroupId, code, maxTimesUsed) {
          return this.apiContext.post(
            '/seaters-admin/fan-groups/:id/protection-codes',
            { code: code, maxTimesUsed: maxTimesUsed },
            { id: fanGroupId }
          );
        };
        AdminApi.prototype.deleteFanGroupProtectionCode = function(fanGroupId, code) {
          return this.apiContext.delete('/seaters-admin/fan-groups/:id/protection-codes/:code', {
            id: fanGroupId,
            code: code
          });
        };
        AdminApi.prototype.importFanGroupProtectionCodes = function(fanGroupId, fileId) {
          return this.apiContext.put('/seaters-admin/fan-groups/:id/import-protection-codes/:fileId', null, {
            id: fanGroupId,
            fileId: fileId
          });
        };
        AdminApi.prototype.requestFanGroupBackgroundImageUpload = function(fanGroupId, fileName) {
          return this.requestFanGroupImageUpload(fanGroupId, 'background-image', fileName);
        };
        AdminApi.prototype.requestFanGroupCoverImageUpload = function(fanGroupId, fileName) {
          return this.requestFanGroupImageUpload(fanGroupId, 'coverimage', fileName);
        };
        AdminApi.prototype.requestFanGroupProfileImageUpload = function(fanGroupId, fileName) {
          return this.requestFanGroupImageUpload(fanGroupId, 'profileimage', fileName);
        };
        AdminApi.prototype.requestOneTimeFileUpload = function(fileName) {
          return this.apiContext.put(
            '/seaters-admin/request-one-time-upload',
            null,
            null,
            fileName ? { fileName: fileName } : null
          );
        };
        /**
     * Upload a onetime file
     * @param oneTimeFileUrl url of a OneTimeFile returned by requestOneTimeFileUpload
     * @param data for browsers: HTMLInputElement, for node: not supported
     */
        AdminApi.prototype.uploadOneTimeFile = function(oneTimeFileUrl, data) {
          return this.apiContext.uploadOneTimeFile(oneTimeFileUrl, data);
        };
        //  PROFILING
        AdminApi.prototype.getCategories = function(options) {
          return this.apiContext.get(
            '/v2/seaters-admin/categories',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.getCategory = function(id) {
          return this.apiContext.get('/v2/seaters-admin/categories/' + id);
        };
        AdminApi.prototype.createCategory = function(category) {
          return this.apiContext.post('/v2/seaters-admin/categories', category);
        };
        AdminApi.prototype.updateCategory = function(category) {
          return this.apiContext.put('/v2/seaters-admin/categories/' + category.id, category);
        };
        AdminApi.prototype.deleteCategory = function(id) {
          return this.apiContext.delete('/v2/seaters-admin/categories/' + id);
        };
        AdminApi.prototype.orderCategories = function(orderedCategoryIds) {
          return this.apiContext.post('/v2/seaters-admin/categories/order', { categoryIds: orderedCategoryIds });
        };
        AdminApi.prototype.getInterests = function(options) {
          return this.apiContext.get(
            '/v2/seaters-admin/interests',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.getInterest = function(id) {
          return this.apiContext.get('/v2/seaters-admin/interests/' + id);
        };
        AdminApi.prototype.createInterest = function(interest) {
          return this.apiContext.post('/v2/seaters-admin/interests', interest);
        };
        AdminApi.prototype.updateInterest = function(interest) {
          return this.apiContext.put('/v2/seaters-admin/interests/' + interest.id, interest);
        };
        AdminApi.prototype.deleteInterest = function(id) {
          return this.apiContext.delete('/v2/seaters-admin/interests/' + id);
        };
        AdminApi.prototype.getFanAttributes = function(options) {
          return this.apiContext.get(
            '/v2/seaters-admin/fan-attributes',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.getFanAttribute = function(id) {
          return this.apiContext.get('/v2/seaters-admin/fan-attributes/' + id);
        };
        AdminApi.prototype.createFanAttribute = function(fanAttribute) {
          return this.apiContext.post('/v2/seaters-admin/fan-attributes', fanAttribute);
        };
        AdminApi.prototype.updateFanAttribute = function(fanAttribute) {
          return this.apiContext.put('/v2/seaters-admin/fan-attributes/' + fanAttribute.id, fanAttribute);
        };
        AdminApi.prototype.deleteFanAttribute = function(id) {
          return this.apiContext.delete('/v2/seaters-admin/fan-attributes/' + id);
        };
        AdminApi.prototype.validateFanAttribute = function(id, updatedFanAttribute) {
          return this.apiContext.post('/v2/seaters-admin/fan-attributes/' + id + '/validate', updatedFanAttribute);
        };
        AdminApi.prototype.unvalidateFanAttribute = function(id) {
          return this.apiContext.post('/v2/seaters-admin/fan-attributes/' + id + '/unvalidate');
        };
        AdminApi.prototype.addAliases = function(id, idsToConvert) {
          return this.apiContext.post('/v2/seaters-admin/fan-attributes/' + id + '/add-alias', {
            fanAttributeIds: idsToConvert
          });
        };
        // Badge
        AdminApi.prototype.getAllBadges = function(status, options) {
          return this.apiContext.get(
            'v2/seaters-admin/badges' + (status ? '?status=' + status : ''),
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.getBadge = function(badgeId) {
          return this.apiContext.get('v2/seaters-admin/badges/' + badgeId, null, null);
        };
        AdminApi.prototype.createBadge = function(badge) {
          return this.apiContext.post('v2/seaters-admin/badges', badge, null);
        };
        AdminApi.prototype.deleteBadge = function(badgeId) {
          return this.apiContext.delete('v2/seaters-admin/badges/' + badgeId, null, null);
        };
        AdminApi.prototype.updateBadge = function(badgeId, badge) {
          return this.apiContext.put('v2/seaters-admin/badges/' + badgeId, badge, null);
        };
        // Badge : FanGroup Context
        AdminApi.prototype.linkBadgeToFg = function(fanGroupId, badgeId) {
          return this.apiContext.post('v2/seaters-admin/badges/' + badgeId + '/groups/' + fanGroupId, null, null);
        };
        AdminApi.prototype.unlinkBadgeToFg = function(fanGroupId, badgeId) {
          return this.apiContext.delete('v2/seaters-admin/badges/' + badgeId + '/groups/' + fanGroupId, null, null);
        };
        AdminApi.prototype.getBadges = function(fanGroupId) {
          return this.apiContext.get('v2/seaters-admin/badges/groups/' + fanGroupId);
        };
        //BADGE : Category
        AdminApi.prototype.getBadgeCategories = function(status, options) {
          return this.apiContext.get(
            'v2/seaters-admin/badges/category' + (status ? '?status=' + status : ''),
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.createBadgeCategory = function(category) {
          return this.apiContext.post('v2/seaters-admin/badges/category/', category, null);
        };
        AdminApi.prototype.updateBadgeCategory = function(categoryId, category) {
          return this.apiContext.put('v2/seaters-admin/badges/category/' + categoryId, category, null);
        };
        AdminApi.prototype.deleteBadgeCategory = function(categoryId) {
          return this.apiContext.delete('v2/seaters-admin/badges/category/' + categoryId);
        };
        // Survey
        AdminApi.prototype.getSurvey = function(id) {
          return this.apiContext.get('/v2/seaters-admin/surveys/' + id);
        };
        AdminApi.prototype.getSurveys = function(options) {
          return this.apiContext.get(
            '/v2/seaters-admin/surveys',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.createSurvey = function(data) {
          return this.apiContext.post('/v2/seaters-admin/surveys', data);
        };
        AdminApi.prototype.updateSurvey = function(data) {
          return this.apiContext.put('/v2/seaters-admin/surveys/' + data.id, data);
        };
        // Survey : Instances
        AdminApi.prototype.getSurveyInstance = function(id) {
          return this.apiContext.get('/v2/seaters-admin/surveys/instances/' + id);
        };
        AdminApi.prototype.getSurveyInstances = function(options) {
          return this.apiContext.get(
            '/v2/seaters-admin/surveys/instances',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.createSurveyInstances = function(surveyInstance) {
          return this.apiContext.post('/v2/seaters-admin/surveys/instances', surveyInstance);
        };
        AdminApi.prototype.updateSurveyInstances = function(surveyInstance) {
          return this.apiContext.put('/v2/seaters-admin/surveys/instances/' + surveyInstance.id, surveyInstance);
        };
        // Survey : Answer Semantic
        AdminApi.prototype.getAnswerSemantic = function(id) {
          return this.apiContext.get('/v2/seaters-admin/surveys/answer-semantics/' + id);
        };
        AdminApi.prototype.getAnswerSemantics = function(options) {
          return this.apiContext.get(
            '/v2/seaters-admin/surveys/answer-semantics',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.createAnswerSemantic = function(answerSemantic) {
          return this.apiContext.post('/v2/seaters-admin/surveys/answer-semantics', answerSemantic);
        };
        AdminApi.prototype.updateAnswerSemantic = function(answerSemantic) {
          return this.apiContext.put('/v2/seaters-admin/surveys/answer-semantics/' + answerSemantic.id, answerSemantic);
        };
        // Survey : Questions
        AdminApi.prototype.getQuestion = function(id) {
          return this.apiContext.get('/v2/seaters-admin/surveys/questions/' + id);
        };
        AdminApi.prototype.getQuestions = function(options) {
          return this.apiContext.get(
            '/v2/seaters-admin/surveys/questions',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(options)
          );
        };
        AdminApi.prototype.createQuestion = function(question) {
          return this.apiContext.post('/v2/seaters-admin/surveys/questions', question);
        };
        AdminApi.prototype.updateQuestion = function(question) {
          return this.apiContext.put('/v2/seaters-admin/surveys/questions/' + question.id, question);
        };
        // Added for WL / Event creation bulk update
        AdminApi.prototype.getVenueConfig = function(venueId) {
          return this.apiContext.get(
            '/seaters-admin/venues/:id/configs/',
            { id: venueId },
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(new paging_options_1.PagingOptions(0))
          );
        };
        AdminApi.prototype.createEvent = function(event) {
          return this.apiContext.post('/fan-group-owner/events', event);
        };
        AdminApi.prototype.deleteEvent = function(eventId) {
          return this.apiContext.delete('/seaters-admin/events/:id', { id: eventId });
        };
        AdminApi.prototype.updatEvent = function(event, eventId) {
          return this.apiContext.put('/seaters-admin/events/:id', __assign({}, event), { id: eventId });
        };
        AdminApi.prototype.createVenue = function(venue) {
          return this.apiContext.post('/fan-group-owner/venues', venue);
        };
        AdminApi.prototype.createWishlist = function(groupId, wl) {
          return this.apiContext.post('/fan-group-owner/groups/' + groupId + '/waiting-lists', wl);
        };
        AdminApi.prototype.openWishlist = function(wishlistId) {
          return this.apiContext.put('/fan-group-owner/waiting-lists/' + wishlistId + '/open/');
        };
        AdminApi.prototype.getWaitingListFull = function(waitingListId) {
          return this.apiContext.get('/seaters-admin/waiting-lists/:id', { id: waitingListId });
        };
        AdminApi.prototype.updateWaitingListFull = function(wl) {
          return this.apiContext.put('/seaters-admin/waiting-lists/:id', wl, { id: wl.id });
        };
        AdminApi.prototype.requestEventImageUpload = function(fanGroupId, fileName) {
          return this.apiContext.put(
            '/seaters-admin/events/:id/image',
            null,
            { id: fanGroupId },
            { fileName: fileName }
          );
        };
        AdminApi.prototype.requestVoucherImageUpload = function(waitingListId, fileId) {
          return this.apiContext.put(
            '/v2/fan-group-owner/waiting-lists/:id/image',
            null,
            { id: waitingListId },
            { fileId: fileId }
          );
        };
        // SIGNALS
        AdminApi.prototype.replaySignal = function(bus, id) {
          return this.apiContext.put('/seaters-admin/signals/:bus/:id/replay', null, { bus: bus, id: id });
        };
        /**
     * HELPERS
     */
        AdminApi.prototype.requestFanGroupImageUpload = function(fanGroupId, endpoint, fileName) {
          return this.apiContext.put(
            '/seaters-admin/fan-groups/:id/' + endpoint,
            null,
            { id: fanGroupId },
            { fileName: fileName }
          );
        };
        return AdminApi;
      })(seaters_api_controller_1.SeatersApiController);
      exports.AdminApi = AdminApi;
      /* tslint:enable:no-floating-promises */

      /***/
    },
    /* 39 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(15));
      __export(__webpack_require__(16));

      /***/
    },
    /* 40 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(41));

      /***/
    },
    /* 41 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      Object.defineProperty(exports, '__esModule', { value: true });
      /* tslint:disable:no-floating-promises */
      var seaters_api_1 = __webpack_require__(1);
      var seaters_api_controller_1 = __webpack_require__(8);
      var TicketingApi = /** @class */ (function(_super) {
        __extends(TicketingApi, _super);
        function TicketingApi(apiContext) {
          var _this = _super.call(this) || this;
          _this.apiContext = apiContext;
          return _this;
        }
        TicketingApi.prototype.getTicketingSystems = function(page) {
          return this.apiContext.get(
            '/ticketing/systems',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(page)
          );
        };
        TicketingApi.prototype.getTicketingSystem = function(ticketingSystemId) {
          return this.apiContext.get('/ticketing/systems/:id', { id: ticketingSystemId });
        };
        return TicketingApi;
      })(seaters_api_controller_1.SeatersApiController);
      exports.TicketingApi = TicketingApi;
      /* tslint:enable:no-floating-promises */

      /***/
    },
    /* 42 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(43));

      /***/
    },
    /* 43 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      /* tslint:disable:no-floating-promises */
      var seaters_api_1 = __webpack_require__(1);
      var seaters_api_controller_1 = __webpack_require__(8);
      var PaymentApi = /** @class */ (function(_super) {
        __extends(PaymentApi, _super);
        function PaymentApi(apiContext) {
          var _this = _super.call(this) || this;
          _this.apiContext = apiContext;
          return _this;
        }
        PaymentApi.prototype.getPaymentSystems = function(page) {
          return this.apiContext.get(
            '/seaters-admin/payment-systems',
            null,
            seaters_api_1.SeatersApiContext.buildPagingQueryParams(page)
          );
        };
        PaymentApi.prototype.getPaymentSystem = function(paymentSystemId) {
          return this.apiContext.get('/seaters-admin/payment-systems/:id', { id: paymentSystemId });
        };
        PaymentApi.prototype.createPaymentSystem = function(payload) {
          return this.apiContext.post('/seaters-admin/payment-systems', payload);
        };
        PaymentApi.prototype.updatePaymentSystem = function(paymentSystemId, payload) {
          return this.apiContext.put('/seaters-admin/payment-systems/:id', __assign({}, payload), {
            id: paymentSystemId
          });
        };
        PaymentApi.prototype.deletePaymentSystem = function(paymentSystemId) {
          return this.apiContext.delete('/seaters-admin/payment-systems/:id', { id: paymentSystemId });
        };
        return PaymentApi;
      })(seaters_api_controller_1.SeatersApiController);
      exports.PaymentApi = PaymentApi;
      /* tslint:enable:no-floating-promises */

      /***/
    },
    /* 44 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function(obj) {
              return typeof obj;
            }
          : function(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };

      Object.defineProperty(exports, '__esModule', { value: true });
      /**
 * Map Seaters API V1 exceptions to a usuable format
 *
 * @param mapping A mapping of V1 error messages to values of the given type
 * @return Returns an Promise that rejects with the mapped error
 */
      function seatersExceptionV1MessageMapper(mapping) {
        return function(err) {
          if ((typeof err === 'undefined' ? 'undefined' : _typeof(err)) !== 'object') {
            console.error('[seatersExceptionV1MessageMapper] Uncaught Exception', err);
            throw err;
          } else if (err.type !== 'validation_error_v1') {
            console.error('[seatersExceptionV1MessageMapper] invoked with non-v1 exception', err);
            return Promise.reject(err);
          } else if (!mapping.hasOwnProperty(err.message)) {
            console.error('[seatersExceptionV1MessageMapper] unmapped v1 error: %s', err.message, err);
            return Promise.reject(err);
          } else {
            return Promise.reject(mapping[err.message]);
          }
        };
      }
      exports.seatersExceptionV1MessageMapper = seatersExceptionV1MessageMapper;

      /***/
    },
    /* 45 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var SeatersExceptionV3;
      (function(SeatersExceptionV3) {
        function stringifyError(e) {
          return '[' + e.references.join(',') + '] ' + e.error.errorCode + ': ' + e.error.errorDescription;
        }
        /**
     * Map Seaters API V3 exceptions to a consistent format. This is the error view designed by Daniel Di Luca
     *
     * @param mapping A mapping of V3 error messages to values of the given type
     * @return Returns an Promise that rejects with the mapped error
     */
        function seatersExceptionV3Mapper(res) {
          try {
            var error = JSON.parse(res.body);
            if (
              error.errors.detectedErrorTypes.filter(function(e) {
                return e !== 'validation_errors';
              }).length > 0
            ) {
              console.error('[SeatersExceptionV3] input error contains unsupported error type');
              throw error;
            }
            var message =
              error.errors.errorsTypes.validation_errors
                .map(function(e) {
                  return stringifyError(e);
                })
                .join('\n') || JSON.stringify(error);
            var errors = error.errors.errorsTypes.validation_errors.map(function(e) {
              return {
                _rawResponse: e,
                defaultMessage: stringifyError(e),
                errorCode: e.error.errorCode,
                references: e.references
              };
            });
            return {
              uuid: error.uuid,
              type: 'validation_error',
              message: message,
              errors: errors
            };
          } catch (e) {
            console.error('[SeatersExceptionV3] unable to map seaters exception v3', e);
            // throw the original error, to give some traceability
            throw res;
          }
        }
        SeatersExceptionV3.seatersExceptionV3Mapper = seatersExceptionV3Mapper;
      })((SeatersExceptionV3 = exports.SeatersExceptionV3 || (exports.SeatersExceptionV3 = {})));

      /***/
    },
    /* 46 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(47));
      __export(__webpack_require__(52));
      __export(__webpack_require__(61));
      __export(__webpack_require__(63));
      __export(__webpack_require__(65));
      __export(__webpack_require__(68));
      __export(__webpack_require__(70));
      __export(__webpack_require__(0));

      /***/
    },
    /* 47 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(48));
      __export(__webpack_require__(2));
      __export(__webpack_require__(4));
      __export(__webpack_require__(18));
      __export(__webpack_require__(19));

      /***/
    },
    /* 48 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var common_1 = __webpack_require__(3);
      var waiting_list_service_1 = __webpack_require__(18);
      var fan_group_service_1 = __webpack_require__(19);
      var util_1 = __webpack_require__(0);
      var fan_profiling_service_1 = __webpack_require__(50);
      var fan_survey_service_1 = __webpack_require__(51);
      var FanService = /** @class */ (function(_super) {
        __extends(FanService, _super);
        function FanService(seatersApi, sessionService, publicService) {
          var _this = _super.call(this, seatersApi) || this;
          _this.sessionService = sessionService;
          _this.publicService = publicService;
          _this.waitingListService = new waiting_list_service_1.WaitingListService(seatersApi);
          _this.fanGroupService = new fan_group_service_1.FanGroupService(seatersApi);
          _this.fanProfilingService = new fan_profiling_service_1.FanProfilingService(seatersApi);
          _this.fanSurveyService = new fan_survey_service_1.FanSurveyService(seatersApi);
          return _this;
        }
        /**
     *  FAN GROUPS
     */
        FanService.prototype.getFanGroups = function(fanGroupIds) {
          return this.fanGroupService.getFanGroups(fanGroupIds);
        };
        FanService.prototype.getFanGroup = function(fanGroupId) {
          return this.fanGroupService.getFanGroup(fanGroupId);
        };
        FanService.prototype.getFanGroupBySlug = function(slug) {
          return this.fanGroupService.getFanGroupBySlug(slug);
        };
        FanService.prototype.getFanGroupLookBySlug = function(slug) {
          return this.fanGroupService.getFanGroupLookBySlug(slug);
        };
        FanService.prototype.getOwnedFanGroups = function(pagingOptions) {
          return this.seatersApi.fan.getOwnedFanGroups(pagingOptions);
        };
        FanService.prototype.getFanGroupTranslatedDescription = function(fanGroupId) {
          return this.fanGroupService.getFanGroupTranslatedDescription(fanGroupId);
        };
        FanService.prototype.joinFanGroup = function(fanGroupId) {
          return this.fanGroupService.joinFanGroup(fanGroupId);
        };
        FanService.prototype.joinProtectedFanGroup = function(fanGroupId, code) {
          return this.fanGroupService.joinProtectedFanGroup(fanGroupId, code);
        };
        FanService.prototype.requestToJoinPrivateFanGroup = function(fanGroupId) {
          return this.fanGroupService.requestToJoinPrivateFanGroup(fanGroupId);
        };
        FanService.prototype.leaveFanGroup = function(fanGroupId) {
          return this.fanGroupService.leaveFanGroup(fanGroupId);
        };
        FanService.prototype.shareFanGroup = function(fanGroupId) {
          return this.fanGroupService.shareFanGroup(fanGroupId);
        };
        FanService.prototype.hasGeoFilteredWaitingLists = function(fanGroupId) {
          return this.fanGroupService.hasGeoFilteredWaitingLists(fanGroupId);
        };
        FanService.prototype.getJoinedFanGroups = function(pagingOptions) {
          var _this = this;
          return this.fanGroupService.joinedFanGroups(pagingOptions).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        FanService.prototype.requestOneTimeFileUpload = function(fileName) {
          return this.seatersApi.fan.requestOneTimeFileUpload(fileName);
        };
        FanService.prototype.uploadOneTimeFile = function(oneTimeFileUrl, data) {
          return this.seatersApi.fan.uploadOneTimeFile(oneTimeFileUrl, data);
        };
        FanService.prototype.updateWlImage = function(waitingListId, fileId) {
          return this.seatersApi.fan.updateWlImage(waitingListId, fileId);
        };
        FanService.prototype.waitinglistAvailableSeats = function(waitingListId) {
          return this.seatersApi.fan.waitinglistAvailableSeats(waitingListId);
        };
        FanService.prototype.waitinglistParkingAvailableSeats = function(waitingListId) {
          return this.seatersApi.fan.waitinglistParkingAvailableSeats(waitingListId);
        };
        FanService.prototype.waitingListTotalDemand = function(waitingListId) {
          return this.seatersApi.fan.waitingListTotalDemand(waitingListId);
        };
        FanService.prototype.assignWaitingListSeatToFan = function(waitingListId, fanId) {
          return this.seatersApi.fan.assignWaitingListSeatToFan(waitingListId, fanId);
        };
        FanService.prototype.assignWaitingListParkingSeatToFan = function(waitingListId, fanId) {
          return this.seatersApi.fan.assignWaitingListParkingSeatToFan(waitingListId, fanId);
        };
        FanService.prototype.assignWithoutSeats = function(waitingListId, fanId) {
          return this.seatersApi.fan.assignWithoutSeats(waitingListId, fanId);
        };
        FanService.prototype.declineFanPosition = function(waitingListId, fanId) {
          return this.seatersApi.fan.declineFanPosition(waitingListId, fanId);
        };
        FanService.prototype.removeFanFromWaitingList = function(waitingListId, fanId) {
          return this.seatersApi.fan.removeFanFromWaitingList(waitingListId, fanId);
        };
        FanService.prototype.searchMember = function(fanGroupId, query, pagingOptions) {
          return this.seatersApi.fan.searchMember(fanGroupId, query, pagingOptions);
        };
        FanService.prototype.getFanInfo = function(fanId) {
          return this.seatersApi.fan.getFanInfo(fanId);
        };
        FanService.prototype.getFanAttribute = function(fanId) {
          return this.seatersApi.fan.getFanAttribute(fanId);
        };
        FanService.prototype.getFanInterests = function(fanId) {
          return this.seatersApi.fan.getFanInterests(fanId);
        };
        FanService.prototype.getFanActivities = function(fanId, fanGroupId) {
          return this.seatersApi.fan.getFanActivities(fanId, fanGroupId);
        };
        FanService.prototype.addPosition = function(waitingListId, fanId, params) {
          return this.seatersApi.fan.addPosition(waitingListId, fanId, params);
        };
        FanService.prototype.getExiredPositions = function(waitingListId, query) {
          return this.seatersApi.fan.getExiredPositions(waitingListId, query);
        };
        FanService.prototype.waitinglistFinishedDistributing = function(waitingListId, nextDistributionNumber) {
          return this.seatersApi.fan.waitinglistFinishedDistributing(waitingListId, nextDistributionNumber);
        };
        /**
     *  WAITING LISTS
     */
        FanService.prototype.getWaitingList = function(waitingListId) {
          return this.waitingListService.getWaitingList(waitingListId);
        };
        FanService.prototype.getWaitingLists = function(waitingListIds) {
          return this.waitingListService.getWaitingLists(waitingListIds);
        };
        FanService.prototype.getWaitingListsInFanGroup = function(fanGroupId, pagingOptions, keyWords) {
          var _this = this;
          return this.waitingListService
            .getWaitingListsInFanGroup(fanGroupId, pagingOptions, keyWords)
            .then(function(r) {
              return _this.convertPagedResult(r);
            });
        };
        FanService.prototype.getWaitingListsInFanGroupByKeywords = function(fanGroupId, pagingOptions, keyWords) {
          var _this = this;
          return this.waitingListService
            .getWaitingListsInFanGroupByKeywords(fanGroupId, pagingOptions, keyWords)
            .then(function(r) {
              return _this.convertPagedResult(r);
            });
        };
        FanService.prototype.getWaitingListsInFanGroups = function(fanGroupIds, pagingOptions, keyWords) {
          var _this = this;
          return this.waitingListService
            .getWaitingListsInFanGroups(fanGroupIds, pagingOptions, keyWords)
            .then(function(r) {
              return _this.convertPagedResult(r);
            });
        };
        FanService.prototype.getMyWaitingListsWithoutSeat = function(page) {
          var _this = this;
          return this.waitingListService.getMyWaitingListsWithoutSeat(page).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        FanService.prototype.getMyWaitingListsWithSeat = function(page) {
          var _this = this;
          return this.waitingListService.getMyWaitingListsWithSeat(page).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        //TODO: cleanup duplicate method (see getTranslatedVenueConditionsForWaitingList)
        FanService.prototype.getWaitingListTranslatedVenueDescription = function(waitingListId) {
          return this.waitingListService.getWaitingListTranslatedVenueDescription(waitingListId);
        };
        FanService.prototype.getPositionBraintreePaymentInfo = function(waitingListId) {
          return this.waitingListService.getPositionBraintreePaymentInfo(waitingListId);
        };
        FanService.prototype.getPositionSeatersPaymentInfo = function(waitingListId) {
          return this.waitingListService.getPositionSeatersPaymentInfo(waitingListId);
        };
        FanService.prototype.getPositionPaynlPaymentInfo = function(waitingListId) {
          return this.waitingListService.getPositionPaynlPaymentInfo(waitingListId);
        };
        FanService.prototype.joinWaitingList = function(
          waitingListId,
          numberOfSeats,
          selectedSeats,
          additionalQueryParams
        ) {
          return this.waitingListService.joinWaitingList(
            waitingListId,
            numberOfSeats,
            selectedSeats,
            __assign({}, additionalQueryParams)
          );
        };
        FanService.prototype.joinProtectedWaitingList = function(
          waitingListId,
          code,
          numberOfSeats,
          additionalQueryParams
        ) {
          return this.waitingListService.joinProtectedWaitingList(
            waitingListId,
            code,
            numberOfSeats,
            __assign({}, additionalQueryParams)
          );
        };
        FanService.prototype.shareWaitingList = function(waitingListId) {
          return this.waitingListService.shareWaitingList(waitingListId);
        };
        FanService.prototype.leaveWaitingList = function(waitingListId) {
          return this.waitingListService.leaveWaitingList(waitingListId);
        };
        FanService.prototype.getPositionPaymentInfo = function(waitingListId) {
          return this.waitingListService.getPositionPaymentInfo(waitingListId);
        };
        FanService.prototype.payPosition = function(waitingListId, transaction) {
          return this.waitingListService.payPosition(waitingListId, transaction);
        };
        FanService.prototype.sendPendingPayment = function(waitingListId, transaction) {
          return this.waitingListService.sendPendingPayment(waitingListId, transaction);
        };
        FanService.prototype.checkIfGoLive = function(waitingListId) {
          return this.waitingListService.checkIfGoLive(waitingListId);
        };
        FanService.prototype.deleteSalesTransaction = function(waitingListId) {
          return this.waitingListService.deleteSalesTransaction(waitingListId);
        };
        FanService.prototype.getSalesTransaction = function(waitingListId) {
          return this.waitingListService.getSalesTransaction(waitingListId);
        };
        FanService.prototype.sendPayCallback = function(reference) {
          return this.waitingListService.sendPayCallback(reference);
        };
        FanService.prototype.preauthorizePosition = function(waitingListId, transaction) {
          return this.waitingListService.preauthorizePosition(waitingListId, transaction);
        };
        /**
     * Submit attendee information. This will validate the submitted information. The returned promise will be
     * resolved once the user can continue with the next step after submitting attendee information
     * @param waitingListId WL for which attendee info needs to be validated and stored
     * @param attendeesInfo The actual attendee information
     * @throws SeatersApiException of type 'validation_error'
     */
        FanService.prototype.saveAttendeesInfo = function(waitingListId, attendeesInfo) {
          return this.waitingListService.saveAttendeesInfo(waitingListId, attendeesInfo);
        };
        FanService.prototype.acceptSeats = function(waitingListId, formatUsed) {
          return this.waitingListService.acceptSeats(waitingListId, formatUsed);
        };
        FanService.prototype.rejectSeats = function(waitingListId) {
          return this.waitingListService.rejectSeats(waitingListId);
        };
        FanService.prototype.exportSeats = function(waitingListId, formatUsed) {
          return this.waitingListService.exportSeats(waitingListId, formatUsed);
        };
        FanService.prototype.sendExportedSeats = function(waitingListId) {
          return this.seatersApi.fan.sendExportedSeats(waitingListId);
        };
        FanService.prototype.getEventDescriptionForWaitingList = function(waitingListId) {
          return this.waitingListService
            .getEventDescriptionForWaitingList(waitingListId)
            .then(function(translationMap) {
              return new util_1.LocalizableText(translationMap);
            });
        };
        FanService.prototype.searchEvent = function(eventName, date, pagingOptions) {
          return this.seatersApi.fan.searchEvent(eventName, date, pagingOptions);
        };
        FanService.prototype.searchVenues = function(venueName, pagingOptions) {
          return this.seatersApi.fan.searchVenues(venueName, pagingOptions);
        };
        FanService.prototype.getTranslatedEventDescriptionForWaitingList = function(waitingListId) {
          return this.waitingListService.getTranslatedEventDescriptionForWaitingList(waitingListId);
        };
        FanService.prototype.getVenueConditionsForWaitingList = function(waitingListId) {
          return this.waitingListService.getVenueConditionsForWaitingList(waitingListId).then(function(translationMap) {
            return new util_1.LocalizableText(translationMap);
          });
        };
        FanService.prototype.getTranslatedVenueConditionsForWaitingList = function(waitingListId) {
          return this.waitingListService.getTranslatedVenueConditionsForWaitingList(waitingListId);
        };
        FanService.prototype.positionBraintreeToken = function(waitingListId) {
          return this.waitingListService.positionBraintreeToken(waitingListId);
        };
        FanService.prototype.getWaitingListPrice = function(waitingListId, numberOfSeats) {
          return this.waitingListService.getWaitingListPrice(waitingListId, numberOfSeats);
        };
        FanService.prototype.createWaitingList = function(fanGroupId, waitingList) {
          return this.seatersApi.fan.createWaitingList(fanGroupId, waitingList);
        };
        /**
     * FANS
     */
        /**
     * Get current logged in fan
     * @returns {fan.Fan}
     */
        FanService.prototype.fan = function() {
          return this.seatersApi.fan.fan();
        };
        /**
     * Send a new SMS containing the code needed to validate email / phone.
     * @param phone
     * @returns {any}
     */
        FanService.prototype.sendValidationCodeViaSMS = function(phone) {
          return this.seatersApi.apiContext.put('/fan/mobile-phone-number', phone);
        };
        /**
     *  COMBINATIONS
     */
        FanService.prototype.updateFan = function(f) {
          var _this = this;
          return this.seatersApi.fan.updateFan(f).then(function(updatedFan) {
            return _this.sessionService.updateCurrentFan(updatedFan);
          });
        };
        FanService.prototype.updatePassword = function(data) {
          var _this = this;
          return this.seatersApi.fan.updatePassword(data).then(function(updatedFan) {
            return _this.sessionService.updateCurrentFan(updatedFan);
          });
        };
        FanService.prototype.updateEmail = function(data) {
          var _this = this;
          return this.seatersApi.fan.updateEmail(data).then(function(updatedFan) {
            return _this.sessionService.updateCurrentFan(updatedFan);
          });
        };
        FanService.prototype.updateMobilePhoneNumber = function(data) {
          var _this = this;
          return this.seatersApi.fan.updateMobilePhoneNumber(data).then(function(updatedFan) {
            return _this.sessionService.updateCurrentFan(updatedFan);
          });
        };
        FanService.prototype.getWaitingListsByKeywords = function(keywords, page) {
          var _this = this;
          return this.publicService.getWaitingListsByKeywords(keywords, page).then(function(pagedPublicWls) {
            var waitingListIds = pagedPublicWls.items.map(function(wl) {
              return wl.waitingListId;
            });
            return _this.getWaitingLists(waitingListIds).then(function(wls) {
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
        // Profiling (public)
        FanService.prototype.getProfilingCategories = function(pagingOptions) {
          return this.fanProfilingService.getProfilingCategories(pagingOptions).then(this.convertPagedSortedResult);
        };
        FanService.prototype.getProfilingCategoryById = function(categoryId) {
          return this.fanProfilingService.getProfilingCategoryById(categoryId);
        };
        FanService.prototype.seachFanAttributes = function(query, validated) {
          return this.fanProfilingService.seachFanAttributes(query, validated);
        };
        FanService.prototype.getProfilingFanAttributeById = function(fanAttributeId) {
          return this.fanProfilingService.getProfilingFanAttributeById(fanAttributeId);
        };
        // User (fan)
        FanService.prototype.getUserInterests = function(pagingOptions) {
          return this.fanProfilingService.getUserInterests(pagingOptions).then(this.convertPagedSortedResult);
        };
        FanService.prototype.updateUserInterest = function(userInterestUpdateDTO) {
          return this.fanProfilingService.updateUserInterest(userInterestUpdateDTO);
        };
        FanService.prototype.getUserFanAttributes = function(pagingOptions) {
          return this.fanProfilingService.getUserFanAttributes(pagingOptions).then(this.convertPagedSortedResult);
        };
        FanService.prototype.updateUserFanAttribute = function(options) {
          return this.fanProfilingService.updateUserFanAttribute(options);
        };
        FanService.prototype.getWaitingListCategories = function(pagingOptions) {
          return this.waitingListService.getWaitingListCategories(pagingOptions).then(this.convertPagedSortedResult);
        };
        FanService.prototype.getWaitingListInterests = function(waitingListId) {
          return this.waitingListService.getWaitingListInterests(waitingListId).then(this.convertPagedSortedResult);
        };
        FanService.prototype.getWaitingListFanAttributes = function(waitingListId, pagingOptions) {
          return this.waitingListService
            .getWaitingListFanAttributes(waitingListId, pagingOptions)
            .then(this.convertPagedSortedResult);
        };
        FanService.prototype.linkWaitingListInterest = function(waitingListId, interestId) {
          return this.waitingListService.linkWaitingListInterest(waitingListId, interestId);
        };
        FanService.prototype.linkWaitingListFanAttribute = function(waitingListId, fanAttributeId) {
          return this.waitingListService.linkWaitingListFanAttribute(waitingListId, fanAttributeId);
        };
        FanService.prototype.unlinkWaitingListInterest = function(waitingListId, interestId) {
          return this.waitingListService.unlinkWaitingListInterest(waitingListId, interestId);
        };
        FanService.prototype.unlinkWaitingListFanAttribute = function(waitingListId, fanAttributeId) {
          return this.waitingListService.unlinkWaitingListFanAttribute(waitingListId, fanAttributeId);
        };
        // BADGE : FAN
        FanService.prototype.getBadges = function(fanGroupId, pagingOptions) {
          return this.seatersApi.fan.getBadges(fanGroupId, pagingOptions);
        };
        FanService.prototype.isBadgeProtected = function(fanGroupId, waitingListId) {
          return this.seatersApi.fan.getBadgeProtection(waitingListId).then(function(response) {
            return response.state === 'RESTRICTED';
          });
        };
        FanService.prototype.getBadgesProtection = function(fanGroupId, waitingListId) {
          return this.seatersApi.fan.getBadgeProtection(waitingListId);
        };
        // BADGE : FAN GROUP OWNER
        FanService.prototype.getUserBadges = function(fanGroupId, userId, pagingOptions) {
          return this.seatersApi.fan.getUserBadges(fanGroupId, userId, pagingOptions);
        };
        FanService.prototype.getFanGroupBadges = function(fanGroupId, pagingOptions) {
          return this.seatersApi.fan.getFanGroupBadges(fanGroupId, pagingOptions);
        };
        FanService.prototype.grantBadge = function(fanGroupId, badgeGrantOptions) {
          return this.seatersApi.fan.grantBadge(fanGroupId, badgeGrantOptions);
        };
        FanService.prototype.revokeBadge = function(fanGroupId, badgeGrantOptions) {
          return this.seatersApi.fan.revokeBadge(fanGroupId, badgeGrantOptions);
        };
        FanService.prototype.linkBadgeToWl = function(waitingListId, badgeGrantOptions) {
          return this.seatersApi.fan.linkBadgeToWl(waitingListId, badgeGrantOptions);
        };
        FanService.prototype.unlinkBadgeToWl = function(waitingListId, linkId) {
          return this.seatersApi.fan.unlinkBadgeToWl(waitingListId, linkId);
        };
        FanService.prototype.relinkBadgeToWl = function(waitingListId, linkId) {
          return this.seatersApi.fan.relinkBadgeToWl(waitingListId, linkId);
        };
        FanService.prototype.getWLBadges = function(waitingListId, pagingOptions) {
          return this.seatersApi.fan.getWLBadges(waitingListId, pagingOptions);
        };
        FanService.prototype.updateWaitingList = function(waitingList) {
          return this.seatersApi.fan.updateWaitingList(waitingList);
        };
        FanService.prototype.draftWaitingList = function(waitingListId) {
          return this.seatersApi.fan.draftWaitingList(waitingListId);
        };
        FanService.prototype.openWaitingList = function(waitingListId) {
          return this.seatersApi.fan.openWaitingList(waitingListId);
        };
        FanService.prototype.scheduleWaitingList = function(waitingListId, date) {
          return this.seatersApi.fan.scheduleWaitingList(waitingListId, date);
        };
        FanService.prototype.closeWaitingList = function(waitingListId) {
          return this.seatersApi.fan.closeWaitingList(waitingListId);
        };
        FanService.prototype.publishWaitingList = function(waitingListId) {
          return this.seatersApi.fan.publishWaitingList(waitingListId);
        };
        FanService.prototype.addWaitingListTickets = function(waitingListId, totalTickets, ticketsToAdd) {
          return this.seatersApi.fan.addWaitingListTickets(waitingListId, totalTickets, ticketsToAdd);
        };
        FanService.prototype.getPositions = function(waitingListId, query, pagingOptions) {
          return this.seatersApi.fan.getPositions(waitingListId, query, pagingOptions);
        };
        FanService.prototype.getSeats = function(waitingListId, query, pagingOptions) {
          return this.seatersApi.fan.getSeats(waitingListId, query, pagingOptions);
        };
        // Survey : FAN
        FanService.prototype.getSurveys = function(waitingListId, extensionPoint, fanGroupId) {
          return this.fanSurveyService
            .getSurvey(waitingListId, extensionPoint, fanGroupId)
            .then(this.convertPagedSortedResult);
        };
        FanService.prototype.getAnswers = function(surveyId) {
          return this.fanSurveyService.getAnswers(surveyId).then(this.convertPagedSortedResult);
        };
        FanService.prototype.submitAnswers = function(surveyId, answers) {
          return this.fanSurveyService.submitAnswers(surveyId, answers);
        };
        FanService.prototype.getChoices = function(questionId, pagingOptions) {
          return this.fanSurveyService.getChoices(questionId, pagingOptions);
        };
        FanService.prototype.addChoices = function(questionId, choices) {
          return this.seatersApi.fan.addChoices(questionId, choices);
        };
        FanService.prototype.getChoicesAsFO = function(questionId, pagingOptions) {
          if (pagingOptions === void 0) {
            pagingOptions = { itemOffset: 0, maxPageSize: 200000 };
          }
          return this.seatersApi.fan.getChoices(questionId, pagingOptions);
        };
        // Survey : FGO
        FanService.prototype.getWaitingListSurveys = function(waitingListId, extensionPoint) {
          return this.fanSurveyService
            .getWaitingListSurveys(waitingListId, extensionPoint)
            .then(this.convertPagedSortedResult);
        };
        FanService.prototype.getUserAnswers = function(waitingListId, surveyId, userId) {
          return this.fanSurveyService
            .getUserAnswers(waitingListId, surveyId, userId)
            .then(this.convertPagedSortedResult);
        };
        FanService.prototype.loadAdditionalCharges = function(waitingListId) {
          return this.waitingListService.loadAdditionalCharges(waitingListId);
        };
        FanService.prototype.getWaitingListsAsFGO = function(fanGroupId, searchOptions, pagingOptions) {
          return this.seatersApi.fan.getWaitingListsAsFGO(fanGroupId, searchOptions, pagingOptions);
        };
        FanService.prototype.getWaitingListAsFGO = function(waitingListId) {
          return this.seatersApi.fan.getWaitingListAsFGO(waitingListId);
        };
        FanService.prototype.getAdditionalInfos = function(waitingListId) {
          return this.seatersApi.fan.getAdditionalInfos(waitingListId);
        };
        FanService.prototype.getAvailableSeats = function(waitingListId) {
          return this.seatersApi.fan.getAvailableSeats(waitingListId);
        };
        FanService.prototype.addProperties = function(waitingListId, properties) {
          return this.seatersApi.fan.addProperties(waitingListId, properties);
        };
        FanService.prototype.getSeatingMap = function(waitingListId) {
          return this.seatersApi.fan.getSeatingMap(waitingListId);
        };
        FanService.prototype.getPickedSeats = function(waitingListId) {
          return this.seatersApi.fan.getPickedSeats(waitingListId);
        };
        FanService.prototype.getBasicConnectedAppToken = function() {
          return this.seatersApi.fan.getBasicConnectedAppToken();
        };
        return FanService;
      })(common_1.SeatersService);
      exports.FanService = FanService;

      /***/
    },
    /* 49 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var SeatersService = /** @class */ (function() {
        function SeatersService(seatersApi) {
          this.seatersApi = seatersApi;
        }
        SeatersService.prototype.convertPagedResult = function(result) {
          return {
            items: result.items,
            itemOffset: result.itemOffset,
            maxPageSize: result.maxPageSize,
            page: Math.round(result.itemOffset / result.maxPageSize),
            totalSize: result.totalSize
          };
        };
        SeatersService.prototype.convertPagedSortedResult = function(result) {
          return {
            items: result.content,
            itemOffset: result.number,
            maxPageSize: result.size,
            page: result.number,
            totalSize: result.totalElements
          };
        };
        return SeatersService;
      })();
      exports.SeatersService = SeatersService;

      /***/
    },
    /* 50 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var profiling_types_1 = __webpack_require__(4);
      var FanProfilingService = /** @class */ (function() {
        function FanProfilingService(seatersApi) {
          this.seatersApi = seatersApi;
        }
        // Profiling (public)
        FanProfilingService.prototype.getProfilingCategories = function(pagingOptions) {
          return this.seatersApi.fan.getProfilingCategories(pagingOptions);
        };
        FanProfilingService.prototype.getProfilingCategoryById = function(categoryId) {
          return this.seatersApi.fan.getProfilingCategoryById(categoryId);
        };
        FanProfilingService.prototype.seachFanAttributes = function(query, validated) {
          return this.seatersApi.fan.seachFanAttributes(query, validated);
        };
        FanProfilingService.prototype.getProfilingFanAttributeById = function(fanAttributeId) {
          return this.seatersApi.fan.getProfilingFanAttributeById(fanAttributeId);
        };
        // User (fan)
        FanProfilingService.prototype.getUserInterests = function(pagingOptions) {
          return this.seatersApi.fan.getUserInterests(pagingOptions);
        };
        FanProfilingService.prototype.updateUserInterest = function(userInterestUpdateDTO) {
          return this.seatersApi.fan.updateUserInterest(userInterestUpdateDTO);
        };
        FanProfilingService.prototype.getUserFanAttributes = function(pagingOptions) {
          pagingOptions = pagingOptions || {};
          if (!pagingOptions.filters) {
            pagingOptions.filters = {
              user_fan_attribute_status: profiling_types_1.profiling.USER_FAN_ATTRIBUTES_STATUS.LINKED
            };
          }
          return this.seatersApi.fan.getUserFanAttributes(pagingOptions);
        };
        FanProfilingService.prototype.updateUserFanAttribute = function(options) {
          return this.seatersApi.fan.updateUserFanAttribute(options);
        };
        return FanProfilingService;
      })();
      exports.FanProfilingService = FanProfilingService;

      /***/
    },
    /* 51 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var FanSurveyService = /** @class */ (function() {
        function FanSurveyService(seatersApi) {
          this.seatersApi = seatersApi;
        }
        // FAN
        FanSurveyService.prototype.getSurvey = function(waitingListId, extensionPoint, fanGroupId) {
          var pagingOptions = {};
          if (!pagingOptions.filters) {
            if (waitingListId) {
              pagingOptions.filters = {
                waitinglist_id: waitingListId,
                extension_point: extensionPoint
              };
            } else {
              pagingOptions.filters = {
                fangroup_id: fanGroupId,
                extension_point: extensionPoint
              };
            }
          }
          return this.seatersApi.fan.getSurveys(pagingOptions);
        };
        FanSurveyService.prototype.getAnswers = function(surveyInstanceId) {
          return this.seatersApi.fan.getAnswers(surveyInstanceId);
        };
        FanSurveyService.prototype.getChoices = function(questionId, pagingOptions) {
          return this.seatersApi.fan.getChoices(questionId, pagingOptions);
        };
        FanSurveyService.prototype.submitAnswers = function(surveyInstanceId, answers) {
          return this.seatersApi.fan.submitAnswers(surveyInstanceId, answers);
        };
        // FGO
        FanSurveyService.prototype.getWaitingListSurveys = function(waitingListId, extensionPoint) {
          var pagingOptions = {};
          if (!pagingOptions.filters) {
            pagingOptions.filters = {
              extension_point: extensionPoint
            };
          }
          return this.seatersApi.fan.getWaitingListSurveys(waitingListId, pagingOptions);
        };
        FanSurveyService.prototype.getUserAnswers = function(waitingListId, surveyInstanceId, userId) {
          var pagingOptions = {};
          if (!pagingOptions.filters) {
            pagingOptions.filters = {
              user_id: userId
            };
          }
          return this.seatersApi.fan.getUserAnswers(waitingListId, surveyInstanceId, pagingOptions);
        };
        return FanSurveyService;
      })();
      exports.FanSurveyService = FanSurveyService;

      /***/
    },
    /* 52 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(53));

      /***/
    },
    /* 53 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function(obj) {
              return typeof obj;
            }
          : function(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };

      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var algolia_for_seaters_1 = __webpack_require__(54);
      var fan_types_1 = __webpack_require__(2);
      var PublicService = /** @class */ (function() {
        function PublicService(appService, requestDriver, seatersApi) {
          this.seatersApi = seatersApi;
          this.algoliaForSeatersService = new algolia_for_seaters_1.AlgoliaForSeatersService(appService, requestDriver);
        }
        PublicService.prototype.getFanGroup = function(fanGroupId) {
          var _this = this;
          return this.algoliaForSeatersService.getFanGroupById(fanGroupId).then(function(fg) {
            return __assign({}, fg, { actionStatus: _this.getFanGroupActionStatus(fg) });
          });
        };
        PublicService.prototype.getFanGroupLookBySlug = function(slug) {
          var _this = this;
          return this.seatersApi.fan.fanGroupLook(slug).then(function(fg) {
            return __assign({}, fg, { actionStatus: _this.getFanGroupActionStatus(fg) });
          });
        };
        PublicService.prototype.getFanGroups = function(fanGroupIds) {
          var _this = this;
          return this.algoliaForSeatersService.getFanGroupsById(fanGroupIds).then(function(result) {
            return result.map(function(fg) {
              return __assign({}, fg, { actionStatus: _this.getFanGroupActionStatus(fg) });
            });
          });
        };
        PublicService.prototype.getWaitingList = function(waitingListId) {
          var _this = this;
          return this.algoliaForSeatersService.getWaitingListById(waitingListId).then(function(wl) {
            return __assign({}, wl, { actionStatus: _this.getWaitingListActionStatus(wl) });
          });
        };
        PublicService.prototype.getWaitingListsInFanGroup = function(
          fanGroupId,
          pagingOptions,
          geoLoc,
          keywords,
          dateTimeStamp
        ) {
          var _this = this;
          return this.algoliaForSeatersService
            .getWaitingListsByFanGroupId(
              fanGroupId,
              pagingOptions.maxPageSize,
              pagingOptions.page,
              geoLoc,
              keywords,
              dateTimeStamp
            )
            .then(function(result) {
              return _this.convertAlgoliaResultSet(result);
            })
            .then(function(result) {
              result.items = result.items.map(function(wl) {
                return __assign({}, wl, { actionStatus: _this.getWaitingListActionStatus(wl) });
              });
              return result;
            });
        };
        PublicService.prototype.getWaitingListsInFanGroups = function(fanGroupIds, pagingOptions) {
          var _this = this;
          return this.algoliaForSeatersService
            .getWaitingListsByFanGroupIds(fanGroupIds, pagingOptions.maxPageSize, pagingOptions.page)
            .then(function(result) {
              return _this.convertAlgoliaResultSet(result);
            })
            .then(function(result) {
              result.items = result.items.map(function(wl) {
                return __assign({}, wl, { actionStatus: _this.getWaitingListActionStatus(wl) });
              });
              return result;
            });
        };
        PublicService.prototype.getWaitingListPrice = function(waitingListId, numberOfSeats) {
          return this.seatersApi.fan.waitingListPrice(waitingListId, numberOfSeats);
        };
        PublicService.prototype.searchSeatersContent = function(query, locale, page, options) {
          var _this = this;
          page = this.defaultPage(page);
          return this.algoliaForSeatersService
            .searchSeatersContent(query, locale, page.maxPageSize, page.page, options)
            .then(function(result) {
              return _this.convertAlgoliaResultSet(result);
            })
            .then(function(result) {
              result.items = result.items.map(function(content) {
                if (content.type === 'WAITING_LIST') {
                  content = __assign({}, content, { actionStatus: _this.getWaitingListActionStatus(content) });
                }
                if (content.type === 'FAN_GROUP') {
                  content = __assign({}, content, { actionStatus: _this.getFanGroupActionStatus(content) });
                }
                return content;
              });
              return result;
            });
        };
        PublicService.prototype.searchWaitingListsInFanGroup = function(fanGroupId, query, locale, page) {
          var _this = this;
          page = this.defaultPage(page);
          return this.algoliaForSeatersService
            .searchWaitingListsInFanGroup(fanGroupId, query, locale, page.maxPageSize, page.page)
            .then(function(result) {
              return _this.convertAlgoliaResultSet(result);
            })
            .then(function(result) {
              result.items = result.items.map(function(wl) {
                return __assign({}, wl, { actionStatus: _this.getWaitingListActionStatus(wl) });
              });
              return result;
            });
        };
        PublicService.prototype.getWaitingListsByKeywords = function(keywords, page) {
          var _this = this;
          page = this.defaultPage(page);
          return this.algoliaForSeatersService
            .getWaitingListsByKeywords(keywords, page.maxPageSize, page.page)
            .then(function(result) {
              return _this.convertAlgoliaResultSet(result);
            })
            .then(function(result) {
              result.items = result.items.map(function(wl) {
                return __assign({}, wl, { actionStatus: _this.getWaitingListActionStatus(wl) });
              });
              return result;
            });
        };
        PublicService.prototype.defaultPage = function(page) {
          if ((typeof page === 'undefined' ? 'undefined' : _typeof(page)) === 'object') {
            return page;
          } else {
            return {
              maxPageSize: 10,
              page: 0
            };
          }
        };
        PublicService.prototype.convertAlgoliaResultSet = function(searchResult) {
          return {
            items: searchResult.hits,
            itemOffset: searchResult.page * searchResult.hitsPerPage,
            page: searchResult.page,
            maxPageSize: searchResult.hitsPerPage,
            totalSize: searchResult.nbHits
          };
        };
        PublicService.prototype.getFanGroupActionStatus = function(fanGroup) {
          if (fanGroup.accessMode === 'CODE_PROTECTED' || fanGroup.accessMode === 'PRIVATE') {
            return fan_types_1.fan.FAN_GROUP_ACTION_STATUS.CAN_UNLOCK;
          }
          return fan_types_1.fan.FAN_GROUP_ACTION_STATUS.CAN_JOIN;
        };
        /**
     *
     * The action status for public fan groups is limited since we don't have:
     * - position
     * - seat
     * - request
     * - ...
     * since the user is not logged in
     */
        PublicService.prototype.getWaitingListActionStatus = function(waitingList) {
          // Coming soon
          if (
            waitingList.waitingListStatus === 'PUBLISHED' ||
            waitingList.waitingListStatus === 'SETUP' ||
            waitingList.waitingListStatus === 'DRAFT'
          ) {
            return fan_types_1.fan.WAITING_LIST_ACTION_STATUS.SOON;
          }
          // Closed
          if (waitingList.waitingListStatus === 'CLOSED') {
            return undefined;
          }
          // Code protected
          if (waitingList.accessMode === 'CODE_PROTECTED') {
            return fan_types_1.fan.WAITING_LIST_ACTION_STATUS.UNLOCK;
          }
          // Public
          if (waitingList.accessMode === 'PUBLIC') {
            return fan_types_1.fan.WAITING_LIST_ACTION_STATUS.BOOK;
          }
          // Anything else is not supported since the user is not logged in
          return undefined;
        };
        return PublicService;
      })();
      exports.PublicService = PublicService;

      /***/
    },
    /* 54 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(55));
      __export(__webpack_require__(20));

      /***/
    },
    /* 55 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var algolia_api_1 = __webpack_require__(56);
      var algolia_for_seaters_types_1 = __webpack_require__(20);
      var DEFAULT_LOCALE = 'en';
      var WL_FACET_FILTER = {
        facet: algolia_for_seaters_types_1.TYPE_FIELD,
        value: algolia_for_seaters_types_1.WL_ALGOLIA_TYPE
      };
      var FAN_GROUP_FACET_FILTER = {
        facet: algolia_for_seaters_types_1.TYPE_FIELD,
        value: algolia_for_seaters_types_1.FG_ALGOLIA_TYPE
      };
      var AlgoliaForSeatersService = /** @class */ (function() {
        function AlgoliaForSeatersService(appService, requestDriver) {
          this.appService = appService;
          this.requestDriver = requestDriver;
        }
        AlgoliaForSeatersService.prototype.getFanGroupById = function(fanGroupId) {
          var q = this.buildExactQuery(fanGroupId, 'fanGroupId', algolia_for_seaters_types_1.FG_ALGOLIA_TYPE);
          return this.findExactlyOne(q, 'FanGroup', fanGroupId);
        };
        AlgoliaForSeatersService.prototype.getFanGroupsById = function(fanGroupIds) {
          var fanGroupIdsFilter = fanGroupIds
            .map(function(fanGroupId) {
              return 'fanGroupId:' + fanGroupId;
            })
            .join(' OR ');
          var q = {
            query: '',
            typoTolerance: algolia_for_seaters_types_1.TYPO_TOLERANCE_STRICT,
            facetFilters: [
              {
                facet: algolia_for_seaters_types_1.TYPE_FIELD,
                value: algolia_for_seaters_types_1.FG_ALGOLIA_TYPE
              }
            ],
            filters: fanGroupIdsFilter
          };
          return this.findExactlyN(q, fanGroupIds);
        };
        AlgoliaForSeatersService.prototype.getWaitingListsByFanGroupId = function(
          fanGroupId,
          hitsPerPage,
          page,
          geoLoc,
          keywords,
          dateTimeStamp
        ) {
          var _this = this;
          // TODO: sort by date ascending
          var q = this.buildExactQuery(fanGroupId, 'groupId', 'WAITING_LIST', geoLoc, keywords, dateTimeStamp);
          q.page = page;
          q.hitsPerPage = hitsPerPage;
          return this.search(q).then(function(r) {
            return _this.stripAlgoliaFieldsFromSearchResultHits(r);
          });
        };
        AlgoliaForSeatersService.prototype.getWaitingListsByFanGroupIds = function(fanGroupIds, hitsPerPage, page) {
          var _this = this;
          var fanGroupIdsFilter = fanGroupIds
            .map(function(fanGroupId) {
              return 'groupId:' + fanGroupId;
            })
            .join(' OR ');
          var q = {
            query: '',
            typoTolerance: algolia_for_seaters_types_1.TYPO_TOLERANCE_STRICT,
            facetFilters: [WL_FACET_FILTER],
            filters: fanGroupIdsFilter,
            page: page,
            hitsPerPage: hitsPerPage
          };
          return this.search(q).then(function(r) {
            return _this.stripAlgoliaFieldsFromSearchResultHits(r);
          });
        };
        AlgoliaForSeatersService.prototype.getWaitingListById = function(waitingListId) {
          var q = this.buildExactQuery(waitingListId, 'waitingListId', 'WAITING_LIST');
          return this.findExactlyOne(q, 'WaitingList', waitingListId);
        };
        AlgoliaForSeatersService.prototype.search = function(searchQuery) {
          var _this = this;
          return this.api()
            .then(function(api) {
              return api.indices.searchIndex(_this.searchIndex, searchQuery);
            })
            .then(function(res) {
              res.hits
                .filter(function(item) {
                  return item.type === algolia_for_seaters_types_1.WL_ALGOLIA_TYPE;
                })
                .forEach(function(item) {
                  return _this.patchWaitingList(item);
                });
              return res;
            });
        };
        AlgoliaForSeatersService.prototype.searchWaitingListsInFanGroup = function(
          fanGroupId,
          query,
          locale,
          hitsPerPage,
          page
        ) {
          var _this = this;
          return this.getSearchableAttributes(locale).then(function(searchableAttributes) {
            var q = {
              query: query,
              facetFilters: [
                WL_FACET_FILTER,
                // specific fangroup filter
                {
                  facet: 'groupId',
                  value: fanGroupId
                }
              ],
              restrictSearchableAttributes: searchableAttributes,
              hitsPerPage: hitsPerPage,
              page: page
            };
            return _this.search(q).then(function(r) {
              return _this.stripAlgoliaFieldsFromSearchResultHits(r);
            });
          });
        };
        AlgoliaForSeatersService.prototype.searchSeatersContent = function(query, locale, hitsPerPage, page, options) {
          var _this = this;
          return this.getSearchableAttributes(locale).then(function(searchableAttributes) {
            var q = {
              query: query,
              facetFilters: [],
              restrictSearchableAttributes: searchableAttributes,
              hitsPerPage: hitsPerPage,
              page: page
            };
            if (options.onlyFanGroups) {
              q.facetFilters.push(FAN_GROUP_FACET_FILTER);
            }
            if (options.onlyWaitingLists) {
              q.facetFilters.push(WL_FACET_FILTER);
            }
            return _this.search(q).then(function(r) {
              return _this.stripAlgoliaFieldsFromSearchResultHits(r);
            });
          });
        };
        AlgoliaForSeatersService.prototype.getWaitingListsByKeywords = function(keywords, hitsPerPage, page) {
          var _this = this;
          var q = {
            query: '',
            facetFilters: [WL_FACET_FILTER],
            hitsPerPage: hitsPerPage,
            page: page,
            tagFilters: keywords
          };
          return this.search(q).then(function(r) {
            return _this.stripAlgoliaFieldsFromSearchResultHits(r);
          });
        };
        AlgoliaForSeatersService.prototype.api = function() {
          var _this = this;
          if (!this._apiP) {
            this._apiP = this.appService.getEnv().then(function(env) {
              var cfg = env.algoliaConfiguration;
              _this.searchIndex = cfg.indexName;
              return new algolia_api_1.AlgoliaApi(cfg.appId, cfg.apiKey, _this.requestDriver);
            });
          }
          return this._apiP;
        };
        AlgoliaForSeatersService.prototype.buildExactQuery = function(
          query,
          field,
          type,
          geoLoc,
          keywords,
          dateTimeStamp
        ) {
          return {
            query: query,
            typoTolerance: 'strict',
            facetFilters: [
              {
                facet: 'type',
                value: type
              }
            ],
            aroundLatLng: geoLoc ? geoLoc.coord : undefined,
            aroundRadius: geoLoc ? geoLoc.radius : undefined,
            filters: dateTimeStamp ? 'eventStartDateTimestamp:' + dateTimeStamp : undefined,
            tagFilters: keywords,
            restrictSearchableAttributes: [field]
          };
        };
        AlgoliaForSeatersService.prototype.findExactlyOne = function(searchQuery, entityType, identifier) {
          return this.findExactlyN(searchQuery, [identifier]).then(function(results) {
            return results[0];
          });
        };
        AlgoliaForSeatersService.prototype.findExactlyN = function(searchQuery, identifiers) {
          var n = identifiers.length;
          return this.search(searchQuery).then(function(searchResult) {
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
        AlgoliaForSeatersService.prototype.getSearchableAttributes = function(locale) {
          if (!locale) {
            locale = DEFAULT_LOCALE;
          }
          return this.appService.getEnv().then(function(env) {
            var cfg = env.algoliaConfiguration;
            if (!cfg.attributes.hasOwnProperty(locale)) {
              if (locale === DEFAULT_LOCALE || !cfg.attributes.hasOwnProperty(DEFAULT_LOCALE)) {
                var err =
                  '[AlgoliaForSeatersService] seaters misconfiguration - searchable attributes for default locale undefined';
                console.error(err);
                throw err;
              } else {
                console.warn(
                  '[AlgoliaForSeatersService] locale is not supported for search - falling back to %s',
                  DEFAULT_LOCALE
                );
                locale = DEFAULT_LOCALE;
              }
            }
            return cfg.attributes[locale];
          });
        };
        AlgoliaForSeatersService.prototype.stripAlgoliaFieldsFromObject = function(result) {
          // delete result._geoloc;
          delete result._tags;
          delete result._highlightResult;
          delete result.objectID;
          return result;
        };
        AlgoliaForSeatersService.prototype.stripAlgoliaFieldsFromSearchResultHits = function(result) {
          var _this = this;
          result.hits.forEach(function(hit) {
            return _this.stripAlgoliaFieldsFromObject(hit);
          });
          return result;
        };
        AlgoliaForSeatersService.prototype.patchWaitingList = function(wl) {
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
              formattedTotal: wl.formattedTotal,
              originalPrice: wl.originalPrice,
              discountAmount: wl.discountAmount,
              discountPercentage: wl.discountPercentage,
              formattedOriginalPrice: wl.formattedOriginalPrice,
              formattedDiscountAmount: wl.formattedDiscountAmount
            };
          }
          return wl;
        };
        return AlgoliaForSeatersService;
      })();
      exports.AlgoliaForSeatersService = AlgoliaForSeatersService;

      /***/
    },
    /* 56 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(57));

      /***/
    },
    /* 57 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      Object.defineProperty(exports, '__esModule', { value: true });
      var api_1 = __webpack_require__(5);
      var indices_api_1 = __webpack_require__(58);
      var APP_ID_HEADER = 'X-Algolia-Application-Id';
      var API_KEY_HEADER = 'X-Algolia-API-Key';
      var API_LOCATION_INFIX = '-dsn.algolia.net/1/';
      function apiPrefix(appId, apiKey) {
        return 'https://' + appId.toLowerCase() + API_LOCATION_INFIX;
      }
      var AlgoliaApi = /** @class */ (function(_super) {
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
      })(api_1.ApiContext);
      exports.AlgoliaApi = AlgoliaApi;

      /***/
    },
    /* 58 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var IndicesApi = /** @class */ (function() {
        function IndicesApi(apiContext) {
          this.apiContext = apiContext;
        }
        IndicesApi.prototype.searchIndex = function(index, searchQuery) {
          var abstractEndpoint = '/indexes/:index/query';
          var endpointParams = { index: index };
          var body = { params: this.serializeSearchQuery(searchQuery) };
          return this.apiContext
            .doRequest({
              method: 'POST',
              abstractEndpoint: abstractEndpoint,
              endpointParams: endpointParams,
              body: body
            })
            .then(function(response) {
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
        IndicesApi.prototype.serializeSearchQuery = function(searchQuery) {
          var params = [];
          console.log('QUERY =>', searchQuery);
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
              return defaultArraySerializer(
                _facetFilters.map(function(facet) {
                  return facet.facet + ':' + facet.value;
                })
              );
            },
            typoTolerance: defaultSerializer,
            maxValuesPerFacet: defaultSerializer,
            tagFilters: defaultArraySerializer,
            filters: defaultSerializer,
            aroundLatLng: defaultSerializer,
            aroundRadius: defaultSerializer
          };
          Object.keys(searchQuery).forEach(function(key) {
            if (!serializers.hasOwnProperty(key)) {
              throw new Error('Unmapped SearchQuery property: ' + key);
            }
            if (searchQuery[key]) {
              params.push(key + '=' + serializers[key](searchQuery[key]));
            }
          });
          return params.join('&');
        };
        return IndicesApi;
      })();
      exports.IndicesApi = IndicesApi;

      /***/
    },
    /* 59 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports.FG_ALGOLIA_TYPE = 'FAN_GROUP';

      /***/
    },
    /* 60 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      exports.WL_ALGOLIA_TYPE = 'WAITING_LIST';

      /***/
    },
    /* 61 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(62));

      /***/
    },
    /* 62 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var util_1 = __webpack_require__(0);
      var AUTH_HEADER = 'Authorization';
      var AUTH_BEARER = 'SeatersBearer';
      var MS_TO_EXTEND_BEFORE_SESSION_EXPIRES = 60;
      var SESSION_STRATEGY;
      (function(SESSION_STRATEGY) {
        SESSION_STRATEGY[(SESSION_STRATEGY['EXPIRE'] = 0)] = 'EXPIRE';
        SESSION_STRATEGY[(SESSION_STRATEGY['EXTEND'] = 1)] = 'EXTEND';
      })((SESSION_STRATEGY = exports.SESSION_STRATEGY || (exports.SESSION_STRATEGY = {})));
      var SessionService = /** @class */ (function() {
        function SessionService(seatersApi, sessionStrategy) {
          this.seatersApi = seatersApi;
          this.sessionToken = '';
          this.sessionStrategy = sessionStrategy || SESSION_STRATEGY.EXTEND;
        }
        /**
     * Configure the given session to be used. This method is intended for transitional
     * phase where the SDK is not the one doing the login process (Seaters FanWebApp)
     *
     * @param session a valid session that is not expired
     * @param fan a valid fan object
     */
        SessionService.prototype.configureSession = function(s, fan) {
          this.setSession(s);
          this.currentFan = fan;
        };
        /**
     * Manually configure the fan (in case the current fan was changed / retrieved externally)
     *
     * @param fan latest fan object
     */
        SessionService.prototype.updateCurrentFan = function(fan) {
          this.currentFan = fan;
          return Promise.resolve(this.currentFan);
        };
        /**
     * Update password
     *
     * @param fan latest fan object
     */
        SessionService.prototype.updatePassword = function(data) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication.updatePassword(data);
          });
        };
        /**
     * Log in using an email/password
     * Log in using an email/password
     *
     * @param email valid email or seaters username
     * @param password plain text password
     * @param mfaToken authenticator token
     */
        SessionService.prototype.doEmailPasswordLogin = function(email, password, mfaToken) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .emailPasswordLogin({
                email: email,
                password: password,
                mfaToken: mfaToken
              })
              .then(function(r) {
                return _this.finishLogin(r);
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        /**
     * Log in using a stored token (long term validity)
     *
     * @param storedToken long term token
     * @param mfaToken authenticator token
     */
        SessionService.prototype.doStoredTokenLogin = function(storedToken, mfaToken) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .storedTokenLogin({
                token: storedToken,
                mfaToken: mfaToken
              })
              .then(function(r) {
                return _this.finishLogin(r);
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        /**
     * @deprecated Use doOAuthCodeLoginV2 instead to retrieve the session
     * @param oauthProvider
     * @param code
     * @returns {Promise<TResult2|TResult1>}
     */
        SessionService.prototype.doOAuthCodeLogin = function(oauthProvider, code) {
          var _this = this;
          console.warn(
            '[SessionService] doOAuthCodeLogin is deprecated and will be removed soon, use doOAuthCodeLoginV2 instead to retrieve the session'
          );
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .loginWithOAuthCode(oauthProvider, code)
              .then(function(r) {
                return _this.finishLogin(r);
              })
              .then(function(updatedSession) {
                return resolve(updatedSession.identity);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        SessionService.prototype.doOAuthCodeLoginV2 = function(oauthProvider, code) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .loginWithOAuthCode(oauthProvider, code)
              .then(function(r) {
                return _this.finishLogin(r);
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        SessionService.prototype.doVerifyOAuth = function(input) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .verifyOAuth(input)
              .then(function(r) {
                return _this.finishLogin(r);
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        SessionService.prototype.doLogout = function() {
          console.log('[SessionService] doLogout'); // DEBUG
          this.seatersApi.apiContext.unsetHeader(AUTH_HEADER);
          this.currentFan = undefined;
          this.sessionToken = undefined;
        };
        // TODO: handle error case
        SessionService.prototype.doEmailPasswordSignUp = function(
          email,
          password,
          firstname,
          lastname,
          language,
          redirect,
          fanGroupReference
        ) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .signup({
                email: email,
                password: password,
                firstName: firstname,
                lastName: lastname,
                language: language || 'en',
                confirmationReturnURLPath: redirect,
                registeredFromFanGroupId: fanGroupReference
              })
              .then(function() {
                return _this.doEmailPasswordLogin(email, password);
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        SessionService.prototype.doEmailSignUp = function(email, fanGroupId, language, origin) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .signupAnonymous({
                email: email,
                fanGroupId: fanGroupId,
                language: language || 'en',
                origin: origin
              })
              .then(function(authSuccess) {
                return _this.finishLogin(authSuccess);
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
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
        SessionService.prototype.doEmailValidation = function(email, code) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .validate({
                email: email,
                code: code
              })
              .then(function() {
                return _this.setCurrentFan();
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        /**
     * Validate a phone number by providing a confirmation code
     *
     * @param phone The phone number that you want to validate
     * @param code The code that validates the email
     * @returns a Promise that resolves with an updated fan or rejects with a VALIDATION_ERRORS
     * @see VALIDATION_ERRORS
     */
        SessionService.prototype.doMobilePhoneNumberValidation = function(phone, code) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .validate({
                mobile: phone,
                code: code
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        /**
     * Reset the user password based on the email
     * @param email email address
     */
        SessionService.prototype.doPasswordReset = function(email) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .resetPassword({ email: email })
              .then(function(r) {
                return resolve();
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        /**
     * Change the email associated to the current user
     * @param email new email address
     */
        SessionService.prototype.doEmailReset = function(email) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .resetEmail({
                email: email,
                token: _this.sessionToken
              })
              .then(function(r) {
                return resolve();
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        SessionService.prototype.checkStoredTokenValidity = function(
          authToken,
          applicationName,
          deviceId,
          applicationId
        ) {
          // ensure the expiration date is in the future
          var expirationDate = new Date(util_1.normalizeLondonTimezoneDate(authToken.expirationDate));
          var diff = expirationDate.getTime() - new Date().getTime();
          if (diff < 0) {
            return false;
          }
          // check if application name, device id and application id matches
          if (authToken.applicationName !== applicationName) {
            return false;
          }
          if (deviceId && authToken.deviceId !== deviceId) {
            return false;
          }
          if (applicationId && authToken.applicationId !== applicationId) {
            return false;
          }
          // the token is valid
          return true;
        };
        /**
     * Checks if there are any valid stored tokens and returns the first one. If there are none
     * it will create a new token and return this
     * @param applicationName the name of the application, e.g. "Seaters Embedded"
     * @param deviceId defaults to "SDK-device-<random UUID>"
     * @param applicationId defaults to "SDK-app-<random UUID>"
     */
        SessionService.prototype.obtainStoredToken = function(applicationName, deviceId, applicationId) {
          var _this = this;
          if (!applicationName) {
            throw new Error('[SessionService] applicationName is mandatory to obtain a stored token');
          }
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .getStoredTokens()
              .then(function(storedTokens) {
                // find the existing stored token, using the provided data to match
                var storedToken = storedTokens.find(function(t) {
                  return _this.checkStoredTokenValidity(t, applicationName, deviceId, applicationId);
                });
                if (storedToken) {
                  return storedToken;
                } else {
                  // if no acceptable token was found, create a new token
                  var input = {
                    applicationName: applicationName,
                    deviceId: deviceId || 'SDK-device-' + util_1.uuidv4(),
                    applicationId: applicationId || 'SDK-application-' + util_1.uuidv4()
                  };
                  return _this.seatersApi.authentication.createStoredToken(input);
                }
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        SessionService.prototype.whoami = function() {
          return this.currentFan;
        };
        SessionService.prototype.setSession = function(s) {
          this.seatersApi.apiContext.setHeader(AUTH_HEADER, AUTH_BEARER + ' ' + s.token);
          this.sessionToken = s.token;
          switch (this.sessionStrategy) {
            case SESSION_STRATEGY.EXTEND:
              return this.applyExtendSessionStrategy(s);
            case SESSION_STRATEGY.EXPIRE:
              return this.applyExpireSessionStrategy(s);
            default:
              throw new Error('Unknown session strategy: ' + JSON.stringify(this.sessionStrategy));
          }
        };
        SessionService.prototype.setCurrentFan = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.fan
              .fan()
              .then(function(fan) {
                return (_this.currentFan = fan);
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        SessionService.prototype.waitUntilMillisBeforeSessionExpires = function(s, msBefore) {
          var expirationDate = util_1.normalizeLondonTimezoneDate(s.expirationDate);
          var diff = new Date(expirationDate).getTime() - new Date().getTime();
          console.log('session expires on %s (in %s minutes)', expirationDate, Math.round(diff / (1000 * 60)));
          return new Promise(function(resolve, reject) {
            return setTimeout(function() {
              return resolve();
            }, diff - msBefore);
          });
        };
        SessionService.prototype.applyExpireSessionStrategy = function(s) {
          var _this = this;
          this.waitUntilMillisBeforeSessionExpires(s, 0).then(function() {
            console.log('[SessionService] session expired');
            _this.doLogout();
          });
        };
        SessionService.prototype.applyExtendSessionStrategy = function(s) {
          var _this = this;
          this.waitUntilMillisBeforeSessionExpires(s, MS_TO_EXTEND_BEFORE_SESSION_EXPIRES).then(function() {
            console.log('[SessionService] session about to expire, renewing');
            _this.doRefreshTokenLogin(s.token);
          });
        };
        SessionService.prototype.finishLogin = function(authSuccess) {
          var _this = this;
          var expirationDate = util_1.normalizeLondonTimezoneDate(authSuccess.token.expirationDate);
          console.log('TOKEN: ' + expirationDate);
          this.setSession({
            expirationDate: expirationDate,
            token: authSuccess.token.value
          });
          return new Promise(function(resolve, reject) {
            _this
              .setCurrentFan()
              .then(function(identity) {
                return {
                  expiresOn: expirationDate,
                  identity: identity,
                  token: authSuccess.token.value
                };
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        SessionService.prototype.doRefreshTokenLogin = function(refreshToken, mfaToken) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.seatersApi.authentication
              .refreshTokenLogin({
                token: refreshToken,
                mfaToken: mfaToken
              })
              .then(function(r) {
                return _this.finishLogin(r);
              })
              .then(function(r) {
                return resolve(r);
              })
              .catch(function(r) {
                return reject(r);
              });
          });
        };
        return SessionService;
      })();
      exports.SessionService = SessionService;

      /***/
    },
    /* 63 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(64));

      /***/
    },
    /* 64 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });
      var health_types_1 = __webpack_require__(16);
      var ALL_COUNTRIES_PAGE_SIZE = 1000;
      var ALL_LANGUAGES_PAGE_SIZE = 1000;
      var ALL_CURRENCIES_PAGE_SIZE = 1000;
      var ALL_TIME_ZONES_PAGE_SIZE = 1000;
      var ALL_TRANSLATIONS_PAGE_SIZE = 20000;
      var AppService = /** @class */ (function() {
        function AppService(seatersApi) {
          this.seatersApi = seatersApi;
        }
        /**
     * Fetch the application environment details
     */
        AppService.prototype.getEnv = function() {
          if (!this.envP) {
            this.envP = this.seatersApi.app.env();
          }
          return this.envP;
        };
        /**
     * Fetch a list of countries
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     */
        AppService.prototype.getCountries = function() {
          return this.seatersApi.app.countries({ page: 0, maxPageSize: ALL_COUNTRIES_PAGE_SIZE });
        };
        /**
     * Fetch a list of languages
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     */
        AppService.prototype.getLanguages = function() {
          return this.seatersApi.app.languages({ page: 0, maxPageSize: ALL_LANGUAGES_PAGE_SIZE });
        };
        /**
     * Fetch a list of currencies
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     */
        AppService.prototype.getCurrencies = function() {
          return this.seatersApi.app.currencies({ page: 0, maxPageSize: ALL_CURRENCIES_PAGE_SIZE });
        };
        /**
     * Fetch a list of time zones
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     */
        AppService.prototype.getTimeZones = function() {
          return this.seatersApi.app.timeZones({ page: 0, maxPageSize: ALL_TIME_ZONES_PAGE_SIZE });
        };
        /**
     * Fetch a list of translations
     * @param page defaults to a page with maxPageSize set to anticipated maximum value
     * @param target restrict to translations for the given target application
     * @param language restrict to translations in the given language (alpha-2 country code)
     */
        AppService.prototype.getTranslations = function(target, language) {
          return this.seatersApi.app.translations(target, language, {
            page: 0,
            maxPageSize: ALL_TRANSLATIONS_PAGE_SIZE
          });
        };
        /**
     * Check if the API is in maintenance mode
     */
        AppService.prototype.isInMaintenance = function() {
          return this.seatersApi.health
            .node()
            .then(function(msg) {
              return msg !== health_types_1.HEALTH_NODE_OK;
            })
            .catch(function(err) {
              console.error('Seaters API under maintenance', err);
              return true;
            });
        };
        /**
     * Based on the Accept-Language header this request will obtain
     * the best suited locale seaters has available for the user.
     * This method requires the actual request library to populate the
     * Accept-Language header; by default XHR populates this for most browsers.
     * It will work even without the header, but it will always return Seater's
     * default locale in this case.
     */
        AppService.prototype.getUserDefaultLocale = function() {
          return this.seatersApi.app.userDefaultLocale();
        };
        /**
     * Generates a seaters Address based
     * on a given google place
     * @param place google place https://developers.google.com/maps/documentation/javascript/reference/3/
     */
        AppService.prototype.generateSeatersAddress = function(place) {
          // https://developers.google.com/places/supported_types
          var streetNumber = this.getComponentName('street_number', place);
          var routeName = this.getComponentName('route', place);
          var localityName = this.getComponentName('locality', place);
          var localityLevel1 = this.getComponentName('locality_level_1', place);
          var sublocality = this.getComponentName('sublocality', place);
          var postalTownName = this.getComponentName('postal_town', place);
          var administrativeArea2 = this.getComponentName('administrative_area_level_2', place);
          var administrativeArea1 = this.getComponentName('administrative_area_level_1', place);
          var postalCode = this.getComponentName('postal_code', place);
          var country = this.getComponentName('country', place, 'short_name');
          return {
            // addressLine1
            line1: this.generateAddressLine1(place, streetNumber, routeName),
            // zipCode
            zipCode: postalCode,
            // city
            city: this.generateCity(administrativeArea2, sublocality, localityLevel1, localityName, postalTownName),
            // state
            state: administrativeArea1,
            // countryCode
            countryCode: country
          };
        };
        AppService.prototype.getComponentName = function(type, place, nameLength) {
          nameLength = nameLength || 'long_name';
          var component = place.address_components.find(function(addressComponent) {
            return addressComponent.types.includes(type);
          });
          return component && component[nameLength];
        };
        AppService.prototype.generateAddressLine1 = function(placeObject, streetNumber, routeName) {
          var line1 = '';
          if (placeObject.formatted_address) {
            return placeObject.formatted_address.split(',')[0];
          }
          if (streetNumber) {
            line1 = streetNumber;
          }
          if (routeName && routeName) {
            line1 = streetNumber + ' ' + routeName;
          }
          if (!streetNumber && routeName) {
            line1 = routeName;
          }
          return line1;
        };
        AppService.prototype.generateCity = function(
          administrativeArea2,
          sublocality,
          localityLevel1,
          localityName,
          postalTownName
        ) {
          var city = '';
          if (administrativeArea2) {
            city = administrativeArea2;
          }
          if (localityLevel1) {
            city = localityLevel1;
          }
          if (sublocality) {
            city = sublocality;
          }
          if (localityName) {
            city = localityName;
          }
          if (postalTownName) {
            city = postalTownName;
          }
          return city;
        };
        return AppService;
      })();
      exports.AppService = AppService;

      /***/
    },
    /* 65 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(66));

      /***/
    },
    /* 66 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      Object.defineProperty(exports, '__esModule', { value: true });
      var common_1 = __webpack_require__(3);
      var waiting_list_mapper_1 = __webpack_require__(67);
      var AdminService = /** @class */ (function(_super) {
        __extends(AdminService, _super);
        function AdminService(seatersApi) {
          return _super.call(this, seatersApi) || this;
        }
        AdminService.prototype.getEvent = function(eventId) {
          return this.seatersApi.admin.getEvent(eventId);
        };
        AdminService.prototype.getFanGroup = function(fanGroupId) {
          return this.seatersApi.admin.getFanGroup(fanGroupId);
        };
        AdminService.prototype.getFanGroupProtectionCodes = function(fanGroupId, page) {
          var _this = this;
          return this.seatersApi.admin.getFanGroupProtectionCodes(fanGroupId, page).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        AdminService.prototype.getFanGroupWaitingLists = function(fanGroupId, page) {
          var _this = this;
          return this.seatersApi.admin.getFanGroupWaitingLists(fanGroupId, page).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        AdminService.prototype.getWaitingList = function(waitingListId) {
          return this.seatersApi.admin.getWaitingList(waitingListId);
        };
        AdminService.prototype.updateWaitingList = function(waitingList) {
          return this.seatersApi.admin.updateWaitingList(waiting_list_mapper_1.mapWaitingList(waitingList));
        };
        AdminService.prototype.deleteWaitingList = function(waitingListId) {
          return this.seatersApi.admin.deleteWaitingList(waitingListId);
        };
        AdminService.prototype.deleteEvent = function(eventId) {
          return this.seatersApi.admin.deleteEvent(eventId);
        };
        AdminService.prototype.scheduleClosingDate = function(waitingListId, date) {
          return this.seatersApi.admin.scheduleClosingDate(waitingListId, date);
        };
        /**
     * Add a new protection code to a FanGroup
     * @param fanGroupId the id of the fangroup that can be unlocked with the code
     * @param code a text that can be used to unlock the fangroup
     * @param maxTimesUsed use 0 to describe unlimited code
     */
        AdminService.prototype.createFanGroupProtectionCode = function(fanGroupId, code, maxTimesUsed) {
          return this.seatersApi.admin.createFanGroupProtectionCode(fanGroupId, code, maxTimesUsed);
        };
        AdminService.prototype.deleteFanGroupProtectionCode = function(fanGroupId, code) {
          return this.seatersApi.admin.deleteFanGroupProtectionCode(fanGroupId, code);
        };
        /**
     * Import protection codes into a FanGroup. This upload should be a CSV with following format:
     * - column 1: the actual code that can unlock the FG
     * - column 2: how many times the code can be used - use 0 for infinite usage
     * @param fanGroupId The FG to import codes into
     * @param data For browser an HTMLInputElement containing a file, node: not supported
     */
        AdminService.prototype.importFanGroupProtectionCodes = function(fanGroupId, data, fileName) {
          var _this = this;
          return this.uploadOneTimeFile(data, fileName).then(function(otf) {
            return _this.seatersApi.admin.importFanGroupProtectionCodes(fanGroupId, otf.fileId);
          });
        };
        AdminService.prototype.updateFanGroupBackgroundImage = function(fanGroupId, data, fileName) {
          var _this = this;
          return this.seatersApi.admin
            .requestFanGroupBackgroundImageUpload(fanGroupId, this.defaultFileName(fileName))
            .then(function(otf) {
              return _this.seatersApi.admin.uploadOneTimeFile(otf.url, data);
            })
            .then(function() {
              return _this.getFanGroup(fanGroupId);
            });
        };
        AdminService.prototype.updateFanGroupCoverImage = function(fanGroupId, data, fileName) {
          var _this = this;
          return this.seatersApi.admin
            .requestFanGroupCoverImageUpload(fanGroupId, this.defaultFileName(fileName))
            .then(function(otf) {
              return _this.seatersApi.admin.uploadOneTimeFile(otf.url, data);
            })
            .then(function() {
              return _this.getFanGroup(fanGroupId);
            });
        };
        AdminService.prototype.updateFanGroupProfileImage = function(fanGroupId, data, fileName) {
          var _this = this;
          return this.seatersApi.admin
            .requestFanGroupProfileImageUpload(fanGroupId, this.defaultFileName(fileName))
            .then(function(otf) {
              return _this.seatersApi.admin.uploadOneTimeFile(otf.url, data);
            })
            .then(function() {
              return _this.getFanGroup(fanGroupId);
            });
        };
        AdminService.prototype.updateEventImage = function(eventId, data, fileName) {
          var _this = this;
          return this.seatersApi.admin
            .requestEventImageUpload(eventId, this.defaultFileName(fileName))
            .then(function(otf) {
              return _this.seatersApi.admin.uploadOneTimeFile(otf.url, data);
            })
            .then(function() {
              return _this.getEvent(eventId);
            });
        };
        // Profiling
        AdminService.prototype.getCategories = function(options) {
          var _this = this;
          return this.seatersApi.admin.getCategories(options).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        AdminService.prototype.getCategory = function(id) {
          return this.seatersApi.admin.getCategory(id);
        };
        AdminService.prototype.createCategory = function(category) {
          return this.seatersApi.admin.createCategory(category);
        };
        AdminService.prototype.updateCategory = function(category) {
          return this.seatersApi.admin.updateCategory(category);
        };
        AdminService.prototype.deleteCategory = function(id) {
          return this.seatersApi.admin.deleteCategory(id);
        };
        AdminService.prototype.orderCategories = function(orderedCategoryIds) {
          return this.seatersApi.admin.orderCategories(orderedCategoryIds);
        };
        AdminService.prototype.getInterests = function(options) {
          var _this = this;
          return this.seatersApi.admin.getInterests(options).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        AdminService.prototype.getInterest = function(id) {
          return this.seatersApi.admin.getInterest(id);
        };
        AdminService.prototype.createInterest = function(interest) {
          return this.seatersApi.admin.createInterest(interest);
        };
        AdminService.prototype.updateInterest = function(interest) {
          return this.seatersApi.admin.updateInterest(interest);
        };
        AdminService.prototype.deleteInterest = function(id) {
          return this.seatersApi.admin.deleteInterest(id);
        };
        AdminService.prototype.getFanAttributes = function(options) {
          var _this = this;
          return this.seatersApi.admin.getFanAttributes(options).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        AdminService.prototype.getFanAttribute = function(id) {
          return this.seatersApi.admin.getFanAttribute(id);
        };
        AdminService.prototype.createFanAttribute = function(fanAttribute) {
          return this.seatersApi.admin.createFanAttribute(fanAttribute);
        };
        AdminService.prototype.updateFanAttribute = function(fanAttribute) {
          return this.seatersApi.admin.updateFanAttribute(fanAttribute);
        };
        AdminService.prototype.deleteFanAttribute = function(id) {
          return this.seatersApi.admin.deleteFanAttribute(id);
        };
        // Validates fan attribute and updates with data if given
        AdminService.prototype.validateFanAttribute = function(id, updatedFanAttribute) {
          return this.seatersApi.admin.validateFanAttribute(id, updatedFanAttribute);
        };
        AdminService.prototype.unvalidateFanAttribute = function(id) {
          return this.seatersApi.admin.unvalidateFanAttribute(id);
        };
        AdminService.prototype.addAliases = function(id, idsToConvert) {
          return this.seatersApi.admin.addAliases(id, idsToConvert);
        };
        // Badge
        AdminService.prototype.getAllBadges = function(status, options) {
          return this.seatersApi.admin.getAllBadges(status, options);
        };
        AdminService.prototype.getBadge = function(badgeId) {
          return this.seatersApi.admin.getBadge(badgeId);
        };
        AdminService.prototype.createBadge = function(badge) {
          return this.seatersApi.admin.createBadge(badge);
        };
        AdminService.prototype.deleteBadge = function(badgeId) {
          return this.seatersApi.admin.deleteBadge(badgeId);
        };
        AdminService.prototype.updateBadge = function(badgeId, badge) {
          return this.seatersApi.admin.updateBadge(badgeId, badge);
        };
        // Badge : FanGroup Context
        AdminService.prototype.linkBadgeToFg = function(fanGroupId, badgeId) {
          return this.seatersApi.admin.linkBadgeToFg(fanGroupId, badgeId);
        };
        AdminService.prototype.unlinkBadgeToFg = function(fanGroupId, badgeId) {
          return this.seatersApi.admin.unlinkBadgeToFg(fanGroupId, badgeId);
        };
        AdminService.prototype.getBadges = function(fanGroupId) {
          return this.seatersApi.admin.getBadges(fanGroupId);
        };
        //BADGE : Category
        AdminService.prototype.getBadgeCategories = function(status, options) {
          return this.seatersApi.admin.getBadgeCategories(status, options);
        };
        AdminService.prototype.createBadgeCategory = function(category) {
          return this.seatersApi.admin.createBadgeCategory(category);
        };
        AdminService.prototype.updateBadgeCategory = function(categoryId, category) {
          return this.seatersApi.admin.updateBadgeCategory(categoryId, category);
        };
        AdminService.prototype.deleteBadgeCategory = function(categoryId) {
          return this.seatersApi.admin.deleteBadgeCategory(categoryId);
        };
        // Survey
        AdminService.prototype.getSurvey = function(id) {
          return this.seatersApi.admin.getSurvey(id);
        };
        AdminService.prototype.getSurveys = function(options) {
          return this.seatersApi.admin.getSurveys(options);
        };
        AdminService.prototype.createSurvey = function(data) {
          return this.seatersApi.admin.createSurvey(data);
        };
        AdminService.prototype.updateSurvey = function(data) {
          return this.seatersApi.admin.updateSurvey(data);
        };
        // Survey : Instances
        AdminService.prototype.getSurveyInstance = function(id) {
          return this.seatersApi.admin.getSurveyInstance(id);
        };
        AdminService.prototype.getSurveyInstances = function(options) {
          return this.seatersApi.admin.getSurveyInstances(options);
        };
        AdminService.prototype.createSurveyInstances = function(surveyInstance) {
          return this.seatersApi.admin.createSurveyInstances(surveyInstance);
        };
        AdminService.prototype.updateSurveyInstances = function(surveyInstance) {
          return this.seatersApi.admin.updateSurveyInstances(surveyInstance);
        };
        // Survey : Answer Semantic
        AdminService.prototype.getAnswerSemantic = function(id) {
          return this.seatersApi.admin.getAnswerSemantic(id);
        };
        AdminService.prototype.getAnswerSemantics = function(options) {
          return this.seatersApi.admin.getAnswerSemantics(options);
        };
        AdminService.prototype.createAnswerSemantic = function(answerSemantic) {
          return this.seatersApi.admin.createAnswerSemantic(answerSemantic);
        };
        AdminService.prototype.updateAnswerSemantic = function(answerSemantic) {
          return this.seatersApi.admin.updateAnswerSemantic(answerSemantic);
        };
        // Survey : Questions
        AdminService.prototype.getQuestion = function(id) {
          return this.seatersApi.admin.getQuestion(id);
        };
        AdminService.prototype.getQuestions = function(options) {
          return this.seatersApi.admin.getQuestions(options);
        };
        AdminService.prototype.createQuestion = function(question) {
          return this.seatersApi.admin.createQuestion(question);
        };
        AdminService.prototype.updateQuestion = function(question) {
          return this.seatersApi.admin.updateQuestion(question);
        };
        AdminService.prototype.getVenueConfig = function(venueId) {
          var _this = this;
          return this.seatersApi.admin.getVenueConfig(venueId).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        AdminService.prototype.createEvent = function(event) {
          return this.seatersApi.admin.createEvent(event);
        };
        AdminService.prototype.createVenue = function(venue) {
          return this.seatersApi.admin.createVenue(venue);
        };
        AdminService.prototype.createWishlist = function(groupId, wishList) {
          return this.seatersApi.admin.createWishlist(groupId, wishList);
        };
        AdminService.prototype.openWishlist = function(wishlistId) {
          return this.seatersApi.admin.openWishlist(wishlistId);
        };
        AdminService.prototype.getWaitingListFull = function(waitingListId) {
          return this.seatersApi.admin.getWaitingListFull(waitingListId);
        };
        AdminService.prototype.updateWaitingListFull = function(wl) {
          return this.seatersApi.admin.updateWaitingListFull(wl);
        };
        AdminService.prototype.requestVoucherImageUpload = function(fanGroupId, fileName) {
          return this.seatersApi.admin.requestVoucherImageUpload(fanGroupId, fileName);
        };
        AdminService.prototype.replaySignal = function(bus, id) {
          return this.seatersApi.admin.replaySignal(bus, id);
        };
        AdminService.prototype.updatEvent = function(event, eventId) {
          return this.seatersApi.admin.updatEvent(event, eventId);
        };
        AdminService.prototype.uploadOneTimeFile = function(data, fileName) {
          var _this = this;
          return this.seatersApi.admin.requestOneTimeFileUpload(this.defaultFileName(fileName)).then(function(otf) {
            return _this.seatersApi.admin.uploadOneTimeFile(otf.url, data).then(function() {
              return otf;
            });
          });
        };
        AdminService.prototype.defaultFileName = function(fileName) {
          if (fileName && fileName !== '') {
            return fileName;
          } else {
            return new Date().toISOString();
          }
        };
        return AdminService;
      })(common_1.SeatersService);
      exports.AdminService = AdminService;

      /***/
    },
    /* 67 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      function mapWaitingList(wl) {
        return __assign({}, wl, {
          distributionRate: wl.billingVariables.distributionRate,
          vatRate: wl.billingVariables.vatRate,
          minDistributionFee: wl.billingVariables.minDistributionFee,
          maxDistributionFee: wl.billingVariables.maxDistributionFee
        });
      }
      exports.mapWaitingList = mapWaitingList;

      /***/
    },
    /* 68 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(69));

      /***/
    },
    /* 69 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      Object.defineProperty(exports, '__esModule', { value: true });
      var common_1 = __webpack_require__(3);
      var TicketingService = /** @class */ (function(_super) {
        __extends(TicketingService, _super);
        function TicketingService(seatersApi) {
          return _super.call(this, seatersApi) || this;
        }
        TicketingService.prototype.getTicketingSystems = function(page) {
          var _this = this;
          return this.seatersApi.ticketing.getTicketingSystems(page).then(function(r) {
            return _this.convertPagedResult(r);
          });
        };
        TicketingService.prototype.getTicketingSystem = function(ticketingSystemId) {
          return this.seatersApi.ticketing.getTicketingSystem(ticketingSystemId);
        };
        return TicketingService;
      })(common_1.SeatersService);
      exports.TicketingService = TicketingService;

      /***/
    },
    /* 70 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      Object.defineProperty(exports, '__esModule', { value: true });
      __export(__webpack_require__(71));

      /***/
    },
    /* 71 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function(obj) {
              return typeof obj;
            }
          : function(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };

      var __extends =
        (undefined && undefined.__extends) ||
        (function() {
          var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(d, b) {
                d.__proto__ = b;
              }) ||
            function(d, b) {
              for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
              }
            };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
          };
        })();
      var __assign =
        (undefined && undefined.__assign) ||
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }
          return t;
        };
      Object.defineProperty(exports, '__esModule', { value: true });
      var common_1 = __webpack_require__(3);
      var PaymentService = /** @class */ (function(_super) {
        __extends(PaymentService, _super);
        function PaymentService(seatersApi) {
          return _super.call(this, seatersApi) || this;
        }
        PaymentService.prototype.getPaymentSystems = function(page) {
          var _this = this;
          return this.seatersApi.payment
            .getPaymentSystems(page)
            .then(function(r) {
              return _this.convertPagedResult(r);
            })
            .then(function(r) {
              r.items = r.items.map(function(paymentSystem) {
                paymentSystem.configuration = _this.expandJSONStringToObject(paymentSystem.configuration);
                return paymentSystem;
              });
              return r;
            });
        };
        PaymentService.prototype.getPaymentSystem = function(paymentSystemId) {
          var _this = this;
          return this.seatersApi.payment.getPaymentSystem(paymentSystemId).then(function(paymentSystem) {
            paymentSystem.configuration = _this.expandJSONStringToObject(paymentSystem.configuration);
            return paymentSystem;
          });
        };
        PaymentService.prototype.createPaymentSystem = function(payload) {
          var _this = this;
          payload.configuration = this.flattenObjectToJSONString(payload.configuration);
          return this.seatersApi.payment.createPaymentSystem(payload).then(function(paymentSystem) {
            paymentSystem.configuration = _this.expandJSONStringToObject(paymentSystem.configuration);
            return paymentSystem;
          });
        };
        PaymentService.prototype.updatePaymentSystem = function(paymentSystemId, payload) {
          var _this = this;
          payload.configuration = this.flattenObjectToJSONString(payload.configuration);
          return this.seatersApi.payment.updatePaymentSystem(paymentSystemId, payload).then(function(paymentSystem) {
            paymentSystem.configuration = _this.expandJSONStringToObject(paymentSystem.configuration);
            return paymentSystem;
          });
        };
        PaymentService.prototype.deletePaymentSystem = function(paymentSystemId) {
          return this.seatersApi.payment.deletePaymentSystem(paymentSystemId);
        };
        PaymentService.prototype.flattenObjectToJSONString = function(data) {
          if (!data || Object.keys(data).length === 0) {
            return data;
          }
          var flatData = __assign({}, data);
          var keys = Object.keys(data);
          /* tslint:disable prefer-for-of */
          for (var i = 0; i < keys.length; i++) {
            if (_typeof(data[keys[i]]) === 'object' && !Array.isArray(data[keys[i]])) {
              var jsonValue = void 0;
              try {
                jsonValue = JSON.stringify(data[keys[i]]);
              } catch (e) {
                jsonValue = data[keys[i]];
              }
              flatData[keys[i]] = jsonValue;
            }
          }
          /* tslint:enable prefer-for-of */
          return flatData;
        };
        PaymentService.prototype.expandJSONStringToObject = function(data) {
          if (!data || Object.keys(data).length === 0) {
            return data;
          }
          var expandedData = __assign({}, data);
          var keys = Object.keys(data);
          /* tslint:disable prefer-for-of */
          for (var i = 0; i < keys.length; i++) {
            if (typeof data[keys[i]] === 'string') {
              var object = void 0;
              try {
                object = JSON.parse(data[keys[i]]);
              } catch (e) {
                object = data[keys[i]];
              }
              expandedData[keys[i]] = object;
            }
          }
          /* tslint:enable prefer-for-of */
          return expandedData;
        };
        return PaymentService;
      })(common_1.SeatersService);
      exports.PaymentService = PaymentService;

      /***/
    }
    /******/
  ]
);
//# sourceMappingURL=seaters.bundle.js.map
