import {
  ProfilingCategory as _ProfilingCategory,
  ProfilingInterest as _ProfilingInterest,
  ProfilingFanAttribute as _ProfilingFanAttribute,
  UserInterest as _UserInterest,
  UserInterestUpdateDTO as _UserInterestUpdateDTO,
  UserFanAttribute as _UserFanAttribute,
  WaitingListInterest as _WaitingListInterest,
  WaitingListFanAttribute as _WaitingListFanAttribute,
  FanGroupShare as _FanGroupShare,
  WaitingListShare as _WaitingListShare,
  UserInterestStatusEnum as _UserInterestStatusEnum,
  UserInterestActionStatusEnum as _UserInterestActionStatusEnum,
  FanAttributeCreateUpdateDTO as _FanAttributeCreateUpdateDTO,
  UserFanAttributeStatusEnum as _UserFanAttributeStatusEnum,
  UserFanAttributeActionStatusEnum as _UserFanAttributeActionStatusEnum,
  UserFanAttributeUpdateDTO as _UserFanAttributeUpdateDTO,
  ProfilingFanAttributeStatusEnum as _ProfilingFanAttributeStatusEnum
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
}
