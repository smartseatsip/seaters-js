import { SeatersApi } from '../../seaters-api';

import { PagedResult, PagingOptions } from '../../shared-types';
import { SessionService } from '../session-service';
import { PublicService } from '../public-service';
import { profiling } from './profiling-types';

export class ProfilingService {

  constructor (
    private seatersApi: SeatersApi,
    private sessionService: SessionService,
    private publicService: PublicService
  ) {
  }

  /**
   *  CATEGORIES
   */

  getCategories (): Promise<profiling.Category[]> {
    return this.seatersApi.profiling.getCategories();
  }

  /**
   *  CATEGORY
   */

  getCategoryById (categoryId): Promise<profiling.Category> {
    return this.seatersApi.profiling.getCategoryById(categoryId);
  }

  /**
   *  INTERESTS
   */

  /**
   *  INTEREST
   */

  /**
   *  EXTERNAL IDENTIFIERS
   */

  /**
   *  EXTERNAL IDENTIFIER
   */

  /**
   *  FAN ATTRIBUTES
   */

  /**
   *  FAN ATTRIBUTE
   */

  /**
   *  USERS
   */

  /**
   *  USER
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
