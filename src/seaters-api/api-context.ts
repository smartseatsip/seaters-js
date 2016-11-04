import * as popsicle from 'popsicle';
import { ApiRequest } from './api-request';

export class ApiContext {

    constructor (private apiPrefix: string) {
        // normalize apiPrefix: remove trailing '/'
        this.apiPrefix = apiPrefix.replace(/\/$/,'');
    }

    prefixConcreteEndpoint (concreteEndpoint: string): string {
        // normalize concreteEndpoint
        concreteEndpoint = concreteEndpoint.replace(/^\//, '');
        return this.apiPrefix + '/' + concreteEndpoint;
    }

    renderConcreteEndpoint (request: ApiRequest): string {
        return request.abstractEndpoint;//TODO: replace endpoint params
    }

    createPopsicleRequest (request: ApiRequest): popsicle.Request {
        var concreteEndpoint = this.renderConcreteEndpoint(request);
        var popsicleRequestOptions = {
            url: this.prefixConcreteEndpoint(concreteEndpoint),
            method: request.method || 'GET',
            query: request.queryParams,
            headers: request.headers,
            body: request.body
        };

        return popsicle.request(popsicleRequestOptions);
    }



}