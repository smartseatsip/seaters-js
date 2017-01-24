export interface SearchResult {
    hits: any[],
    page: number,
    nbHits: number,
    nbPages: number,
    hitsPerPage: number,
    processingTimeMS: number,
    query: string,
    parsed_query: string,
    params: string
}
