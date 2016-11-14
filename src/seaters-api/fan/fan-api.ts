import * as core from 'core-js/library';
import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { WaitingList } from './waitinglist';

export class FanApi {

    constructor (private apiContext: ApiContext) {
    }

    //TODO: apiContext endpoint params should be implemented first
    waitinglist(waitingListId: string): Promise<WaitingList> {
        let endpointParams = new core.Map<string,string>();
        endpointParams.set('listId',waitingListId);
        return this.apiContext.get<WaitingList>('/fan/waiting-lists',
          endpointParams, null);
    }

}
