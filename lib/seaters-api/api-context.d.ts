import * as popsicle from 'popsicle';
import { ApiRequest } from './api-request';
export declare class ApiContext {
    private apiPrefix;
    constructor(apiPrefix: string);
    prefixConcreteEndpoint(concreteEndpoint: string): string;
    renderConcreteEndpoint(request: ApiRequest): string;
    createPopsicleRequest(request: ApiRequest): popsicle.Request;
}
