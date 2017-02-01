import { WaitingList as _WaitingList, FanGroup as _FanGroup, Price as _Price } from '../../seaters-api/fan';

export namespace fan {

    export enum WAITING_LIST_ACTION_STATUS {
        UNLOCK, SOON, BOOK, WAIT, CONFIRM, GO_LIVE, ERROR
    }

    export interface WaitingList extends _WaitingList {
        /**
         * What action can be taken next?
         */
        actionStatus: WAITING_LIST_ACTION_STATUS,

        /**
         * Is seaters currently processing your request?
         */
        processing: boolean
    }

    export interface Price extends _Price {
        
    }

    export enum FAN_GROUP_ACTION_STATUS {
        CAN_JOIN, CAN_LEAVE, CAN_UNLOCK, CAN_REQUEST, WAITING_FOR_APPROVAL
    }

    export interface FanGroup extends _FanGroup {
        /**
         * FanGroup Fan's action status
         */
        actionStatus: FAN_GROUP_ACTION_STATUS,
    }

}
