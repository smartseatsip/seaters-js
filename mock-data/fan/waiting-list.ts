import { WaitingList, ExtendedPosition, Seat } from '../../src/seaters-api/fan';
import { mkPagedResult } from '../types';
import { PagedResult } from '../../src/seaters-api/paged-result';
import { ACCESS_MODE } from '../../src/seaters-api/fan/fan-group';

export const waitingList: WaitingList = {
  'groupId': 'fan-group',
  'groupName': {
    'en': 'Ben\'s Fangroup',
    'nl': 'Ben\'s Fangroup nl'
  },
  'translatedGroupName': 'Ben\'s Fangroup',
  'groupShortName': {
    'en': 'Ben FG',
    'nl': 'Ben FG nl'
  },
  'translatedShortGroupName': 'Ben FG',
  'groupCategories': [],
  'groupProfileImageUrl': 'https://static.dev-seaters.com/file-cf2fb9bc-dce3-44dc-96d0-70bcb31e896d.png',
  'groupSlug': 'bco',
  'eventName': {
    'en': 'Pluto Bear LIVE',
    'nl': 'Pluto Bear LIVE nl'
  },
  'translatedEventName': 'Pluto Bear LIVE',
  'eventShortName': {
    'en': 'RD vs PB',
    'nl': 'RD vs PB nl'
  },
  'translatedEventShortName': 'RD vs PB',
  'eventStartDate': '2020-01-31T00:00:00.000+01:00',
  'eventImageUrl': 'https://static.dev-seaters.com/file-2ae0e85c-cc83-4821-a6f0-4bb90df43c05.png',
  'eventRequiredAttendeeInfo': [],
  'venueName': {
    'en': 'King Baudouin Stadium',
    'nl': 'King Baudouin Stadium nl'
  },
  'translatedVenueName': 'King Baudouin Stadium',
  'venueShortName': {
    'en': 'KBStadium',
    'nl': 'KBStadium nl'
  },
  'translatedVenueShortName': 'KBStadium',
  'venueCity': {
    'en': 'Bruxelles',
    'nl': 'Bruxelles nl'
  },
  'translatedVenueCity': 'Bruxelles',
  'venueImageUrl': 'https://static.dev-seaters.com/file-dc7a3499-3e97-4eda-899d-b438f6d9f774.png',
  'price': {
    'facialPrice': '10.00',
    'numberOfSeats': 1,
    'totalFacialPrice': '10.00',
    'feeExcVat': '1.50',
    'feeVat': '0.32',
    'fee': '1.82',
    'total': '11.82',
    'formattedFacialPrice': '€10.00',
    'formattedTotalFacialPrice': '€10.00',
    'formattedFeeExcVat': '€1.50',
    'formattedFeeVat': '€0.32',
    'formattedFee': '€1.82',
    'formattedTotal': '€11.82'
  },
  'currency': {
    'code': 'EUR',
    'symbol': '€'
  },
  'displayName': 'WAIT',
  'freeWaitingList': false,
  'waitingListStatus': 'OPEN',
  'feeCalculationParameters': {
    'distributionRate': '0.15',
    'minDistributionFee': '1.00',
    'maxDistributionFee': '3.00',
    'vatRate': '0.21'
  },
  'accessMode': 'PUBLIC',
  'request': null,
  'protectionCodeExplanation': '',
  'directSalesEnabled': false,
  'seatDistributionMode': 'VOUCHER',
  'eventEndDate': '2020-01-31T23:59:00.000+01:00',
  'maxNumberOfSeatsPerPosition': 1,
  'translatedEventDescription': 'Super exciting match',
  'groupCoverImageUrl': 'https://static.dev-seaters.com/file-a5acd41e-2a39-419d-8338-2c553c2983d8.png',
  'groupBackgroundImageUrl': 'https://static.dev-seaters.com/file-90d5a880-2d2b-42ed-b85b-2c36e1e6b3fb.png',
  'venueCountry': {
    'en': 'Belgium',
    'nl': 'Belgium nl'
  },
  'translatedVenueCountry': 'Belgium',
  'seatCategory': 'WAIT',

  'waitingListId': null,
  'position': null,
  'seat': null
};

export function generateWl (
  waitingListId: string,
  position?: ExtendedPosition,
  seat?: Seat,
  accessMode?: ACCESS_MODE
): WaitingList {
  return (Object as any).assign({}, waitingList, {
    waitingListId: waitingListId,
    position: position,
    seat: seat,
    accessMode: accessMode
  });
}

export const positionPayedWithSeat: ExtendedPosition = {
  'attendeesInfo': { 'attendees': [] },
  'status': 'HAS_SEAT',
  'rank': 1,
  'likelihood': '25.00',
  'lowLikelihood': true,
  'total': '11.82',
  'formattedTotal': '€11.82',
  'numberOfSeats': 1,
  'transactionStatus': 'COMPLETED',
  'paymentFailureMessage': null,
  'expirationDate': null,
  'personalInfoRequired': true,
  'facialPrice': '10.00',
  'feeExcVat': '1.50',
  'feeVat': '0.32',
  'fee': '1.82',
  'formattedFacialPrice': '€10.00',
  'formattedFeeExcVat': '€1.50',
  'formattedFeeVat': '€0.32',
  'formattedFee': '€1.82'
};

let seat: Seat = {
  'status': 'ACCEPTED',
  'assignmentExpirationDate': null,
  'exportedVoucherUrl': null,
  'voucherNumber': '576714',
  'deliveryMethod': null,
  'ticketingSystemType': null,
  'seatText': {
    'en': 'waiting nonfree',
    'nl': 'waiting nonfree nl'
  }
};

export const waitingListWithSeat = generateWl('waiting-list-with-seat', positionPayedWithSeat, seat, 'PUBLIC');

export const preauthorizedPosition: ExtendedPosition = {
  'attendeesInfo': { 'attendees': [] },
  'status': 'WAITING_SEAT',
  'rank': 2,
  'likelihood': '24.99',
  'lowLikelihood': true,
  'total': '11.82',
  'formattedTotal': '€11.82',
  'numberOfSeats': 1,
  'transactionStatus': 'COMPLETED',
  'paymentFailureMessage': null,
  'expirationDate': null,
  'personalInfoRequired': true,
  'facialPrice': '10.00',
  'feeExcVat': '1.50',
  'feeVat': '0.32',
  'fee': '1.82',
  'formattedFacialPrice': '€10.00',
  'formattedFeeExcVat': '€1.50',
  'formattedFeeVat': '€0.32',
  'formattedFee': '€1.82'
};

export const waitingListWithoutSeat: WaitingList
  | PagedResult<WaitingList> = generateWl('waiting-list-without-seat', preauthorizedPosition, null, 'PUBLIC');

export const waitingListsWithSeat: WaitingList | PagedResult<WaitingList> = mkPagedResult([waitingListWithSeat]);

export const waitingListsWithoutSeat: WaitingList | PagedResult<WaitingList> = mkPagedResult([waitingListWithoutSeat]);

export const protectedWaitingListWithSeat: WaitingList = generateWl('locked-wl', preauthorizedPosition, null, 'CODE_PROTECTED');
