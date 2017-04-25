import {
  ServerResponse, ApiContext, ApiRequestDefinition,
  RequestDriver, StringMap
} from '../api';

import { SeatersApiException } from './seaters-api-exception';
import { SeatersExceptionV1 } from './seaters-exception-v1';
import { ServerError } from './server-error';
import { ValidationError } from './validation-error';
import { ClientError } from './client-error';
import { PagingOptions } from './paging-options';

export class SeatersApiContext extends ApiContext {

  constructor (prefix: string, requestDriver: RequestDriver) {

    super(prefix, requestDriver);

  }

  public static buildPagingQueryParams (pagingOptions: PagingOptions): { [key: string]: any } {
    return {
      maxPageSize: pagingOptions.maxPageSize,
      itemOffset: pagingOptions.itemOffset
    };
  }

  /**
   * Returns a promise that either resolves with the requested resource
   * or rejects on error with a SeatersApiException.
   *
   * @param requestDefinition Definition of which resource is requested
   *
   * @see SeatersApiException
   */
  doSeatersRequest (requestDefinition: ApiRequestDefinition): Promise<string> {

    return this.doRequest(requestDefinition)
      .then(
        (res) => this.handleServerResponse(res),
        (err) => this.handleClientError(err)
      );
  }

  doTypedSeatersRequest<T> (requestDefinition: ApiRequestDefinition): Promise<T> {
    return this.doSeatersRequest(requestDefinition)
      .then(body => this.parseResult(body));
  }

  get (
    abstractEndpoint: string,
    endpointParams?: StringMap,
    queryParams?: StringMap
  ): Promise<any> {
    return this.doTypedSeatersRequest({
      abstractEndpoint: abstractEndpoint,
      endpointParams: endpointParams || {},
      queryParams: queryParams || {}
    });
  }

  put (
    abstractEndpoint: string,
    body?: any,
    endpointParams?: StringMap,
    queryParams?: StringMap
  ): Promise<any> {
    return this.doTypedSeatersRequest({
      method: 'PUT',
      abstractEndpoint: abstractEndpoint,
      endpointParams: endpointParams || {},
      queryParams: queryParams || {},
      body: body
    });
  }

  post (
    abstractEndpoint: string,
    body?: any,
    endpointParams?: StringMap,
    queryParams?: StringMap
  ): Promise<any> {
    return this.doTypedSeatersRequest({
      method: 'POST',
      abstractEndpoint: abstractEndpoint,
      endpointParams: endpointParams || {},
      queryParams: queryParams || {},
      body: body
    });
  }

  delete (
    abstractEndpoint: string,
    endpointParams?: StringMap,
    queryParams?: StringMap
  ): Promise<any> {
    return this.doTypedSeatersRequest({
      method: 'DELETE',
      abstractEndpoint: abstractEndpoint,
      endpointParams: endpointParams || {},
      queryParams: queryParams || {}
    });
  }

  private handleServerResponse (response: ServerResponse): Promise<string> {
    switch (response.status) {
      case 200:
      case 201:
      case 202:
      case 204:
        return this.handle2XXResponse(response);
      case 400:
        return this.handle400Response(response);
      case 401:
        return this.handle401Response(response);
      case 404:
        return this.handle404Response(response);
      case 422:
        return this.handle422Response(response);
      default:
        return this.handleUnexpectedResponse(response);
    }
  }

  private handle2XXResponse (response: ServerResponse): Promise<string> {
    return Promise.resolve(response.body);
  }

  private dataFromLegacyResponse (response: ServerResponse): Promise<SeatersExceptionV1> {
    let data: SeatersExceptionV1;
    try {
      data = JSON.parse(response.body);
      if (!data.message || typeof(data.message as any) !== 'string') {
        throw new Error('error data did not contain a message string');
      }
      if (!data.uuid || typeof(data.uuid as any) !== 'string') {
        throw new Error('error data did not contain a uuid string');
      }
    } catch (err) {
      return Promise.reject({
        type: 'server_error',
        message: 'Response was of type 400 but is not properly structured',
        uuid: null,
        errors: [{
          _rawResponse: { response: response, parseError: err },
          message: response.body,
          statusCode: response.status,
          statusText: response.statusText
        } as ServerError]
      } as SeatersApiException) as any;
    }
    return Promise.resolve(data);
  }

  /**
   * (legacy) old endpoints return 400 with only a message string
   * This type of error is mapped to a proper SeatersApiException
   */
  private handle400Response (response: ServerResponse): Promise<any> {

    return this.dataFromLegacyResponse(response)
      .then(data => {

        return Promise.reject({
          type: 'validation_error_v1',
          message: data.message,
          uuid: data.uuid,
          errors: [{
            defaultMessage: data.message,
            errorCode: null,
            reference: []
          } as ValidationError]
        } as SeatersApiException);

      });

  }

  private createServerError (response: ServerResponse, message: string): ServerError {
    return {
      _rawResponse: response,
      message: message,
      statusCode: response.status,
      statusText: response.statusText
    };
  }

  private handle401Response (response: ServerResponse): Promise<any> {
    return this.dataFromLegacyResponse(response)
      .then(data => {
        return Promise.reject({
          type: 'unauthorized',
          message: data.message,
          uuid: data.uuid,
          errors: [this.createServerError(response, data.message)]
        } as SeatersApiException);
      });
  }

  private handle404Response (response: ServerResponse): Promise<any> {
    return this.dataFromLegacyResponse(response)
      .then(data => {
        return Promise.reject({
          type: 'not_found',
          message: data.message,
          uuid: data.uuid,
          errors: [this.createServerError(response, data.message)]
        } as SeatersApiException);
      });
  }

  private handle422Response (response: ServerResponse): Promise<any> {
    // todo exception cases for v2/authentication endpoints
    // TODO - verify this format is returned
    return Promise.reject(response);
  }

  private handleUnexpectedResponse (response: ServerResponse): Promise<any> {
    return Promise.reject({
      type: 'server_error',
      message: 'An unexpected response was given by the server',
      uuid: null,
      errors: [this.createServerError(response, response.body)]
    } as SeatersApiException);
  }

  private handleClientError<T> (error: any): Promise<string> {
    return Promise.reject({
      type: 'client_error',
      message: 'the api client failed to complete the request',
      uuid: null,
      errors: [{ error: error } as ClientError]
    } as SeatersApiException) as any;
  }

  private parseResult (body: string): any {
    if (typeof(body as any) === 'string' && body.length > 0) {
      return Promise.resolve(JSON.parse(body));
    } else {
      return Promise.resolve(null);
    }
  }

}
