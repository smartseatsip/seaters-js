import { ApiRequestDefinition } from './api-request-definition';
import { ApiEndpoint } from './api-endpoint';
import { Request } from 'popsicle';
export interface ApiRequest {
    requestDefinition: ApiRequestDefinition;
    endpoint: ApiEndpoint;
    popsicleRequest: Request;
}
