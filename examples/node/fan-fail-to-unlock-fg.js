/**
 * Try unlocking a FanGroup with a wrong code
 *
 * minimum SDK version: 1.4.1
 */

var shared = require('../shared');

var fg = shared.config.lockedFanGroup;
var fgId = fg.fanGroupId;
var code = fg.code;
var sdk = shared.sdk;

shared.fanClient().then(client => {

  return client.fanService.fanGroupService.getFanGroup(fgId)
  // ensure we can unlock it
    .then(fg => {
      if (fg.actionStatus !== sdk.fan.FAN_GROUP_ACTION_STATUS.CAN_UNLOCK) {
        if (fg.accessMode !== 'CODE_PROTECTED') {
          throw new Error('Cannot unlock FG - FG is not CODE_PROTECTED');
        } else if (fg.membership.request) {
          throw new Error('Cannot unlock FG - you have already unlocked the FG');
        } else {
          throw new Error('Cannot unlock FG - other... [actionStatus:' + sdk.fan.FAN_GROUP_ACTION_STATUS[fg.actionStatus] + ']');
        }
      }
    })
    // unlock - try with a wrong code
    .then(() => {
      return client.fanService.fanGroupService.joinProtectedFanGroup(fgId, 'a wrong unlock code')
      // expect it to fail
        .then(
          () => {
            throw new Error('Should not have unlocked the fg');
          },
          (err) => {
            if (err.toString() !== 'strs.api.fg.invalidcode') {
              throw new Error('Unexpected failure reason', err);
            }
          }
        );
    })
    .then(() => console.log('Successfully failed to unlock'));

})
  .then(shared.exitOK, shared.exitFail);
