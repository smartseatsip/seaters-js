export type WAITING_LIST_STATUS =
    'PUBLISHED' | 'OPEN' | 'CLOSED';

export type ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

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
    eventImageUrl: 'https://static.dev-seaters.com/file-2ae0e85c-cc83-4821-a6f0-4bb90df43c05.png',

    venueName: Object,
    venueCity: Object,
    venueCountry: Object,
    venueCurrencyCode: string,
    venueImageUrl: string,

    numberOfSeats: number,//?? not needed
    freeWaitingList: boolean,
    displayName: string,
    waitingListStatus: WAITING_LIST_STATUS,
    accessMode: ACCESS_MODE,
    directSalesEnabled: boolean

}