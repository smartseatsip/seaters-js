import { TranslatedText } from './common';

export type FAN_GROUP_STATUS = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type FAN_GROUP_ACCESS_MODE = 'PUBLIC | PRIVATE | CODE_PROTECTED';
export type FAN_GROUP_VISIBILITY = 'VISIBLE' | 'INVISIBLE';
export type FAN_GROUP_BILLING_MODE = 'FREE' | 'FAIR_PRICE';

export interface FanGroupOperationParameters {
  ticketingSystemId: string;
  accessMode: FAN_GROUP_ACCESS_MODE;
  visibility: FAN_GROUP_VISIBILITY;
}

export interface FanGroupBillingParametersBillingVariables {
  distributionRate: number;
  minDistributionFee: number;
  maxDistributionFee: number;
  vatRate: number;
}

export interface FanGroupBillingParameters {
  authorizedFanBillingModes: FAN_GROUP_BILLING_MODE[];
  billingVariables: FanGroupBillingParametersBillingVariables;
  paymentSystemId: string;
  prepaidFee: boolean;
}

export interface FanGroup {
  id: string;
  lastModifiedDate: string;
  createdDate: string;
  themeId: string;
  shortName: TranslatedText;
  status: FAN_GROUP_STATUS;
  slug: string;
  welcomeText: TranslatedText;
  categories: string[];
  clientId: string;
  operationParameters: FanGroupOperationParameters;
  billingParameters: FanGroupBillingParameters;
  protectionCodeExplanation: TranslatedText;
  coverImageUrl: string;
  logoImageUrl: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
  color1: string;
  description: TranslatedText;
  name: TranslatedText;
  rankAndLikelihoodHidden: boolean;
  showLogo: boolean;
}
