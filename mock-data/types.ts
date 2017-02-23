import { RequestOptions as _RequestOptions } from '../src/api';

export interface RequestOptions extends _RequestOptions {}

export type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export interface MockData {
    status: number,
    statusText: string,
    body: any
}

export type MockDataGenerator = (requestOptions: RequestOptions) => MockData;

export type Mock = {
    endpoint: string,
    data: MockData | MockDataGenerator
};

export function mkMock(method: HttpMethod, url: string, data: MockData | MockDataGenerator): Mock {
    return {
        endpoint: method + ' ' + url,
        data: data
    };
};