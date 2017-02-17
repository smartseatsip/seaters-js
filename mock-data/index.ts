import { RequestOptions } from '../src/api';
import { fan, lockedFg, unlockFg, braintreePaymentInfo, braintreeToken } from './fan';

interface MockData {
    status: number,
    statusText: string,
    body: any
}

declare type MockDataGenerator = (requestOptions: RequestOptions) => MockData;
declare type Mock = MockData | MockDataGenerator;

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

};
