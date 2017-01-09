import { ApiRequestDefinition } from './api-request-definition';
import { ApiEndpoint } from './api-endpoint';
import { RequestOptions, ServerResponse } from './request-driver';
import { Promise } from 'es6-promise';

export interface ApiRequest {

    requestDefinition: ApiRequestDefinition,
    endpoint: ApiEndpoint,
    rawRequest: {
        options: RequestOptions,
        promise: Promise<ServerResponse>
    }

}