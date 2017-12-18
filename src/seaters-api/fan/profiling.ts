/**
 *  PROFILING - CATEGORIES
 */
export interface ProfilingCategory {
  id: string;
  order: number;
  name: Array<{ lang: string; text: string }>;
}

/**
 *  PROFILING - INTERESTS
 */
export interface ProfilingInterest {
  id: string;
  categoryId: string;
  name: Array<{ lang: string; text: string }>;
}

/**
 *  PROFILING - EXTERNAL IDENTIFIERS
 */

export interface ProfilingExternalIdentifier {
  id: string;
  identifier_id: string;
  identifier_type: string;
  objectType: string;
  version: number;
}

/**
 *  PROFILING - FAN ATTRIBUTES
 */

export interface ProfilingFanAttribute {
  external_identifier: ProfilingExternalIdentifier;
  id: string;
  interest: ProfilingInterest;
  name: string;
  objectType: string;
  type: string; // 'private', 'general'
  validated: boolean;
  version: number;
}

/**
 *  USER - INTERESTS
 */
export interface UserInterest {
  id: string;
  interest: ProfilingInterest | string;
  state: string; // 'like', 'unknown', 'dislike'
  user_id: string;
  version: number;
}

export interface UserInterestCreateDTO {
  interest_id: string;
  state: string; // 'like', 'unknown', 'dislike'
}

export enum UserInterestStatusEnum {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  NEUTRAL = 'NEUTRAL',
  UNKNOWN = 'UNKNOWN'
}

export enum UserInterestActionStatusEnum {
  like = 'like',
  dislike = 'dislike',
  neutral = 'neutral'
}

export type UserInterestStatus =
  | UserInterestStatusEnum.LIKE
  | UserInterestStatusEnum.DISLIKE
  | UserInterestStatusEnum.NEUTRAL
  | UserInterestStatusEnum.UNKNOWN;
export type UserInterestActionStatus =
  | UserInterestActionStatusEnum.like
  | UserInterestActionStatusEnum.dislike
  | UserInterestActionStatusEnum.neutral;

export interface UserInterestUpdateDTO {
  id: string;
  status: UserInterestActionStatus; // 'like', 'neutral', 'dislike'
}

/**
 *  USER - FAN ATTRIBUTES
 */

export interface UserFanAttribute {
  fan_attribute: ProfilingFanAttribute;
  id: string;
  objectType: string;
  user_id: string;
  version: number;
}

export interface UserFanAttributeCreateDTO {
  external_identifier: string;
  interest_id: string;
  name: string;
  objectType: string;
  type: string; // 'general', 'private'
  validated: boolean;
}

export interface UserFanAttributeUpdateDTO {
  fan_attribute: ProfilingFanAttribute;
  id: string;
  objectType: string;
  user_id: string;
  validated: boolean;
}

/**
 *  WAITING LIST - INTEREST
 */

export interface WaitingListInterest {
  id: string;
  objectType: string;
  interest: ProfilingInterest | string;
  waitinglist_id: string;
  version: number;
}

/**
 *  WAITING LIST - FAN ATTRIBUTES
 */

export interface WaitingListFanAttribute {
  fan_attribute: ProfilingFanAttribute;
  id: string;
  objectType: string;
  waitinglist_id: string;
  version: number;
}
