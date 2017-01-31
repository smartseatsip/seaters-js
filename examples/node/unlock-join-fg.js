/**
 * Unlock and join a FanGroup. Then leave it again
 * 
 * minimum SDK version: 1.3.5
 */

var shared = require('../shared');

var fg = shared.config.lockedFanGroup;
var fgId = fg.fanGroupId;
var code = fg.code;
var sdk = shared.sdk;

console.log(Object.keys(sdk.fanGroupForFan));
shared.fanClient().then(client => {

    return client.fanGroupService.getExtendedFanGroup(fgId)
    // ensure we can unlock it
    .then(fg => {
        if(fg.actionStatus !== sdk.fanGroupForFan.FAN_GROUP_ACTION_STATUS.CAN_UNLOCK) {
            if(fg.accessMode !== 'CODE_PROTECTED') {
                throw new Error('Cannot unlock FG - FG is not CODE_PROTECTED');
            } else if(fg.membership.request) {
                throw new Error('Cannot unlock FG - you have already unlocked the FG');
            } else {
                throw new Error('Cannot unlock FG - other... [actionStatus:' + fg.actionStatus + ']');
            }
        }
    })
    // unlock & join
    .then(() => client.fanGroupService.joinProtectedFanGroup(fgId, code))
    .then(fg => {
        console.log('We have joined the fangroup. ActionStatus = %s', fg.actionStatus);
        return client.fanGroupService.leaveFanGroup(fgId);
    })
    .then(fg => {
        console.log('We have left the fangroup. ActionStatus = %s', fg.actionStatus);
    });

})
.then(shared.exitOK, shared.exitFail);