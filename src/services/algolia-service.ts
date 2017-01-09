import * as algoliasearch from 'algoliasearch';
import { Promise } from 'es6-promise';

export type SearchResult<T> = {
    hits: T[],
    nbHits: number,
    page: number,
    nbPages: number,
    hitsPerPage: number,
    processingTimeMS: number,
    facets: Object,
    exhaustigeFacetsCount: boolean,
    query: string,
    params: string
};

export type SearchQuery = {
    indexName: string,
    query: string,
    options: SearchQueryParameters
};

export type SearchQueryParameters = {
    query: string,
    restrictSearchableAttributes: string[],
    typoTolerance: boolean,
    getRankingInfo: boolean,
    facets: string,
    attributesToRetrieve: string[],
    hitsPerPage: number,
    facetFilters: string,
    maxValuesPerFacet: string,
}

export class AlgoliaService {

    private client: algoliasearch.AlgoliaClient;

    private searchIndex: algoliasearch.AlgoliaIndex;

    constructor (applicationId: string, apiKey: string, searchIndexName: string) {
        var options: algoliasearch.ClientOptions = null;
        this.client = algoliasearch(applicationId, apiKey, options);
        this.searchIndex = this.client.initIndex(searchIndexName);
    }

    search<T> (query: SearchQueryParameters): Promise<SearchResult<T>> {
        return this.searchIndex.search(<algoliasearch.AlgoliaQueryParameters>query);
    }

    buildExactSearchQuery (
        query: string,
        attribute: string,
        type: string,
        pageSize: number
    ): SearchQueryParameters {
        return {
            query: query,
            restrictSearchableAttributes: [attribute],
            typoTolerance: false,
            getRankingInfo: false,
            facets: '*',
            attributesToRetrieve: ['*'],
            hitsPerPage: 10,
            facetFilters: 'type:' + type,
            maxValuesPerFacet: pageSize.toString()
        };
    }

    stripAlgoliaFieldsFromObject<T> (result: any): T {
        delete result._geoloc;
        delete result._highlightResult;
        delete result.objectID;
        return <T> result;
    }

    stripAlgoliaFieldsFromSearchResultHits<T> (result: SearchResult<T>): SearchResult<T> {
        result.hits.forEach(hit => this.stripAlgoliaFieldsFromObject(hit));
        return result;
    }

}