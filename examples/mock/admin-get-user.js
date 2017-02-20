var shared = require('./_shared');

shared.client.seatersApi.admin.getUser('user-id')
.then(user => console.log(user))
.then(shared.exitOK, shared.exitFail);