/* tslint:disable:no-floating-promises */

import { SeatersApiContext, PagedSortedResult, SeatersApi } from '../../seaters-api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { TranslationMap } from '../translation-map';

import {
  ProfilingCategory,
  UserInterestCreateDTO,
  UserInterestUpdateDTO,
  ProfilingFanAttribute,
  UserFanAttribute,
  UserFanAttributeCreateDTO,
  UserFanAttributeUpdateDTO,
  WaitingListFanAttribute,
  WaitingListInterest,
  Fan,
  FanGroup,
  WaitingList,
  FanGroupRequest,
  Position,
  Price,
  PaymentInfo,
  BraintreeToken,
  FanGroupLook,
  PositionSalesTransactionInput,
  PositionSalesTransaction,
  AttendeeInfo,
  FanGroupShare,
  WaitingListShare,
  SurveyInstance,
  Answer
} from './fan-types';

import { WaitingListRequest } from './waiting-list';
import { StringMap } from '../../api/string-map';
import { PhoneNumber } from './index';
import { IUpdateEmailDTO, IUpdatePasswordDTO } from './fan';
import { ProfilingInterest, UserInterest } from './profiling';
import { userInfo } from 'os';
import { UserInterestStatus } from './index';

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

  fanGroupLookBySlug(slug: string): Promise<FanGroupLook> {
    return this.apiContext.get('/fan/fangroups-by-slug/:slug/look', { slug });
  }

  fanGroupTranslatedDescription(fanGroupId: string): Promise<string> {
    return this.apiContext.get('/fan/groups/:fa`nGroupId/translated-description', { fanGroupId });
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

  waitingListsInFanGroup(fanGroupId: string, pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
    const endpointParams = { fanGroupId };
    const queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return this.apiContext.get('/fan/groups/:fanGroupId/waiting-lists', endpointParams, queryParams);
  }

  waitingListsInFanGroups(fanGroupIds: string[], pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
    const endpointParams = {};
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    queryParams = {
      ...queryParams,
      groupIds: fanGroupIds
    };
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

  positionPaymentInfo(waitingListId: string): Promise<PaymentInfo> {
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

  // Profiling (public)

  getProfilingCategories(pagingOptions?: PagingOptions): Promise<PagedSortedResult<ProfilingCategory>> {
    return this.apiContext.get(
      'v2/fan/interests/categories',
      null,
      SeatersApiContext.buildPagingSortingQueryParams(pagingOptions)
    );
  }

  getProfilingCategoryById(categoryId): Promise<ProfilingCategory> {
    return this.apiContext.get(`v2/fan/interests/category/${categoryId}`, {}, {});
  }

  getProfilingFanAttributes(query: string, validated: boolean): Promise<ProfilingFanAttribute[]> {
    return this.apiContext.get(
      '/profiling/v1/fan_attributes',
      {},
      {
        query,
        validated: validated ? 'true' : 'false'
      }
    );
  }

  getProfilingFanAttributeById(fanAttributeId: string): Promise<ProfilingFanAttribute> {
    return this.apiContext.get(`/profiling/v1/fan_attribute/${fanAttributeId}`, {}, {});
  }

  // User (fan)

  getUserInterests(pagingOptions?: PagingOptions): Promise<PagedSortedResult<UserInterest>> {
    return this.apiContext.get(`v2/fan/interests`, {}, SeatersApiContext.buildPagingSortingQueryParams(pagingOptions));
  }

  createUserInterest(userInterestCreateDTO: UserInterestCreateDTO): Promise<UserInterest> {
    return this.apiContext.post('/profiling/v1/user/interest', userInterestCreateDTO, {});
  }

  updateUserInterest(userInterestUpdateDTO: UserInterestUpdateDTO): Promise<UserInterest> {
    return this.apiContext.post(`v2/fan/interests/${userInterestUpdateDTO.id}/${userInterestUpdateDTO.status}`, {}, {});
  }

  getUserFanAttributes(): Promise<UserFanAttribute[]> {
    return this.apiContext.get(`/profiling/v1/user/fan_attributes`, {}, {});
  }

  createUserFanAttribute(
    userFanAttributeCreateDTO: UserFanAttributeCreateDTO,
    relationsValidation: string
  ): Promise<UserFanAttribute> {
    return this.apiContext.post(
      `/profiling/v1/user/fan_attribute`,
      userFanAttributeCreateDTO,
      {},
      { relations_validation: relationsValidation ? 'true' : 'false' }
    );
  }

  updateUserFanAttribute(
    userFanAttributeId: string,
    userFanAttributeUpdateDTO: UserFanAttributeUpdateDTO
  ): Promise<UserFanAttribute> {
    return this.apiContext.post(
      `/profiling/v1/user/fan_attribute/${userFanAttributeId}`,
      userFanAttributeUpdateDTO,
      {}
    );
  }

  removeUserFanAttribute(userFanAttributeId: string): Promise<UserFanAttribute> {
    return this.apiContext.delete(`/profiling/v1/user/fan_attribute/${userFanAttributeId}`, {}, {});
  }

  getWaitingListInterests(waitingListId: string): Promise<WaitingListInterest[]> {
    return this.apiContext.get(`/profiling/v1/waitinglists/${waitingListId}/interests`, {}, {});
  }

  getWaitingListFanAttributes(waitingListId: string): Promise<WaitingListFanAttribute[]> {
    return this.apiContext.get(`/profiling/v1/waitinglists/${waitingListId}/fan_attributes`, {}, {});
  }

  linkWaitingListInterest(waitingListId: string, interestId: string): Promise<WaitingListInterest> {
    return this.apiContext.post(`/profiling/v1/waitinglists/${waitingListId}/interests/${interestId}`, {}, {});
  }

  linkWaitingListFanAttribute(waitingListId: string, fanAttributeId: string): Promise<WaitingListFanAttribute> {
    return this.apiContext.post(`/profiling/v1/waitinglists/${waitingListId}/fan_attributes/${fanAttributeId}`, {}, {});
  }

  unlinkWaitingListInterests(waitingListId: string): Promise<void> {
    return this.apiContext.delete(`/profiling/v1/waitinglists/${waitingListId}/interests`, {}, {});
  }

  unlinkWaitingListFanAttributes(waitingListId: string): Promise<void> {
    return this.apiContext.delete(`/profiling/v1/waitinglists/${waitingListId}/fan_attributes`, {}, {});
  }

  unlinkWaitingListInterest(waitingListId: string, interestId: string): Promise<void> {
    return this.apiContext.delete(`/profiling/v1/waitinglists/${waitingListId}/interests/${interestId}`, {}, {});
  }

  unlinkWaitingListFanAttribute(waitingListId: string, fanAttributeId: string): Promise<void> {
    return this.apiContext.delete(
      `/profiling/v1/waitinglists/${waitingListId}/fan_attributes/${fanAttributeId}`,
      {},
      {}
    );
  }

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
   * Gets list of answers for a given surveyId
   * @param {string} surveyId
   */
  getAnswers(surveyId: string): Promise<PagedSortedResult<Answer>> {
    return this.apiContext.get('v2/fan/surveys/instances/:surveyId/answers', { surveyId });
  }

  /**
   * Submits list of answers for a given surveyId
   * @param {string} surveyId
   * @param {Answer[]} answers
   */
  submitAnswers(surveyId: string, answers: Answer[]): Promise<Answer[]> {
    return this.apiContext.post('v2/fan/surveys/instances/:surveyId/answers', { answers }, { surveyId });
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
   * @param {string} surveyId
   * @param {PagingOptions} pagingOptions
   */
  getUserAnswers(
    waitingListId: string,
    surveyId: string,
    pagingOptions?: PagingOptions
  ): Promise<PagedSortedResult<Answer>> {
    const queryParams = SeatersApiContext.buildPagingSortingQueryParams(pagingOptions);
    return this.apiContext.get(
      'v2/fan-group-owner/waiting-lists/:waitingListId/surveys/instances/:surveyId/answers',
      { waitingListId, surveyId },
      queryParams
    );
  }
}

/* tslint:enable:no-floating-promises */
