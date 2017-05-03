import { Promise } from 'es6-promise';

export class DeferredPromise<T> {

  public promise: Promise<T>;
  public resolve: (T) => void;
  public reject: (value: any) => void;

  constructor () {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

}
