/**
 *  PROFILING - CATEGORIES
 */
export interface ProfilingCategory {
  id?: string;
  order: number;
  name: Array<{ lang: string; text: string }>;
}

/**
 *  PROFILING - INTERESTS
 */
export interface ProfilingInterest {
  id?: string;
  categoryId: string;
  name: Array<{ lang: string; text: string }>;
}

/**
 *  PROFILING - FAN ATTRIBUTES
 */

export enum ProfilingFanAttributeStatusEnum {
  VALIDATED = 'VALIDATED',
  UNVALIDATED = 'UNVALIDATED'
}

export enum ProfilingFanAttributeActionStatusEnum {
  validate = 'validate',
  unvalidate = 'unvalidate'
}

export type ProfilingFanAttributeStatus =
  | ProfilingFanAttributeStatusEnum.VALIDATED
  | ProfilingFanAttributeStatusEnum.UNVALIDATED;

export type ProfilingFanAttributeActionStatus =
  | ProfilingFanAttributeActionStatusEnum.validate
  | ProfilingFanAttributeActionStatusEnum.unvalidate;

export interface ProfilingFanAttribute {
  id?: string;
  name: string;
  externalIdType: string | null;
  externalId: string | null;
  interestId: string | null;
  status: ProfilingFanAttributeStatus;
  aliases: string[] | null[];
}

export interface FanAttributeCreateUpdateDTO {
  externalIdType: string | null;
  externalId: string | null;
  interestId: string | null;
  name: string | null;
  aliases: string[] | null[];
}

/**
 *  USER - INTERESTS
 */
export interface UserInterest {
  userId: string;
  interest: ProfilingInterest;
  status: UserInterestStatus; // 'LIKE', 'UNKNOWN', 'NEUTRAL', 'DISLIKE'
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
  userId: string;
  fanAttribute: ProfilingFanAttribute;
  status: UserFanAttributeStatus;
}

export interface UserFanAttributeUpdateDTO {
  id?: string;
  name?: string;
  status: UserFanAttributeActionStatus; // 'link', 'unlink', 'link-by-name'
}

export enum UserFanAttributeStatusEnum {
  UNLINKED = 'UNLINKED',
  LINKED = 'LINKED'
}

export enum UserFanAttributeActionStatusEnum {
  link = 'link', // Link to an existing fan attribute
  unlink = 'unlink', // Unlink from an exsisting fan attribute
  create = 'link-by-name' // create new fan attribute
}

export type UserFanAttributeStatus = UserFanAttributeStatusEnum.UNLINKED | UserFanAttributeStatusEnum.LINKED;

export type UserFanAttributeActionStatus =
  | UserFanAttributeActionStatusEnum.link
  | UserFanAttributeActionStatusEnum.unlink
  | UserFanAttributeActionStatusEnum.create;

/**
 *  WAITING LIST - INTEREST
 */

export interface WaitingListInterest {
  id: string;
  interest: ProfilingInterest | string;
  waitinglistId: string;
  // @TODO create seperate naming convention for this type.
  status: UserFanAttributeStatus;
}

/**
 *  WAITING LIST - FAN ATTRIBUTES
 */

export interface WaitingListFanAttribute {
  id: string;
  fanAttribute: ProfilingFanAttribute | string;
  fanAttributeId: string;
  // @TODO create seperate naming convention for this type.
  status: UserFanAttributeStatus;
}
