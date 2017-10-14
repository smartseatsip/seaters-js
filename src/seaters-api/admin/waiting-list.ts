import { TranslatedText, BaseEntity } from './common';
export interface WaitingList extends BaseEntity {
    groupId:string;
    status:'SETUP' | 'DRAFT' | 'PUBLISHED' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
    estimatedTickets: number;
    maxSize: number;
    billingVariables: {
        distributionRate:number;
        minDistributionFee:number;
        maxDistributionFee:number;
        vatRate:number;
    }
    likelihoodLowRangeLowerBound:number;
    likelihoodLowRangeUpperBound:number;
    likelihoodHighRangeLowerBound:number;
    likelihoodHighRangeUpperBound:number;
    billingMode:'FREE' | 'FAIR_PRICE';
    totalTickets:number;
    positionExpirationTimeOutInMs:number;
    paidSeatExpirationTimeOutInMs:number;
    pricePadding:number;
    assignmentExpirationTimeOutInMs:number;
    accessMode:'PUBLIC' | 'CODE_PROTECTED';
    ticketPoolIds:string[];
    prepaidFee:boolean;
    rankOffset:number;
    seatDistributionMode:'VOUCHER' | 'TICKET';
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
    price:number;
    distributedTickets:number;
    name:string;
}