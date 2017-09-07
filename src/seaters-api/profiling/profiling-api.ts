import { SeatersApiContext } from '../seaters-api-context';
import { Category } from './profiling-types';

export class ProfilingApi {
  constructor (private apiContext: SeatersApiContext) {

  }

  /**
   *  CATEGORIES
   */

  getCategories (): Promise<Category[]> {
    return this.apiContext.get('/v1/categories', {}, {});
  }

  /**
   *  CATEGORY
   */

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
}
