import { PaymentInfo, PaymentInfoTransaction, BraintreeToken } from '../../src/seaters-api/fan';

let transaction: PaymentInfoTransaction = {
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
  transactions: [transaction],
  paymentSystemType: 'BRAINTREE',
  braintreeConfig: {
    threeDSEnabled: true
  },
  adyenConfig: null,
  paypalConfig: null
};

export const braintreeToken: BraintreeToken = {
  token: 'a-braintree-token'
};

export const realBraintreeToken: BraintreeToken = {
  token: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJjN2MzNGM4OTg3ZTlmY2U4YmQ2NWFjMWM1OTg5ZTU2YThkMDc4MjQ3OGM2MWQzZjNjMGE1ODhiNjM3YTkzOGUyfGNyZWF0ZWRfYXQ9MjAxNy0wMy0wMVQxMzoyNDowMy4wNzgwNzI2MzkrMDAwMFx1MDAyNm1lcmNoYW50X2FjY291bnRfaWQ9U2VhdGVyc1Rlc3RFdXJvXzNEU1x1MDAyNm1lcmNoYW50X2lkPTd6ODN5NHl4cWZjc3BqNXlcdTAwMjZwdWJsaWNfa2V5PXJqaGR6dnNtbnB2Zmtrc2IiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvN3o4M3k0eXhxZmNzcGo1eS9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzd6ODN5NHl4cWZjc3BqNXkvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzd6ODN5NHl4cWZjc3BqNXkifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6ZmFsc2UsImNvaW5iYXNlRW5hYmxlZCI6ZmFsc2UsIm1lcmNoYW50SWQiOiI3ejgzeTR5eHFmY3NwajV5IiwidmVubW8iOiJvZmYiLCJtZXJjaGFudEFjY291bnRJZCI6IlNlYXRlcnNUZXN0RXVyb18zRFMifQ'
};
