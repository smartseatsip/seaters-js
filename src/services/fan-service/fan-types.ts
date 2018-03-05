import {
  WaitingList as _WaitingList,
  FanGroup as _FanGroup,
  FanGroupLook as _FanGroupLook,
  Price as _Price,
  PaymentInfo as _PaymentInfo,
  AttendeesInfo as _AttendeesInfo,
  AttendeeInfo as _AttendeeInfo,
  FanGroupShare as _FanGroupShare,
  WaitingListShare as _WaitingListShare,
  Fan as _Fan,
  Address as _Address,
  PhoneNumber as _PhoneNumber
} from '../../seaters-api/fan';

export namespace fan {
  export enum WAITING_LIST_ACTION_STATUS {
    UNLOCK,
    SOON,
    BOOK,
    WAIT,
    CONFIRM,
    GO_LIVE,
    ERROR
  }

  export interface WaitingList extends _WaitingList {
    /**
     * What action can be taken next?
     */
    actionStatus?: WAITING_LIST_ACTION_STATUS;

    /**
     * Is seaters currently processing your request?
     */
    processing: boolean;

    /**
     * If required, does the attendee info needs to be provided still?
     */
    shouldProvideAttendeesInfo: boolean;
  }

  export interface Price extends _Price {}

  export enum FAN_GROUP_ACTION_STATUS {
    CAN_JOIN,
    CAN_LEAVE,
    CAN_UNLOCK,
    CAN_REQUEST,
    WAITING_FOR_APPROVAL
  }

  export interface FanGroupLook extends _FanGroupLook {}

  export interface FanGroup extends _FanGroup {
    /**
     * FanGroup Fan's action status
     */
    actionStatus?: FAN_GROUP_ACTION_STATUS;
  }

  export interface PaymentInfo extends _PaymentInfo {}

  export interface BraintreePaymentInfo {
    /**
     * Braintree Payment token used to setup the braintree SDK.
     * It identifies the fan to braintree and allows seaters to
     * link incoming payment nonces to the correct fan.
     */
    token: string;

    /**
     * Can 3Ds be enabled in the SDK for this payment?
     * If true, you may enable it if you wish in the braintree SDK.
     * If it's false you should never enable it in the braintree SDK.
     */
    threeDSEnabled: boolean;

    /**
     * Let the user pay using masterpass service within braintree sdk,
     * this property shows the masterpass button in the payment view
     */
    masterpassEnabled: boolean;

    /**
     * Let the user pay using ideal service within braintree sdk,
     * this property shows the ideal button in the payment view
     */
    idealEnabled: boolean;

    /**
     * Currency codes according to the ISO 4217 (3 uppercase characters)
     * e.g. EUR, USD, CAD
     * @see SeatersClient.appService.getCurrencies
     */
    currency: string;

    /**
     * The total amount to pay (with double precision)
     */
    total: string;
  }

  export interface AttendeeInfo extends _AttendeeInfo {}

  export interface AttendeesInfo extends _AttendeesInfo {}

  export interface Fan extends _Fan {}

  export interface FanGroupShare extends _FanGroupShare {}

  export interface WaitingListShare extends _WaitingListShare {}

  export interface Address extends _Address {}

  export interface PhoneNumber extends _PhoneNumber {}
}
