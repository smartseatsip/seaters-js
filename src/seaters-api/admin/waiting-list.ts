import { TranslatedText, BaseEntity } from './common';

export type WAITING_LIST_STATUS = 'SETUP' | 'DRAFT' | 'PUBLISHED' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
export type WAITING_LIST_BILLING_MODE = 'FREE' | 'FAIR_PRICE';
export type WAITING_LIST_ACCESS_MODE = 'PUBLIC' | 'CODE_PROTECTED';
export type WAITING_LIST_SEAT_DISTRIBUTION_MODE = 'VOUCHER' | 'TICKET';
export type WAITING_LIST_PREAUTHORIZATION_MODE = 'LIKELIHOOD_BASED' | 'NEVER' | 'ALWAYS';

export interface WaitingList extends BaseEntity {
    groupId:string;
    status: WAITING_LIST_STATUS;
    estimatedTickets: number;
    maxSize: number;
    billingVariables: {
        distributionRate:string;
        minDistributionFee:string;
        maxDistributionFee:string;
        vatRate:string;
    }
    likelihoodLowRangeLowerBound:number;
    likelihoodLowRangeUpperBound:number;
    likelihoodHighRangeLowerBound:number;
    likelihoodHighRangeUpperBound:number;
    billingMode:WAITING_LIST_BILLING_MODE;
    totalTickets:number;
    positionExpirationTimeOutInMs:number;
    paidSeatExpirationTimeOutInMs:number;
    pricePadding:string;
    assignmentExpirationTimeOutInMs:number;
    accessMode:WAITING_LIST_ACCESS_MODE;
    ticketPoolIds:string[];
    prepaidFee:boolean;
    rankOffset:number;
    seatDistributionMode:WAITING_LIST_SEAT_DISTRIBUTION_MODE;
    directSales:boolean;
    maxNumberOfSeatsPerPosition:number;
    eventId:string;
    voucherText:TranslatedText;
    seatCategory:string
    openingDate:string;
    protectionCodeExplanation:TranslatedText;
    keywords:TranslatedText;
    preauthorizationMode:'LIKELIHOOD_BASED' | 'NEVER' | 'ALWAYS';
    rankComputationDelay:number;
    price:string;
    distributedTickets:number;
    name:string;
}

export interface UpdateWaitingList {
    id: string;//this property is not required by the api; but as the interface is only used as input it's ok
    status: WAITING_LIST_STATUS;
    maxSize:number;
    totalTickets:number;
    likelihoodLowRangeLowerBound:number;
    likelihoodLowRangeUpperBound:number;
    likelihoodHighRangeLowerBound:number;
    likelihoodHighRangeUpperBound:number;
    price:string;
    pricePadding:string;
    billingMode:WAITING_LIST_BILLING_MODE;
    vatRate:string;
    assignmentExpirationTimeOutInMs:number;
    positionExpirationTimeOutInMs:number;
    paidSeatExpirationTimeOutInMs:number;
    estimatedTickets:number;
    accessMode:WAITING_LIST_ACCESS_MODE;
    ticketPoolIds: string[];
    rankComputationDelay:number;
    prepaidFee:boolean;
    distributionRate:string;
    minDistributionFee:string;
    maxDistributionFee:string;
    rankOffset:number;
    preauthorizationMode:WAITING_LIST_PREAUTHORIZATION_MODE;
    voucherText: TranslatedText;
    seatCategory:string;
    openingDate:string;
    protectionCodeExplanation: TranslatedText;
    keywords:TranslatedText;
    seatDistributionMode:WAITING_LIST_SEAT_DISTRIBUTION_MODE;
    directSales:boolean;
    maxNumberOfSeatsPerPosition:number;
    name:string;
}