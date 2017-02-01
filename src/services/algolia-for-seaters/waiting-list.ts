export type WAITING_LIST_STATUS =
    'PUBLISHED' | 'OPEN' | 'CLOSED';

export type WL_ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

export interface WaitingList {

    waitingListId: string,

    groupId: string,
    groupSlug: string,
    groupName: string,
    groupProfileImageUrl: string,

    eventName: Object,
    eventShortName: Object,
    eventStartDate: string,
    eventEndDate: string,
    utcEventStartDate: string,
    utcEventEndDate: string,
    eventDescription: Object,
    eventImageUrl: string,

    venueName: Object,
    venueCity: Object,
    venueCountry: Object,
    venueCurrencyCode: string,
    venueImageUrl: string,

    maxNumberOfSeats: number
    freeWaitingList: boolean,
    displayName: string,
    waitingListStatus: WAITING_LIST_STATUS,
    accessMode: WL_ACCESS_MODE,
    directSalesEnabled: boolean

}