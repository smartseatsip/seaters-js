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
 *  PROFILING - FAN ATTRIBUTES
 */

export interface ProfilingFanAttribute {
  id: string;
  name: string;
  externalIdentifierType: string | null;
  externalIdentifierId: string | null;
  interestId: string | null;
  status: boolean;
  aliases: string[] | null[];
}

/**
 *  USER - INTERESTS
 */
export interface UserInterest {
  id: string;
  interest: ProfilingInterest;
  status: UserInterestStatus; // 'LIKE', 'UNKNOWN', 'NEUTRAL', 'DISLIKE'
  userId: string;
}

export interface UserInterestUpdateDTO {
  id: string;
  status: UserInterestActionStatus; // 'like', 'neutral', 'dislike'
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

/**
 *  USER - FAN ATTRIBUTES
 */

export interface UserFanAttribute {
  fanAttribute: ProfilingFanAttribute;
  id: string;
  userId: string;
}

export interface UserFanAttributeCreateUpdateDTO {
  externalId: string | null;
  interestId: string | null;
  name: string | null;
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
