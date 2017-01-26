/**
 * Get the price for a given number of seats for a specific WaitingList
 * 
 * minimum SDK version: 1.3.4
 */

var shared = require('../shared');

var fgId = shared.fgId;
var wlId = shared.wlId;

var numberOfSeats = 3;
var client = shared.client();
client.waitingListService.getWaitingListPrice (wlId, numberOfSeats)
.then((price) => console.log('Price for %s seats', numberOfSeats, price))
.then(undefined, (err) => console.error('Fail', err))
.then(shared.exitOK, shared.exitFail);