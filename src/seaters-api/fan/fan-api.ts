import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { WaitingList } from './waiting-list';
import { FanGroup } from './fan-group';

export class FanApi {

    constructor (private apiContext: ApiContext) {

    }

    private fgEndpoint = '/fan/groups/:fanGroupId';

    private fgEndpointParams (fanGroupId) {
        return ApiContext.buildEndpointParams({fanGroupId: fanGroupId});
    }

    fanGroup (fanGroupId: string): Promise<FanGroup> {
        return this.apiContext.get<FanGroup>(this.fgEndpoint, this.fgEndpointParams(fanGroupId));
    }

    joinFanGroup (fanGroupId: string): Promise<FanGroup> {
        return this.apiContext.post<FanGroup>(this.fgEndpoint, null, this.fgEndpointParams(fanGroupId));
    }

    private wlEndpoint = '/fan/waiting-lists/:waitingListId';

    private wlEndpointParams (waitingListId) {
        return ApiContext.buildEndpointParams({waitingListId: waitingListId});
    }

    waitingList (waitingListId: string): Promise<WaitingList> {
        return this.apiContext.get<WaitingList>(this.wlEndpoint, this.wlEndpointParams(waitingListId));
    }

    joinWaitingList (waitingListId: string): Promise<WaitingList> {
        return this.apiContext.post<WaitingList>(this.wlEndpoint, this.wlEndpointParams(waitingListId));
    }

}
