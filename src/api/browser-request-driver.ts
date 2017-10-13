import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

declare const window: any;
declare const console: any;
declare type XMLHttpRequest = any;
declare type HTMLInputElement = any;

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

function formDataBody (filesInputElement: HTMLInputElement) {
  let formData = new window.FormData();
  formData.append('file', filesInputElement.files[0]);
  return formData;
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
  var body = options.formData ? formDataBody(options.formData) : options.body;
  console.debug('%s %s', options.method, options.url, body);
  xhr.send(body);
  return xhr;
}

export default function (options: RequestOptions): Promise<ServerResponse> {

  let xhr = buildXhr(options);

  let deferred = new DeferredPromise<ServerResponse>();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === READY_STATE_DONE) {
      deferred.resolve(buildServerResponse(xhr));
    }
  };

  return deferred.promise;
}
