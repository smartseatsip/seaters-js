import { SeatersApi } from '../../seaters-api';
import { WaitingListService } from './waiting-list-service';
import { FanGroupService } from './fan-group-service';
import { Promise } from 'es6-promise';
import { fan } from './fan-types';

import { PagedResult, PagingOptions } from '../../shared-types';

export class FanService {

    public waitingListService: WaitingListService;

    public fanGroupService: FanGroupService;

    constructor (private seatersApi: SeatersApi) {
        this.waitingListService = new WaitingListService(seatersApi);
        this.fanGroupService = new FanGroupService(seatersApi);
    }
    
    getWaitingListsInFanGroup (fanGroupId: string, pagingOptions: PagingOptions): Promise<PagedResult<fan.WaitingList>> {
        return this.seatersApi.fan.waitingListsInFanGroup(fanGroupId, this.convertPagingOptions(pagingOptions))
        .then(r => this.convertPagedResult(r));
    }

    private convertPagingOptions(pagingOptions: PagingOptions): any {
        return {
            itemOffset: pagingOptions.page * pagingOptions.maxPageSize,
            maxPageSize: pagingOptions.maxPageSize
        };
    }

    private convertPagedResult<T>(result: any): PagedResult<T> {
        return {
            items: result.items,
            itemOffset: result.itemOffset,
            maxPageSize: result.maxPageSize,
            page: Math.round(result.itemOffset / result.maxPageSize),
            totalSize: result.totalSize
        };
    }

}