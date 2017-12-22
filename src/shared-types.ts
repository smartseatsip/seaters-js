export interface PagedResult<T> {
  /**
   * An array containing the records for the specified Page
   */
  items: T[];

  /**
   * The offset of the first item in the items array (ZERO-based)
   */
  itemOffset: number;

  /**
   * The page that was fetched (ZERO-based)
   */
  page: number;

  /**
   * How many items there will be at most in the items[] array
   */
  maxPageSize: number;

  /**
   * Total number of results
   */
  totalSize: number;
}

export interface PagedSortedResult<T> {
  /**
   * If the fetched result is the first page
   */
  first: boolean;
  /**
   * If the fetched result is the last page
   */
  last: boolean;

  /**
   * The page that was fetched (ZERO-based)
   */
  number: number;

  /**
   * Number of result items fetched in this call
   */
  numberOfElements: number;

  /**
   * How many items there will be at most in the content[] array
   */

  size: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * An array containing the records for the specified page
   */
  content: T[];

  /**
   * Total number of results beyond the fetched data
   */
  totalElements: number;

  sort: any;
}

export interface PagingOptions {
  /**
   * The page that should be fetched.
   * ZERO-based - this means page 0 will contain records 1-10 for a maxPageSize of 10
   */
  page?: number;

  /**
   * How many items you want to fetch per page.
   */
  maxPageSize?: number;

  /**
   * Sort order criteria, prefixed property name(s) either single or comma seperated
   * "category_order, interest_name"
   */
  sort?: string;

  /**
   *  Key value object representing filter name and it is value
   *  { category_id: XXXXX }
   */
  filters?: object;
}
