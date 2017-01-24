import { Promise } from 'es6-promise';
import { Object as coreObject } from 'core-js/library';

import { SeatersApi, fan } from '../../seaters-api';
import { retryUntil } from './../util';
import { fanGroupForFan } from './fan-group-types';

var FAN_GROUP_ACTION_STATUS = fanGroupForFan.FAN_GROUP_ACTION_STATUS;

export class FanGroupService {

    constructor (
        private api: SeatersApi
    ) {

    }

    getFanGroup (fanGroupId: string): Promise<fan.FanGroup> {
        return this.api.fan.fanGroup(fanGroupId);
    }

    getFanGroupActionStatus (fanGroup: fan.FanGroup): fanGroupForFan.FAN_GROUP_ACTION_STATUS {
        var membership = fanGroup.membership;

        if (membership.member) {
            return FAN_GROUP_ACTION_STATUS.CAN_LEAVE;
        } else if (
            fanGroup.accessMode === 'PUBLIC' ||
            (membership.request && membership.request.status === 'ACCEPTED')
        ) {
            return FAN_GROUP_ACTION_STATUS.CAN_JOIN;
        } else if (
            membership.request &&
            membership.request.status === 'PENDING'
        ) {
            return FAN_GROUP_ACTION_STATUS.WAITING_FOR_APPROVAL;
        } else if (
            fanGroup.accessMode === 'CODE_PROTECTED' ||
            fanGroup.accessMode === 'PRIVATE'
        ) {
            return FAN_GROUP_ACTION_STATUS.CAN_UNLOCK;
        }
        // state that was not implemented
        console.error('GroupService - unhandled group status', JSON.stringify(fanGroup));
    }

    getExtendedFanGroup (fanGroupId: string): Promise<fanGroupForFan.ExtendedFanGroup> {
        return this.getFanGroup(fanGroupId)
        .then(fg => coreObject.assign(fg, {
            actionStatus: this.getFanGroupActionStatus(fg)
        }));
    }

    joinFanGroup (fanGroupId: string): Promise<fanGroupForFan.ExtendedFanGroup> {
        return this.api.fan.joinFanGroup(fanGroupId)
        .then(() => {
            return retryUntil(
                () => this.getExtendedFanGroup(fanGroupId),
                (fg) => fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE,
                10,
                1000
            );
        });
    }


    checkUnlockStatus(fg) {
      if(!fg.membership.request) {
        throw 'strs.api.servererror';
      }
      else if(fg.membership.request.status === 'PENDING') {
        return false;
      }
      else if(fg.membership.request.status === 'ACCEPTED') {
        return true;
      }
      else if(fg.membership.request.status === 'REJECTED') {
        throw 'strs.api.fg.invalidcode'
      }
      else {
        throw 'strs.api.servererror';
      }
    }


    joinProtectedFanGroup (fg: fan.FanGroup, code: string): Promise<Object> {

      return this.getExtendedFanGroup(fg.id)
        .then( (fg) => this.api.fan.joinProtectedFanGroup(fg, code) )
        .then (() => {
          return retryUntil(
            () => this.getExtendedFanGroup(fg.id),
            (fg) => this.checkUnlockStatus(fg) ,
            10,
            1000
          )
            .then (
              (fg) => {
                return retryUntil(
                  () => this.getExtendedFanGroup(fg.id),
                  (fg) => fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE ,
                  10,
                  1000
                )
              },
              err =>  {
                return Promise.reject(Error(err));
              }
            );
        });
    }



}
