import * as popsicle from 'popsicle';
import { ApiRequestDefinition } from './api-request-definition';
import { ApiRequest } from './api-request';
import { Subject } from 'rxjs';
import { ApiEndpoint } from './api-endpoint';

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

}