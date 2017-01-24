import { ApiContext, ApiEndpoint } from '../../api';
import { Promise } from 'es6-promise';
import { SearchQuery, FacetFilter } from './search-query';
import { SearchResult } from './search-result';
import { Map } from 'core-js/library';

export class IndicesApi {

    constructor (private apiContext: ApiContext) {
    
    }
    
    /**
     * query=99896a68-8a5d-48e4-947c-a344121b4316
     * &getRankingInfo=1
     * &facets=*
     * &attributesToRetrieve=*
     * &highlightPreTag=%3Cem%3E
     * &highlightPostTag=%3C%2Fem%3E
     * &hitsPerPage=10
     * &facetFilters=%5B%22type%3AFAN_GROUP%22%5D
     * &restrictSearchableAttributes=fanGroupId
     * &typoTolerance=true&maxValuesPerFacet=100

     */
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
        var endpoint = '/indexes/:index/query';
        var body = { params: this.serializeSearchQuery(searchQuery) };
        var params = ApiContext.buildEndpointParams({ index: index });
        return this.apiContext.post<SearchResult>(endpoint, body, params);
    }

}