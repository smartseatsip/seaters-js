import { SeatersApi, PagedResult as ApiPagedResult } from '../seaters-api';
import { PagedResult, PagingOptions } from '../shared-types';

export abstract class SeatersService {
  constructor(protected seatersApi: SeatersApi) {}

  protected convertPagedResult<T>(result: ApiPagedResult<T>): PagedResult<T> {
    return {
      items: result.items,
      itemOffset: result.itemOffset,
      maxPageSize: result.maxPageSize,
      page: Math.round(result.itemOffset / result.maxPageSize),
      totalSize: result.totalSize
    };
  }
}
