/**
 * Get the waiting lists within a fan group
 *
 *
 * minimum SDK version: 1.4.1
 */

var shared = require('../shared');

var sdk = shared.sdk;
var fgIds = shared.fgIds;
var wlId = shared.wlId;

shared.fanClient().then((client) => client.fanService.getWaitingListsInFanGroups(fgIds, { page: 0, maxPageSize: 10 })
  .then((wls) => {
    console.log('WaitingLists in FanGroups', wls);
  }))
  .then(shared.exitOK, shared.exitFail);
