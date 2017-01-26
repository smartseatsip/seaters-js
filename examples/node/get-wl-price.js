/**
 * SDK version 1.3.4
 */

var client = require('../helpers').getNodeClient();

var wlId = 'b52eb117-a7e7-4ede-b0ee-b3523c92592f';
var numberOfSeats = 3;

client.waitingListService.getWaitingListPrice (wlId, numberOfSeats)
.then((price) => console.log('Price for %s seats', numberOfSeats, price))
.then(undefined, (err) => console.error('Fail', err));