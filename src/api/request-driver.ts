import { HTTP_METHOD } from './http-method';
import { Promise } from 'es6-promise';

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