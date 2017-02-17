import { PaymentInfo, PaymentInfoTransaction, BraintreeToken } from '../../src/seaters-api/fan';

var transaction: PaymentInfoTransaction = {
    currency: 'EUR',
    total: '11.82',
    description: 'Seaters transaction',
    items: [
        {
            name: 'Total facial price',
            currency: 'EUR',
            price: '10.00',
            quantity: '1'
        },
        {
            name: 'Fee (exc. VAT)',
            currency: 'EUR',
            price: '1.50',
            quantity: '1'
        },
        {
            name: 'Fee VAT',
            currency: 'EUR',
            price: '0.32',
            quantity: '1'
        }
    ]
};

export const braintreePaymentInfo: PaymentInfo = {
    transactions: [ transaction ],
    paymentSystemType: 'BRAINTREE',
    braintreeConfig: {
        threeDSEnabled: true
    },
    adyenConfig: null,
    paypalConfig: null
}

export const braintreeToken: BraintreeToken = {
    token: 'a-braintree-token'
}
