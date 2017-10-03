import { AppService } from './../app-service';
import { AlgoliaApi, SearchQuery, SearchResult, FacetFilter } from '../../algolia-api';
import { RequestDriver } from '../../api';

import { FanGroup, WaitingList, TypedSearchResult, FG_ALGOLIA_TYPE, WL_ALGOLIA_TYPE, TYPE_FIELD, TYPO_TOLERANCE_STRICT } from './algolia-for-seaters-types';

const DEFAULT_LOCALE = 'en';
const WL_FACET_FILTER: FacetFilter = { facet: TYPE_FIELD, value: WL_ALGOLIA_TYPE };

export class AlgoliaForSeatersService {

  private _apiP: Promise<AlgoliaApi>;

  private searchIndex: string;

  constructor (private appService: AppService, private requestDriver: RequestDriver) {

  }

  getFanGroupById (fanGroupId: string): Promise<FanGroup> {
    let q = this.buildExactQuery(fanGroupId, 'fanGroupId', FG_ALGOLIA_TYPE);
    return this.findExactlyOne<FanGroup>(q, 'FanGroup', fanGroupId);

  }

  getFanGroupsById (fanGroupIds: string[]): Promise<FanGroup[]> {
    let fanGroupIdsFilter = fanGroupIds.map((fanGroupId) => 'fanGroupId:' + fanGroupId).join(' OR ');
    let q: SearchQuery = {
      query: '',
      typoTolerance: TYPO_TOLERANCE_STRICT,
      facetFilters: [{
        facet: TYPE_FIELD,
        value: FG_ALGOLIA_TYPE
      }],
      filters: fanGroupIdsFilter
    };
    return this.findExactlyN<FanGroup>(q, fanGroupIds);
  }

  getWaitingListsByFanGroupId (fanGroupId: string, hitsPerPage: number, page: number):
    Promise<TypedSearchResult<WaitingList>> {
    // TODO: sort by date ascending
    let q = this.buildExactQuery(fanGroupId, 'groupId', 'WAITING_LIST');
    q.page = page;
    q.hitsPerPage = hitsPerPage;
    return this.search(q)
      .then(r => this.stripAlgoliaFieldsFromSearchResultHits(r));
  }

  getWaitingListsByFanGroupIds (fanGroupIds: string[], hitsPerPage: number, page: number):
    Promise<TypedSearchResult<WaitingList>> {
    let fanGroupIdsFilter = fanGroupIds.map((fanGroupId) => 'groupId:' + fanGroupId).join(' OR ');
    let q: SearchQuery = {
      query: '',
      typoTolerance: TYPO_TOLERANCE_STRICT,
      facetFilters: [WL_FACET_FILTER],
      filters: fanGroupIdsFilter,
      page: page,
      hitsPerPage: hitsPerPage
    };
    return this.search(q)
      .then(r => this.stripAlgoliaFieldsFromSearchResultHits(r));
  }

  getWaitingListById (waitingListId: string): Promise<WaitingList> {
    let q = this.buildExactQuery(waitingListId, 'waitingListId', 'WAITING_LIST');
    return this.findExactlyOne<WaitingList>(q, 'WaitingList', waitingListId);
  }

  search (searchQuery: SearchQuery): Promise<SearchResult> {
    return this.api()
      .then((api) => api.indices.searchIndex(this.searchIndex, searchQuery))
      .then((res) => {
        res.hits.filter((item) => item.type === WL_ALGOLIA_TYPE)
          .forEach((item) => this.patchWaitingList(item));
        return res;
      });
  }

  searchWaitingListsInFanGroup (fanGroupId: string, query: string, locale: string, hitsPerPage: number, page: number): Promise<TypedSearchResult<WaitingList>> {
    return this.getSearchableAttributes(locale).then((searchableAttributes) => {
      let q: SearchQuery = {
        query: query,
        facetFilters: [
          WL_FACET_FILTER,
          // specific fangroup filter
          {
            facet: 'groupId',
            value: fanGroupId
          }
        ],
        restrictSearchableAttributes: searchableAttributes,
        hitsPerPage: hitsPerPage,
        page: page
      };
      return this.search(q)
        .then((r) => this.stripAlgoliaFieldsFromSearchResultHits(r));
    });
  }

  searchSeatersContent (query: string, locale: string, hitsPerPage: number, page: number): Promise<SearchResult> {
    return this.getSearchableAttributes(locale).then(searchableAttributes => {
      let q: SearchQuery = {
        query: query,
        facetFilters: [],
        restrictSearchableAttributes: searchableAttributes,
        hitsPerPage: hitsPerPage,
        page: page
      };
      return this.search(q)
        .then(r => this.stripAlgoliaFieldsFromSearchResultHits(r));
    });
  }

  getWaitingListsByKeywords (keywords: string[], hitsPerPage: number, page: number): Promise<SearchResult> {
    let q: SearchQuery = {
      query: '',
      facetFilters: [WL_FACET_FILTER],
      hitsPerPage: hitsPerPage,
      page: page,
      tagFilters: keywords
    };
    return this.search(q)
      .then(r => this.stripAlgoliaFieldsFromSearchResultHits(r));
  }

  private api (): Promise<AlgoliaApi> {
    if (!this._apiP) {
      this._apiP = this.appService.getEnv().then(env => {
        let cfg = env.algoliaConfiguration;
        this.searchIndex = cfg.indexName;
        return new AlgoliaApi(cfg.appId, cfg.apiKey, this.requestDriver);
      });
    }
    return this._apiP;
  }

  private buildExactQuery (query: string, field: string, type: string): SearchQuery {
    return {
      query: query,
      typoTolerance: 'strict',
      facetFilters: [{
        facet: 'type',
        value: type
      }],
      restrictSearchableAttributes: [field]
    } as SearchQuery;
  }

  private findExactlyOne<T> (searchQuery: SearchQuery, entityType: string, identifier: string): Promise<T> {
    return this.findExactlyN<T>(searchQuery, [identifier])
      .then((results) => results[0]);
  }

  private findExactlyN<T> (searchQuery: SearchQuery, identifiers: string[]): Promise<T[]> {
    let n = identifiers.length;
    return this.search(searchQuery)
      .then(searchResult => {
        if (searchResult.nbHits === n) {
          if (searchResult.hits.length === n) {
            return searchResult.hits as T[];
          } else {
            // depending on algolia's limits we can technically ask for too many fangroups in one search query
            // by the time this happens we're hopefully not using algolia for this purpose anymore.
            let err = '[AlgoliaForSeatersService] could not fetch entire requested page-size';
            console.error(err);
            throw new Error(err);
          }
        } else {
          let err = '[AlgoliaForSeatersService] unexpected nb hits from algolia on query';
          console.log('[AlgoliaForSeatersService] expected %s but found %s results', n, searchResult.nbHits);
          console.error(err, searchResult);
          throw new Error(err);
        }
      });
  }

  private getSearchableAttributes (locale: string): Promise<string[]> {
    if (!locale) {
      locale = DEFAULT_LOCALE;
    }
    return this.appService.getEnv().then(env => {
      let cfg = env.algoliaConfiguration;
      if (!cfg.attributes.hasOwnProperty(locale)) {
        if (locale === DEFAULT_LOCALE || !cfg.attributes.hasOwnProperty(DEFAULT_LOCALE)) {
          let err = '[AlgoliaForSeatersService] seaters misconfiguration - searchable attributes for default locale undefined';
          console.error(err);
          throw err;
        } else {
          console.warn('[AlgoliaForSeatersService] locale is not supported for search - falling back to %s', DEFAULT_LOCALE);
          locale = DEFAULT_LOCALE;
        }
      }
      return cfg.attributes[locale];
    });
  }

  private stripAlgoliaFieldsFromObject<T> (result: any): T {
    delete result._geoloc;
    delete result._tags;
    delete result._highlightResult;
    delete result.objectID;
    return result as T;
  }

  private stripAlgoliaFieldsFromSearchResultHits<T> (result: SearchResult): SearchResult {
    result.hits.forEach(hit => this.stripAlgoliaFieldsFromObject(hit));
    return result;
  }

  private patchWaitingList (wl: any): WaitingList {
    // TODO remove as soon as backend exposes .price
    if (!wl.hasOwnProperty('price')) {
      (wl as WaitingList).price = {
        facialPrice: wl.facialPrice,
        formattedFacialPrice: wl.formattedFacialPrice,
        totalFacialPrice: wl.totalFacialPrice,
        formattedTotalFacialPrice: wl.formattedTotalFacialPrice,
        feeExcVat: wl.feeExcVat,
        formattedFeeExcVat: wl.formattedFeeExcVat,
        feeVat: wl.feeVat,
        formattedFeeVat: wl.formattedFeeVat,
        fee: wl.fee,
        formattedFee: wl.formattedFee,
        total: wl.total,
        formattedTotal: wl.formattedTotal,
        originalPrice: wl.originalPrice,
        discountAmount: wl.discountAmount,
        discountPercentage: wl.discountPercentage,
        formattedOriginalPrice: wl.formattedOriginalPrice,
        formattedDiscountAmount: wl.formattedDiscountAmount
      };
    }
    return wl;
  }

}
