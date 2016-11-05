export interface PagedResult<T> {
    maxPageSize: number;
    itemOffset: number;
    totalSize: number;
    items: T[];
}
