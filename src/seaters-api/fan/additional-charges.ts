import { TranslationMap } from '../translation-map';

export type ADDITIONAL_CHARGES_TYPES = 'ADDITIVE' | 'MULTIPLICATIVE';

export interface AdditionalCharges {
  name: TranslationMap[];
  description: TranslationMap[];
  price: number;
  type: ADDITIONAL_CHARGES_TYPES;
  id?: string;
}
