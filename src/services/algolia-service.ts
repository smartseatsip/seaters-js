import * as algoliasearch from 'algoliasearch';
import { Promise } from 'es6-promise';

export type SearchResult = {
    hits: any[],
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
    options: algoliasearch.AlgoliaQueryParameters
};

export class AlgoliaService {

    private client: algoliasearch.AlgoliaClient;

    private searchIndex: algoliasearch.AlgoliaIndex;

    constructor (applicationId: string, apiKey: string, searchIndexName: string) {
        var options: algoliasearch.ClientOptions = null;
        this.client = algoliasearch(applicationId, apiKey, options);
        this.searchIndex = this.client.initIndex(searchIndexName);
    }

    search (query: algoliasearch.AlgoliaQueryParameters): Promise<any> {
        return this.searchIndex.search(query);
    }

    buildExactSearchQuery (
        query: string,
        attribute: string,
        type: string,
        pageSize: number
    ): algoliasearch.AlgoliaQueryParameters {
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

}