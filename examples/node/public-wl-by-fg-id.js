/**
 * Get public WLs in a given public FG.
 *
 * minimum SDK version: 1.4.0
 */

var shared = require('../shared');

var client = shared.client();
var fgId = shared.fgId;

client.publicService.getWaitingListsInFanGroup(fgId, { page: 0, maxPageSize: 10 })
  .then(res => console.log('Public WLs for FG', res))
  .then(shared.exitOK, shared.exitFail);
