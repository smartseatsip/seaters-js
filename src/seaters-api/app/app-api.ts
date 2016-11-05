import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { Country } from './country';
import { Env } from './env';


export class AppApi {

    constructor (private apiContext: ApiContext) {

    }

    env(): Promise<Env> {
        return this.apiContext.get<Env>('/app/env');
    }

    countries(pagingOptions?: PagingOptions): Promise<PagedResult<Country>> {
        return this.apiContext.get<PagedResult<Country>>('/app/countries',
            null, PagingOptions.toQueryParams(pagingOptions));
    }
    

}