/**
 * Get public WaitingListData data by waitingListId
 *
 * minimum SDK version: 1.4.0
 */

var shared = require('../shared');

var client = shared.client();
var wlId = shared.wlId;

client.publicService.getWaitingList(wlId)
  .then(res => console.log('Public WL data', res))
  .then(shared.exitOK, shared.exitFail);
