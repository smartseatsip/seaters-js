import { HTTP_METHOD } from './http-method';
export interface ApiRequest {
    abstractEndpoint: string;
    method?: HTTP_METHOD;
    endpointParams?: any;
    queryParams?: any;
    body?: string;
    headers?: any;
}
