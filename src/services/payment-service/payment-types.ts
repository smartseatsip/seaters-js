import {
  PAYMENT_SYSTEM_TYPE as _PAYMENT_SYSTEM_TYPE,
  PaymentInfo as _PaymentInfo,
  PaymentInfoAdyenConfig as _PaymentInfoAdyenConfig,
  PaymentInfoBraintreeConfig as _PaymentInfoBraintreeConfig,
  PaymentInfoPaypalConfig as _PaymentInfoPaypalConfig,
  PaymentInfoSeatersConfig as _PaymentInfoSeatersConfig,
  PaymentInfoTransaction as _PaymentInfoTransaction,
  PaymentInfoTransactionItem as _PaymentInfoTransactionItem,
  PaymentSystem as _PaymentSystem,
  PaymentSystemCreateDTO as _PaymentSystemCreateDTO,
  PaymentSystemUpdateDTO as _PaymentSystemUpdateDTO,
  SEATERS_PAYMENT_METHODS as _SEATERS_PAYMENT_METHODS
} from './../../seaters-api/payment';

export namespace payment {
  export interface PaymentSystemCreateDTO extends _PaymentSystemCreateDTO {}
  export interface PaymentSystemUpdateDTO extends _PaymentSystemUpdateDTO {}
  export interface PaymentSystem extends _PaymentSystem {}

  export interface PaymentInfo extends _PaymentInfo {}
  export interface PaymentInfoAdyenConfig extends _PaymentInfoAdyenConfig {}
  export interface PaymentInfoBraintreeConfig extends _PaymentInfoBraintreeConfig {}
  export interface PaymentInfoPaypalConfig extends _PaymentInfoPaypalConfig {}
  export interface PaymentInfoSeatersConfig extends _PaymentInfoSeatersConfig {}
  export interface PaymentInfoTransaction extends _PaymentInfoTransaction {}
  export interface PaymentInfoTransactionItem extends _PaymentInfoTransactionItem {}

  export type PAYMENT_SYSTEM_TYPE = _PAYMENT_SYSTEM_TYPE;
  export type SEATERS_PAYMENT_METHODS = _SEATERS_PAYMENT_METHODS;
}
