import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

declare function require (str: string): any;

let http = require('http');
let https = require('https');
let url = require('url');

function buildHttpRequest (options: RequestOptions) {
  let parsedUrl = url.parse(options.url);
  return {
    method: options.method || 'GET',
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    headers: options.headers
  };
}

function buildServerResponse (req, res, body: string): ServerResponse {
  return {
    status: res.statusCode,
    statusText: res.statusMessage,
    body: body,
    headers: Object,
    driver: 'NODE',
    raw: { req: req, res: res }
  };
}

export default function (options: RequestOptions): Promise<ServerResponse> {

  let deferred = new DeferredPromise<ServerResponse>();

  let rawRequest = buildHttpRequest(options);
  let requestProvider = rawRequest.protocol === 'https:' ? https : http;
  console.log('%s %s', options.method || 'GET', options.url);
  let req = requestProvider.request(rawRequest, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => deferred.resolve(buildServerResponse(req, res, body)));
  });

  if (options.body) {
    console.log('data: %s', options.body);
    req.write(options.body);
  }
  req.end();

  return deferred.promise;

}
