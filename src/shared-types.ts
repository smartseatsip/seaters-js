export interface PagedResult<T> {

    /**
     * An array containing the records for the specified Page
     */
    items: T[],

    /**
     * The offset of the first item in the items array (ZERO-based)
     */
    itemOffset: number,

    /**
     * The page that was fetched (ZERO-based)
     */
    page: number,

    /**
     * How many items there will be at most in the items[] array
     */
    maxPageSize: number,

    /**
     * Total number of results
     */
    totalSize: number

}

export interface PagingOptions {

    /**
     * The page that should be fetched.
     * ZERO-based - this means page 0 will contain records 1-10 for a maxPageSize of 10
     */
    page?: number,

    /**
     * How many items you want to fetch per page.
     */
    maxPageSize?: number

}
