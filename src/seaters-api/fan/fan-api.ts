import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { WaitingList } from './waiting-list';
import { FanGroup } from './fan-group';
import { Fan } from "./fan";

export class FanApi {

    constructor (private apiContext: ApiContext) {

    }

    private rootEp = '/fan';

    fan (): Promise<Fan> {
      return this.apiContext.get<Fan>(this.rootEp);
    }

    private fgEp = this.rootEp + '/groups/:fanGroupId';
    private fgProtectedWithoutRequest = this.fgEp + '/request-with-data';
    private fgProcectedWithRequest    = this.fgEp + '/request';

    private fgEndpointParams (fanGroupId) {
        return ApiContext.buildEndpointParams({fanGroupId: fanGroupId});
    }

    fanGroup (fanGroupId: string): Promise<FanGroup> {
        return this.apiContext.get<FanGroup>(this.fgEp, this.fgEndpointParams(fanGroupId));
    }

    joinFanGroup (fanGroupId: string): Promise<FanGroup> {
        return this.apiContext.post<FanGroup>(this.fgEp, null, this.fgEndpointParams(fanGroupId));
    }

    joinProtectedFanGroup (fg: FanGroup, code: string): Promise<Request> {
      var data = {
        code: code
      };
      if (!fg.membership.request)
        return this.apiContext.post<Request>(this.fgProtectedWithoutRequest, data, this.fgEndpointParams(fg.id));
      else
        return this.apiContext.put<Request>(this.fgProcectedWithRequest, data, this.fgEndpointParams(fg.id));
    }

    private wlEp = this.rootEp + '/waiting-lists/:waitingListId';

    private wlEndpointParams (waitingListId): Map<string, string> {
        return ApiContext.buildEndpointParams({waitingListId: waitingListId});
    }

    waitingList (waitingListId: string): Promise<WaitingList> {
        return this.apiContext.get<WaitingList>(this.wlEp, this.wlEndpointParams(waitingListId));
    }

    joinWaitingList (waitingListId: string, numberOfSeats: number): Promise<WaitingList> {
        return this.apiContext.post<WaitingList>(
            this.wlEp+'/position',
            {
                numberOfSeats: numberOfSeats
            },
            this.wlEndpointParams(waitingListId)
        );
    }

}
