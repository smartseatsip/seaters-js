import { SeatersApiException, SeatersError } from './seaters-api-exception';
import { ServerResponse } from './../api';

export namespace SeatersExceptionV3 {
  export type ERROR_TYPES = 'validation_errors' | 'technical_error';

  export interface ValidationError {
    /**
     * The actual error that occurred
     */
    error: {
      /**
       * A coded string that can be used to check against certain errors.
       * Can be used as translation key prefix or suffix. Lower snake case formatted
       * See specific endpoint to know which error codes are possible
       * 
       * e.g. invalid_email
       */
      errorCode: string;

      /**
       * Human readable version of the validation error
       */
      errorDescription: string;
    };

    /**
     * Reference string indicating which field(s) are causing the validation error.
     * e.g. attendees[0].email
     */
    references: string[];

    /**
     * Timestamp string - seems useless
     */
    timestamp: string;
  }

  export interface ApiException {
    uuid: string;
    timestamp: string;
    errors: {
      detectedErrorTypes: ERROR_TYPES[];
      errorsTypes: {
        technical_error: any;
        validation_errors: ValidationError[];
      };
    };
  }

  function stringifyError(e: ValidationError): string {
    return `[${e.references.join(',')}] ${e.error.errorCode}: ${e.error.errorDescription}`;
  }

  /**
   * Map Seaters API V3 exceptions to a consistent format. This is the error view designed by Daniel Di Luca
   *
   * @param mapping A mapping of V3 error messages to values of the given type
   * @return Returns an Promise that rejects with the mapped error
   */
  export function seatersExceptionV3Mapper<T>(res: ServerResponse): SeatersApiException {
    try {
      const error = JSON.parse(res.body);
      if (error.errors.detectedErrorTypes.filter(e => e !== 'validation_errors').length > 0) {
        console.error('[SeatersExceptionV3] input error contains unsupported error type');
        throw error;
      }

      const message =
        error.errors.errorsTypes.validation_errors.map(e => stringifyError(e)).join('\n') || JSON.stringify(error);

      const errors: SeatersError[] = error.errors.errorsTypes.validation_errors.map(e => {
        return {
          _rawResponse: e,
          defaultMessage: stringifyError(e),
          errorCode: e.error.errorCode as any,
          references: e.references
        };
      });

      return {
        uuid: error.uuid,
        type: 'validation_error',
        message,
        errors
      };
    } catch (e) {
      console.error('[SeatersExceptionV3] unable to map seaters exception v3', e);
      // throw the original error, to give some traceability
      throw res;
    }
  }
}
