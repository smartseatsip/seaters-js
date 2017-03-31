import { ServerResponse, ApiContext, ApiRequestDefinition,
    RequestDriver, StringMap } from '../api';

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

    private handleServerResponse(response: ServerResponse): Promise<string> {
        switch(response.status) {
            case 200:
            case 201:
            case 202:
            case 204: return this.handle2XXResponse(response);
            case 400: return this.handle400Response(response);
            case 401: return this.handle401Response(response);
            case 404: return this.handle404Response(response);
            case 422: return this.handle422Response(response);
            default: return this.handleUnexpectedResponse(response);
        }
    }

    private handle2XXResponse (response: ServerResponse): Promise<string> {
        return Promise.resolve(response.body);
    }
    
    private dataFromLegacyResponse(response: ServerResponse): Promise<SeatersExceptionV1> {
        var data: SeatersExceptionV1;
        try {
            data = JSON.parse(response.body);
            if (!data.message || typeof(data.message) !== 'string') {
                throw 'error data did not contain a message string';
            }
            if (!data.uuid || typeof(data.uuid) !== 'string') {
                throw 'error data did not contain a uuid string';
            }
        } catch (err) {
            return <any>Promise.reject(<SeatersApiException> {
                type: 'server_error',
                message: 'Response was of type 400 but is not properly structured',
                uuid: null,
                errors: [<ServerError> {
                    _rawResponse: { response: response, parseError: err },
                    message: response.body,
                    statusCode: response.status,
                    statusText: response.statusText
                }]
            });
        }
        return Promise.resolve(data);
    }

    /**
     * (legacy) old endpoints return 400 with only a message string
     * This type of error is mapped to a proper SeatersApiException
     */
    private handle400Response(response: ServerResponse): Promise<any> {

        return this.dataFromLegacyResponse(response)
        .then(data => {

            return Promise.reject(<SeatersApiException> {
                type: 'validation_error_v1',
                message: data.message,
                uuid: data.uuid,
                errors: [<ValidationError> {
                    defaultMessage: data.message,
                    errorCode: null,
                    reference: []
                }]
            });

        });

    }

    private createServerError(response: ServerResponse, message: string): ServerError {
        return {
            _rawResponse: response,
            message: message,
            statusCode: response.status,
            statusText: response.statusText
        };
    }

    private handle401Response(response: ServerResponse): Promise<any> {
        return this.dataFromLegacyResponse(response)
        .then(data => {
            return Promise.reject(<SeatersApiException> {
                type: 'unauthorized',
                message: data.message,
                uuid: data.uuid,
                errors: [this.createServerError(response, data.message)]
            })
        });
    }

    private handle404Response(response: ServerResponse): Promise<any> {
        return this.dataFromLegacyResponse(response)
        .then(data => {
            return Promise.reject(<SeatersApiException> {
                type: 'not_found',
                message: data.message,
                uuid: data.uuid,
                errors: [this.createServerError(response, data.message)]
            })
        });
    }

    private handle422Response(response: ServerResponse): Promise<any> {
        // todo exception cases for v2/authentication endpoints
        return Promise.reject(response);//TODO - verify this format is returned
    }

    private handleUnexpectedResponse(response: ServerResponse): Promise<any> {
        return Promise.reject(<SeatersApiException> {
            type: 'server_error',
            message: 'An unexpected response was given by the server',
            uuid: null,
            errors: [this.createServerError(response, response.body)]
        });
    }

    private handleClientError<T>(error: any): Promise<string> {
        return <any>Promise.reject(<SeatersApiException> {
            type: 'client_error',
            message: 'the api client failed to complete the request',
            uuid: null,
            errors: [<ClientError> { error: error}]
        });
    }

    get<T> (
        abstractEndpoint: string,
        endpointParams?: StringMap,
        queryParams?: StringMap
    ): Promise<T> {
        return this.doTypedSeatersRequest({
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {}
        });
    }

    put<T> (
        abstractEndpoint: string,
        body?: any,
        endpointParams?: StringMap,
        queryParams?: StringMap
    ): Promise<T> {
        return this.doTypedSeatersRequest({
            method: 'PUT',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {},
            body: body
        });
    }

    post<T> (
      abstractEndpoint: string,
      body?: any,
      endpointParams?: StringMap,
      queryParams?: StringMap
    ): Promise<T> {
      return this.doTypedSeatersRequest({
          method: 'POST',
          abstractEndpoint: abstractEndpoint,
          endpointParams: endpointParams || {},
          queryParams: queryParams || {},
          body: body
      });
    }

    delete<T> (
        abstractEndpoint: string,
        endpointParams?: StringMap,
        queryParams?: StringMap
    ) {
        return this.doTypedSeatersRequest({
            method: 'DELETE',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams || {},
            queryParams: queryParams || {}
        });
    }

    public static buildPagingQueryParams(pagingOptions: PagingOptions): {[key:string]:any} {
        return {
            maxPageSize: pagingOptions.maxPageSize,
            itemOffset: pagingOptions.itemOffset
        };
    }

    private parseResult(body: string): any {
        if (typeof(body) === 'string' && body.length > 0) {
            return Promise.resolve(JSON.parse(body));
        } else {
            return Promise.resolve(null);
        }
    }

}