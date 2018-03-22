import { LanguageCode } from '../app/app-types';

export type PAYMENT_SYSTEM_TYPE = 'PAYPAL' | 'ADYEN' | 'BRAINTREE' | 'SEATERS';
export type SEATERS_PAYMENT_METHODS = 'VIRTUAL';

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

  /**
   * Config for seaters-based payments
   */
  seatersConfig: PaymentInfoSeatersConfig;
}

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
  paymentMethods: string[];

  /**
   * Braintree Payment token used to setup the braintree SDK.
   * It identifies the fan to braintree and allows seaters to
   * link incoming payment nonces to the correct fan.
   */
  token: string;

  /**
   * Can 3Ds be enabled in the SDK for this payment?
   * If true, you may enable it if you wish in the braintree SDK.
   * If it's false you should never enable it in the braintree SDK.
   */
  threeDSEnabled: boolean;

  /**
   * Let the user pay using masterpass service within braintree sdk,
   * this property shows the masterpass button in the payment view
   */
  masterpassEnabled: boolean;

  /**
   * Let the user pay using ideal service within braintree sdk,
   * this property shows the ideal button in the payment view
   */
  idealEnabled: boolean;

  /**
   * Currency codes according to the ISO 4217 (3 uppercase characters)
   * e.g. EUR, USD, CAD
   * @see SeatersClient.appService.getCurrencies
   */
  currency: string;

  /**
   * The total amount to pay (with double precision)
   */
  total: string;
}

export interface PaymentInfoPaypalConfig {
  endpoint: string;
  androidClientId: string;
  iosClientId: string;
  endpointNature: string;
}

export interface PaymentInfoSeatersConfig {
  paymentMethods: SEATERS_PAYMENT_METHODS[];
  virtualTitle: LanguageCode;
  virtualDesc: LanguageCode;
  virtualTcLink: LanguageCode;

  virtualEnabled: boolean;
}

export interface PaymentSystemBase {
  configuration: { [key: string]: string };
  isDefault: boolean;
  name: string;
  type: PAYMENT_SYSTEM_TYPE;
}

export interface PaymentSystem extends PaymentSystemBase {
  id: string;
}

export interface PaymentSystemCreateDTO extends PaymentSystemBase {}
export interface PaymentSystemUpdateDTO extends PaymentSystemBase {}
