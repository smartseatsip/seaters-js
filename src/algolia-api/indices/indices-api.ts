import { ApiContext, ApiEndpoint } from '../../api';
import { Promise } from 'es6-promise';
import { SearchQuery, FacetFilter } from './search-query';
import { SearchResult } from './search-result';
import { Map } from 'core-js/library';

export class IndicesApi {

    constructor (private apiContext: ApiContext) {
    
    }
    
    private serializeSearchQuery(searchQuery: SearchQuery): string {
        var params = [];
        function defaultSerializer (item: any) {
            return encodeURIComponent(item);
        }
        function defaultArraySerializer (item: any[]) {
            return defaultSerializer(JSON.stringify(item));
        }
        var serializers: Object = <SearchQuery> {
            query: <any>defaultSerializer,
            hitsPerPage: <any>defaultSerializer,
            page: <any>defaultSerializer,
            restrictSearchableAttributes: <any>defaultArraySerializer,
            facetFilters: <any>function (facetFilters: FacetFilter[]) {
                return defaultArraySerializer(facetFilters.map(
                    facet => facet.facet + ':' + facet.value
                ));
            },
            typoTolerance: <any>defaultSerializer,
            maxValuesPerFacet: <any>defaultSerializer
        }
        Object.keys(searchQuery).forEach(key => {
            if(!serializers.hasOwnProperty(key)) {
                throw new Error('Unmapped SearchQuery property: ' + key);
            }
            params.push(key + '=' + serializers[key](searchQuery[key]));
        });
        return params.join('&');
    }

    searchIndex (index: string, searchQuery: SearchQuery): Promise<SearchResult> {
        var abstractEndpoint = '/indexes/:index/query';
        var endpointParams = { index: index };
        var body = JSON.stringify({ params: this.serializeSearchQuery(searchQuery) });
        return this.apiContext.doRequest({
            method: 'POST',
            abstractEndpoint: abstractEndpoint,
            endpointParams: endpointParams,
            body: body
        }).then(response => {
            if(response.status !== 200) {
                return Promise.reject({
                    error: 'Unexpected response status code',
                    response: response
                });
            }
            try {
                return <SearchResult> JSON.parse(response.body);
            } catch (exception) {
                return Promise.reject({
                    error: 'Unable to parse algolia response',
                    parseException: exception,
                    response: response
                });
            }
        });
    }

}