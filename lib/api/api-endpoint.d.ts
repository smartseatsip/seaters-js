export declare class ApiEndpoint {
    private endpointParams;
    private queryParams;
    private prefix;
    abstractEndpoint: any;
    concreteEndpoint: any;
    concreteEndpointWithQueryParams: any;
    absoluteEndpoint: any;
    constructor(abstractEndpoint: string, endpointParams: Map<string, string>, queryParams: Map<string, string>, prefix: string);
    private normalizeAbstractEndpoint(abstractEndpoint);
    private renderEndpointParam(paramName);
    private renderConcreteEndpoint();
    private renderConcreteEndpointWithQueryParams();
    private renderAbsoluteEndpoint();
}
