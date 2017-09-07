import { SeatersApiContext } from '../seaters-api-context';
import { Category } from './profiling-types';

export class ProfilingApi {
  constructor (private apiContext: SeatersApiContext) {

  }

  getCategories(): Promise<Category[]> {
    return this.apiContext.get('/v1/categories', {}, {});
  }
}
