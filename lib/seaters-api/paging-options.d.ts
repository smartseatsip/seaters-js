export declare class PagingOptions {
    itemOffset: number;
    maxPageSize: number;
    constructor(itemOffset?: number, maxPageSize?: number);
    static toQueryParams(pagingOptions: PagingOptions, queryParams?: Map<string, string>): Map<string, string>;
}
