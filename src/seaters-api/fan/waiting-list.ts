import { FanGroupCategory } from './fan-group';
import { ExtendedPosition } from './extended-position';
import { EVENT_REQUIRED_ATTENDEE_INFO } from './attendee-info';
import { LanguageCode, Translation } from '../app/app-types';
import { Price } from './price';

export interface WaitingList {
  /**
   * Waiting List ID
   */
  waitingListId: string;

  /**
   * Event name: { string => string }
   * @deprecated use translatedEventName instead
   */
  eventName: object;

  /**
   * Seat category
   */
  seatCategory: string;

  /**
   * Translated text explaining how to obtain the code protecting this WL
   */
  protectionCodeExplanation: string;

  /**
   * Keywords related to the WL
   */
  keywords: LanguageCode;

  /**
   * The way to access this WL
   */
  accessMode: WL_ACCESS_MODE;

  /**
   * What kind of tickets are distributed
   */
  seatDistributionMode: SEAT_DISTRIBUTION_MODE;

  /**
   * When the event for this WL starts
   * @format ISO_8601
   */
  eventStartDate: string;

  /**
   * Price breakdown for the # of ordered ticket(s) or for one single ticket
   */
  price: Price;

  /**
   * Original price of a single ticket
   * To be used when calculating the discount (done at backend side)
   */
  originalPrice: Price;

  /**
   * Discount amount
   */
  discountAmount: Price;

  /**
   * % discount based on price / discount price
   */
  discountPercentage: number;

  /**
   * Formatted original price
   */
  formattedOriginalPrice: string;

  /**
   * Formatted discount
   */
  formattedDiscountAmount: string;

  /**
   * Wether direct sales is enabled for this WL, meaning the fan can receive his
   * seats immediately if available, without the need for manual distribution.
   */
  directSalesEnabled: boolean;

  /**
   * Waiting List status
   */
  waitingListStatus: WL_STATUS;

  /**
   * slug of the group (e.g. https://seaters.com/my-slug)
   */
  groupSlug: string;

  /**
   * Group short name: { string => string }
   * @deprecated use translatedGroupShortName
   */
  groupShortName: any;

  /**
   * Event short name: { string => string }
   * @deprecated use translatedEventShortName
   */
  eventShortName: object;

  /**
   * Venue name: { string => string }
   * @deprecated use translatedVenueName
   */
  venueName: object;

  /**
   * Venue short name: { string => string }
   * @deprecated use translatedVenueShortName
   */
  venueShortName: any;

  /**
   * Venue city: { string => string }
   * @deprecated use translatedVenueCity
   */
  venueCity: object;

  /**
   * Fan Group ID
   * @format UUID
   */
  groupId: string;

  /**
   * Join request status
   */
  request: WaitingListRequest;

  /**
   * Fan Group name: { string => string }
   * @deprecated use translatedGroupName
   */
  groupName: string;

  /**
   * Event image URL
   */
  eventImageUrl: string;

  /**
   * Waiting list image URL
   */
  waitingListImageUrl: string;

  /**
   * True if Waiting List is free, false otherwise.
   */
  freeWaitingList: boolean;

  /**
   * Seat data or null if Waiting List has no seat yet
   */
  seat: Seat;

  /**
   * FanGroup categories
   */
  groupCategories: FanGroupCategory[];

  /**
   * Fee calculation parameters
   */
  feeCalculationParameters: FeeCalculationParameters;

  /**
   * Fan Group profile image URL
   */
  groupProfileImageUrl: string;

  /**
   * Fan Group name, translated in fan's locale
   */
  translatedGroupName: string;

  /**
   * Group short name, translated in fan's locale
   */
  translatedShortGroupName: string;

  /**
   * Event name, translated in fan's locale
   */
  translatedEventName: string;

  /**
   * Event short name, translated in fan's locale
   */
  translatedEventShortName: string;

  /**
   * Venue name, translated in fan's locale
   */
  translatedVenueName: string;

  /**
   * Venue short name, translated in fan's locale
   */
  translatedVenueShortName: string;

  /**
   * Venue city, translated in fan's locale
   */
  translatedVenueCity: string;

  /**
   * Venue image URL
   */
  venueImageUrl: string;

  /**
   * Currency
   */
  currency: Currency;

  /**
   * Display name (wl name if available, otherwise venue category name)
   */
  displayName: string;

  /**
   * Position data or null if Waiting List is not yet joined
   */
  position: ExtendedPosition;

  /**
   * Maximum number of Seats a Fan can reserve when joining a Waiting List
   */
  maxNumberOfSeatsPerPosition: number;

  /**
   * Event end date
   */
  eventEndDate: string;

  /**
   * Venue country: {string =>string}
   * @deprecated use translatedVenueCountry
   */
  venueCountry: object;

  /**
   * Fan Group cover image URL
   */
  groupCoverImageUrl: string;

  /**
   * Fan Group background image URL
   */
  groupBackgroundImageUrl: string;

  /**
   * Venue country, translated in the fan's locale
   */
  translatedVenueCountry: string;

  /**
   * Event description, translated in the fan's locale
   */
  translatedEventDescription: string;

  /**
   * The information that all attendees should provide to obtain
   * tickets for this WL
   */
  eventRequiredAttendeeInfo: EVENT_REQUIRED_ATTENDEE_INFO[];

  /**
   * Distribution mode - how tickets are distributed
   * - wl_positions_distribution_mode_fifs = default, rank based distribution
   * - wl_positions_distribution_mode_random = random distribution
   */
  positionsDistributionMode: string;

  /**
   * (random distribution only) Fixed amount of tickets to be won by a fan
   */
  fixedNumberOfSeatsPerPosition: number;

  /**
   * (random distribution only) End date of contest
   */
  participationEndDate: string;

  /**
   * (random distribution only) URL to the terms and conditions PDF file
   */
  termsAndConditionFileURL: string;

  /**
   * Always-populated voucher text
   */
  voucherText: LanguageCode;

  /**
   * Visibility of Rank and Likelihood at fan group level
   */
  groupRankAndLikelihoodHidden: boolean;

  /**
   * Experience (description) (locale => value)
   */
  description: any;
}

export type WL_ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

export type SEAT_DISTRIBUTION_MODE = 'VOUCHER' | 'TICKET';

export type WL_STATUS = 'SETUP' | 'DRAFT' | 'PUBLISHED' | 'OPEN' | 'CLOSED' | 'ARCHIVED';

export interface WaitingListRequest {
  /**
   * The reason of rejection
   */
  rejectionReason: string;

  /**
   * Request's status
   */
  status: WL_REQUEST_STATUS;
}

export type WL_REQUEST_STATUS = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Seat {
  /**
   * Seat number
   */
  voucherNumber: string;

  /**
   * Ticketing System Type
   */
  ticketingSystemType: TICKETING_SYSTEM_TYPE;

  /**
   * Ticket delivery method
   */
  deliveryMethod: DELIVERY_METHOD;

  /**
   * Assignment expiration date
   * @format ISO_8601
   */
  assignmentExpirationDate: string;

  /**
   * Where to download the exported voucher, if any
   */
  exportedVoucherUrl: string;

  /**
   * Seat status
   */
  status: SEAT_STATUS;

  /**
   * Seat text: {string =>string}
   */
  seatText: any;
}

export type TICKETING_SYSTEM_TYPE = 'DIGITICK' | 'VERITIX' | 'UPLOAD';

export type DELIVERY_METHOD = 'DOWNLOAD' | 'EMAIL';

export type SEAT_STATUS = 'ASSIGNED' | 'ACCEPTED' | 'REJECTED' | 'ARCHIVED';

export interface FeeCalculationParameters {
  /**
   * % added to cover distribution costs
   * double precision
   */
  distributionRate: string;

  /**
   * Minimum distribution cost
   * double precision
   */
  minDistributionFee: string;

  /**
   * Maximum distribution cost
   * double precision
   */
  maxDistributionFee: string;

  /**
   * VAT rate that is applied (depends on venue country)
   * double precision
   */
  vatRate: string;
}

export interface Currency {
  symbol: string;
  code: string;
}
