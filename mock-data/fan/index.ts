import { Mock, mkMock, RequestOptions } from '../types';

import { fan } from './fan';
import { lockedFg, unlockFg } from './locked-fg';
import { braintreePaymentInfo, braintreeToken } from './payment-info';
import { fanGroupLook } from './fan-group-look';

export const fanMocks: Mock[] = [

    mkMock('GET', '/api/fan', {
        status: 200,
        statusText: 'OK',
        body: fan
    }),

    mkMock('GET', '/api/fan/groups/locked-fg', () => {
        return {
            'status': 200,
            'statusText': 'OK',
            'body': lockedFg()
        };
    }),

    mkMock('POST', '/api/fan/groups/locked-fg/request-with-data', (options: RequestOptions) => {
        return {
            'status': 200,
            'statusText': 'OK',
            'body': unlockFg(options),
        };
    }),
    
    mkMock('PUT', '/api/fan/groups/locked-fg/request', (options: RequestOptions) => {
        return {
            'status': 200,
            'statusText': 'OK',
            'body': unlockFg(options),
        };
    }),

    mkMock('GET', '/api/fan/waiting-lists/braintree-wlid/position/payment-info', {
        'status': 200,
        'statusText': 'OK',
        'body': braintreePaymentInfo
    }),

    mkMock('GET', '/api/fan/waiting-lists/braintree-wlid/position/braintree-token', {
        'status': 200,
        'statusText': 'OK',
        'body': braintreeToken
    }),

    mkMock('GET', '/api/fan/fangroups-by-slug/a-public-fg/look', {
        'status': 200,
        'statusText': 'OK',
        'body': fanGroupLook
    }),

];