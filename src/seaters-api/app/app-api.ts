/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../seaters-api-context';
import { Env, Country, Currency, Translation, TimeZone, Language,
  TRANSLATION_TARGET } from './app-types';
import { PagingOptions } from '../../shared-types';

export class AppApi {

  constructor (private apiContext: SeatersApiContext) {

  }

  env (): Promise<Env> {
    return this.apiContext.get('/app/env');
  }

  countries (pagingOptions?: PagingOptions): Promise<Array<Country>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/countries', null, queryParams));
  }

  languages (pagingOptions?: PagingOptions): Promise<Array<Language>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/languages', null, queryParams));
  }

  timeZones (pagingOptions?: PagingOptions): Promise<Array<TimeZone>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/time-zones', null, queryParams));
  }

  currencies (pagingOptions?: PagingOptions): Promise<Array<Currency>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/currencies', null, queryParams));
  }

  translations (target?: TRANSLATION_TARGET, language?: string, pagingOptions?: PagingOptions): Promise<Array<Translation>> {
    let queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    if (target) { queryParams.target = target; }
    if (language) { queryParams.lang = language; }
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/translations', null, queryParams));
  }

}

/* tslint:enable:no-floating-promises */
