/**
 * Join a FanGroup, then join a WaitingList of this FanGroup.
 * Then leave the WaitingList and finally leave the FanGroup.
 *
 * minimum SDK version: 1.4.1
 */

var shared = require('../shared');

var sdk = shared.sdk;
var fgId = shared.fgId;
var wlId = shared.wlId;

shared.fanClient().then(client => {

  return client.fanService.fanGroupService.getFanGroup(fgId)
    .then(fg => {
      if (fg.actionStatus === sdk.fan.FAN_GROUP_ACTION_STATUS.CAN_LEAVE) {
        return fg;
      } else {
        return client.fanService.fanGroupService.joinFanGroup(fgId);
      }
    })
    .then(() => console.log('FG joined'))
    .then(() => client.fanService.waitingListService.getWaitingList(wlId))
    .then(wl => {
      if (wl.actionStatus === sdk.fan.WAITING_LIST_ACTION_STATUS.WAIT) {
        return wl.position;
      } else {
        return client.fanService.joinWaitingList(wlId, 1);
      }
    })
    .then(() => console.log('WL joined'))
    .then(() => client.fanService.waitingListService.leaveWaitingList(wlId))
    .then(() => console.log('WL left'))
    .then(() => client.fanService.fanGroupService.leaveFanGroup(fgId))
    .then(() => console.log('FG left'));

})
  .then(shared.exitOK, shared.exitFail);
