export interface PositionSalesTransaction {
    /**
     * Identifier for this position sales transaction
     */
    id: string,

    /**
     * When the transaction was created
     * @format datestring
     */
    createdDate: string,

    /**
     * When the transaction was last modified
     * @format datestring
     */
    lastModifiedDate: string,

    /**
     * If transaction has failed, the reason will be here.
     * This field should not be used to determine cause of failure,
     * but can only serve as an indication to find the cause
     */
    paymentFailureMessage: string,

    /**
     * For some payment systems this URL will need to be followed to
     * approve the payment.
     * @format URL
     */
    approvalUrl: string,

    /**
     * Transaction status, not that not every status is used for every system.
     */
    status: POSITION_TRANSACTION_STATUS
}

export type POSITION_TRANSACTION_STATUS = 'CREATING' | 'FAILURE' | 'CREATED' | 'APPROVED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDING' | 'REFUNDED';
