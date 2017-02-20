import { fan, lockedFg, unlockFg, braintreePaymentInfo, braintreeToken, fanGroupLook } from './fan';
import { MockData, MockDataGenerator, Mock } from './types';
import { RequestOptions } from '../src/api';
import { adminMocks } from './admin';

var unlockedFg = false;
var unlockedFgSuccess = false;

export const data = {

    "GET /api/fan": <MockData> {
        "status": 200,
        "statusText": "OK",
        "body": fan
    },

    "GET /api/fan/groups/locked-fg": <MockDataGenerator> () => {
        return {
            "status": 200,
            "statusText": "OK",
            "body": lockedFg()
        };
    },

    "POST /api/fan/groups/locked-fg/request-with-data": <MockDataGenerator> (options: RequestOptions) => {
        var body = JSON.parse(options.body);
        var success = body.code !== "invalid code";
        return {
            "status": 200,
            "statusText": "OK",
            "body": unlockFg(success),
        };
    },
    
    "PUT /api/fan/groups/locked-fg/request": <MockDataGenerator> (options: RequestOptions) => {
        var body = JSON.parse(options.body);
        var success = body.code !== "invalid code";
        return {
            "status": 200,
            "statusText": "OK",
            "body": unlockFg(success),
        };
    },

    "GET /api/fan/waiting-lists/braintree-wlid/position/payment-info": <MockData> {
        "status": 200,
        "statusText": "OK",
        "body": braintreePaymentInfo
    },

    "GET /api/fan/waiting-lists/braintree-wlid/position/braintree-token": <MockData> {
        "status": 200,
        "statusText": "OK",
        "body": braintreeToken
    },

    "GET /api/fan/fangroups-by-slug/a-public-fg/look": <MockData> {
        "status": 200,
        "statusText": "OK",
        "body": fanGroupLook
    },

};

adminMocks.forEach(mock => {
    data[mock.endpoint] = mock.data
});
