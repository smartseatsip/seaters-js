import { TITLE, PhoneNumber, Address } from './fan';

/**
 * Attendee Info stores information from event guests, which is required for
 * legal purposes.
 *
 * All properties specified in WaitingList.eventRequiredAttendeeInfo are mandatory.
 * If any of these properties is omitted from the AttendeeInfo, they will result in
 * validation error 'error_missing-field' (TODO)
 *
 * @see WaitingList
 */
export interface AttendeeInfo {
  /**
   * Attendee's title
   */
  title: TITLE;

  /**
   * Attendee's first name
   */
  firstName: string;

  /**
   * Attendee's last name/surname/family name
   */
  lastName: string;

  /**
   * Attendee's well-structured email
   *
   * Possible validation errors:
   * - invalid formatting (TODO)
   */
  email: string;

  /**
   * Attendee's phone number.
   * Can be Mobile or Landline (fixed) and includes country calling code
   *
   * Possible validation errors:
   * - invalid formatting (TODO)
   * - no country code (TODO)
   *
   * @see PhoneNumber
   */
  phoneNumber: PhoneNumber;

  /**
   * Attendee's date of birth. Should be supplied in the attendee's proper timezone.
   *
   * @format ISO-8601
   *
   * Possible validation errors:
   * - in the future (TODO)
   */
  dateOfBirth: string;

  /**
   * Attendee's address
   */
  address: Address;

  /**
   * Attendee's citizenship country
   * @format alpha-2 country code
   */
  citizenshipCountryCode: string;

  /**
   * Attendee's passport / ID-card number - free text field
   */
  idNumber: string;
}

/**
 * AttendeesInfo lists all attendees with the their stored AttendeeInfo
 */
export interface AttendeesInfo {
  /**
   * Individual attendee data
   */
  attendees: AttendeeInfo[];
}

/**
 * AttendeeInfo field names that have builtin validations by seaters.
 * Other attendee info can be stored but these have no server-side validation.
 */
export type EVENT_REQUIRED_ATTENDEE_INFO =
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phoneNumber'
  | 'birthDate'
  | 'address'
  | 'zipCode'
  | 'city'
  | 'state'
  | 'country'
  | 'citizenshipCountryCode'
  | 'idNumber';
