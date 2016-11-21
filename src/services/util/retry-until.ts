import { Promise } from 'es6-promise';

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
                console.log('[retryUntil] - condition quit with an exception', e.stack);
                return Promise.reject(e);
            }

            if (conditionIsMet) {
                console.log('[retryUntil] - condition has been met');
                return Promise.resolve(result);
            } else {
                // delay the next attempt if needed
                return timeoutPromise(delay || 0)
                .then(() => retry(attempt+1));
            }
        });
    }

    return retry(1);

}

function timeoutPromise (timeInMs): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), timeInMs);
    });
}
