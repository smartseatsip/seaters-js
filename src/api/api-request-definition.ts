import { HTTP_METHOD } from './http-method';
import { StringMap } from './string-map';
import { ArrayMap } from './array-map';

export interface ApiRequestDefinition {
  abstractEndpoint: string;
  method?: HTTP_METHOD;
  endpointParams?: StringMap;
  queryParams?: StringMap | ArrayMap;
  body?: string | Object;
  headers?: { [key: string]: string };
}
