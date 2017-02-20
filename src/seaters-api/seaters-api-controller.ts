import { PagingOptions } from './paging-options';

export abstract class SeatersApiController {

    protected buildParams(obj: Object): Map<string, string> {

        var map = new Map<string, string>();
        Object.keys(obj).forEach(k => map.set(k, obj[k]));
        return map;

    }

    protected buildPagingQueryParams(pagingOptions: PagingOptions): Map<string, string> {
        return this.buildParams({
            maxPageSize: pagingOptions.maxPageSize,
            itemOffset: pagingOptions.itemOffset
        });
    }

}