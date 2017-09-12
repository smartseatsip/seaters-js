/**
 *  PROFILING - TIMESTAMP
 */
export interface ProfilingTimeStamp {
  creation_date: string;
  deletion_date: string;
  update_date: string;
}

/**
 *  PROFILING - CATEGORIES
 */
export interface ProfilingCategory {
  category_code: string;
  id: string;
  interests: string[];
  time_stamps: ProfilingTimeStamp;
  version: number;
}

/**
 *  PROFILING - INTERESTS
 */
export interface ProfilingInterest {
  category_id: string;
  id: string;
  interest_code: string;
  objectType: string;
  time_stamps: ProfilingTimeStamp;
  version: number;
}

/**
 *  PROFILING - EXTERNAL IDENTIFIERS
 */

export interface ProfilingExternalIdentifier {
  id: string;
  identifier_id: string;
  identifier_type: string;
  objectType: string;
  time_stamps: ProfilingTimeStamp;
  version: number;
}

/**
 *  PROFILING - FAN ATTRIBUTES
 */

export interface ProfilingFanAttribute {
  external_identifier: ProfilingExternalIdentifier,
  id: string;
  interest: ProfilingInterest;
  name: string;
  objectType: string;
  time_stamps: ProfilingTimeStamp;
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
  time_stamps: ProfilingTimeStamp;
  user_id: string;
  version: number;
}

export interface UserInterestCreateDTO {
  interest_id: string;
  state: string; // 'like', 'unknown', 'dislike'
}

export interface UserInterestUpdateDTO {
  id: string;
  state: string; // 'like', 'unknown', 'dislike'
  version: number;
}

/**
 *  USER - FAN ATTRIBUTES
 */

export interface UserFanAttribute {
  fan_attribute: ProfilingFanAttribute,
  id: string;
  objectType: string;
  time_stamps: ProfilingTimeStamp;
  user_id: string;
  version: number;
}

export interface UserFanAttributeCreateDTO {
  external_identifier: string;
  interest_id: string;
  name: string;
  objectType: string;
  time_stamps: ProfilingTimeStamp;
  type: string; // 'general', 'private'
  validated: boolean;
}

export interface UserFanAttributeUpdateDTO {
  fan_attribute: ProfilingFanAttribute;
  id: string;
  objectType: string;
  time_stamps: ProfilingTimeStamp;
  user_id: string;
  validated: boolean;
}
