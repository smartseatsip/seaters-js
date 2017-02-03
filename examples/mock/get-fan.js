var shared = require('./_shared');

shared.client.seatersApi.fan.fan()
.then(fan => console.log(fan))
.then(shared.exitOK, shared.exitFail);