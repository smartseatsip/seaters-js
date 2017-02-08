import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { Fan, FanGroup, WaitingList, FanGroupRequest, Price } from './fan-types';

export class FanApi {

    constructor (private apiContext: ApiContext) {

    }

    fan (): Promise<Fan> {
      return this.apiContext.get<Fan>('/fan');
    }

    updateFan (fan: Fan): Promise<Fan> {
      return this.apiContext.put<Fan>('/fan', fan);
    }

    private fgEndpointParams (fanGroupId) {
        return ApiContext.buildEndpointParams({fanGroupId: fanGroupId});
    }

    fanGroup (fanGroupId: string): Promise<FanGroup> {
        return this.apiContext.get<FanGroup>(
            '/fan/groups/:fanGroupId',
            this.fgEndpointParams(fanGroupId)
        );
    }

    joinFanGroup (fanGroupId: string): Promise<FanGroup> {
        return this.apiContext.post<FanGroup>(
            '/fan/groups/:fanGroupId',
            null, this.fgEndpointParams(fanGroupId)
        );
    }

    joinProtectedFanGroup (fg: FanGroup, code: string): Promise<FanGroupRequest> {
      var data = {
        code: code
      };

      if (!fg.membership.request) {
        var endpoint1 = '/fan/groups/:fanGroupId/request-with-data';
        return this.apiContext.post<FanGroupRequest>(endpoint1, data, this.fgEndpointParams(fg.id));
      }
      else {
        var endpoint2 = '/fan/groups/:fanGroupId/request';
        return this.apiContext.put<FanGroupRequest>(endpoint2, data, this.fgEndpointParams(fg.id));
      }
    }

    leaveFanGroup (fanGroupId: string): Promise<void> {
        return this.apiContext.delete(
            '/fan/groups/:fanGroupId',
            this.fgEndpointParams(fanGroupId)
        )
        .then(() => undefined);
    }

    waitingListsInFanGroup (fanGroupId: string, pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
        var endpointParams = ApiContext.buildEndpointParams({fanGroupId: fanGroupId});
        var queryParams = this.buildPagingQueryParams(pagingOptions);
        return this.apiContext.get(
            '/fan/groups/:fanGroupId/waiting-lists',
            endpointParams,
            queryParams
        );
    }

    joinedFanGroups (pagingOptions: PagingOptions): Promise<PagedResult<FanGroup>> {
        return this.apiContext.get(
            '/fan/joined-groups',
            null,
            this.buildPagingQueryParams(pagingOptions)
        );
    }

    joinedWaitingListsWithoutSeat (pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
        return this.apiContext.get(
            '/fan/joined-waiting-lists',
            null,
            this.buildPagingQueryParams(pagingOptions)
        );
    }

    joinedWaitingListsWithSeat (pagingOptions: PagingOptions): Promise<PagedResult<WaitingList>> {
        return this.apiContext.get(
            '/fan/active-waiting-lists-with-seat',
            null,
            this.buildPagingQueryParams(pagingOptions)
        );
    }

    waitingList (waitingListId: string): Promise<WaitingList> {
        var endpoint = '/fan/waiting-lists/:waitingListId';
        var endpointParams = this.wlEndpointParams(waitingListId);
        return this.apiContext.get<WaitingList>(endpoint, endpointParams);
    }

    waitingListPrice (waitingListId: string, numberOfSeats: number): Promise<Price> {
        var endpoint = '/fan/waiting-lists/:waitingListId/price/:numberOfSeats';
        var endpointParams = ApiContext.buildEndpointParams({
            waitingListId: waitingListId,
            numberOfSeats: numberOfSeats
        });
        return this.apiContext.get<Price>(endpoint, endpointParams);
    }

    joinWaitingList (waitingListId: string, numberOfSeats: number): Promise<WaitingList> {
        var endpoint = '/fan/waiting-lists/:waitingListId/position';
        var endpointParams = this.wlEndpointParams(waitingListId);
        var data = { numberOfSeats: numberOfSeats };
        return this.apiContext.post<WaitingList>(endpoint, data, endpointParams);
    }

    leaveWaitingList (waitingListId: string): Promise<void> {
        var endpoint = '/fan/waiting-lists/:waitingListId/position';
        var endpointParams = this.wlEndpointParams(waitingListId);
        return this.apiContext.delete<void>(endpoint, endpointParams)
        .then(() => undefined);
    }

    acceptSeats (waitingListId: string): Promise<WaitingList> {
        var endpoint = '/fan/waiting-lists/:waitingListId/accept';
        var endpointParams = this.wlEndpointParams(waitingListId);
        return this.apiContext.post<WaitingList>(endpoint, null, endpointParams);
    }

    exportSeats (waitingListId: string): Promise<void> {
      var endpoint = '/fan/waiting-lists/:waitingListId/export-seat';
      var endpointParams = this.wlEndpointParams(waitingListId);
      return this.apiContext.put<void>(endpoint, null, endpointParams);
    }

    private buildPagingQueryParams(pagingOptions: PagingOptions): Map<string, string> {
        return ApiContext.buildEndpointParams({
            maxPageSize: pagingOptions.maxPageSize,
            itemOffset: pagingOptions.itemOffset
        });
    }

    private wlEndpointParams (waitingListId): Map<string, string> {
        return ApiContext.buildEndpointParams({waitingListId: waitingListId});
    }

}
