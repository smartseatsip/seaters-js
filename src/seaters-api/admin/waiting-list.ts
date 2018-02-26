import { TranslatedText, BaseEntity } from './common';

export type WAITING_LIST_STATUS = 'SETUP' | 'DRAFT' | 'PUBLISHED' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
export type WAITING_LIST_BILLING_MODE = 'FREE' | 'FAIR_PRICE';
export type WAITING_LIST_ACCESS_MODE = 'PUBLIC' | 'CODE_PROTECTED';
export type WAITING_LIST_SEAT_DISTRIBUTION_MODE = 'VOUCHER' | 'TICKET';
export type WAITING_LIST_PREAUTHORIZATION_MODE = 'LIKELIHOOD_BASED' | 'NEVER' | 'ALWAYS';

export interface WaitingList extends BaseEntity {
  groupId: string;
  status: WAITING_LIST_STATUS;
  estimatedTickets: number;
  maxSize: number;
  billingVariables: {
    distributionRate: string;
    minDistributionFee: string;
    maxDistributionFee: string;
    vatRate: string;
  };
  likelihoodLowRangeLowerBound: number;
  likelihoodLowRangeUpperBound: number;
  likelihoodHighRangeLowerBound: number;
  likelihoodHighRangeUpperBound: number;
  billingMode: WAITING_LIST_BILLING_MODE;
  totalTickets: number;
  positionExpirationTimeOutInMs: number;
  paidSeatExpirationTimeOutInMs: number;
  pricePadding: string;
  assignmentExpirationTimeOutInMs: number;
  accessMode: WAITING_LIST_ACCESS_MODE;
  ticketPoolIds: string[];
  prepaidFee: boolean;
  rankOffset: number;
  seatDistributionMode: WAITING_LIST_SEAT_DISTRIBUTION_MODE;
  directSales: boolean;
  maxNumberOfSeatsPerPosition: number;
  eventId: string;
  voucherText: TranslatedText;
  seatCategory: string;
  openingDate: string;
  protectionCodeExplanation: TranslatedText;
  keywords: TranslatedText;
  preauthorizationMode: 'LIKELIHOOD_BASED' | 'NEVER' | 'ALWAYS';
  rankComputationDelay: number;
  price: string;
  distributedTickets: number;
  name: string;

  /**
   * Experience name (wish list name) (locale => value)
   */
  experienceName: any;

  /**
   * Experience (description) (locale => value)
   */
  description: any;

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

/**
 * TODO: deprecate - align Update/Get WaitingList interfaces
 */
export interface UpdateWaitingList extends WaitingList {
  vatRate: string;
  distributionRate: string;
  minDistributionFee: string;
  maxDistributionFee: string;
}
