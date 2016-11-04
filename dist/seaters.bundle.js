var SeatersSDK =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.version = "0.0.1";
	var seaters_client_1 = __webpack_require__(1);
	exports.SeatersClient = seaters_client_1.SeatersClient;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var seaters_api_1 = __webpack_require__(2);
	var SeatersClient = (function () {
	    function SeatersClient(apiPrefix) {
	        this.apiContext = new seaters_api_1.ApiContext(apiPrefix || '/api');
	    }
	    SeatersClient.prototype.greet = function (name) {
	        return 'Hello, ' + name;
	    };
	    SeatersClient.prototype.getAppEnv = function () {
	        return this.apiContext.createPopsicleRequest({
	            abstractEndpoint: '/app/env',
	            method: 'GET'
	        });
	    };
	    return SeatersClient;
	}());
	exports.SeatersClient = SeatersClient;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(3));
	__export(__webpack_require__(32));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var popsicle = __webpack_require__(4);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FormData = __webpack_require__(5);
	exports.FormData = FormData;
	var extend = __webpack_require__(6);
	var request_1 = __webpack_require__(7);
	exports.Request = request_1.default;
	var response_1 = __webpack_require__(24);
	exports.Response = response_1.default;
	var plugins = __webpack_require__(25);
	exports.plugins = plugins;
	var form_1 = __webpack_require__(28);
	exports.form = form_1.default;
	var jar_1 = __webpack_require__(29);
	exports.jar = jar_1.default;
	var error_1 = __webpack_require__(21);
	exports.PopsicleError = error_1.default;
	var index_1 = __webpack_require__(31);
	exports.createTransport = index_1.createTransport;
	function defaults(defaultsOptions) {
	    var transport = index_1.createTransport({ type: 'text' });
	    var defaults = extend({ transport: transport }, defaultsOptions);
	    return function popsicle(options) {
	        var opts;
	        if (typeof options === 'string') {
	            opts = extend(defaults, { url: options });
	        }
	        else {
	            opts = extend(defaults, options);
	        }
	        if (typeof opts.url !== 'string') {
	            throw new TypeError('The URL must be a string');
	        }
	        return new request_1.default(opts);
	    };
	}
	exports.defaults = defaults;
	exports.request = defaults({});
	exports.get = defaults({ method: 'get' });
	exports.post = defaults({ method: 'post' });
	exports.put = defaults({ method: 'put' });
	exports.patch = defaults({ method: 'patch' });
	exports.del = defaults({ method: 'delete' });
	exports.head = defaults({ method: 'head' });
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exports.request;
	//# sourceMappingURL=common.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	module.exports = FormData;
	//# sourceMappingURL=form-data.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = extend
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function extend() {
	    var target = {}
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var arrify = __webpack_require__(8);
	var extend = __webpack_require__(6);
	var Promise = __webpack_require__(9);
	var throwback_1 = __webpack_require__(12);
	var base_1 = __webpack_require__(13);
	var error_1 = __webpack_require__(21);
	var Request = (function (_super) {
	    __extends(Request, _super);
	    function Request(options) {
	        var _this = this;
	        _super.call(this, options);
	        this.middleware = [];
	        this.opened = false;
	        this.aborted = false;
	        this.uploaded = 0;
	        this.downloaded = 0;
	        this._progress = [];
	        this.timeout = (options.timeout | 0);
	        this.method = (options.method || 'GET').toUpperCase();
	        this.body = options.body;
	        var $promise = new Promise(function (resolve, reject) {
	            _this._resolve = resolve;
	            _this._reject = reject;
	        });
	        this.transport = extend(options.transport);
	        this.use(options.use || this.transport.use);
	        this.progress(options.progress);
	        this._promise = Promise.resolve()
	            .then(function () {
	            var run = throwback_1.compose(_this.middleware);
	            var cb = function () {
	                _this._handle();
	                return $promise;
	            };
	            return run(_this, cb);
	        });
	    }
	    Request.prototype.error = function (message, code, original) {
	        return new error_1.default(message, code, original, this);
	    };
	    Request.prototype.then = function (onFulfilled, onRejected) {
	        return this._promise.then(onFulfilled, onRejected);
	    };
	    Request.prototype.catch = function (onRejected) {
	        return this._promise.then(null, onRejected);
	    };
	    Request.prototype.exec = function (cb) {
	        this.then(function (response) {
	            cb(null, response);
	        }, cb);
	    };
	    Request.prototype.toOptions = function () {
	        return {
	            url: this.url,
	            method: this.method,
	            body: this.body,
	            transport: this.transport,
	            timeout: this.timeout,
	            rawHeaders: this.rawHeaders,
	            use: this.middleware,
	            progress: this._progress
	        };
	    };
	    Request.prototype.toJSON = function () {
	        return {
	            url: this.url,
	            method: this.method,
	            headers: this.headers,
	            body: this.body,
	            timeout: this.timeout,
	            response: this.response ? this.response.toJSON() : null
	        };
	    };
	    Request.prototype.clone = function () {
	        return new Request(this.toOptions());
	    };
	    Request.prototype.use = function (fns) {
	        for (var _i = 0, _a = arrify(fns); _i < _a.length; _i++) {
	            var fn = _a[_i];
	            this.middleware.push(fn);
	        }
	        return this;
	    };
	    Request.prototype.progress = function (fns) {
	        for (var _i = 0, _a = arrify(fns); _i < _a.length; _i++) {
	            var fn = _a[_i];
	            this._progress.push(fn);
	        }
	        return this;
	    };
	    Request.prototype.abort = function () {
	        if (this.completed === 1 || this.aborted) {
	            return;
	        }
	        this.aborted = true;
	        if (this.opened) {
	            this._emit();
	            if (this.transport.abort) {
	                this.transport.abort(this);
	            }
	        }
	        this._reject(this.error('Request aborted', 'EABORT'));
	        return this;
	    };
	    Request.prototype._emit = function () {
	        var fns = this._progress;
	        try {
	            for (var _i = 0, fns_1 = fns; _i < fns_1.length; _i++) {
	                var fn = fns_1[_i];
	                fn(this);
	            }
	        }
	        catch (err) {
	            this._reject(err);
	            this.abort();
	        }
	    };
	    Request.prototype._handle = function () {
	        var _this = this;
	        var _a = this, timeout = _a.timeout, url = _a.url;
	        var timer;
	        if (this.aborted) {
	            return;
	        }
	        this.opened = true;
	        if (/^https?\:\/*(?:[~#\\\?;\:]|$)/.test(url)) {
	            this._reject(this.error("Refused to connect to invalid URL \"" + url + "\"", 'EINVALID'));
	            return;
	        }
	        if (timeout > 0) {
	            timer = setTimeout(function () {
	                _this._reject(_this.error("Timeout of " + timeout + "ms exceeded", 'ETIMEOUT'));
	                _this.abort();
	            }, timeout);
	        }
	        return this.transport.open(this)
	            .then(function (response) {
	            _this.response = response;
	            _this._resolve(response);
	        }, function (err) { return _this._reject(err); });
	    };
	    Object.defineProperty(Request.prototype, "completed", {
	        get: function () {
	            return (this.uploaded + this.downloaded) / 2;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Request.prototype, "completedBytes", {
	        get: function () {
	            return this.uploadedBytes + this.downloadedBytes;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Request.prototype, "totalBytes", {
	        get: function () {
	            return this.uploadLength + this.downloadLength;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Request.prototype._setUploadedBytes = function (bytes, uploaded) {
	        if (bytes !== this.uploadedBytes) {
	            this.uploaded = uploaded || bytes / this.uploadLength;
	            this.uploadedBytes = bytes;
	            this._emit();
	        }
	    };
	    Request.prototype._setDownloadedBytes = function (bytes, downloaded) {
	        if (bytes !== this.downloadedBytes) {
	            this.downloaded = downloaded || bytes / this.downloadLength;
	            this.downloadedBytes = bytes;
	            this._emit();
	        }
	    };
	    return Request;
	}(base_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Request;
	//# sourceMappingURL=request.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (val) {
		if (val === null || val === undefined) {
			return [];
		}
	
		return Array.isArray(val) ? val : [val];
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10)().Promise


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = __webpack_require__(11)(window, loadImplementation)
	
	/**
	 * Browser specific loadImplementation.  Always uses `window.Promise`
	 *
	 * To register a custom implementation, must register with `Promise` option.
	 */
	function loadImplementation(){
	  if(typeof window.Promise === 'undefined'){
	    throw new Error("any-promise browser requires a polyfill or explicit registration"+
	      " e.g: require('any-promise/register/bluebird')")
	  }
	  return {
	    Promise: window.Promise,
	    implementation: 'window.Promise'
	  }
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict"
	    // global key for user preferred registration
	var REGISTRATION_KEY = '@@any-promise/REGISTRATION',
	    // Prior registration (preferred or detected)
	    registered = null
	
	/**
	 * Registers the given implementation.  An implementation must
	 * be registered prior to any call to `require("any-promise")`,
	 * typically on application load.
	 *
	 * If called with no arguments, will return registration in
	 * following priority:
	 *
	 * For Node.js:
	 *
	 * 1. Previous registration
	 * 2. global.Promise if node.js version >= 0.12
	 * 3. Auto detected promise based on first sucessful require of
	 *    known promise libraries. Note this is a last resort, as the
	 *    loaded library is non-deterministic. node.js >= 0.12 will
	 *    always use global.Promise over this priority list.
	 * 4. Throws error.
	 *
	 * For Browser:
	 *
	 * 1. Previous registration
	 * 2. window.Promise
	 * 3. Throws error.
	 *
	 * Options:
	 *
	 * Promise: Desired Promise constructor
	 * global: Boolean - Should the registration be cached in a global variable to
	 * allow cross dependency/bundle registration?  (default true)
	 */
	module.exports = function(root, loadImplementation){
	  return function register(implementation, opts){
	    implementation = implementation || null
	    opts = opts || {}
	    // global registration unless explicitly  {global: false} in options (default true)
	    var registerGlobal = opts.global !== false;
	
	    // load any previous global registration
	    if(registered === null && registerGlobal){
	      registered = root[REGISTRATION_KEY] || null
	    }
	
	    if(registered !== null
	        && implementation !== null
	        && registered.implementation !== implementation){
	      // Throw error if attempting to redefine implementation
	      throw new Error('any-promise already defined as "'+registered.implementation+
	        '".  You can only register an implementation before the first '+
	        ' call to require("any-promise") and an implementation cannot be changed')
	    }
	
	    if(registered === null){
	      // use provided implementation
	      if(implementation !== null && typeof opts.Promise !== 'undefined'){
	        registered = {
	          Promise: opts.Promise,
	          implementation: implementation
	        }
	      } else {
	        // require implementation if implementation is specified but not provided
	        registered = loadImplementation(implementation)
	      }
	
	      if(registerGlobal){
	        // register preference globally in case multiple installations
	        root[REGISTRATION_KEY] = registered
	      }
	    }
	
	    return registered
	  }
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Promise = __webpack_require__(9);
	function compose(middleware) {
	    if (!Array.isArray(middleware)) {
	        throw new TypeError("Expected middleware to be an array, got " + typeof middleware);
	    }
	    for (var _i = 0, middleware_1 = middleware; _i < middleware_1.length; _i++) {
	        var fn = middleware_1[_i];
	        if (typeof fn !== 'function') {
	            throw new TypeError("Expected middleware to contain functions, got " + typeof fn);
	        }
	    }
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        var index = -1;
	        var done = args.pop();
	        if (typeof done !== 'function') {
	            throw new TypeError("Expected the last argument to be `next()`, got " + typeof done);
	        }
	        function dispatch(pos) {
	            if (pos <= index) {
	                throw new TypeError('`next()` called multiple times');
	            }
	            index = pos;
	            var fn = middleware[pos] || done;
	            return new Promise(function (resolve) {
	                return resolve(fn.apply(void 0, args.concat([function next() {
	                    return dispatch(pos + 1);
	                }])));
	            });
	        }
	        return dispatch(0);
	    };
	}
	exports.compose = compose;
	//# sourceMappingURL=index.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var url_1 = __webpack_require__(14);
	var querystring_1 = __webpack_require__(18);
	var extend = __webpack_require__(6);
	function lowerHeader(key) {
	    var lower = key.toLowerCase();
	    if (lower === 'referrer') {
	        return 'referer';
	    }
	    return lower;
	}
	function type(str) {
	    return str == null ? null : str.split(/ *; */, 1)[0];
	}
	function concat(a, b) {
	    if (a == null) {
	        return b;
	    }
	    return Array.isArray(a) ? a.concat(b) : [a, b];
	}
	var Base = (function () {
	    function Base(_a) {
	        var url = _a.url, headers = _a.headers, rawHeaders = _a.rawHeaders, query = _a.query;
	        this.Url = {};
	        this.rawHeaders = [];
	        if (url != null) {
	            this.url = url;
	        }
	        if (query != null) {
	            this.query = extend(this.query, typeof query === 'string' ? querystring_1.parse(query) : query);
	        }
	        if (rawHeaders) {
	            if (rawHeaders.length % 2 === 1) {
	                throw new TypeError("Expected raw headers length to be even, was " + rawHeaders.length);
	            }
	            this.rawHeaders = rawHeaders.slice(0);
	        }
	        else {
	            this.headers = headers;
	        }
	    }
	    Object.defineProperty(Base.prototype, "url", {
	        get: function () {
	            return url_1.format(this.Url);
	        },
	        set: function (url) {
	            this.Url = url_1.parse(url, true, true);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Base.prototype, "query", {
	        get: function () {
	            return this.Url.query;
	        },
	        set: function (query) {
	            this.Url.query = typeof query === 'string' ? querystring_1.parse(query) : query;
	            this.Url.search = null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Base.prototype, "headers", {
	        get: function () {
	            var headers = {};
	            for (var i = 0; i < this.rawHeaders.length; i += 2) {
	                var key = lowerHeader(this.rawHeaders[i]);
	                var value = concat(headers[key], this.rawHeaders[i + 1]);
	                headers[key] = value;
	            }
	            return headers;
	        },
	        set: function (headers) {
	            this.rawHeaders = [];
	            if (headers) {
	                for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
	                    var key = _a[_i];
	                    this.append(key, headers[key]);
	                }
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Base.prototype.toHeaders = function () {
	        var headers = {};
	        for (var i = 0; i < this.rawHeaders.length; i += 2) {
	            var key = this.rawHeaders[i];
	            var value = concat(headers[key], this.rawHeaders[i + 1]);
	            headers[key] = value;
	        }
	        return headers;
	    };
	    Base.prototype.set = function (name, value) {
	        this.remove(name);
	        this.append(name, value);
	        return this;
	    };
	    Base.prototype.append = function (name, value) {
	        if (Array.isArray(value)) {
	            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
	                var val = value_1[_i];
	                if (val != null) {
	                    this.rawHeaders.push(name, val);
	                }
	            }
	        }
	        else {
	            if (value != null) {
	                this.rawHeaders.push(name, value);
	            }
	        }
	        return this;
	    };
	    Base.prototype.name = function (name) {
	        var lowered = lowerHeader(name);
	        var headerName;
	        for (var i = 0; i < this.rawHeaders.length; i += 2) {
	            if (lowerHeader(this.rawHeaders[i]) === lowered) {
	                headerName = this.rawHeaders[i];
	            }
	        }
	        return headerName;
	    };
	    Base.prototype.get = function (name) {
	        var lowered = lowerHeader(name);
	        for (var i = 0; i < this.rawHeaders.length; i += 2) {
	            if (lowerHeader(this.rawHeaders[i]) === lowered) {
	                return this.rawHeaders[i + 1];
	            }
	        }
	    };
	    Base.prototype.getAll = function (name) {
	        var lowered = lowerHeader(name);
	        var result = [];
	        for (var i = 0; i < this.rawHeaders.length; i += 2) {
	            if (lowerHeader(this.rawHeaders[i]) === lowered) {
	                result.push(this.rawHeaders[i + 1]);
	            }
	        }
	        return result;
	    };
	    Base.prototype.remove = function (name) {
	        var lowered = lowerHeader(name);
	        var len = this.rawHeaders.length;
	        while ((len -= 2) >= 0) {
	            if (lowerHeader(this.rawHeaders[len]) === lowered) {
	                this.rawHeaders.splice(len, 2);
	            }
	        }
	        return this;
	    };
	    Base.prototype.type = function (value) {
	        if (arguments.length === 0) {
	            return type(this.get('Content-Type'));
	        }
	        return this.set('Content-Type', value);
	    };
	    return Base;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Base;
	//# sourceMappingURL=base.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var punycode = __webpack_require__(15);
	var util = __webpack_require__(17);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(18);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module), (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(19);
	exports.encode = exports.stringify = __webpack_require__(20);


/***/ },
/* 19 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var makeErrorCause = __webpack_require__(22);
	var PopsicleError = (function (_super) {
	    __extends(PopsicleError, _super);
	    function PopsicleError(message, code, original, popsicle) {
	        _super.call(this, message, original);
	        this.name = 'PopsicleError';
	        this.code = code;
	        this.popsicle = popsicle;
	    }
	    return PopsicleError;
	}(makeErrorCause.BaseError));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PopsicleError;
	//# sourceMappingURL=error.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var makeError = __webpack_require__(23);
	function makeErrorCause(value, _super) {
	    if (_super === void 0) { _super = makeErrorCause.BaseError; }
	    return makeError(value, _super);
	}
	var makeErrorCause;
	(function (makeErrorCause) {
	    var BaseError = (function (_super) {
	        __extends(BaseError, _super);
	        function BaseError(message, cause) {
	            _super.call(this, message);
	            this.cause = cause;
	        }
	        BaseError.prototype.toString = function () {
	            return _super.prototype.toString.call(this) + (this.cause ? "\nCaused by: " + this.cause.toString() : '');
	        };
	        return BaseError;
	    }(makeError.BaseError));
	    makeErrorCause.BaseError = BaseError;
	})(makeErrorCause || (makeErrorCause = {}));
	module.exports = makeErrorCause;
	//# sourceMappingURL=index.js.map

/***/ },
/* 23 */
/***/ function(module, exports) {

	// ISC @ Julien Fontanet
	
	'use strict'
	
	// ===================================================================
	
	var defineProperty = Object.defineProperty
	
	// -------------------------------------------------------------------
	
	var captureStackTrace = Error.captureStackTrace
	if (!captureStackTrace) {
	  captureStackTrace = function captureStackTrace (error) {
	    var container = new Error()
	
	    defineProperty(error, 'stack', {
	      configurable: true,
	      get: function getStack () {
	        var stack = container.stack
	
	        // Replace property with value for faster future accesses.
	        defineProperty(this, 'stack', {
	          value: stack
	        })
	
	        return stack
	      },
	      set: function setStack (stack) {
	        defineProperty(error, 'stack', {
	          configurable: true,
	          value: stack,
	          writable: true
	        })
	      }
	    })
	  }
	}
	
	// -------------------------------------------------------------------
	
	function BaseError (message) {
	  if (message) {
	    defineProperty(this, 'message', {
	      configurable: true,
	      value: message,
	      writable: true
	    })
	  }
	
	  var cname = this.constructor.name
	  if (
	    cname &&
	    cname !== this.name
	  ) {
	    defineProperty(this, 'name', {
	      configurable: true,
	      value: cname,
	      writable: true
	    })
	  }
	
	  captureStackTrace(this, this.constructor)
	}
	
	BaseError.prototype = Object.create(Error.prototype, {
	  // See: https://github.com/JsCommunity/make-error/issues/4
	  constructor: {
	    configurable: true,
	    value: BaseError,
	    writable: true
	  }
	})
	
	// -------------------------------------------------------------------
	
	// Sets the name of a function if possible (depends of the JS engine).
	var setFunctionName = (function () {
	  function setFunctionName (fn, name) {
	    return defineProperty(fn, 'name', {
	      configurable: true,
	      value: name
	    })
	  }
	  try {
	    var f = function () {}
	    setFunctionName(f, 'foo')
	    if (f.name === 'foo') {
	      return setFunctionName
	    }
	  } catch (_) {}
	})()
	
	// -------------------------------------------------------------------
	
	function makeError (constructor, super_) {
	  if (super_ == null || super_ === Error) {
	    super_ = BaseError
	  } else if (typeof super_ !== 'function') {
	    throw new TypeError('super_ should be a function')
	  }
	
	  var name
	  if (typeof constructor === 'string') {
	    name = constructor
	    constructor = function () { super_.apply(this, arguments) }
	
	    // If the name can be set, do it once and for all.
	    if (setFunctionName) {
	      setFunctionName(constructor, name)
	      name = null
	    }
	  } else if (typeof constructor !== 'function') {
	    throw new TypeError('constructor should be either a string or a function')
	  }
	
	  // Also register the super constructor also as `constructor.super_` just
	  // like Node's `util.inherits()`.
	  constructor.super_ = constructor['super'] = super_
	
	  var properties = {
	    constructor: {
	      configurable: true,
	      value: constructor,
	      writable: true
	    }
	  }
	
	  // If the name could not be set on the constructor, set it on the
	  // prototype.
	  if (name != null) {
	    properties.name = {
	      configurable: true,
	      value: name,
	      writable: true
	    }
	  }
	  constructor.prototype = Object.create(super_.prototype, properties)
	
	  return constructor
	}
	exports = module.exports = makeError
	exports.BaseError = BaseError


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var base_1 = __webpack_require__(13);
	var Response = (function (_super) {
	    __extends(Response, _super);
	    function Response(options) {
	        _super.call(this, options);
	        this.body = options.body;
	        this.status = options.status;
	        this.statusText = options.statusText;
	    }
	    Response.prototype.statusType = function () {
	        return ~~(this.status / 100);
	    };
	    Response.prototype.toJSON = function () {
	        return {
	            url: this.url,
	            headers: this.headers,
	            body: this.body,
	            status: this.status,
	            statusText: this.statusText
	        };
	    };
	    return Response;
	}(base_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Response;
	//# sourceMappingURL=response.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(26));
	//# sourceMappingURL=browser.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Promise = __webpack_require__(9);
	var FormData = __webpack_require__(5);
	var arrify = __webpack_require__(8);
	var querystring_1 = __webpack_require__(18);
	var index_1 = __webpack_require__(27);
	var form_1 = __webpack_require__(28);
	var JSON_MIME_REGEXP = /^application\/(?:[\w!#\$%&\*`\-\.\^~]*\+)?json$/i;
	var URL_ENCODED_MIME_REGEXP = /^application\/x-www-form-urlencoded$/i;
	var FORM_MIME_REGEXP = /^multipart\/form-data$/i;
	var JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;
	function wrap(value) {
	    return function () { return value; };
	}
	exports.wrap = wrap;
	exports.headers = wrap(function (request, next) {
	    if (!request.get('Accept')) {
	        request.set('Accept', '*/*');
	    }
	    request.remove('Host');
	    return next();
	});
	exports.stringify = wrap(function (request, next) {
	    var body = request.body;
	    if (Object(body) !== body) {
	        request.body = body == null ? null : String(body);
	        return next();
	    }
	    if (index_1.default(body)) {
	        return next();
	    }
	    var type = request.type();
	    if (!type) {
	        type = 'application/json';
	        request.type(type);
	    }
	    try {
	        if (JSON_MIME_REGEXP.test(type)) {
	            request.body = JSON.stringify(body);
	        }
	        else if (FORM_MIME_REGEXP.test(type)) {
	            request.body = form_1.default(body);
	        }
	        else if (URL_ENCODED_MIME_REGEXP.test(type)) {
	            request.body = querystring_1.stringify(body);
	        }
	    }
	    catch (err) {
	        return Promise.reject(request.error('Unable to stringify request body: ' + err.message, 'ESTRINGIFY', err));
	    }
	    if (request.body instanceof FormData) {
	        request.remove('Content-Type');
	    }
	    return next();
	});
	function parse(type, strict) {
	    var types = arrify(type);
	    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
	        var type_1 = types_1[_i];
	        if (type_1 !== 'json' && type_1 !== 'urlencoded') {
	            throw new TypeError("Unexpected parse type: " + type_1);
	        }
	    }
	    return function (request, next) {
	        return next()
	            .then(function (response) {
	            var body = response.body;
	            var responseType = response.type();
	            if (body == null || body === '') {
	                response.body = null;
	                return response;
	            }
	            if (responseType == null) {
	                throw request.error("Unable to parse invalid response content type", 'EPARSE');
	            }
	            if (typeof body !== 'string') {
	                throw request.error("Unable to parse non-string response body", 'EPARSE');
	            }
	            for (var _i = 0, types_2 = types; _i < types_2.length; _i++) {
	                var type_2 = types_2[_i];
	                if (type_2 === 'json' && JSON_MIME_REGEXP.test(responseType)) {
	                    try {
	                        response.body = JSON.parse(body.replace(JSON_PROTECTION_PREFIX, ''));
	                    }
	                    catch (err) {
	                        throw request.error("Unable to parse response body: " + err.message, 'EPARSE', err);
	                    }
	                    return response;
	                }
	                if (type_2 === 'urlencoded' && URL_ENCODED_MIME_REGEXP.test(responseType)) {
	                    response.body = querystring_1.parse(body);
	                    return response;
	                }
	            }
	            if (strict !== false) {
	                throw request.error("Unhandled response type: " + responseType, 'EPARSE');
	            }
	            return response;
	        });
	    };
	}
	exports.parse = parse;
	//# sourceMappingURL=common.js.map

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	function isHostObject(object) {
	    var str = Object.prototype.toString.call(object);
	    switch (str) {
	        case '[object File]':
	        case '[object Blob]':
	        case '[object FormData]':
	        case '[object ArrayBuffer]':
	            return true;
	        default:
	            return false;
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = isHostObject;
	//# sourceMappingURL=browser.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FormData = __webpack_require__(5);
	function form(obj) {
	    var form = new FormData();
	    if (obj) {
	        Object.keys(obj).forEach(function (name) {
	            form.append(name, obj[name]);
	        });
	    }
	    return form;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = form;
	//# sourceMappingURL=form.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tough_cookie_1 = __webpack_require__(30);
	function cookieJar(store) {
	    return new tough_cookie_1.CookieJar(store);
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = cookieJar;
	//# sourceMappingURL=jar.js.map

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	var CookieJar = (function () {
	    function CookieJar() {
	        throw new TypeError('Cookie jars are not available in browsers');
	    }
	    return CookieJar;
	}());
	exports.CookieJar = CookieJar;
	//# sourceMappingURL=tough-cookie.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Promise = __webpack_require__(9);
	var response_1 = __webpack_require__(24);
	var index_1 = __webpack_require__(25);
	function createTransport(options) {
	    return {
	        use: use,
	        abort: abort,
	        open: function (request) {
	            return handle(request, options);
	        }
	    };
	}
	exports.createTransport = createTransport;
	var use = [index_1.stringify(), index_1.headers()];
	function handle(request, options) {
	    return new Promise(function (resolve, reject) {
	        var type = options.type || 'text';
	        var url = request.url, method = request.method;
	        if (window.location.protocol === 'https:' && /^http\:/.test(url)) {
	            return reject(request.error("The request to \"" + url + "\" was blocked", 'EBLOCKED'));
	        }
	        var xhr = request._raw = new XMLHttpRequest();
	        function done() {
	            return new Promise(function (resolve) {
	                return resolve(new response_1.default({
	                    status: xhr.status === 1223 ? 204 : xhr.status,
	                    statusText: xhr.statusText,
	                    rawHeaders: parseToRawHeaders(xhr.getAllResponseHeaders()),
	                    body: type === 'text' ? xhr.responseText : xhr.response,
	                    url: xhr.responseURL
	                }));
	            });
	        }
	        xhr.onload = function () { return resolve(done()); };
	        xhr.onabort = function () { return resolve(done()); };
	        xhr.onerror = function () {
	            return reject(request.error("Unable to connect to \"" + request.url + "\"", 'EUNAVAILABLE'));
	        };
	        xhr.onprogress = function (e) {
	            if (e.lengthComputable) {
	                request.downloadLength = e.total;
	            }
	            request._setDownloadedBytes(e.loaded);
	        };
	        xhr.upload.onloadend = function () { return request.downloaded = 1; };
	        if (method === 'GET' || method === 'HEAD' || !xhr.upload) {
	            request.uploadLength = 0;
	            request._setUploadedBytes(0, 1);
	        }
	        else {
	            xhr.upload.onprogress = function (e) {
	                if (e.lengthComputable) {
	                    request.uploadLength = e.total;
	                }
	                request._setUploadedBytes(e.loaded);
	            };
	            xhr.upload.onloadend = function () { return request.uploaded = 1; };
	        }
	        try {
	            xhr.open(method, url);
	        }
	        catch (e) {
	            return reject(request.error("Refused to connect to \"" + url + "\"", 'ECSP', e));
	        }
	        if (options.withCredentials) {
	            xhr.withCredentials = true;
	        }
	        if (options.overrideMimeType) {
	            xhr.overrideMimeType(options.overrideMimeType);
	        }
	        if (type !== 'text') {
	            try {
	                xhr.responseType = type;
	            }
	            finally {
	                if (xhr.responseType !== type) {
	                    return reject(request.error("Unsupported type: " + type, 'ETYPE'));
	                }
	            }
	        }
	        for (var i = 0; i < request.rawHeaders.length; i += 2) {
	            xhr.setRequestHeader(request.rawHeaders[i], request.rawHeaders[i + 1]);
	        }
	        xhr.send(request.body);
	    });
	}
	function abort(request) {
	    request._raw.abort();
	}
	function parseToRawHeaders(headers) {
	    var rawHeaders = [];
	    var lines = headers.split(/\r?\n/);
	    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
	        var line = lines_1[_i];
	        if (line) {
	            var indexOf = line.indexOf(':');
	            var name_1 = line.substr(0, indexOf).trim();
	            var value = line.substr(indexOf + 1).trim();
	            rawHeaders.push(name_1, value);
	        }
	    }
	    return rawHeaders;
	}
	//# sourceMappingURL=browser.js.map

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";


/***/ }
/******/ ]);
//# sourceMappingURL=seaters.bundle.js.map