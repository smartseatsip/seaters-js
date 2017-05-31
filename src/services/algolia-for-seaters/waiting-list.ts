export type WAITING_LIST_STATUS =
  'PUBLISHED' | 'OPEN' | 'CLOSED';

export const WL_ALGOLIA_TYPE = 'WAITING_LIST';

export type WL_ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

export interface WaitingList {

  waitingListId: string;

  type: 'WAITING_LIST';

  groupId: string;
  groupSlug: string;
  groupName: string;
  groupProfileImageUrl: string;

  eventName: Object;
  eventShortName: Object;
  eventStartDate: string;
  eventEndDate: string;
  utcEventStartDate: string;
  utcEventEndDate: string;
  eventDescription: Object;
  eventImageUrl: string;

  venueName: Object;
  venueCity: Object;
  venueCountry: Object;
  venueCurrencyCode: string;
  venueImageUrl: string;

  maxNumberOfSeats: number;
  freeWaitingList: boolean;
  waitingListStatus: WAITING_LIST_STATUS;
  accessMode: WL_ACCESS_MODE;
  directSalesEnabled: boolean;

  displayName: string;

  /**
   * Map of language -> comma separated list of keywords
   */
  keywords: { [key: string]: string };

}
