import { ApiContext } from '../../api';
import { Promise } from 'es6-promise';
import { SearchQuery, FacetFilter } from './search-query';
import { SearchResult } from './search-result';

export class IndicesApi {

  constructor (private apiContext: ApiContext) {

  }

  searchIndex (index: string, searchQuery: SearchQuery): Promise<SearchResult> {
    let abstractEndpoint = '/indexes/:index/query';
    let endpointParams = { index: index };
    let body = { params: this.serializeSearchQuery(searchQuery) };
    return this.apiContext.doRequest({
      method: 'POST',
      abstractEndpoint: abstractEndpoint,
      endpointParams: endpointParams,
      body: body
    }).then(response => {
      if (response.status !== 200) {
        return Promise.reject({
          error: 'Unexpected response status code',
          response: response
        });
      }
      try {
        return JSON.parse(response.body) as SearchResult;
      } catch (exception) {
        return Promise.reject({
          error: 'Unable to parse algolia response',
          parseException: exception,
          response: response
        });
      }
    });
  }

  private serializeSearchQuery (searchQuery: SearchQuery): string {
    let params = [];

    function defaultSerializer (item: any) {
      return encodeURIComponent(item);
    }

    function defaultArraySerializer (item: any[]) {
      return defaultSerializer(JSON.stringify(item));
    }

    let serializers: Object = {
      query: defaultSerializer as any,
      hitsPerPage: defaultSerializer as any,
      page: defaultSerializer as any,
      restrictSearchableAttributes: defaultArraySerializer as any,
      facetFilters: function (facetFilters: FacetFilter[]) {
        return defaultArraySerializer(facetFilters.map(
          facet => facet.facet + ':' + facet.value
        ));
      } as any,
      typoTolerance: defaultSerializer as any,
      maxValuesPerFacet: defaultSerializer as any,
      tagFilters: defaultArraySerializer as any
    } as SearchQuery;
    Object.keys(searchQuery).forEach(key => {
      if (!serializers.hasOwnProperty(key)) {
        throw new Error('Unmapped SearchQuery property: ' + key);
      }
      params.push(key + '=' + serializers[key](searchQuery[key]));
    });
    return params.join('&');
  }

}
