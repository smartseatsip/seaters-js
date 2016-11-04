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
    doRequest(requestDefinition: ApiRequestDefinition): Promise<popsicle.Response>;
}
