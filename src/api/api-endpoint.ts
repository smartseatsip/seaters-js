import { StringMap } from './string-map';

export class ApiEndpoint {

  public abstractEndpoint;

  public concreteEndpoint;

  public concreteEndpointWithQueryParams;

  public absoluteEndpoint;

  constructor (
    abstractEndpoint: string,
    private endpointParams: StringMap,
    private queryParams: StringMap,
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

  private renderEndpointParam (parameter: string) {
    if (!this.endpointParams.hasOwnProperty(parameter)) {
      throw 'Unable to render endpoint param: ' + parameter;
    }
    // SimpleJSONPrimitive can always be cast to string
    return encodeURIComponent(<string>this.endpointParams[parameter]);
  }

  private renderConcreteEndpoint (): string {
    var endpointParamRx = /:([a-zA-Z][a-zA-Z0-9]*)/g;
    return this.abstractEndpoint.replace(endpointParamRx, (match) => {
      return this.renderEndpointParam(match.substr(1));
    });
  }

  private renderQueryParams (): string {
    return Object.keys(this.queryParams).map(parameter => {
      var value = <string>this.queryParams[parameter];
      return encodeURIComponent(parameter) + '=' + encodeURIComponent(value);
    }).join('&');
  }

  private renderConcreteEndpointWithQueryParams (): string {
    if (Object.keys(this.queryParams).length === 0) {
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
