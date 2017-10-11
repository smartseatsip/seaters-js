import { SeatersApiException } from './seaters-api-exception';

export interface SeatersExceptionV1 {
  uuid: string;
  message: string;
}

/**
 * Map Seaters API V1 exceptions to a usuable format
 *
 * @param mapping A mapping of V1 error messages to values of the given type
 * @return Returns an Promise that rejects with the mapped error
 */
export function seatersExceptionV1MessageMapper<T>(mapping: { [key: string]: T }): (err: any) => Promise<any> {
  return (err: SeatersApiException): Promise<any> => {
    if (typeof (err as any) !== 'object') {
      console.error('[seatersExceptionV1MessageMapper] Uncaught Exception', err);
      throw err;
    } else if (err.type !== 'validation_error_v1') {
      console.error('[seatersExceptionV1MessageMapper] invoked with non-v1 exception', err);
      throw err;
    } else if (!mapping.hasOwnProperty(err.message)) {
      console.error('[seatersExceptionV1MessageMapper] unmapped v1 error: %s', err.message, err);
      throw err;
    } else {
      return Promise.reject(mapping[err.message]);
    }
  };
}
