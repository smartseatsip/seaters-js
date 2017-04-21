/**
 * ServerError is returned by the API when 500-599 status codes are returned.
 * Typically these indicate a server configuration issue or corrupt data.
 * If this is encountered you should contact seaters' technical team.
 */
export interface ServerError {

  /**
   * The technical error message
   */
  message: string,

  /**
   * The response status code
   */
  statusCode: number,

  /**
   * The response status text
   */
  statusText: string,

  /**
   * The raw response, for debugging purposes only.
   */
  _rawResponse: any

}

/**
 * These codes can appear in ValidationError.errorCode
 * Look at ValidationError.defaultMessage for their meaning in a specific context
 *
 * unmapped is a special code used to convert api v1 endpoint errors into v2 endpoints
 */
export type VALIDATION_ERROR_CODE =
  'required_field_missing' | 'invalid_email' | 'invalid_title' |
  'invalid_phone_number' | 'invalid_country_code' | 'invalid_date' |
  'empty_field' | 'future_date' | 'unmapped';

