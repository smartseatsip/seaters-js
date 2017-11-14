import { PagingOptions } from './paging-options';

export abstract class SeatersApiController {
  protected buildParams(obj: object = {}): object {
    const map = {};
    Object.keys(obj).forEach(k => (map[k] = obj[k]));
    return map;
  }

  protected buildPagingQueryParams(pagingOptions: PagingOptions): object {
    return this.buildParams({
      maxPageSize: pagingOptions.maxPageSize,
      itemOffset: pagingOptions.itemOffset
    });
  }
}
