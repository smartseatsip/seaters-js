import { fanMocks } from './fan';
import { adminMocks } from './admin';
import { healthScenarios, healthMocks } from './health';

export const data = {};

[
    fanMocks,
    adminMocks,
    healthMocks
].forEach(mockSet => {
    mockSet.forEach(mock => {
        data[mock.endpoint] = mock.data
    });
});

export const scenarios = {
    health: healthScenarios,
};