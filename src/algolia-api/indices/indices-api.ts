import { ApiContext } from '../../api';
import { FacetFilter, SearchQuery } from './search-query';
import { SearchResult } from './search-result';

export class IndicesApi {
  constructor(private apiContext: ApiContext) {}

  searchIndex(index: string, searchQuery: SearchQuery): Promise<SearchResult> {
    const abstractEndpoint = '/indexes/:index/query';
    const endpointParams = { index };
    const body = { params: this.serializeSearchQuery(searchQuery) };
    return this.apiContext
      .doRequest({
        method: 'POST',
        abstractEndpoint,
        endpointParams,
        body
      })
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject({
            error: 'Unexpected response status code',
            response
          }) as any;
        }
        try {
          return JSON.parse(response.body) as SearchResult;
        } catch (exception) {
          return Promise.reject({
            error: 'Unable to parse algolia response',
            parseException: exception,
            response
          });
        }
      });
  }

  private serializeSearchQuery(searchQuery: SearchQuery): string {
    const params = [];
    console.log('QUERY =>', searchQuery);

    function defaultSerializer(item: any) {
      return encodeURIComponent(item);
    }

    function defaultArraySerializer(item: any[]) {
      return defaultSerializer(JSON.stringify(item));
    }

    const serializers: SearchQuery = {
      query: defaultSerializer as any,
      hitsPerPage: defaultSerializer as any,
      page: defaultSerializer as any,
      restrictSearchableAttributes: defaultArraySerializer as any,
      facetFilters: ((facetFilters: FacetFilter[]) => {
        return defaultArraySerializer(facetFilters.map(facet => facet.facet + ':' + facet.value));
      }) as any,
      typoTolerance: defaultSerializer as any,
      maxValuesPerFacet: defaultSerializer as any,
      tagFilters: defaultArraySerializer as any,
      filters: defaultSerializer as any,
      aroundLatLng: defaultSerializer as any,
      aroundRadius: defaultSerializer as any
    };
    Object.keys(searchQuery).forEach(key => {
      if (!serializers.hasOwnProperty(key)) {
        throw new Error('Unmapped SearchQuery property: ' + key);
      }
      if (searchQuery[key]) {
        params.push(key + '=' + serializers[key](searchQuery[key]));
      }
    });
    return params.join('&');
  }
}
