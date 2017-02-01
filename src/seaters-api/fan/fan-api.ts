import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { Fan, FanGroup, WaitingList, FanGroupRequest, Price } from './fan-types';

export class FanApi {

    constructor (private apiContext: ApiContext) {

    }

    private rootEp = '/fan';

    fan (): Promise<Fan> {
      return this.apiContext.get<Fan>(this.rootEp);
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

    private wlEndpointParams (waitingListId): Map<string, string> {
        return ApiContext.buildEndpointParams({waitingListId: waitingListId});
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
    
}
