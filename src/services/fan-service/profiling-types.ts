import {
  FanAttributeCreateUpdateDTO as _FanAttributeCreateUpdateDTO,
  ProfilingCategory as _ProfilingCategory,
  ProfilingFanAttribute as _ProfilingFanAttribute,
  ProfilingFanAttributeActionStatusEnum as _ProfilingFanAttributeActionStatusEnum,
  ProfilingFanAttributeStatusEnum as _ProfilingFanAttributeStatusEnum,
  ProfilingInterest as _ProfilingInterest,
  UserFanAttribute as _UserFanAttribute,
  UserFanAttributeActionStatusEnum as _UserFanAttributeActionStatusEnum,
  UserFanAttributeStatusEnum as _UserFanAttributeStatusEnum,
  UserFanAttributeUpdateDTO as _UserFanAttributeUpdateDTO,
  UserInterest as _UserInterest,
  UserInterestActionStatusEnum as _UserInterestActionStatusEnum,
  UserInterestStatusEnum as _UserInterestStatusEnum,
  UserInterestUpdateDTO as _UserInterestUpdateDTO,
  WaitingListFanAttribute as _WaitingListFanAttribute,
  WaitingListInterest as _WaitingListInterest
} from '../../seaters-api/fan';

/**
 *  PROFILING
 */
export namespace profiling {
  export interface ProfilingCategory extends _ProfilingCategory {}
  export interface ProfilingInterest extends _ProfilingInterest {}
  export interface ProfilingFanAttribute extends _ProfilingFanAttribute {}
  export interface FanAttributeCreateUpdateDTO extends _FanAttributeCreateUpdateDTO {}
  export interface UserInterest extends _UserInterest {}
  export interface UserInterestUpdateDTO extends _UserInterestUpdateDTO {}
  export interface UserFanAttribute extends _UserFanAttribute {}
  export interface WaitingListInterest extends _WaitingListInterest {}
  export interface WaitingListFanAttribute extends _WaitingListFanAttribute {}
  export interface UserFanAttributeUpdateDTO extends _UserFanAttributeUpdateDTO {}

  export const USER_INTEREST_STATUS = _UserInterestStatusEnum;
  export const USER_INTEREST_ACTION_STATUS = _UserInterestActionStatusEnum;
  export const USER_FAN_ATTRIBUTES_STATUS = _UserFanAttributeStatusEnum;
  export const USER_FAN_ATTRIBUTES_ACTION_STATUS = _UserFanAttributeActionStatusEnum;
  export const FAN_ATTRIBUTES_STATUS = _ProfilingFanAttributeStatusEnum;
  export const FAN_ATTRIBUTES_ACTION_STATUS = _ProfilingFanAttributeActionStatusEnum;
}
