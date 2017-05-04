export class PagingOptions {
  constructor (public itemOffset?: number, public maxPageSize?: number) {
  }

  static toQueryParams (pagingOptions: PagingOptions, queryParams?: Map<string, string>): Map<string, string> {
    if (!queryParams) {
      queryParams = new Map<string, string>();
    }
    if (!pagingOptions) {
      return queryParams;
    }
    if (pagingOptions.itemOffset) {
      queryParams.set('itemOffset', pagingOptions.itemOffset.toString());
    }
    if (pagingOptions.maxPageSize) {
      queryParams.set('maxPageSize', pagingOptions.maxPageSize.toString());
    }
    return queryParams;
  }

}
