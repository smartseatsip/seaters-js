import { RequestDriver } from '../../api';
import { PagedResult, PagingOptions } from '../../shared-types';
import { SeatersApi } from '../../seaters-api';
import { AlgoliaForSeatersService, SearchSeatersContentOptions, TypedSearchResult, GeoLoc} from '../algolia-for-seaters';

import { AppService } from '../app-service';
import { pub } from './public-types';
import { fan } from '../fan-service/fan-types';

export class PublicService {
  private algoliaForSeatersService: AlgoliaForSeatersService;

  constructor(appService: AppService, requestDriver: RequestDriver, private seatersApi: SeatersApi) {
    this.algoliaForSeatersService = new AlgoliaForSeatersService(appService, requestDriver);
  }

  getFanGroup(fanGroupId: string): Promise<pub.FanGroup> {
    return this.algoliaForSeatersService.getFanGroupById(fanGroupId).then(fg => ({
      ...fg,
      actionStatus: this.getFanGroupActionStatus(fg)
    }));
  }

  getFanGroupLookBySlug(slug: string): Promise<fan.FanGroupLook> {
    return this.seatersApi.fan.fanGroupLook(slug).then(fg => ({
      ...fg,
      actionStatus: this.getFanGroupActionStatus(fg)
    }));
  }

  getFanGroups(fanGroupIds: string[]): Promise<pub.FanGroup[]> {
    return this.algoliaForSeatersService
      .getFanGroupsById(fanGroupIds)
      .then(result => result.map(fg => ({ ...fg, actionStatus: this.getFanGroupActionStatus(fg) })));
  }

  getWaitingList(waitingListId: string): Promise<pub.WaitingList> {
    return this.algoliaForSeatersService
      .getWaitingListById(waitingListId)
      .then(wl => ({ ...wl, actionStatus: this.getWaitingListActionStatus(wl) }));
  }

  getWaitingListsInFanGroup(fanGroupId: string, pagingOptions: PagingOptions, geoLoc?: GeoLoc, keywords?: string[], dateTimeStamp?: string): Promise<PagedResult<pub.WaitingList>> {
    return this.algoliaForSeatersService
      .getWaitingListsByFanGroupId(fanGroupId, pagingOptions.maxPageSize, pagingOptions.page, geoLoc, keywords, dateTimeStamp)
      .then(result => this.convertAlgoliaResultSet(result))
      .then(result => {
        result.items = result.items.map(wl => ({ ...wl, actionStatus: this.getWaitingListActionStatus(wl) }));
        return result;
      });
  }

  getWaitingListsInFanGroups(
    fanGroupIds: string[],
    pagingOptions: PagingOptions
  ): Promise<PagedResult<pub.WaitingList>> {
    return this.algoliaForSeatersService
      .getWaitingListsByFanGroupIds(fanGroupIds, pagingOptions.maxPageSize, pagingOptions.page)
      .then(result => this.convertAlgoliaResultSet(result))
      .then(result => {
        result.items = result.items.map(wl => ({ ...wl, actionStatus: this.getWaitingListActionStatus(wl) }));
        return result;
      });
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
      .then(result => this.convertAlgoliaResultSet<pub.SeatersContent>(result))
      .then(result => {
        result.items = result.items.map(content => {
          if (content.type === 'WAITING_LIST') {
            content = { ...content, actionStatus: this.getWaitingListActionStatus(content) };
          }

          if (content.type === 'FAN_GROUP') {
            content = { ...content, actionStatus: this.getFanGroupActionStatus(content) };
          }

          return content;
        });
        return result;
      });
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
      .then(result => this.convertAlgoliaResultSet<pub.WaitingList>(result))
      .then(result => {
        result.items = result.items.map(wl => ({ ...wl, actionStatus: this.getWaitingListActionStatus(wl) }));
        return result;
      });
  }

  getWaitingListsByKeywords(keywords: string[], page?: PagingOptions): Promise<PagedResult<pub.WaitingList>> {
    page = this.defaultPage(page);
    return this.algoliaForSeatersService
      .getWaitingListsByKeywords(keywords, page.maxPageSize, page.page)
      .then(result => this.convertAlgoliaResultSet<pub.WaitingList>(result))
      .then(result => {
        result.items = result.items.map(wl => ({ ...wl, actionStatus: this.getWaitingListActionStatus(wl) }));
        return result;
      });
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

  private getFanGroupActionStatus(
    fanGroup: pub.FanGroup | pub.FanGroupLook | fan.FanGroup | fan.FanGroupLook
  ): fan.FAN_GROUP_ACTION_STATUS {
    if (fanGroup.accessMode === 'CODE_PROTECTED' || fanGroup.accessMode === 'PRIVATE') {
      return fan.FAN_GROUP_ACTION_STATUS.CAN_UNLOCK;
    }

    return fan.FAN_GROUP_ACTION_STATUS.CAN_JOIN;
  }

  /**
   *
   * The action status for public fan groups is limited since we don't have:
   * - position
   * - seat
   * - request
   * - ...
   * since the user is not logged in
   */
  private getWaitingListActionStatus(waitingList: pub.WaitingList): fan.WAITING_LIST_ACTION_STATUS {
    // Coming soon
    if (
      waitingList.waitingListStatus === 'PUBLISHED' ||
      waitingList.waitingListStatus === 'SETUP' ||
      waitingList.waitingListStatus === 'DRAFT'
    ) {
      return fan.WAITING_LIST_ACTION_STATUS.SOON;
    }

    // Closed
    if (waitingList.waitingListStatus === 'CLOSED') {
      return undefined;
    }

    // Code protected
    if (waitingList.accessMode === 'CODE_PROTECTED') {
      return fan.WAITING_LIST_ACTION_STATUS.UNLOCK;
    }

    // Public
    if (waitingList.accessMode === 'PUBLIC') {
      return fan.WAITING_LIST_ACTION_STATUS.BOOK;
    }

    // Anything else is not supported since the user is not logged in
    return undefined;
  }
}
