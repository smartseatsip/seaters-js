import { fan } from '../../seaters-api';

export module fanGroupForFan {

    export enum FAN_GROUP_ACTION_STATUS {
        CAN_JOIN, CAN_LEAVE, CAN_UNLOCK, CAN_REQUEST, WAITING_FOR_APPROVAL
    }

    export interface ExtendedFanGroup extends fan.FanGroup {
        /**
         * FanGroup Fan's action status
         */
        actionStatus: FAN_GROUP_ACTION_STATUS,
    }

}
