import { Subject } from 'rxjs';
import * as popsicle from 'popsicle';
import { ApiRequestDefinition } from './api-request-definition';
import { ApiRequest } from './api-request';
import { ApiEndpoint } from './api-endpoint';
import { ApiError, ERROR_TYPE } from './api-error';

export class ApiContext {

    private requestStartedSubject: Subject<ApiRequest>;
    
    constructor (private apiPrefix: string) {
        this.requestStartedSubject = new Subject<ApiRequest>();
    }

    prefixConcreteEndpoint (concreteEndpoint: string): string {
        // normalize concreteEndpoint
        concreteEndpoint = concreteEndpoint.replace(/^\//, '');
        return this.apiPrefix + '/' + concreteEndpoint;
    }

    renderAbsoluteEndpoint (concreteEndpoint: string, queryParams: Map<string, string>): string {
        return concreteEndpoint;//TODO: queryParams + concreteEndpoint
    }

    renderConcreteEndpoint (request: ApiRequestDefinition): string {
        return request.abstractEndpoint;//TODO: replace endpoint params
    }

    private createEndpoint (requestDefinition: ApiRequestDefinition): ApiEndpoint {
        return new ApiEndpoint(
            requestDefinition.abstractEndpoint,
            requestDefinition.endpointParams || new Map<string, string>(),
            requestDefinition.queryParams || new Map<string, string>(),
            this.apiPrefix
        );
    }

    private createPopsicleRequestOptions (requestDefinition: ApiRequestDefinition, endpoint: ApiEndpoint) : any {
        return {
            url: endpoint.absoluteEndpoint,
            method: requestDefinition.method || 'GET',
            query: requestDefinition.queryParams,
            headers: requestDefinition.headers,
            body: requestDefinition.body
        };
    }

    public doRawRequest (requestDefinition: ApiRequestDefinition): Promise<popsicle.Response> {
        var endpoint = this.createEndpoint(requestDefinition);
        var popsicleRequestOptions = this.createPopsicleRequestOptions(requestDefinition, endpoint);
        var popsicleRequest = popsicle.request(popsicleRequestOptions);
        var apiRequest: ApiRequest = {
            requestDefinition: requestDefinition,
            endpoint: endpoint,
            popsicleRequest: popsicleRequest
        };
        this.requestStartedSubject.next(apiRequest);
        return popsicleRequest;
    }

    public doJsonRequest<T> (requestDefinition: ApiRequestDefinition): Promise<T> {
        return this.doRawRequest(requestDefinition)
            .then(response => JSON.parse(response.body));
    }

    private handle2XXResponse<T> (response: popsicle.Response): Promise<T> {
        return Promise.resolve(JSON.parse(response.body));
    }

    private tryParseJSON (json: string) {
        try {
            return JSON.parse(json);
        } catch (_error) {
            return json;
        }
    }

    private handleUnexpectedResponse<T> (response: popsicle.Response): Promise<T> {
        var error: ApiError = {
            rawResponse: response,
            type: ERROR_TYPE.SERVER,
            error: 'api_unexpected-error',
            errorMsg: 'status: ' + response.status + ' ' + response.statusText + '\n' +
                response.body
        };
        return Promise.reject<T>(error);
    }
    
    private handle4XXResponse<T> (response: popsicle.Response): Promise<T> {
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

    private handleResponse<T> (response: popsicle.Response): Promise<T> {
        switch(response.status) {
            case 200:
            case 201:
            case 204: return this.handle2XXResponse(response);
            case 400: return this.handle4XXResponse(response);
            default: return this.handleUnexpectedResponse(response);
        }
    }

    public doRequest<T> (requestDefinition: ApiRequestDefinition, status400Mappings?: Map<string, string>) {
        return this.doRawRequest(requestDefinition)
        .then((response) => this.handleResponse(response), (error) => this.handleUnexpectedResponse(error));
    }

}