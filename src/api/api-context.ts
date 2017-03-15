import { Subject } from '../services/util/subject';
import { Map, Object } from 'core-js/library';
import { Promise } from 'es6-promise';

import { ApiRequestDefinition } from './api-request-definition';
import { ApiRequest } from './api-request';
import { ApiEndpoint } from './api-endpoint';
import { ApiError, ERROR_TYPE } from './api-error';

import { RequestDriver, RequestOptions, ServerResponse } from './request-driver';

export class ApiContext {

    private requestsSubject: Subject<ApiRequest>;

    private headers: Map<string, string>;

    constructor (private apiPrefix: string, private requestDriver: RequestDriver) {
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
            requestDefinition.endpointParams || new Map<string, string>(),
            requestDefinition.queryParams || new Map<string, string>(),
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

    public doRawRequest (requestDefinition: ApiRequestDefinition): Promise<ServerResponse> {
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

    doJsonRequest<T> (requestDefinition: ApiRequestDefinition): Promise<T> {
        return this.doRawRequest(requestDefinition)
            .then(response => JSON.parse(response.body));
    }

    handle2XXResponse<T> (response: ServerResponse): Promise<T> {
        if (response.body.length > 0) {
            return Promise.resolve(JSON.parse(response.body));
        } else {
          return Promise.resolve(null);
        }
    }

    tryParseJSON (json: string) {
        try {
            return JSON.parse(json);
        } catch (_error) {
            return json;
        }
    }

    handleUnexpectedResponse<T> (response: ServerResponse): Promise<T> {
        var apiError: ApiError;
        if(response instanceof Error) {
            apiError = {
                rawResponse: response,
                type: ERROR_TYPE.CLIENT,
                error: 'api_unexpected-error',
                errorMsg: response.toString()
            }
        }
        else {
            apiError = {
                rawResponse: response,
                type: ERROR_TYPE.SERVER,
                error: 'api_unexpected-error',
                errorMsg: 'status: ' + response.status + ' ' + response.statusText + '\n' +
                    response.body
            };
        }
        return Promise.reject<T>(apiError);
    }

    handle4XXResponse<T> (response: ServerResponse): Promise<T> {
        var body = this.tryParseJSON(response.body);
        var error: ApiError;
        if (!body) {
            response.body = 'Empty body in 400 response';
            return this.handleUnexpectedResponse(response);
        } else if (typeof(body) === 'string') {
            error = {
                rawResponse: response,
                type: ERROR_TYPE.SERVER,
                error: 'api_general-error',
                errorMsg: response.body
            };
        } else {
            error = body;
            error.rawResponse = response;
            error.type = ERROR_TYPE.CLIENT;
        }
        return Promise.reject<T>(error);
    }

    handleResponse<T> (response: ServerResponse): Promise<T> {
        switch(response.status) {
            case 200:
            case 201:
            case 202:
            case 204: return this.handle2XXResponse(response);
            case 400:
            case 410:
            case 422: return this.handle4XXResponse(response);
            default: return this.handleUnexpectedResponse(response);
        }
    }

    public doRequest<T> (requestDefinition: ApiRequestDefinition) : Promise<T> {
        return this.doRawRequest(requestDefinition)
        .then(
            (response) => this.handleResponse(response),
            (error) => this.handleUnexpectedResponse(error)
        );
    }

    public doStringRequest (requestDefinition: ApiRequestDefinition) : Promise<string> {
        return this.doRawRequest(requestDefinition)
        .then(
            (response) => response.body,
            (error) => this.handleUnexpectedResponse(error)
        );
    }

    public get<T> (
        abstractEndpoint: string,
        endpointParams?: Map<string, string>,
        queryParams?: Map<string, string>
    ): Promise<T> {
        return this.doRequest({
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || new Map<string, string>(),
            queryParams: queryParams || new Map<string, string>()
        });
    }

    public put<T> (
        abstractEndpoint: string,
        body?: any,
        endpointParams?: Map<string, string>,
        queryParams?: Map<string, string>
    ): Promise<T> {
        return this.doRequest({
            method: 'PUT',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || new Map<string, string>(),
            queryParams: queryParams || new Map<string, string>(),
            body: body
        });
    }

    public post<T> (
      abstractEndpoint: string,
      body?: any,
      endpointParams?: Map<string, string>,
      queryParams?: Map<string, string>
    ): Promise<T> {
      return this.doRequest({
          method: 'POST',
          abstractEndpoint: abstractEndpoint,
          endpointParams: endpointParams || new Map<string, string>(),
          queryParams: queryParams || new Map<string, string>(),
          body: body
      });
    }

    public delete<T> (
        abstractEndpoint: string,
        endpointParams?: Map<string, string>,
        queryParams?: Map<string, string>
    ) {
        return this.doRequest({
            method: 'DELETE',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || new Map<string, string>(),
            queryParams: queryParams || new Map<string, string>()
        });
    }

    public static buildEndpointParams(obj: Object): Map<string, string> {
        var map = new Map<string, string>();
        Object.keys(obj).forEach(k => map.set(k, obj[k]));
        return map;
    }

}
