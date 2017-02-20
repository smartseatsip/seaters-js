import { RequestOptions } from '../src/api';

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

