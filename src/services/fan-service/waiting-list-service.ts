import { Object } from 'core-js/library';
import { Promise } from 'es6-promise';
import { PagedResult, PagingOptions } from '../../shared-types';

import { SeatersApi } from '../../seaters-api';
import { WaitingList, TRANSACTION_STATUS, PositionSalesTransactionInput } from '../../seaters-api/fan';
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

    private pollWaitingList (
        waitingListId: string,
        condition: (wl: fan.WaitingList) => boolean,
        limit?: number,
        delayInMs?: number
    ): Promise<fan.WaitingList> {
        return retryUntil<fan.WaitingList> (
            () => this.getWaitingList(waitingListId),
            condition,
            limit || 10,
            delayInMs || 1000,
        );
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

    canPay (wl: fan.WaitingList): boolean {
        if (WAITING_LIST_ACTION_STATUS.WAIT === wl.actionStatus) {
            return !!wl.position.expirationDate;
        } else if (WAITING_LIST_ACTION_STATUS.CONFIRM === wl.actionStatus) {
            return !wl.position.transactionStatus || wl.position.transactionStatus === 'FAILURE';
        } else {
            return false;
        }
    }

    hasPaymentInProgress (wl: fan.WaitingList): boolean {
        if (!wl.position) {
            return false;
        } else {
            return [
                'CREATING', 'CREATED', 'APPROVED', 'CANCELLED', 'REFUNDING'
            ].indexOf(wl.position.transactionStatus) >= 0;
        }
    }

    hasPreviousPayment (wl: fan.WaitingList): boolean {
        return wl.position && wl.position.transactionStatus ? true : false;
    }
    
    extendRawWaitingList(wl: WaitingList): fan.WaitingList {
        return Object.assign(wl, {
            actionStatus: this.getWaitingListActionStatus(wl)
            //TODO: pending status
        });
    }

    extendRawWaitingLists(wls: PagedResult<WaitingList>): PagedResult<fan.WaitingList> {
        wls.items = wls.items.map(wl => this.extendRawWaitingList(wl));
        return <PagedResult<fan.WaitingList>> wls;
    }

    getWaitingList (waitingListId: string): Promise<fan.WaitingList> {
        return this.getRawWaitingList(waitingListId)
        .then((wl) => this.extendRawWaitingList(wl));
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

    rejectSeats (waitingListId: string): Promise<fan.WaitingList> {
      return this.api.fan.rejectSeats(waitingListId)
      .then(() => this.pollWaitingList(waitingListId, (wl) => (wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK || wl.actionStatus === WAITING_LIST_ACTION_STATUS.UNLOCK) ));
    }

    exportSeats (waitingListId: string): Promise<fan.WaitingList> {
        return this.api.fan.exportSeats(waitingListId)
          .then(() => this.pollWaitingList(waitingListId, (wl) => (wl && wl.seat && wl.seat.exportedVoucherUrl && wl.seat.exportedVoucherUrl.length > 0) ));
    }

    payPosition (waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
        return this.submitTransaction(waitingListId, transaction)
        // wait for WL state to be 'GO_LIVE'
        .then(() => {
            return this.pollWaitingList(
                waitingListId,
                wl => wl.actionStatus === WAITING_LIST_ACTION_STATUS.GO_LIVE
            );
        });
    }

    preauthorizePosition (waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
        return this.submitTransaction(waitingListId, transaction)
        // wait for preauthorization timer to be removed
        .then(() => {
            return this.pollWaitingList(
                waitingListId,
                wl => wl.position.expirationDate === null
            );
        });
    }

    private submitTransaction (waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
        return this.getWaitingList(waitingListId)
        .then(wl => this.ensureFanCanPayPosition(wl))
        .then(wl => this.removePreviousTransactionIfAny(wl))
        .then(wl => this.createTransaction(waitingListId, transaction))
        .then(undefined, err => {
            console.error('[WaitingListService] submitTransaction failed: %s', err, transaction);
            throw err;
        });
    }

    private ensureFanCanPayPosition (wl: fan.WaitingList): Promise<fan.WaitingList> {
        if (!this.canPay(wl)) {
            throw new Error('Trying to submit transaction for WL that is not in a state that requires payment');
        } else if (this.hasPaymentInProgress(wl)) {
            throw new Error('Trying to submit transaction for WL which has a payment in progress');
        } else {
            return Promise.resolve(wl);
        }
    }

    private removePreviousTransactionIfAny (wl: fan.WaitingList): Promise<fan.WaitingList> {
        if(!this.hasPreviousPayment(wl)) {
            return Promise.resolve(wl);
        }
        return this.api.fan.deletePositionSalesTransaction(wl.waitingListId)
        .then(() => {
            return this.pollWaitingList(
                wl.waitingListId,
                (wl) => this.hasPreviousPayment(wl),
                60,
                1000
            );
        });
    }

    private createTransaction (waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
        return this.api.fan.createPositionSalesTransaction(waitingListId, transaction)
        .then(() => {
            return this.pollWaitingList(
                waitingListId,
                wl => this.hasProcessedPayment(wl),
                60,
                1000
            );
        });
    }
    
    private hasProcessedPayment (wl: fan.WaitingList): boolean {
        return wl.position && ['FAILURE', 'COMPLETED'].indexOf(wl.position.transactionStatus) >= 0;
    }


}
