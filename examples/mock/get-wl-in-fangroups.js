var shared = require('./_shared');

shared.client.fanService.getWaitingListsInFanGroups(['b3e5d422-5027-4a7f-b2b7-4913fc5949b1', '7fe32c7a-0dc8-4652-aabb-7442bf618bad'])
  .then(waitingLists => console.log(waitingLists))
  .then(shared.exitOK, shared.exitFail);
