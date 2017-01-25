import { HTTP_METHOD } from './http-method';
import { Promise } from 'es6-promise';

import { NodeRequestDriver } from './node-request-driver';
import { BrowserRequestDriver } from './browser-request-driver';

export type REQUEST_DRIVER_TYPE = 'BROWSER' | 'NODE';

export interface ServerResponse {
    status: number,
    statusText: string,
    body: string,
    headers: Object,
    driver: REQUEST_DRIVER_TYPE,
    raw: any
}

export interface RequestOptions {
    url: string,
    method: HTTP_METHOD,
    body?: string,
    headers?: Object;
}

/**
 * Performs the request specified by the options and returns a promise
 * that will resolve once the server sent it's response.
 * The promise will be rejected when there is a network failure or
 * other technical issues with establishing the connection.
 */
export type RequestDriver = (options: RequestOptions) => Promise<ServerResponse>;

/**
 * Obtain the request driver for the given type
 */
export function getRequestDriver (type: REQUEST_DRIVER_TYPE): RequestDriver {
    switch(type) {
      case 'BROWSER': return BrowserRequestDriver;
      case 'NODE': return NodeRequestDriver;
    }
    throw new Error('Unknown request driver type: ' + type);
}