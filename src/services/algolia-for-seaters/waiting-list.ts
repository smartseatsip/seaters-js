import { Price } from './price';

export type WAITING_LIST_STATUS = 'PUBLISHED' | 'OPEN' | 'CLOSED';

export const WL_ALGOLIA_TYPE = 'WAITING_LIST';

export type WL_ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

export interface WaitingList {
  waitingListId: string;

  type: 'WAITING_LIST';

  groupId: string;
  groupSlug: string;
  groupName: string;
  groupProfileImageUrl: string;

  eventName: object;
  eventShortName: object;
  eventStartDate: string;
  eventEndDate: string;
  utcEventStartDate: string;
  utcEventEndDate: string;
  eventDescription: object;
  eventImageUrl: string;

  venueName: object;
  venueCity: object;
  venueCountry: object;
  venueCurrencyCode: string;
  venueImageUrl: string;

  maxNumberOfSeats: number;
  freeWaitingList: boolean;
  waitingListStatus: WAITING_LIST_STATUS;
  accessMode: WL_ACCESS_MODE;
  directSalesEnabled: boolean;
  price: Price;
  originalPrice: Price;
  discountAmount: Price;
  discountPercentage: number;
  formattedOriginalPrice: string;
  formattedDiscountAmount: string;

  displayName: string;

  /**
   * Map of language -> comma separated list of keywords
   */
  keywords: { [key: string]: string };
}
