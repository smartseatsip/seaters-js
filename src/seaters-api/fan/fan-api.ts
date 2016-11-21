import * as core from 'core-js/library';
import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { WaitingList } from './waiting-list';

export class FanApi {

    constructor (private apiContext: ApiContext) {
    }

    waitingList (waitingListId: string): Promise<WaitingList> {
        let endpointParams = new core.Map<string,string>();
        endpointParams.set('wlId',waitingListId);
        return this.apiContext.get<WaitingList>('/fan/waiting-lists/:wlId',
          endpointParams);
    }

}
