import { Promise } from 'es6-promise';

import { HTTP_METHOD } from './http-method';
import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

declare const window: Window;

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
  var xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  var headers = options.headers;
  if (headers) {
    Object.keys(headers).forEach(header => {
      var value = headers[header];
      xhr.setRequestHeader(header, value);
    });
  }
  xhr.send(options.body);
  return xhr;
}

export function BrowserRequestDriver (options: RequestOptions): Promise<ServerResponse> {

  var xhr = buildXhr(options);

  var deferred = new DeferredPromise<ServerResponse>();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === READY_STATE_DONE) {
      deferred.resolve(buildServerResponse(xhr));
    }
  };

  return deferred.promise;
}
