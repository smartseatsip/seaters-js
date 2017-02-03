/**
 * Accept a seat for a waiting list
 *
 *
 * minimum SDK version: 1.4.5
 */

var shared = require('../shared');

var sdk = shared.sdk;
var wlId = shared.wlId;

shared.fanClient().then(client => {

    return client.fanService.waitingListService.acceptSeats(wlId)
      .then (wl => {
        console.log('Seat accepted in WaitingList',wl);
      });
})
.then(shared.exitOK, shared.exitFail);
