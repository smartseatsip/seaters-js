var shared = require('./_shared');

shared.client.fanService.getWaitingListsInFanGroups(['fan-group', 'fan-group'], { page: 0, maxPageSize: 10 })
  .then(waitingLists => console.log(waitingLists))
  .then(shared.exitOK, shared.exitFail);
