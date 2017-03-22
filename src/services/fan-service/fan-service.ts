import { SeatersApi } from '../../seaters-api';
import { WaitingListService } from './waiting-list-service';
import { FanGroupService } from './fan-group-service';
import { Promise } from 'es6-promise';
import { fan } from './fan-types';

import { PagedResult, PagingOptions } from '../../shared-types';
import { SessionService } from "../session-service/session-service";
import { Fan, PositionSalesTransactionInput, AttendeesInfo } from "../../seaters-api/fan/fan-types";

export class FanService {

    public waitingListService: WaitingListService;
    public fanGroupService: FanGroupService;

    constructor (private seatersApi: SeatersApi, private sessionService: SessionService) {
        this.waitingListService = new WaitingListService(seatersApi);
        this.fanGroupService = new FanGroupService(seatersApi);
        this.sessionService = sessionService;
    }

    updateFan (fan: Fan) : Promise<Fan>{
      return this.seatersApi.fan.updateFan(fan)
        .then(fan => this.sessionService.updateCurrentFan(fan));
    }

    getWaitingList (waitingListId: string): Promise<fan.WaitingList> {
        return this.waitingListService.getWaitingList(waitingListId);
    }

    getWaitingListsInFanGroup (fanGroupId: string, pagingOptions: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
        return this.seatersApi.fan.waitingListsInFanGroup(fanGroupId, this.convertPagingOptions(pagingOptions))
        .then(r => this.convertPagedResult(r));
    }

    getPositionPaymentInfo (waitingListId: string): Promise<fan.PaymentInfo> {
        return this.seatersApi.fan.positionPaymentInfo(waitingListId);
    }

    getPositionBraintreePaymentInfo (waitingListId: string): Promise<fan.BraintreePaymentInfo> {
        return this.getPositionPaymentInfo(waitingListId)
        .then(paymentInfo => {
            // ensure it's a proper braintree payment
            if (paymentInfo.paymentSystemType !== 'BRAINTREE') {
                throw new Error('WaitingList ' + waitingListId + ' is not configured to use braintree');
            }
            if (paymentInfo.transactions.length !== 1) {
                console.error('[FanService] unexpected nbr of transactions for wl (%s) : %s', waitingListId, paymentInfo.transactions.length);
                throw new Error('Unexpected number of transactions for braintree payment for WL ' + waitingListId);
            }
            // fetch the token for this position
            return this.seatersApi.fan.positionBraintreeToken(waitingListId)
            .then(braintreeToken => {
                // combine the settings with the token
                return <fan.BraintreePaymentInfo> {
                    total: paymentInfo.transactions[0].total,
                    currency: paymentInfo.transactions[0].currency,
                    threeDSEnabled: paymentInfo.braintreeConfig.threeDSEnabled,
                    token: braintreeToken.token
                };
            });
        });
    }

    getMyWaitingListsWithoutSeat (page: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
        return this.seatersApi.fan.joinedWaitingListsWithoutSeat(page)
        .then(res => this.waitingListService.extendRawWaitingLists(<any>res));
    }

    getMyWaitingListsWithSeat (page: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
        return this.seatersApi.fan.joinedWaitingListsWithSeat(page)
        .then(res => this.waitingListService.extendRawWaitingLists(<any>res));
    }

    payPosition (waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
        return this.waitingListService.payPosition(waitingListId, transaction);
    }

    preauthorizePosition (waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
        return this.waitingListService.preauthorizePosition(waitingListId, transaction);
    }
    
    saveAttendeesInfo (waitingListId: string, attendeesInfo: AttendeesInfo): Promise<fan.WaitingList> {
        return this.waitingListService.saveAttendeesInfo(waitingListId, attendeesInfo);
    }

    acceptSeats (waitingListId: string) {
        return this.waitingListService.acceptSeats(waitingListId);
    }

    exportSeats (waitingListId: string) {
        return this.waitingListService.exportSeats(waitingListId);
    }

    private convertPagingOptions(pagingOptions: PagingOptions): any {
        return {
            itemOffset: pagingOptions.page * pagingOptions.maxPageSize,
            maxPageSize: pagingOptions.maxPageSize
        };
    }

    private convertPagedResult<T>(result: any): PagedResult<T> {
        return {
            items: result.items,
            itemOffset: result.itemOffset,
            maxPageSize: result.maxPageSize,
            page: Math.round(result.itemOffset / result.maxPageSize),
            totalSize: result.totalSize
        };
    }

}
