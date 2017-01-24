import { fan } from '../../seaters-api';

export module waitingListForFan {

    export enum WAITING_LIST_ACTION_STATUS {
        UNLOCK, SOON, BOOK, WAIT, CONFIRM, GO_LIVE, ERROR
    }

    export interface ExtendedWaitingList extends fan.WaitingList {
        /**
         * What action can be taken next?
         */
        actionStatus: WAITING_LIST_ACTION_STATUS,

        /**
         * Is seaters currently processing your request?
         */
        processing: boolean
    }

}
