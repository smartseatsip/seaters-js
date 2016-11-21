import { Subject } from 'rxjs';
import * as popsicle from 'popsicle';
import * as core from 'core-js/library';
import { ApiRequestDefinition } from './api-request-definition';
import { ApiRequest } from './api-request';
import { ApiEndpoint } from './api-endpoint';
import { ApiError, ERROR_TYPE } from './api-error';

export class ApiContext {

    private requestsSubject: Subject<ApiRequest>;

    private headers: Map<string, string>;

    constructor (private apiPrefix: string) {
        this.requestsSubject = new Subject<ApiRequest>();
        this.headers = new core.Map<string, string>();
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
        return core.Object.assign(merged, otherHeaders);
    }

    createEndpoint (requestDefinition: ApiRequestDefinition): ApiEndpoint {
        return new ApiEndpoint(
            requestDefinition.abstractEndpoint,
            requestDefinition.endpointParams || new core.Map<string, string>(),
            requestDefinition.queryParams || new core.Map<string, string>(),
            this.apiPrefix
        );
    }

    createPopsicleRequestOptions (requestDefinition: ApiRequestDefinition, endpoint: ApiEndpoint) : any {
        var headers = this.mergeHeaders(requestDefinition.headers);
        return {
            url: endpoint.absoluteEndpoint,
            method: requestDefinition.method || 'GET',
            query: requestDefinition.queryParams,
            headers: headers,
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
        this.requestsSubject.next(apiRequest);
        return popsicleRequest;
    }

    doJsonRequest<T> (requestDefinition: ApiRequestDefinition): Promise<T> {
        return this.doRawRequest(requestDefinition)
            .then(response => JSON.parse(response.body));
    }

    handle2XXResponse<T> (response: popsicle.Response): Promise<T> {
        return Promise.resolve(JSON.parse(response.body));
    }

    tryParseJSON (json: string) {
        try {
            return JSON.parse(json);
        } catch (_error) {
            return json;
        }
    }

    handleUnexpectedResponse<T> (response: popsicle.Response): Promise<T> {
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

    handle4XXResponse<T> (response: popsicle.Response): Promise<T> {
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

    handleResponse<T> (response: popsicle.Response): Promise<T> {
        switch(response.status) {
            case 200:
            case 201:
            case 204: return this.handle2XXResponse(response);
            case 400: return this.handle4XXResponse(response);
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

    public get<T> (
        abstractEndpoint: string,
        endpointParams?: Map<string, string>,
        queryParams?: Map<string, string>
    ): Promise<T> {
        return this.doRequest({
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || new core.Map<string, string>(),
            queryParams: queryParams || new core.Map<string, string>()
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
            endpointParams: endpointParams || new core.Map<string, string>(),
            queryParams: queryParams || new core.Map<string, string>(),
            body: body
        });
    }

    public post<T> (
      abstractEndpoint: string,
      body?: any,
      endpointParams?: Map<string, string>,
      queryParams?: Map<string, string>
    ): Promise<T> {
        console.log('endpointParams', endpointParams);
      return this.doRequest({
          method: 'POST',
          abstractEndpoint: abstractEndpoint,
          endpointParams: endpointParams || new core.Map<string, string>(),
          queryParams: queryParams || new core.Map<string, string>(),
          body: body
      });
    }

    public static buildEndpointParams(obj: Object): Map<string, string> {
        var map = new core.Map<string, string>();
        Object.keys(obj).forEach(k => map.set(k, obj[k]));
        return map;
    }

}
