/**
 * Accept a seat for a waiting list
 * This assumes a user log in required, as this data is not public
 *
 *
 * minimum SDK version: 1.4.5
 */

var shared = require('../shared');

var sdk = shared.sdk;
var wlId = shared.wlId;

shared.fanClient().then(client => {

  return client.fanService.waitingListService.acceptSeats(wlId)
    .then(wl => {
        var position = wl.position;
        if (!position) {
          throw new Error('Fan is not in WL');
        } else if (position.status !== 'HAS_SEAT') {
          throw new Error('Fan seats are not assigned');
        }

        console.log('Seat accepted in WaitingList', wl);
      },
      error => {
        console.log('Returned error:', error);
      });
})
  .then(shared.exitOK, shared.exitFail);
