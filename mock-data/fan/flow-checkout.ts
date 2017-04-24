/**
 * Context: fan is in the WaitingList, with a seat assigned
 * The seat is not yet accepted/payed for. The configured payment system is braintree.
 */
import { generateWl } from './waiting-list';
import { oneHourFromNow, mkMock, Mock, RequestOptions } from '../types';
import { WaitingList, ExtendedPosition, Seat, AttendeesInfo, Position } from '../../src/seaters-api/fan';

let position: ExtendedPosition = {
  attendeesInfo: { attendees: [] },
  rank: 42,
  likelihood: '90.00',
  lowLikelihood: false,
  expirationDate: null,

  facialPrice: '10.00',
  fee: '2.00',
  feeExcVat: '1.80',
  feeVat: '0.20',
  total: '12.00',

  formattedFacialPrice: '10.00 €',
  formattedFee: '2.00 €',
  formattedFeeExcVat: '1.80 €',
  formattedFeeVat: '0.20 €',
  formattedTotal: '12.00 €',

  numberOfSeats: 2,
  personalInfoRequired: true,
  status: 'HAS_SEAT',

  transactionStatus: null,
  paymentFailureMessage: null
};

let seat: Seat = {
  assignmentExpirationDate: oneHourFromNow(),
  deliveryMethod: 'DOWNLOAD',
  exportedVoucherUrl: null,
  seatText: {
    en: 'Go to ticket booth 12 to swap this voucher for a ticket',
    nl: 'Ruil je voucher om aan ticket balie 12'
  },
  status: 'ASSIGNED',
  ticketingSystemType: null,
  voucherNumber: null
};

let wl: WaitingList = generateWl('checkout-wlid', position, seat);
wl.eventRequiredAttendeeInfo = [
  'title', 'firstName', 'lastName', 'address', 'city', 'country'
];

let stored = false;

function storeAttendeesInfo (req: RequestOptions): Position {

  if (stored) { throw new Error('[MockData] WL already payed for, please reload your page'); }
  stored = true;
  position.attendeesInfo = JSON.parse(req.body);
  return position as Position;
}

export const mocks: Mock[] = [

  mkMock('GET', '/api/fan/waiting-lists/' + wl.waitingListId, () => {
    return {
      status: 200,
      statusText: 'OK',
      body: wl
    };
  }),

  mkMock('PUT', '/api/fan/waiting-lists/' + wl.waitingListId + '/position/attendees-info', (req) => {
    return {
      status: 200,
      statusText: 'OK',
      body: storeAttendeesInfo(req)
    };
  })

];
