import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

declare function require(str: string): any;

const http = require('http');
const https = require('https');
const url = require('url');

function buildHttpRequest(options: RequestOptions) {
  const parsedUrl = url.parse(options.url);
  return {
    method: options.method || 'GET',
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    headers: options.headers
  };
}

function buildServerResponse(req, res, body: string): ServerResponse {
  return {
    status: res.statusCode,
    statusText: res.statusMessage,
    body,
    headers: Object,
    driver: 'NODE',
    raw: { req, res }
  };
}

export default function(options: RequestOptions): Promise<ServerResponse> {
  const deferred = new DeferredPromise<ServerResponse>();

  const rawRequest = buildHttpRequest(options);
  const requestProvider = rawRequest.protocol === 'https:' ? https : http;
  console.log('%s %s', options.method || 'GET', options.url);
  const req = requestProvider.request(rawRequest, res => {
    let body = '';
    res.on('data', chunk => (body += chunk));
    res.on('end', () => deferred.resolve(buildServerResponse(req, res, body)));
  });

  if (options.body) {
    console.log('data: %s', options.body);
    req.write(options.body);
  }
  req.end();

  return deferred.promise;
}
