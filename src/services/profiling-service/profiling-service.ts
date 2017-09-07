import { SeatersApi } from '../../seaters-api';

import { PagedResult, PagingOptions } from '../../shared-types';
import { SessionService } from '../session-service';
import { PublicService } from '../public-service';

export class ProfilingService {

  constructor (
    private seatersApi: SeatersApi,
    private sessionService: SessionService,
    private publicService: PublicService
  ) {
  }

  /**
   *  PROFILING
   */

  /**
   *  HELPERS
   */
  private convertPagedResult<T> (result: any): PagedResult<T> {
    return {
      items: result.items,
      itemOffset: result.itemOffset,
      maxPageSize: result.maxPageSize,
      page: Math.round(result.itemOffset / result.maxPageSize),
      totalSize: result.totalSize
    };
  }

}
