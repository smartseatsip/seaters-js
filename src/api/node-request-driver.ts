import { HTTP_METHOD } from './http-method';
import { Promise } from 'es6-promise';
import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

declare function require (string): any;

var http = require('http');
var https = require('https');
var url = require('url');

function buildHttpRequest(options: RequestOptions) {
    var parsedUrl = url.parse(options.url);
    return {
        method: options.method || 'GET',
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.path,
        headers: options.headers
    }
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

export function NodeRequestDriver (options: RequestOptions): Promise<ServerResponse> {

    var deferred = new DeferredPromise<ServerResponse>();

    var rawRequest = buildHttpRequest(options);
    var requestProvider = rawRequest.protocol === 'https:' ? https : http;
    console.log('%s %s', options.method || 'GET', options.url);
    var req = requestProvider.request(rawRequest, (res) => {
        var body = '';
        res.on('data', chunk => body += chunk)
        res.on('end', () => deferred.resolve(buildServerResponse(req, res, body)));
    });

    if(options.body) {
        console.log('data: %s', options.body);
        req.write(options.body);
    }
    req.end();

    return deferred.promise;

}