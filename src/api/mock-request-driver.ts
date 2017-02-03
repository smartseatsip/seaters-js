import { HTTP_METHOD } from './http-method';
import { Promise } from 'es6-promise';
import { ServerResponse, RequestOptions } from './request-driver';
import { DeferredPromise } from './../services/util';

function getPathFromUrl (url) {
    return /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/.exec(url)[3];
}

export function buildMockRequestDriver (mockData: any) {

    if(!mockData) {
        throw new Error('[MockRequestDriver] mockData not supplied');
    }

    return function (options: RequestOptions): Promise<ServerResponse> {
        var explicitKey = options.method + ' ' + options.url;
        var key = options.method + ' /' + getPathFromUrl(options.url);
        var mock;
        if(mockData.hasOwnProperty(explicitKey)) {
            mock = mockData[explicitKey];
        } else if(mockData.hasOwnProperty(key)) {
            mock = mockData[key];
        } else {
            console.log(mockData, key);
            return Promise.reject('[MockRequestDriver] Not Implemented: ' + key);
        }
        var response: ServerResponse;
        if(typeof(mock) === 'function') {
            response = mock(options);
        } else if(typeof(mock) === 'object') {
            response = mock;
        } else {
            return Promise.reject('[MockRequestDriver] Invalid Mock: ' + key);
        }
        // serialize body if needed
        if(typeof(response.body) === 'object') {
            response.body = JSON.stringify(response.body);
        }
        response.driver = 'MOCK';
        return Promise.resolve(response);
    };

}