import { Subject } from '../services/util/subject';

import { ApiRequestDefinition } from './api-request-definition';
import { ApiRequest } from './api-request';
import { ApiEndpoint } from './api-endpoint';

import { RequestDriver, RequestOptions, ServerResponse } from './request-driver';

export type ResponseModifier = (res: ServerResponse) => any;

export type RequestErrorModifier = (err: any) => any;

export class ApiContext {

  private requestsSubject: Subject<ApiRequest>;

  private headers: Map<string, string>;

  constructor (
    private apiPrefix: string,
    private requestDriver: RequestDriver
  ) {
    this.requestsSubject = new Subject<ApiRequest>();
    this.headers = new Map<string, string>();
    this.headers.set('Content-Type', 'application/json');
  }

  setHeader (header: string, value: string) {
    this.headers.set(header, value);
  }

  unsetHeader (header: string) {
    this.headers.delete(header);
  }

  createEndpoint (requestDefinition: ApiRequestDefinition): ApiEndpoint {
    return new ApiEndpoint(
      requestDefinition.abstractEndpoint,
      requestDefinition.endpointParams || {},
      requestDefinition.queryParams || ({} as any),
      this.apiPrefix
    );
  }

  createRequestOptions (requestDefinition: ApiRequestDefinition, endpoint: ApiEndpoint): RequestOptions {
    let headers = this.mergeHeaders(requestDefinition.headers);
    let body = (requestDefinition.body as any) !== undefined ? JSON.stringify(requestDefinition.body) : null;
    return {
      url: endpoint.absoluteEndpoint,
      method: requestDefinition.method || 'GET',
      headers: headers,
      body: body
    };
  }

  doRequest (requestDefinition: ApiRequestDefinition): Promise<ServerResponse> {
    let endpoint = this.createEndpoint(requestDefinition);
    let requestOptions = this.createRequestOptions(requestDefinition, endpoint);
    let request = this.requestDriver(requestOptions);
    let apiRequest: ApiRequest = {
      requestDefinition: requestDefinition,
      endpoint: endpoint,
      rawRequest: {
        options: requestOptions,
        promise: request
      }
    };

    // notify all request listeners about the request that was just started
    this.requestsSubject.next(apiRequest);
    return request as Promise<ServerResponse>;
  }

  private mergeHeaders (otherHeaders: any) {
    let merged = {};
    this.headers.forEach((v, k) => merged[k] = v);
    return Object.assign(merged, otherHeaders);
  }

}
