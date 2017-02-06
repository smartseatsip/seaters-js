/**
 * Get the waiting list for the given id
 * This assumes a user log in required, as this data is not public
 *
 * minimum SDK version: 1.4.5
 */

var shared = require('../shared');

var sdk = shared.sdk;
var fgId = shared.fgId;
var wlId = shared.wlId;

shared.fanClient().then(client => {

    return client.fanService.waitingListService.getWaitingList(wlId)
      .then(wl => {
        console.log('WaitingList', wl);
    });

})
.then(shared.exitOK, shared.exitFail);
