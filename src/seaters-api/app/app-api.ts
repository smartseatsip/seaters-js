import { SeatersApiContext } from '../seaters-api-context';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { Env, Country } from './app-types';


export class AppApi {

    constructor (private apiContext: SeatersApiContext) {

    }

    env(): Promise<Env> {
        return this.apiContext.get<Env>('/app/env');
    }

    countries(pagingOptions?: PagingOptions): Promise<PagedResult<Country>> {
        var queryParams = SeatersApiContext.buildPagingQueryParams(pagingOptions);
        return this.apiContext.get<PagedResult<Country>>('/app/countries', null, queryParams);
    }
    

}