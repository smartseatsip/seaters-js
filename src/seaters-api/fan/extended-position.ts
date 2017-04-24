import { Position } from './position';
import { AttendeesInfo } from './attendee-info';

/**
 * Contains position details that are only needed in specific parts of
 * the checkout flow.
 *
 * @see WaitingList
 */
export interface ExtendedPosition extends Position {

  /**
   * The information stored about the attendees
   */
  attendeesInfo: AttendeesInfo;

  /**
   * Total facial price (unit facial price times number of Seats)
   * double precision
   */
  facialPrice: string;

  /**
   * Total fee
   * double precision
   */
  fee: string;

  /**
   * Fee excluding VAT
   * double precision
   */
  feeExcVat: string;

  /**
   * Fee VAT
   * double precision
   */
  feeVat: string;

  /**
   * Facial price, formatted with currency
   * double precision
   */
  formattedFacialPrice: string;

  /**
   * Fee excluding VAT, formatted with currency
   * double precision
   */
  formattedFeeExcVat: string;

  /**
   * Fee VAT, formatted with currency
   * double precision
   */
  formattedFeeVat: string;

  /**
   * Fee incl VAT, formatted with currency
   * double precision
   */
  formattedFee: string;

}
