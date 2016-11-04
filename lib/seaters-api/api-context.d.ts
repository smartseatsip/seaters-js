import * as popsicle from 'popsicle';
import { ApiRequestDefinition } from './api-request-definition';
export declare class ApiContext {
    private apiPrefix;
    private requestStartedSubject;
    constructor(apiPrefix: string);
    prefixConcreteEndpoint(concreteEndpoint: string): string;
    renderAbsoluteEndpoint(concreteEndpoint: string, queryParams: Map<string, string>): string;
    renderConcreteEndpoint(request: ApiRequestDefinition): string;
    private createEndpoint(requestDefinition);
    private createPopsicleRequestOptions(requestDefinition, endpoint);
    doRawRequest(requestDefinition: ApiRequestDefinition): Promise<popsicle.Response>;
    doJsonRequest<T>(requestDefinition: ApiRequestDefinition): Promise<T>;
    private handle2XXResponse<T>(response);
    private tryParseJSON(json);
    private handleUnexpectedResponse<T>(response);
    private handle4XXResponse<T>(response);
    private handleResponse<T>(response);
    doRequest<T>(requestDefinition: ApiRequestDefinition, status400Mappings?: Map<string, string>): Promise<{}>;
}
