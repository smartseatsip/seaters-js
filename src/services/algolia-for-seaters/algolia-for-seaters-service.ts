import { Promise } from 'es6-promise';
import { EnvService } from './../env-service';
import { FanGroup } from './fan-group';
import { WaitingList } from './waiting-list';
import { AlgoliaApi, SearchQuery, SearchResult } from '../../algolia-api';
import { RequestDriver } from '../../api';

export interface TypedSearchResult<T> extends SearchResult {
    hits: T[]
}

export class AlgoliaForSeatersService {

    private _apiP: Promise<AlgoliaApi>;

    private searchIndex: string;

    constructor (private envService: EnvService, private requestDriver: RequestDriver) {

    }

    private api (): Promise<AlgoliaApi> {
        if(!this._apiP) {
            this._apiP = this.envService.getEnv().then(env => {
                var cfg = env.algoliaConfiguration;
                this.searchIndex = cfg.indexName;
                return new AlgoliaApi(cfg.appId, cfg.apiKey, this.requestDriver); 
            });
        }
        return this._apiP;
    }

    private buildExactQuery(query: string, field: string, type: string): SearchQuery {
        return <SearchQuery> {
            query: query,
            typoTolerance: 'strict',
            facetFilters: [{
                facet: 'type',
                value: type
            }],
            restrictSearchableAttributes: [ field ]
        };
    }

    getFangroupById (fangroupId: string): Promise<FanGroup> {
        var q = this.buildExactQuery(fangroupId, 'fanGroupId', 'FAN_GROUP');
        return this.search(q)
        .then(searchResult => {
            if (searchResult.nbHits === 1) {
                return <FanGroup> searchResult.hits[0];
            } else if (searchResult.nbHits === 0) {
                throw new Error('404 - not found: FanGroup (' + fangroupId + ')');
            } else {
                throw new Error('500 - unexpected nb hits from algolia on query: ' + searchResult.query);
            }
        })
        .then(r => this.stripAlgoliaFieldsFromObject(r));
        
    }

    getWishlistsByFangroupId (fangroupId: string, hitsPerPage: number, page: number): Promise<TypedSearchResult<WaitingList>> {
        var q = this.buildExactQuery(fangroupId, 'groupId', 'WAITING_LIST');
        q.page = page;
        q.hitsPerPage = hitsPerPage;
        return this.search(q)
        .then(r => this.stripAlgoliaFieldsFromSearchResultHits(r));
    }

    search (searchQuery: SearchQuery): Promise<SearchResult> {
        return this.api()
        .then(api => api.indices.searchIndex(this.searchIndex, searchQuery));
    }

    private stripAlgoliaFieldsFromObject<T> (result: any): T {
        delete result._geoloc;
        delete result._highlightResult;
        delete result.objectID;
        return <T> result;
    }

    private stripAlgoliaFieldsFromSearchResultHits<T> (result: SearchResult): SearchResult {
        result.hits.forEach(hit => this.stripAlgoliaFieldsFromObject(hit));
        return result;
    }

}