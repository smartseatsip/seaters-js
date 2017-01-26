/**
 * Get a waitinglist by FanGroupId without being logged in
 * This will show all the public data for the wishlist.
 * 
 * minimum SDK version: 1.3.4
 */

var shared = require('../shared');

var client = shared.client();
var fgId = shared.fgId;

client.algoliaForSeatersService.getWishlistsByFangroupId (fgId, 10, 0)
.then(res => console.log('Public WLs for FG', res))
.then(shared.exitOK, shared.exitFailMsg('Error on algolia search'));