import { PagedResult as ApiPagedResult, PagedSortedResult as ApiPagedSortedResult, SeatersApi } from '../seaters-api';
import { PagedResult } from '../shared-types';

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
  protected convertPagedSortedResult<T>(result: ApiPagedSortedResult<T>): PagedResult<T> {
    return {
      items: result.content,
      itemOffset: result.number,
      maxPageSize: result.size,
      page: result.number,
      totalSize: result.totalElements
    };
  }
}
