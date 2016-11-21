import * as core from 'core-js/library';
import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { WaitingList } from './waiting-list';
import { FanGroup } from './fan-group';

export class FanApi {

    constructor (private apiContext: ApiContext) {
    }

    waitingList (waitingListId: string): Promise<WaitingList> {
        let endpointParams = new core.Map<string, string>();
        endpointParams.set('waitingListId', waitingListId);
        return this.apiContext.get<WaitingList>('/fan/waiting-lists/:waitingListId', endpointParams);
    }

    fanGroup (fanGroupId: string): Promise<FanGroup> {
        let endpointParams = new core.Map<string, string>();
        endpointParams.set('fanGroupId', fanGroupId);
        return this.apiContext.get<FanGroup>('/fan/groups/:fanGroupId', endpointParams);
    }

}
