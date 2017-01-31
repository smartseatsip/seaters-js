/**
 * Unlock and join a FanGroup. Then leave it again
 * 
 * minimum SDK version: 1.3.5
 */

var shared = require('../shared');

var fg = shared.config.lockedFanGroup;
var fgId = fg.fanGroupId;
var code = fg.code;

shared.fanClient().then(client => {

    return client.fanGroupService.joinProtectedFanGroup(fgId, code)
    .then(fg => {
        console.log('We have joined the fangroup. ActionStatus = %s', fg.actionStatus);
        return client.fanGroupService.leaveFanGroup(fgId);
    })
    .then(fg => {
        console.log('We have left the fangroup. ActionStatus = %s', fg.actionStatus);
    });

})
.then(shared.exitOK, shared.exitFail);