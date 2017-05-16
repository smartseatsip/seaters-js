import { SeatersApi } from '../../seaters-api';
import { WaitingListService } from './waiting-list-service';
import { FanGroupService } from './fan-group-service';
import { fan } from './fan-types';
import { LocalizableText } from '../util';

import { PagedResult, PagingOptions } from '../../shared-types';
import { SessionService } from '../session-service';
import { PublicService } from '../public-service';
import { Fan, PositionSalesTransactionInput, AttendeesInfo } from '../../seaters-api/fan/fan-types';

export class FanService {

  public waitingListService: WaitingListService;
  public fanGroupService: FanGroupService;

  constructor (
    private seatersApi: SeatersApi,
    private sessionService: SessionService,
    private publicService: PublicService
  ) {
    this.waitingListService = new WaitingListService(seatersApi);
    this.fanGroupService = new FanGroupService(seatersApi);
  }

  getFanGroups (fanGroupIds: string[]): Promise<fan.FanGroup[]> {
    return this.fanGroupService.getFanGroups(fanGroupIds);
  }

  updateFan (fan: Fan): Promise<Fan> {
    return this.seatersApi.fan.updateFan(fan)
      .then(fan => this.sessionService.updateCurrentFan(fan));
  }

  getWaitingList (waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.getWaitingList(waitingListId);
  }

  getWaitingLists (waitingListIds: string[]): Promise<fan.WaitingList[]> {
    return this.waitingListService.getWaitingLists(waitingListIds);
  }

  getWaitingListsByKeywords (keywords: string[], page: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
    return this.publicService.getWaitingListsByKeywords(keywords, page)
      .then(pagedPublicWls => {
        let waitingListIds = pagedPublicWls.items.map(wl => wl.waitingListId);
        return this.getWaitingLists(waitingListIds)
          .then(wls => {
            return {
              items: wls,
              itemOffset: pagedPublicWls.itemOffset,
              maxPageSize: pagedPublicWls.maxPageSize,
              page: pagedPublicWls.page,
              totalSize: pagedPublicWls.totalSize
            } as PagedResult<fan.WaitingList>;
          });
      });
  }

  getWaitingListsInFanGroup (
    fanGroupId: string,
    pagingOptions: PagingOptions
  ): Promise<PagedResult<fan.WaitingList>> {
    return this.seatersApi.fan.waitingListsInFanGroup(fanGroupId, this.convertPagingOptions(pagingOptions))
      .then(r => this.convertPagedResult(r));
  }

  getWaitingListsInFanGroups (
    fanGroupIds: string[],
    pagingOptions: PagingOptions
  ): Promise<PagedResult<fan.WaitingList>> {
    return this.seatersApi.fan.waitingListsInFanGroups(fanGroupIds, this.convertPagingOptions(pagingOptions))
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
            return {
              total: paymentInfo.transactions[0].total,
              currency: paymentInfo.transactions[0].currency,
              threeDSEnabled: paymentInfo.braintreeConfig.threeDSEnabled,
              token: braintreeToken.token
            } as fan.BraintreePaymentInfo;
          });
      });
  }

  getMyWaitingListsWithoutSeat (page: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
    return this.seatersApi.fan.joinedWaitingListsWithoutSeat(page)
      .then(res => this.waitingListService.extendRawWaitingLists(res as any));
  }

  getMyWaitingListsWithSeat (page: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
    return this.seatersApi.fan.joinedWaitingListsWithSeat(page)
      .then(res => this.waitingListService.extendRawWaitingLists(res as any));
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

  acceptSeats (waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.acceptSeats(waitingListId);
  }

  exportSeats (waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.exportSeats(waitingListId);
  }

  getEventDescriptionForWaitingList (waitingListId: string): Promise<LocalizableText> {
    return this.seatersApi.fan.getEventDescription(waitingListId)
      .then(translationMap => new LocalizableText(translationMap));
  }

  getVenueConditionsForWaitingList (waitingListId: string): Promise<LocalizableText> {
    return this.seatersApi.fan.getVenueConditions(waitingListId)
      .then(translationMap => new LocalizableText(translationMap));
  }

  joinProtectedWaitingList (waitingListId: string, code: string): Promise<fan.WaitingList> {
    return this.waitingListService.joinProtectedWaitingList(waitingListId, code);
  }

  private convertPagingOptions (pagingOptions: PagingOptions): any {
    return {
      itemOffset: pagingOptions.page * pagingOptions.maxPageSize,
      maxPageSize: pagingOptions.maxPageSize
    };
  }

  private convertPagedResult<T> (result: any): PagedResult<T> {
    return {
      items: result.items,
      itemOffset: result.itemOffset,
      maxPageSize: result.maxPageSize,
      page: Math.round(result.itemOffset / result.maxPageSize),
      totalSize: result.totalSize
    };
  }

}
