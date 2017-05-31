/**
 * Get public WLs in a given set of public FGs.
 */

var shared = require('../shared');

var client = shared.client();
var fgIds = [shared.fgId, '99896a68-8a5d-48e4-947c-a344121b4316'];

client.publicService.getWaitingListsInFanGroups(fgIds, { page: 0, maxPageSize: 10 })
  .then((res) => {
    let countMap = res.items.reduce((map, wl) => {
      if(map.hasOwnProperty(wl.groupSlug)) {
        map[wl.groupSlug] = map[wl.groupSlug] + 1;
      } else {
        map[wl.groupSlug] = 1;
      }
      return map;
    }, {});
    Object.keys(countMap).forEach((k) => {
      console.log('FG %s: %s WLs', k, countMap[k]);
    });
    return res;
  })
  .then((res) => console.log('Found %s public WLs', res.totalSize))
  .then(shared.exitOK, shared.exitFail);
