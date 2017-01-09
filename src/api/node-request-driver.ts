import { HTTP_METHOD } from './http-method';
import { Promise } from 'es6-promise';
import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

declare function require (string): any;

var http = require('http');
var url = require('url');

function buildHttpRequest(options: RequestOptions) {
    var parsedUrl = url.parse(options.url);
    return {
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.path+parsedUrl.search,
        headers: options.headers
    }
}

function buildServerResponse (req, res, body: string): ServerResponse {
    return {
        status: res.status,
        statusText: res.statusText,
        body: body,
        headers: Object,
        driver: 'NODE',
        raw: { req: req, res: res }
    };
}

export function NodeRequestDriver (options: RequestOptions): Promise<ServerResponse> {

    var deferred = new DeferredPromise<ServerResponse>();

    var req = http.request(buildHttpRequest, (res) => {
        var body = '';
        res.on('data', chunk => body += chunk)
        res.on('end', () => deferred.resolve(buildServerResponse(req, res, body)));
    });

    req.write(options.body);
    req.end();

    return deferred.promise;

}