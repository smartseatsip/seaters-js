/**
 * Unlock and join a FanGroup. Then leave it again
 *
 * minimum SDK version: 1.4.1
 */

var shared = require('../shared');

var fg = shared.config.lockedFanGroup;
var fgId = fg.fanGroupId;
var code = fg.code;
var sdk = shared.sdk;

shared.fanClient().then(client => {

  return client.fanService.getFanGroup(fgId)
  // ensure we can unlock it
    .then(fg => {
      if (fg.actionStatus === sdk.fan.FAN_GROUP_ACTION_STATUS.CAN_UNLOCK) {
        return;
      } else if (fg.actionStatus === sdk.fan.FAN_GROUP_ACTION_STATUS.CAN_LEAVE) {
        throw new Error('Cannot unlock FG - FG already joined');
      } else {
        if (fg.accessMode !== 'CODE_PROTECTED') {
          throw new Error('Cannot unlock FG - FG is not CODE_PROTECTED');
        } else if (fg.membership.request) {
          throw new Error('Cannot unlock FG - you have already unlocked the FG');
        } else {
          throw new Error('Cannot unlock FG - other... [actionStatus:' + sdk.fan.FAN_GROUP_ACTION_STATUS[fg.actionStatus] + ']');
        }
      }
    })
    // unlock & join
    .then(() => client.fanService.fanGroupService.joinProtectedFanGroup(fgId, code))
    .then(
      fg => console.log('We have joined the fangroup. ActionStatus = %s', sdk.fan.FAN_GROUP_ACTION_STATUS[fg.actionStatus]))
    // leave it again
    .then(() => client.fanService.fanGroupService.leaveFanGroup(fgId))
    .then(
      fg => console.log('We have left the fangroup. ActionStatus = %s', sdk.fan.FAN_GROUP_ACTION_STATUS[fg.actionStatus]));

})
  .then(shared.exitOK, shared.exitFail);
