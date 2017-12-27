import { SeatersApi, SeatersService, PagingOptions, PagedResult, PagedSortedResult } from '../common';
import { WaitingListService } from './waiting-list-service';
import { FanGroupService } from './fan-group-service';
import { fan } from './fan-types';
import { profiling } from './profiling-types';
import { LocalizableText } from '../util';

import { SessionService } from '../session-service';
import { PublicService } from '../public-service';
import { Fan, PositionSalesTransactionInput, AttendeeInfo } from '../../seaters-api/fan/fan-types';
import { BraintreeToken } from '../../seaters-api/fan/braintree-token';
import { PhoneNumber } from '../../seaters-api/fan/fan';
import { StringMap } from '../../api/string-map';
import { FanProfilingService } from './fan-profiling-service';
import { UserInterestUpdateDTO } from '../../seaters-api/fan';

export class FanService extends SeatersService {
  public waitingListService: WaitingListService;
  public fanGroupService: FanGroupService;
  public fanProfilingService: FanProfilingService;

  constructor(seatersApi: SeatersApi, private sessionService: SessionService, private publicService: PublicService) {
    super(seatersApi);
    this.waitingListService = new WaitingListService(seatersApi);
    this.fanGroupService = new FanGroupService(seatersApi);
    this.fanProfilingService = new FanProfilingService(seatersApi);
  }

  /**
   *  FAN GROUPS
   */
  getFanGroups(fanGroupIds: string[]): Promise<fan.FanGroup[]> {
    return this.fanGroupService.getFanGroups(fanGroupIds);
  }

  getFanGroup(fanGroupId: string): Promise<fan.FanGroup> {
    return this.fanGroupService.getFanGroup(fanGroupId);
  }

  getFanGroupBySlug(slug: string): Promise<fan.FanGroup> {
    return this.fanGroupService.getFanGroupBySlug(slug);
  }

  getFanGroupLookBySlug(slug: string): Promise<fan.FanGroupLook> {
    return this.fanGroupService.getFanGroupLookBySlug(slug);
  }

  getFanGroupTranslatedDescription(fanGroupId: string): Promise<string> {
    return this.fanGroupService.getFanGroupTranslatedDescription(fanGroupId);
  }

  joinFanGroup(fanGroupId: string): Promise<fan.FanGroup> {
    return this.fanGroupService.joinFanGroup(fanGroupId);
  }

  joinProtectedFanGroup(fanGroupId: string, code: string): Promise<fan.FanGroup> {
    return this.fanGroupService.joinProtectedFanGroup(fanGroupId, code);
  }

  requestToJoinPrivateFanGroup(fanGroupId: string): Promise<fan.FanGroup> {
    return this.fanGroupService.requestToJoinPrivateFanGroup(fanGroupId);
  }

  leaveFanGroup(fanGroupId: string): Promise<fan.FanGroup> {
    return this.fanGroupService.leaveFanGroup(fanGroupId);
  }

  shareFanGroup(fanGroupId: string): Promise<fan.FanGroupShare> {
    return this.fanGroupService.shareFanGroup(fanGroupId);
  }

  getJoinedFanGroups(pagingOptions: PagingOptions): Promise<PagedResult<fan.FanGroup>> {
    return this.fanGroupService.joinedFanGroups(pagingOptions).then(r => this.convertPagedResult(r));
  }

  /**
   *  WAITING LISTS
   */
  getWaitingList(waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.getWaitingList(waitingListId);
  }

  getWaitingLists(waitingListIds: string[]): Promise<fan.WaitingList[]> {
    return this.waitingListService.getWaitingLists(waitingListIds);
  }

  getWaitingListsInFanGroup(fanGroupId: string, pagingOptions: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
    return this.waitingListService
      .getWaitingListsInFanGroup(fanGroupId, pagingOptions)
      .then(r => this.convertPagedResult(r));
  }

  getWaitingListsInFanGroups(
    fanGroupIds: string[],
    pagingOptions: PagingOptions
  ): Promise<PagedResult<fan.WaitingList>> {
    return this.waitingListService
      .getWaitingListsInFanGroups(fanGroupIds, pagingOptions)
      .then(r => this.convertPagedResult(r));
  }

  getMyWaitingListsWithoutSeat(page: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
    return this.waitingListService.getMyWaitingListsWithoutSeat(page).then(r => this.convertPagedResult(r));
  }

  getMyWaitingListsWithSeat(page: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
    return this.waitingListService.getMyWaitingListsWithSeat(page).then(r => this.convertPagedResult(r));
  }

  //TODO: cleanup duplicate method (see getTranslatedVenueConditionsForWaitingList)
  getWaitingListTranslatedVenueDescription(waitingListId: string): Promise<string> {
    return this.waitingListService.getWaitingListTranslatedVenueDescription(waitingListId);
  }

  getPositionBraintreePaymentInfo(waitingListId: string): Promise<fan.BraintreePaymentInfo> {
    return this.waitingListService.getPositionBraintreePaymentInfo(waitingListId);
  }

  joinWaitingList(
    waitingListId: string,
    numberOfSeats: number,
    additionalQueryParams?: StringMap
  ): Promise<fan.WaitingList> {
    return this.waitingListService.joinWaitingList(waitingListId, numberOfSeats, { ...additionalQueryParams });
  }

  joinProtectedWaitingList(
    waitingListId: string,
    code: string,
    numberOfSeats: number,
    additionalQueryParams?: StringMap
  ): Promise<fan.WaitingList> {
    return this.waitingListService.joinProtectedWaitingList(waitingListId, code, numberOfSeats, {
      ...additionalQueryParams
    });
  }

  shareWaitingList(waitingListId: string): Promise<fan.WaitingListShare> {
    return this.waitingListService.shareWaitingList(waitingListId);
  }

  leaveWaitingList(waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.leaveWaitingList(waitingListId);
  }

  getPositionPaymentInfo(waitingListId: string): Promise<fan.PaymentInfo> {
    return this.waitingListService.getPositionPaymentInfo(waitingListId);
  }

  payPosition(waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
    return this.waitingListService.payPosition(waitingListId, transaction);
  }

  preauthorizePosition(waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
    return this.waitingListService.preauthorizePosition(waitingListId, transaction);
  }

  /**
   * Submit attendee information. This will validate the submitted information. The returned promise will be
   * resolved once the user can continue with the next step after submitting attendee information
   * @param waitingListId WL for which attendee info needs to be validated and stored
   * @param attendeesInfo The actual attendee information
   * @throws SeatersApiException of type 'validation_error'
   */
  saveAttendeesInfo(waitingListId: string, attendeesInfo: AttendeeInfo[]): Promise<fan.WaitingList> {
    return this.waitingListService.saveAttendeesInfo(waitingListId, attendeesInfo);
  }

  acceptSeats(waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.acceptSeats(waitingListId);
  }

  rejectSeats(waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.rejectSeats(waitingListId);
  }

  exportSeats(waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.exportSeats(waitingListId);
  }

  getEventDescriptionForWaitingList(waitingListId: string): Promise<LocalizableText> {
    return this.waitingListService
      .getEventDescriptionForWaitingList(waitingListId)
      .then(translationMap => new LocalizableText(translationMap));
  }

  getTranslatedEventDescriptionForWaitingList(waitingListId: string): Promise<string> {
    return this.waitingListService.getTranslatedEventDescriptionForWaitingList(waitingListId);
  }

  getVenueConditionsForWaitingList(waitingListId: string): Promise<LocalizableText> {
    return this.waitingListService
      .getVenueConditionsForWaitingList(waitingListId)
      .then(translationMap => new LocalizableText(translationMap));
  }

  getTranslatedVenueConditionsForWaitingList(waitingListId: string): Promise<string> {
    return this.waitingListService.getTranslatedVenueConditionsForWaitingList(waitingListId);
  }

  positionBraintreeToken(waitingListId: string): Promise<BraintreeToken> {
    return this.waitingListService.positionBraintreeToken(waitingListId);
  }

  getWaitingListPrice(waitingListId: string, numberOfSeats: number): Promise<fan.Price> {
    return this.waitingListService.getWaitingListPrice(waitingListId, numberOfSeats);
  }

  /**
   * FANS
   */

  /**
   * Send a new SMS containing the code needed to validate email / phone.
   * @param phone
   * @returns {any}
   */
  sendValidationCodeViaSMS(phone: PhoneNumber): Promise<Fan> {
    return this.seatersApi.apiContext.put('/fan/mobile-phone-number', phone);
  }

  /**
   *  COMBINATIONS
   */
  updatePassword(password: string): Promise<Fan> {
    return this.seatersApi.fan
      .updatePassword(password)
      .then(updatedFan => this.sessionService.updateCurrentFan(updatedFan));
  }

  updateFan(f: Fan): Promise<Fan> {
    return this.seatersApi.fan.updateFan(f).then(updatedFan => this.sessionService.updateCurrentFan(updatedFan));
  }

  getWaitingListsByKeywords(keywords: string[], page: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
    return this.publicService.getWaitingListsByKeywords(keywords, page).then(pagedPublicWls => {
      const waitingListIds = pagedPublicWls.items.map(wl => wl.waitingListId);
      return this.getWaitingLists(waitingListIds).then(wls => {
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

  // Profiling (public)

  getProfilingCategories(pagingOptions): Promise<PagedResult<profiling.ProfilingCategory>> {
    return this.fanProfilingService.getProfilingCategories(pagingOptions).then(this.convertPagedSortedResult);
  }

  getProfilingCategoryById(categoryId: string): Promise<profiling.ProfilingCategory> {
    return this.fanProfilingService.getProfilingCategoryById(categoryId);
  }

  seachFanAttributes(query: string, validated: boolean): Promise<profiling.ProfilingFanAttribute[]> {
    return this.fanProfilingService.seachFanAttributes(query, validated);
  }

  getProfilingFanAttributeById(fanAttributeId: string): Promise<profiling.ProfilingFanAttribute> {
    return this.fanProfilingService.getProfilingFanAttributeById(fanAttributeId);
  }

  // User (fan)

  getUserInterests(pagingOptions): Promise<PagedResult<profiling.UserInterest>> {
    return this.fanProfilingService.getUserInterests(pagingOptions).then(this.convertPagedSortedResult);
  }

  updateUserInterest(userInterestUpdateDTO: UserInterestUpdateDTO): Promise<profiling.UserInterest> {
    return this.fanProfilingService.updateUserInterest(userInterestUpdateDTO);
  }

  getUserFanAttributes(pagingOptions?): Promise<PagedResult<profiling.UserFanAttribute>> {
    return this.fanProfilingService.getUserFanAttributes(pagingOptions).then(this.convertPagedSortedResult);
  }

  updateUserFanAttribute(options): Promise<profiling.UserFanAttribute> {
    return this.fanProfilingService.updateUserFanAttribute(options);
  }

  getWaitingListInterests(waitingListId: string): Promise<profiling.WaitingListInterest[]> {
    return this.waitingListService.getWaitingListInterests(waitingListId);
  }

  getWaitingListFanAttributes(waitingListId: string): Promise<profiling.WaitingListFanAttribute[]> {
    return this.waitingListService.getWaitingListFanAttributes(waitingListId);
  }

  linkWaitingListInterest(waitingListId: string, interestId: string): Promise<profiling.WaitingListInterest> {
    return this.waitingListService.linkWaitingListInterest(waitingListId, interestId);
  }

  linkWaitingListFanAttribute(
    waitingListId: string,
    fanAttributeId: string
  ): Promise<profiling.WaitingListFanAttribute> {
    return this.waitingListService.linkWaitingListFanAttribute(waitingListId, fanAttributeId);
  }

  unlinkWaitingListInterests(waitingListId: string): Promise<void> {
    return this.waitingListService.unlinkWaitingListInterests(waitingListId);
  }

  unlinkWaitingListFanAttributes(waitingListId: string): Promise<void> {
    return this.waitingListService.unlinkWaitingListFanAttributes(waitingListId);
  }

  unlinkWaitingListInterest(waitingListId: string, interestId: string): Promise<void> {
    return this.waitingListService.unlinkWaitingListInterest(waitingListId, interestId);
  }

  unlinkWaitingListFanAttribute(waitingListId: string, fanAttributeId: string): Promise<void> {
    return this.waitingListService.unlinkWaitingListFanAttribute(waitingListId, fanAttributeId);
  }
}
