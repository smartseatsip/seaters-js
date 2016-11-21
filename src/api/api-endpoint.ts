import * as core from 'core-js/library';

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
            return this.renderEndpointParam(match.substr(1));
        });
    }

    private renderQueryParams() : string {
        return core.Array.from(this.queryParams).map(entry => {
            return encodeURIComponent(entry[0]) + '=' + encodeURIComponent(entry[1])
        }).join('&');
    }

    private renderConcreteEndpointWithQueryParams () : string {
        if (this.queryParams.size === 0) {
            return this.concreteEndpoint;
        }
        var res = this.concreteEndpoint;
        // if there is already a query part
        if (res.lastIndexOf('?') >= 0) {
            // append '&' there is none yet 
            if (!/&$/.test(res)) {
                res = res + '&';
            }
        } else {
            res = res + '?';
        }
        return res + this.renderQueryParams();
    }

    private renderAbsoluteEndpoint () {
        // remove trailing '/' from the prefix
        var normalizedPrefix = this.prefix.replace(/\/$/, '');
        return normalizedPrefix + '/' + this.concreteEndpointWithQueryParams;
    }

}