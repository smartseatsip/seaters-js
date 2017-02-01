import { Promise } from 'es6-promise';

import  { DeferredPromise } from './deferred-promise';

export type PromiseFn<T> = () => Promise<T>;

export type ConditionFn<T> = (t:T) => boolean;

export class RetryUntilTimeoutError extends Error {

    constructor (public limit: number) {
        super('retryUntil - maximum number of tries was reached (' + limit + ')');
    }

}

export function retryUntil<T> (
    promiseFn: PromiseFn<T>,
    conditionFn: ConditionFn<T>,
    limit: number,
    delay: number
): Promise<T> {
    var deferred = new DeferredPromise<T> ();

    function retry (attempt) {
        if(attempt > limit) {
            return Promise.reject(new RetryUntilTimeoutError(limit));
        }
        console.log('[retryUntil] - polling ... (%s/%s)', attempt, limit);
        promiseFn().then(result => {
            var conditionIsMet;
            try {
                conditionIsMet = conditionFn(result);
            } catch (e) {
                console.log('[retryUntil] - condition quit with an exception', e.message || e, e.stack || '<no stacktrace>');
                deferred.reject(e.toString && e.toString() || e);
                return;
            }

            if (conditionIsMet) {
                console.log('[retryUntil] - condition has been met');
                deferred.resolve(result);
                return;
            } else {
                // delay the next attempt if needed
                return timeoutPromise(delay || 0)
                .then(() => retry(attempt+1));
            }
        });
    }

    retry(1);
    return deferred.promise;
}

export function timeoutPromise (timeInMs): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), timeInMs);
    });
}
