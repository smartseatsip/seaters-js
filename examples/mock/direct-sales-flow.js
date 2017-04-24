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

// Join a waiting-list
// Direct sales immediately assigns a seat
// Update the fan billing information
// Accept the seat
// Export the voucher

// TODO
// Shared.client.seatersApi.fan.fan()
// .then(fan => console.log(fan))
// .then(shared.exitOK, shared.exitFail);
