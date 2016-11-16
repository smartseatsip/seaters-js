import * as popsicle from 'popsicle';
import { ApiRequestDefinition } from './api-request-definition';
import { ApiEndpoint } from './api-endpoint';
export declare class ApiContext {
    private apiPrefix;
    private requestsSubject;
    private headers;
    constructor(apiPrefix: string);
    setHeader(header: string, value: string): void;
    unsetHeader(header: string): void;
    createEndpoint(requestDefinition: ApiRequestDefinition): ApiEndpoint;
    createPopsicleRequestOptions(requestDefinition: ApiRequestDefinition, endpoint: ApiEndpoint): any;
    doRawRequest(requestDefinition: ApiRequestDefinition): Promise<popsicle.Response>;
    doJsonRequest<T>(requestDefinition: ApiRequestDefinition): Promise<T>;
    handle2XXResponse<T>(response: popsicle.Response): Promise<T>;
    tryParseJSON(json: string): any;
    handleUnexpectedResponse<T>(response: popsicle.Response): Promise<T>;
    handle4XXResponse<T>(response: popsicle.Response): Promise<T>;
    handleResponse<T>(response: popsicle.Response): Promise<T>;
    doRequest<T>(requestDefinition: ApiRequestDefinition): Promise<T>;
    get<T>(abstractEndpoint: string, endpointParams?: Map<string, string>, queryParams?: Map<string, string>): Promise<T>;
    put<T>(abstractEndpoint: string, body?: any, endpointParams?: Map<string, string>, queryParams?: Map<string, string>): Promise<T>;
    post<T>(abstractEndpoint: string, body?: any, endpointParams?: Map<string, string>, queryParams?: Map<string, string>): Promise<T>;
}
