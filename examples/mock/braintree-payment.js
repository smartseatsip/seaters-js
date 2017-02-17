var shared = require('./_shared');

/***
 * Assumptions:
 * - braintree-wlid points to a WL that is configured using braintree
 * - the user is logged in, booked some tickets and is able to pay for them
 *   (both preauthorizations and normal payments)
 */

shared.client.fanService.getPositionBraintreePaymentInfo('braintree-wlid')
.then(paymentInfo => console.log('Payment Info that can be used for braintree SDK', paymentInfo))
.then(shared.exitOK, shared.exitFail);