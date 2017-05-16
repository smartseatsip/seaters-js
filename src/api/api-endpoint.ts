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
      throw new Error('Unable to render endpoint param: ' + parameter);
    }
    // SimpleJSONPrimitive can always be cast to string
    return encodeURIComponent(this.endpointParams[parameter] as string);
  }

  private renderConcreteEndpoint (): string {
    let endpointParamRx = /:([a-zA-Z][a-zA-Z0-9]*)/g;
    return this.abstractEndpoint.replace(endpointParamRx, (match) => {
      return this.renderEndpointParam(match.substr(1));
    });
  }

  private renderQueryParams (): string {
    let paramsArray = Object.keys(this.queryParams).map(key => {
      const value: string | string[] = this.queryParams[key] as string | string[];
      if (Object.prototype.toString.call(value) === '[object Array]') {
        const valueArray = value as string[];
        return valueArray.map(param => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(param);
        }).join('&');
      } else {
        const valueString = value as string;
        return encodeURIComponent(key) + '=' + encodeURIComponent(valueString);
      }
    });
    return paramsArray.join('&');
  }

  private renderConcreteEndpointWithQueryParams (): string {
    if (Object.keys(this.queryParams).length === 0) {
      return this.concreteEndpoint;
    }
    let res = this.concreteEndpoint;
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
    let normalizedPrefix = this.prefix.replace(/\/$/, '');
    return normalizedPrefix + '/' + this.concreteEndpointWithQueryParams;
  }

}
