import {
  ProfilingCategory as _ProfilingCategory,
  ProfilingInterest as _ProfilingInterest,
  ProfilingExternalIdentifier as _ProfilingExternalIdentifier,
  ProfilingFanAttribute as _ProfilingFanAttribute,
  UserInterest as _UserInterest,
  UserInterestCreateDTO as _UserInterestCreateDTO,
  UserInterestUpdateDTO as _UserInterestUpdateDTO,
  UserFanAttribute as _UserFanAttribute,
  UserFanAttributeCreateDTO as _UserFanAttributeCreateDTO,
  UserFanAttributeUpdateDTO as _UserFanAttributeUpdateDTO,
  WaitingListInterest as _WaitingListInterest,
  WaitingListFanAttribute as _WaitingListFanAttribute,
  FanGroupShare as _FanGroupShare,
  WaitingListShare as _WaitingListShare,
  UserInterestStatusEnum as _UserInterestStatusEnum,
  UserInterestActionStatusEnum as _UserInterestActionStatusEnum
} from '../../seaters-api/fan';

/**
 *  PROFILING
 */
export namespace profiling {
  export interface ProfilingCategory extends _ProfilingCategory {}
  export interface ProfilingInterest extends _ProfilingInterest {}
  export interface ProfilingExternalIdentifier extends _ProfilingExternalIdentifier {}
  export interface ProfilingFanAttribute extends _ProfilingFanAttribute {}

  export interface UserInterest extends _UserInterest {}
  export interface UserInterestCreateDTO extends _UserInterestCreateDTO {}
  export interface UserInterestUpdateDTO extends _UserInterestUpdateDTO {}
  export interface UserFanAttribute extends _UserFanAttribute {}
  export interface UserFanAttributeCreateDTO extends _UserFanAttributeCreateDTO {}
  export interface UserFanAttributeUpdateDTO extends _UserFanAttributeUpdateDTO {}
  export interface WaitingListInterest extends _WaitingListInterest {}
  export interface WaitingListFanAttribute extends _WaitingListFanAttribute {}

  export const USER_INTEREST_STATUS = _UserInterestStatusEnum;
  export const USER_INTEREST_ACTION_STATUS = _UserInterestActionStatusEnum;
}
