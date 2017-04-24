/**
 * Simulates the flow of joining a WL, being assigned a seat,
 * accepting it and finally printing the ticket.
 *
 * Assumptions:
 * - The fan joined the FG related to this WL
 * - The WL is configured to use direct sales
 * - The WL is free
 */
var shared = require('./_shared');

Promise.resolve();

// join a waiting-list
// direct sales immediately assigns a seat
// update the fan billing information
// accept the seat
// export the voucher

//TODO
// shared.client.seatersApi.fan.fan()
// .then(fan => console.log(fan))
// .then(shared.exitOK, shared.exitFail);
