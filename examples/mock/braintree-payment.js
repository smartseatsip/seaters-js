var shared = require('./_shared');

shared.client.fanService.getPositionBraintreePaymentInfo('braintree-wlid')
.then(paymentInfo => console.log('Payment Info that can be used for braintree SDK', paymentInfo))
.then(shared.exitOK, shared.exitFail);