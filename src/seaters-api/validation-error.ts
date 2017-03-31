/**
 * ValidationError is returned by the API when there are issues with
 * the given input which need to be solved to make the request succeed.
 */
export interface ValidationError {

    /**
     * A key you can use to identify the actual error
     */
    errorCode: VALIDATION_ERROR_CODE,

    /**
     * A message that explains the error code in the context of the request
     */
    defaultMessage: string,

    /**
     * Reference contains the JSON paths for the fields related to this error
     * e.g. ['attendees[0].email'] will indicate the error applies to the first attendee's email input value
     * 
     * In practice this method is needed when you have multiple entities with the same field which could
     * cause a specific error. For example a list of attendees, each one has a field 'email'; to identify
     * which attendee's email is invalid.
     */
    reference: string[]

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

