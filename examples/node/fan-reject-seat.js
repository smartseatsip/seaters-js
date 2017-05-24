/**
 * Reject (cancel) a seat for a waiting list
 * This assumes a user log in required, as this data is not public
 *
 *
 * minimum SDK version: 1.4.9
 */

var shared = require('../shared');

var sdk = shared.sdk;
var wlId = shared.wlId;

shared.fanClient().then(client => {

  return client.fanService.rejectSeats(wlId)
    .then(wl => {
        console.log('Seat rejected from WaitingList', wl);
      },
      error => {
        console.log('Returned error:', error);
      });
})
  .then(shared.exitOK, shared.exitFail);
