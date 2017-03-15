import { HEALTH_NODE_OK } from '../../src/seaters-api/health/health-types';
import { Mock, MockDataGenerator, RequestOptions } from '../types';

var nodeDown: boolean = false;

export function toggleNodeDown() {
    nodeDown = !nodeDown;
}

var renderMockData: MockDataGenerator = (requestOptions) => {
    if(nodeDown) {
        return {
            status: 503,
            statusText: 'Service Unavailable',
            body: 'Load balancer 503 message'
        };
    } else {
        return {
            status: 200,
            statusText: 'OK',
            body: HEALTH_NODE_OK
        };
    }
};

export const NODE_MOCK: Mock = {
    endpoint: 'GET /api/health/node',
    data: renderMockData
};