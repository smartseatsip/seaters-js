/* tslint:disable:no-floating-promises */

import { SeatersApiContext } from '../../seaters-api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { TranslationMap } from '../translation-map';

import {
  Fan, FanGroup, WaitingList, FanGroupRequest, Position,
  Price, PaymentInfo, BraintreeToken, FanGroupLook,
  PositionSalesTransactionInput, PositionSalesTransaction,
  AttendeeInfo, ProfilingCategory, UserInterestCreateDTO, UserInterestUpdateDTO, ProfilingFanAttribute, UserFanAttribute, UserFanAttributeCreateDTO, UserFanAttributeUpdateDTO
} from './fan-types';

import { WaitingListRequest } from './waiting-list';
import { StringMap } from '../../api/string-map';
import { UserInterest } from './profiling';

export class FanApi {

  constructor (private apiContext: SeatersApiContext) {

  }

  fan (): Promise<Fan> {
    return this.apiContext.get('/fan');
  }

  updateFan (fan: Fan): Promise<Fan> {
    return this.apiContext.put('/fan', fan);
  }

  fanGroup (fanGroupId: string): Promise<FanGroup> {
    return this.apiContext.get(
      '/fan/groups/:fanGroupId',
      { fanGroupId: fanGroupId }
    );
  }

  fanGroupBySlug (slug: string): Promise<FanGroup> {
    return this.apiContext.get(
      '/fan/fangroups-by-slug/:slug',
      { slug: slug }
    );
  }

  fanGroupLookBySlug (slug: string): Promise<FanGroup> {
    return this.apiContext.get(
      '/fan/fangroups-by-slug/:slug/look',
      { slug: slug }
    );
  }

  fanGroupTranslatedDescription (fanGroupId: string): Promise<FanGroup> {
    return this.apiContext.get(
      '/fan/groups/:fanGroupId/translated-description',
      { fanGroupId: fanGroupId }
    );
  }

  fanGroups (fanGroupIds: string[]): Promise<FanGroup[]> {
    return this.apiContext.get('/fan/groups', {}, {
      groupIds: fanGroupIds
    });
  }

  fanGroupLook (slug: string): Promise<FanGroupLook> {
    return this.apiContext.get(
      '/fan/fangroups-by-slug/:slug/look',
      { slug: slug }
    );
  }

  joinFanGroup (fanGroupId: string): Promise<FanGroup> {
    return this.apiContext.post(
      '/fan/groups/:fanGroupId',
      null,
      { fanGroupId: fanGroupId }
    );
  }

  joinProtectedFanGroup (fg: FanGroup, code: string): Promise<FanGroupRequest> {
    let data = {
      code: code
    };
    let endpointParams = { fanGroupId: fg.id };

    if (!fg.membership.request) {
      let endpoint1 = '/fan/groups/:fanGroupId/request-with-data';
      return this.apiContext.post(endpoint1, data, endpointParams);
    } else {
      let endpoint2 = '/fan/groups/:fanGroupId/request';
      return this.apiContext.put(endpoint2, data, endpointParams);
    }
  }

  leaveFanGroup (fanGroupId: string): Promise<void> {
    return this.apiContext.delete(
      '/fan/groups/:fanGroupId',
      { fanGroupId: fanGroupId }
    );
  }

  shareFanGroup (fanGroupId: string): Promise<FanGroup> {
    return this.apiContext.get(
      '/fan/groups/:fanGroupId/share',
      { fanGroupId: fanGroupId }
    );
  }

  waitingListsInFanGroup (fanGroupId: string, pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
    let endpointParams = { fanGroupId: fanGroupId };
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return this.apiContext.get(
      '/fan/groups/:fanGroupId/waiting-lists',
      endpointParams,
      queryParams
    );
  }

  waitingListsInFanGroups (fanGroupIds: string[], pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
    let endpointParams = undefined;
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    queryParams = Object.assign(queryParams, {
      groupIds: fanGroupIds
    });
    return this.apiContext.get(
      '/fan/groups/waiting-lists',
      endpointParams,
      queryParams
    );
  }

  joinedFanGroups (pagingOptions: PagingOptions): Promise<PagedResult<FanGroup>> {
    return this.apiContext.get(
      '/fan/joined-groups',
      null,
      SeatersApiContext.buildPagingQueryParams(pagingOptions)
    );
  }

  joinedWaitingListsWithoutSeat (pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
    return this.apiContext.get(
      '/fan/joined-waiting-lists',
      null,
      SeatersApiContext.buildPagingQueryParams(pagingOptions)
    );
  }

  joinedWaitingListsWithSeat (pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
    return this.apiContext.get(
      '/fan/active-waiting-lists-with-seat',
      null,
      SeatersApiContext.buildPagingQueryParams(pagingOptions)
    );
  }

  waitingListTranslatedVenueDescription (waitingListId: string): Promise<WaitingList> {
    return this.apiContext.get(
      '/fan/waiting-lists/:waitingListId/translated-venue-conditions',
      { waitingListId: waitingListId }
    );
  }

  waitingList (waitingListId: string): Promise<WaitingList> {
    let endpoint = '/fan/waiting-lists/:waitingListId';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.get(endpoint, endpointParams);
  }

  waitingLists (waitingListIds: string[]): Promise<WaitingList[]> {
    let endpoint = '/fan/waiting-lists';
    return this.apiContext.put(endpoint, {
      waitingListIds: waitingListIds
    });
  }

  waitingListPrice (waitingListId: string, numberOfSeats: number): Promise<Price> {
    let endpoint = '/fan/waiting-lists/:waitingListId/price/:numberOfSeats';
    let endpointParams = {
      waitingListId: waitingListId,
      numberOfSeats: numberOfSeats
    };
    return this.apiContext.get(endpoint, endpointParams);
  }

  joinWaitingList (
    waitingListId: string,
    numberOfSeats: number,
    additionalQueryParams: StringMap
  ): Promise<WaitingList> {
    let endpoint = '/fan/waiting-lists/:waitingListId/position';
    let endpointParams = { waitingListId: waitingListId };
    let queryParams = additionalQueryParams;
    let data = { numberOfSeats: numberOfSeats };

    return this.apiContext.post(endpoint, data, endpointParams, queryParams);
  }

  joinProtectedWaitingList (
    wl: WaitingList,
    code: string,
    numberOfSeats: number,
    additionalQueryParams: StringMap
  ): Promise<WaitingListRequest> {
    let data = {
      code: code,
      numberOfSeats: numberOfSeats
    };

    let endpointParams = { waitingListId: wl.waitingListId };
    let endpoint = '/fan/waiting-lists/:waitingListId/request';
    let queryParams = additionalQueryParams;

    if (!wl.request) {

      return this.apiContext.post(endpoint, data, endpointParams, queryParams);
    } else {
      return this.apiContext.put(endpoint, data, endpointParams, queryParams);
    }
  }

  shareWaitingList (waitingListId: string): Promise<WaitingList> {
    return this.apiContext.get(
      '/fan/waiting-lists/:waitingListId/share',
      { waitingListId: waitingListId }
    );
  }

  leaveWaitingList (waitingListId: string): Promise<void> {
    let endpoint = '/fan/waiting-lists/:waitingListId/position';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.delete(endpoint, endpointParams);
  }

  acceptSeats (waitingListId: string): Promise<WaitingList> {
    let endpoint = '/fan/waiting-lists/:waitingListId/accept';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.post(endpoint, null, endpointParams);
  }

  rejectSeats (waitingListId: string): Promise<WaitingList> {
    let endpoint = '/fan/waiting-lists/:waitingListId/reject';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.post(endpoint, null, endpointParams);
  }

  exportSeats (waitingListId: string): Promise<void> {
    let endpoint = '/fan/waiting-lists/:waitingListId/export-seat';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.put(endpoint, null, endpointParams);
  }

  positionPaymentInfo (waitingListId: string): Promise<PaymentInfo> {
    let endpoint = '/fan/waiting-lists/:waitingListId/position/payment-info';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.get(endpoint, endpointParams);
  }

  positionBraintreeToken (waitingListId: string): Promise<BraintreeToken> {
    let endpoint = '/fan/waiting-lists/:waitingListId/position/braintree-token';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.get(endpoint, endpointParams);
  }

  createPositionSalesTransaction (
    waitingListId: string,
    transaction: PositionSalesTransactionInput
  ): Promise<PositionSalesTransaction> {
    let endpoint = '/fan/waiting-lists/:waitingListId/transaction';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.post(endpoint, transaction, endpointParams);
  }

  deletePositionSalesTransaction (waitingListId: string): Promise<any> {
    let endpoint = '/fan/waiting-lists/:waitingListId/transaction';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.delete(endpoint, endpointParams);
  }

  updateAttendeesInfo (waitingListId: string, attendeesInfo: Array<AttendeeInfo>): Promise<Position> {
    let data = {
      attendees: attendeesInfo
    };
    let endpoint = '/v2/fan/waiting-lists/:waitingListId/position/attendees-info';
    let endpointParams = { waitingListId: waitingListId };
    return this.apiContext.put(endpoint, data, endpointParams);
  }

  getEventDescription (waitingListId: string): Promise<TranslationMap> {
    return this.apiContext.get(
      '/fan/waiting-lists/:waitingListId/event-description',
      { waitingListId: waitingListId }
    );
  }

  getVenueConditions (waitingListId: string): Promise<TranslationMap> {
    return this.apiContext.get(
      '/fan/waiting-lists/:waitingListId/venue-conditions',
      { waitingListId: waitingListId }
    );
  }

  getTranslatedEventDescription (waitingListId: string): Promise<TranslationMap> {
    return this.apiContext.get(
      '/fan/waiting-lists/:waitingListId/translated-event-description',
      { waitingListId: waitingListId }
    );
  }

  getTranslatedVenueConditions (waitingListId: string): Promise<TranslationMap> {
    return this.apiContext.get(
      '/fan/waiting-lists/:waitingListId/translated-venue-conditions',
      { waitingListId: waitingListId }
    );
  }

  // Profiling (public)

  getProfilingCategories (): Promise<ProfilingCategory[]> {
    return this.apiContext.get('/profiling/v1/categories', {}, {});
  }

  getProfilingCategoryById (categoryId): Promise<ProfilingCategory> {
    return this.apiContext.get(`/profiling/v1/category/${ categoryId }`, {}, {});
  }

  getProfilingFanAttributes (query: string): Promise<ProfilingFanAttribute[]> {
    return this.apiContext.get('/profiling/v1/fan_attributes', {}, {
      query: query
    });
  }

  getProfilingFanAttributeById (fanAttributeId: string): Promise<ProfilingFanAttribute> {
    return this.apiContext.get(`/profiling/v1/fan_attribute/${ fanAttributeId }`, {}, {});
  }

  // User (fan)

  getUserInterests (): Promise<UserInterest[]> {
    return this.apiContext.get(`/profiling/v1/user/interests`, {}, {});
  }

  createUserInterest (userInterestCreateDTO: UserInterestCreateDTO): Promise<UserInterest> {
    return this.apiContext.post('/profiling/v1/user/interest', userInterestCreateDTO, {});
  }

  updateUserInterest (userInterestUpdateDTO: UserInterestUpdateDTO): Promise<UserInterest> {
    return this.apiContext.put('/profiling/v1/user/interest', userInterestUpdateDTO, {});
  }

  getUserFanAttributes (): Promise<UserFanAttribute[]> {
    return this.apiContext.get(`/profiling/v1/user/fan_attributes`, {}, {});
  }

  createUserFanAttribute (userFanAttributeCreateDTO: UserFanAttributeCreateDTO, relationsValidation: string): Promise<UserFanAttribute> {
    return this.apiContext.post(`/profiling/v1/user/fan_attribute`, userFanAttributeCreateDTO, {}, { relations_validation : relationsValidation ? 'true' : 'false'});
  }

  updateUserFanAttribute (userFanAttributeId: string, userFanAttributeUpdateDTO: UserFanAttributeUpdateDTO): Promise<UserFanAttribute> {
    return this.apiContext.post(`/profiling/v1/user/fan_attribute/${ userFanAttributeId }`, userFanAttributeUpdateDTO, {});
  }

  removeUserFanAttribute (userFanAttributeId: string): Promise<UserFanAttribute> {
    return this.apiContext.delete(`/profiling/v1/user/fan_attribute/${ userFanAttributeId }`, {}, {});
  }

}

/* tslint:enable:no-floating-promises */
