/**
 * Export a seat for a waiting list (generate a voucher pdf)
 * This assumes a user log in required, as this data is not public
 *
 * The generated PDF will be available on the returned WaitingList object as such:
 *
 *    wl.seat.exportedVoucherUrl
 *
 *
 * minimum SDK version: 1.4.6
 */

var shared = require('../shared');

var sdk = shared.sdk;
var wlId = shared.wlId;

shared.fanClient().then(client => {

  return client.fanService.waitingListService.exportSeats(wlId)
    .then(wl => {
        console.log('Seat exported in WaitingList - PDF is available', wl);
      },
      error => {
        console.log('Returned error:', error);
      });
})
  .then(shared.exitOK, shared.exitFail);
