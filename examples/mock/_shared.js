var SeatersSDK = require('../../dist/seaters.module');
var mocks = require('../../dist/seaters-mock-data.module');
var mockData = mocks.data;

exports.scenarios = mocks.scenarios;

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

exports.braintreeSDKMock = {
  setup: function (token, integration, options) {
    if (options.onReady) {
      options.onReady();
    }
    if (options.onPaymentMethodReceived) {
      options.onPaymentMethodReceived({
        nonce: 'a-valid-nonce',
        type: 'CreditCard',
        details: {
          cardType: 'Visa',
          lastTwo: '00'
        }
      });
    }
  }
};
