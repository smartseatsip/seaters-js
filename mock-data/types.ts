import { RequestOptions as _RequestOptions } from '../src/api';
import { PagedResult } from '../src/seaters-api';

export interface RequestOptions extends _RequestOptions {}

export type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export interface MockData {
  status: number;
  statusText: string;
  body: any;
}

export type MockDataGenerator = (requestOptions: RequestOptions) => MockData;

export type Mock = {
  endpoint: string,
  data: MockData | MockDataGenerator
};

export function mkMock (method: HttpMethod, url: string, data: MockData | MockDataGenerator): Mock {
  return {
    endpoint: method + ' ' + url,
    data: data
  };
}

export function mkPagedResult<T> (items: T[], itemOffset?: number, maxPageSize?: number, totalSize?: number): PagedResult<T> {
  return {
    items: items,
    itemOffset: itemOffset || 0,
    totalSize: totalSize || items.length,
    maxPageSize: maxPageSize
  };
}

export function oneHourFromNow (): string {

  let d = new Date();
  d.setHours(d.getHours() + 1);
  return d.toISOString();

}
