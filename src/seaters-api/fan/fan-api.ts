import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { fan } from './fan-types';

export class FanApi {

    constructor (private apiContext: ApiContext) {

    }

    private rootEp = '/fan';

    fan (): Promise<fan.Fan> {
      return this.apiContext.get<fan.Fan>(this.rootEp);
    }

    private fgEndpointParams (fanGroupId) {
        return ApiContext.buildEndpointParams({fanGroupId: fanGroupId});
    }

    fanGroup (fanGroupId: string): Promise<fan.FanGroup> {
        return this.apiContext.get<fan.FanGroup>(
            '/fan/groups/:fanGroupId',
            this.fgEndpointParams(fanGroupId)
        );
    }

    joinFanGroup (fanGroupId: string): Promise<fan.FanGroup> {
        return this.apiContext.post<fan.FanGroup>(
            '/fan/groups/:fanGroupId',
            null, this.fgEndpointParams(fanGroupId)
        );
    }

    joinProtectedFanGroup (fg: fan.FanGroup, code: string): Promise<fan.FanGroupRequest> {
      var data = {
        code: code
      };
      
      if (!fg.membership.request) {
        var endpoint1 = '/fan/groups/:fanGroupId/request-with-data';
        return this.apiContext.post<fan.FanGroupRequest>(endpoint1, data, this.fgEndpointParams(fg.id));
      }
      else {
        var endpoint2 = '/fan/groups/:fanGroupId/request';
        return this.apiContext.put<fan.FanGroupRequest>(endpoint2, data, this.fgEndpointParams(fg.id));
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

    waitingList (waitingListId: string): Promise<fan.WaitingList> {
        var endpoint = '/fan/waiting-lists/:waitingListId';
        var endpointParams = this.wlEndpointParams(waitingListId);
        return this.apiContext.get<fan.WaitingList>(endpoint, endpointParams);
    }

    waitingListPrice (waitingListId: string, numberOfSeats: number): Promise<fan.Price> {
        var endpoint = '/fan/waiting-lists/:waitingListId/price/:numberOfSeats';
        var endpointParams = ApiContext.buildEndpointParams({
            waitingListId: waitingListId,
            numberOfSeats: numberOfSeats
        });
        return this.apiContext.get<fan.Price>(endpoint, endpointParams);
    }

    joinWaitingList (waitingListId: string, numberOfSeats: number): Promise<fan.WaitingList> {
        var endpoint = '/fan/waiting-lists/:waitingListId/position';
        var endpointParams = this.wlEndpointParams(waitingListId);
        var data = { numberOfSeats: numberOfSeats };
        return this.apiContext.post<fan.WaitingList>(endpoint, data, endpointParams);
    }

    leaveWaitingList (waitingListId: string): Promise<void> {
        var endpoint = '/fan/waiting-lists/:waitingListId/position';
        var endpointParams = this.wlEndpointParams(waitingListId);
        return this.apiContext.delete<void>(endpoint, endpointParams)
        .then(() => undefined);
    }

    acceptSeats (waitingListId: string): Promise<fan.WaitingList> {
        var endpoint = '/fan/waiting-lists/:waitingListId/accept';
        var endpointParams = this.wlEndpointParams(waitingListId);
        return this.apiContext.post<fan.WaitingList>(endpoint, null, endpointParams);
    }
    
}
