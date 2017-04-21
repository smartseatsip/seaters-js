import { FanGroup as _FanGroup, WaitingList as _WaitingList } from '../algolia-for-seaters';
import { Price as _Price, FanGroupLook as _FanGroupLook } from '../../seaters-api/fan';

/**
 * The namespace of resources in the context of publicly available data
 * Normally this should be called 'public', but sadly public is a reserved keyword, so
 * we chose 'pub' (as in "let's have a pint in the pub").
 */
export namespace pub {

  export interface FanGroup extends _FanGroup {
  }
  ;

  export interface WaitingList extends _WaitingList {
  }
  ;

  export interface Price extends _Price {
  }
  ;

  export interface FanGroupLook extends _FanGroupLook {
  }
  ;

  export type SeatersContent = FanGroup | WaitingList;

}
