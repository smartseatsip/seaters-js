import { MockData, MockDataGenerator, Mock } from './types';
import { RequestOptions } from '../src/api';
import { fanMocks } from './fan';
import { adminMocks } from './admin';

var unlockedFg = false;
var unlockedFgSuccess = false;

export const data = {};

[
    fanMocks,
    adminMocks
].forEach(mockSet => {
    mockSet.forEach(mock => {
        data[mock.endpoint] = mock.data
    });
});
