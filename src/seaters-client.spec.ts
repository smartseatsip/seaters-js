/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

import { SeatersClient } from './seaters-client';

describe('SeatersClient', function() {
    it('should greet me', function() {
        var client = new SeatersClient();
        var greeting = client.greet('Ben');
        expect(greeting).toEqual('Hello, Ben');
    });
});