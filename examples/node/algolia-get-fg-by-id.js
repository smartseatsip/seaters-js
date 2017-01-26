/**
 * Get public FanGroup data by fanGroupId
 * 
 * minimum SDK version: 1.3.4
 */

var shared = require('../shared');

var client = shared.client();
var fgId = shared.fgId;

client.algoliaForSeatersService.getFangroupById(fgId)
.then(res => console.log('Public FG data', res));