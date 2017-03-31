import { Mock, mkMock, RequestOptions } from '../types';

import { fan } from './fan';
import { lockedFg, unlockFg } from './locked-fg';
import { braintreePaymentInfo, braintreeToken } from './payment-info';
import { fanGroupLook } from './fan-group-look';
import { waitingListWithoutSeat, waitingListWithSeat, waitingListsWithSeat, waitingListsWithoutSeat } from './waiting-list';
import * as flowPayWl from './flow-pay-wl';
import * as flowCheckout from './flow-checkout';
import * as eventDescription from './event-description';

export const fanMocks: Mock[] = [].concat([

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

    mkMock('GET', '/api/fan/joined-waiting-lists?maxPageSize=10&itemOffset=0', {
        status: 200,
        statusText: 'OK',
        body: waitingListsWithoutSeat 
    }),

    mkMock('GET', '/api/fan/active-waiting-lists-with-seat?maxPageSize=10&itemOffset=0', {
        status: 200,
        statusText: 'OK',
        body: waitingListsWithSeat 
    }),

], flowPayWl.mocks, flowCheckout.mocks, eventDescription.mocks);

