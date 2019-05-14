/* tslint:disable:no-floating-promises */

import { PagedSortedResult, SeatersApiContext } from '../../seaters-api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { TranslationMap } from '../translation-map';

import {
  Answer,
  AttendeeInfo,
  BraintreeToken,
  Fan,
  FanGroup,
  FanGroupFilterInfo,
  FanGroupLook,
  FanGroupRequest,
  FanGroupShare,
  Position,
  PositionSalesTransaction,
  PositionSalesTransactionInput,
  Price,
  ProfilingCategory,
  ProfilingFanAttribute,
  SurveyInstance,
  UserFanAttribute,
  UserInterestUpdateDTO,
  WaitingList,
  WaitingListFanAttribute,
  WaitingListInterest,
  WaitingListShare,
  AdditionalCharges,
  Badge
} from './fan-types';

import { WaitingListRequest } from './waiting-list';
import { StringMap } from '../../api/string-map';
import { UserInterest } from './profiling';
import { PhoneNumber, UserFanAttributeActionStatusEnum, UserFanAttributeUpdateDTO } from './index';
import { IUpdateEmailDTO, IUpdatePasswordDTO } from './fan';
import { payment } from '../../services/payment-service/payment-types';
import { BadgeGrantOptions, BadgeWlOptions, BadgeProtection } from './badges';

export class FanApi {
  constructor(private apiContext: SeatersApiContext) {}

  fan(): Promise<Fan> {
    return this.apiContext.get('/fan');
  }

  updateFan(fan: Fan): Promise<Fan> {
    return this.apiContext.put('/fan', fan);
  }

  updatePassword(data: IUpdatePasswordDTO): Promise<Fan> {
    return this.apiContext.put('/fan/password', data.password);
  }

  updateEmail(data: IUpdateEmailDTO): Promise<Fan> {
    return this.apiContext.put('/fan/email', data);
  }

  updateMobilePhoneNumber(data: PhoneNumber): Promise<Fan> {
    return this.apiContext.put('/fan/mobile-phone-number', data);
  }

  fanGroup(fanGroupId: string): Promise<FanGroup> {
    return this.apiContext.get('/fan/groups/:fanGroupId', { fanGroupId });
  }

  fanGroupBySlug(slug: string): Promise<FanGroup> {
    return this.apiContext.get('/fan/fangroups-by-slug/:slug', { slug });
  }

  oauthAuthorizationCodeUrl(provider: string): Promise<any> {
    return this.apiContext.get('/v2/authentication/oauth/url/:provider', { provider });
  }

  fanGroupLookBySlug(slug: string): Promise<FanGroupLook> {
    return this.apiContext.get('/fan/fangroups-by-slug/:slug/look', { slug });
  }

  fanGroupTranslatedDescription(fanGroupId: string): Promise<string> {
    return this.apiContext.get('/fan/groups/:fanGroupId/translated-description', { fanGroupId });
  }

  hasGeoFilteredWaitingLists(fanGroupId: string): Promise<FanGroupFilterInfo> {
    return this.apiContext.get('v2/fan/groups/:fanGroupId/filter-info', { fanGroupId }, { groupId: fanGroupId });
  }

  fanGroups(fanGroupIds: string[]): Promise<FanGroup[]> {
    return this.apiContext.get(
      '/fan/groups',
      {},
      {
        groupIds: fanGroupIds
      }
    );
  }

  fanGroupLook(slug: string): Promise<FanGroupLook> {
    return this.apiContext.get('/fan/fangroups-by-slug/:slug/look', { slug });
  }

  joinFanGroup(fanGroupId: string): Promise<FanGroup> {
    return this.apiContext.post('/fan/groups/:fanGroupId', null, { fanGroupId });
  }

  joinProtectedFanGroup(fg: FanGroup, code: string): Promise<FanGroupRequest> {
    const data = {
      code
    };
    const endpointParams = { fanGroupId: fg.id };

    if (!fg.membership.request) {
      const endpoint1 = '/fan/groups/:fanGroupId/request-with-data';
      return this.apiContext.post(endpoint1, data, endpointParams);
    } else {
      const endpoint2 = '/fan/groups/:fanGroupId/request';
      return this.apiContext.put(endpoint2, data, endpointParams);
    }
  }

  leaveFanGroup(fanGroupId: string): Promise<void> {
    return this.apiContext.delete('/fan/groups/:fanGroupId', { fanGroupId });
  }

  shareFanGroup(fanGroupId: string): Promise<FanGroupShare> {
    return this.apiContext.get('/fan/groups/:fanGroupId/share', { fanGroupId });
  }

  waitingListsInFanGroup(
    fanGroupId: string,
    pagingOptions: PagingOptions,
    keyWords?: string
  ): Promise<PagedResult<WaitingList>> {
    const endpointParams = { fanGroupId };
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    if (keyWords !== undefined) {
      queryParams = {
        ...queryParams,
        keyWords
      };
    }

    return this.apiContext.get('/fan/groups/:fanGroupId/waiting-lists', endpointParams, queryParams);
  }


  waitingListsInFanGroupByKeywords(
    groupsIds: string,
    pagingOptions: PagingOptions,
    keyWords?: string
  ): Promise<PagedResult<WaitingList>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    if (keyWords !== undefined) {
      queryParams = {
        ...queryParams,
        keyWords,
        groupsIds
      };
    }

    return this.apiContext.get('/fan/groups/waiting-lists/filter', null, queryParams);
  }


  

  waitingListsInFanGroups(
    fanGroupIds: string[],
    pagingOptions: PagingOptions,
    keyWords?: string
  ): Promise<PagedResult<WaitingList>> {
    const endpointParams = {};
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    queryParams = {
      ...queryParams,
      groupIds: fanGroupIds
    };
    if (keyWords !== undefined) {
      queryParams = {
        ...queryParams,
        keyWords
      };
    }
    return this.apiContext.get('/fan/groups/waiting-lists', endpointParams, queryParams);
  }

  joinedFanGroups(pagingOptions: PagingOptions): Promise<PagedResult<FanGroup>> {
    return this.apiContext.get('/fan/joined-groups', null, SeatersApiContext.buildPagingQueryParams(pagingOptions));
  }

  joinedWaitingListsWithoutSeat(pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
    return this.apiContext.get(
      '/fan/joined-waiting-lists',
      null,
      SeatersApiContext.buildPagingQueryParams(pagingOptions)
    );
  }

  joinedWaitingListsWithSeat(pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
    return this.apiContext.get(
      '/fan/active-waiting-lists-with-seat',
      null,
      SeatersApiContext.buildPagingQueryParams(pagingOptions)
    );
  }

  waitingListTranslatedVenueDescription(waitingListId: string): Promise<string> {
    return this.apiContext.get('/fan/waiting-lists/:waitingListId/translated-venue-conditions', { waitingListId });
  }

  waitingList(waitingListId: string): Promise<WaitingList> {
    const endpoint = '/fan/waiting-lists/:waitingListId';
    const endpointParams = { waitingListId };
    return this.apiContext.get(endpoint, endpointParams);
  }

  waitingLists(waitingListIds: string[]): Promise<WaitingList[]> {
    const endpoint = '/fan/waiting-lists';
    return this.apiContext.put(endpoint, {
      waitingListIds
    });
  }

  waitingListPrice(waitingListId: string, numberOfSeats: number): Promise<Price> {
    const endpoint = '/fan/waiting-lists/:waitingListId/price/:numberOfSeats';
    const endpointParams = {
      waitingListId,
      numberOfSeats
    };
    return this.apiContext.get(endpoint, endpointParams);
  }

  joinWaitingList(
    waitingListId: string,
    numberOfSeats: number,
    additionalQueryParams: StringMap
  ): Promise<WaitingList> {
    const endpoint = '/fan/waiting-lists/:waitingListId/position';
    const endpointParams = { waitingListId };
    const queryParams = additionalQueryParams;
    const data = { numberOfSeats };

    return this.apiContext.post(endpoint, data, endpointParams, queryParams);
  }

  joinProtectedWaitingList(
    wl: WaitingList,
    code: string,
    numberOfSeats: number,
    additionalQueryParams: StringMap
  ): Promise<WaitingListRequest> {
    const data = {
      code,
      numberOfSeats
    };

    const endpointParams = { waitingListId: wl.waitingListId };
    const endpoint = '/fan/waiting-lists/:waitingListId/request';
    const queryParams = additionalQueryParams;

    if (!wl.request) {
      return this.apiContext.post(endpoint, data, endpointParams, queryParams);
    } else {
      return this.apiContext.put(endpoint, data, endpointParams, queryParams);
    }
  }

  shareWaitingList(waitingListId: string): Promise<WaitingListShare> {
    return this.apiContext.get('/fan/waiting-lists/:waitingListId/share', { waitingListId });
  }

  leaveWaitingList(waitingListId: string): Promise<void> {
    const endpoint = '/fan/waiting-lists/:waitingListId/position';
    const endpointParams = { waitingListId };
    return this.apiContext.delete(endpoint, endpointParams);
  }

  acceptSeats(waitingListId: string): Promise<WaitingList> {
    const endpoint = '/fan/waiting-lists/:waitingListId/accept';
    const endpointParams = { waitingListId };
    return this.apiContext.post(endpoint, null, endpointParams);
  }

  rejectSeats(waitingListId: string): Promise<WaitingList> {
    const endpoint = '/fan/waiting-lists/:waitingListId/reject';
    const endpointParams = { waitingListId };
    return this.apiContext.post(endpoint, null, endpointParams);
  }

  exportSeats(waitingListId: string): Promise<void> {
    const endpoint = '/fan/waiting-lists/:waitingListId/export-seat';
    const endpointParams = { waitingListId };
    return this.apiContext.put(endpoint, null, endpointParams);
  }

  positionPaymentInfo(waitingListId: string): Promise<payment.PaymentInfo> {
    const endpoint = '/fan/waiting-lists/:waitingListId/position/payment-info';
    const endpointParams = { waitingListId };
    return this.apiContext.get(endpoint, endpointParams);
  }

  positionBraintreeToken(waitingListId: string): Promise<BraintreeToken> {
    const endpoint = '/fan/waiting-lists/:waitingListId/position/braintree-token';
    const endpointParams = { waitingListId };
    return this.apiContext.get(endpoint, endpointParams);
  }

  createPositionSalesTransaction(
    waitingListId: string,
    transaction: PositionSalesTransactionInput
  ): Promise<PositionSalesTransaction> {
    const endpoint = '/fan/waiting-lists/:waitingListId/transaction';
    const endpointParams = { waitingListId };
    return this.apiContext.post(endpoint, transaction, endpointParams);
  }

  deletePositionSalesTransaction(waitingListId: string): Promise<any> {
    const endpoint = '/fan/waiting-lists/:waitingListId/transaction';
    const endpointParams = { waitingListId };
    return this.apiContext.delete(endpoint, endpointParams);
  }

  updateAttendeesInfo(waitingListId: string, attendeesInfo: AttendeeInfo[]): Promise<Position> {
    const data = {
      attendees: attendeesInfo
    };
    const endpoint = '/v2/fan/waiting-lists/:waitingListId/position/attendees-info';
    const endpointParams = { waitingListId };
    return this.apiContext.put(endpoint, data, endpointParams);
  }

  getEventDescription(waitingListId: string): Promise<TranslationMap> {
    return this.apiContext.get('/fan/waiting-lists/:waitingListId/event-description', { waitingListId });
  }

  getVenueConditions(waitingListId: string): Promise<TranslationMap> {
    return this.apiContext.get('/fan/waiting-lists/:waitingListId/venue-conditions', { waitingListId });
  }

  getTranslatedEventDescription(waitingListId: string): Promise<string> {
    return this.apiContext.get('/fan/waiting-lists/:waitingListId/translated-event-description', { waitingListId });
  }

  getTranslatedVenueConditions(waitingListId: string): Promise<string> {
    return this.apiContext.get('/fan/waiting-lists/:waitingListId/translated-venue-conditions', { waitingListId });
  }

  getWaitingListsAsFGO(fanGroupId: string): Promise<any> {
    return this.apiContext.get('/fan-group-owner/groups/:fanGroupId/waiting-lists', {fanGroupId},  {maxPageSize: 9999});
  }

  updateWaitingList(waitingList: any): Promise<any> {
    return this.apiContext.put('/fan-group-owner/waiting-lists/:waitingListId', waitingList, {waitingListId: waitingList.waitingListId});
  }

  // PROFILING : FAN

  /**
   * Gets complete list of categories
   * @param {PagingOptions} pagingOptions
   */
  getProfilingCategories(pagingOptions?: PagingOptions): Promise<PagedSortedResult<ProfilingCategory>> {
    const queryParams = SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
    return this.apiContext.get('v2/fan/interests/categories', null, queryParams);
  }

  /**
   * Gets single category
   * @param categoryId
   */
  getProfilingCategoryById(categoryId): Promise<ProfilingCategory> {
    return this.apiContext.get(`v2/fan/interests/category/${categoryId}`, {}, {});
  }

  /**
   * Gets complete list of interests with their user status
   * and their categoryId
   *
   * @param pagingOptions
   */
  getUserInterests(pagingOptions?: PagingOptions): Promise<PagedSortedResult<UserInterest>> {
    return this.apiContext.get(`v2/fan/interests`, {}, SeatersApiContext.buildPagingSortingQueryParams(pagingOptions));
  }

  /**
   * Updates a user interest
   * @param {UserInterestUpdateDTO} options
   */
  updateUserInterest(options: UserInterestUpdateDTO): Promise<UserInterest> {
    return this.apiContext.post(`v2/fan/interests/${options.id}/${options.status}`, {}, {});
  }

  /**
   *
   * Performs search operation
   * on name and aliases of fan attribues
   *
   * @param {string} query search query
   * @param {boolean} validated to fetch only validated fan attributes
   *
   */
  seachFanAttributes(query: string, validated: boolean): Promise<ProfilingFanAttribute[]> {
    const queryParams = { query, validated: validated ? 'true' : 'false' };
    return this.apiContext.get('v2/fan/fan-attributes/search', null, queryParams);
  }

  /**
   * Gets list of user fan attribute
   * @param pagingOptions
   */
  getUserFanAttributes(pagingOptions?: PagingOptions): Promise<PagedSortedResult<UserFanAttribute>> {
    return this.apiContext.get(
      `v2/fan/fan-attributes`,
      {},
      SeatersApiContext.buildPagingSortingQueryParams(pagingOptions)
    );
  }

  /**
   * Gets single user fan attributes
   * @param fanAttributeId
   */
  getProfilingFanAttributeById(fanAttributeId: string): Promise<ProfilingFanAttribute> {
    return this.apiContext.get(`v2/fan/fan-attributes/${fanAttributeId}`, {}, {});
  }

  /**
   * Updates user fan attribute
   * (Link / Unlink / Create )
   * @param {UserFanAttributeUpdateDTO} options
   */
  updateUserFanAttribute(options: UserFanAttributeUpdateDTO): Promise<UserFanAttribute> {
    let body = null;
    let endpoint = `v2/fan/fan-attributes/${options.id}/${options.status}`;
    if (options.status === UserFanAttributeActionStatusEnum.create) {
      endpoint = `v2/fan/fan-attributes/${UserFanAttributeActionStatusEnum.create}`;
      body = { name: options.name };
    }
    return this.apiContext.post(endpoint, body, {});
  }

  getWaitingListCategories(pagingOptions?: PagingOptions): Promise<PagedSortedResult<ProfilingCategory>> {
    const queryParams = SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
    return this.apiContext.get('v2/fan-group-owner/interests/categories', null, queryParams);
  }

  getWaitingListInterests(waitingListId: string): Promise<PagedSortedResult<WaitingListInterest>> {
    return this.apiContext.get(`v2/fan-group-owner/waiting-lists/${waitingListId}/interests`, {}, {});
  }

  getWaitingListFanAttributes(
    waitingListId: string,
    pagingOptions: PagingOptions
  ): Promise<PagedSortedResult<WaitingListFanAttribute>> {
    const queryParams = SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
    return this.apiContext.get(`v2/fan-group-owner/waiting-lists/${waitingListId}/fan-attributes`, {}, queryParams);
  }

  linkWaitingListInterest(waitingListId: string, interestId: string): Promise<WaitingListInterest> {
    return this.apiContext.post(
      `v2/fan-group-owner/waiting-lists/${waitingListId}/interests/${interestId}/link`,
      {},
      {}
    );
  }

  linkWaitingListFanAttribute(waitingListId: string, fanAttributeId: string): Promise<WaitingListFanAttribute> {
    return this.apiContext.post(
      `v2/fan-group-owner/waiting-lists/${waitingListId}/fan-attributes/${fanAttributeId}/link`,
      {},
      {}
    );
  }

  unlinkWaitingListInterest(waitingListId: string, interestId: string): Promise<WaitingListInterest> {
    return this.apiContext.post(
      `v2/fan-group-owner/waiting-lists/${waitingListId}/interests/${interestId}/unlink`,
      {},
      {}
    );
  }

  unlinkWaitingListFanAttribute(waitingListId: string, fanAttributeId: string): Promise<WaitingListFanAttribute> {
    return this.apiContext.post(
      `v2/fan-group-owner/waiting-lists/${waitingListId}/fan-attributes/${fanAttributeId}/unlink`,
      {},
      {}
    );
  }

  // BADGE : FAN

  getBadges(fanGroupId: string, pagingOptions? : PagingOptions): Promise<PagedSortedResult<Badge>> {
    const queryParams = pagingOptions ? SeatersApiContext.buildPagingSortingQueryParams(pagingOptions) : null;
    return this.apiContext.get('v2/fan/groups/' + fanGroupId + '/badges', null, queryParams);
  }

  getBadgeProtection(waitingListId: string): Promise<BadgeProtection> {
    return this.apiContext.get('v2/fan/waiting-lists/' + waitingListId + '/badges');
  }

  // BADGE : FAN GROUP OWNER

  getUserBadges(fanGroupId: string, userId: string, pagingOptions? : PagingOptions): Promise<PagedSortedResult<Badge>> {
    return this.apiContext.get('v2/fan-group-owner/groups/' + fanGroupId + '/badges/users/' + userId, null, SeatersApiContext.buildPagingSortingQueryParams(pagingOptions));
  }

  getFanGroupBadges(fanGroupId: string, pagingOptions? : PagingOptions): Promise<PagedSortedResult<Badge>>{
    return this.apiContext.get('v2/fan-group-owner/groups/' + fanGroupId + '/badges', null, SeatersApiContext.buildPagingSortingQueryParams(pagingOptions));
  }

  grantBadge(fanGroupId: string, body: BadgeGrantOptions) : Promise<any>{
    return this.apiContext.post('v2/fan-group-owner/groups/' + fanGroupId + '/badges/grant/', body, null);
  }

  revokeBadge(fanGroupId: string, body: BadgeGrantOptions) : Promise<any> {
    return this.apiContext.post('v2/fan-group-owner/groups/' + fanGroupId + '/badges/revoke/', body, null);
  }

  linkBadgeToWl(waitingListId: string, body: BadgeWlOptions) : Promise<any> {
    return this.apiContext.post('v2/fan-group-owner/waiting-lists/' + waitingListId + '/badges', body, null);
  }

  getWLBadges(waitingListId: string, pagingOptions?: PagingOptions) : Promise<any> {
    return this.apiContext.get('v2/fan-group-owner/waiting-lists/' + waitingListId + '/badges', null, SeatersApiContext.buildPagingSortingQueryParams(pagingOptions));
  }


  // BADGE : ADMIN

  







  // SURVEY : FAN
  /**
   * Gets list of surveys per wishlist
   * @param {PagingOptions} pagingOptions
   */
  getSurveys(pagingOptions?: PagingOptions): Promise<PagedSortedResult<SurveyInstance>> {
    const queryParams = SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
    return this.apiContext.get('v2/fan/survey/instances', null, queryParams);
  }

  /**
   * Gets list of answers for a given surveyInstanceId
   * @param {string} surveyInstanceId
   */
  getAnswers(surveyInstanceId: string): Promise<PagedSortedResult<Answer>> {
    return this.apiContext.get('v2/fan/surveys/instances/:surveyInstanceId/answers', { surveyInstanceId });
  }

  /**
   * Submits list of answers for a given surveyInstanceId
   * @param {string} surveyInstanceId
   * @param {Answer[]} answers
   */
  submitAnswers(surveyInstanceId: string, answers: Answer[]): Promise<Answer[]> {
    return this.apiContext.post(
      'v2/fan/surveys/instances/:surveyInstanceId/answers',
      { answers },
      { surveyInstanceId }
    );
  }

  // SURVEY : FGO
  /**
   * Gets list of surveys per wishlist
   * @param {string} waitingListId
   * @param {PagingOptions} pagingOptions
   */
  getWaitingListSurveys(
    waitingListId: string,
    pagingOptions?: PagingOptions
  ): Promise<PagedSortedResult<SurveyInstance>> {
    const queryParams = SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
    return this.apiContext.get(
      'v2/fan-group-owner/waiting-lists/:waitingListId/surveys/instances',
      { waitingListId },
      queryParams
    );
  }

  /**
   * Gets list of answers for a given user, survey and waitinglist
   * @param {string} waitingListId
   * @param {string} surveyInstanceId
   * @param {PagingOptions} pagingOptions
   */
  getUserAnswers(
    waitingListId: string,
    surveyInstanceId: string,
    pagingOptions?: PagingOptions
  ): Promise<PagedSortedResult<Answer>> {
    const queryParams = SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
    return this.apiContext.get(
      'v2/fan-group-owner/waiting-lists/:waitingListId/surveys/instances/:surveyInstanceId/answers',
      { waitingListId, surveyInstanceId },
      queryParams
    );
  }

  loadAdditionalCharges(waitingListId: string): Promise<AdditionalCharges[]> {
    return this.apiContext.get('v2/fan/waiting-lists/:waitingListId/additional-charges', { waitingListId });
  }
}

/* tslint:enable:no-floating-promises */
