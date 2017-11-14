export interface Position {
  /**
   * Number of Seats
   */
  numberOfSeats: number;

  /**
   * Is personal info required to be able to accept the seats?
   */
  personalInfoRequired: boolean;

  /**
   * When the position will expire
   * @format ISO_8601
   */
  expirationDate: string;

  /**
   * A description of the error that lead to FAILURE status
   */
  paymentFailureMessage: string;

  /**
   * The payment status
   */
  transactionStatus: TRANSACTION_STATUS;

  /**
   * Is the likelihood of the fan to get his tickets considered low?
   */
  lowLikelihood: boolean;

  /**
   * The likelihood of the fan to get tickets (percentage)
   * double precision
   */
  likelihood: string;

  /**
   * Position status
   */
  status: POSITION_STATUS;

  /**
   * Position rank
   */
  rank: number;

  /**
   * (Random distribution only) Original position rank
   * The rank that was originally assigned to the user before the list of positions was shuffled
   */
  originalRank: number;

  /**
   * Currency formatted total price for the requested # of tickets
   */
  formattedTotal: string;

  /**
   * Total price or null if Waiting List is free
   * double precision
   */
  total: string;
}

export type TRANSACTION_STATUS =
  | 'CREATING'
  | 'FAILURE'
  | 'CREATED'
  | 'APPROVED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'REFUNDING'
  | 'REFUNDED';

export type POSITION_STATUS = 'BEING_PROCESSED' | 'WAITING_SEAT' | 'HAS_SEAT' | 'ARCHIVED';
