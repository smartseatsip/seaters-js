import {
  FanGroup as _FanGroup,
  SearchSeatersContentOptions as _SearchSeatersContentOptions,
  WaitingList as _WaitingList
} from '../algolia-for-seaters';
import { FanGroupLook as _FanGroupLook, Price as _Price } from '../../seaters-api/fan';
import { fan } from '../fan-service/fan-types';

/**
 * The namespace of resources in the context of publicly available data
 * Normally this should be called 'public', but sadly public is a reserved keyword, so
 * we chose 'pub' (as in "let's have a pint in the pub").
 */
export namespace pub {
  export interface FanGroup extends _FanGroup {
    actionStatus?: fan.FAN_GROUP_ACTION_STATUS;
  }

  export interface WaitingList extends _WaitingList {
    actionStatus?: fan.WAITING_LIST_ACTION_STATUS;
  }

  export interface Price extends _Price {}

  export interface FanGroupLook extends _FanGroupLook {}

  export interface SearchSeatersContentOptions extends _SearchSeatersContentOptions {}

  export type SeatersContent = FanGroup | WaitingList;
}
