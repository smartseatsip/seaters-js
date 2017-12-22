export interface PagedResult<T> {
  maxPageSize: number;
  itemOffset: number;
  totalSize: number;
  items: T[];
}

export interface PagedSortedResult<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}
