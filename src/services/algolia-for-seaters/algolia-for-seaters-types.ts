export * from './fan-group';
export * from './waiting-list';
export * from './typed-search-result';
export * from '../../seaters-api/fan/price';

export const TYPE_FIELD = 'type';
export const TYPO_TOLERANCE_STRICT = 'strict';

export interface SearchSeatersContentOptions {
  onlyFanGroups?: boolean;
  onlyWaitingLists?: boolean;
}
