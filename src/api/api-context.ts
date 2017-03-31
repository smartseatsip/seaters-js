import { Subject } from '../services/util/subject';
import { Map, Object } from 'core-js/library';
import { Promise } from 'es6-promise';

import { ApiRequestDefinition } from './api-request-definition';
import { ApiRequest } from './api-request';
import { ApiEndpoint } from './api-endpoint';
import { ApiError, ERROR_TYPE } from './api-error';

import { RequestDriver, RequestOptions, ServerResponse } from './request-driver';

export type ResponseModifier = (res: ServerResponse) => any;

export type RequestErrorModifier = (err: any) => any;

export class ApiContext {

    private requestsSubject: Subject<ApiRequest>;

    private headers: Map<string, string>;

    constructor (
        private apiPrefix: string,
        private requestDriver: RequestDriver
    ) {
        this.requestsSubject = new Subject<ApiRequest>();
        this.headers = new Map<string, string>();
        this.headers.set('Content-Type', 'application/json');
    }

    setHeader (header: string, value: string) {
        this.headers.set(header, value);
    }

    unsetHeader (header: string) {
        this.headers.delete(header);
    }

    private mergeHeaders (otherHeaders: any) {
        var merged = {};
        this.headers.forEach((v,k) => merged[k] = v);
        return Object.assign(merged, otherHeaders);
    }

    createEndpoint (requestDefinition: ApiRequestDefinition): ApiEndpoint {
        return new ApiEndpoint(
            requestDefinition.abstractEndpoint,
            requestDefinition.endpointParams || {},
            requestDefinition.queryParams || {},
            this.apiPrefix
        );
    }

    createRequestOptions (requestDefinition: ApiRequestDefinition, endpoint: ApiEndpoint) : RequestOptions {
        var headers = this.mergeHeaders(requestDefinition.headers);
        var body = requestDefinition.body !== undefined ? JSON.stringify(requestDefinition.body) : null;
        return {
            url: endpoint.absoluteEndpoint,
            method: requestDefinition.method || 'GET',
            headers: headers,
            body: body
        };
    }

    doRequest (requestDefinition: ApiRequestDefinition): Promise<ServerResponse> {
        var endpoint = this.createEndpoint(requestDefinition);
        var requestOptions = this.createRequestOptions(requestDefinition, endpoint);
        var request = this.requestDriver(requestOptions);
        var apiRequest: ApiRequest = {
            requestDefinition: requestDefinition,
            endpoint: endpoint,
            rawRequest: {
                options: requestOptions,
                promise: request
            }
        };
        // notify all request listeners about the request that was just started
        this.requestsSubject.next(apiRequest);
        return request;
    }

}
