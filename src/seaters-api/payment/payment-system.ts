export type PAYMENT_SYSTEM_TYPE = 'PAYPAL' | 'ADYEN' | 'BRAINTREE';

export interface PaymentSystem {
    configuration:{[key:string]: string};
    isDefault:boolean;
    name:string;
    id:string;
    type: PAYMENT_SYSTEM_TYPE
}
