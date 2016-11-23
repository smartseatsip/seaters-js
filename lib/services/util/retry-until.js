"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var es6_promise_1 = require('es6-promise');
var RetryUntilTimeoutError = (function (_super) {
    __extends(RetryUntilTimeoutError, _super);
    function RetryUntilTimeoutError(limit) {
        _super.call(this, 'retryUntil - maximum number of tries was reached (' + limit + ')');
        this.limit = limit;
    }
    return RetryUntilTimeoutError;
}(Error));
exports.RetryUntilTimeoutError = RetryUntilTimeoutError;
function retryUntil(promiseFn, conditionFn, limit, delay) {
    function retry(attempt) {
        if (attempt > limit) {
            return es6_promise_1.Promise.reject(new RetryUntilTimeoutError(limit));
        }
        console.log('[retryUntil] - polling ... (%s/%s)', attempt, limit);
        promiseFn().then(function (result) {
            var conditionIsMet;
            try {
                conditionIsMet = conditionFn(result);
            }
            catch (e) {
                console.log('[retryUntil] - condition quit with an exception', e.stack);
                return es6_promise_1.Promise.reject(e);
            }
            if (conditionIsMet) {
                console.log('[retryUntil] - condition has been met');
                return es6_promise_1.Promise.resolve(result);
            }
            else {
                // delay the next attempt if needed
                return timeoutPromise(delay || 0)
                    .then(function () { return retry(attempt + 1); });
            }
        });
    }
    return retry(1);
}
exports.retryUntil = retryUntil;
function timeoutPromise(timeInMs) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        setTimeout(function () { return resolve(); }, timeInMs);
    });
}
