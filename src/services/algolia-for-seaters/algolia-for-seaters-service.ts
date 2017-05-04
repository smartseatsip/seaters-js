import { AppService } from './../app-service';
import { AlgoliaApi, SearchQuery, SearchResult } from '../../algolia-api';
import { RequestDriver } from '../../api';

import { FanGroup } from './fan-group';
import { WaitingList } from './waiting-list';
import { TypedSearchResult } from './typed-search-result';

const DEFAULT_LOCALE = 'en';

export class AlgoliaForSeatersService {

  private _apiP: Promise<AlgoliaApi>;

  private searchIndex: string;

  constructor (private appService: AppService, private requestDriver: RequestDriver) {

  }

  getFanGroupById (fanGroupId: string): Promise<FanGroup> {
    let q = this.buildExactQuery(fanGroupId, 'fanGroupId', 'FAN_GROUP');
    return this.findExactlyOne<FanGroup>(q, 'FanGroup', fanGroupId);

  }

  getWaitingListsByFanGroupId (fangroupId: string, hitsPerPage: number,
    page: number
  ): Promise<TypedSearchResult<WaitingList>> {
    // TODO: sort by date ascending
    let q = this.buildExactQuery(fangroupId, 'groupId', 'WAITING_LIST');
    q.page = page;
    q.hitsPerPage = hitsPerPage;
    return this.search(q)
      .then(r => this.stripAlgoliaFieldsFromSearchResultHits(r));
  }

  getWaitingListById (waitingListId: string): Promise<WaitingList> {
    let q = this.buildExactQuery(waitingListId, 'waitingListId', 'WAITING_LIST');
    return this.findExactlyOne<WaitingList>(q, 'WaitingList', waitingListId);
  }

  search (searchQuery: SearchQuery): Promise<SearchResult> {
    return this.api()
      .then(api => api.indices.searchIndex(this.searchIndex, searchQuery));
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
      facetFilters: [{ facet: 'type', value: 'WAITING_LIST' }],
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
    return this.search(searchQuery)
      .then(searchResult => {
        if (searchResult.nbHits === 1) {
          return searchResult.hits[0] as T;
        } else if (searchResult.nbHits === 0) {
          throw new Error('404 - not found: ' + entityType + ' (' + identifier + ')');
        } else {
          throw new Error('500 - unexpected nb hits from algolia on query: ' + searchResult.query);
        }
      })
      .then(r => this.stripAlgoliaFieldsFromObject(r));
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

}
