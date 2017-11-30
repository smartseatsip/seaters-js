import { RequestDriver } from '../../api';
import { PagedResult, PagingOptions } from '../../shared-types';
import { SeatersApi } from '../../seaters-api';
import { AlgoliaForSeatersService, TypedSearchResult, SearchSeatersContentOptions } from '../algolia-for-seaters';
import { AppService } from '../app-service';
import { pub } from './public-types';

export class PublicService {
  private algoliaForSeatersService: AlgoliaForSeatersService;

  constructor(appService: AppService, requestDriver: RequestDriver, private seatersApi: SeatersApi) {
    this.algoliaForSeatersService = new AlgoliaForSeatersService(appService, requestDriver);
  }

  getFanGroup(fanGroupId: string): Promise<pub.FanGroup> {
    return this.algoliaForSeatersService.getFanGroupById(fanGroupId);
  }

  getFanGroupLookBySlug(slug: string): Promise<pub.FanGroupLook> {
    return this.seatersApi.fan.fanGroupLook(slug);
  }

  getFanGroups(fanGroupIds: string[]): Promise<pub.FanGroup[]> {
    return this.algoliaForSeatersService.getFanGroupsById(fanGroupIds);
  }

  getWaitingList(waitingListId: string): Promise<pub.WaitingList> {
    return this.algoliaForSeatersService.getWaitingListById(waitingListId);
  }

  getWaitingListsInFanGroup(fanGroupId: string, pagingOptions: PagingOptions): Promise<PagedResult<pub.WaitingList>> {
    return this.algoliaForSeatersService
      .getWaitingListsByFanGroupId(fanGroupId, pagingOptions.maxPageSize, pagingOptions.page)
      .then(result => this.convertAlgoliaResultSet(result));
  }

  getWaitingListsInFanGroups(
    fanGroupIds: string[],
    pagingOptions: PagingOptions
  ): Promise<PagedResult<pub.WaitingList>> {
    return this.algoliaForSeatersService
      .getWaitingListsByFanGroupIds(fanGroupIds, pagingOptions.maxPageSize, pagingOptions.page)
      .then(result => this.convertAlgoliaResultSet(result));
  }

  getWaitingListPrice(waitingListId: string, numberOfSeats: number): Promise<pub.Price> {
    return this.seatersApi.fan.waitingListPrice(waitingListId, numberOfSeats) as Promise<pub.Price>;
  }

  searchSeatersContent(
    query: string,
    locale: string,
    page?: PagingOptions,
    options?: SearchSeatersContentOptions
  ): Promise<PagedResult<pub.SeatersContent>> {
    page = this.defaultPage(page);
    return this.algoliaForSeatersService
      .searchSeatersContent(query, locale, page.maxPageSize, page.page, options)
      .then(result => this.convertAlgoliaResultSet<pub.SeatersContent>(result));
  }

  searchWaitingListsInFanGroup(
    fanGroupId: string,
    query: string,
    locale: string,
    page?: PagingOptions
  ): Promise<PagedResult<pub.WaitingList>> {
    page = this.defaultPage(page);
    return this.algoliaForSeatersService
      .searchWaitingListsInFanGroup(fanGroupId, query, locale, page.maxPageSize, page.page)
      .then(result => this.convertAlgoliaResultSet<pub.WaitingList>(result));
  }

  getWaitingListsByKeywords(keywords: string[], page?: PagingOptions): Promise<PagedResult<pub.WaitingList>> {
    page = this.defaultPage(page);
    return this.algoliaForSeatersService
      .getWaitingListsByKeywords(keywords, page.maxPageSize, page.page)
      .then(result => this.convertAlgoliaResultSet<pub.WaitingList>(result));
  }

  private defaultPage(page: PagingOptions): PagingOptions {
    if (typeof (page as any) === 'object') {
      return page;
    } else {
      return {
        maxPageSize: 10,
        page: 0
      };
    }
  }

  private convertAlgoliaResultSet<T>(searchResult: TypedSearchResult<T>): PagedResult<T> {
    return {
      items: searchResult.hits as T[],
      itemOffset: searchResult.page * searchResult.hitsPerPage,
      page: searchResult.page,
      maxPageSize: searchResult.hitsPerPage,
      totalSize: searchResult.nbHits
    };
  }
}
