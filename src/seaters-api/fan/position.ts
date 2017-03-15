export interface Position {
    /**
     * When the position will expire
     * @format ISO_8601
     */
    expirationDate: string,

    /**
     * Number of Seats
     */
    numberOfSeats: number,

    /**
     * A description of the error that lead to FAILURE status
     */
    paymentFailureMessage: string,

    /**
     * Is personal info required to be able to accept the seats?
     */
    personalInfoRequired:boolean,

    /**
     * The payment status
     */
    transactionStatus: TRANSACTION_STATUS,

    /**
     * Is the likelihood of the fan to get his tickets considered low?
     */
    lowLikelihood: boolean,

    /**
     * The likelihood of the fan to get tickets (percentage)
     * double precision
     */
    likelihood: string,

    /**
     * Position status
     */
    status: POSITION_STATUS,

    /**
     * Position rank
     */
    rank: number,

    /**
     * Currency formatted total price for the requested # of tickets
     */
    formattedTotal: string,

    /**
     * Total price or null if Waiting List is free
     * double precision
     */
    total: string,

    /**
     * Total facial price (unit facial price times number of Seats)
     * double precision
     */
    facialPrice: string,

    /**
     * Total fee
     * double precision
     */
    fee: string,

    /**
     * Fee excluding VAT
     * double precision
     */
    feeExcVat: string,

    /**
     * Fee VAT
     * double precision
     */
    feeVat: string,

    /**
     * Facial price, formatted with currency
     * double precision
     */
    formattedFacialPrice: string,

    /**
     * Fee excluding VAT, formatted with currency
     * double precision
     */
    formattedFeeExcVat: string,

    /**
     * Fee VAT, formatted with currency
     * double precision
     */
    formattedFeeVat: string,

    /**
     * Fee incl VAT, formatted with currency
     * double precision
     */
    formattedFee: string,
}

export type TRANSACTION_STATUS = 'CREATING' | 'FAILURE' | 'CREATED' | 'APPROVED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDING' | 'REFUNDED';

export type POSITION_STATUS = 'BEING_PROCESSED' | 'WAITING_SEAT' | 'HAS_SEAT' | 'ARCHIVED';
