import { PagedResult, PagingOptions, SeatersApi, SeatersService } from '../common';
import { WaitingListService } from './waiting-list-service';
import { FanGroupService } from './fan-group-service';
import { fan } from './fan-types';
import { payment } from '../payment-service/payment-types';
import { profiling } from './profiling-types';
import { survey } from './survey-types';
import { LocalizableText } from '../util';

import { SessionService } from '../session-service';
import { PublicService } from '../public-service';
import {
  AttendeeInfo,
  Fan,
  PositionSalesTransactionInput,
  AdditionalCharges,
  Badge,
  BadgeProtection,
  BadgeGrantOptions,
  BadgeWlOptions
} from '../../seaters-api/fan/fan-types';
import { BraintreeToken } from '../../seaters-api/fan/braintree-token';
import { IUpdateEmailDTO, IUpdatePasswordDTO, PhoneNumber } from '../../seaters-api/fan/fan';
import { StringMap } from '../../api/string-map';
import { FanProfilingService } from './fan-profiling-service';
import { FanSurveyService } from './fan-survey-service';
import { UserInterestUpdateDTO } from '../../seaters-api/fan';
import { PagedSortedResult } from '../../shared-types';

export class FanService extends SeatersService {
  public waitingListService: WaitingListService;
  public fanGroupService: FanGroupService;
  public fanProfilingService: FanProfilingService;
  public fanSurveyService: FanSurveyService;

  constructor(seatersApi: SeatersApi, private sessionService: SessionService, private publicService: PublicService) {
    super(seatersApi);
    this.waitingListService = new WaitingListService(seatersApi);
    this.fanGroupService = new FanGroupService(seatersApi);
    this.fanProfilingService = new FanProfilingService(seatersApi);
    this.fanSurveyService = new FanSurveyService(seatersApi);
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

  getOwnedFanGroups(pagingOptions?: PagingOptions): Promise<any> {
    return this.seatersApi.fan.getOwnedFanGroups(pagingOptions);
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

  hasGeoFilteredWaitingLists(fanGroupId: string): Promise<fan.FanGroupFilterInfo> {
    return this.fanGroupService.hasGeoFilteredWaitingLists(fanGroupId);
  }

  getJoinedFanGroups(pagingOptions: PagingOptions): Promise<PagedResult<fan.FanGroup>> {
    return this.fanGroupService.joinedFanGroups(pagingOptions).then(r => this.convertPagedResult(r));
  }

  requestOneTimeFileUpload(fileName?: string): Promise<any> {
    return this.seatersApi.fan.requestOneTimeFileUpload(fileName);
  }

  uploadOneTimeFile(oneTimeFileUrl: string, data: any): Promise<any> {
    return this.seatersApi.fan.uploadOneTimeFile(oneTimeFileUrl, data);
  }

  updateWlImage(waitingListId: string, fileId: string): Promise<any> {
    return this.seatersApi.fan.updateWlImage(waitingListId, fileId);
  }

  waitinglistAvailableSeats(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.waitinglistAvailableSeats(waitingListId);
  }

  waitinglistParkingAvailableSeats(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.waitinglistParkingAvailableSeats(waitingListId);
  }

  waitingListTotalDemand(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.waitingListTotalDemand(waitingListId);
  }

  assignWaitingListSeatToFan(waitingListId: string, fanId: string): Promise<any> {
    return this.seatersApi.fan.assignWaitingListSeatToFan(waitingListId, fanId);
  }

  assignWaitingListParkingSeatToFan(waitingListId: string, fanId: string): Promise<any> {
    return this.seatersApi.fan.assignWaitingListParkingSeatToFan(waitingListId, fanId);
  }

  assignWithoutSeats(waitingListId: string, fanId: string): Promise<any> {
    return this.seatersApi.fan.assignWithoutSeats(waitingListId, fanId);
  }

  declineFanPosition(waitingListId: string, fanId: string): Promise<any> {
    return this.seatersApi.fan.declineFanPosition(waitingListId, fanId);
  }

  removeFanFromWaitingList(waitingListId: string, fanId: string): Promise<any> {
    return this.seatersApi.fan.removeFanFromWaitingList(waitingListId, fanId);
  }

  searchMember(fanGroupId: string, query: string, pagingOptions?: PagingOptions): Promise<any> {
    return this.seatersApi.fan.searchMember(fanGroupId, query, pagingOptions);
  }

  getFanInfo(fanId: string): Promise<any> {
    return this.seatersApi.fan.getFanInfo(fanId);
  }

  getFanAttribute(fanId: string): Promise<any> {
    return this.seatersApi.fan.getFanAttribute(fanId);
  }

  getFanInterests(fanId: string): Promise<any> {
    return this.seatersApi.fan.getFanInterests(fanId);
  }

  getFanActivities(fanId: string, fanGroupId: string): Promise<any> {
    return this.seatersApi.fan.getFanActivities(fanId, fanGroupId);
  }

  addPosition(waitingListId: string, fanId: string, params: any): Promise<any> {
    return this.seatersApi.fan.addPosition(waitingListId, fanId, params);
  }

  getExiredPositions(waitingListId: string, query: string): Promise<any> {
    return this.seatersApi.fan.getExiredPositions(waitingListId, query);
  }

  waitinglistFinishedDistributing(waitingListId: string, nextDistributionNumber: any): Promise<any> {
    return this.seatersApi.fan.waitinglistFinishedDistributing(waitingListId, nextDistributionNumber);
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

  getWaitingListsInFanGroup(
    fanGroupId: string,
    pagingOptions: PagingOptions,
    keyWords?: string
  ): Promise<PagedResult<fan.WaitingList>> {
    return this.waitingListService
      .getWaitingListsInFanGroup(fanGroupId, pagingOptions, keyWords)
      .then(r => this.convertPagedResult(r));
  }

  getWaitingListsInFanGroupByKeywords(
    fanGroupId: string,
    pagingOptions: PagingOptions,
    keyWords?: string
  ): Promise<PagedResult<fan.WaitingList>> {
    return this.waitingListService
      .getWaitingListsInFanGroupByKeywords(fanGroupId, pagingOptions, keyWords)
      .then(r => this.convertPagedResult(r));
  }

  getWaitingListsInFanGroups(
    fanGroupIds: string[],
    pagingOptions: PagingOptions,
    keyWords?: string
  ): Promise<PagedResult<fan.WaitingList>> {
    return this.waitingListService
      .getWaitingListsInFanGroups(fanGroupIds, pagingOptions, keyWords)
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

  getPositionBraintreePaymentInfo(waitingListId: string): Promise<payment.PaymentInfoBraintreeConfig> {
    return this.waitingListService.getPositionBraintreePaymentInfo(waitingListId);
  }

  getPositionSeatersPaymentInfo(waitingListId: string): Promise<payment.PaymentInfoSeatersConfig> {
    return this.waitingListService.getPositionSeatersPaymentInfo(waitingListId);
  }

  getPositionPaynlPaymentInfo(waitingListId: string): Promise<payment.PaymentInfoPaynlConfig> {
    return this.waitingListService.getPositionPaynlPaymentInfo(waitingListId);
  }

  joinWaitingList(
    waitingListId: string,
    numberOfSeats: number,
    selectedSeats: any,
    additionalQueryParams?: StringMap
  ): Promise<fan.WaitingList> {
    return this.waitingListService.joinWaitingList(waitingListId, numberOfSeats, selectedSeats, {
      ...additionalQueryParams
    });
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

  getPositionPaymentInfo(waitingListId: string): Promise<payment.PaymentInfo> {
    return this.waitingListService.getPositionPaymentInfo(waitingListId);
  }

  payPosition(waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
    return this.waitingListService.payPosition(waitingListId, transaction);
  }

  sendPendingPayment(waitingListId: string, transaction: PositionSalesTransactionInput): any {
    return this.waitingListService.sendPendingPayment(waitingListId, transaction);
  }

  checkIfGoLive(waitingListId: string): any {
    return this.waitingListService.checkIfGoLive(waitingListId);
  }

  deleteSalesTransaction(waitingListId: string): any {
    return this.waitingListService.deleteSalesTransaction(waitingListId);
  }

  getSalesTransaction(waitingListId: string): any {
    return this.waitingListService.getSalesTransaction(waitingListId);
  }

  sendPayCallback(reference: string): any {
    return this.waitingListService.sendPayCallback(reference);
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

  acceptSeats(waitingListId: string, formatUsed: string): Promise<fan.WaitingList> {
    return this.waitingListService.acceptSeats(waitingListId, formatUsed);
  }

  rejectSeats(waitingListId: string): Promise<fan.WaitingList> {
    return this.waitingListService.rejectSeats(waitingListId);
  }

  exportSeats(waitingListId: string, formatUsed: string): Promise<fan.WaitingList> {
    return this.waitingListService.exportSeats(waitingListId, formatUsed);
  }

  sendExportedSeats(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.sendExportedSeats(waitingListId);
  }

  getEventDescriptionForWaitingList(waitingListId: string): Promise<LocalizableText> {
    return this.waitingListService
      .getEventDescriptionForWaitingList(waitingListId)
      .then(translationMap => new LocalizableText(translationMap));
  }

  searchEvent(eventName: string, date: string, pagingOptions?: PagingOptions) {
    return this.seatersApi.fan.searchEvent(eventName, date, pagingOptions);
  }

  searchVenues(venueName?: string, pagingOptions?: PagingOptions) {
    return this.seatersApi.fan.searchVenues(venueName, pagingOptions);
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

  createWaitingList(fanGroupId: any, waitingList: any): Promise<any> {
    return this.seatersApi.fan.createWaitingList(fanGroupId, waitingList);
  }

  /**
   * FANS
   */

  /**
   * Get current logged in fan
   * @returns {fan.Fan}
   */
  fan(): Promise<Fan> {
    return this.seatersApi.fan.fan();
  }

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

  updateFan(f: Fan): Promise<Fan> {
    return this.seatersApi.fan.updateFan(f).then(updatedFan => this.sessionService.updateCurrentFan(updatedFan));
  }

  updatePassword(data: IUpdatePasswordDTO): Promise<Fan> {
    return this.seatersApi.fan
      .updatePassword(data)
      .then(updatedFan => this.sessionService.updateCurrentFan(updatedFan));
  }

  updateEmail(data: IUpdateEmailDTO): Promise<Fan> {
    return this.seatersApi.fan.updateEmail(data).then(updatedFan => this.sessionService.updateCurrentFan(updatedFan));
  }

  updateMobilePhoneNumber(data: PhoneNumber): Promise<Fan> {
    return this.seatersApi.fan
      .updateMobilePhoneNumber(data)
      .then(updatedFan => this.sessionService.updateCurrentFan(updatedFan));
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

  getWaitingListCategories(pagingOptions): Promise<PagedResult<profiling.ProfilingCategory>> {
    return this.waitingListService.getWaitingListCategories(pagingOptions).then(this.convertPagedSortedResult);
  }

  getWaitingListInterests(waitingListId: string): Promise<PagedResult<profiling.WaitingListInterest>> {
    return this.waitingListService.getWaitingListInterests(waitingListId).then(this.convertPagedSortedResult);
  }

  getWaitingListFanAttributes(
    waitingListId: string,
    pagingOptions
  ): Promise<PagedResult<profiling.WaitingListFanAttribute>> {
    return this.waitingListService
      .getWaitingListFanAttributes(waitingListId, pagingOptions)
      .then(this.convertPagedSortedResult);
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

  unlinkWaitingListInterest(waitingListId: string, interestId: string): Promise<profiling.WaitingListInterest> {
    return this.waitingListService.unlinkWaitingListInterest(waitingListId, interestId);
  }

  unlinkWaitingListFanAttribute(
    waitingListId: string,
    fanAttributeId: string
  ): Promise<profiling.WaitingListFanAttribute> {
    return this.waitingListService.unlinkWaitingListFanAttribute(waitingListId, fanAttributeId);
  }

  // BADGE : FAN

  getBadges(fanGroupId: string, pagingOptions?: PagingOptions): Promise<PagedSortedResult<Badge>> {
    return this.seatersApi.fan.getBadges(fanGroupId, pagingOptions);
  }

  isBadgeProtected(fanGroupId: string, waitingListId: string): Promise<boolean> {
    return this.seatersApi.fan.getBadgeProtection(waitingListId).then(response => response.state === 'RESTRICTED');
  }

  getBadgesProtection(fanGroupId: string, waitingListId: string): Promise<any> {
    return this.seatersApi.fan.getBadgeProtection(waitingListId);
  }

  // BADGE : FAN GROUP OWNER

  getUserBadges(fanGroupId: string, userId: string, pagingOptions?: PagingOptions): Promise<PagedSortedResult<Badge>> {
    return this.seatersApi.fan.getUserBadges(fanGroupId, userId, pagingOptions);
  }

  getFanGroupBadges(fanGroupId: string, pagingOptions?: PagingOptions): Promise<PagedSortedResult<Badge>> {
    return this.seatersApi.fan.getFanGroupBadges(fanGroupId, pagingOptions);
  }

  grantBadge(fanGroupId: string, badgeGrantOptions: BadgeGrantOptions): Promise<any> {
    return this.seatersApi.fan.grantBadge(fanGroupId, badgeGrantOptions);
  }

  revokeBadge(fanGroupId: string, badgeGrantOptions: BadgeGrantOptions): Promise<any> {
    return this.seatersApi.fan.revokeBadge(fanGroupId, badgeGrantOptions);
  }

  linkBadgeToWl(waitingListId: string, badgeGrantOptions: BadgeWlOptions): Promise<any> {
    return this.seatersApi.fan.linkBadgeToWl(waitingListId, badgeGrantOptions);
  }

  unlinkBadgeToWl(waitingListId: string, linkId: string): Promise<any> {
    return this.seatersApi.fan.unlinkBadgeToWl(waitingListId, linkId);
  }

  relinkBadgeToWl(waitingListId: string, linkId: string): Promise<any> {
    return this.seatersApi.fan.relinkBadgeToWl(waitingListId, linkId);
  }

  getWLBadges(waitingListId: string, pagingOptions?: PagingOptions): Promise<any> {
    return this.seatersApi.fan.getWLBadges(waitingListId, pagingOptions);
  }

  updateWaitingList(waitingList: any): Promise<any> {
    return this.seatersApi.fan.updateWaitingList(waitingList);
  }

  draftWaitingList(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.draftWaitingList(waitingListId);
  }

  openWaitingList(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.openWaitingList(waitingListId);
  }

  scheduleWaitingList(waitingListId: string, date: string): Promise<any> {
    return this.seatersApi.fan.scheduleWaitingList(waitingListId, date);
  }

  closeWaitingList(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.closeWaitingList(waitingListId);
  }

  publishWaitingList(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.publishWaitingList(waitingListId);
  }

  addWaitingListTickets(waitingListId: string, totalTickets: number, ticketsToAdd: number): Promise<any> {
    return this.seatersApi.fan.addWaitingListTickets(waitingListId, totalTickets, ticketsToAdd);
  }

  getPositions(waitingListId: string, query?: string, pagingOptions?: PagingOptions): Promise<any> {
    return this.seatersApi.fan.getPositions(waitingListId, query, pagingOptions);
  }

  getSeats(waitingListId: string, query?: string, pagingOptions?: PagingOptions): Promise<any> {
    return this.seatersApi.fan.getSeats(waitingListId, query, pagingOptions);
  }

  // Survey : FAN

  getSurveys(
    waitingListId: string,
    extensionPoint: survey.SURVEY_EXTENSION_POINT,
    fanGroupId?: string
  ): Promise<PagedResult<survey.SurveyInstance>> {
    return this.fanSurveyService
      .getSurvey(waitingListId, extensionPoint, fanGroupId)
      .then(this.convertPagedSortedResult);
  }

  getAnswers(surveyId: string): Promise<PagedResult<survey.Answer>> {
    return this.fanSurveyService.getAnswers(surveyId).then(this.convertPagedSortedResult);
  }
  submitAnswers(surveyId: string, answers: survey.Answer[]): Promise<survey.Answer[]> {
    return this.fanSurveyService.submitAnswers(surveyId, answers);
  }

  getChoices(questionId: string, pagingOptions?: any): any {
    return this.fanSurveyService.getChoices(questionId, pagingOptions);
  }

  addChoices(questionId: string, choices): any {
    return this.seatersApi.fan.addChoices(questionId, choices);
  }

  getChoicesAsFO(questionId: string, pagingOptions: any = { itemOffset: 0, maxPageSize: 200000 }): any {
    return this.seatersApi.fan.getChoices(questionId, pagingOptions);
  }

  // Survey : FGO
  getWaitingListSurveys(
    waitingListId: string,
    extensionPoint: survey.SURVEY_EXTENSION_POINT
  ): Promise<PagedResult<survey.SurveyInstance>> {
    return this.fanSurveyService
      .getWaitingListSurveys(waitingListId, extensionPoint)
      .then(this.convertPagedSortedResult);
  }
  getUserAnswers(waitingListId: string, surveyId: string, userId: string): Promise<PagedResult<survey.Answer>> {
    return this.fanSurveyService.getUserAnswers(waitingListId, surveyId, userId).then(this.convertPagedSortedResult);
  }

  loadAdditionalCharges(waitingListId: string): Promise<AdditionalCharges[]> {
    return this.waitingListService.loadAdditionalCharges(waitingListId);
  }

  getWaitingListsAsFGO(fanGroupId: string, searchOptions, pagingOptions?: PagingOptions): Promise<any> {
    return this.seatersApi.fan.getWaitingListsAsFGO(fanGroupId, searchOptions, pagingOptions);
  }

  getWaitingListAsFGO(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.getWaitingListAsFGO(waitingListId);
  }

  getAdditionalInfos(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.getAdditionalInfos(waitingListId);
  }

  getAvailableSeats(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.getAvailableSeats(waitingListId);
  }

  addProperties(waitingListId: string, properties): Promise<any> {
    return this.seatersApi.fan.addProperties(waitingListId, properties);
  }

  getSeatingMap(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.getSeatingMap(waitingListId);
  }

  getPickedSeats(waitingListId: string): Promise<any> {
    return this.seatersApi.fan.getPickedSeats(waitingListId);
  }

  getBasicConnectedAppToken(): Promise<any> {
    return this.seatersApi.fan.getBasicConnectedAppToken();
  }
}
