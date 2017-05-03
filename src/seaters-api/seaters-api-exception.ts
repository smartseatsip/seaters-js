import { ValidationError } from './validation-error';
import { ServerError } from './server-error';
import { ClientError } from './client-error';

export type SeatersError = ValidationError | ServerError | ClientError;

export type SeatersErrorType =
  'validation_error' | 'server_error' | 'client_error' |
  'validation_error_v1' | 'unauthorized' | 'not_found';

export interface SeatersApiException {

  /**
   * UUID of the error - can be used to lookup the error in seaters' logs
   */
  uuid: string;

  /**
   * This field contains a summary of the errors that occurred.
   */
  message: string;

  /**
   * Use this to identify the type of SeatersApiException.errors
   */
  type: SeatersErrorType;

  /**
   * Lists all validation errors encountered on the input
   */
  errors: SeatersError[];

}
