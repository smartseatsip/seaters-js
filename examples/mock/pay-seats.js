/**
 * Simulates paying for seats
 *
 * Assumptions:
 * - The FG of the WL is configured with braintree as payment system
 * - The fan is logged in
 * - The fan joined the FG related to this WL
 * - The fan joined the WL
 * - The fgo assigned seats to the fan
 */
var shared = require('./_shared');
var client = shared.client;
var sdk = shared.sdk;
var wlId = 'wlid-flow-pay-wl-braintree';
var braintreeSDK = shared.braintreeSDKMock;

Promise.resolve()
  .then(() => {
    return client.fanService.getWaitingList(wlId);
  })
  .then(wl => {
    console.log('ActionStatus for WL(%s) => %s', wlId, sdk.fan.WAITING_LIST_ACTION_STATUS[wl.actionStatus]);
    return client.fanService.getPositionBraintreePaymentInfo(wlId);
  })
  .then(btrPaymentInfo => {
    // initialize braintree integration - example dropin (braintree SDK v2)
    // full specs see https://developers.braintreepayments.com/guides/client-sdk/setup/javascript/v2
    return new Promise((resolve, reject) => {
      braintreeSDK.setup(btrPaymentInfo.token, 'dropin', {
        container: 'some-div',
        onReady: () => { /* ... do something when the dropin form is ready ... */
        },
        onError: () => { /* ... do something with client-side errors ... */
        },
        onPaymentMethodReceived: (data) => {
          client.fanService.payPosition(wlId, {
            braintreePayment: {
              paymentMethodNonce: data.nonce
            }
          }).then(resolve, reject);
        }
      });
    });
  })
  .then((payedWl) => {
    console.log('Payment completed', payedWl);
  })
  .then(shared.exitOK, shared.exitFail);
