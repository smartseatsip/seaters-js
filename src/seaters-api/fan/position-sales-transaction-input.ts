export interface PositionSalesTransactionInput {
  /**
   * The URL the payment service should redirect to in case of success
   * @format URL
   */
  successUrl: string;

  /**
   * The URL the payment service should redirect to in case the user cancelled the transaction
   * @format URL
   */
  cancelUrl: string;

  /**
   * The Adyen payment info for the server to create the transaction
   */
  adyenPayment: AdyenPaymentInput;

  /**
   * The Braintree payment info for the server to create the transaction
   */
  braintreePayment: BraintreePaymentInput;

  /**
   * Paypal Payment ID (retrieved on Payment creation)
   */
  paypalPaymentId: string;

  /**
   * Seaters payment info for the server to create the translations
   */
  seatersPayment: SeatersPaymentInput;
}

export interface AdyenPaymentInput {
  skinCode: string;
  merchantReference: string;
  merchantSig: string;
  pspReference: string;
  authResult: string;
}

export interface BraintreePaymentInput {
  /**
   * Represents a payment that can be cashed-in by seaters.
   * A nonce is obtained by initializing braintree SDK with a token
   * obtained from seaters for a specific position sales transaction
   * and completing the checkout process.
   */
  paymentMethodNonce: string;
}

export interface SeatersPaymentInput {
  surveyAnswerId: string;
}
