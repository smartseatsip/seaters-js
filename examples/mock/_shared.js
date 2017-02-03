var SeatersSDK = require('../../dist/seaters.module');
var mockData = require('../../dist/seaters-mock-data.module').data;

console.log('SeatersSDK - v%s\n--------------', SeatersSDK.version);

exports.sdk = SeatersSDK;
exports.client = SeatersSDK.getSeatersClient({
    requestDriver: 'MOCK',
    mockData: mockData 
});

exports.exitOK = () => process.exit(0);
exports.exitFail = (err) => {
    console.error('FAIL', err);
    process.exit(1);
};
