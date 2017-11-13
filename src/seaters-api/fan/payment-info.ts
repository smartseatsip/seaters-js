export interface PaymentInfo {
  /**
   * Which payment system is used for this payment
   */
  paymentSystemType: PAYMENT_SYSTEM_TYPE;

  /**
   * The transactions to create.
   * For all payment systems except paypal, this will only contain a single entry.
   */
  transactions: PaymentInfoTransaction[];

  /**
   * Config for adyen-based payments
   */
  adyenConfig: PaymentInfoAdyenConfig;

  /**
   * Config for braintree-based payments
   */
  braintreeConfig: PaymentInfoBraintreeConfig;

  /**
   * Config for paypal-based payments
   */
  paypalConfig: PaymentInfoPaypalConfig;
}

export type PAYMENT_SYSTEM_TYPE = 'PAYPAL' | 'ADYEN' | 'BRAINTREE';

export interface PaymentInfoTransaction {
  items: PaymentInfoTransactionItem[];
  description: string;
  currency: string;
  total: string; // double
}

export interface PaymentInfoTransactionItem {
  price: string; // double
  quantity: string; // double
  currency: string;
  name: string;
}

export interface PaymentInfoAdyenConfig {
  merchantReference: string;
  skinCode: string;
  merchantSig: string;
  hppEndpoint: string;
  merchantAccount: string;
  mobileHppEndpoint: string;
  mobileSkinCode: string;
  paymentAmount: string;
  sessionValidity: string;
  mobileMerchantSig: string;
}

export interface PaymentInfoBraintreeConfig {
  /**
   * If 3Ds is available for this payment.
   * If true you should enable and call 3Ds on the braintree SDK.
   */
  threeDSEnabled: boolean;
  paymentMethods: string[];
}

export interface PaymentInfoPaypalConfig {
  endpoint: string;
  androidClientId: string;
  iosClientId: string;
  endpointNature: string;
}
