import { SearchResult } from '../../algolia-api';

export interface TypedSearchResult<T> extends SearchResult {
  hits: T[]
}
