
export interface NotificationChannels {
    byMail:boolean
    bySms:boolean
}

export interface DirectMarketingSettings {
    allowDirectMarketingFromSeaters:boolean
    allowDirectMarketingFromPartners:boolean
}

export interface MobilePhoneNumber {
    countryCallingCode:string
    localNumber:string
}

export type ROLE = 'FAN' | 'ADMIN' | 'TRANSLATOR' | 'FAN_GROUP_OWNER'

export interface Address {
    /**
     * @format alpha-2 country code
     */
    countryCode: string,
    street: string,
    zipCode: string,
    city: string,
    line1: string
    line2: string
    line3: string
    state: string
    number: string,
    country: string,
}

export interface InvoiceInfo {
    /**
     * VAT number
     */
    vatNumber: string,

    /**
     * Invoice address
     */
    address: Address,
    
    /**
     * Name on the invoice
     */
    name: string,
}

export type TITLE = 'MR' | 'MS'

export interface PersonalInfo {
    birthDate: string,
    idNumber: string,
    title: TITLE,
    citizenshipCountryCode: string,
    address: Address,
}

export interface Fan {
    /**
     * Fan's notification preferences
     */
    notificationChannels: NotificationChannels

    /**
     * Fan's marketing preferences
     */
    directMarketingSettings: DirectMarketingSettings

    /**
     * Fan's first name
     */
    firstName: string,
    
    /**
     * Fan's last name.
     */
    lastName: string,
    
    /**
     * Fan's mobile phone number
     */
    mobilePhoneNumber: MobilePhoneNumber,
    
    /**
     * Fan's username
     */
    username: string,

    /**
     * Fan's email
     */
    email: string,
    
    /**
     * Fan's roles
     */
    roles: ROLE[],

    /**
     * Fan's invoice data
     */
    invoiceInfo: InvoiceInfo,

    validatedEmail: boolean,

    validatedMobilePhone: boolean,

    personalInfo: PersonalInfo, 

    /**
     * Fan's full name
     */
    name: string,

    /**
     * Fan's language
     */
    language: string,
}

export type ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

export type VISIBILITY = 'VISIBLE' | 'INVISIBLE';

export interface Statistics {
    /**
     * The number of Seats of Fan in FanGroup
     */
    numberOfSeats: number,

    /**
     * The number of FanGroup's members
     */
    numberOfMembers: number,

    /**
     * The number of Waiting Lists in FanGroup
     */
    numberOfWaitingLists: number,

    /**
     * The number of Waiting Lists joined by Fan in FanGroup
     */
    numberOfJoinedWaitingLists: number,
}

export type INVITATION_STATUS =
    'PENDING' | 'IGNORED' | 'ACCEPTED';

export interface Invitation {
    /**
     * Invitation's status
     */
    status: INVITATION_STATUS
}

export type FG_REQUEST_STATUS =
    'PENDING' | 'ACCEPTED' | 'REJECTED';


export interface FanGroupRequest {
    /**
     * The reason of rejection
     */
    rejectionReason: string,

    /**
     * Request's status
     */
    status: FG_REQUEST_STATUS
}

export interface Membership {
    /**
     * An invitation if available, null otherwise
     */
    invitation: Invitation,

    /**
     * The request to join if available, null otherwise
     */
    request: FanGroupRequest,

    /**
     * True if Fan is member of the Fan Group
     */
    member: boolean,
}

export interface FanGroupCategory {
    /**
     * Category name, translated in the fan's locale
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

export interface FanGroup {
    /**
     * FanGroup's slug
     */
    slug: string,

    /**
     * FanGroup's welcome text: {string=>string}
     * @deprecated use translatedWelcomeText
     */
    welcomeText: any,

    /**
     * How to get the protection code, translated in user locale
     */
    protectionCodeExplanation: string

    /**
     * FanGroup's access mode
     */
    accessMode: ACCESS_MODE,

    /**
     * FanGroup's visibility
     */
    visibility: VISIBILITY,

    /**
     * True if authenticated fan is member of the FanGroup
     */
    fanMember: boolean,

    /**
     * FanGroup statistics
     */
    statistics: Statistics,

    /**
     * FanGroup's short name: {string=>string}
     * @deprecated use translatedShortName
     */
    shortName: any,

    /**
     * FanGroup's color 1
     */
    color1: string,

    /**
     * FanGroup's cover image
     */
    coverImageUrl: string,

    /**
     * FanGroup's profile image
     */
    backgroundImageUrl: string,

    /**
     * FanGroup's color 2
     */
    color2: string,

    /**
     * A description of the membership of the Fan to the Fan Group
     */
    membership: Membership,

    /**
     * Fan Group's short name, translated in fan locale
     */
    translatedShortName: string,

    /**
     * Fan Group's welcome text, translated in fan locale
     */
    translatedWelcomeText: string,

    /**
     * Fan Group categories
     */
    groupCategories: FanGroupCategory[],

    /**
     * Fan Group's name, translated in fan locale
     */
    translatedName: string,

    /**
     * FanGroup's profile image
     */
    profileImageUrl: string,

    /**
     * FanGroup's name: {string=>string}
     * @deprecated use translatedName
     */
    name: any,

    /**
     * FanGroup's ID
     * @format UUID
     */
    id: string,
}

export type WL_ACCESS_MODE =
    'PUBLIC' | 'CODE_PROTECTED';

export type SEAT_DISTRIBUTION_MODE =
    'VOUCHER' | 'TICKET';

export type WL_STATUS =
    'SETUP' | 'DRAFT' | 'PUBLISHED' | 'OPEN' | 'CLOSED' | 'ARCHIVED';

export interface Price {
    /**
     * Number of seats requested by the fan
     */
    numberOfSeats: number,

    /**
     * Seat's facial price
     * double precision
     */
    facialPrice: string,

    /**
     * Total facial price of requested seats
     * double precision
     */
    totalFacialPrice: string,

    /**
     * numberTotal fee
     * double precision
     */
    fee: string,

    /**
     * Fee on total facial price excluding VAT
     * double precision
     */
    feeExcVat: string,

    /**
     * VAT computed on fee
     * double precision
     */
    feeVat: string,

    /**
     * Facial price formatted with currency
     */
    formattedFacialPrice: string,

    /**
     * Total Facial price formatted with currency
     */
    formattedTotalFacialPrice: string,
    
    /**
     * Fee excluding taxes formatted with currency
     */
    formattedFeeExcVat: string,

    /**
     * Taxes on the fee formatted with currency
     */
    formattedFeeVat: string,

    /**
     * Seaters Fee formatted with currency
     */
    formattedFee: string,

    /**
     * Total price formatted with currency
     */
    formattedTotal: string,

    /**
     * Total price for the requested seats
     * double pricision
     */
    total: string,
}

export type WL_REQUEST_STATUS =
    'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface WaitingListRequest {
    /**
     * The reason of rejection
     */
    rejectionReason: string,

    /**
     * Request's status
     */
    status: WL_REQUEST_STATUS,
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
     * double precision
     */
    distributionRate: string,

    /**
     * Minimum distribution cost
     * double precision
     */
    minDistributionFee: string,

    /**
     * Maximum distribution cost
     * double precision
     */
    maxDistributionFee: string,

    /**
     * VAT rate that is applied (depends on venue country)
     * double precision
     */
    vatRate: string
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
     * double precision
     */
    likelihood: string,

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
     * double precision
     */
    total: string,

    /**
     * Total facial price (unit facial price times number of Seats)
     * double precision
     */
    facialPrice: string,

    /**
     * Total fee
     * double precision
     */
    fee: string,

    /**
     * Fee excluding VAT
     * double precision
     */
    feeExcVat: string,

    /**
     * Fee VAT
     * double precision
     */
    feeVat: string,

    /**
     * Facial price, formatted with currency
     * double precision
     */
    formattedFacialPrice: string,

    /**
     * Fee excluding VAT, formatted with currency
     * double precision
     */
    formattedFeeExcVat: string,

    /**
     * Fee VAT, formatted with currency
     * double precision
     */
    formattedFeeVat: string,

    /**
     * Fee incl VAT, formatted with currency
     * double precision
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
    accessMode: WL_ACCESS_MODE,

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
    waitingListStatus: WL_STATUS,

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
    request: WaitingListRequest,

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

export interface PaymentInfo {

    /**
     * Which payment system is used for this payment
     */
    paymentSystemType: PAYMENT_SYSTEM_TYPE,

    /**
     * The transactions to create.
     * For all payment systems except paypal, this will only contain a single entry.
     */
    transactions: PaymentInfoTransaction[],

    /**
     * Config for adyen-based payments
     */
    adyenConfig: PaymentInfoAdyenConfig,

    /**
     * Config for braintree-based payments
     */
    braintreeConfig: PaymentInfoBraintreeConfig,

    /**
     * Config for paypal-based payments
     */
    paypalConfig: PaymentInfoPaypalConfig

}

export interface PaymentInfoTransaction {

    items: PaymentInfoTransactionItem[],
    description: string,
    currency: string,
    total: string// double

}

export interface PaymentInfoTransactionItem {

    price: string,// double
    quantity: string,// double
    currency: string,
    name: string

}

export interface PaymentInfoAdyenConfig {

    merchantReference: string,
    skinCode: string,
    merchantSig: string,
    hppEndpoint: string,
    merchantAccount: string,
    mobileHppEndpoint: string,
    mobileSkinCode: string,
    paymentAmount: string,
    sessionValidity: string,
    mobileMerchantSig: string

}

export interface PaymentInfoBraintreeConfig {
    
    /**
     * If 3Ds is available for this payment.
     * If true you should enable and call 3Ds on the braintree SDK.
     */
    threeDSEnabled: boolean

}

export interface PaymentInfoPaypalConfig {

    endpoint: string,
    androidClientId: string,
    iosClientId: string,
    endpointNature: string

}

export type PAYMENT_SYSTEM_TYPE = 'PAYPAL' | 'ADYEN' | 'BRAINTREE'

export interface BraintreeToken {
    token: string
}

export interface FanGroupLook {
    accessMode: ACCESS_MODE,
    
    /**
     * Translation map
     */
    welcomeText: any,
    
    profileImageUrl: string,
    
    coverImageUrl: string,

    backgroundImageUrl: string,

    translatedWelcomeText: string
    
    translatedName: string
    
    translatedDescription: string
    
    /**
     * Translation map
     */
    description: any,
    
    color: string,

    /**
     * Translation map
     */
    name: any
    
}

export interface PositionSalesTransaction {
    /**
     * Identifier for this position sales transaction
     */
    id: string,

    /**
     * When the transaction was created
     * @format datestring
     */
    createdDate: string,

    /**
     * When the transaction was last modified
     * @format datestring
     */
    lastModifiedDate: string,

    /**
     * If transaction has failed, the reason will be here.
     * This field should not be used to determine cause of failure,
     * but can only serve as an indication to find the cause
     */
    paymentFailureMessage: string,

    /**
     * For some payment systems this URL will need to be followed to
     * approve the payment.
     * @format URL
     */
    approvalUrl: string,

    /**
     * Transaction status, not that not every status is used for every system.
     */
    status: POSITION_TRANSACTION_STATUS
}

export type POSITION_TRANSACTION_STATUS = 'CREATING' | 'FAILURE' | 'CREATED' | 'APPROVED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDING' | 'REFUNDED';

export interface PositionSalesTransactionInput {
    /**
     * The URL the payment service should redirect to in case of success
     * @format URL
     */
    successUrl: string,

    /**
     * The URL the payment service should redirect to in case the user cancelled the transaction
     * @format URL
     */
    cancelUrl: string,

    /**
     * The Adyen payment info for the server to create the transaction
     */
    adyenPayment: AdyenPaymentInput,
    
    /**
     * The Braintree payment info for the server to create the transaction
     */
    braintreePayment: BraintreePaymentInput,

    /**
     * Paypal Payment ID (retrieved on Payment creation)
     */
    paypalPaymentId: string,

}

export interface AdyenPaymentInput {

    skinCode: string,
    merchantReference: string,
    merchantSig: string,
    pspReference: string,
    authResult: string

}

export interface BraintreePaymentInput {
    
    /**
     * Represents a payment that can be cashed-in by seaters.
     * A nonce is obtained by initializing braintree SDK with a token
     * obtained from seaters for a specific position sales transaction
     * and completing the checkout process.
     */
    paymentMethodNonce: string

}