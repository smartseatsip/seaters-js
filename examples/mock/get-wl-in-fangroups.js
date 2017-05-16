var shared = require('./_shared');

shared.client.fanService.getWaitingListsInFanGroups(['fan-group', 'fan-group'], {})
  .then(waitingLists => console.log(waitingLists))
  .then(shared.exitOK, shared.exitFail);
