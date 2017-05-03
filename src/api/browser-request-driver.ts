import { Promise } from 'es6-promise';

import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

declare const window: any;
declare type XMLHttpRequest = any;

const READY_STATE_DONE = 4; // xhr readyState 4 means the request is done.

function buildServerResponse (xhr: XMLHttpRequest): ServerResponse {
  return {
    status: xhr.status,
    statusText: xhr.statusText,
    body: xhr.responseText,
    headers: Object,
    driver: 'BROWSER',
    raw: xhr
  };
}

function buildXhr (options: RequestOptions): XMLHttpRequest {
  let xhr = new window.XMLHttpRequest();
  xhr.open(options.method, options.url);
  let headers = options.headers;
  if (headers) {
    Object.keys(headers).forEach(header => {
      let value = headers[header];
      xhr.setRequestHeader(header, value);
    });
  }
  xhr.send(options.body);
  return xhr;
}

export function BrowserRequestDriver (options: RequestOptions): Promise<ServerResponse> {

  let xhr = buildXhr(options);

  let deferred = new DeferredPromise<ServerResponse>();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === READY_STATE_DONE) {
      deferred.resolve(buildServerResponse(xhr));
    }
  };

  return deferred.promise;
}
