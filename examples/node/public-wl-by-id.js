/**
 * Get public WaitingListData data by waitingListId
 * 
 * minimum SDK version: 1.4.0
 */

var shared = require('../shared');

var client = shared.client();
var fgId = shared.fgId;

client.publicService.getFanGroup(fgId)
.then(res => console.log('Public FG data', res));