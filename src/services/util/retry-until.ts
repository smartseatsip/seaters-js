import { DeferredPromise } from './deferred-promise';

export type PromiseFn<T> = () => Promise<T>;

export type ConditionFn<T> = (t: T) => boolean;

export class RetryUntilTimeoutError extends Error {
  constructor(public limit: number) {
    super('retryUntil - maximum number of tries was reached (' + limit + ')');
  }
}

export function retryUntil<T>(
  promiseFn: PromiseFn<T>,
  conditionFn: ConditionFn<T>,
  limit: number,
  delay: number
): Promise<T> {
  const deferred = new DeferredPromise<T>();

  function retry(attempt) {
    if (attempt > limit) {
      console.log('[retryUntil] - polling timeout');
      return deferred.reject(new RetryUntilTimeoutError(limit));
    }
    /* tslint:disable:no-floating-promises */
    promiseFn().then(result => {
      let conditionIsMet;
      try {
        conditionIsMet = conditionFn(result);
      } catch (e) {
        console.log('[retryUntil] - condition quit with an exception', e.message || e, e.stack || '<no stacktrace>');
        deferred.reject((e.toString && e.toString()) || e);
        return undefined;
      }

      if (conditionIsMet) {
        console.log('[retryUntil] - condition has been met');
        deferred.resolve(result);
        return undefined;
      } else {
        // delay the next attempt if needed
        return timeoutPromise(delay || 0).then(() => retry(attempt + 1));
      }
    });
    /* tslint:enable:no-floating-promises */
  }

  retry(1);
  return deferred.promise;
}

export function timeoutPromise(timeInMs): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), timeInMs);
  });
}
