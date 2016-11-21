export type ACCESS_MODE =
    'PUBLIC' | 'CODE_PROTECTED';

export type SEAT_DISTRIBUTION_MODE =
    'VOUCHER' | 'TICKET';

export type WAITING_LIST_STATUS =
    'SETUP' | 'DRAFT' | 'PUBLISHED' | 'OPEN' | 'CLOSED' | 'ARCHIVED';

export interface Price {
    /**
     * Number of seats requested by the fan
     */
    numberOfSeats: number,

    /**
     * Seat's facial price
     */
    facialPrice: number,

    /**
     * Total facial price of requested seats
     */
    totalFacialPrice: number,

    /**
     * numberTotal fee
     */
    fee: number,

    /**
     * Fee on total facial price excluding VAT
     */
    feeExcVat: number,

    /**
     * VAT computed on fee 
     */
    feeVat: number,

    /**
     * 
     */
    formattedFacialPrice: string,

    /**
     * 
     */
    formattedTotalFacialPrice: string,
    
    /**
     * 
     */
    formattedFeeExcVat: string,

    /**
     * 
     */
    formattedFeeVat: string,

    /**
     * 
     */
    formattedFee: string,

    /**
     *
     */
    formattedTotal: string,

    /**
     * Total price for the requested seats
     */
    total: number,
}

export type REQUEST_STATUS =
    'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Request {
    /**
     * The reason of rejection
     */
    rejectionReason: string,

    /**
     * Request's status
     */
    status: REQUEST_STATUS,
}

export type TICKETING_SYSTEM_TYPE =
    'DIGITICK' | 'VERITIX' | 'UPLOAD';

export type DELIVERY_METHOD =
    'DOWNLOAD' | 'EMAIL';

export type SEAT_STATUS =
    'ASSIGNED' | 'ACCEPTED' | 'REJECTED' | 'ARCHIVED';

export interface Seat {
    /**
     * Seat number
     */
    voucherNumber: string
    
    /**
     * Ticketing System Type
     */
    ticketingSystemType: TICKETING_SYSTEM_TYPE,

    /**
     * Ticket delivery method
     */
    deliveryMethod: DELIVERY_METHOD,

    /**
     * Assignment expiration date 
     * @format ISO_8601
     */
    assignmentExpirationDate: string,

    /**
     * Where to download the exported voucher, if any
     */
    exportedVoucherUrl: string,

    /**
     * Seat status
     */
    status: SEAT_STATUS,
    
    /**
     * Seat text: {string =>string}
     */
    seatText: any
}

export interface FanGroupCategory {
    /**
     * Fan Group category name
     */
    translatedName: string,

    /**
     * Category's name: {string=>string}
     * @deprecated use translatedName
     */
    name: any,
    
    /**
     * Category's ID
     * @format UUID
     */
    id: string
}

export interface FeeCalculationParameters {
    /**
     * % added to cover distribution costs
     */
    distributionRate: number,

    /**
     * Minimum distribution cost
     */
    minDistributionFee: number,

    /**
     * Maximum distribution cost
     */
    maxDistributionFee: number,

    /**
     * VAT rate that is applied (depends on venue country)
     */
    vatRate: number
}

export interface Currency {
    symbol: string,
    code: string
}

export type TRANSACTION_STATUS =
    'CREATING' | 'FAILURE' | 'CREATED' | 'APPROVED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDING' | 'REFUNDED';

export type POSITION_STATUS =
    'BEING_PROCESSED' | 'WAITING_SEAT' | 'HAS_SEAT' | 'ARCHIVED';

export interface Position {
    /**
     * When the position will expire
     * @format ISO_8601
     */
    expirationDate: string,

    /**
     * Number of Seats
     */
    numberOfSeats: number,

    /**
     * A description of the error that lead to FAILURE status
     */
    paymentFailureMessage: string,

    /**
     * Is personal info required to be able to accept the seats?
     */
    personalInfoRequired:boolean,

    /**
     * The payment status
     */
    transactionStatus: TRANSACTION_STATUS,

    /**
     * Is the likelihood of the fan to get his tickets considered low?
     */
    lowLikelihood: boolean,

    /**
     * The likelihood of the fan to get tickets (percentage)
     */
    likelihood: number,

    /**
     * Position status
     */
    status: POSITION_STATUS,

    /**
     * Position rank
     */
    rank: number,

    /**
     * Currency formatted total price for the requested # of tickets
     */
    formattedTotal: string,

    /**
     * Total price or null if Waiting List is free
     */
    total: number,

    /**
     * Total facial price (unit facial price times number of Seats)
     */
    facialPrice: number,

    /**
     * Total fee
     */
    fee: number,

    /**
     * Fee excluding VAT
     */
    feeExcVat: number,

    /**
     * Fee VAT
     */
    feeVat:number,

    /**
     * Facial price, formatted with currency
     */
    formattedFacialPrice: string,

    /**
     * Fee excluding VAT, formatted with currency
     */
    formattedFeeExcVat: string,

    /**
     * Fee VAT, formatted with currency
     */
    formattedFeeVat: string,

    /**
     * Fee incl VAT, formatted with currency
     */
    formattedFee: string,
}

export interface WaitingList {

    /**
     * Waiting List ID
     */
    waitingListId: string,

    /**
     * Event name: { string => string }
     * @deprecated use translatedEventName instead
     */
    eventName: any,

    /**
     * Seat category
     */
    seatCategory: string,

    /**
     * Translated text explaining how to obtain the code protecting this WL
     */
    protectionCodeExplanation: string,
    
    /**
     * The way to access this WL
     */
    accessMode: ACCESS_MODE,

    /**
     * What kind of tickets are distributed
     */
    seatDistributionMode: SEAT_DISTRIBUTION_MODE,

    /**
     * When the event for this WL starts
     * @format ISO_8601
     */
    eventStartDate: string,

    /**
     * Price breakdown for the # of ordered ticket(s) or for one single ticket 
     */
    price: Price,

    /**
     * Wether direct sales is enabled for this WL, meaning the fan can receive his
     * seats immediately if available, without the need for manual distribution.
     */
    directSalesEnabled: boolean,

    /**
     * Waiting List status
     */
    waitingListStatus: WAITING_LIST_STATUS,

    /**
     * slug of the group (e.g. https://seaters.com/my-slug) 
     */
    groupSlug:string

    /**
     * Group short name: { string => string } 
     * @deprecated use translatedGroupShortName
     */    
    groupShortName: any,
    
    /**
     * Event short name: { string => string }
     * @deprecated use translatedEventShortName
     */
    eventShortName: any,

    /**
     * Venue name: { string => string }
     * @deprecated use translatedVenueName
     */
    venueName: any,
    
    /**
     * Venue short name: { string => string }
     * @deprecated use translatedVenueShortName
     */
    venueShortName: any,

    /**
     * Venue city: { string => string }
     * @deprecated use translatedVenueCity
     */
    venueCity: any,

    /**
     * Fan Group ID
     * @format UUID
     */
    groupId: string,

    /**
     * Join request status
     */
    request: Request,

    /**
     * Fan Group name: { string => string }
     * @deprecated use translatedGroupName
     */
    groupName: any,
    
    /**
     * Event image URL
     */
    eventImageUrl: string,

    /**
     * True if Waiting List is free, false otherwise.
     */
    freeWaitingList: boolean,
    
    /**
     * Seat data or null if Waiting List has no seat yet
     */
    seat: Seat,

    /**
     * FanGroup categories
     */
    groupCategories: FanGroupCategory[],

    /**
     * Fee calculation parameters
     */
    feeCalculationParameters: FeeCalculationParameters,
    
    /**
     * Fan Group profile image URL
     */
    groupProfileImageUrl: string,

    /**
     * Fan Group name, translated in fan's locale
     */
    translatedGroupName: string,

    /**
     * Group short name, translated in fan's locale
     */
    translatedShortGroupName: string,

    /**
     * Event name, translated in fan's locale
     */
    translatedEventName: string,

    /**
     * Event short name, translated in fan's locale
     */
    translatedEventShortName: string,

    /**
     * Venue name, translated in fan's locale
     */
    translatedVenueName: string,

    /**
     * Venue short name, translated in fan's locale
     */
    translatedVenueShortName: string,

    /**
     * Venue city, translated in fan's locale
     */
    translatedVenueCity: string,
    
    /**
     * Venue image URL
     */
    venueImageUrl: string,

    /**
     * Currency
     */
    currency: Currency,

    /**
     * Display name (wl name if available, otherwise venue category name)
     */
    displayName: string,

    /**
     * Position data or null if Waiting List is not yet joined
     */
    position: Position,

    /**
     * Maximum number of Seats a Fan can reserve when joining a Waiting List
     */
    maxNumberOfSeatsPerPosition: number,

    /**
     * Event end date
     */
    eventEndDate: string,
    
    /**
     * Venue country: {string =>string}
     * @deprecated use translatedVenueCountry
     */
    venueCountry: any,

    /**
     * Fan Group cover image URL
     */
    groupCoverImageUrl: string,

    /**
     * Fan Group background image URL
     */
    groupBackgroundImageUrl: string,
    
    /**
     * Venue country, translated in the fan's locale
     */
    translatedVenueCountry:string

    /**
     * Event description, translated in the fan's locale
     */
    translatedEventDescription:string
}
