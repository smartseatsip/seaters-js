/**
 * Get the price for a given number of seats for a specific public WaitingList
 *
 * minimum SDK version: 1.4.0
 */

var shared = require('../shared');

var fgId = shared.fgId;
var wlId = shared.wlId;

var numberOfSeats = 3;
var client = shared.client();
client.publicService.getWaitingListPrice(wlId, numberOfSeats)
  .then((price) => console.log('Price for %s seats', numberOfSeats, price))
  .then(undefined, (err) => console.error('Fail', err))
  .then(shared.exitOK, shared.exitFail);
