import { Promise } from 'es6-promise';
import { RequestDriver } from '../../api';
import { PagedResult, PagingOptions } from '../../shared-types';
import { SeatersApi } from '../../seaters-api';
import { AlgoliaForSeatersService, TypedSearchResult } from '../algolia-for-seaters';
import { AppService } from '../app-service';
import { pub } from './public-types';

export class PublicService {

    private algoliaForSeatersService: AlgoliaForSeatersService;

    constructor (appService: AppService, requestDriver: RequestDriver, private seatersApi: SeatersApi) {
        this.algoliaForSeatersService = new AlgoliaForSeatersService(appService, requestDriver);
    }

    getFanGroup (fanGroupId: string): Promise<pub.FanGroup> {
        return this.algoliaForSeatersService.getFanGroupById(fanGroupId);
    }

    getWaitingList (waitingListId: string): Promise<pub.WaitingList> {
        return this.algoliaForSeatersService.getWaitingListById(waitingListId);
    }

    getWaitingListsInFanGroup (fanGroupId: string, pagingOptions: PagingOptions): Promise<PagedResult<pub.WaitingList>> {
        return this.algoliaForSeatersService.getWaitingListsByFanGroupId(fanGroupId, pagingOptions.maxPageSize, pagingOptions.page)
        .then(result => this.convertAlgoliaResultSet(result));
    }

    getWaitingListPrice (waitingListId: string, numberOfSeats: number): Promise<pub.Price> {
        return <Promise<pub.Price>>this.seatersApi.fan.waitingListPrice(waitingListId, numberOfSeats);
    }

    private convertAlgoliaResultSet<T> (searchResult: TypedSearchResult<T>): PagedResult<T> {
        return {
            items: <T[]> searchResult.hits,
            itemOffset: searchResult.page * searchResult.hitsPerPage,
            page: searchResult.page,
            maxPageSize: searchResult.hitsPerPage,
            totalSize: searchResult.nbHits
        };
    }

}