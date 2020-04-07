export interface SearchQuery {

  /**
   * https://www.algolia.com/doc/rest-api/search/#query
   */
  query?: string;

  aroundLatLng?: string;
  aroundRadius?: number;

  /**
   * https://www.algolia.com/doc/rest-api/search/#hitsperpage
   * default: 20
   */
  hitsPerPage?: number;

  /**
   * https://www.algolia.com/doc/rest-api/search/#page
   * default: 0
   */
  page?: number;

  /**
   * https://www.algolia.com/doc/rest-api/search/#restrictsearchableattributes
   */
  restrictSearchableAttributes?: string[];

  /**
   * https://www.algolia.com/doc/rest-api/search/#facetfilters
   */
  facetFilters?: FacetFilter[];

  /**
   * https://www.algolia.com/doc/rest-api/search/#filters
   */
  filters?: string;

  /**
   * https://www.algolia.com/doc/rest-api/search/#typotolerance
   */
  typoTolerance?: 'true' | 'false' | 'strict' | 'min';

  /**
   * https://www.algolia.com/doc/rest-api/search/#maxvaluesperfacet
   * default: 100
   */
  maxValuesPerFacet?: number;

  /**
   * https://www.algolia.com/doc/guides/search/filtering-faceting/#filter-by-tags-values
   */
  tagFilters?: string[];

}

export interface FacetFilter {
  facet: string;
  value: string;
}
