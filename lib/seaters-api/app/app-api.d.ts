import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { Country } from './country';
import { Env } from './env';
export declare class AppApi {
    private apiContext;
    constructor(apiContext: ApiContext);
    env(): Promise<Env>;
    countries(pagingOptions?: PagingOptions): Promise<PagedResult<Country>>;
}
