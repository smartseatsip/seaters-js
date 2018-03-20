/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../seaters-api-context';
import { Country, Currency, Env, Language, TimeZone, Translation, TRANSLATION_TARGET } from './app-types';
import { PagingOptions } from '../../shared-types';

export class AppApi {
  constructor(private apiContext: SeatersApiContext) {}

  env(): Promise<Env> {
    return this.apiContext.get('/app/env');
  }

  countries(pagingOptions?: PagingOptions): Promise<Country[]> {
    const queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/countries', null, queryParams));
  }

  languages(pagingOptions?: PagingOptions): Promise<Language[]> {
    const queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/languages', null, queryParams));
  }

  timeZones(pagingOptions?: PagingOptions): Promise<TimeZone[]> {
    const queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/time-zones', null, queryParams));
  }

  currencies(pagingOptions?: PagingOptions): Promise<Currency[]> {
    const queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/currencies', null, queryParams));
  }

  translations(target?: TRANSLATION_TARGET, language?: string, pagingOptions?: PagingOptions): Promise<Translation[]> {
    const queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
    if (target) {
      queryParams.target = target;
    }
    if (language) {
      queryParams.lang = language;
    }
    return SeatersApiContext.convertPagedResultToArray(this.apiContext.get('/app/translations', null, queryParams));
  }

  userDefaultLocale(): Promise<string> {
    return this.apiContext.doSeatersRequest({
      method: 'GET',
      abstractEndpoint: '/app/user-default-locale'
    });
  }
}

/* tslint:enable:no-floating-promises */
