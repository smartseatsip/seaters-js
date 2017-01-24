import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { app } from './app-types';


export class AppApi {

    constructor (private apiContext: ApiContext) {

    }

    env(): Promise<app.Env> {
        return this.apiContext.get<app.Env>('/app/env');
    }

    countries(pagingOptions?: PagingOptions): Promise<PagedResult<app.Country>> {
        return this.apiContext.get<PagedResult<app.Country>>('/app/countries',
            null, PagingOptions.toQueryParams(pagingOptions));
    }
    

}