import { HTTP_METHOD } from './http-method';
import { StringMap } from './string-map';

export interface ApiRequestDefinition {

    abstractEndpoint: string,
    method?: HTTP_METHOD,
    endpointParams?: StringMap,
    queryParams?: StringMap,
    body?: string | Object,
    headers?: {[key: string]:string},
}