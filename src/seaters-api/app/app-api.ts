/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../seaters-api-context';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { Env, Country } from './app-types';

export class AppApi {

  constructor (private apiContext: SeatersApiContext) {

  }

  env (): Promise<Env> {
    return this.apiContext.get('/app/env');
  }

  countries (pagingOptions?: PagingOptions): Promise<PagedResult<Country>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return this.apiContext.get('/app/countries', null, queryParams);
  }

}

/* tslint:enable:no-floating-promises */
