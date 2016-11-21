import { SeatersApi } from '../seaters-api';
import { Promise } from 'es6-promise';
import { WaitingList } from '../seaters-api/fan/waiting-list';
import * as core from 'core-js/library'; 

export enum ACTION_STATUS {
    BECOME_FAN, UNLOCK, SOON, BOOK, WAIT, CONFIRM, GO_LIVE, ERROR
}

export interface ExtendedWaitingList extends WaitingList {
    /**
     * What action can be taken next?
     */
    actionStatus: ACTION_STATUS,

    /**
     * Is seaters currently processing your request?
     */
    processing: boolean
}

export class WlService {

    constructor (
        private api: SeatersApi
    ) {

    }

    getExtendedWl (wlId: string): Promise<ExtendedWaitingList> {
        return this.api.fan.waitingList(wlId).then(
            (wl) => core.Object.assign(wl, this.computeWLActionStatus(wl))
        );
    }

    private computeWLActionStatus(wl: WaitingList) {
        var actionStatus = ACTION_STATUS.BECOME_FAN;
        var processing: boolean = false;
        return {
            actionStatus: actionStatus,
            processing: processing
        }
    }

}