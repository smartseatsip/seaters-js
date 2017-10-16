import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

declare const window: any;
declare type XMLHttpRequest = any;

const READY_STATE_DONE = 4; // xhr readyState 4 means the request is done.

function buildServerResponse(xhr: XMLHttpRequest): ServerResponse {
  return {
    status: xhr.status,
    statusText: xhr.statusText,
    body: xhr.responseText,
    headers: Object,
    driver: 'BROWSER',
    raw: xhr
  };
}

function buildXhr(options: RequestOptions): XMLHttpRequest {
  const xhr = new window.XMLHttpRequest();
  xhr.open(options.method, options.url);
  const headers = options.headers;
  if (headers) {
    Object.keys(headers).forEach(header => {
      const value = headers[header];
      xhr.setRequestHeader(header, value);
    });
  }
  xhr.send(options.body);
  return xhr;
}

export default function(options: RequestOptions): Promise<ServerResponse> {
  const xhr = buildXhr(options);

  const deferred = new DeferredPromise<ServerResponse>();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === READY_STATE_DONE) {
      deferred.resolve(buildServerResponse(xhr));
    }
  };

  return deferred.promise;
}
