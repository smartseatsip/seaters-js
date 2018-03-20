import {
  Address as _Address,
  AttendeeInfo as _AttendeeInfo,
  AttendeesInfo as _AttendeesInfo,
  Fan as _Fan,
  FanGroup as _FanGroup,
  FanGroupFilterInfo as _FanGroupFilterInfo,
  FanGroupLook as _FanGroupLook,
  FanGroupShare as _FanGroupShare,
  PhoneNumber as _PhoneNumber,
  Price as _Price,
  WaitingList as _WaitingList,
  WaitingListShare as _WaitingListShare
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

  export interface AttendeeInfo extends _AttendeeInfo {}

  export interface AttendeesInfo extends _AttendeesInfo {}

  export interface Fan extends _Fan {}

  export interface FanGroupShare extends _FanGroupShare {}

  export interface WaitingListShare extends _WaitingListShare {}

  export interface Address extends _Address {}

  export interface PhoneNumber extends _PhoneNumber {}

  export interface FanGroupFilterInfo extends _FanGroupFilterInfo {}
}
