/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../seaters-api-context';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { Env, Country, Currency, Translation, TimeZone, Language,
  TRANSLATION_TARGET } from './app-types';

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

  languages (pagingOptions?: PagingOptions): Promise<PagedResult<Language>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return this.apiContext.get('/app/languages', null, queryParams);
  }

  timeZones (pagingOptions?: PagingOptions): Promise<PagedResult<TimeZone>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return this.apiContext.get('/app/time-zones', null, queryParams);
  }

  currencies (pagingOptions?: PagingOptions): Promise<PagedResult<Currency>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return this.apiContext.get('/app/currencies', null, queryParams);
  }

  translations (target?: TRANSLATION_TARGET, language?: string, pagingOptions?: PagingOptions): Promise<PagedResult<Translation>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    if (target) { queryParams.target = target; }
    if (language) { queryParams.language = language; }
    return this.apiContext.get('/app/translations', null, queryParams);
  }

}

/* tslint:enable:no-floating-promises */
