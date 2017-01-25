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
        var endpoint = '/indexes/:index/query';
        var body = { params: this.serializeSearchQuery(searchQuery) };
        var params = ApiContext.buildEndpointParams({ index: index });
        return this.apiContext.post<SearchResult>(endpoint, body, params);
    }

}