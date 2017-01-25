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

    private fgEp = this.rootEp + '/groups/:fanGroupId';
    private fgProtectedWithoutRequest = this.fgEp + '/request-with-data';
    private fgProcectedWithRequest    = this.fgEp + '/request';

    private fgEndpointParams (fanGroupId) {
        return ApiContext.buildEndpointParams({fanGroupId: fanGroupId});
    }

    fanGroup (fanGroupId: string): Promise<fan.FanGroup> {
        return this.apiContext.get<fan.FanGroup>(this.fgEp, this.fgEndpointParams(fanGroupId));
    }

    joinFanGroup (fanGroupId: string): Promise<fan.FanGroup> {
        return this.apiContext.post<fan.FanGroup>(this.fgEp, null, this.fgEndpointParams(fanGroupId));
    }

    joinProtectedFanGroup (fg: fan.FanGroup, code: string): Promise<fan.FanGroupRequest> {
      var data = {
        code: code
      };
      if (!fg.membership.request)
        return this.apiContext.post<fan.FanGroupRequest>(this.fgProtectedWithoutRequest, data, this.fgEndpointParams(fg.id));
      else
        return this.apiContext.put<fan.FanGroupRequest>(this.fgProcectedWithRequest, data, this.fgEndpointParams(fg.id));
    }

    leaveFanGroup (fanGroupId: string): Promise<void> {
        return this.apiContext.delete(this.fgEp, this.fgEndpointParams(fanGroupId))
        .then(() => undefined);
    }

    private wlEp = this.rootEp + '/waiting-lists/:waitingListId';

    private wlEndpointParams (waitingListId): Map<string, string> {
        return ApiContext.buildEndpointParams({waitingListId: waitingListId});
    }

    private wlPriceEp = this.rootEp + '/waiting-lists/:waitingListId/price/:numberOfSeats';

    waitingList (waitingListId: string): Promise<fan.WaitingList> {
        return this.apiContext.get<fan.WaitingList>(this.wlEp, this.wlEndpointParams(waitingListId));
    }

    waitingListPrice (waitingListId: string, numberOfSeats: number): Promise<fan.Price> {
        return this.apiContext.get<fan.Price>(
            this.wlPriceEp,
            ApiContext.buildEndpointParams({waitingListId: waitingListId, numberOfSeats: numberOfSeats})
        );
    }

    joinWaitingList (waitingListId: string, numberOfSeats: number): Promise<fan.WaitingList> {
        return this.apiContext.post<fan.WaitingList>(
            this.wlEp+'/position',
            {
                numberOfSeats: numberOfSeats
            },
            this.wlEndpointParams(waitingListId)
        );
    }

    leaveWaitingList (waitingListId: string): Promise<void> {
        return this.apiContext.delete<void>(
            this.wlEp + '/position',
            this.wlEndpointParams(waitingListId)
        ).then( () => undefined);
    }

}
