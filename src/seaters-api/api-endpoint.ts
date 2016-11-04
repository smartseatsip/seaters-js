export class ApiEndpoint {

    public abstractEndpoint;

    public concreteEndpoint;

    public concreteEndpointWithQueryParams;

    public absoluteEndpoint;

    constructor (
        abstractEndpoint: string,
        private endpointParams: Map<string, string>,
        private queryParams: Map<string, string>,
        private prefix: string
    ) {
        this.abstractEndpoint = this.normalizeAbstractEndpoint(abstractEndpoint);
        this.concreteEndpoint = this.renderConcreteEndpoint();
        this.concreteEndpointWithQueryParams = this.renderConcreteEndpointWithQueryParams();
        this.absoluteEndpoint = this.renderAbsoluteEndpoint();
    }

    private normalizeAbstractEndpoint (abstractEndpoint: string): string {
        return abstractEndpoint
            .replace(/^\//, '') // no prefixed '/'
            .replace(/\/$/, ''); // no trailing '/'
    }

    private renderEndpointParam (paramName: string) {
        if (!this.endpointParams.has(paramName)) {
            throw 'Unable to render endpoint param: ' + paramName;
        }
        return encodeURIComponent(this.endpointParams.get(paramName));
    }

    private renderConcreteEndpoint () : string {
        var endpointParamRx = /:([a-zA-Z][a-zA-Z0-9]*)/;
        return this.abstractEndpoint.replace(endpointParamRx, (match) => {
            return this.renderEndpointParam(match[1]);
        });
    }

    private renderConcreteEndpointWithQueryParams() : string {
        if(this.queryParams.size === 0) {
            return this.concreteEndpoint;
        }
        var params: string[] = [];
        for(var queryParam in this.queryParams.entries()) {
            params.push(
                encodeURIComponent(queryParam) + '=' +
                encodeURIComponent(this.queryParams.get(queryParam)) 
            );
        }
        var res = this.concreteEndpoint;
        // if there is already a query part
        if (res.lastIndexOf('?') >= 0) {
            // append '&' there is none yet 
            if (!/&$/.test(res)) {
                res = res + '&';
            }
        } else {
            res =+ '?';
        }
        return res + params.join('&');
    }

    private renderAbsoluteEndpoint () {
        // remove trailing '/' from the prefix
        var normalizedPrefix = this.prefix.replace(/\/$/, '');
        return normalizedPrefix + '/' + this.concreteEndpointWithQueryParams;
    }

}