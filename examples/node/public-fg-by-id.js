/**
 * Get public FanGroup data by fanGroupId
 * 
 * minimum SDK version: 1.4.0
 */

var shared = require('../shared');

var client = shared.client();
var fgId = shared.fgId;

client.publicService.getFanGroup(fgId)
.then(res => console.log('Public FG data', res))
.then(shared.exitOK, shared.exitFail);