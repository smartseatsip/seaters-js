import { HTTP_METHOD } from './http-method';

export interface ApiRequest {

    abstractEndpoint: string,
    method?: HTTP_METHOD,
    endpointParams?: any,//TODO: Map<string, string>
    queryParams?: any//TODO: Map<string, string>
    body?: string,
    headers?: any//TODO: Map<string, string>

}