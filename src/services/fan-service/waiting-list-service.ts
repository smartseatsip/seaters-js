import { Object } from 'core-js/library';
import { Promise } from 'es6-promise';

import { SeatersApi } from '../../seaters-api';
import { WaitingList } from '../../seaters-api/fan';
import { fan } from './fan-types';
import { retryUntil } from './../util';

var WAITING_LIST_ACTION_STATUS = fan.WAITING_LIST_ACTION_STATUS;

export class WaitingListService {

    constructor (
        private api: SeatersApi
    ) {

    }

    private getRawWaitingList (waitingListId: string): Promise<WaitingList> {
        return this.api.fan.waitingList(waitingListId);
    }

    private getWaitingListActionStatus (waitingList: WaitingList): fan.WAITING_LIST_ACTION_STATUS {
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

    getWaitingList (waitingListId: string): Promise<fan.WaitingList> {
        return this.getRawWaitingList(waitingListId)
        .then((wl) => Object.assign(wl, {
            actionStatus: this.getWaitingListActionStatus(wl)
            //TODO: pending status
        }));
    }

    joinWaitingList (waitingListId: string, numberOfSeats: number): Promise<fan.WaitingList> {
        return this.api.fan.joinWaitingList(waitingListId, numberOfSeats)
        .then(() => this.pollWaitingList(waitingListId, (wl) => wl.actionStatus !== WAITING_LIST_ACTION_STATUS.BOOK));
    }

    leaveWaitingList (waitingListId: string): Promise<fan.WaitingList> {
        return this.api.fan.leaveWaitingList(waitingListId)
        // wait until the status is returned to BOOK
        .then(() => this.pollWaitingList(waitingListId, (wl) => wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK));
    }

    getWaitingListPrice (waitingListId: string, numberOfSeats: number) : Promise<fan.Price> {
        return this.api.fan.waitingListPrice(waitingListId, numberOfSeats);
    }

    acceptSeats (waitingListId: string): Promise<fan.WaitingList> {
        return this.api.fan.acceptSeats(waitingListId)
        .then(() => this.pollWaitingList(waitingListId, (wl) => wl.actionStatus !== WAITING_LIST_ACTION_STATUS.CONFIRM));
    }

    exportSeats (waitingListId: string): Promise<fan.WaitingList> {
        return this.api.fan.exportSeats(waitingListId)
          .then(() => this.pollWaitingList(waitingListId, (wl) => (wl && wl.seat && wl.seat.exportedVoucherUrl && wl.seat.exportedVoucherUrl.length > 0) ));
    }


    private pollWaitingList (waitingListId: string, condition: (wl: fan.WaitingList) => boolean): Promise<fan.WaitingList> {
        return retryUntil<fan.WaitingList> (
            () => this.getWaitingList(waitingListId),
            condition,
            10,
            1000
        );
    }



}
