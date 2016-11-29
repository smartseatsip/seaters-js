import { SeatersApi } from '../seaters-api';
import { Promise } from 'es6-promise';
import { WaitingList, Price } from '../seaters-api/fan/waiting-list';
import * as core from 'core-js/library';
import { retryUntil } from './util';

export enum WAITING_LIST_ACTION_STATUS {
    UNLOCK, SOON, BOOK, WAIT, CONFIRM, GO_LIVE, ERROR
}

export interface ExtendedWaitingList extends WaitingList {
    /**
     * What action can be taken next?
     */
    actionStatus: WAITING_LIST_ACTION_STATUS,

    /**
     * Is seaters currently processing your request?
     */
    processing: boolean
}

export class WaitingListService {

    constructor (
        private api: SeatersApi
    ) {

    }

    getWaitingList (waitingListId: string): Promise<ExtendedWaitingList> {
        return this.api.fan.waitingList(waitingListId);
    }

    getWaitingListActionStatus (waitingList: WaitingList): WAITING_LIST_ACTION_STATUS {
        var seat = waitingList.seat;
        var position = waitingList.position;
        var request = waitingList.request;

        // Comming soon
        if(waitingList.waitingListStatus === 'PUBLISHED') {
            return WAITING_LIST_ACTION_STATUS.SOON;
        }

        // Not in WL
        if(!position) {
            // Code protected WL
            if(waitingList.accessMode === 'CODE_PROTECTED') {
                if(!request) {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK;
                } else if(request.status === 'PENDING') {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK;//-PENDING
                } else if(request.status === 'REJECTED') {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK;
                } else if(request.status === 'ACCEPTED') {
                    return WAITING_LIST_ACTION_STATUS.BOOK;
                } else {
                    console.error('[WaitingListService] - unexpected request status: %s', request.status);
                    return WAITING_LIST_ACTION_STATUS.ERROR;
                }
            }
            // Public WL
            else if(waitingList.accessMode === 'PUBLIC') {
                return WAITING_LIST_ACTION_STATUS.BOOK;
            } else {
                console.error('[WaitingListService] - unexpected accessMode: %s', waitingList.accessMode);
                return WAITING_LIST_ACTION_STATUS.ERROR;
            }
        }

        // In WL
        if(position.status === 'WAITING_SEAT') {
            return WAITING_LIST_ACTION_STATUS.WAIT;
        }

        // In WL with seat
        if(position.status === 'HAS_SEAT') {
            if(seat) {
                if(seat.status === 'ASSIGNED') {
                    // free WL
                    if(waitingList.freeWaitingList) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    }
                    // non free WL
                    // no payment yet
                    else if(!position.transactionStatus) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    }
                    // failed payment
                    else if(['FAILURE','CANCELLED','REFUNDED'].indexOf(position.transactionStatus) >= 0) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    }
                    // payment in progress
                    else if(['CREATING', 'CREATED', 'APPROVED', 'REFUNDING'].indexOf(position.transactionStatus) >= 0) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;//-PENDING
                    }
                    else {
                        console.error('[WaitingListService] - unexpected transactionStatus: %s', position.transactionStatus);
                        return WAITING_LIST_ACTION_STATUS.ERROR;
                    }
                }
                // non-voucher - tickets are being requested
                else if(waitingList.seatDistributionMode === 'TICKET' && seat.ticketingSystemType) {
                    return WAITING_LIST_ACTION_STATUS.CONFIRM;//-PENDING
                }
                // go live
                else if(seat.status === 'ACCEPTED') {
                    return WAITING_LIST_ACTION_STATUS.GO_LIVE;
                }
                else {
                    console.error('[WaitingListService] unexpected seat status: %s', seat.status);
                    return WAITING_LIST_ACTION_STATUS.ERROR;
                }
            }
            else {
                console.error('[WaitingListService] has seat without actual seat');
                return WAITING_LIST_ACTION_STATUS.ERROR;
            }
        }
        else if(position.status === 'BEING_PROCESSED') {
            return WAITING_LIST_ACTION_STATUS.WAIT;//-PENDING
        }
        else {
            console.error('[WaitinglistService] unexpected position status: %s', position.status);
            return WAITING_LIST_ACTION_STATUS.ERROR;
        }

    }

    getExtendedWaitingList (waitingListId: string): Promise<ExtendedWaitingList> {
        return this.getWaitingList(waitingListId)
        .then((wl) => core.Object.assign(wl, {
            actionStatus: this.getWaitingListActionStatus(wl)
        }));
    }

    joinWaitingList (waitingListId: string, numberOfSeats: number): Promise<ExtendedWaitingList> {
        return this.api.fan.joinWaitingList(waitingListId, numberOfSeats)
        .then(() => {
            return retryUntil(
                () => this.getExtendedWaitingList(waitingListId),
                (fg) => fg.actionStatus !== WAITING_LIST_ACTION_STATUS.BOOK,
                10,
                1000
            );
        });
    }

    getWaitingListPrice (waitingListId: string, numberOfSeats: number) : Promise<Price> {
      return this.api.fan.waitingListPrice(waitingListId, numberOfSeats);
    }

}
