import { SeatersApiContext } from '../seaters-api-context';
import { Category } from './profiling-types';

export class ProfilingApi {
  constructor (private apiContext: SeatersApiContext) {

  }

  /**
   *  CATEGORIES
   */

  getCategories (): Promise<Category[]> {
    return this.apiContext.get('/profiling/v1/categories', {}, {});
  }

  /**
   *  CATEGORY
   */

  getCategoryById (categoryId): Promise<Category> {
    return this.apiContext.get(`/profiling/v1/category/${ categoryId }`, {}, {});
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
}
