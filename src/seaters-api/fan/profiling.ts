/**
 *  COMMON
 */
export interface ProfilingTimeStamp {
  creation_date: string;
  deletion_date: string;
  update_date: string;
}

/**
 *  CATEGORIES
 */
export interface ProfilingCategory {
  category_code: string;
  id: string;
  interests: string[];
  time_stamps: ProfilingTimeStamp;
  version: number;
}

/**
 *  INTERSTS
 */
export interface FanInterest {
  category_id: string;
  id: string;
  interest_code: string;
  time_stamps: ProfilingTimeStamp;
  version: string;
}

/**
 *  USER INTERESTS
 */
export interface FanInterest {
  id: string;
  interest: FanInterest;
  state: string;
  time_stamps: ProfilingTimeStamp;
  user_id: string;
  version: string;
}

export interface FanInterestCreateDTO {
  interest_id: string;
  state: string;
}

export interface FanInterestUpdateDTO {
  id: string;
  interest_id: string;
  state: string;
  version: string;
}
