import { SimpleJSONPrimitive } from './simple-json-primitive';

export interface ArrayMap {
  [key: string]: string[] | SimpleJSONPrimitive;
}
