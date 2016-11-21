var SeatersSDK = require('../../dist/seaters.module.js');
var testConfig = require(process.env.TEST_CONFIG || process.cwd() + '/test-configs/default.json');
var client = new SeatersSDK.SeatersClient(testConfig.apiLocation);

module.exports = {
    SeatersSDK: SeatersSDK,
    client: client,
    testConfig: testConfig
};