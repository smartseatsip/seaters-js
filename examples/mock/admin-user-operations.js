var shared = require('./_shared');

Promise.resolve()

  .then(() => console.log('\nget user'))
  .then(() => shared.client.seatersApi.admin.getUser('user-id'))
  .then(user => console.log(user))

  .then(() => console.log('\nsearch users'))
  .then(() => shared.client.seatersApi.admin.searchUsers(
    { query: 'foobar' },
    { itemOffset: 0, maxPageSize: 10 }
  ))
  .then(userResultSet => console.log(userResultSet))

  .then(() => console.log('\nlist users'))
  .then(() => shared.client.seatersApi.admin.getUsers(
    { itemOffset: 0, maxPageSize: 10 }
  ))
  .then(userResultSet => console.log(userResultSet))

  .then(shared.exitOK, shared.exitFail);
