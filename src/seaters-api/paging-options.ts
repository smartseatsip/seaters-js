export class PagingOptions {
  static toQueryParams(pagingOptions: PagingOptions, queryParams?: any): object {
    if (!queryParams) {
      queryParams = {};
    }
    if (!pagingOptions) {
      return queryParams;
    }
    if (pagingOptions.itemOffset) {
      queryParams.itemOffset = pagingOptions.itemOffset.toString();
    }
    if (pagingOptions.maxPageSize) {
      queryParams.maxPageSize = pagingOptions.maxPageSize.toString();
    }
    if (pagingOptions.sort) {
      queryParams.sort = pagingOptions.sort.toString();
    }
    return queryParams;
  }

  constructor(public itemOffset?: number, public maxPageSize?: number, public sort?: string) {}
}
