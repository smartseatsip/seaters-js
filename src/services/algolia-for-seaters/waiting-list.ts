import { Price } from '../../seaters-api/fan/price';
import { LanguageCode } from '../../seaters-api/app/app-types';
import { WL_ACCESS_MODE, WL_STATUS } from '../../seaters-api/fan/waiting-list';

export const WL_ALGOLIA_TYPE = 'WAITING_LIST';

export interface WaitingList {
  waitingListId: string;

  type: 'WAITING_LIST';

  groupId: string;
  groupSlug: string;

  /**
   * Fan Group name: { string => string }
   * @deprecated use translatedGroupName
   */
  groupName: string;
  groupProfileImageUrl: string;

  /**
   * Event name: { string => string }
   * @deprecated use translatedEventName instead
   */
  eventName: object;
  eventShortName: object;
  eventStartDate: string;
  eventEndDate: string;
  utcEventStartDate: string;
  utcEventEndDate: string;
  eventDescription: object;
  eventImageUrl: string;

  /**
   * Event name: { string => string }
   * @deprecated use translatedVenueName instead
   */
  venueName: object;

  /**
   * Event name: { string => string }
   * @deprecated use translatedVenueCity instead
   */
  venueCity: object;

  /**
   * Venue country: {string =>string}
   * @deprecated use translatedVenueCountry
   */
  venueCountry: object;
  venueCurrencyCode: string;
  venueImageUrl: string;

  maxNumberOfSeats: number;
  freeWaitingList: boolean;
  waitingListStatus: WL_STATUS;
  accessMode: WL_ACCESS_MODE;
  directSalesEnabled: boolean;
  price: Price;
  originalPrice: Price;
  discountAmount: Price;
  discountPercentage: number;
  formattedOriginalPrice: string;
  formattedDiscountAmount: string;
  displayName: string;
  keywords: LanguageCode;

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
}
