/**
 * Join a FanGroup, then join a WaitingList of this FanGroup.
 * Then leave the WaitingList and finally leave the FanGroup.
 * 
 * minimum SDK version: 1.3.4
 */

var shared = require('../shared');

var fgId = shared.fgId;
var wlId = shared.wlId;

shared.fanClient().then(client => {

    return client.fanGroupService.getFanGroup(fgId)
    .then(fg => {
        if(fg.membership.member) {
            return fg;
        } else {
            return client.fanGroupService.joinFanGroup(fgId);
        }
    })
    .then(() => client.waitingListService.getWaitingList(wlId))
    .then(wl => {
        if(wl.position) {
            return wl.position;
        } else {
            return client.waitingListService.joinWaitingList(wlId, 1);
        }
    })
    .then(() => client.waitingListService.leaveWaitingList(wlId))
    .then(() => client.fanGroupService.leaveFanGroup(fgId))
    

})
.then(shared.exitOK, shared.exitFail);