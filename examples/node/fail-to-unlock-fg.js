/**
 * Try unlocking a FanGroup with a wrong code
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
    // unlock - try with a wrong code
    .then(() => {
        return client.fanGroupService.joinProtectedFanGroup(fgId, 'a wrong unlock code')
        // expect it to fail
        .then(
            () => { throw new Error('Should not have unlocked the fg'); },
            (err) => {
                if(err.toString() !== 'strs.api.fg.invalidcode') {
                    throw new Error('Unexpected failure reason', err);
                }
            }
        );
    });

})
.then(shared.exitOK, shared.exitFail);